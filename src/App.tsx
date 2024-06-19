import "./App.scss";
import "./assets/index.scss";

import Router from "./routes/Router";
import { useEffect, createContext, useState, useLayoutEffect } from "react";
import { SWRConfig } from "swr";
import {
  MsalProvider,
  useMsal,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import getUserInfo from "./utils/getUserInfo";
import { loginRequest, protectedResources } from "./authConfig";
import { LicenseInfo } from "@mui/x-data-grid-pro";
import {
  useUserAutorization,
  useFetchWithMsal,
} from "../src/hooks/useFetchWithMsal";
import { useReportsData } from "../src/hooks/swr-hooks/useReports";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "./services/storageInterection";

type UserDataContextType = {
  pagesAccess?: Array<string>;
  countries?: Array<string>;
  roleName?: string;
};
export const UserDataContext = createContext<UserDataContextType>({});

const MainContent = () => {
  const { isLoading, error, data, execute } = useFetchWithMsal({
    scopes: protectedResources.apiTodoList.scopes.read,
  });


  useEffect(() => {
    const fetchData = async (): Promise<any> => {
      try {
        await execute("GET", `${process.env.REACT_APP_API_URL_PROXY}/api/authorize`, null);
      } catch (e) {
        console.error("Fetch error:", e);
      }
    };

    fetchData();
  }, [execute]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(data, "data-01");

  return (
    <div className="App">
      <AuthenticatedTemplate>
        <UserDataContext.Provider value={{ ...data?.userData }}>
          <Router status={data?.status} userProfile={data?.userData} />
        </UserDataContext.Provider>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate></UnauthenticatedTemplate>
    </div>
  );
};

function App({ instance }: any) {
  useLayoutEffect(() => {
    LicenseInfo.setLicenseKey(
      "8ad050eed05c8b7cb389d134a16d8305Tz04ODUyMyxFPTE3NDQ4ODk0NTIwMDAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
    );
  }, []);

  return (
    <MsalProvider instance={instance}>
      <SWRConfig>
        <MainContent />
      </SWRConfig>
    </MsalProvider>
  );
}

export default App;
