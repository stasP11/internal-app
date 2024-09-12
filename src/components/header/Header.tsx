import "./Header.scss";
import React, { useEffect, useState, useContext, ReactNode } from "react";
import { useLocation, useParams } from "react-router-dom";
import BasePopUp from "components/PopUp/PopUp";
import { useMsal } from "@azure/msal-react";

import {
  PageInfoContextWrapper,
  PageInfoContext,
} from "../../contexts/PageInfoContext";

function UserProfileDropdown({ userName }: any) {
  return (
    <div className="user-profile-dropdown">
      <div className="user-profile-dropdown__name">{userName}</div>
      <div className="user-profile-dropdown__ava">{userName[0]}</div>
    </div>
  );
}

function Header({ headerValue, userProfile }: any) {
  const location = useLocation();
  const [actualPage, setActualPage] = useState("");
  const [actualPop, setActualPop] = useState(false);
  const params = useParams();

  const { accounts, inProgress, instance } = useMsal();
  const handleLogoutRedirect = () => {
    console.log("logout");
    instance.logoutRedirect().catch((error) => console.log(error));
  };
  const user = accounts ? accounts[0] : { name: "default" };
  const { pageInfo, setPageInfo } = useContext(PageInfoContext);
  const [headerContent, setHeaderContent] = useState<string>();
  const [buttonToRender, setButtonToRender] = useState<ReactNode>();

  console.log(pageInfo, "pageInfo");

  useEffect(() => {
    if (pageInfo?.headerContent) {
      setHeaderContent(pageInfo?.headerContent);
    }
    if (pageInfo?.button) {
      setButtonToRender(pageInfo?.button);
    } else {
      setButtonToRender(null);
    }
  }, [pageInfo]);

  useEffect(() => {
    // console.log(location, params, 'location')
    // const parts = location.pathname.split('/');
    //  console.log(parts, 'parts')
    //  const page = parts[parts.length - 1];
    //  const pageName = page.split('&');
    //  setActualPage(pageName[0]);
  }, [location]);

  return (
    <div className="header">
      <h1 className="page-name">
        {buttonToRender}
        {headerContent}
      </h1>

      <div className="user-profile-tab" onClick={() => setActualPop(true)}>
        <UserProfileDropdown userName={user?.name} />

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
