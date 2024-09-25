// useFetchWithMsal2
import { useState, useCallback } from "react";

import { InteractionType, PopupRequest } from "@azure/msal-browser";
import { useMsal, useMsalAuthentication } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";

const useAuthFetchWithMsal = (msalRequest: any) => {
  const { result, error: msalError } = useMsalAuthentication(
    InteractionType.Redirect,
    {
      ...msalRequest,
      redirectUri: "/redirect",
    }
  );
  return { msalError, result };
};

export default useAuthFetchWithMsal;
