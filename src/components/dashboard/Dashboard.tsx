import "./Dashboard.scss";
import { Card } from "components/Card/Card";
import { Link } from "react-router-dom";
import PieChart from "components/Charts/Chart";
import { useReportsData } from "../../hooks/swr-hooks/useReports";
import { useContext } from "react";
import DashboardReportsTable from "./DashboardReportsTable";
import DashboardDistributorsTable from "./DashboardDistributorsTable";
import { getFromLocalStorage } from "../../services/storageInterection";
import { protectedResources } from "../../authConfig";
import { useFetchWithMsal2 } from "../../hooks/useFetchWithMsal";
import CircularProgress from "@mui/material/CircularProgress";
import { UserDataContext } from "../../App";

import DashBoardProroImage from "./Frame 1707478304.png";

// utils

function hasOnlyMissings(arr: any) {
  // Check if all elements in the array are "MISSING"
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== "MISSING") {
      return false; // Return false if any element is not "MISSING"
    }
  }
  return true; // Return true if all elements are "MISSING"
}

function hasOnlyNotMissings(arr: any) {
  // Check if all elements in the array are "MISSING"
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== "MISSING") {
      return true; // Return false if any element is not "MISSING"
    }
  }
  return false; // Return true if all elements are "MISSING"
}

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
    console.log(distributorsData, "distributorsData-01");
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

  console.log(realReportsData?.data, realDistributorData?.data, "dashboard");
  const filterData = (array: any, selectedCountry: string) => {
    return array.filter((obj: any) => obj?.country === selectedCountry);
  };

  return (
    <>
      <>
        {isEMEA && (
          <div>
            <img src={DashBoardProroImage} alt="test"></img>
          </div>
        )}
      </>
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
                      filterData(realReportsData?.data, selectedCountry).filter(
                        (obj: any) => obj.status === "PROCESSING"
                      ).length
                    }/${
                      filterData(realReportsData?.data, selectedCountry).length
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
                    <Link to={"/reports"} relative="path">
                      See all
                    </Link>
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
                    <Link to={"/reports"} relative="path">
                      See all
                    </Link>
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
                    data={filterData(
                      realDistributorData?.data,
                      selectedCountry
                    )}
                  />
                </div>
              </div>
              <div className="panel">
                <div className="panel__chart">
                  <PieChart
                    name="Reports"
                    data={handleReportsDataForChart(
                      filterData(realReportsData?.data, selectedCountry)
                    )}
                    width={200}
                    height={200}
                  />
                </div>

                <div className="panel__table">
                  <DashboardReportsTable
                    data={filterData(realReportsData?.data, selectedCountry)}
                  />
                </div>
              </div>
            </>
          )}
      </>
    </>
  );
}

export default Dashboard;
