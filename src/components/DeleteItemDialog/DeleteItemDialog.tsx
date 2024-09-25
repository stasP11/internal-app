import CustomDialog from "../../customized-mui-elements/Dialog/CustomDialog";

interface DeleteItemDialogProps {
  opened: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

function DeleteItemDialog({
  opened,
  onCancel,
  onDelete,
}: DeleteItemDialogProps) {
  return (
    <CustomDialog
      opened={opened}
      title={"Delete Item"}
      contentText={"Are you sure you want to delete this item?"}
      actions={[
        { text: "Cancel", handler: onCancel },
        { text: "Delete", handler: onDelete },
      ]}
      onClose={onCancel}
    />
  );
}

export default DeleteItemDialog;
