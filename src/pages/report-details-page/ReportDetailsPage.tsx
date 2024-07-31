//base
import React, { useState, useEffect, useContext } from "react";
import "./ReportDetailsPage.scss";
import { PageInfoContext} from '../../contexts/PageInfoContext';
// requests
import {
  aproveReportRequest,
  rejectReportRequest,
} from "../../api/files-requests";
//components
import ReportDetails from "components/ReportDetails/ReportDetails";
import CircularProgress from "@mui/material/CircularProgress";
import { useSearchParams } from "react-router-dom";
import useFetchReportsData from "../../fetch/fetch-hooks/reports-hooks/useFetchReportsData";
import useFetchReportContent from "../../fetch/fetch-hooks/reports-hooks/useFetchReportContent";
import { aproveReport, rejectReport} from "../../fetch/fetch-requests/reportsRequests"

import Alert from '@mui/material/Alert';

function SuccessAlert(alertStatus: any){
  if(alertStatus.alertStatus == true){
    return <div className="alert-2"><Alert severity="success">This is a success Alert.</Alert></div>
  } else return <div></div>
}

function ErrorAlert(){
  return <div className="alert-2"><Alert severity="error">This is an error Alert.</Alert></div>
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
  | "RECEIVED"
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

type ReportContentType = Array<ProductData>;

const ReportDetailsPage: React.FC<any> = (): JSX.Element => {
  const [alertStatus, setAlert]= useState(false)
  const { setPageInfo } = useContext(PageInfoContext);
  const [searchParams] = useSearchParams();
  const filename = searchParams.get("name");
  const distributor = searchParams.get("distributor");
  const country = searchParams.get("country");
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
  } = useFetchReportContent(filename, fileStatus);
  const [isApproveReportLoaded, setApproveReportLoaded] =
    React.useState<boolean>(false);

  function handleResult(result: any, message: string) {
    alert(message);
    setApproveReportLoaded(false);
  }

  function handleApproveReport() {
    setApproveReportLoaded(true);
    aproveReport(filename, handleResult);
  }

  function handleRejectReport() {
    setApproveReportLoaded(true);
    rejectReport(filename, handleResult);
  }


  useEffect(()=>{
   if(filename && distributor){
    setPageInfo({
      headerContent: `${filename} (${distributor})`,
      selectedPage: 'report',
      selectedTab: 'reports'
    })
   }
  }, [filename, distributor])

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


  function handleAlternativeChoose(){
    
  }

  return (
    <div className="report-content-page">
      <SuccessAlert alertStatus={alertStatus}/>
      {reportContent && (
        <ReportDetails
          data={reportContent}
          filename={filename}
          fileStatus={fileStatus}
          isReportStatusUpdated={isApproveReportLoaded}
          onRejectReport={handleRejectReport}
          onApproveReport={handleApproveReport}
          onAlternativeChoose={handleAlternativeChoose}
        />
      )}
      {(isApproveReportLoaded || isLoadingReportsData || isReportContentLoading) && (
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
