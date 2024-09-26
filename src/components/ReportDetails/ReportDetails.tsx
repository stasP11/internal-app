import React, { useContext, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
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
import "./ReportDetails.scss";
import Button from "@mui/material/Button";
import MultiSelectorSnackBar from "components/MultiSelectorSnackBar/MultiSelectorSnackBar";
import MappingAlternativesCell from "components/ReportDetails/MappingAlternativesCell";
import { findSameProducts } from "./services";

type ReportStatusType =
  | "MISSING"
  | "REWORK"
  | "APPROVED"
  | "REVIEW"
  | "PROCESSING"
  | "SUCCESS";

type AlternativitesType = {
  material_number: number;
  material_name: string;
};

type ReportDetailsData = {
  alternatives: Array<AlternativitesType> | [];
  id: number;
  matched: number | null;
  material_number: number;
  product_name: string;
  uom: string;
  volume: number;
};

type ProductDetailsData = {
  alternatives: Array<AlternativitesType> | [];
  id: number;
  matched: number | null;
  material_number: number;
  product_name: string;
  uom: string;
  volume: number;
};

interface ReportDetailsProps {
  data: Array<ReportDetailsData>;
  country: string;
  onUpdateTemporaryData: any;
  filename: any;
  fileStatus: any;
  onRejectReport: any;
  onApproveReport: any;
  onAlternativeChoose: any;
  isReportStatusUpdated: boolean;
}

type SameProductsType = {
  isOpenForUse: boolean;
  material_number: number;
  matchedMaterialNumber: number;
  products: any[];
};

const CustomToolbar = ({
  onApproveReport,
  onRejectReport,
  fileStatus,
  isReportStatusUpdated,
  isApproveDisabled,
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
          <Button
            variant="outlined"
            onClick={onRejectReport}
            disabled={isReportStatusUpdated}
          >
            Reject
          </Button>
          <Button
            variant="contained"
            onClick={onApproveReport}
            disabled={isApproveDisabled}
          >
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
  country,
  onUpdateTemporaryData,
  fileStatus,
  onRejectReport,
  onApproveReport,
  isReportStatusUpdated,
  onAlternativeChoose,
}): JSX.Element => {
  const [isLoaded, setLoaded] = React.useState<boolean>(false);
  const [sameProductsData, setSameProductsData] = useState<SameProductsType[]>(
    []
  );
  const [sameProductsAlertStatus, setSameProductsAlertStatus] = useState(null);
  const [numbersOfSimilarCases, setNumbersOfSimilarCases] = useState(null);

  function handleSameProductsSelectReject() {
    setSameProductsAlertStatus(null);
    setNumbersOfSimilarCases(null);
  }

  function handleAlternativeChoose(productData: any) {
    onAlternativeChoose(productData);
    /*
    temporarily inactive functionality

    const { material_number, product_name, uom, id } = productData?.params;
    if (
      !sameProductsData.some(
        (obj: any) => obj?.material_number === material_number
      )
    ) {
      const sameProducts = findSameProducts(
        data,
        sameProductsData,
        material_number,
        uom,
        product_name,
        id,
        productData?.value
      );
      if (sameProducts?.products.length > 0) {
        setSameProductsData((prev: any) => [...prev, sameProducts]);
        setSameProductsAlertStatus(material_number);
        setNumbersOfSimilarCases(sameProducts?.products.length);
      }
    }
    */
  }

  function handleSameProductsApprove(materialNumber: any) {
    const sameProductsObj = sameProductsData.find(
      (obj: SameProductsType) => obj?.material_number === materialNumber
    );
    const sameProductsArray = sameProductsObj?.products;
    if (Array.isArray(sameProductsArray)) {
      setSameProductsAlertStatus(null);
      sameProductsArray.forEach((product: ProductDetailsData) => {
        onAlternativeChoose({
          value: sameProductsObj?.matchedMaterialNumber,
          params: {
            id: product?.id,
            product_name: product?.product_name,
          },
        });
      });
    }
  }

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

  const disableApproveReportButton = (data: Array<ReportDetailsData>) => {
    if (!data || !data.length) return true;
      return data.some((item) => item.matched === null &&  item?.alternatives.length > 0 );
  };

  return (
    <>
      <Box sx={{ height: "calc(100vh - 132px)", width: "100%" }}>
        <DataGridPro
          sx={{
            padding: 0,
            background: "white",
            fontFamily: "Helvetica Neue",
            color: "#10384F",
            "& .MuiDataGrid-columnHeader, & .MuiDataGrid-filler, & .MuiDataGrid-scrollbarFiller.MuiDataGrid-scrollbarFiller--header.MuiDataGrid-scrollbarFiller--pinnedRight ":
              {
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
              isApproveDisabled: disableApproveReportButton(data),
            },
          }}
          initialState={{
            pagination: { paginationModel: { pageSize: 15 } },
            pinnedColumns: { right: ["alternatives"] },
          }}
          pageSizeOptions={[15, 25, 50, 75, 100]}
        />
        <MultiSelectorSnackBar
          isOpen={!!sameProductsAlertStatus}
          materialNumber={sameProductsAlertStatus}
          numbersOfSimilarCases={numbersOfSimilarCases}
          onClose={handleSameProductsSelectReject}
          onApprove={handleSameProductsApprove}
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
