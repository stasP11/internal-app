import { Box } from "@mui/material";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { DataGridPro } from "@mui/x-data-grid-pro";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useContext, useEffect, useState } from "react";
import { Product } from "pages/products-page/ProductsPage";
import { AlertsContext } from "contexts/AlertsContext";
import ProductsDatagridToolbar from "./components/ProductsDatagridToolbar";
import useProductHandlers from "./hooks/useProductHandlers";
import ActiveSwitch from "components/ActiveSwitch/ActiveSwitch";

function ProductsTable({
  products,
  authResult,
}: {
  products: Product[];
  authResult: any;
}) {
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>(
    []
  );
  const [updatedProducts, setUpdatedProducts] = useState<Product[]>(products);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setNewAlert } = useContext(AlertsContext);
  const { handleActiveChange, handleBulkStatusUpdate } = useProductHandlers({
    authResult,
    updatedProducts,
    setUpdatedProducts,
    setIsLoading,
    setNewAlert,
    selectionModel,
    setSelectionModel,
  });
  useEffect(() => {
    setUpdatedProducts(products);
  }, [products]);

  const productsDatagridColumns: GridColDef<any>[] = [
    {
      field: "idx",
      headerName: "#",
      flex: 0.1,
      filterable: false,
    },
    {
      field: "material_number",
      headerName: "Product ID",
      width: 200,
      flex: 1,
    },
    {
      field: "material_name",
      headerName: "Name",
      width: 350,
      flex: 0,
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
  ];

  const productsTableStyles = {
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

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 132px)",
      }}
    >
      <DataGridPro
        loading={isLoading}
        sx={productsTableStyles}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(newSelectionModel) =>
          setSelectionModel(newSelectionModel)
        }
        rowSelectionModel={selectionModel}
        columns={productsDatagridColumns}
        rows={updatedProducts}
        rowHeight={72}
        slots={{
          toolbar: () => (
            <ProductsDatagridToolbar
              selectionModel={selectionModel}
              onUpdate={handleBulkStatusUpdate}
            />
          ),
          exportIcon: ArrowUpwardIcon,
        }}
        pagination
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        getRowId={(row) => row.material_number}
      />
    </Box>
  );
}

export default ProductsTable;
