import "./Sidebar.scss";
import { Link } from "react-router-dom";
import LogoIcon from "../../icons/logo/Logos.svg";
import iconDashboard from "../../icons/dashboard/NavPieChartLine.svg";
import iconDistributors from "../../icons/distributors/NavBuildingLine.svg";
import iconReports from "../../icons/reports/NavFile3Line.svg";
import iconTimelines from "../../icons/timelines/NavNotificationLine.svg";
import iconTemplates from "../../icons/templates/NavFileSettingsLine.svg";
import iconOnboarding from "../../icons/onboarding/_Icon_.svg";

import iconStewards from "../../icons/stewards/NavGroupLine.svg";
import iconProducts from "../../icons/products/_Icon_.svg";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../services/storageInterection";
import { useContext } from "react";
import { UserDataContext } from "../../App";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import isIncludePermission from "../../utils/isIncludePermission";
import { Divider } from "@mui/material";
import CountryOnboardingStepper from "components/CountryOnboardingStepper/CountryOnboardingStepper";

const styles = {
  select: {
    width: "192px",
    height: "40px",
    fontFamily: "Helvetica Neue, sans-serif",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0.25px",
    textAlign: "left",
  },
};

function Sidebar({
  onPageChoose,
  activePage,
  userProfile,
  isCountryOnboarding,
}: any) {
  const currentCountry = getFromLocalStorage("selectedCountry");
  const userData: any = useContext(UserDataContext);
  const { pages, isEMEA } = useContext(UserDataContext);

  function chooseCountry(country: string) {
    saveToLocalStorage("selectedCountry", country);
    window.location.reload();
  }

  const isActive = (tabName: string) => {
    return tabName === activePage;
  };
  return (
    <div className="sidebar">
      <div className="sidebar__logo-section logo-section">
        <img src={LogoIcon} alt="logo"></img>
        <div className="logo-section__text">
          <span className="logo-section__app-name">Bayer ToolBox</span>
          <span className="logo-section__app-type">
            {userData?.isEMEA ? "EMEA App" : `${userData?.countries[0]}`}
          </span>
        </div>
      </div>
      {!isCountryOnboarding && userData?.isEMEA && (
        <div className="sidebar__selector">
          <div>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="appSelectorLabel">Country</InputLabel>
              <Select
                labelId="appSelectorLabel"
                id="appSelector"
                value={currentCountry}
                onChange={(e) => chooseCountry(e.target.value)}
                label="Country data"
                sx={styles.select}
              >
                {userProfile?.countries
                  ? userProfile.countries.map(
                      (country: string, index: number) => (
                        <MenuItem key={index} value={country}>
                          {country}
                        </MenuItem>
                      )
                    )
                  : null}
              </Select>
            </FormControl>
          </div>
        </div>
      )}

      {isCountryOnboarding ? (
        <CountryOnboardingStepper />
      ) : (
        <>
          <div className="sidebar__navigation navigation">
            <>
              {isIncludePermission(pages, "dashboard", "read") && (
                <div
                  className={`board-name
                      ${
                        isActive("dashboard")
                          ? "--active-board"
                          : "--inactive-board"
                      }`}
                >
                  <img className="icon" src={iconDashboard} alt="icon" />
                  <Link
                    onClick={() => onPageChoose("dashboard")}
                    className="nav-link"
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                </div>
              )}
            </>
            <>
              {isIncludePermission(pages, "reports", "read") && (
                <div
                  className={`board-name
            ${
              isActive("reports") || isActive("report")
                ? "--active-board"
                : "--inactive-board"
            }`}
                >
                  <img className="icon" src={iconReports} alt="icon" />
                  <Link
                    onClick={() => onPageChoose("reports")}
                    className="nav-link"
                    to="/reports"
                  >
                    <span>Reports</span>
                  </Link>
                </div>
              )}
            </>
            <>
              {isIncludePermission(pages, "distributors", "read") && (
                <div
                  className={`board-name
          ${isActive("distributors") ? "--active-board" : "--inactive-board"}`}
                >
                  <img className="icon" src={iconDistributors} alt="icon" />
                  <Link
                    onClick={() => onPageChoose("distributors")}
                    className="nav-link"
                    to="/distributors"
                  >
                    Distributors
                  </Link>
                </div>
              )}
            </>
            <>
              {isIncludePermission(pages, "timelines", "read") && (
                <div
                  className={`board-name
          ${isActive("timelines") ? "--active-board" : "--inactive-board"}`}
                >
                  <img className="icon" src={iconTimelines} alt="icon" />
                  <Link
                    onClick={() => onPageChoose("timelines")}
                    className="nav-link"
                    to="/timelines"
                  >
                    Timelines
                  </Link>
                </div>
              )}
            </>
            <>
              {isIncludePermission(pages, "templates", "read") && (
                <div
                  className={`board-name
            ${isActive("templates") ? "--active-board" : "--inactive-board"}`}
                >
                  <img className="icon" src={iconTemplates} alt="icon" />
                  <Link
                    onClick={() => onPageChoose("templates")}
                    className="nav-link"
                    to="/templates"
                  >
                    Templates
                  </Link>
                </div>
              )}
            </>
            <>
              {isIncludePermission(pages, "products", "read") && (
                <div
                  className={`board-name
            ${isActive("products") ? "--active-board" : "--inactive-board"}`}
                >
                  <img className="icon" src={iconProducts} alt="icon" />
                  <Link
                    onClick={() => onPageChoose("products")}
                    className="nav-link"
                    to="/products"
                  >
                    Products
                  </Link>
                </div>
              )}
            </>
            <>
              {isIncludePermission(pages, "stewards", "read") && (
                <div
                  className={`board-name
            ${isActive("stewards") ? "--active-board" : "--inactive-board"}`}
                >
                  <img className="icon" src={iconStewards} alt="icon" />
                  <Link
                    onClick={() => onPageChoose("stewards")}
                    className="nav-link"
                    to="/stewards"
                  >
                    Data Stewards
                  </Link>
                </div>
              )}
            </>
            <>
              {false && (
                <div
                  className={`board-name
          ${isActive("settings") ? "--active-board" : "--inactive-board"}`}
                >
                  <img className="icon" src={iconDashboard} alt="icon" />
                  <Link
                    onClick={() => onPageChoose("settings")}
                    className="nav-link"
                    to="/settings"
                  >
                    Role Manager
                  </Link>
                </div>
              )}
            </>
          </div>
          {isEMEA && <Divider />}
          <div className="sidebar__onboarding">
            <>
              {isIncludePermission(pages, "onboardingHide", "read") && (
                <div
                  className={`board-name
          ${isActive("onboarding") ? "--active-board" : "--inactive-board"}`}
                >
                  <img className="icon" src={iconOnboarding} alt="icon" />
                  <Link
                    onClick={() => onPageChoose("onboarding")}
                    className="nav-link"
                    to="/onboarding"
                  >
                    Onboarding
                  </Link>
                </div>
              )}
            </>
          </div>
        </>
      )}
    </div>
  );
}

export default Sidebar;
