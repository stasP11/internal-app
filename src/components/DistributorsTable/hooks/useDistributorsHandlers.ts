import { SetStateAction, Dispatch, ChangeEvent } from "react";
import { createObjectForRequestBody } from "../../../utils/createObjectForRequestBody";
import fetchData from "utils/fetchData";
import { DistributorTypeWithIndex, DistributorActiveStatus } from "../types";
import { GridRowSelectionModel } from "@mui/x-data-grid";

interface HandlersProps {
  authResult: any;
  updatedDistributors: DistributorTypeWithIndex[];
  setUpdatedDistributors: Dispatch<SetStateAction<DistributorTypeWithIndex[]>>;
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
  selectionModel,
  setSelectionModel,
}: HandlersProps) => {
  async function handleActiveChange(
    event: ChangeEvent<HTMLInputElement>,
    id: string | number
  ) {
    const newActiveStatus = event.target.checked
      ? (1 as DistributorActiveStatus)
      : (0 as DistributorActiveStatus);

    const oldDistributor = updatedDistributors.find(
      (distributor) => distributor.distributor_id === id
    );

    if (!oldDistributor) {
      console.error("Distributor not found!");
      return;
    }

    const newDistributor = { ...oldDistributor, active: newActiveStatus };

    const distributorObjectForRequest = createObjectForRequestBody(
      oldDistributor,
      newDistributor
    );

    distributorObjectForRequest.email = distributorObjectForRequest.emails;
    delete distributorObjectForRequest.emails;
    distributorObjectForRequest.email_old =
      distributorObjectForRequest.emails_old;
    delete distributorObjectForRequest.emails_old;

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
            distributor.distributor_id === id ? newDistributor : distributor
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
          (dist) => dist.distributor_id === id
        );
        if (distributor) {
          const oldDistributor = { ...distributor };

          const updatedDistributor = {
            ...oldDistributor,
            active: newStatus,
          };

          const objectForRequest = createObjectForRequestBody(
            oldDistributor,
            updatedDistributor
          );

          objectForRequest.email = objectForRequest.emails;
          delete objectForRequest.emails;
          objectForRequest.email_old = objectForRequest.emails_old;
          delete objectForRequest.emails_old;

          return objectForRequest;
        }
        return null;
      })
      .filter((requestObject) => requestObject !== null);

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
            if (selectionModel.includes(distr.distributor_id)) {
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
