import useSWR from "swr";

async function fetcher(url: string): Promise<any> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("An error occurred while fetching the data.");
  }

  return response.json();
}

export default function useReportSubmissionAttempts(selectedCountry: string) {
  const url = `${process.env.REACT_APP_API_PYTHON_API}/get_report_submission_attempt?country=${selectedCountry}`;
  const { data, error } = useSWR(url, fetcher);

  return {
    reportSubmissionAttempts: data,
    isLoading: !error && !data,
    isError: error,
  };
}
