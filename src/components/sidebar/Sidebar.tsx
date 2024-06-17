import "./Sidebar.scss";
import { Link } from "react-router-dom";
import LogoIcon from "../../icons/logo/Logos.svg";
import iconDashboard from "../../icons/dashboard/File-Files.svg";
import iconDistributors from "../../icons/distributors/Users-03.svg";
import iconReports from "../../icons/reports/ChartPieSlice.svg";
import ClockWithGear from "../../icons/notifications/ClockWithGear.svg";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../services/storageInterection";
import { useContext } from "react";
import { UserDataContext } from "../../App";

function Sidebar({ onPageChoose, activePage, userProfile }: any) {
  const currentCountry = getFromLocalStorage("selectedCountry");
  const userData = useContext(UserDataContext);
  const { pagesAccess } = useContext(UserDataContext);
  console.log(userData, pagesAccess, "test-context");

  function chooseCountry(country: string) {
    saveToLocalStorage("selectedCountry", country);
    window.location.reload();
  }

  const isActive = (boardName: string) => {
    return boardName === activePage ? "--active-board" : "--inactive-board";
  };
  return (
    <div className="sidebar">
      <div className="logo-section">
        <img src={LogoIcon} alt="logo"></img>
        <div className="logo-section__text">
          <label htmlFor="appSelector" className="logo-section__app-name">
            Bayer ToolBox
          </label>
          <select
            id="appSelector"
            onChange={(e) => chooseCountry(e.target.value)}
          >
            {userProfile?.countries
              ? userProfile?.countries.map((country: any, index: number) => (
                  <option
                    key={index}
                    value={country}
                    selected={currentCountry === country}
                  >
                    {country}
                  </option>
                ))
              : null}
          </select>
        </div>
      </div>

      <div className="navigation">
        <>
          {pagesAccess?.includes("dashboard") && (
            <div
              className={`board-name
                    ${isActive("dashboard")}`}
            >
              <img src={iconReports} alt="icon" />
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
          {pagesAccess?.includes("reports") && (
            <div
              className={`board-name
          ${isActive("reports-list")}`}
            >
              <img src={iconDashboard} alt="icon" />
              <Link
                onClick={() => onPageChoose("reports-list")}
                className="nav-link"
                to="/reports-list"
              >
                <span>Reports</span>
              </Link>
            </div>
          )}
        </>

        <>
          {pagesAccess?.includes("distributors") && (
            <div
              className={`board-name
        ${isActive("distributors")}`}
            >
              <img src={iconDistributors} alt="icon" />
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
          {pagesAccess?.includes("timelines") && (
            <div
              className={`board-name
        ${isActive("timelines")}`}
            >
              <img src={ClockWithGear} alt="icon" />
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
          {pagesAccess?.includes("templates") && (
            <div
              className={`board-name
          ${isActive("templates")}`}
            >
              <img src={iconDashboard} alt="icon" />
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
          <div
            className={`board-name
          ${isActive("settings")}`}
          >
            <img src={iconDashboard} alt="icon" />
            <Link
              onClick={() => onPageChoose("settings")}
              className="nav-link"
              to="/settings"
            >
              Role Manager
            </Link>
          </div>
        </>
      </div>
    </div>
  );
}

export default Sidebar;
