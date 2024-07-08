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

// requests
import { aproveReportRequest, rejectReportRequest} from "../../api/files-requests";

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

const ReportDetailsPage: React.FC<any> = (): JSX.Element => {
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
