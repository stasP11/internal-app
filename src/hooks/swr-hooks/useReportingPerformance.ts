import useSWR from "swr";

async function fetcher(url: string): Promise<any> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("An error occurred while fetching the data.");
  }

  return response.json();
}

export default function useReportingPerformance(selectedCountry: string) {
  const url = `${process.env.REACT_APP_API_PYTHON_API}/get_reporting_performance?country=${selectedCountry}`;
  const { data, error } = useSWR(url, fetcher);

  return {
    reportingPerformance: data,
    isLoading: !error && !data,
    isError: error,
  };
}
