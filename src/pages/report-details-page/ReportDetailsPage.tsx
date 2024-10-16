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
  fetchDataForMappingChoice,
  rejectReport,
} from "../../fetch/fetch-requests/reportsRequests";
import { AlertsContext } from "contexts/AlertsContext";
import getInteger from "utils/getInteger";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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
    mutate
  } = useFetchReportContent(filename, fileStatus, selectedCountry);

  const [isApproveReportLoaded, setApproveReportLoaded] =
    React.useState<boolean>(false);
  const { setNewAlert } = useContext(AlertsContext);
  const [temporaryData, setTemporaryData] = useState<any>();
  const [sameProducts, setSameProducts] = useState();

  const handleFetchResult = (responceResult: any, message: string) => {
    if (responceResult?.ok) {
      setApproveReportLoaded(false);
      setNewAlert({ alertType: "success", text: message });
      setTimeout(() => {
        navigate("/reports");
      }, 3500);
    } else {
      setApproveReportLoaded(false);
      setNewAlert({ alertType: "error", text: message });
    }
  };

  async function handleApproveReport() {
    setApproveReportLoaded(true);
    await aproveReport(filename, handleFetchResult);
  }

  async function handleRejectReport() {
    setApproveReportLoaded(true);
    await rejectReport(filename, handleFetchResult);
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
    statusUpdate: "success" | "error" | "loading",
    isSmartSearchUpdate: boolean | undefined
  ) {
    const result: any = [];
    temporaryData.forEach((obj: any) => {
      if (obj.id === data.id) {
        if (statusUpdate === "success") {
          obj.matched = data?.matched_material_id;
          obj.product_name = data?.product_name;
          obj.statusUpdate = "success";
          if (isSmartSearchUpdate) {
            obj.smart_search = [
              {
                material_name: data?.name,
                material_number: data.matched_material_id,
              },
            ];
            obj.matched = data.matched_material_id;
          }
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

    console.log(result, "final result");
    setTemporaryData(result);
  }



  useEffect(() => {
    if (!reportContent) {
      setTemporaryData([]);
      return;
    }

    const getStatusUpdate = (element: any) => {
      const { matched, alternatives, smart_search } = element;
      if (
        matched &&
        alternatives?.length > 0 &&
        element.statusUpdate !== "loading"
      ) {
        return "success";
      }
      if (
        alternatives?.length === 0 &&
        smart_search?.length > 0 &&
        getInteger(matched) === getInteger(smart_search[0].material_number)
      ) {
        return "success";
      }
      return null;
    };

    const reportTemporaryData = reportContent.map((element: any) => ({
      ...element,
      statusUpdate: getStatusUpdate(element),
    }));

    setTemporaryData(reportTemporaryData);
  }, [reportContent]);

  // save data
  async function handleAlternativeChoose(
    result: any,
    fromSmartSearch: boolean,
    setRequestStatus: any
  ) {
    const data = {
      id: result.params.id,
      matched_material_id: result?.value,
      country: country,
      product_name: result.name,
      from_smart_search: +fromSmartSearch,
    };

    const requestBody: any = {
      filename: `${filename}.csv`,
      data: [data],
    };

    handleUpdateTemporaryData(data, "loading", fromSmartSearch);
    setRequestStatus("loading");
    const responce = await fetchDataForMappingChoice(requestBody);
    if (responce?.ok) {
      setRequestStatus("success");
      fromSmartSearch
        ? handleUpdateTemporaryData(
            {
              ...data,
              name:
              result.name,
            },
            "success",
            fromSmartSearch
          )
        : handleUpdateTemporaryData(data, "success", fromSmartSearch);
        mutate();
    } else {
      handleUpdateTemporaryData(data, "error", fromSmartSearch);
      setRequestStatus("error");
    }
  }

  return (
    <>
      <div className="report-content-page">
        {reportContent && temporaryData && (
          <ReportDetails
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
    </>
  );
};

export default ReportDetailsPage;
