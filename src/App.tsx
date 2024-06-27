import "./App.scss";
import "./assets/index.scss";

import Router from "./routes/Router";
import { useEffect, createContext, useState, useLayoutEffect } from "react";
import { SWRConfig } from "swr";
import {
  MsalProvider,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { loginRequest, protectedResources } from "./authConfig";
import { LicenseInfo } from "@mui/x-data-grid-pro";
import {
  useFetchWithMsal,
} from "../src/hooks/useFetchWithMsal";
import { useReportsData } from "../src/hooks/swr-hooks/useReports";
import ErrorPage from "./pages/error/ErrorPage"
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "./services/storageInterection";

type UserDataContextType = {
  pages?: Array<any>;
  countries?: Array<string>;
  roleName?: string;
  isEMEA?: boolean;
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


  useEffect(()=>{
    if(data?.userData && !data?.userData?.isEMEA){
      console.log(data?.userData?.isEMEA, 'test-01')
      let selectedCountry: any;
      selectedCountry = data?.userData?.countries[0];
      saveToLocalStorage("selectedCountry", selectedCountry);
    }
    
  },
  [data])

  if(data?.status === 404) {
    return <ErrorPage errorText={data?.description}/>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <ErrorPage errorText={error.message}/>;
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
