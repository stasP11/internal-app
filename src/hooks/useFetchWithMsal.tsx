import { useState, useCallback } from "react";

import { InteractionType, PopupRequest } from "@azure/msal-browser";
import { useMsal, useMsalAuthentication } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

/**
 * Custom hook to call a web API using bearer token obtained from MSAL
 * @param {PopupRequest} msalRequest
 * @returns
 */

export const useFetchWithMsal = (msalRequest: any) => {
  const { instance } = useMsal();
  const [isLoading, setIsLoading] = useState<any>(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  const { result, error: msalError } = useMsalAuthentication(
    InteractionType.Redirect,
    {
      ...msalRequest,
      account: instance.getActiveAccount(),
      redirectUri: "/redirect",
    }
  );

  const execute = async (method: any, endpoint: any, data: any) => {
    if (msalError) {
      setError(msalError);
      return;
    }

    if (result) {
      try {
        let response = null;

        const headers = new Headers();
        const bearer = `${result.accessToken}`;
        headers.append("Authorization", bearer);

        if (data) headers.append("Content-Type", "application/json");

        let options = {
          method: method,
          headers: headers,
          body: data ? JSON.stringify(data) : null,
        };

        setIsLoading(true);

        response = await (await fetch(endpoint, options)).json();
        setData(response);

        setIsLoading(false);
        return response;
      } catch (e) {
        setError(e);
        setIsLoading(false);
        throw e;
      }
    }
  };

  return {
    isLoading,
    error,
    data,
    execute: useCallback(execute, [result, msalError]), // to avoid infinite calls when inside a `useEffect`
  };
};

export const useFetchWithMsal2 = (msalRequest: any) => {
  const { result, error: msalError } = useMsalAuthentication(
    InteractionType.Redirect,
    {
      ...msalRequest,
      redirectUri: "/redirect",
    }
  );
  return { result, msalError };
};
