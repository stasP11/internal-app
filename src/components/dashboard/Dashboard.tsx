import "./Dashboard.scss";
import { Card } from "components/Card/Card";
import { Link } from "react-router-dom";
import PieChart from "components/Charts/Chart";
import { useReportsData } from "../../hooks/swr-hooks/useReports";
import { useContext } from "react";
import { getFromLocalStorage } from "../../services/storageInterection";
import { protectedResources } from "../../authConfig";
import { useFetchWithMsal2 } from "../../hooks/useFetchWithMsal";
import CircularProgress from "@mui/material/CircularProgress";
import { UserDataContext } from "../../App";
import DashboardDistributorsTable from "./DashboardDistributorsTable";
import DashboardReportsTable from "./DashboardReportsTable";
import { getPastThreeMonthsInterval } from "utils/getPastThreeMonthsInterval";
import { hasOnlyMissings, hasOnlyNotMissings } from "utils/dashboardUtils";
import { isReportInTimeInterval } from "utils/isReportInTimeInterval";

interface FileDetailsWithStatus {
  distributor_id: number;
  Distributor_Name: string;
  status: string;
  widget_status: string;
  filename: string;
  country: string;
  reporting_period: string;
}

interface FileDetailsWithStatusArray {
  distributor_id: number;
  Distributor_Name: string;
  status: string[];
  widget_status: string[];
  filename: string[];
  country: string;
}

type DistributorData = (FileDetailsWithStatus | FileDetailsWithStatusArray)[];

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
    "POST",
    `${process.env.REACT_APP_API_PYTHON_API}/get_file_details_with_status`,
    { selectedCountry },
  ]);

  return { reportsError, authError, reportsData, isLoading };
}

function useAuthRequestDistributors() {
  const { error: authError, result: authResult }: any = useFetchWithMsal2({
    scopes: protectedResources.apiTodoList.scopes.read,
  });

  const {
    data: realDistributorData,
    error: reportsError,
    isLoading,
  } = useReportsData([
    authResult,
    "GET",
    `${process.env.REACT_APP_API_PYTHON_API}/get_file_details_with_status_array`,
  ]);

  return { reportsError, authError, realDistributorData, isLoading };
}

function Dashboard() {
  const selectedCountry = getFromLocalStorage("selectedCountry");
  const { reportsData: realReportsData, isLoading: isReportsDataLoading } =
    useAuthRequestReports();
  const { realDistributorData, isLoading: isDistributorDataLoading } =
    useAuthRequestDistributors();

  function handleDistributorssDataForChart(distributorsData: any) {
    return [
      { type: "Reported", typeNumber: 0, total: distributorsData.length },
      {
        type: "Missing",
        typeNumber: distributorsData.filter((obj: any) =>
          hasOnlyMissings(obj.status)
        ).length,
        total: distributorsData.length,
      },
      {
        type: "Partially Reported",
        typeNumber: distributorsData.filter((obj: any) =>
          hasOnlyNotMissings(obj.status)
        ).length,
        total: distributorsData.length,
      },
    ];
  }

  const { isEMEA } = useContext(UserDataContext);

  function handleReportsDataForChart(reportData: any) {
    return [
      {
        type: "Received",
        typeNumber: reportData.filter((obj: any) => obj.status !== "MISSING")
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

  const filterData = (array: any, selectedCountry: string) => {
    return array.filter((obj: any) => obj?.country === selectedCountry);
  };

  const filterDataForTables = (
    array: DistributorData,
    selectedCountry: string
  ): DistributorData => {
    const interval = getPastThreeMonthsInterval();

    return array
      .filter((distributor) => distributor.country === selectedCountry)
      .map((distributor) => {
        if (typeof distributor.filename === "string") {
          return isReportInTimeInterval(distributor.filename, interval)
            ? distributor
            : null;
        }

        const reportsInTimeInterval = distributor.filename
          .map((filename, index) =>
            isReportInTimeInterval(filename, interval) ? index : -1
          )
          .filter((index) => index !== -1);

        if (reportsInTimeInterval.length === 0) {
          return null;
        }

        return {
          ...distributor,
          filename: reportsInTimeInterval.map(
            (index) => distributor.filename[index]
          ),
          status: reportsInTimeInterval.map(
            (index) => distributor.status[index]
          ),
          widget_status: reportsInTimeInterval.map(
            (index) => distributor.widget_status[index]
          ),
        };
      })
      .filter(
        (
          distributor
        ): distributor is FileDetailsWithStatus | FileDetailsWithStatusArray =>
          distributor !== null
      );
  };

  return (
    <>
        {!isEMEA && (isReportsDataLoading || isDistributorDataLoading) && (
          <CircularProgress
            sx={{
              position: "absolute",
              top: "45%",
              left: "45%",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}

        {realReportsData?.data?.length > 0 &&
          realDistributorData?.data?.length > 0 &&
          !isEMEA && (
            <>
              <div className="inform-cards">
                <div className="inform-cards__inform-card">
                  <Card
                    name="Reports"
                    bodyInfo={`${
                         realReportsData?.data.filter(
                        (obj: any) => obj.status !== "MISSING"
                      ).length
                    }/${
                      realReportsData?.data.length
                    }`}
                    bodyExplaining={"received/total"}
                    status={""}
                    update={""}
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
                      filterData(realReportsData?.data, selectedCountry).filter(
                        (obj: any) => obj.status === "REWORK"
                      ).length
                    }`}
                    bodyExplaining={"reports to review"}
                    status={""}
                    isDangerStatus
                  >
                    {" "}
                    <Link to={"/reports"} relative="path"></Link>
                  </Card>
                </div>
                <div className="inform-cards__inform-card">
                  <Card
                    name="Mapped Successfully"
                    bodyInfo={`${
                      filterData(realReportsData?.data, selectedCountry).filter(
                        (obj: any) => obj.status === "SUCCESS"
                      ).length
                    }`}
                    bodyExplaining={"reports to approve"}
                    status={"."}
                  >
                    {" "}
                    <Link to={"/reports"} relative="path"></Link>
                  </Card>
                </div>
              </div>

              <div className="panel">
                <div className="panel__chart">
                  <PieChart
                    name="Distributors"
                    data={handleDistributorssDataForChart(
                      filterData(realDistributorData?.data, selectedCountry)
                    )}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="panel__table">
                  <DashboardDistributorsTable
                    data={
                      filterDataForTables(
                        realDistributorData?.data,
                        selectedCountry
                      ) as FileDetailsWithStatusArray[]
                    }
                  />
                </div>
              </div>
              <div className="panel">
                <div className="panel__chart">
                  <PieChart
                    name="Reports"
                    data={handleReportsDataForChart(
                      realReportsData?.data
                    )}
                    width={200}
                    height={200}
                  />
                </div>

                <div className="panel__table">
                  <DashboardReportsTable
                    data={
                      filterDataForTables(
                        realReportsData?.data,
                        selectedCountry
                      ) as FileDetailsWithStatus[]
                    }
                  />
                </div>
              </div>
            </>
          )}
      </>
  );
}

export default Dashboard;
