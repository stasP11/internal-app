import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { EmailSettings } from "./types";
import ChannelManagementTabs from "./ChannelManagementTabs/ChannelManagementTabs";

function DistributorChannelManagement() {
  const [emails, setEmails] = useState<EmailSettings[]>([
    {
      id: 1,
      idx: 1,
      email: "verylongexample@mail.com",
      send_alerts: 1,
      receive_reports: 1,
      reply_with_notifications: 1,
    },
    {
      id: 2,
      idx: 2,
      email: "example@mail.com",
      send_alerts: 1,
      receive_reports: 0,
      reply_with_notifications: 1,
    },
    {
      id: 3,
      idx: 3,
      email: "longexample@mail.com",
      send_alerts: 1,
      receive_reports: 1,
      reply_with_notifications: 1,
    },
  ]);

  return (
    <>
      <Box
        sx={{
          height: "100%",
          flex: 1,
          textAlign: "left",
          fontFamily: "Helvetica Neue",
          color: "#10384F",
          padding: "16px 24px",
        }}
      >
        <Typography marginBottom={"24px"} fontFamily="inherit" variant="h6">
          Channel management
        </Typography>
        <ChannelManagementTabs emails={emails} setEmails={setEmails} />
      </Box>
    </>
  );
}

export default DistributorChannelManagement;
