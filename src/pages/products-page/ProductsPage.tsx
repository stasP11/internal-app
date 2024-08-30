import ProductsTable from "components/ProductsTable/ProductsTable";
import { useContext, useEffect, useMemo } from "react";
import { PageInfoContext } from "contexts/PageInfoContext";
import { getFromLocalStorage } from "services/storageInterection";
import { protectedResources } from "authConfig";
import { useFetchWithMsal2 } from "hooks/useFetchWithMsal";
import useProductsData from "hooks/swr-hooks/useProductsData";
import { CircularProgress } from "@mui/material";

export type ProductRowData = Product & { idx: number };

export type Product = {
  country_code: string;
  country_name: string;
  material_number: number;
  material_name: string;
  row_insert_timestamp: string;
  row_update_timestamp: string;
  active: ProductActiveStatus;
};

export type ProductWithOldProperties = Product & {
  country_code_old: string;
  country_name_old: string;
  material_number_old: number;
  material_name_old: string;
  row_insert_timestamp_old: string;
  row_update_timestamp_old: string;
  active_old: ProductActiveStatus;
};

export type ProductActiveStatus = 1 | 0;

function ProductsPage() {
  const { setPageInfo } = useContext(PageInfoContext);
  const { error: authError, result: authResult }: any = useFetchWithMsal2({
    scopes: protectedResources.apiTodoList.scopes.read,
  });
  const selectedCountry = getFromLocalStorage("selectedCountry");
  const { data, isLoading, mutate } = useProductsData(
    authResult,
    selectedCountry
  );
  const productsData = data?.data;

  useEffect(() => {
    setPageInfo({
      headerContent: "Products",
    });
  }, []);

  function getProductsRowData(data: Product[]): ProductRowData[] {
    return data.map((product, index) => ({
      idx: index + 1,
      ...product,
    }));
  }

  const productsRowData = useMemo(() => {
    if (Array.isArray(productsData)) {
      return getProductsRowData(productsData);
    }
    return [];
  }, [productsData]);

  return (
    <>
      {isLoading ? (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : (
        <ProductsTable
          authResult={authResult}
          products={productsData?.length > 0 ? productsRowData : []}
        />
      )}
    </>
  );
}

export default ProductsPage;
