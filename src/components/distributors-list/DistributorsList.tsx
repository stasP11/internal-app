import DistributorsTable from "./Table";
import { useSWRConfig } from "swr";
import { useDistributorsData } from "../../hooks/swr-hooks/useReports";
import { useState, useEffect } from "react";
import { fackegetDataQualityReports } from "../../api/requests";
import { FilterModal } from "../../customized-mui-elements/ModalWindow/ModalWindow";
import Autocomplite from "../../customized-mui-elements/Autocomplite/Autocomplite";
import { useReportsData } from "../../hooks/swr-hooks/useReports";
import { useFetchWithMsal2 } from "../../../src/hooks/useFetchWithMsal";
import { loginRequest, protectedResources } from "../../authConfig";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../services/storageInterection";

function DistributorsList() {
  const { error: authError, result: authResult }: any = useFetchWithMsal2({
    scopes: protectedResources.apiTodoList.scopes.read,
  });

  const selectedCountry = getFromLocalStorage("selectedCountry");

  const { data, error: reportsError } = useReportsData([
    authResult,
    "GET",
    `${process.env.REACT_APP_API_URL}/api/getdistributorslist`,
    { selectedCountry },
  ]);

  const { cache } = useSWRConfig();

  const [filterStatus, setFilterStatus] = useState(false);
  const [reportsNames, setReportsNames] = useState([]);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [usedFilter, setUsedFilter] = useState<any>(null);

  function filterByChoosedName(value: string) {
    if (value) {
      console.log(value, "choosed value");
      setUsedFilter("reportName");
      const result = data?.data.filter(
        (reportObj: any) => reportObj?.distributor_name == value
      );
      console.log(result, "final result");
      setFilteredData(
        data?.data.filter(
          (reportObj: any) => reportObj?.distributor_name == value
        )
      );
    }
    handleModalWindowStatus(false);
  }

  function handleSortAZ() {
    const sortedData = [...data?.data].sort((current: any, next: any) =>
      current?.distributor_name.localeCompare(next?.distributor_name)
    );
    setFilteredData(sortedData);
  }

  function handleSortZA() {
    const sortedData = [...data?.data].sort((current: any, next: any) =>
      next?.distributor_name.localeCompare(current?.distributor_name)
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
    if (!!data?.length) {
      console.log(data);
      setReportsNames(
        data.map((reportObj: any) => ({ label: reportObj?.distributor_name }))
      );
    }
  }, [data]);

  console.log(data, "data-11");
  return (
    <div>
      {data && (
        <DistributorsTable
          onFilterByReportName={handleModalWindowStatus}
          onClearFilter={handleClearFilter}
          usedFilter={usedFilter}
          sortAZ={handleSortAZ}
          sortZA={handleSortZA}
          distributorsList={data}
        />
      )}

      <FilterModal open={filterStatus} onAction={handleModalWindowStatus}>
        <Autocomplite
          data={reportsNames}
          onChoose={filterByChoosedName}
          label="Distributor name"
        />
      </FilterModal>
    </div>
  );
}

export default DistributorsList;
