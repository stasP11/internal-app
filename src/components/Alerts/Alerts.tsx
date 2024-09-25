import "./Alerts.scss";
import { useContext, useEffect } from "react";
import Alert from "@mui/material/Alert";

import { AlertInfoType, AlertsContext } from "contexts/AlertsContext";

interface CustomAlertProps {
  type: "success" | "warning" | "error";
  text: string;
  id: string;
  onClose: (id: string) => void;
}

function CustomAlert({ type, text, id, onClose }: CustomAlertProps) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose(id);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [id, onClose]);

  return (
    <Alert severity={type} onClose={() => onClose(id)}>
      {text}
    </Alert>
  );
}

function Alerts() {
  const { alertsInfo, removeAlert } = useContext(AlertsContext);
  if (!alertsInfo) return null;

  return (
    <div className="alerts-container">
      {alertsInfo.map((alert: AlertInfoType) => (
        <CustomAlert
          key={alert.id}
          type={alert.alertType}
          text={alert.text}
          id={alert.id}
          onClose={removeAlert}
        />
      ))}
    </div>
  );
}
export default Alerts;
