import { useEffect, useState } from "react";
import CustomDialog from "customized-mui-elements/Dialog/CustomDialog";
import {
  DataSteward,
  DataStewardActiveStatus,
} from "pages/data-stewards-page/DataStewardsPage";
import DataStewardForm from "./DataStewardForm";
import { isValidEmail } from "utils/isValidEmail";
import useDebounce from "hooks/useDebounce";
interface AddDataStewardDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (newSteward: Omit<DataSteward, "id">) => void;
  dataStewards: DataSteward[];
}

function AddDataStewardDialog({
  open,
  onClose,
  onSave,
  dataStewards,
}: AddDataStewardDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(1);
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);

  const debouncedEmail = useDebounce(email, 300);

  useEffect(() => {
    if (isValidEmail(debouncedEmail)) {
      setIsEmailDuplicate(
        dataStewards.some((steward) => steward.email === debouncedEmail)
      );
    }
  }, [debouncedEmail, dataStewards, isValidEmail]);

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
      isFormInvalid={!isValidEmail(email) || isEmailDuplicate || !name}
    >
      <DataStewardForm
        name={name}
        email={email}
        isValidEmail={isValidEmail(email)}
        isEmailDuplicate={isEmailDuplicate}
        status={status}
        onNameChange={setName}
        onEmailChange={setEmail}
        onStatusChange={setStatus}
      />
    </CustomDialog>
  );
}

export default AddDataStewardDialog;
