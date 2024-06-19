import useSWR from "swr";
//import {getDataQualityReports, getDistributorsList} from "../../api/requests"

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const fetchData = async ([authResult, method, url, data]: any) => {
  console.log(authResult?.accessToken, method, url, data, 'authResult, method, url, data')
  if (authResult?.accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${authResult?.accessToken}`;

    headers.append("Authorization", bearer);

    // If it's a GET request and data is provided, add data as query parameters
    if (method === 'GET' && data) {
      url += '?' + new URLSearchParams(data);
    }

    let options: any = {
      method: method,
      headers: headers,
    };

    // If it's not a GET request and data is provided, add data to the body
    if (method !== 'GET' && data) {
      options.body = JSON.stringify(data);
      headers.append("Content-Type", "application/json");
    }

    const response = await fetch(url, options);
    console.log(response, 'response-01')
    return await response.json();
  }
};

export function useDistributorsData(data: Array<any>) {
  // [authResult, "GET", "http://localhost:5000/api/reportslist", {selectedCountry: 'South Africa'}]
    return useSWR(
      data,
      fetchData,
      {
        // revalidateOnFocus: false,
        // refreshInterval: 10000000
      }
    );
  }

export function useReportsData(data: Array<any>) {
// [authResult, "GET", "http://localhost:5000/api/reportslist", {selectedCountry: 'South Africa'}]
  return useSWR(
    data,
    fetchData,
    {
      // revalidateOnFocus: false,
      // refreshInterval: 10000000
    }
  );
}


// temp-01
// https://csci-api-7psl2cwk2q-ew.a.run.app --dev
//https://csci-api-skthk6k3ja-ew.a.run.app --qa
export function useExceptionsData(filename: string) {
  return useSWR(
    `${process.env.REACT_APP_API_PYTHON_API}/get_exceptions_file?filename=${filename}`,
    fetcher,
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Repeat attempt after 5 sec.
        // setTimeout(() => revalidate({ retryCount }), 5000)
      },
    }
  );
}
