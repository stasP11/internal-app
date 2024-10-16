import { SetStateAction, Dispatch, ChangeEvent } from "react";
import { createObjectForRequestBody } from "../../../utils/createObjectForRequestBody";
import fetchData from "utils/fetchData";
import {
  DistributorActiveStatus,
  DistributorDetailsType,
  DistributorRowData,
} from "../types";
import { GridRowSelectionModel } from "@mui/x-data-grid";

interface HandlersProps {
  authResult: any;
  updatedDistributors: DistributorRowData[];
  setUpdatedDistributors: Dispatch<SetStateAction<DistributorRowData[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setNewAlert: Function;
  country: string;
  selectionModel: GridRowSelectionModel;
  setSelectionModel: React.Dispatch<
    React.SetStateAction<GridRowSelectionModel>
  >;
}

const useDistributorsHandlers = ({
  authResult,
  updatedDistributors,
  setUpdatedDistributors,
  setIsLoading,
  setNewAlert,
  country,
  selectionModel,
  setSelectionModel,
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
      country_code: data.countryCode,
      distributor_type: data.distributorType,
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
      console.error("Distributor not found!");
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
      if (response.post_data && response.post_data.length > 0) {
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

  async function handleBulkStatusUpdate(newStatus: DistributorActiveStatus) {
    setIsLoading(true);
    const objectsForRequest = selectionModel
      .map((id) => {
        const distributor = updatedDistributors.find(
          (dist) => dist.distributorId === id
        );
        if (distributor) {
          const mappedDistributor =
            convertDistributorRowDataToDistributorDetails(distributor);

          const mappedUpdatedDistributor = {
            ...mappedDistributor,
            active: newStatus,
          };
          return createObjectForRequestBody(
            mappedDistributor,
            mappedUpdatedDistributor
          );
        }
        return null;
      })
      .filter((p) => p !== null);

    const url = `${process.env.REACT_APP_API_PYTHON_API}/update_distributor_list_metadata`;

    try {
      const response = await fetchData([
        authResult,
        "POST",
        url,
        { data: objectsForRequest },
      ]);

      if (response.post_data && response.post_data.length > 0) {
        setUpdatedDistributors((prevDistributors) =>
          prevDistributors.map((distr) => {
            if (selectionModel.includes(distr.distributorId)) {
              return { ...distr, active: newStatus };
            }
            return distr;
          })
        );
        setNewAlert({
          alertType: "success",
          text: "Distributors updated successfully",
        });
        setSelectionModel([]);
      } else {
        throw new Error("No data was updated");
      }
    } catch (error) {
      console.error("Error updating distributors:", error);
      setNewAlert({
        alertType: "error",
        text: "Failed to update distributors",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return { handleActiveChange, handleBulkStatusUpdate };
};

export default useDistributorsHandlers;
