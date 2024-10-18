import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { ChangeEvent, useState } from "react";
import DatagridTableToolbar from "components/datagrid-table-toolbar/DatagridTableToolbar";
import { Box, Button, IconButton } from "@mui/material";
import { DataGridPro } from "@mui/x-data-grid-pro";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RemoveDataStewardDialog from "./components/RemoveDataStewardDialog";
import AddDataStewardDialog from "./components/AddDataStewardDialog";
import ActiveSwitch from "components/ActiveSwitch/ActiveSwitch";
import {
  DataSteward,
  DataStewardActiveStatus,
} from "pages/data-stewards-page/DataStewardsPage";
import EditDataStewardDialog from "./components/EditDataStewardDialog";
import useDialogControls from "hooks/useDialogControls";
import { createObjectForRequestBody } from "utils/createObjectForRequestBody";
import useDataStewardsApi from "./useDataStewardsApi";
import MenuList from "components/MenuList/MenuList";
import CustomDatagridPagination from "components/CustomDatagridPagination/CustomDatagridPagination";

function DataStewardsTable({
  dataStewards,
  country,
  authResult,
}: {
  dataStewards: DataSteward[];
  country: string;
  authResult: any;
}) {
  const [selectedDataStewards, setSelectedDataStewards] =
    useState<GridRowSelectionModel>([]);

  const [stewardToDeleteEmail, setStewardToDeleteEmail] = useState<
    string | null
  >(null);
  const [stewardToEdit, setStewardToEdit] = useState<DataSteward | null>(null);

  const removeStewardDialog = useDialogControls();
  const addStewardDialog = useDialogControls();
  const editStewardDialog = useDialogControls();

  const { handleAPIRequest, isLoading } = useDataStewardsApi(
    authResult,
    country
  );

  const columns: GridColDef<any>[] = [
    {
      field: "idx",
      headerName: "#",
      flex: 0.1,
      filterable: false,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "active",
      headerName: "Active",
      type: "boolean",
      valueFormatter: (value) => {
        return value === 1;
      },
      width: 100,
      flex: 1,
      renderCell: ({ value, row }) => (
        <ActiveSwitch
          value={value === 1}
          onChange={(event) =>
            handleActiveChange(event, row.email, row.name, row.active)
          }
        />
      ),
    },
    {
      field: "edit",
      headerName: "",
      width: 50,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            handleOpenEditStewardDialog(params.row.email);
          }}
          style={{ cursor: "pointer" }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "",
      width: 50,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            handleOpenRemoveStewardDialog(params.row.email);
          }}
          style={{ cursor: "pointer" }}
        >
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  const handleOpenRemoveStewardDialog = (email: string) => {
    setStewardToDeleteEmail(email);
    removeStewardDialog.openDialog();
  };

  const handleOpenEditStewardDialog = (email: string) => {
    const stewardToEdit = dataStewards.find(
      (dataSteward) => dataSteward.email === email
    );
    if (!stewardToEdit) return;
    setStewardToEdit(stewardToEdit);
    editStewardDialog.openDialog();
  };

  const handleConfirmRemoveSteward = async () => {
    if (!stewardToDeleteEmail) return;
    const objectForRequestBody = {
      distributor_id: "Data Steward",
      country: country,
      email: stewardToDeleteEmail,
    };

    const url = `${process.env.REACT_APP_API_PYTHON_API}/delete_recipients_email_metadata`;

    const successMessage = "Data steward deleted successfully";
    const errorMessage = "Failed to delete data steward";
    handleAPIRequest(
      url,
      "POST",
      objectForRequestBody,
      successMessage,
      errorMessage,
      "success"
    );

    removeStewardDialog.closeDialog();
  };

  const handleSaveNewSteward = async (newSteward: Omit<DataSteward, "id">) => {
    const objectForRequestBody = createObjectForRequestBody(
      { name: "", email: "", country: "", distributor_id: "", active: 0 },
      { ...newSteward, country, distributor_id: "Data Steward" }
    );

    const url = `${process.env.REACT_APP_API_PYTHON_API}/update_recipients_email_metadata`;

    const successMessage = "Data steward added successfully";
    const errorMessage = "Failed to add data steward";

    handleAPIRequest(
      url,
      "POST",
      { data: [objectForRequestBody] },
      successMessage,
      errorMessage,
      "post_data"
    );
    addStewardDialog.closeDialog();
  };

  const handleEditDataSteward = async (newSteward: Omit<DataSteward, "id">) => {
    if (!stewardToEdit) return;

    const { country, distributor_id, email, name, active } = stewardToEdit;
    const oldDataStewardInfo = {
      country: country,
      distributor_id: distributor_id,
      email: email,
      name: name,
      active: active,
    };

    const newDataStewardInfo = {
      ...newSteward,
      country,
      distributor_id: "Data Steward",
    };

    const objectForRequestBody = createObjectForRequestBody(
      oldDataStewardInfo,
      newDataStewardInfo
    );

    const url = `${process.env.REACT_APP_API_PYTHON_API}/update_recipients_email_metadata`;

    const successMessage = "Data steward edited successfully";
    const errorMessage = "Failed to edit data steward";
    handleAPIRequest(
      url,
      "POST",
      { data: [objectForRequestBody] },
      successMessage,
      errorMessage,
      "post_data"
    );
    editStewardDialog.closeDialog();
  };

  const handleActiveChange = async (
    event: ChangeEvent<HTMLInputElement>,
    email: string,
    name: string,
    active: DataStewardActiveStatus
  ) => {
    const newStatus = event.target.checked ? 1 : 0;
    const objectForRequestBody = createObjectForRequestBody(
      { country, distributor_id: "Data Steward", name, email, active },
      {
        country,
        distributor_id: "Data Steward",
        name,
        email,
        active: newStatus,
      }
    );

    const url = `${process.env.REACT_APP_API_PYTHON_API}/update_recipients_email_metadata`;
    const successMessage = "Data steward active status updated";
    const errorMessage = "Failed to update active status";

    handleAPIRequest(
      url,
      "POST",
      { data: [objectForRequestBody] },
      successMessage,
      errorMessage,
      "post_data"
    );
  };

  const CustomToolbar = () => {
    return (
      <DatagridTableToolbar>
        {selectedDataStewards.length > 0 && (
          <MenuList
            label="STATUS"
            options={options}
            onSelect={handleBulkStatusUpdate}
          />
        )}
        <Button
          disabled={isLoading}
          sx={{
            marginLeft: selectedDataStewards.length < 1 ? "auto" : "0",
            fontFamily: "Helvetica Neue",
            lineHeight: "24px",
          }}
          variant="contained"
          color="primary"
          size="medium"
          onClick={addStewardDialog.openDialog}
        >
          ADD RECORD
        </Button>
      </DatagridTableToolbar>
    );
  };

  const options = [
    { value: "active", label: "Active" },
    { value: "onHold", label: "On Hold" },
  ];

  const handleBulkStatusUpdate = async (value: string) => {
    const newStatus = value === "active" ? 1 : 0;

    const editedDataStewardsArray = dataStewards
      .filter((_, idx) => selectedDataStewards.includes(idx + 1))
      .map((dataSteward) => {
        const { country, distributor_id, email, name, active } = dataSteward;
        return {
          ...dataSteward,
          country_old: country,
          distributor_id_old: distributor_id,
          email_old: email,
          name_old: name,
          active_old: active,
          active: newStatus,
        };
      });

    const url = `${process.env.REACT_APP_API_PYTHON_API}/update_recipients_email_metadata`;
    const successMessage = "Data stewards statuses updated successfully";
    const errorMessage = "Failed to update data stewards statuses";

    handleAPIRequest(
      url,
      "POST",
      { data: editedDataStewardsArray },
      successMessage,
      errorMessage,
      "post_data"
    );

    setSelectedDataStewards([]);
  };

  const dataStewardsTableStyles = {
    color: "#10384F",
    background: "#FFF",
    fontFamily: "Helvetica Neue",
    "& .MuiDataGrid-columnHeader, .MuiDataGrid-scrollbarFiller": {
      backgroundColor: "#ECEFF1",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      fontWeight: "500",
    },
    "& .MuiDataGrid-cell": {
      display: "flex",
      alignItems: "center",
      padding: "16px 10px",
    },
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 132px)",
        }}
      >
        <DataGridPro
          sx={dataStewardsTableStyles}
          loading={isLoading}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(newSelectedDataStewards) => {
            setSelectedDataStewards(newSelectedDataStewards);
          }}
          rowSelectionModel={selectedDataStewards}
          columns={columns}
          rows={dataStewards}
          rowHeight={72}
          slots={{
            toolbar: CustomToolbar,
            exportIcon: ArrowUpwardIcon,
            pagination: CustomDatagridPagination,
          }}
          pagination
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
        />
        {removeStewardDialog.isOpen && (
          <RemoveDataStewardDialog
            open={removeStewardDialog.isOpen}
            onClose={removeStewardDialog.closeDialog}
            onConfirmDelete={handleConfirmRemoveSteward}
          />
        )}
        {editStewardDialog.isOpen && (
          <EditDataStewardDialog
            open={editStewardDialog.isOpen}
            onClose={editStewardDialog.closeDialog}
            onSave={handleEditDataSteward}
            steward={stewardToEdit}
            dataStewards={dataStewards}
          />
        )}
        {addStewardDialog.isOpen && (
          <AddDataStewardDialog
            open={addStewardDialog.isOpen}
            onClose={addStewardDialog.closeDialog}
            onSave={handleSaveNewSteward}
            dataStewards={dataStewards}
          />
        )}
      </Box>
    </>
  );
}

export default DataStewardsTable;
