import { useState } from "react";
import CustomDialog from "customized-mui-elements/Dialog/CustomDialog";
import {
  DataSteward,
  DataStewardActiveStatus,
} from "pages/data-stewards-page/DataStewardsPage";
import DataStewardForm from "./DataStewardForm";
interface AddDataStewardDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (newSteward: Omit<DataSteward, "id">) => void;
}

function AddDataStewardDialog({
  open,
  onClose,
  onSave,
}: AddDataStewardDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(1);

  const handleSave = () => {
    if (name && email) {
      const newSteward: Omit<DataSteward, "id"> = {
        name,
        email,
        active: status as DataStewardActiveStatus,
      };
      onSave(newSteward);
    } else {
      alert("All fields are required.");
    }
  };

  const actions = [
    { text: "Cancel", handler: onClose },
    { text: "Save", handler: handleSave },
  ];

  return (
    <CustomDialog
      opened={open}
      title="Add New Data Steward"
      actions={actions}
      onClose={onClose}
    >
      <DataStewardForm
        name={name}
        email={email}
        status={status}
        onNameChange={setName}
        onEmailChange={setEmail}
        onStatusChange={setStatus}
      />
    </CustomDialog>
  );
}

export default AddDataStewardDialog;
