import { Button } from "@mui/material";

interface UserControlsProps {
  isEditMode: boolean;
  handleEdit: () => void;
  handleCancel: () => void;
  handleSave: () => void;
}

function UserControls({
  isEditMode,
  handleEdit,
  handleCancel,
  handleSave,
}: UserControlsProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {!isEditMode ? (
        <Button
          onClick={handleEdit}
          sx={{
            fontFamily: "inherit",
            borderColor: "rgba(0, 0, 0, 0.42)",
            padding: "4px 10px",
            color: "inherit",
          }}
          variant="outlined"
          size="small"
        >
          Edit
        </Button>
      ) : (
        <>
          <Button
            onClick={handleCancel}
            sx={{
              fontFamily: "inherit",
              borderColor: "rgba(0, 0, 0, 0.42)",
              padding: "4px 10px",
              color: "inherit",
            }}
            variant="outlined"
            size="small"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            sx={{ fontFamily: "inherit" }}
            variant="contained"
            color="primary"
            size="small"
          >
            Save
          </Button>
        </>
      )}
    </div>
  );
}

export default UserControls;