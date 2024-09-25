import useSWR from "swr";
import useAuthFetchWithMsal from "../../auth-hooks/authHook";
import { protectedResources } from "../../../authConfig";
import fetchData from "../../../utils/fetchData";

function useFetchReportContent(filename: string | null, status: any, country: string) {
    const { error: authError, result: authResult }: any = useAuthFetchWithMsal({
      scopes: protectedResources.apiTodoList.scopes.read,
    });

    const fileContent = "get_distributor_data_by_filename";
    const fileContentWithAlternatives = "get_exceptions_file";

    const getRequestType = (status: string) => {
      if (status === "REVIEW") {
        return fileContentWithAlternatives;
      } else {
        return fileContent;
      }
    };
    return useSWR(
      [
        authResult,
        "GET",
        `${process.env.REACT_APP_API_PYTHON_API}/${getRequestType(
          status
        )}?filename=${filename}.csv&country=${country}`,
      ],
      fetchData,
      {
        // revalidateOnFocus: false,
        // refreshInterval: 10000000
      }
    );
}

export default useFetchReportContent;
