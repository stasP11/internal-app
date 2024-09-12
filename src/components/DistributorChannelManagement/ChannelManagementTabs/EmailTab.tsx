import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import EmailsDatagridTableToolbar from "../EmailsDatagridTableToolbar/EmailsDatagridTableToolbar";
import { EmailSettings } from "../types";
import EmailSettingSwitch from "../EmailSettingSwitch/EmailSettingSwitch";
import { ChangeEvent } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

function EmailTab({
  emails,
  setEmails,
}: {
  emails: EmailSettings[];
  setEmails: (emails: EmailSettings[]) => void;
}) {
  const columns: GridColDef<any>[] = [
    {
      field: "idx",
      headerName: "#",
      flex: 0.1,
      filterable: false,
    },
    {
      field: "email",
      headerName: "Value",
      flex: 1,
    },
    {
      field: "send_alerts",
      headerName: "Send alerts",
      width: 80,

      renderCell: (params) => (
        <EmailSettingSwitch
          value={params.value === 1}
          onChange={(event) =>
            handleSwitchChange(event, +params.id, "send_alerts")
          }
          id={+params.id}
        />
      ),
    },
    {
      field: "receive_reports",
      headerName: "Receive reports",
      width: 80,

      renderCell: (params) => (
        <EmailSettingSwitch
          value={params.value === 1}
          onChange={(event) =>
            handleSwitchChange(event, +params.id, "receive_reports")
          }
          id={+params.id}
        />
      ),
    },
    {
      field: "reply_with_notifications",
      headerName: "Reply with notifications",
      width: 150,

      renderCell: (params) => (
        <EmailSettingSwitch
          value={params.value === 1}
          onChange={(event) =>
            handleSwitchChange(event, +params.id, "reply_with_notifications")
          }
          id={+params.id}
        />
      ),
    },
  ];

  const handleSwitchChange = (
    event: ChangeEvent<HTMLInputElement>,
    id: number,
    field: string
  ) => {
    const newValue = event.target.checked ? 1 : 0;

    setEmails(
      emails.map((email) =>
        email.id === id ? { ...email, [field]: newValue } : email
      )
    );
  };
  return (
    <DataGridPro
      sx={{
        border: "0px",
        "& .MuiDataGrid-columnHeader": {
          backgroundColor: "#ECEFF1",
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          textWrap: "wrap",
        },
        fontFamily: "inherit",
      }}
      columns={columns}
      rows={emails}
      rowHeight={52}
      slots={{
        toolbar: EmailsDatagridTableToolbar,
        exportIcon: ArrowUpwardIcon,
      }}
      pagination
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      pageSizeOptions={[5, 10, 25]}
    />
  );
}

export default EmailTab;
