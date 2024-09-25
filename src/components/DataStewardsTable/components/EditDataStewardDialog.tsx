import CustomDialog from "customized-mui-elements/Dialog/CustomDialog";
import { useState } from "react";
import { DataSteward } from "pages/data-stewards-page/DataStewardsPage";
import DataStewardForm from "./DataStewardForm";

interface EditDataStewardDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (newSteward: Omit<DataSteward, "id">) => void;
  steward: any;
}

function EditDataStewardDialog({
  open,
  onClose,
  onSave,
  steward,
}: EditDataStewardDialogProps) {
  const [name, setName] = useState(steward.name);
  const [email, setEmail] = useState(steward.email);
  const [active, setActive] = useState(steward.active);

  const actions = [
    { text: "Cancel", handler: onClose },
    {
      text: "Save",
      handler: () => onSave({ ...steward, name, email, active }),
    },
  ];

  return (
    <CustomDialog
      opened={open}
      title="Edit"
      actions={actions}
      onClose={onClose}
    >
      <DataStewardForm
        name={name}
        email={email}
        status={active}
        onNameChange={setName}
        onEmailChange={setEmail}
        onStatusChange={setActive}
      />
    </CustomDialog>
  );
}

export default EditDataStewardDialog;
