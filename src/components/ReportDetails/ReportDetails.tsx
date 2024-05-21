//base
import React from "react";
import {
  DataGridPro,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid-pro";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { mutate } from "swr";
import approveAlternative from "./request";

type Alternativites = {
  material_number: number;
  material_name: string;
};

type ReportDetailsData = {
  alternatives: Array<Alternativites> | [];
  id: number;
  matched: number;
  material_number: number;
  product_name: string;
  uom: string;
  volume: number;
};

interface ReportDetailsProps {
  reportDetailsData: Array<ReportDetailsData>;
  reportRequestDetails: {
    filename: string;
    distributor: string;
    country: string;
  };
}

const MappingAlternativites: React.FC<any> = ({
  params,
  onAlternativeChoose,
}): JSX.Element => {
  const { alternatives, matched, material_number, product_name } = params;
  const [selectedValue, selectValue] = React.useState<any>();

  function handleChange(e: any) {
    onAlternativeChoose({ ...e.target, params });
  }

  if (alternatives.length === 0 && material_number === matched) {
    return (
      <Select
        value={`Founded ${alternatives.length} alternatives`}
        variant="outlined"
        fullWidth
        disabled
      >
        <MenuItem value={`Founded ${alternatives.length} alternatives`}>
          {product_name}
        </MenuItem>
        {alternatives.map(({ material_number, material_name }: any) => (
          <MenuItem key={material_number} value={material_number}>
            {material_name}
          </MenuItem>
        ))}
      </Select>
    );
  }

  if (alternatives.length > 0) {
    const selectedOption = alternatives.filter(
      (obj: any) => obj?.material_number === matched
    );

    console.log(selectedOption, "selectedOption");

    return (
      <Select
        value={
          selectedOption.length > 0
            ? selectedOption[0]?.material_number
            : `Founded ${alternatives.length} alternatives`
        }
        variant="outlined"
        onChange={handleChange}
        fullWidth
      >
        <MenuItem
          value={`Founded ${alternatives.length} alternatives`}
          disabled
        >
          Founded {alternatives.length} alternatives
        </MenuItem>
        {alternatives.map(({ material_number, material_name }: any) => (
          <MenuItem key={material_number} value={material_number}>
            {material_name}
          </MenuItem>
        ))}
      </Select>
    );
  }

  return <div>-</div>;
};

const ReportDetails: React.FC<ReportDetailsProps> = ({
  reportDetailsData,
  reportRequestDetails,
}): JSX.Element => {
  const [isLoaded, setLoaded] = React.useState<boolean>(false);

  function handleResult(value: any) {
    alert(value);
    setLoaded(false);
  }

  function handleAlternativeChoose(result: any) {
    console.log(result.params, "chenges!");

    const requestBody: any = {
      filename: `${reportRequestDetails.filename}.csv`,
      data: [
        {
          id: result.params.id,
          matched_material_id: result?.value,
          country: "South Africa",
          product_name: result.params.product_name,
        },
      ],
    };
    setLoaded(true);
    approveAlternative(requestBody, handleResult);
  }

  const columns: any = [
    {
      field: "id",
      headerName: "Id",
      flex: 0.5,
    },
    {
      field: "material_number",
      headerName: "Material number",
      flex: 0.7,
    },
    {
      field: "product_name",
      headerName: "Product name",
      flex: 1.5,
    },
    {
      field: "uom",
      headerName: "UOM",
      flex: 0.5,
    },
    {
      field: "volume",
      headerName: "Volume",
      flex: 0.5,
    },
    {
      field: "alternatives",
      headerName: "Mapping",
      renderCell: ({ row }: any) => (
        <MappingAlternativites
          params={row}
          onAlternativeChoose={handleAlternativeChoose}
        />
      ),
      flex: 1.5,
    },
  ];
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGridPro columns={columns} rows={reportDetailsData} />
      {isLoaded ? (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : null}
    </div>
  );
};

export default ReportDetails;
