import CustomDialog from "customized-mui-elements/Dialog/CustomDialog";
import { useEffect, useState } from "react";
import { DataSteward } from "pages/data-stewards-page/DataStewardsPage";
import DataStewardForm from "./DataStewardForm";
import { isValidEmail } from "utils/isValidEmail";
import useDebounce from "hooks/useDebounce";

interface EditDataStewardDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (newSteward: Omit<DataSteward, "id">) => void;
  steward: any;
  dataStewards: DataSteward[];
}

function EditDataStewardDialog({
  open,
  onClose,
  onSave,
  steward,
  dataStewards,
}: EditDataStewardDialogProps) {
  const [name, setName] = useState(steward.name);
  const [email, setEmail] = useState(steward.email);
  const [active, setActive] = useState(steward.active);

  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);

  const debouncedEmail = useDebounce(email, 300);

  useEffect(() => {
    if (isValidEmail(debouncedEmail)) {
      setIsEmailDuplicate(
        dataStewards.some((steward) => steward.email === debouncedEmail)
      );
    }
  }, [debouncedEmail, dataStewards, isValidEmail]);

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
      isFormInvalid={!isValidEmail(email) || isEmailDuplicate || !name}
    >
      <DataStewardForm
        name={name}
        email={email}
        isValidEmail={isValidEmail(email)}
        isEmailDuplicate={isEmailDuplicate}
        status={active}
        onNameChange={setName}
        onEmailChange={setEmail}
        onStatusChange={setActive}
      />
    </CustomDialog>
  );
}

export default EditDataStewardDialog;
