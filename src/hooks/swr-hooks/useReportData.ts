import useSWR from "swr";
const fetcher = (url: any) => fetch(url).then((res) => res.json());

export function useReportsDetailsData(shoudFetch: boolean, fileName: string) {
  return useSWR(
    shoudFetch
      ? `${process.env.REACT_APP_API_PYTHON_API}/get_distributor_data_by_filename?filename=${fileName}.csv`
      : null,
    fetcher,
    {
      // revalidateOnFocus: false,
      // refreshInterval: 10000000
    }
  );
}

export function useExceptionsReportsDetailsData(
  shoudFetch: boolean,
  fileName: string
) {
  //temp-1
  return useSWR(
    shoudFetch
      ? `${process.env.REACT_APP_API_PYTHON_API}/get_exceptions_file?filename=${fileName}.csv`
      : null,
    fetcher,
    {
      // revalidateOnFocus: false,
      // refreshInterval: 10000000
    }
  );
}
