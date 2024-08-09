import "./Alerts.scss";
import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

import { AlertsContext } from "contexts/AlertsContext";

function ErrorAlert({ text, id, onClose }: any) {
  return (
    <Alert severity="error" onClose={() => onClose(id)}>
      {text}
    </Alert>
  );
}

function SuccessAlert({ text, id, onClose }: any) {
  return (
    <Alert severity="success" onClose={() => onClose(id)}>
      {text}
    </Alert>
  );
}

function WarningAlert({ text, id, onClose }: any) {
  return (
    <Alert severity="warning" onClose={() => onClose(id)}>
      {text}
    </Alert>
  );
}

function Alerts() {
  const { alertsInfo, setNewAlert, removeAlert } = useContext(AlertsContext);

  const defineAlert = (
    alertType: "success" | "warning" | "error",
    text: string,
    id: string
  ) => {
    if (alertType === "success") {
      return (
        <SuccessAlert text={text} id={id} onClose={removeAlert} key={id} />
      );
    }
    if (alertType === "warning") {
      return (
        <WarningAlert text={text} id={id} onClose={removeAlert} key={id} />
      );
    }
    if (alertType === "error") {
      return <ErrorAlert text={text} id={id} onClose={removeAlert} key={id} />;
    }
  };

  return (
    <div className="alerts-container">
      {alertsInfo &&
        alertsInfo.map((e: any) => defineAlert(e?.alertType, e?.text, e?.id))}
    </div>
  );
}

export default Alerts;
