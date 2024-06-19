import React, { useState, useEffect } from "react";
import NotificationPeriods from "components/NotificationSettings/NotificationPeriods";
import NotificationRules from "components/NotificationSettings/NotificationRules";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import "./NotificationPage.scss";

import NotificationComponent from "components/NotificationSettings/Notification";

//  inventory and sellout

const ReportDetailsPage: React.FC<any> = (): JSX.Element => {
  const [reportType, setReportType] = useState("inventory");

  return (
    <div className="notification-page">
      <div className="notification-switcher">
        <div
          className={reportType === "inventory" ? "selected" : ""}
          onClick={() => setReportType("inventory")}
        >
          Inventory report
        </div>
        <div
          className={reportType === "sellout" ? "selected" : ""}
          onClick={() => setReportType("sellout")}
        >
          Sell-out report
        </div>
      </div>
      <div className="notification-control">
        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Default settings"
          />
        </FormGroup>

        <div className="notification-control__buttons">
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained">Save</Button>
        </div>
      </div>
      <NotificationComponent />
    </div>
  );
};

export default ReportDetailsPage;
