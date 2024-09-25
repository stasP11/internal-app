import "./TemplatesPage.scss";
import React from "react";
import { ChangeEvent, useState, useEffect, useRef, useContext } from "react";
import { getFromLocalStorage } from "../../services/storageInterection";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import useFetchReportTemplateData from "../../fetch/fetch-hooks/template-hooks/useFetchReportTemplateData";
import {
  useSWREmailsTemplates,
  useSWREmailTemplate,
} from "../../fetch/fetch-hooks/template-hooks/useSWREmailsTemplates";
import ReportTemplateTable from "components/ReportTemplateTable/ReportTemplateTable";
import fetchData from "../../utils/fetchData";
import useAuthFetchWithMsal from "../../fetch/auth-hooks/authHook";
import { protectedResources } from "../../authConfig";
import EmailsTemplateTable from "components/EmailTemplates/EmailsTemplateTable";
import { FetchParams, handleApiRequest } from "fetch/fetch-requests/handleApiRequest";
import { AlertsContext } from "contexts/AlertsContext";

async function fetchUpdateTempleteRow(
  authResult: any,
  method: any,
  url: string,
  data: any
) {
  const responce = await fetchData([authResult, method, url, data]);
  return responce;
}

type ColumnDataType = {
  localName: string;
  name: string;
  dataType: "Text" | "Number" | "Decimal" | "Date";
  minValue: number;
  maxValue: number;
  isMandatory: boolean;
  isMandatoryEMEA: boolean;
  order: number;
};

function ControlPanel({ labels, value, onChange }: any) {
  const tabStyle = {
    fontFamily: "Helvetica Neue",
    color: "#516E7F",
    fontWeight: "500",
    lineHeight: "24px",
    letterSpacing: ".4px",
    padding: "9px 16px",
    "&.Mui-selected": {
      color: "#516E7F",
    },
  };

  function getTabA11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  function ReusableTab(props: any) {
    return <Tab {...props} sx={tabStyle} />;
  }

  return (
    <>
      <Tabs value={value} onChange={onChange} aria-label="basic tabs example">
        {labels.map((label: string, index: number) => (
          <ReusableTab key={label} {...getTabA11yProps(index)} label={label} />
        ))}
      </Tabs>
    </>
  );
}

