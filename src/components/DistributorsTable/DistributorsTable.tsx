import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {
  DataGridPro,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid-pro";
import ExpandableCell from "./components/ExpandableCell";
import { DistributorsTableProps } from "./types";
import DistributorsTableToolbar from "./components/DistributorsTableToolbar";
import ToggleActiveSwitch from "./components/ToggleActiveSwitch";

export default function DistributorsTable({ rowData }: DistributorsTableProps) {
  const columns: GridColDef<any>[] = [
    { field: "id", headerName: "#", flex: 0.1 },
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
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      width: 350,
      renderCell: (params) => <ExpandableCell items={params.value} />,
      flex: 0,
    },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "injectionChannels", headerName: "Ingestion Channels", flex: 1 },
    {
      field: "active",
      headerName: "Active",
      type: "boolean",
      width: 100,
      flex: 1,
      renderCell: (params) => (
        <ToggleActiveSwitch initialValue={params.value} />
      ),
    },
  ];

  return (
    <DataGridPro
      sx={{
        color: "#10384F",
        fontFamily: "Helvetica Neue",
        "& .MuiDataGrid-columnHeader": {
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
      }}
      columns={columns}
      rows={rowData}
      getRowHeight={() => "auto"}
      slots={{ toolbar: DistributorsTableToolbar, exportIcon: ArrowUpwardIcon }}
      pagination
      autoHeight
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      pageSizeOptions={[5, 10, 25]}
    />
  );
}
