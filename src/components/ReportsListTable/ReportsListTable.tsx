import React from "react";
import {
  DataGridPro,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridRenderCellParams,
} from "@mui/x-data-grid-pro";
import "./ReportsListTable.scss";
import Typography from "@mui/material/Typography";
import TableMenuPopup from "../../customized-mui-elements/TableMenuPopup/TableMenuPopup";
import getBaseUrl from "../../utils/getBaseUrl.js";
import { Chip } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { CustomButton } from "components/DistributorsTable/components/CustomButton";
import { ViewHeadlineOutlined } from "@mui/icons-material";
import {
  aproveReportRequest,
  rejectReportRequest,
} from "../../api/files-requests";

function ReportsListTableToolbar() {
  return (
    <GridToolbarContainer sx={{minHeight: '38px'}}>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <CustomButton
        IconComponent={ViewHeadlineOutlined}
        buttonText="View"
        handleClick={() => console.log("View button clicked")}
      />
      <GridToolbarExport />
      <CustomButton
        IconComponent={MailOutlineIcon}
        buttonText="Share"
        handleClick={() => console.log("Share button clicked")}
      />
    </GridToolbarContainer>
  );
}

type ReportStatus =
  | "MISSING"
  | "REWORK"
  | "APPROVED"
  | "RECEIVED"
  | "REVIEW"
  | "PROCESSING"
  | "SUCCESS";

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

const typographyStyles = {
  fontFamily: "Helvetica Neue",
  fontSize: "14px",
};

export interface ReportsListTableProps {
  reportsListData: Array<Report>;
}

const DistributorCell: React.FC<any> = ({ params }) => {
  const [name, id] = params?.value?.split(/ (?=\d+$)/);
  return (
    <div className="distributor-cell" style={{ textTransform: "uppercase" }}>
      <Typography sx={typographyStyles}>{name}</Typography>
      <Typography sx={typographyStyles}>{id}</Typography>
    </div>
  );
};

const ActionsCell: React.FC<any> = ({ params, onSelect }) => {
  return (
    <div className={params?.row?.status === "REVIEW" ? "open" : "hided"}>
      <TableMenuPopup onSelect={onSelect} params={params} />
    </div>
  );
};

const ReportsListTable: React.FC<ReportsListTableProps> = ({
  reportsListData,
}): JSX.Element => {
  const fullUrl = window.location.href; // Get the full URL of the current page
  const baseUrl = getBaseUrl(fullUrl);
  const [isAppreoveReportLoaded, setAppreoveReportLoaded] =
  React.useState<boolean>(false);

  function handleResult(result: any) {
    alert(result);
    setAppreoveReportLoaded(false);
  }

  function handleClick(SelectedActionParams: SelectedActionParams) {
    const { selectedAction, params } = SelectedActionParams;
    const { filename, distributor, country } = params;

    if (selectedAction === "view") {
      console.log(params);
      window.open(
        `${baseUrl}/reports-list/${filename}&distributor=${distributor?.id}&country=${country}`,
        "_blank"
      );
    }
    if (selectedAction === "approve") {
      aproveReportRequest(params?.filename, handleResult);
    }
    if (selectedAction === "reject") {
      rejectReportRequest(params?.filename, handleResult);
    }
  }

  const statusColorMap: Record<ReportStatus, string> = {
    REWORK: "var(--red)",
    REVIEW: "var(--orange)",
    MISSING: "var(--red)",
    PROCESSING: "var(--orange)",
    APPROVED: "var(--green)",
    RECEIVED: "var(--green)",
    SUCCESS: "var(--green)",
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
        "SUCCESS",
      ],
      renderCell: (params: any) => (
        <Chip
          label={params.value.toLowerCase()}
          style={{
            backgroundColor: statusColorMap[params.value as ReportStatus],
            color: "#fff",
            textTransform: "capitalize",
            fontFamily: "Helvetica Neue",
          }}
          size="small"
          variant="filled"
        />
      ),
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
        sx={{
          fontFamily: "Helvetica Neue",
          color: "#10384F",
          "& .MuiDataGrid-columnHeader, .MuiDataGrid-scrollbarFiller": {
            backgroundColor: "#ECEFF1",
          },
          
        }}
        columns={columns}
        rowHeight={72}
        rows={reportsListData}
        slots={{
          toolbar: ReportsListTableToolbar,
          exportIcon: ArrowUpwardIcon,
        }}
      />
    </div>
  );
};

export default ReportsListTable;
