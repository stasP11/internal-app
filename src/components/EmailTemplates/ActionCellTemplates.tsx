import { IconButton } from "@mui/material";
import EditIcon from "icons/edit-icon/EditOutlined.svg"
import MoreVertIcon from "@mui/icons-material/MoreVert";

function ActionCellTemplates({ data, onActionClick }: any) {
  return (
    <div className="action-cell">
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={"long-menu"}
        aria-expanded={"true"}
        aria-haspopup="true"
        onClick={(e: any) => onActionClick(e, data)}
      >
        <img  src={EditIcon} alt="edit-icon"/>
      </IconButton>
    </div>
  );
}

export default ActionCellTemplates;
