import "./App.scss";
import "./assets/index.scss";
import Router from "./routes/Router";
import { useEffect, useState, useLayoutEffect } from "react";
import { SWRConfig } from "swr";
import {
  MsalProvider,
  AuthenticatedTemplate,
  useMsal,
  UnauthenticatedTemplate,
  useIsAuthenticated,
} from "@azure/msal-react";

import getUserInfo from "./utils/getUserInfo";
import { loginRequest, protectedResources } from "./authConfig";
import { LicenseInfo } from "@mui/x-data-grid-pro";

const MainContent = () => {
  const { instance, inProgress } = useMsal();
  const activeAccount = instance.getActiveAccount();
  const [userProfile, setUserProfile] = useState<any>({});

  const handleLoginRedirect = () => {
    if (!activeAccount) {
      instance.loginRedirect(loginRequest).catch((error) => console.log(error));
    }
  };

  useLayoutEffect(() => {
    if (
      activeAccount?.idTokenClaims?.roles &&
      !Object.keys(userProfile).length
    ) {
      const userInfo = getUserInfo(activeAccount?.idTokenClaims?.roles);
      setUserProfile(userInfo);
      console.log(userInfo, "userInfo");
    }
  }, []);

  useEffect(() => {
    handleLoginRedirect();
  }, [inProgress]);

  return (
    <div className="App">
      <AuthenticatedTemplate>
        <Router status={"OK"} userProfile={userProfile} />
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
