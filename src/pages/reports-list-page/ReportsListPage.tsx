//base
import React, { useMemo } from "react";

//styles
import './ReportsListPage.scss'

//utils
import { useReportsData } from "../../hooks/swr-hooks/useReports";
import { useFetchWithMsal2 } from "../../../src/hooks/useFetchWithMsal";
import { loginRequest, protectedResources } from "../../authConfig";
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

function useAuthRequest() {
  const { error: authError, result: authResult }: any = useFetchWithMsal2({
    scopes: protectedResources.apiTodoList.scopes.read,
  });

  const selectedCountry = getFromLocalStorage("selectedCountry");

  // reportslist === get_file_details_with_status

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
  const { reportsError, authError, reportsData, isLoading } = useAuthRequest();

  const [value, setValue] = React.useState(0);

  const deduplicatedReports = useMemo(() => {
    if (reportsData) {
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
    <div className="reports-list">
      <Box sx={{ width: "100%", background: "#fff" }}>
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
          <ReportsListTable reportsListData={allReports} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ReportsListTable reportsListData={inventoryReports} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <ReportsListTable reportsListData={selloutReports} />
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default ReportsListPage;
