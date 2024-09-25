import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {
  DataGridPro,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid-pro";
import ExpandableCell from "./components/ExpandableCell";
import { DistributorRowData, DistributorsTableProps } from "./types";
import DatagridTableToolbar from "../datagrid-table-toolbar/DatagridTableToolbar";
import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AlertsContext } from "contexts/AlertsContext";
import useDistributorsHandlers from "./hooks/useDistributorsHandlers";
import ActiveSwitch from "components/ActiveSwitch/ActiveSwitch";

export default function DistributorsTable({
  rowData,
  authResult,
  country,
  handleRowClick,
}: DistributorsTableProps) {
  const [updatedDistributors, setUpdatedDistributors] =
    useState<DistributorRowData[]>(rowData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setNewAlert } = useContext(AlertsContext);
  const { handleActiveChange } = useDistributorsHandlers({
    authResult,
    updatedDistributors,
    setUpdatedDistributors,
    setIsLoading,
    setNewAlert,
    country,
  });

  useEffect(() => {
    setUpdatedDistributors(rowData);
  }, [rowData]);

  const rowHeight = 72;

  const distributorsTableStyles = {
    color: "#10384F",
    background: "#FFF",
    fontFamily: "Helvetica Neue",
    "& .MuiDataGrid-columnHeader, & .MuiDataGrid-scrollbarFiller": {
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

  const columns: GridColDef<any>[] = [
    { field: "idx", headerName: "#", flex: 0.1 },
    {
      field: "distributorName",
      headerName: "Distributor Name",
      width: 200,
      renderCell: (params: GridRenderCellParams) => {
        const [name, id] = params.value;
        return (
          <div style={{ lineHeight: "normal" }}>
            {name}
            <br />
            {id}
          </div>
        );
      },
      sortComparator: (distributorA, distributorB) => {
        if (!distributorA || !distributorB) return 0;
        const distributorNameA = distributorA[0];
        const distributorNameB = distributorB[0];
        return distributorNameA[0].localeCompare(distributorNameB[0]);
      },
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.2,
      renderCell: (params) => <ExpandableCell items={params.value} />,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      renderCell: (params) => <ExpandableCell items={params.value} />,
    },
    {
      field: "injectionChannels",
      headerName: "Ingestion Channels",
      width: 150,
    },
    {
      field: "active",
      headerName: "Active",
      type: "boolean",
      width: 100,
      flex: 1,
      renderCell: (params) => (
        <ActiveSwitch
          value={params.value === 1}
          onChange={(event) => handleActiveChange(event, params.id)}
        />
      ),
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 132px)",
      }}
    >
      <DataGridPro
        sx={distributorsTableStyles}
        loading={isLoading}
        disableRowSelectionOnClick
        onRowClick={(e) => handleRowClick(e.row.distributorId)}
        columns={columns}
        rows={updatedDistributors}
        rowHeight={rowHeight}
        slots={{
          toolbar: DatagridTableToolbar,
          exportIcon: ArrowUpwardIcon,
        }}
        getRowId={(row) => row.distributorId}
        pagination
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10, 25]}
      />
    </Box>
  );
}
