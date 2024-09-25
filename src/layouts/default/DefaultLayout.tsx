import "./DefaultLayout.scss";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Alerts from "components/Alerts/Alerts";
import Header from "components/Header/Header";
import Sidebar from "components/Sidebar/Sidebar";
import { StepperProvider } from "contexts/StepperContext";

function DefaultLayout({ children, userProfile }: any) {
  const location = useLocation();
  const [page, setPage] = useState("dashboard");
  const [isCountryOnboarding, setIsCountryOnboarding] = useState(false);

  useEffect(() => {
    const { pathname } = location;
    const pageName = pathname.slice(1, pathname.length);
    setPage(pageName.split("/")[0]);
  }, [location]);

  return (
    <StepperProvider>
      <div className="default-layout">
        <Header headerValue={page} userProfile={userProfile} />
        <Sidebar
          onPageChoose={(boardName: any) => setPage(boardName)}
          userProfile={userProfile}
          activePage={page}
          isCountryOnboarding={isCountryOnboarding}
        />
        <main>
          <Alerts />
          <>{children}</>
        </main>
      </div>
    </StepperProvider>
  );
}

export default DefaultLayout;
