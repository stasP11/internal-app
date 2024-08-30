import React from "react";
import DatagridTableToolbar from "components/datagrid-table-toolbar/DatagridTableToolbar";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import MenuList from "./MenuList";
import { ProductActiveStatus } from "pages/products-page/ProductsPage";

interface ProductsDatagridToolbarProps {
  selectionModel: GridRowSelectionModel;
  onUpdate: (newStatus: ProductActiveStatus) => void;
}

const ProductsDatagridToolbar: React.FC<ProductsDatagridToolbarProps> = ({
  selectionModel,
  onUpdate,
}) => {
  const options = [
    { value: "active", label: "Active" },
    { value: "onHold", label: "On Hold" },
  ];

  const handleSelect = (value: string) => {
    const newStatus = value === "active" ? 1 : 0;
    onUpdate(newStatus);
  };

  return (
    <DatagridTableToolbar>
      {selectionModel.length > 0 && (
        <MenuList label="STATUS" options={options} onSelect={handleSelect} />
      )}
    </DatagridTableToolbar>
  );
};

export default ProductsDatagridToolbar;
