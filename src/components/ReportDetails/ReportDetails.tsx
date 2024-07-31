//base
import React, { useContext, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import approveAlternative from "./request";
import { UserDataContext } from "../../App";
import Box from "@mui/material/Box";
import {
  DataGridPro,
  GridRenderCellParams,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid-pro";
import RightIcon from "../../icons/right-arrow/ArrowForwardFilled.svg";
import RemoveIcon from "../../icons/bucket-icon-light/bucketIconLight.svg";
import "./ReportDetails.scss";
import Button from "@mui/material/Button";

type ReportStatusType =
  | "MISSING"
  | "REWORK"
  | "APPROVED"
  | "RECEIVED"
  | "REVIEW"
  | "PROCESSING"
  | "SUCCESS";

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
  data: Array<ReportDetailsData>;
  filename: any;
  fileStatus: any;
  onRejectReport: any;
  onApproveReport: any;
  onAlternativeChoose: any;
  isReportStatusUpdated: boolean;
}

const CustomToolbar = ({
  onApproveReport,
  onRejectReport,
  fileStatus,
  isReportStatusUpdated,
}: any) => {
  return (
    <GridToolbarContainer>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </Box>

      {fileStatus === "REVIEW" && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: "auto" }}>
          <Button variant="outlined" onClick={onRejectReport} disabled={isReportStatusUpdated}>
            Reject
          </Button>
          <Button variant="contained" onClick={onApproveReport} disabled={isReportStatusUpdated}>
            Approve
          </Button>
        </Box>
      )}
    </GridToolbarContainer>
  );
};

const ReportDetails: React.FC<ReportDetailsProps> = ({
  data,
  filename,
  fileStatus,
  onRejectReport,
  onApproveReport,
  isReportStatusUpdated,
}): JSX.Element => {
  const [isLoaded, setLoaded] = React.useState<boolean>(false);

  function handleResult(value: any) {
    alert(value);
    setLoaded(false);
  }

  function handleAlternativeChoose(result: any) {
    const requestBody: any = {
      filename: `${filename}.csv`,
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

  const MappingAlternativesCell: React.FC<any> = ({
    params,
    onAlternativeChoose,
  }): JSX.Element => {
    const { alternatives, matched, material_number, product_name } = params;
    const [selectedValue, selectValue] = React.useState<any>();
    const userData = useContext(UserDataContext);

    const [isLoaded, setIsloaded] = useState(false);

    function handleChange(e: any) {
      onAlternativeChoose({ ...e.target, params }, setIsloaded);
      //setIsloaded(true);
    }

    const ItemMapping = ({ alternatives, onChange }: any) => {
      if (alternatives.length > 0) {
        const selectedOption = alternatives.filter(
          (obj: any) => obj?.material_number === matched
        );

        return (
          <Select
            sx={{ height: 40, maxWidth: 340 }}
            value={
              selectedOption.length > 0
                ? selectedOption[0]?.material_number
                : `Founded ${alternatives.length} alternatives`
            }
            variant="outlined"
            onChange={onChange}
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

      return (
        <Select
          sx={{ height: 40, maxWidth: 340 }}
          value={`Found ${alternatives.length} alternatives`}
          variant="outlined"
          fullWidth
          disabled
        >
          <MenuItem value={`Found ${alternatives.length} alternatives`}>
            {product_name}
          </MenuItem>
          {alternatives.map(({ material_number, material_name }: any) => (
            <MenuItem key={material_number} value={material_number}>
              {material_name}
            </MenuItem>
          ))}
        </Select>
      );
    };

    return (
      <div className="alternatives-cell" style={{ position: "relative" }}>
        {isLoaded ? (
          <CircularProgress size={20} />
        ) : (
          <img src={RightIcon} alt="arrow" />
        )}
        <ItemMapping alternatives={alternatives} onChange={handleChange} />
        <img src={RemoveIcon} alt="remove-bucket" />
      </div>
    );
  };

  const columns: any = [
    {
      field: "#",
      headerName: "#",
      filterable: false,
      renderCell: (params: GridRenderCellParams) =>
        params.api.getAllRowIds().indexOf(params.id) + 1,
      flex: 0.1,
    },
    {
      field: "material_number",
      headerName: "Material number",
      flex: 0.5,
    },
    {
      field: "product_name",
      headerName: "Item Name",
      flex: 1,
    },
    {
      field: "uom",
      headerName: "UOM",
      flex: 0.3,
    },
    {
      field: "volume",
      headerName: "Volume",
      flex: 0.3,
    },
  ];

  const mappingColumn = {
    field: "alternatives",
    headerName: "Bayer Mapping",
    renderCell: (params: any) => (
      <MappingAlternativesCell
        params={params?.row}
        onAlternativeChoose={handleAlternativeChoose}
      />
    ),
    flex: 1.5,
  };

  const suitableColums = (fileStatus: ReportStatusType) => {
    if (fileStatus === "REVIEW") {
      return [...columns, mappingColumn];
    } else return columns;
  };

  return (
    <>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGridPro
          sx={{
            padding: 0,
            background: "white",
            fontFamily: "Helvetica Neue",
            color: "#10384F",
            "& .MuiDataGrid-columnHeader, .MuiDataGrid-scrollbarFiller": {
              backgroundColor: "rgba(245, 245, 245, 1)",
            },
          }}
          columns={suitableColums(fileStatus)}
          rows={data}
          rowHeight={52}
          pagination
          slots={{ toolbar: CustomToolbar }}
          slotProps={{
            toolbar: {
              onApproveReport: onApproveReport,
              onRejectReport: onRejectReport,
              fileStatus: fileStatus,
              isReportStatusUpdated: isReportStatusUpdated,
            },
          }}
          initialState={{
            pagination: { paginationModel: { pageSize: 15 } },
            pinnedColumns: { right: ["alternatives"] },
          }}
          pageSizeOptions={[15, 25, 50, 75, 100]}
        />
      </Box>
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
    </>
  );
};

export default ReportDetails;
