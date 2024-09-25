import useSWR from "swr";
import useAuthFetchWithMsal from "../../auth-hooks/authHook";
import { protectedResources } from "../../../authConfig";
import fetchData from "../../../utils/fetchData";

function useFetchReportsData(country: string | null) {
  const { error: authError, result: authResult }: any = useAuthFetchWithMsal({
    scopes: protectedResources.apiTodoList.scopes.read,
  });
  return useSWR(
    [
      authResult,
      "POST",
      `${process.env.REACT_APP_API_PYTHON_API}/get_file_details_with_status`,
      { selectedCountry: country },
    ],
    fetchData,
    {
      // revalidateOnFocus: false,
      // refreshInterval: 10000000
    }
  );
}

export default useFetchReportsData;
