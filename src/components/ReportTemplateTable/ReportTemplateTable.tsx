import ToggleActiveSwitch from "components/ToggleActiveSwitch/ToggleActiveSwitch";
import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {
  DataGridPro,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridRowOrderChangeParams,
} from "@mui/x-data-grid-pro";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PriviewModal from "components/TemplatePriviewModal/TemplatePriviewModal";
import BasicPopover from "components/BasicPopover/BasicPopover";
import EditModal from "components/TemplateModals/EditModal";
import AddRowModal from "components/TemplateModals/AddRowModal";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import PreviewIcon from "icons/preview/previewIcon.svg";
import InfoIconEmpty from "icons/info-icon-empty/InfoOutlined.svg";
import "./ReportTemplateTable.scss";


 function DeleteDataFieldDialog({ open, onClose, onDelete }: any) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Data Field</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete this Data Field? You'll have to recreate it from scratch if you need it in the future.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="primary">
          Cancel
        </Button>
        <Button onClick={onDelete} variant="contained" color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}




function ActionCellTemplates({ data, onActionClick }: any) {
  return (
    <div className="action-cell">
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={"long-menu"}
        aria-expanded={"true"}
        aria-haspopup="true"
        onClick={(e: any) => onActionClick(e.currentTarget, data)}
      >
        <MoreVertIcon />
      </IconButton>
    </div>
  );
}

type ColumnDataType = {
  localName: string;
  name: string;
  dataType: string;
  minValue: number;
  maxValue: number;
  isMandatory: boolean;
  isMandatoryEMEA: boolean;
  order: number;
};

//utils
function formatUpdatedDataForBackEnd(oldValue: any, newValue: any) {
  const result: any = { ...newValue };
  for (let key in oldValue) {
    result[`${key}_old`] = oldValue[key];
  }
  return result;
}
// utils

interface ReportTemplateTableInterface {
  data: Array<ColumnDataType>;
  onRowChangePosition: any;
  onRowEdit: any;
  onAddNewRow: any;
  isTableDataLoaded: any;
  onDelete: any;
}

function ReportTempleteTableToolbar({ onAddNewRow, onPreview }: any) {
  return (
    <GridToolbarContainer
      sx={{
        minHeight: "38px",
        display: "flex",
        justifyContent: "space-between",
        padding: "5px 10px",
      }}
    >
      <div>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport />
        <Button onClick={onPreview}  startIcon={<img src={PreviewIcon} alt={'preview-icon'}/>}>Preview</Button>
      </div>
       <div className="toolbar-preview-section">
        <div className="toolbar-preview-section__naming-convention naming-convention"> 
          <img src={InfoIconEmpty} alt="info"/>
          <p>File Naming Convention</p>
        </div>
        <Button variant="contained" onClick={onAddNewRow} sx={{background: 'rgba(0, 145, 223, 1)'}}>
          Add record{" "}
        </Button>
      </div>
    </GridToolbarContainer>
  );
}

