import { Product, ProductActiveStatus } from "pages/products-page/ProductsPage";
import { SetStateAction, Dispatch, ChangeEvent } from "react";
import { createObjectForRequestBody } from "../../../utils/createObjectForRequestBody";
import fetchData from "utils/fetchData";
import { GridRowSelectionModel } from "@mui/x-data-grid";

interface HandlersProps {
  authResult: any;
  updatedProducts: Product[];
  setUpdatedProducts: Dispatch<SetStateAction<Product[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setNewAlert: Function;
  selectionModel: GridRowSelectionModel;
  setSelectionModel: React.Dispatch<
    React.SetStateAction<GridRowSelectionModel>
  >;
}

const useProductHandlers = ({
  authResult,
  updatedProducts,
  setUpdatedProducts,
  setIsLoading,
  setNewAlert,
  selectionModel,
  setSelectionModel,
}: HandlersProps) => {
  async function handleActiveChange(
    event: ChangeEvent<HTMLInputElement>,
    id: string | number
  ) {
    const newActiveStatus = event.target.checked
      ? (1 as ProductActiveStatus)
      : (0 as ProductActiveStatus);

    const oldProduct = updatedProducts.find(
      (product) => product.material_number === id
    );

    if (!oldProduct) {
      console.error("Product not found!");
      return;
    }

    const newProduct = { ...oldProduct, active: newActiveStatus };

    const productObjectForRequest = createObjectForRequestBody(
      oldProduct,
      newProduct
    );

    const url = `${process.env.REACT_APP_API_PYTHON_API}/update_material_numbers_metadata`;

    setIsLoading(true);
    try {
      const response = await fetchData([
        authResult,
        "POST",
        url,
        { data: [productObjectForRequest] },
      ]);
      if (response.post_date && response.post_date.length > 0) {
        setUpdatedProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.material_number === id ? newProduct : product
          )
        );
        setNewAlert({
          alertType: "success",
          text: "Product updated successfully",
        });
      } else {
        throw new Error("No data was updated");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setNewAlert({ alertType: "error", text: "Failed to update product" });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleBulkStatusUpdate(newStatus: ProductActiveStatus) {
    setIsLoading(true);
    const objectsForRequest = selectionModel
      .map((id) => {
        const product = updatedProducts.find(
          (prod) => prod.material_number === id
        );
        if (product) {
          const updatedProduct = { ...product, active: newStatus };
          return createObjectForRequestBody(product, updatedProduct);
        }
        return null;
      })
      .filter((p) => p !== null);

    const url = `${process.env.REACT_APP_API_PYTHON_API}/update_material_numbers_metadata`;

    try {
      const response = await fetchData([
        authResult,
        "POST",
        url,
        { data: objectsForRequest },
      ]);

      if (response.post_date && response.post_date.length > 0) {
        setUpdatedProducts((prevProducts) =>
          prevProducts.map((product) => {
            if (selectionModel.includes(product.material_number)) {
              return { ...product, active: newStatus };
            }
            return product;
          })
        );
        setNewAlert({
          alertType: "success",
          text: "Products updated successfully",
        });
        setSelectionModel([]);
      } else {
        throw new Error("No data was updated");
      }
    } catch (error) {
      console.error("Error updating products:", error);
      setNewAlert({ alertType: "error", text: "Failed to update products" });
    } finally {
      setIsLoading(false);
    }
  }

  return { handleActiveChange, handleBulkStatusUpdate };
};

export default useProductHandlers;
