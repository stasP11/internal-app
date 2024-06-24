import "./Dashboard.scss";
import { Card } from "components/card/Card";
import { Link } from "react-router-dom";
import PieChart from "components/charts/Chart";
import { useReportsData } from "../../hooks/swr-hooks/useReports";
import { useEffect, useState } from "react";
import DashboardReportsTable from "./DashboardReportsTable";
import DashboardDistributorsTable from "./DashboardDistributorsTable";
import { getFromLocalStorage } from "../../services/storageInterection";
import { loginRequest, protectedResources } from "../../authConfig";
import { useFetchWithMsal2 } from "../../../src/hooks/useFetchWithMsal";
import CircularProgress from "@mui/material/CircularProgress";

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

function useAuthRequestReports() {
  const { error: authError, result: authResult }: any = useFetchWithMsal2({
    scopes: protectedResources.apiTodoList.scopes.read,
  });

  const selectedCountry = getFromLocalStorage("selectedCountry");

  const {
    data: reportsData,
    error: reportsError,
    isLoading,
  } = useReportsData([
    authResult,
    "GET",
    `${process.env.REACT_APP_API_URL_PROXY}/api/reportslist`,
    { selectedCountry },
  ]);

  return { reportsError, authError, reportsData, isLoading };
}

function useAuthRequestDistributors() {
  const { error: authError, result: authResult }: any = useFetchWithMsal2({
    scopes: protectedResources.apiTodoList.scopes.read,
  });

  const selectedCountry = getFromLocalStorage("selectedCountry");

  const {
    data: realDistributorData,
    error: reportsError,
    isLoading,
  } = useReportsData([
    authResult,
    "GET",
    `${process.env.REACT_APP_API_URL_PROXY}/api/getdistributorslist`,
    { selectedCountry },
  ]);

  return { reportsError, authError, realDistributorData, isLoading };
}

function Dashboard() {
  const { reportsData: realReportsData, isLoading: isReportsDataLoading } =
    useAuthRequestReports();
  const { realDistributorData, isLoading: isDistributorDataLoading } =
    useAuthRequestDistributors();

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
        typeNumber: reportData.filter((obj: any) => obj.status === "PROCESSING")
          .length,
        total: reportData?.length,
      },
      {
        type: "Missing",
        typeNumber: reportData.filter((obj: any) => obj.status === "MISSING")
          .length,
        total: reportData?.length,
      },
    ];
  }

  console.log(realReportsData, realDistributorData, "dashboard");

  return (
    <>
      {(isReportsDataLoading || isDistributorDataLoading) && (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "45%",
            left: "45%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
      {!!realReportsData?.length && !!realDistributorData?.length && (
        <div>
          <div className="inform-cards">
            <div className="inform-cards__inform-card">
              <Card
                name="Reports"
                bodyInfo={`${
                  realReportsData.filter(
                    (obj: any) => obj.status === "PROCESSING"
                  ).length
                }/${realReportsData?.length}`}
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
                  realReportsData.filter((obj: any) => obj.status === "REWORK")
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
                  realReportsData.filter((obj: any) => obj.status === "SUCCESS")
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
                data={handleDistributorssDataForChart(realReportsData)}
                width={200}
                height={200}
              />
            </div>
            <div className="panel__table">
              <DashboardDistributorsTable data={realDistributorData} />
            </div>
          </div>
          <div className="panel">
            <div className="panel__chart">
              <PieChart
                name="Reports"
                data={handleReportsDataForChart(realReportsData)}
                width={200}
                height={200}
              />
            </div>

            <div className="panel__table">
              <DashboardReportsTable data={realReportsData} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
