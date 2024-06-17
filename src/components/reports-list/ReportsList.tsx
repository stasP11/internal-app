import "./Reports.scss";
import ReportsTable from "./Table";
import { useReportsData } from "../../hooks/swr-hooks/useReports";
import { useEffect, useState } from "react";
import { FilterModal } from "../../customized-mui-elements/ModalWindow/ModalWindow";
import Autocomplite from "../../customized-mui-elements/Autocomplite/Autocomplite";
import { useNavigate } from "react-router-dom";
import { useFetchWithMsal2 } from "../../../src/hooks/useFetchWithMsal";
import { loginRequest, protectedResources } from "../../authConfig";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../services/storageInterection";

import { DataGridPro } from '@mui/x-data-grid-pro';


import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';


function ReportsList() {
  const { error: authError, result: authResult }: any = useFetchWithMsal2({
    scopes: protectedResources.apiTodoList.scopes.read,
  });

  const selectedCountry = getFromLocalStorage('selectedCountry');

  const { data: reportsData, error: reportsError } = useReportsData([
    authResult,
    "GET",
    `${process.env.REACT_APP_GIGYA_PATH}/api/reportslist`,
    { selectedCountry },
  ]);

  console.log(reportsError, 'reportsError')

  const [dataQualityReports, setDataQualityReports] = useState<any>([]);
  const [filterStatus, setFilterStatus] = useState(false);
  //const [reportsNames, setReportsNames] = useState([]);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [usedFilter, setUsedFilter] = useState<any>(null);
  const navigate = useNavigate();

  function handleReportView(fileName: string) {
    navigate(`/report/${fileName}`, { replace: true });
  }

  function handleFilterByChoosedName(value: string) {
    if (value) {
      setUsedFilter("reportName");
      setFilteredData(
        dataQualityReports.filter(
          (reportObj: any) => reportObj?.filename === value
        )
      );
    }
    handleModalWindowStatus(false);
  }

  function handleSortAZ() {
    const sortedData = [...dataQualityReports].sort((current: any, next: any) =>
      current?.filename.localeCompare(next?.filename)
    );
    setFilteredData(sortedData);
  }

  function handleSortZA() {
    const sortedData = [...dataQualityReports].sort((current: any, next: any) =>
      next?.filename.localeCompare(current?.filename)
    );
    setFilteredData(sortedData);
  }

  function handleClearFilter() {
    setUsedFilter(null);
    setFilteredData([]);
  }

  function handleModalWindowStatus(status: boolean) {
    setFilterStatus(status);
  }

  useEffect(() => {
    if (reportsData?.length > 0) {
      setDataQualityReports([...reportsData]);
    }
  }, [reportsData]);



  return (
    <div>
      {!!dataQualityReports.length && (
        <ReportsTable
          onFilterByReportName={handleModalWindowStatus}
          onClearFilter={handleClearFilter}
          usedFilter={usedFilter}
          sortAZ={handleSortAZ}
          sortZA={handleSortZA}
          onReportView={handleReportView}
          reportsList={
            !!filteredData.length
              ? filteredData
              : reportsData
          }
        />
      )}
      {(reportsError || authError) && (
        <div>Sorry we have this problem with this :/ </div>
      )}

      <FilterModal open={filterStatus} onAction={handleModalWindowStatus}>
        <Autocomplite
          data={[]}
          onChoose={handleFilterByChoosedName}
          label="Report name"
        />
      </FilterModal>
    </div>
  );
}

export default ReportsList;
