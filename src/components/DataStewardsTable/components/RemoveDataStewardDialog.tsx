import CustomDialog from "customized-mui-elements/Dialog/CustomDialog";

interface RemoveDataStewardDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
}

function RemoveDataStewardDialog({
  open,
  onClose,
  onConfirmDelete,
}: RemoveDataStewardDialogProps) {
  const actions = [
    { text: "Cancel", handler: onClose },
    { text: "Delete", handler: onConfirmDelete },
  ];

  return (
    <CustomDialog
      opened={open}
      title="Confirm Delete"
      actions={actions}
      contentText="Are you sure you want to delete this data steward?"
      onClose={onClose}
    />
  );
}

export default RemoveDataStewardDialog;
