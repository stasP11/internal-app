import useSWR from "swr";

async function fetcher(url: string): Promise<any> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("An error occurred while fetching the data.");
  }

  return response.json();
}

export default function useAggregationPerProduct(selectedCountry: string) {
  const url = `${process.env.REACT_APP_API_PYTHON_API}/get_aggregation_per_product?country=${selectedCountry}`;
  const { data, error } = useSWR(url, fetcher);

  return {
    aggregationPerProduct: data,
    isLoading: !error && !data,
    isError: error,
  };
}
