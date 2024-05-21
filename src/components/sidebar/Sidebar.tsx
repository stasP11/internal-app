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

function Sidebar({ onPageChoose, activePage, userProfile }: any) {
  const currentCountry = getFromLocalStorage("selectedCountry");

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
            {userProfile
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

        {userProfile?.isAdmin ? (
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
        ) : null}
      </div>
    </div>
  );
}

export default Sidebar;
