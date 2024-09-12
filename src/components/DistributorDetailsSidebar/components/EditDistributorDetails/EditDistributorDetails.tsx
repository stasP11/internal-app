import { Box, TextField } from "@mui/material";
import InfoLabel from "../InfoLabel/InfoLabel";
import SelectStatusField from "../SelectStatusField/SelectStatusField";
import RemovableListInput from "../RemovableListInput/RemovableListInput";
import { DistributorWithPhoneArray } from "components/DistributorsTable/types";

type EditDistributorDetailsProps = {
  distributor: DistributorWithPhoneArray;
  handleChange: (prop: keyof DistributorWithPhoneArray, value: any) => void;
  handleAddPhone: () => void;
  handleDeletePhone: (index: number) => void;
  handleAddEmail: () => void;
  handleDeleteEmail: (index: number) => void;
};

function EditDistributorDetails({
  distributor,
  handleChange,
  handleAddPhone,
  handleDeletePhone,
  handleAddEmail,
  handleDeleteEmail,
}: EditDistributorDetailsProps) {
  const inputStyles = {
    fontFamily: "Helvetica Neue",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "24px",
    letterSpacing: "0.15000000596046448px",
  };

  return (
    <Box sx={{ mt: 2 }}>
      <div className="info-container">
        <InfoLabel text="Initial Info" />
        <div className="info-inputs">
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={distributor.distributor_name}
            onChange={(e) => handleChange("distributor_name", e.target.value)}
            inputProps={{
              style: inputStyles,
            }}
          />
          <TextField
            label="Code"
            variant="outlined"
            fullWidth
            value={distributor.distributor_id}
            onChange={(e) => handleChange("distributor_id", e.target.value)}
            inputProps={{
              style: inputStyles,
            }}
          />
          <SelectStatusField
            value={distributor.active}
            onChange={(e) =>
              handleChange("active", e.target.value === "Active" ? 1 : 0)
            }
          />
        </div>
      </div>
      <RemovableListInput
        items={distributor.phone}
        handleDelete={handleDeletePhone}
        handleChange={(index, value) => {
          let newPhones = [...distributor.phone];
          newPhones[index] = value;
          handleChange("phone", newPhones);
        }}
        handleAdd={handleAddPhone}
        label="Phone numbers"
        buttonText="Add number"
      />
      <RemovableListInput
        items={distributor.emails}
        handleDelete={handleDeleteEmail}
        handleChange={(index, value) => {
          let newEmails = [...distributor.emails];
          newEmails[index] = value;
          handleChange("emails", newEmails);
        }}
        handleAdd={handleAddEmail}
        label="Emails"
        buttonText="Add email"
      />
    </Box>
  );
}

export default EditDistributorDetails;
