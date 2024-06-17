import "./Dashboard.scss";
import { Card } from "components/card/Card";
import { Link } from "react-router-dom";
import PieChart from "components/charts/Chart";
import { useReportsData } from "../../hooks/swr-hooks/useReports";
import { useEffect, useState } from "react";
import DashboardReportsTable from "./DashboardReportsTable";
import DashboardDistributorsTable from "./DashboardDistributorsTable";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../services/storageInterection";
import { loginRequest, protectedResources } from "../../authConfig";
import { useFetchWithMsal2 } from "../../../src/hooks/useFetchWithMsal";

const transformData = (data: any) => {
  const transformedData: any = data.reduce((result: any, item: any) => {
    const existingEntry: any = result.find(
      (entry: any) =>
        entry.distributor_id === item.distributor_id &&
        entry.Distributor_Name === item.Distributor_Name
    );

    if (existingEntry) {
      existingEntry.filenames.push(item.filename);
      existingEntry.statuses.push(item.status);
    } else {
      result.push({
        distributor_id: item.distributor_id,
        Distributor_Name: item.Distributor_Name,
        filenames: [item.filename],
        statuses: [item.status],
      });
    }

    return result;
  }, []);

  return transformedData;
};

function Dashboard() {
  const reportData: any = [];
  const [distributorData, setDistributorData] = useState([]);



  

  const { error: authError, result: authResult }: any = useFetchWithMsal2({
    scopes: protectedResources.apiTodoList.scopes.read,
  });

  const selectedCountry = getFromLocalStorage("selectedCountry");

  const { data: reportsData, error: reportsError, isLoading } = useReportsData([
    authResult,
    "GET",
    `${process.env.REACT_APP_API_URL}/api/reportslist`,
    { selectedCountry },
  ]);


  const { data: distributorsData, error: distributorsError } = useReportsData([
    authResult,
    "GET",
    `${process.env.REACT_APP_API_URL}/api/getdistributorslist`,
    { selectedCountry },
  ]);


  function handleDistributorssDataForChart(distributorsData: any) {
    return [
      { type: "Reported", typeNumber: 0, total: distributorsData.length },
      { type: "Missing", typeNumber: 80, total: distributorsData.length },
      {
        type: "Partially Reported",
        typeNumber: 1,
        total: distributorsData.length,
      },
    ];
  }
  function handleReportsDataForChart(reportData: any) {
    return [
      {
        type: "Received",
        typeNumber: reportData.data.filter(
          (obj: any) => obj.status === "PROCESSING"
        ).length,
        total: reportData.data?.length,
      },
      {
        type: "Missing",
        typeNumber: reportData.data.filter(
          (obj: any) => obj.status === "MISSING"
        ).length,
        total: reportData.data?.length,
      },
    ];
  }

  useEffect(() => {
    if (!!reportData?.data) {
      const distrData = transformData(reportData.data);
      console.log(distrData, "distrData");
      setDistributorData(distrData);
    }
  }, reportData?.data);

  return (
    <>
      {(!!reportData?.data?.length && !!distributorData?.length) && (
        <div>
          <div className="inform-cards">
            <div className="inform-cards__inform-card">
              <Card
                name="Reports"
                bodyInfo={`${
                  reportData.data.filter(
                    (obj: any) => obj.status === "PROCESSING"
                  ).length
                }/${reportData.data?.length}`}
                bodyExplaining={"received/total"}
                status={"3 days before due date"}
                update={"+1 today"}
              >
                {" "}
                <Link to={"/reports"} relative="path">
                  See all
                </Link>
              </Card>
            </div>
            <div className="inform-cards__inform-card">
              <Card
                name="Exceptions Found"
                bodyInfo={`${
                  reportData.data.filter((obj: any) => obj.status === "REWORK")
                    .length
                }`}
                bodyExplaining={"reports to review"}
                status={"23 issues to map"}
                isDangerStatus
              >
                {" "}
                <Link to={"/reports?status=exception"} relative="path">
                  See all
                </Link>
              </Card>
            </div>
            <div className="inform-cards__inform-card">
              <Card
                name="Mapped Successfully"
                bodyInfo={`${
                  reportData.data.filter((obj: any) => obj.status === "SUCCESS")
                    .length
                }`}
                bodyExplaining={"reports to approve"}
                status={"."}
              >
                {" "}
                <Link to={"/reports?status=success"} relative="path">
                  See all
                </Link>
              </Card>
            </div>
          </div>


          <div className="panel">
            <div className="panel__chart">
              <PieChart
                name="Distributors"
                data={handleDistributorssDataForChart(reportsData)}
                width={200}
                height={200}
              />
            </div>
            <div className="panel__table">
              <DashboardDistributorsTable data={distributorsData} />
            </div>
          </div>
          <div className="panel">
            <div className="panel__chart">
              <PieChart
                name="Reports"
                data={handleReportsDataForChart(reportData)}
                width={200}
                height={200}
              />
            </div>

            <div className="panel__table">
              <DashboardReportsTable data={reportData?.data} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
