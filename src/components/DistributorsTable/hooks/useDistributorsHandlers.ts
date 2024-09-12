import { SetStateAction, Dispatch, ChangeEvent } from "react";
import { createObjectForRequestBody } from "../../../utils/createObjectForRequestBody";
import fetchData from "utils/fetchData";
import {
  DistributorActiveStatus,
  DistributorDetailsType,
  DistributorRowData,
} from "../types";

interface HandlersProps {
  authResult: any;
  updatedDistributors: DistributorRowData[];
  setUpdatedDistributors: Dispatch<SetStateAction<DistributorRowData[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setNewAlert: Function;
  country: string;
}

interface CountryCodes {
  [countryName: string]: string;
}

const countries: CountryCodes = {
  Germany: "DE",
  "South Africa": "ZA",
  Ukraine: "UA",
  Netherlands: "NL",
};

function getCountryCode(countryName: string) {
  return countries[countryName] || "Country not found";
}

const useDistributorsHandlers = ({
  authResult,
  updatedDistributors,
  setUpdatedDistributors,
  setIsLoading,
  setNewAlert,
  country,
}: HandlersProps) => {
  function convertDistributorRowDataToDistributorDetails(
    data: DistributorRowData
  ): Omit<DistributorDetailsType, "emails"> {
    return {
      distributor_id: data.distributorId,
      distributor_name: data.distributorName[0],
      active: data.active,
      phone: data.phone,
      country: country,
      country_code: getCountryCode(country),
      injection_channels: data.injectionChannels,
    };
  }

  async function handleActiveChange(
    event: ChangeEvent<HTMLInputElement>,
    id: string | number
  ) {
    const newActiveStatus = event.target.checked
      ? (1 as DistributorActiveStatus)
      : (0 as DistributorActiveStatus);

    const oldDistributor = updatedDistributors.find(
      (distributor) => distributor.distributorId === id
    );

    if (!oldDistributor) {
      console.error("distributor not found!");
      return;
    }

    const mappedDistributor =
      convertDistributorRowDataToDistributorDetails(oldDistributor);

    const newDistributor = { ...oldDistributor, active: newActiveStatus };
    const newMappedDistributor = {
      ...mappedDistributor,
      active: newActiveStatus,
    };

    const distributorObjectForRequest = createObjectForRequestBody(
      mappedDistributor,
      newMappedDistributor
    );

    const url = `${process.env.REACT_APP_API_PYTHON_API}/update_distributor_list_metadata`;

    setIsLoading(true);
    try {
      const response = await fetchData([
        authResult,
        "POST",
        url,
        { data: [distributorObjectForRequest] },
      ]);
      if (response.post_date && response.post_date.length > 0) {
        setUpdatedDistributors((prevDistributors) =>
          prevDistributors.map((distributor) =>
            distributor.distributorId === id ? newDistributor : distributor
          )
        );
        setNewAlert({
          alertType: "success",
          text: "Distributor updated successfully",
        });
      } else {
        throw new Error("No data was updated");
      }
    } catch (error) {
      console.error("Error updating distributor:", error);
      setNewAlert({ alertType: "error", text: "Failed to update distributor" });
    } finally {
      setIsLoading(false);
    }
  }

  return { handleActiveChange };
};

export default useDistributorsHandlers;
