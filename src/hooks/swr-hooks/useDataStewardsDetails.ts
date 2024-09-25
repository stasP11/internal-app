import useSWR from "swr";

const fetcher = ({ url, accessToken }: any) =>
  fetch(url, {
    headers: {
      Authorization: accessToken,
    },
  }).then((res) => res.json());

export default function useDataStewardsDetails(
  auth: any,
  selectedCountry: string
) {
  console.log(auth?.accessToken, "auth");

  return useSWR(
    {
      url: `${process.env.REACT_APP_API_PYTHON_API}/get_data_steward_details?country=${selectedCountry}`,
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
