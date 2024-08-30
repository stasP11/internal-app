import useSWR from "swr";

const fetcher = ({ url, accessToken }: any) =>
  fetch(url, {
    headers: {
      Authorization: accessToken,
    },
  }).then((res) => res.json());

export default function useProductsData(auth: any, selectedCountry: string) {
  return useSWR(
    {
      url: `${process.env.REACT_APP_API_PYTHON_API}/get_material_numbers?country=${selectedCountry}`,
      accessToken: auth?.accessToken,
    },
    fetcher,
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Repeat attempt after 5 sec.
        // setTimeout(() => revalidate({ retryCount }), 5000)
      },
    }
  );
}
