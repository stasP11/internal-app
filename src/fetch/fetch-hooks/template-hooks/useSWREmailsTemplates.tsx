import useSWR from "swr";
import fetchData from "utils/fetchData";

export function useSWREmailsTemplates(
  isActive: boolean,
  country: string | null,
  authResult: any
) {
  return useSWR(
    [
      authResult,
      "GET",
      isActive
        ? `${process.env.REACT_APP_API_PYTHON_API}/get_notification_templates?country=${country}`
        : null,
    ],
    fetchData,
    {
      // revalidateOnFocus: false,
      // refreshInterval: 10000000
    }
  );
}

export function useSWREmailTemplate(
  isActive: boolean,
  country: string | null,
  title: string | null,
  imageName: any,
  authResult: any
) {
  return useSWR(
    [
      authResult,
      "GET",
      isActive
        ? `${process.env.REACT_APP_API_PYTHON_API}/get_email_templates?country=${country}&image_name=${imageName}&notification_name=${title}`
        : null,
    ],
    fetchData,
    {
      // revalidateOnFocus: false,
      // refreshInterval: 10000000
    }
  );
}

export function useSWREmailsTemplatesMix(
  isActive: boolean,
  country: string | null,
  authResult: any,
  ednpoint: string
) {
  return useSWR(
    [
      authResult,
      "GET",
      isActive
        ? `${process.env.REACT_APP_API_PYTHON_API}/${ednpoint}?country=${country}`
        : null,
    ],
    fetchData,
    {
      // revalidateOnFocus: false,
      // refreshInterval: 10000000
    }
  );
}
