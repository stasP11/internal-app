//base
import React, { useMemo, useContext, useEffect } from "react";

//styles
import "./ReportsListPage.scss";

//utils
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../services/storageInterection";

//components
import ReportsListTable from "components/ReportsListTable/ReportsListTable";
import CircularProgress from "@mui/material/CircularProgress";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import useFetchReportsData from "../../fetch/fetch-hooks/reports-hooks/useFetchReportsData";
import { PageInfoContext } from "../../contexts/PageInfoContext";
import getBaseUrl from "../../utils/getBaseUrl.js";

type ReportStatus =
  | "MISSING"
  | "REWORK"
  | "APPROVED"
  | "REVIEW"
  | "PROCESSING"
  | "SUCCESS";

function formatDataForGrid(data: any) {
  if (data && data.length) {
    return data.map((currentValue: any) => ({
      ...currentValue,
      id: currentValue.filename,
      distributor: `${currentValue.Distributor_Name} ${currentValue.distributor_id}`,
    }));
  }
  return [];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ padding: "0px" }}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function getTabA11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function deduplicateData(data: any) {
  const map = new Map();
  data.forEach((item: { filename: string }) => map.set(item.filename, item));
  return Array.from(map.values());
}

const getFormattedReportsByType = (data: any, type: string) => {
  const filteredData = data.filter((report: any) =>
    report.filename.toLowerCase().includes(type)
  );

  return formatDataForGrid(filteredData);
};

export const ReportsListPage: React.FC<any> = (): JSX.Element => {
  const selectedCountry = getFromLocalStorage("selectedCountry");
  const {
    data: reportsData,
    error: reportsError,
    isLoading,
  }: any = useFetchReportsData(selectedCountry);
  const [value, setValue] = React.useState(0);
  const { setPageInfo } = useContext(PageInfoContext);
  const fullUrl = window.location.href; // Get the full URL of the current page
  const baseUrl = getBaseUrl(fullUrl);

  useEffect(() => {
    setPageInfo({
      headerContent: "Reports",
    });
  }, []);

  const deduplicatedReports = useMemo(() => {
    if (reportsData?.data) {
      return deduplicateData(reportsData.data);
    }
    return [];
  }, [reportsData]);

  const allReports = useMemo(
    () => formatDataForGrid(deduplicatedReports),
    [deduplicatedReports]
  );
  const inventoryReports = useMemo(
    () => getFormattedReportsByType(deduplicatedReports, "inventory"),
    [deduplicatedReports]
  );
  const selloutReports = useMemo(
    () => getFormattedReportsByType(deduplicatedReports, "sellout"),
    [deduplicatedReports]
  );

  function handleRowClick(clickedRow: any, e: any) {
    const { distributor_id, filename, status, country } = clickedRow?.row;

    if (status === "REVIEW" || status === "SUCCESS" || status === "APPROVED") {
      window.open(
        `${baseUrl}/report?name=${filename}&distributor=${distributor_id}&country=${country}`,
        "_blank"
      );
    }
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (isLoading) {
    return (
      <CircularProgress
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    );
  }
  const tabStyle = {
    fontFamily: "Helvetica Neue",
    color: "#516E7F",
    fontWeight: "500",
    lineHeight: "24px",
    letterSpacing: ".4px",
    padding: "9px 16px",
    "&.Mui-selected": {
      color: "#516E7F",
    },
  };

  function ReusableTab(props: any) {
    return <Tab {...props} sx={tabStyle} />;
  }

  return (
    <>
      <div className="reports-page">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <ReusableTab label="ALL REPORTS" {...getTabA11yProps(0)} />
            <ReusableTab label="INVENTORY" {...getTabA11yProps(1)} />
            <ReusableTab label="SELL-OUT" {...getTabA11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <ReportsListTable
            reportsListData={allReports}
            onRowClick={handleRowClick}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ReportsListTable
            reportsListData={inventoryReports}
            onRowClick={handleRowClick}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <ReportsListTable
            reportsListData={selloutReports}
            onRowClick={handleRowClick}
          />
        </CustomTabPanel>
      </div>
    </>
  );
};

export default ReportsListPage;
