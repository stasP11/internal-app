import useSWR from "swr";
//import {getDataQualityReports, getDistributorsList} from "../../api/requests"

const fetcher = (url: any) => fetch(url).then((res) => res.json());
export default function useReportingPeriodsData(selectedCountry: string, reportType: string, isDefault: boolean) {

  const defaultOption = isDefault?'is_default=1': 'is_default=0'
    return useSWR(
      `${process.env.REACT_APP_API_PYTHON_API}/get_reporting_periods?country=${selectedCountry}&report_type=${reportType}&${defaultOption}`,
      fetcher,
      {
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
          // Repeat attempt after 5 sec.
          // setTimeout(() => revalidate({ retryCount }), 5000)
        },
      }
    );
  }
  
