import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import React from "react";
import {
  DataGridPro,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid-pro";
import ExpandableCell from "./components/ExpandableCell";
import { DistributorsTableProps } from "./types";
import DistributorsTableToolbar from "./components/DistributorsTableToolbar";
import ToggleActiveSwitch from "./components/ToggleActiveSwitch";
import { Box } from "@mui/material";
import { getFromLocalStorage } from "../../services/storageInterection";
import { CircularProgress } from "@mui/material";

async function updateDistributorActiveStatus(data: any) {
  const url = `${process.env.REACT_APP_API_PYTHON_API}/update_distributor_list_metadata`;
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      console.log("success");
    }
    return response;
  } catch (error) {
    console.log("fail");
  }
}

const countriesCodes: any = {
  Germany: "DE",
  "South Africa": "ZA",
  Ukraine: "UA",
  Netherlands: "NL",
};

export default function DistributorsTable({ rowData }: DistributorsTableProps) {
  const selectedCountry = getFromLocalStorage("selectedCountry");
  const [isDistribitorUpdateLoaded, setDistribitorUpdateLoaded] =
    React.useState<boolean>();

  async function handleSwitch(data: any, status: boolean) {
    const dataForUpdate = {
      distributor_id: data.distributorName[1],
      country: selectedCountry,
      distributor_name: data.distributorName[0],
      active: status ? 1 : 0,
      phone: data.phone,
      injection_channels: data.injectionChannels,

      country_code: countriesCodes[selectedCountry],
      country_code_old: countriesCodes[selectedCountry],

      distributor_id_old: data.distributorName[1],
      country_old: selectedCountry,
      distributor_name_old: data.distributorName[0],
      active_old: data.active ? 1 : 0,
      phone_old: data.phone,
      injection_channels_old: data.injectionChannels,
    };

    setDistribitorUpdateLoaded(true);
    const responce = await updateDistributorActiveStatus({
      data: [dataForUpdate],
    });

    if (responce?.ok) {
      setDistribitorUpdateLoaded(false);
      if (status) {
        alert(`${data.distributorName} was activated`);
      } else {
        alert(`${data.distributorName} was disactivated`);
      }
    } else {
      setDistribitorUpdateLoaded(false);
      alert("some issue happened");
    }
  }
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
        <ToggleActiveSwitch
          initialValue={params.value}
          rowValue={params.row}
          onSwitch={handleSwitch}
        />
      ),
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 132px)",
        position: "relative",
      }}
    >
      {isDistribitorUpdateLoaded && (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "10",
          }}
        />
      )}
      <DataGridPro
        sx={{
          color: "#10384F",
          background: "#FFF",
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
        rowHeight={72}
        slots={{
          toolbar: DistributorsTableToolbar,
          exportIcon: ArrowUpwardIcon,
        }}
        pagination
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10, 25]}
      />
    </Box>
  );
}
