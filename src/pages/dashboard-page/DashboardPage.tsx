import { useEffect, useContext } from "react";
import { PageInfoContext } from "../../contexts/PageInfoContext";
import Dashboard2 from "components/dashboard_2.0/Dashboard2";
import { UserDataContext } from "../../App";
import Dashboard from "components/Dashboard/Dashboard";

export default function DashboardPage() {
  const { isEMEA } = useContext(UserDataContext);
  const { setPageInfo } = useContext(PageInfoContext);
  useEffect(() => {
    setPageInfo({
      headerContent: `Dashboard`,
    });
  }, []);

  /*  <Dashboard2 /> */
  return <>{isEMEA ? <div></div> : <Dashboard />}</>;
}
