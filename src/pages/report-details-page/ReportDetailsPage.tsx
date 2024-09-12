//base
import React, { useState, useEffect, useContext } from "react";
import "./ReportDetailsPage.scss";
import { PageInfoContext } from "../../contexts/PageInfoContext";

//components
import { getFromLocalStorage } from "../../services/storageInterection";
import ReportDetails from "components/ReportDetails/ReportDetails";
import CircularProgress from "@mui/material/CircularProgress";
import { useSearchParams } from "react-router-dom";
import useFetchReportsData from "../../fetch/fetch-hooks/reports-hooks/useFetchReportsData";
import useFetchReportContent from "../../fetch/fetch-hooks/reports-hooks/useFetchReportContent";
import {
  aproveReport,
  rejectReport,
} from "../../fetch/fetch-requests/reportsRequests";
import { AlertsContext } from "contexts/AlertsContext";

import Alert from "@mui/material/Alert";

function SuccessAlert(alertStatus: any) {
  if (alertStatus.alertStatus == true) {
    return (
      <div className="alert-2">
        <Alert severity="success">This is a success Alert.</Alert>
      </div>
    );
  } else return <div></div>;
}

type ReportDataType = {
  data: Array<ReportDataObjType>;
};

type ReportDataObjType = {
  Distributor_Name: string;
  country: string;
  distributor_id: number;
  filename: string;
  status: ReportStatus;
  widget_status: string;
};

type ReportStatus =
  | "MISSING"
  | "REWORK"
  | "APPROVED"
  | "REVIEW"
  | "PROCESSING"
  | "SUCCESS";

type ProductData = {
  alternatives: any[];
  id: number;
  matched: number;
  material_number: number;
  product_name: string;
  uom: string;
  volume: number;
};

const ReportDetailsPage: React.FC<any> = (): JSX.Element => {
  const selectedCountry = getFromLocalStorage("selectedCountry");
  const { setPageInfo } = useContext(PageInfoContext);
  const [searchParams] = useSearchParams();
  const filename = searchParams.get("name");
  const distributor = searchParams.get("distributor");
  const country = searchParams.get("country") || "";
  const {
    data: reportsData,
    error: reportsError,
    isLoading: isLoadingReportsData,
  } = useFetchReportsData(country);
  const [fileStatus, setFileStatus] = useState<ReportStatus>();
  const {
    data: reportContent,
    error,
    isLoading: isReportContentLoading,
  } = useFetchReportContent(filename, fileStatus, selectedCountry);
  // const country
  const [isApproveReportLoaded, setApproveReportLoaded] =
    React.useState<boolean>(false);
  const { setNewAlert } = useContext(AlertsContext);
  const [temporaryData, setTemporaryData] = useState<any>();

  const handleFetchResult = (responceResult: any, message: string) => {
    if (responceResult?.ok) {
      setApproveReportLoaded(false);
      setNewAlert({ alertType: "success", text: message });
    } else {
      setApproveReportLoaded(false);
      setNewAlert({ alertType: "error", text: message });
    }
  };

  function handleApproveReport() {
    setApproveReportLoaded(true);
    aproveReport(filename, handleFetchResult);
  }

  function handleRejectReport() {
    setApproveReportLoaded(true);
    rejectReport(filename, handleFetchResult);
  }

  useEffect(() => {
    if (filename && distributor) {
      setPageInfo({
        headerContent: `${filename} (${distributor})`,
        selectedPage: "report",
        selectedTab: "reports",
      });
    }
  }, [filename, distributor]);

  useEffect(() => {
    if (reportsData?.data) {
      const { status }: ReportDataObjType = reportsData?.data.find(
        (reportData: ReportDataObjType) =>
          reportData?.filename === filename &&
          reportData?.distributor_id === Number(distributor)
      );
      setFileStatus(status);
    }
  }, [reportsData]);

  function handleUpdateTemporaryData(
    data: any,
    statusUpdate: "success" | "error" | "loading"
  ) {
    const result: any = [];
    temporaryData.forEach((obj: any) => {
      if (obj.id === data.id) {
        if (statusUpdate === "success") {
          obj.matched = data?.matched_material_id;
          obj.product_name = data?.product_name;
          obj.statusUpdate = "success";
        }
        if (statusUpdate === "error") {
          obj.statusUpdate = "error";
        }
        if (statusUpdate === "loading") {
          obj.statusUpdate = "loading";
        }
      }
      result.push(obj);
    });

    console.log(result, "result");
    setTemporaryData(result);
  }

  useEffect(() => {
    if (reportContent !== undefined) {
      const reportTemporaryData: any = [];
      reportContent.forEach((element: any) => {
        reportTemporaryData.push({ ...element, updateStatus: null });
      });

      setTemporaryData(reportTemporaryData);
    }
  }, [reportContent]);

  function handleAlternativeChoose() {}

  return (
    <div className="report-content-page">
      {reportContent && temporaryData && (
        <ReportDetails
          onUpdateTemporaryData={handleUpdateTemporaryData}
          data={temporaryData}
          filename={filename}
          country={country}
          fileStatus={fileStatus}
          isReportStatusUpdated={isApproveReportLoaded}
          onRejectReport={handleRejectReport}
          onApproveReport={handleApproveReport}
          onAlternativeChoose={handleAlternativeChoose}
        />
      )}
      {(isApproveReportLoaded ||
        isLoadingReportsData ||
        isReportContentLoading) && (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </div>
  );
};

export default ReportDetailsPage;
