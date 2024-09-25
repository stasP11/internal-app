import useSWR from "swr";
import useAuthFetchWithMsal from "../../auth-hooks/authHook";
import { protectedResources } from "../../../authConfig";
import fetchData from "../../../utils/fetchData";

function useFetchReportTemplateData(reportType: 'inventory' | 'sell-out',country: string | null, authResult: any) {
  return useSWR(
    [
      authResult,
      "GET",
      `${process.env.REACT_APP_API_URL_PROXY}/report-template?type=${reportType}&country=${country}`,
    ],
    fetchData,
    {
      // revalidateOnFocus: false,
      // refreshInterval: 10000000
    }
  );
}

export default useFetchReportTemplateData;
