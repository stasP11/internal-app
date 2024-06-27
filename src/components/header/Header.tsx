import "./Header.scss";
import React, { useEffect, useState } from "react";
import { useLocation, useParams  } from "react-router-dom";
import BasePopUp from "components/pop-up/PopUp";
import { useMsal } from "@azure/msal-react";

function formatRoute(route: any) {
  // Remove leading slash and capitalize first letter
  const formattedRoute =
    route.replace(/^\//, "").charAt(0).toUpperCase() + route.slice(2);
  return formattedRoute;
}

function Header({ headerValue, userProfile }: any) {
  const location = useLocation();
  const [actualPage, setActualPage] = useState("");
  const [actualPop, setActualPop] = useState(false);
  const params= useParams();

  const { accounts, inProgress, instance } = useMsal();
  const handleLogoutRedirect = () => {
    console.log('logout')
    instance.logoutRedirect().catch((error) => console.log(error));
  };
  const user = accounts? accounts[0] : {name: 'default'};

  useEffect(() => {
    // temporary
    
    console.log(location, params, 'location')
    const parts = location.pathname.split('/');
    console.log(parts, 'parts')
    const page = parts[parts.length - 1];
    const pageName = page.split('&');
    setActualPage(pageName[0]);
  }, [location]);

  return (
    <div className="header">
      <h1 className="page-name">{actualPage}</h1>

      <div className="user-logo" onClick={() => setActualPop(true)}>
        <div className="user-logo__name">{user?.name}</div>

        <div className="header-popup">
          <BasePopUp
            isActive={actualPop}
            onClosePopUp={() => setActualPop(false)}
            id="22"
          >
            <div onClick={handleLogoutRedirect} className="text">
              Log out
            </div>
          </BasePopUp>
        </div>
      </div>
    </div>
  );
}

export default Header;
