import { useState, useContext } from "react";
import fetchData from "utils/fetchData";
import { AlertsContext } from "contexts/AlertsContext";
import useDataStewardsDetails from "hooks/swr-hooks/useDataStewardsDetails";

function useDataStewardsApi(authResult: any, country: string) {
  const [isLoading, setIsLoading] = useState(false);
  const { setNewAlert } = useContext(AlertsContext);
  const { mutate } = useDataStewardsDetails(authResult, country);

  const handleAPIRequest = async (
    url: string,
    method: string,
    body: any,
    successMessage: string,
    errorMessage: string,
    successKey = "success" || "post_data"
  ) => {
    setIsLoading(true);
    try {
      const response = await fetchData([authResult, method, url, body]);
      let isSuccess =
        successKey === "post_data"
          ? response[successKey] && response[successKey].length > 0
          : response[successKey];

      if (isSuccess) {
        //   if (response.success) {
        setTimeout(() => {
          mutate();
          setNewAlert({
            alertType: "success",
            text: successMessage,
          });
          setIsLoading(false);
        }, 3000);
      } else {
        throw new Error("Operation failed");
      }
    } catch (error) {
      console.error(errorMessage, error);
      setNewAlert({
        alertType: "error",
        text: errorMessage,
      });
      setIsLoading(false);
    }
  };

  return { handleAPIRequest, isLoading };
}

export default useDataStewardsApi;
