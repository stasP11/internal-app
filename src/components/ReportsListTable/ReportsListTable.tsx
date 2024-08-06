import React, { useState } from "react";
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
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import CircularProgress from "@mui/material/CircularProgress";


import { aproveReport, rejectReport} from "../../fetch/fetch-requests/reportsRequests"


function ReportsListTableToolbar() {
  return (
    <GridToolbarContainer sx={{ minHeight: "38px" }}>
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

type Report = {
  distributor_id: any;
  status: ReportStatus;
  filename: string;
  country: string;
};

type SelectedActionParams = {
  params: {
    distributor_id: any;
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
  onRowClick: any;
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
  const fullUrl = window.location.href; 
  const baseUrl = getBaseUrl(fullUrl);
  const [ isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleFetchResult = (responceResult: any, message: string) =>{
    if(responceResult?.ok){
      setIsLoaded(false);
      alert(message);
     } else {
      setIsLoaded(false);
      alert(message);
     }
  }

  const handleClick = (SelectedActionParams: SelectedActionParams)=> {
    const { selectedAction, params } = SelectedActionParams;
    const { filename, distributor_id, country } = params;

    if (selectedAction === "view") {
      console.log(params, "important-01");
      window.open(
        `${baseUrl}/report?name=${filename}&distributor=${distributor_id}&country=${country}`,
        "_blank"
      );
    }
    if (selectedAction === "approve") {
      setIsLoaded(true);
      aproveReport(params?.filename, handleFetchResult);
    }
    if (selectedAction === "reject") {
      setIsLoaded(true);
      rejectReport(params?.filename, handleFetchResult);
    }
  }
   
  const isOpen = (status: string) => {
    if (status === "REVIEW") {
      return true;
    } else return false;
  };

  return (
    <div onClick={(e)=> e.stopPropagation()}>
     <div className={isOpen(params?.row?.status) ? "actions-open" : "actions-hided"}>
      {
        isLoaded? (<CircularProgress
        size={20}
        />): <TableMenuPopup onSelect={handleClick} params={params} />
      }
    </div>
    </div>
  );
};

const ReportsListTable: React.FC<ReportsListTableProps> = ({
  reportsListData,
  onRowClick,
}): JSX.Element => {
  const fullUrl = window.location.href; // Get the full URL of the current page
  const baseUrl = getBaseUrl(fullUrl);
  const [isAppreoveReportLoaded, setAppreoveReportLoaded] =
    React.useState<boolean>(false);

  function handleResult(result: any) {
    alert(result);
    setAppreoveReportLoaded(false);
  }

  function handleClick(SelectedActionParams: SelectedActionParams, e: any) {
    const { selectedAction, params } = SelectedActionParams;
    const { filename, distributor_id, country } = params;

    console.log(SelectedActionParams, params, 'test-001')

    if (selectedAction === "view") {
      console.log(params, "important-01");
      window.open(
        `${baseUrl}/report?name=${filename}&distributor=${distributor_id}&country=${country}`,
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


  function temporerDateCell(filename: any){
    console.log()
    if (filename) {
      const match = filename.replace(/^[A-Za-z]+_\d+_/, "");
      const [month, year] = match.split("_");
  
      if (month && year) {
        return `${month}/${year}`;
      }
    }
    return '';
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
      field: "distributor",
      headerName: "Distributor",
      renderCell: (params: any) => <DistributorCell params={params} />,
      flex: 1.3,
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
      flex: 0.3,
    },
    {
      field: "reporting_period",
      headerName: "Reporting Period",
      filterable: false,
//      type: "date",
      valueGetter: (value: any) => {
        if (value) {
          const [month, year] = value.split('_');
          return (`${month}/${year}`); 
        }
        return null;
      },
      flex: 0.5,
    },
    {
      field: "action",
      filterable: false,
      headerName: "Actions",
      renderCell: (params: any) => (
        <ActionsCell onSelect={handleClick} params={params} />
      ),
      flex: 0.2,
    },
  ];

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGridPro
        onRowClick={onRowClick}
        sx={{
          background: 'white',
          fontFamily: "Helvetica Neue",
          color: "#10384F",
          "& .MuiDataGrid-columnHeader, .MuiDataGrid-scrollbarFiller": {
            backgroundColor: "rgba(245, 245, 245, 1)",
          },
        }}
        columns={columns}
        rowHeight={72}
        rows={reportsListData}
        pagination
        initialState={{
          pagination: { paginationModel: { pageSize: 15 }},
        }}
        pageSizeOptions={[15, 25, 50, 75, 100]}
        slots={{
          toolbar: ReportsListTableToolbar,
          exportIcon: ArrowUpwardIcon,
        }}
      />
    </div>
  );
};

export default ReportsListTable;
