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
import MappingAlternativesCell, {
  AlternativesType,
} from "components/MappingAlternatives/MappingAlternativesCell";
import { findSameProducts } from "./services";
import {
  ReportStatusType,
  ReportDetailsData,
  ProductDetailsData,
  ReportDetailsProps,
  SameProductsType,
} from "types/reportDetailsTypes";

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
        <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
      </Box>

      {fileStatus === "REVIEW" && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            ml: "auto",
            padding: "18px 16px",
          }}
        >
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
  fileStatus,
  onRejectReport,
  onApproveReport,
  isReportStatusUpdated,
  onAlternativeChoose,
  country,
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

  function handleAlternativeChoose(
    productData: any,
    fromSmartSearch: boolean,
    setRequestStatus: any
  ) {
    onAlternativeChoose(productData, fromSmartSearch, setRequestStatus);

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

  const columnsForDataMappingReport: any[] = [
    {
      field: "#",
      headerName: "#",
      filterable: false,
      renderCell: (params: GridRenderCellParams) =>
        params.api.getAllRowIds().indexOf(params.id) + 1,
      flex: 0.1,
    },
    {
      field: "initial_product_data",
      headerName: "Material Number",
      flex: 0.5,
      valueGetter: (params: any, row: any) => {
        console.log(row, "row");
        // Access the nested property safely
        const materialNumber = row?.initial_product_data?.material_number;
        // Check if it's "null" (string) and handle it
        return materialNumber === "null" ? " " : materialNumber || "";
      },
    },
    {
      field: "initial_product_datas",
      headerName: "Item Name",
      flex: 1,
      valueGetter: (params: any, row: any) => {
        // Access the nested property safely
        return row?.initial_product_data?.product_name || ""; // Default to empty string if undefined
      },
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
    {
      field: "alternatives",
      headerName: "Bayer Mapping",
      renderCell: (params: any) => {
        return (
          <MappingAlternativesCell
            params={params?.row}
            onAlternativeChoose={handleAlternativeChoose}
            country={country}
          />
        );
      },
      flex: 1.5,
    },
  ];

  const columnsForReport: any[] = [
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
      headerName: "Material Number",
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

  const suitableColums = (fileStatus: ReportStatusType) => {
    if (fileStatus === "REVIEW") {
      return [...columnsForDataMappingReport];
    } else return [...columnsForReport];
  };

  const disableApproveReportButton = (data: Array<ReportDetailsData>) => {
    if (!data || !data.length) return true;
    return data.some((item) => item.matched === null);
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
