//base
import React from "react";
import { useLocation } from "react-router-dom";
import "./ReportDetailsPage.scss";

//utils
import { useReportsData } from "../../hooks/swr-hooks/useReports";
import { useFetchWithMsal2 } from "../../../src/hooks/useFetchWithMsal";
import { loginRequest, protectedResources } from "../../authConfig";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../services/storageInterection";
import { useExceptionsData } from "../../hooks/swr-hooks/useReports";

//components
import ReportDetails from "components/ReportDetails/ReportDetails";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

function extractDataFromUrl(url: string): any {
  const params = new URLSearchParams(url.split("?")[1] || "");
  console.log(params, "params-01");
  const filename = url.match(/\/reports-list\/([^&?]+)/)?.[1] || "";
  const distributor = params.get("distributor") || null;
  const country = params.get("country") || null;

  return {
    filename,
    distributor,
    country,
  };
}

async function aproveReportRequest(reportName: any, handleResult: any) {
  // temp-01
  // https://csci-api-7psl2cwk2q-ew.a.run.app --dev
  // https://csci-api-skthk6k3ja-ew.a.run.app -qa
  const url = `${process.env.REACT_APP_API_PYTHON_API}/move_file_back_to_flow?filename=${reportName}.csv`;
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: "",
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      handleResult('is failed');
      throw new Error("Network response was not ok");
    }
    const data = await response.json(); // Assuming the response is JSON
    handleResult('is approved');
    console.log("Response:", data);
  } catch (error) {
    handleResult('is failed');
    console.error("There was a problem with your fetch operation:", error);
  }
}

async function rejectReportRequest(reportName: any, handleResult: any) {
    const url = `${process.env.REACT_APP_API_PYTHON_API}/reject_file?filename=${reportName}.csv`;
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: "",
    };
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        handleResult('is failed to reject');
        throw new Error("Network response was not ok");
      }
      const data = await response.json(); // Assuming the response is JSON
      handleResult('is rejected');
      console.log("Response:", data);
    } catch (error) {
      handleResult('is failed to reject');
      console.error("There was a problem with your fetch operation:", error);
    }
}

const ReportDetailsPage: React.FC<any> = (): JSX.Element => {
  //  const {data: ReportDetailsData, error, isLoading} = useExceptionsData('blabla');
  const { pathname } = useLocation();
  const { filename, distributor, country } = extractDataFromUrl(pathname);
  console.log(filename, distributor, country, "params");
  const {
    data: reportDetailsData,
    error,
    isLoading,
  } = useExceptionsData(`${filename}.csv`);
  const [isAppreoveReportLoaded, setAppreoveReportLoaded] =
    React.useState<boolean>(false);

  function handleResult(result: any) {
    alert(result);
    setAppreoveReportLoaded(false);
  }

  function approveReport() {
    setAppreoveReportLoaded(true);
    aproveReportRequest(filename, handleResult);
  }

  function rejectReport() {
    setAppreoveReportLoaded(true);
    rejectReportRequest(filename, handleResult);
  }


  console.log(reportDetailsData, "ReportDetailsData-11");

  return (
    <div>
      {isAppreoveReportLoaded ? (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : null}
      {isLoading ? (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "45%",
            left: "45%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : (
        <>
          <div className="buttons-section">
            <Button variant="outlined" color="error" onClick={rejectReport}>
              Reject
            </Button>
            <Button variant="outlined" color="success" onClick={approveReport}>
              Approve
            </Button>
          </div>
          <ReportDetails
            reportDetailsData={reportDetailsData}
            reportRequestDetails={{ filename, distributor, country }}
          />
        </>
      )}
    </div>
  );
};

export default ReportDetailsPage;
