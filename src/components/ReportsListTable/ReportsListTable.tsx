import React from "react";
import {
  DataGridPro,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid-pro";
import "./ReportsListTable.scss";
import Typography from "@mui/material/Typography";
import TableMenuPopup from "../../customized-mui-elements/TableMenuPopup/TableMenuPopup";

function ReportsListTableToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  );
}

type ReportStatus =
  | "MISSING"
  | "REWORK"
  | "APPROVED"
  | "RECEIVED"
  | "REVIEW"
  | "PROCESSING";

type OldReport = {
  distributor_id: number;
  Distributor_Name: string;
  status: ReportStatus;
  widget_status: ReportStatus;
  filename: string;
  country: string;
};

type Report = {
  distributor: { id: string; name: string };
  status: ReportStatus;
  filename: string;
  country: string;
};

type SelectedActionParams = {
  params: {
    distributor: any;
    filename: string;
    country: string;
    status: ReportStatus;
  };
  selectedAction: "view" | "approve" | "reject";
};

export interface ReportsListTableProps {
  reportsListData: Array<Report>;
}

const DistributorCell: React.FC<any> = ({ params }) => {
  console.log(params.value, "params");
  return (
    <div className="distributor-cell">
      <Typography>{params?.value?.name}</Typography>
      <Typography color="textSecondary">{params?.value?.id}</Typography>
    </div>
  );
};

const StatusCell: React.FC<any> = (params) => {
  return <div></div>;
};

const ActionsCell: React.FC<any> = ({ params, onSelect }) => {
  return (
    <div>
      <TableMenuPopup onSelect={onSelect} params={params} />
    </div>
  );
};

const ReportsListTable: React.FC<ReportsListTableProps> = ({
  reportsListData,
}): JSX.Element => {


  function handleClick(SelectedActionParams: SelectedActionParams) {
    const {selectedAction, params} = SelectedActionParams;
    const {filename, distributor, country} = params;
    
    if(selectedAction === 'view'){
        console.log(params);
        window.open(`http://localhost:3000/reports-list/${filename}&distributor=${distributor?.id}&country=${country}`, '_blank');
    }
    if(selectedAction === 'approve'){
        console.log(params);
    }
    if(selectedAction === 'reject'){
        console.log(params);
    }
  }

  const columns: any = [
    {
      field: "distributor",
      headerName: "Distributor",
      renderCell: (params: any) => <DistributorCell params={params} />,
      flex: 1.5,
    },
    {
      field: "filename",
      headerName: "File name",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      type: "singleSelect",
      valueOptions: [
        "MISSING",
        "REWORK",
        "APPROVED",
        "RECEIVED",
        "REVIEW",
        "PROCESSING",
      ],
      flex: 0.5,
    },
    {
      field: "action",
      headerName: "Actions",
      renderCell: (params: any) => (
        <ActionsCell onSelect={handleClick} params={params} />
      ),
      flex: 0.5,
    },
  ];

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGridPro
        columns={columns}
        rows={reportsListData}
        slots={{ toolbar: ReportsListTableToolbar }}
      />
    </div>
  );
};

export default ReportsListTable;
