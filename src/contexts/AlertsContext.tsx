import { useState, createContext, useLayoutEffect, ReactNode } from "react";
import genereteRandomId from "../utils/genereteRandomId";

export type AlertInfoType = {
  alertType: "success" | "warning" | "error";
  text: string;
  id?: any;
};

type PageInfoContextType = {
  alertsInfo?: Array<AlertInfoType>;
  setNewAlert?: any;
  removeAlert?: any;
};

export const AlertsContext = createContext<PageInfoContextType>({});

export function AlertsContextWrapper({ children }: any) {
  const [alertsInfo, setAlertsInfo] = useState<any>([]);

  function removeAlert(id: string) {
    const result: any = [];
    alertsInfo.forEach((element: any) => {
      if (element?.id !== id) {
        result.push(element);
      }
    });

    setAlertsInfo(result);
  }

  function setNewAlert(alertInfo: AlertInfoType) {
    setAlertsInfo((current: any) => [
      { id: genereteRandomId(), ...alertInfo },
      ...current,
    ]);
  }

  return (
    <AlertsContext.Provider value={{ alertsInfo, setNewAlert, removeAlert }}>
      {children}
    </AlertsContext.Provider>
  );
}
