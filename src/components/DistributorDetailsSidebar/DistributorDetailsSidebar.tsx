import { Box, Typography } from "@mui/material";
import "./DistributorDetailsSidebar.scss";
import { useContext, useState } from "react";
import EditDistributorDetails from "./components/EditDistributorDetails/EditDistributorDetails";
import UserControls from "./components/UserControls/UserControls";
import DistributorDetails from "./components/DistributorDetails/DistributorDetails";
import {
  DistributorWithPhoneArray,
  EditedDistributor,
} from "components/DistributorsTable/types";
import { createObjectForRequestBody } from "utils/createObjectForRequestBody";
import { joinArrayWithComma } from "utils/joinArrayWithComma";
import fetchData from "utils/fetchData";
import { AlertsContext } from "contexts/AlertsContext";
import useDistributorsDetails from "hooks/swr-hooks/useDistributorsDetails";
import { getFromLocalStorage } from "services/storageInterection";
import { isValidEmail } from "utils/isValidEmail";
import { isValidPhoneNumber } from "utils/isValidPhoneNumber";

interface DistributorDetailsSidebarProps {
  distributor: DistributorWithPhoneArray;
  authResult: any;
  setIsLoading: (value: boolean) => void;
}

function DistributorDetailsSidebar({
  distributor,
  authResult,
  setIsLoading,
}: DistributorDetailsSidebarProps) {
  const [isEditMode, setEditMode] = useState(false);
  const [editedDistributor, setEditedDistributor] = useState<EditedDistributor>(
    distributor as EditedDistributor
  );
  const { setNewAlert } = useContext(AlertsContext);
  const country = getFromLocalStorage("selectedCountry");
  const { mutate } = useDistributorsDetails(authResult, country);

  const hasInvalidEmail = editedDistributor.emails
    .filter((email) => email !== null)
    .some((email) => !isValidEmail(email as string));

  const hasInvalidPhone = editedDistributor.phone.some(
    (phone) => !isValidPhoneNumber(phone)
  );

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    const objectForRequest = createObjectForRequestBody(
      {
        ...distributor,
        phone: joinArrayWithComma(distributor.phone),
      },
      {
        ...editedDistributor,
        phone: joinArrayWithComma(editedDistributor.phone),
      }
    );

    objectForRequest.email = objectForRequest.emails;
    delete objectForRequest.emails;
    objectForRequest.email_old = objectForRequest.emails_old;
    delete objectForRequest.emails_old;

    const url = `${process.env.REACT_APP_API_PYTHON_API}/update_distributor_list_metadata`;

    setIsLoading(true);
    try {
      const response = await fetchData([
        authResult,
        "POST",
        url,
        { data: [objectForRequest] },
      ]);
      if (response.post_data && response.post_data.length > 0) {
        setTimeout(() => {
          mutate();
          setEditedDistributor(editedDistributor);
          setEditMode(false);
          setNewAlert({
            alertType: "success",
            text: "Distributor updated successfully",
          });
          setIsLoading(false);
        }, 3000);
      } else {
        throw new Error("No data was updated");
      }
    } catch (error) {
      console.error("Error updating distributor:", error);
      setIsLoading(false);
      setNewAlert({ alertType: "error", text: "Failed to update distributor" });
    }
  };

  const handleCancel = () => {
    setEditedDistributor(distributor);
    setEditMode(false);
  };

  const handleChange = (prop: any, value: any) => {
    setEditedDistributor((prevState) => ({
      ...prevState,
      [prop]: value,
    }));
  };

  const handleDeletePhone = (index: number) => {
    const phonesCopy = [...editedDistributor.phone];
    phonesCopy.splice(index, 1);
    handleChange("phone", phonesCopy);
  };

  const handleAddPhone = () => {
    handleChange("phone", [...editedDistributor.phone, ""]);
  };

  const handleDeleteEmail = (index: number) => {
    const emailsCopy = [...editedDistributor.emails];
    if (emailsCopy[index] === "") {
      emailsCopy.splice(index, 1);
    } else {
      emailsCopy[index] = null;
    }
    handleChange("emails", emailsCopy);
  };

  const handleAddEmail = () => {
    handleChange("emails", [...editedDistributor.emails, ""]);
  };

  return (
    <Box
      sx={{
        width: "384px",
        height: "100%",
        padding: "16px 24px",
        fontFamily: "Helvetica Neue",
        color: "#10384F",
        letterSpacing: "0.15px",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography fontFamily="inherit" variant="h6">
          Information
        </Typography>
        <UserControls
          isEditMode={isEditMode}
          handleCancel={handleCancel}
          handleEdit={handleEdit}
          handleSave={handleSave}
          hasInvalidEmail={hasInvalidEmail}
          hasInvalidPhone={hasInvalidPhone}
        />
      </Box>

      {isEditMode ? (
        <EditDistributorDetails
          distributor={{
            ...editedDistributor,
          }}
          handleAddEmail={handleAddEmail}
          handleAddPhone={handleAddPhone}
          handleChange={handleChange}
          handleDeleteEmail={handleDeleteEmail}
          handleDeletePhone={handleDeletePhone}
        />
      ) : (
        <DistributorDetails distributor={editedDistributor} />
      )}
    </Box>
  );
}

export default DistributorDetailsSidebar;
