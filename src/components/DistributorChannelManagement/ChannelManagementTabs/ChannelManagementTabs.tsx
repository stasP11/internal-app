import { SyntheticEvent, useState } from "react";
import { EmailSettings } from "../types";
import { Box, Tab, Tabs } from "@mui/material";
import CustomTabPanel from "../CustomTabPanel/CustomTabPanel";
import EmailTab from "./EmailTab";
import ApiTab from "./ApiTab";
import SftpTab from "./SftpTab";
import InternetTab from "./InternetTab";

interface ChannelManagementTabsProps {
  emails: EmailSettings[];
  setEmails: (emails: EmailSettings[]) => void;
}

function ChannelManagementTabs({
  emails,
  setEmails,
}: ChannelManagementTabsProps) {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabsData = [
    { label: "Email", index: 0 },
    { label: "Api", index: 1 },
    { label: "SFTP", index: 2 },
    { label: "Internet", index: 3 },
  ];

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="channel-management-tabs"
            sx={{ ".MuiTab-root": { fontFamily: "inherit" } }}
          >
            {tabsData.map((tab) => (
              <Tab
                key={tab.index}
                label={tab.label}
                {...a11yProps(tab.index)}
              />
            ))}
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <EmailTab emails={emails} setEmails={setEmails} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ApiTab />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <SftpTab />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <InternetTab />
        </CustomTabPanel>
      </Box>
    </>
  );
}

export default ChannelManagementTabs;