function TemplatesPage() {
  const [isTableDataLoaded, setIsTableDataLoaded] = useState(true);
  const { error: authError, result: authResult }: any = useAuthFetchWithMsal({
    scopes: protectedResources.apiTodoList.scopes.read,
  });

  const templeteType: any = {
    0: "inventory",
    1: "sell-out",
    2: "emails",
  };
  const selectedCountry = getFromLocalStorage("selectedCountry");
  const [templateNumber, setTemplateNumber] = useState(0);
  const { data } = useFetchReportTemplateData(
    templeteType[templateNumber],
    selectedCountry,
    authResult
  );
  const { data: emailsData } = useSWREmailsTemplates(
    true,
    selectedCountry,
    authResult
  );
  const [selectedEmail, setSelectedEmail] = useState(null);
  const { data: emailTemplateData, isLoading: isEmailTemplateLoading } =
    useSWREmailTemplate(!!selectedEmail, selectedEmail, authResult);

  const [templatesData, setTemplatesData] = useState<Array<ColumnDataType>>([]);
  const [emailsTemplates, setEmailsTemplates] = useState<Array<ColumnDataType>>(
    []
  );
  const { setNewAlert } = useContext(AlertsContext);

  useEffect(() => {
    if (
      data &&
      (templeteType[templateNumber] === "inventory" ||
        templeteType[templateNumber] === "sell-out")
    ) {
      setTemplatesData(data);
      setIsTableDataLoaded(false);
    }
    if (emailsData && templeteType[templateNumber] === "emails") {
      console.log("emailsData");
      setEmailsTemplates(emailsData);
      setIsTableDataLoaded(false);
    }
  }, [data, emailsData]);

  const handleTabChange = async (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setTemplateNumber(newValue);
  };

  const handleRowChangePosition = async (
    oldIndex: number,
    targetIndex: number,
    substitutedObj: any,
    substituteObj: any
  ) => {
    const updatedData: Array<ColumnDataType> = [...templatesData];
    updatedData[targetIndex] = substituteObj;
    updatedData[oldIndex] = substitutedObj;
    updatedData.sort((obj: any, nextObj: any) => obj.order - nextObj.order);
    setIsTableDataLoaded(true);
    const responce = await fetchUpdateTempleteRow(
      authResult,
      "POST",
      `${process.env.REACT_APP_API_URL_PROXY}/report-template?type=${templeteType[templateNumber]}&country=${selectedCountry}`,
      updatedData
    );
    if (responce.status === 200) {
      setTemplatesData(updatedData);
    } else {
      alert("some error happened");
    }
    setIsTableDataLoaded(false);
  };

  const handleRowEdit = async (oldData: any, newData: any) => {
    const index = newData.order;
    const updatedData = [...templatesData];
    updatedData[index] = newData;
    updatedData.sort((obj: any, nextObj: any) => obj.order - nextObj.order);
    setIsTableDataLoaded(true);
    const responce = await fetchUpdateTempleteRow(
      authResult,
      "POST",
      `${process.env.REACT_APP_API_URL_PROXY}/report-template?type=${templeteType[templateNumber]}&country=${selectedCountry}`,
      updatedData
    );
    if (responce.status === 200) {
      setTemplatesData(updatedData);
    } else {
      alert("some error happened");
    }
    setIsTableDataLoaded(false);
  };

  const handleAddNewRow = async (newRow: any) => {
    const updatedData: Array<ColumnDataType> = [...templatesData];
    updatedData.push(newRow);
    setIsTableDataLoaded(true);
    const responce = await fetchUpdateTempleteRow(
      authResult,
      "POST",
      `${process.env.REACT_APP_API_URL_PROXY}/report-template?type=${templeteType[templateNumber]}&country=${selectedCountry}`,
      updatedData
    );
    if (responce.status === 200) {
      setTemplatesData(updatedData);
    } else {
      alert("some error happened");
    }
    setIsTableDataLoaded(false);
  };

  const handleDeleteRow = async (index: number) => {
    const updatedData: Array<ColumnDataType> = [...templatesData];

    if (index >= 0 && index < updatedData.length) {
      // Remove the item at the specified index
      updatedData.splice(index, 1);

      // Reassign the 'order' property based on the new index
      const result: Array<ColumnDataType> = updatedData.map((obj, idx) => ({
        ...obj,
        order: idx,
      }));

      setIsTableDataLoaded(true);
      const responce = await fetchUpdateTempleteRow(
        authResult,
        "POST",
        `${process.env.REACT_APP_API_URL_PROXY}/report-template?type=${templeteType[templateNumber]}&country=${selectedCountry}`,
        result
      );
      if (responce.status === 200) {
        setTemplatesData(result);
      } else {
        alert("some error happened");
      }
      setIsTableDataLoaded(false);

      // Optional: Update the state or perform further actions with the updated data
      // settemplatesData(result); // Assuming you have a state to update
    } else {
      console.error("Invalid index");
    }
  };

  const handleSaveUpdateEmailTemplate = async (
    setIsEditStatus: any,
    setUpdateLoaded: any,
    handleToBase64: any,
    bannertText: any,
    base64Image: any,
    updatedData: any

  ) => {
    setIsEditStatus(false);
    handleToBase64();
    if (emailTemplateData?.defaultBaneerText !== bannertText) {
      console.log(base64Image, "save-02");
    } else {
      console.log("simple update!");
    }

    const fetchParams: FetchParams = {
      authResult,
      method: "POST",
      url: `${process.env.REACT_APP_API_URL_PROXY}/update-email-template`,
      data: updatedData,
    };

    await handleApiRequest(
      fetchParams,
      setUpdateLoaded,
      setNewAlert,
      "Email template was updated successfully",
      "Something went wrong, please try again"
    );
  };

  return (
    <div className="templates-page page">
      <div className="templates-table-wrapper">
        <div className="template-control-panel">
          <ControlPanel
            value={templateNumber}
            onChange={handleTabChange}
            labels={[
              "Inventory report",
              "Sell-out report",
              "Email Notifications",
            ]}
          />
        </div>
        <div className="inventory-template-table">
          {templeteType[templateNumber] !== "emails" ? (
            <ReportTemplateTable
              isTableDataLoaded={isTableDataLoaded}
              data={templatesData ? templatesData : []}
              onRowChangePosition={handleRowChangePosition}
              onRowEdit={handleRowEdit}
              onAddNewRow={handleAddNewRow}
              onDelete={handleDeleteRow}
            />
          ) : (
            emailsTemplates.length > 1 && (
              <EmailsTemplateTable
                data={emailsTemplates}
                isTableDataLoaded={false}
                setSelectedEmail={setSelectedEmail}
                emailTemplateData={emailTemplateData}
                isLoading={isEmailTemplateLoading}
                onSaveUpdateEmailTemplate={handleSaveUpdateEmailTemplate}
              />
            )
          )}
        </div>
        <div className="sellout-template-report-table"></div>
        <div className="email-template"></div>
      </div>
    </div>
  );
}

export default TemplatesPage;
