import "./Dashboard.scss";
import { Card } from "components/card/Card";
import { Link } from "react-router-dom";
import PieChart from "components/charts/Chart";
import { useReportsData } from "../../hooks/swr-hooks/useReports";
import { useEffect, useState, useContext } from "react";
import DashboardReportsTable from "./DashboardReportsTable";
import DashboardDistributorsTable from "./DashboardDistributorsTable";
import { getFromLocalStorage } from "../../services/storageInterection";
import { protectedResources } from "../../authConfig";
import { useFetchWithMsal2 } from "../../../src/hooks/useFetchWithMsal";
import CircularProgress from "@mui/material/CircularProgress";
import { UserDataContext } from "../../App";

import DashBoardProroImage from "./Frame 1707478304.png";

// utils

function hasOnlyMissings(arr: any) {
  // Check if all elements in the array are "MISSING"
  for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== 'MISSING') {
          return false; // Return false if any element is not "MISSING"
      }
  }
  return true; // Return true if all elements are "MISSING"
}

function hasOnlyNotMissings(arr: any) {
  // Check if all elements in the array are "MISSING"
  for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== 'MISSING') {
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
    console.log(distributorsData, 'distributorsData-01')
    return [
      { type: "Reported", typeNumber: 0, total: distributorsData.length },
      { type: "Missing", typeNumber: distributorsData.filter((obj: any) => hasOnlyMissings(obj.status)).length, total: distributorsData.length },
      {
        type: "Partially Reported",
        typeNumber: distributorsData.filter((obj: any) => hasOnlyNotMissings(obj.status)).length,
        total: distributorsData.length,
      },
    ];
  }

  const { isEMEA } = useContext(UserDataContext);

  function handleReportsDataForChart(reportData: any) {
    return [
      {
        type: "Received",
        typeNumber: reportData.filter(
          (obj: any) =>
            obj.status !== "MISSING"
        ).length,
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
      </>
    </>
  );
}

export default Dashboard;
