import React from "react";
import DatagridTableToolbar from "components/datagrid-table-toolbar/DatagridTableToolbar";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { ProductActiveStatus } from "pages/products-page/ProductsPage";
import MenuList from "components/MenuList/MenuList";

interface DistributorsDatagridToolbarProps {
  selectionModel: GridRowSelectionModel;
  onUpdate: (newStatus: ProductActiveStatus) => void;
}

const DistributorsDatagridToolbar: React.FC<
  DistributorsDatagridToolbarProps
> = ({ selectionModel, onUpdate }) => {
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

export default DistributorsDatagridToolbar;
