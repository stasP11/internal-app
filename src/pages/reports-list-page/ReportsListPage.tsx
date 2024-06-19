//base
import React from "react";

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



const test1 = [
  {
    "distributor_id": 4887032,
    "Distributor_Name": "SANKI KHULU CONCEPTS SOLUTIONS",
    "status": "REVIEW",
    "widget_status": "RECEIVED",
    "filename": "InventoryReport_4887032_02_2024",
    "country": "South Africa"
},

{
  "distributor_id": 4887032,
  "Distributor_Name": "SANKI KHULU CONCEPTS SOLUTIONS",
  "status": "REVIEW",
  "widget_status": "RECEIVED",
  "filename": "SelloutReport_4887032_02_2024",
  "country": "South Africa"
},
{
  "distributor_id": 899043,
  "Distributor_Name": "NULANDIS DIV OF AECI LTD",
  "status": "REVIEW",
  "widget_status": "RECEIVED",
  "filename": "SelloutReport_899043_02_2024",
  "country": "South Africa"
},
{
  "distributor_id": 899043,
  "Distributor_Name": "NULANDIS DIV OF AECI LTD",
  "status": "REVIEW",
  "widget_status": "RECEIVED",
  "filename": "SelloutReport_899043_03_2024",
  "country": "South Africa"
},
{
  "distributor_id": 900286,
  "Distributor_Name": "Novon Protecta (Pty) Ltd",
  "status": "REVIEW",
  "widget_status": "RECEIVED",
  "filename": "SelloutReport_900286_03_2024",
  "country": "South Africa"
},
{
  "distributor_id": 100012,
  "Distributor_Name": "Test distributor from South Africa 12",
  "status": "REVIEW",
  "widget_status": "RECEIVED",
  "filename": "SelloutReport_100012_03_2024",
  "country": "South Africa"
},

]

function temporaryHandleData(data: any) {
  console.log(data, 'data')
  if(typeof data!== undefined && data?.length >0){
    return data.reduce(
      (accumulator: any, currentValue: any) =>
        accumulator.concat([
          {
            ...currentValue,
            id: currentValue?.filename,
            distributor: {
              id: currentValue?.distributor_id,
              name: currentValue?.Distributor_Name,
            },
          },
        ]),
      []
    );
  }
  }

function useAuthRequest() {
  const { error: authError, result: authResult }: any = useFetchWithMsal2({
    scopes: protectedResources.apiTodoList.scopes.read,
  });

  const selectedCountry = getFromLocalStorage("selectedCountry");

  const { data: reportsData, error: reportsError, isLoading } = useReportsData([
    authResult,
    "GET",
    `${process.env.REACT_APP_API_URL_PROXY}/api/reportslist`,
    { selectedCountry },
  ]);

  return { reportsError, authError, reportsData, isLoading };
}

export const ReportsListPage: React.FC<any> = (): JSX.Element => {
  const { reportsError, authError, reportsData, isLoading } = useAuthRequest();


  return (
    <>
    {
      isLoading?(<CircularProgress
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        />):(null)
    }
      {reportsData?.length>0 ? (
        <ReportsListTable reportsListData={temporaryHandleData(reportsData)} />
      ) : <ReportsListTable reportsListData={[]} />}
    </>
  );
};

export default ReportsListPage;
