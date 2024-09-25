import useSWR from "swr";
import useAuthFetchWithMsal from "../../auth-hooks/authHook";
import { protectedResources } from "../../../authConfig";
import fetchData from "../../../utils/fetchData";

export function useSWREmailsTemplates(isActive: boolean ,country: string | null, authResult: any) {
  return useSWR(
    [
      authResult,
      "GET",
      (isActive? `${process.env.REACT_APP_API_URL_PROXY}/emails-template?country=${country}` : null),
    ],
    fetchData,
    {
      // revalidateOnFocus: false,
      // refreshInterval: 10000000
    }
  );
}

export function useSWREmailTemplate(isActive: boolean ,title: string | null, authResult: any) {
  return useSWR(
    [
      authResult,
      "GET",
      (isActive? `${process.env.REACT_APP_API_URL_PROXY}/email-template?title=${title}` : null),
    ],
    fetchData,
    {
      // revalidateOnFocus: false,
      // refreshInterval: 10000000
    }
  );
}
