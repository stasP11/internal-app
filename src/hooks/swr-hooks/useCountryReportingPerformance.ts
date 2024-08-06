import useSWR from "swr";

async function fetcher(url: string): Promise<any> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("An error occurred while fetching the data.");
  }

  return response.json();
}

export default function useCountryReportingPerformance() {
  const url = `${process.env.REACT_APP_API_PYTHON_API}/get_country_reporting_performance`;
  const { data, error } = useSWR(url, fetcher);

  return {
    countryReportingPerformance: data,
    isLoading: !error && !data,
    isError: error,
  };
}
