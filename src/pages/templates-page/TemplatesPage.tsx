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
  useSWREmailsTemplatesMix,
} from "../../fetch/fetch-hooks/template-hooks/useSWREmailsTemplates";
import ReportTemplateTable from "components/ReportTemplateTable/ReportTemplateTable";
import fetchData from "../../utils/fetchData";
import useAuthFetchWithMsal from "../../fetch/auth-hooks/authHook";
import { protectedResources } from "../../authConfig";
import EmailsTemplateTable from "components/EmailTemplates/EmailsTemplateTable";
import {
  FetchParams,
  handleApiRequest,
} from "fetch/fetch-requests/handleApiRequest";
import { AlertsContext } from "contexts/AlertsContext";
import generateRandomId from "utils/genereteRandomId.js";
import formatDataForBackEnd from "utils/formatDataForBackEnd";
import { EmailTemplateType } from "types/emailTemplatesTypes";

function useData(selectedCountry: any, authResult: any) {
  const [isLoaded, setIsloaded] = useState(true);
  const [emailsTemplatesData, setEmailsTemplatesData] =
    useState<any>(undefined);

  const { data: emailsMonolitData, isLoading: isLoadingEmailsMonolitData } =
    useSWREmailsTemplatesMix(
      true,
      selectedCountry,
      authResult,
      "get_monolit_email_templates"
    );

  const { data: emailsCompositData, isLoading: isLoadingemailsCompositData } =
    useSWREmailsTemplatesMix(
      true,
      selectedCountry,
      authResult,
      "get_composite_email_templates"
    );
  useEffect(() => {
    if (emailsMonolitData && emailsCompositData) {
      setIsloaded(false);
      setEmailsTemplatesData([
        ...emailsMonolitData?.data,
        ...emailsCompositData?.data,
      ]);
    }
  }, [emailsMonolitData, emailsCompositData]);

  return { isLoaded, emailsTemplatesData };
}

