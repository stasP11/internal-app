import { Box, Typography } from "@mui/material";
import "./DistributorDetailsSidebar.scss";
import { useState } from "react";
import EditDistributorDetails from "./components/EditDistributorDetails/EditDistributorDetails";
import UserControls from "./components/UserControls/UserControls";
import DistributorDetails from "./components/DistributorDetails/DistributorDetails";
import { DistributorWithPhoneArray } from "components/DistributorsTable/types";

interface DistributorDetailsSidebarProps {
  distributor: DistributorWithPhoneArray;
}

function DistributorDetailsSidebar({
  distributor,
}: DistributorDetailsSidebarProps) {
  const [isEditMode, setEditMode] = useState(false);
  const [editedDistributor, setEditedDistributor] = useState(distributor);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    console.log(editedDistributor);
    setEditedDistributor(editedDistributor);
    setEditMode(false);
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
    emailsCopy.splice(index, 1);
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