function ReportTemplateTable({
  data,
  onRowChangePosition,
  onRowEdit,
  onAddNewRow,
  onDelete,
  isTableDataLoaded,
}: ReportTemplateTableInterface) {
  const [cellPopUpcurrentTarget, setCellPopUpcurrentTarget] =
    useState<any>(null);
  const [rowData, setRowData] = useState<any>(null);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [isDeliteMode, setDeliteMode] = useState<boolean>(false);
  const [isAddNewRowMode, setAddNewRowMode] = useState<boolean>(false);
  const [isPreviewMode, setPreviewMode] = useState<boolean>(false);

  function handleActionClick(currentTarget: any, data: any) {
    setCellPopUpcurrentTarget(currentTarget);
    setRowData(data.row);
  }

  function handleOpenEditRowWindow() {
    setEditMode(true);
    setCellPopUpcurrentTarget(null);
  }

  function handleDeliteRowWindow(){
    setDeliteMode(true)
    setCellPopUpcurrentTarget(null);
  }

  function handleAddNewRow(data: any) {
    console.log(data);
    onAddNewRow(data);
    setAddNewRowMode(false);
  }

  function handleEditSave(data: any) {
    console.log(rowData, data, "test-11");
    onRowEdit(rowData, data);
    setEditMode(false);
    setRowData(null);
  }

  const handleRowOrderChange = async (params: GridRowOrderChangeParams) => {
    const { targetIndex, oldIndex } = params;
    const substitutedRow = { ...data[targetIndex] };
    substitutedRow.order = oldIndex;
    const substituteRow = { ...data[oldIndex] };
    substituteRow.order = targetIndex;

    formatUpdatedDataForBackEnd(data[targetIndex], substitutedRow);
    formatUpdatedDataForBackEnd(data[oldIndex], substituteRow);

    // make request=>
    onRowChangePosition(targetIndex, oldIndex, substitutedRow, substituteRow);
  };

  const columns = [
    {
      field: "order",
      headerName: "#",
      valueGetter: (value: any) => {
        return value + 1;
      },
      filterable: false,
      flex: 0.3,
    },
    {
      field: "localName",
      headerName: "Field Name in Local Language",
      filterable: false,
      flex: 2.4,
    },
    {
      field: "name",
      headerName: "Field Name in English",
      filterable: false,
      flex: 2.2,
    },
    {
      field: "dataType",
      headerName: "Data Type",
      filterable: false,
      maxWidth: 112,
      flex: 0.9,
    },
    {
      field: "minValue",
      headerName: "Min Value",
      filterable: false,
      maxWidth: 120,
      flex: 1,
    },
    {
      field: "maxValue",
      headerName: "Max Value",
      filterable: false,
      maxWidth: 120,
      flex: 1,
    },
    {
      field: "isMandatory",
      headerName: "Mandatory",
      filterable: false,
      renderCell: (params: any) => (
        <ToggleActiveSwitch initialValue={params?.value} />
      ),
      flex: 0.7,
    },
    {
      field: "actions",
      headerName: " ",
      flex: 0.4,
      filterable: false,
      renderCell: (params: any) => (
        <div>
          <ActionCellTemplates
            data={params}
            onActionClick={handleActionClick}
          />
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: "calc(100vh - 180px)", width: "100%" }}>
      {isEditMode && (
        <EditModal
          open={isEditMode}
          data={rowData}
          onClose={() => {
            setRowData(null);
            setEditMode(false);
          }}
          onSave={handleEditSave}
        />
      )}

      <DeleteDataFieldDialog
       open={isDeliteMode}
       onClose={() => setDeliteMode(false)}
       onDelete={()=> { onDelete(rowData.order); setDeliteMode(false)}}
      />

      <PriviewModal
        open={isPreviewMode}
        reportType={"Inventory"}
        onClose={() => setPreviewMode(false)}
        data={data}
      />
      <AddRowModal
        open={isAddNewRowMode}
        onClose={() => setAddNewRowMode(false)}
        onSave={handleAddNewRow}
        order={data.length}
      />
      <BasicPopover
        targetEvent={cellPopUpcurrentTarget}
        setTargetEvent={setCellPopUpcurrentTarget}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton
              sx={{ width: "160px", height: "36px" }}
              onClick={handleOpenEditRowWindow}
            >
              <ListItemText primary="Edit" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ width: "160px", height: "36px" }}
            onClick={handleDeliteRowWindow}
            >
              <ListItemText primary="Delete" />
            </ListItemButton>
          </ListItem>
        </List>
      </BasicPopover>

      <DataGridPro
        sx={{
          background: "white",
          borderTop: "none",
          maxWidth: "100%",
          overflowY: "scroll",
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
          fontFamily: "Helvetica Neue",
          color: "#10384F",
          "& .MuiDataGrid-columnHeader, .MuiDataGrid-scrollbarFiller": {
            backgroundColor: "rgba(245, 245, 245, 1)",
          },
        }}
        rows={data}
        columns={columns}
        rowReordering
        onRowOrderChange={handleRowOrderChange}
        pagination
        loading={isTableDataLoaded}
        pageSizeOptions={[10, 15]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        slots={{
          toolbar: ReportTempleteTableToolbar,
        }}
        slotProps={{
          toolbar: {
            onAddNewRow: () => setAddNewRowMode(true),
            onPreview: () => setPreviewMode(true),
          },
        }}
      />
    </div>
  );
}

export default ReportTemplateTable;