function escapeHtmlForSql(inputString: any) {
  if (inputString) {
    // Replace double quotes with \&quot; and single quotes with ''
    const escapedString = inputString
      .replace(/"/g, "\\&quot;") // Escape double quotes
      .replace(/'/g, "''"); // Escape single quotes for SQL

    return escapedString;
  }
}

function removeDuplicates(arr: any) {
  const seenIds = new Set();

  return arr.filter((obj: any) => {
    if (!seenIds.has(obj.id)) {
      seenIds.add(obj.id);
      return true; // Keep the object if the id is unique
    }
    return false; // Exclude the object if the id is a duplicate
  });
}

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
  const [templateNumber, setTemplateNumber] = useState(2);
  const { data } = useFetchReportTemplateData(
    templeteType[templateNumber],
    selectedCountry,
    authResult
  );

  const { isLoaded, emailsTemplatesData } = useData(
    selectedCountry,
    authResult
  );

  console.log(isLoaded, emailsTemplatesData, "test-01");

  const { data: emailsData } = useSWREmailsTemplates(
    true,
    selectedCountry,
    authResult
  );

  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState(null);
  const { data: emailTemplateData, isLoading: isEmailTemplateLoading } =
    useSWREmailTemplate(
      !!selectedEmail,
      selectedCountry,
      selectedEmail,
      selectedImageName,
      authResult
    );
  const [templatesData, setTemplatesData] = useState<Array<ColumnDataType>>([]);
  const [emailsTemplates, setEmailsTemplates] = useState<Array<ColumnDataType>>(
    []
  );
  const { setNewAlert } = useContext(AlertsContext);
  const [emailsUpdateInProgress, setEmailsUpdateInProgress] = useState(false);

  useEffect(() => {
    if (
      data &&
      (templeteType[templateNumber] === "inventory" ||
        templeteType[templateNumber] === "sell-out")
    ) {
      setTemplatesData(data);
      setIsTableDataLoaded(false);
    }
  }, [data]);

  useEffect(() => {
    if (emailsData) {
      const resultDataWithId: any = [];
      for (let obj of emailsData?.data) {
        resultDataWithId.push({
          id: `${obj.notification_name}/${obj?.image_name}`,
          ...obj,
        });
      }
      const uncicsWithId = removeDuplicates(resultDataWithId);
      setEmailsTemplates(uncicsWithId);
      setIsTableDataLoaded(false);
    }
  }, [emailsData]);

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
    data: any | EmailTemplateType
  ) => {
    console.log("test save function 1");
    const objectBeforChanges = formatDataForBackEnd(
      emailsTemplatesData.find(
        (obj: EmailTemplateType) =>
          obj.notification_name === data.notification_name
      )
    );
    for (let key in data) {
      objectBeforChanges[key] = data[key];
    }

    console.log(data, objectBeforChanges, "test save function 0");
    const isMonolitEmail = data.notification_type.includes('monolit');

    const fetchParams: FetchParams = {
      authResult,
      method: "POST",
      url: `${process.env.REACT_APP_API_PYTHON_API}/${isMonolitEmail? 'update_monolit_email_templates' : 'update_composite_email_templates'}`,
      data: { data: [objectBeforChanges] },
    };

    await handleApiRequest(
      fetchParams,
      setEmailsUpdateInProgress,
      setNewAlert,
      "Email template was updated successfully",
      "Something went wrong, please try again"
    );

    // const updatedEmailTemplate = formatDataForBackEnd(emailTemplateData?.data[0]);
    // escapeHtmlForSql
    // setIsEditStatus(false);
    // handleToBase64();
    /*
    if (emailTemplateData?.data[0]?.default_image_text !== bannertText) {
      updatedEmailTemplate.default_image_text = bannertText;
      updatedEmailTemplate.image_value = base64Image;
      updatedEmailTemplate.notification_body = body? `"""${body}"""` : "";
      updatedEmailTemplate.signature_body = signature? `"""${signature}"""` : "";
      updatedEmailTemplate.notification_title = emailTitle


      updatedEmailTemplate.notification_body_old = updatedEmailTemplate.notification_body_old? escapeHtmlForSql(updatedEmailTemplate.notification_body_old) : "";
      updatedEmailTemplate.signature_body__old = updatedEmailTemplate.signature_body__old? escapeHtmlForSql(updatedEmailTemplate.signature_body__old) : "";


    } else {
      updatedEmailTemplate.notification_body = body? `"""${body}"""` : "";
      updatedEmailTemplate.signature_body = signature? `"""${signature}"""` : "";
      updatedEmailTemplate.notification_title = emailTitle

      updatedEmailTemplate.notification_body_old = updatedEmailTemplate.notification_body_old? escapeHtmlForSql(updatedEmailTemplate.notification_body_old) : "";
      updatedEmailTemplate.signature_body__old = updatedEmailTemplate.signature_body__old? escapeHtmlForSql(updatedEmailTemplate.signature_body__old) : "";
    }

    const fetchParams: FetchParams = {
      authResult,
      method: "POST",
      url: `${process.env.REACT_APP_API_PYTHON_API}/update_email_templates`,
      data: {"data": [updatedEmailTemplate]},
    };

    await handleApiRequest(
      fetchParams,
      setUpdateLoaded,
      setNewAlert,
      "Email template was updated successfully",
      "Something went wrong, please try again"
    );

    */
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
          {templeteType[templateNumber] !== "emails" && (
            <ReportTemplateTable
              isTableDataLoaded={isTableDataLoaded}
              data={templatesData ? templatesData : []}
              onRowChangePosition={handleRowChangePosition}
              onRowEdit={handleRowEdit}
              onAddNewRow={handleAddNewRow}
              onDelete={handleDeleteRow}
            />
          )}
          {templateNumber == 2 && emailsTemplatesData && (
            <EmailsTemplateTable
              data={emailsTemplatesData}
              isTableDataLoaded={false}
              setSelectedEmail={setSelectedEmail}
              setSelectedImageName={setSelectedImageName}
              emailTemplateData={emailTemplateData?.data[0]}
              isLoading={isEmailTemplateLoading || emailsUpdateInProgress}
              onSaveUpdateEmailTemplate={handleSaveUpdateEmailTemplate}
            />
          )}
        </div>
        <div className="sellout-template-report-table"></div>
        <div className="email-template"></div>
      </div>
    </div>
  );
}

export default TemplatesPage;
