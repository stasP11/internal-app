import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import {
  DataSteward,
  DataStewardActiveStatus,
} from "pages/data-stewards-page/mockDataStewards";
import { ChangeEvent, useEffect, useState } from "react";
import DatagridTableToolbar from "components/datagrid-table-toolbar/DatagridTableToolbar";
import MenuList from "./components/MenuList";
import { Box, Button, IconButton } from "@mui/material";
import { DataGridPro } from "@mui/x-data-grid-pro";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RemoveDataStewardDialog from "./components/RemoveDataStewardDialog";
import AddDataStewardDialog from "./components/AddDataStewardDialog";
import ActiveSwitch from "components/ActiveSwitch/ActiveSwitch";

function DataStewardsTable({ dataStewards }: { dataStewards: DataSteward[] }) {
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>(
    []
  );
  const [updatedDataStewards, setUpdatedDataStewards] =
    useState<DataSteward[]>(dataStewards);

  const [openRemoveStewardDialog, setOpenRemoveStewardDialog] = useState(false);
  const [openAddStewardDialog, setOpenAddStewardDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);

  useEffect(() => {
    setUpdatedDataStewards(dataStewards);
  }, [dataStewards]);

  useEffect(() => {}, [openRemoveStewardDialog]);

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
      renderCell: (params) => (
        <ActiveSwitch
          value={params.value === 1}
          onChange={(event) => handleActiveChange(event, params.id)}
        />
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
          onClick={() => handleOpenRemoveStewardDialog(params.id as number)}
          style={{ cursor: "pointer" }}
        >
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  const handleOpenRemoveStewardDialog = (id: number) => {
    setIdToDelete(id);
    setOpenRemoveStewardDialog(true);
  };

  const handleCloseRemoveStewardDialogDialog = () => {
    setOpenRemoveStewardDialog(false);
  };

  const handleCloseAddStewardDialog = () => {
    setOpenAddStewardDialog(false);
  };

  const handleConfirmRemoveSteward = () => {
    if (idToDelete !== null) {
      const filteredDataStewards = updatedDataStewards.filter(
        (item) => item.id !== idToDelete
      );
      const reindexedDataStewards = filteredDataStewards.map(
        (steward, index) => ({
          ...steward,
          idx: index + 1,
        })
      );
      setUpdatedDataStewards(reindexedDataStewards);
    }
    handleCloseRemoveStewardDialogDialog();
  };

  const handleSaveNewSteward = (newSteward: DataSteward) => {
    const newDataStewards = [newSteward, ...updatedDataStewards];
    const newDataStewardsWithIdx = newDataStewards.map((steward, index) => ({
      ...steward,
      idx: index + 1,
    }));
    setUpdatedDataStewards(newDataStewardsWithIdx);
    handleCloseAddStewardDialog();
  };

  const handleActiveChange = (
    event: ChangeEvent<HTMLInputElement>,
    id: string | number
  ) => {
    const newStatus = event.target.checked ? 1 : 0;
    const updatedDataStewardsTemp = updatedDataStewards.map((dataSteward) =>
      dataSteward.id === id
        ? { ...dataSteward, active: newStatus as DataStewardActiveStatus }
        : dataSteward
    );
    setUpdatedDataStewards(updatedDataStewardsTemp);
  };

  const CustomToolbar = () => {
    return (
      <DatagridTableToolbar>
        {selectionModel.length > 0 && (
          <MenuList label="STATUS" options={options} onSelect={handleSelect} />
        )}
        <Button
          sx={{
            marginLeft: selectionModel.length < 1 ? "auto" : "0",
            fontFamily: "Helvetica Neue",
            lineHeight: "24px",
          }}
          variant="contained"
          color="primary"
          size="medium"
          onClick={() => setOpenAddStewardDialog(true)}
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

  const handleSelect = (value: string) => {
    const newStatus = value === "active" ? 1 : 0;
    const updated = updatedDataStewards.map((dataSteward) =>
      selectionModel.includes(dataSteward.id)
        ? { ...dataSteward, active: newStatus as DataStewardActiveStatus }
        : dataSteward
    );
    setUpdatedDataStewards(updated);
  };

  const productsTableStyles = {
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
          sx={productsTableStyles}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(newSelectionModel) =>
            setSelectionModel(newSelectionModel)
          }
          rowSelectionModel={selectionModel}
          columns={columns}
          rows={updatedDataStewards}
          rowHeight={72}
          slots={{
            toolbar: CustomToolbar,
            exportIcon: ArrowUpwardIcon,
          }}
          pagination
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 25]}
        />
        {openRemoveStewardDialog && (
          <RemoveDataStewardDialog
            open={openRemoveStewardDialog}
            onClose={handleCloseRemoveStewardDialogDialog}
            onConfirm={handleConfirmRemoveSteward}
          />
        )}
        {openAddStewardDialog && (
          <AddDataStewardDialog
            open={openAddStewardDialog}
            onClose={handleCloseAddStewardDialog}
            onSave={handleSaveNewSteward}
          />
        )}
      </Box>
    </>
  );
}

export default DataStewardsTable;
