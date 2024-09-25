import ActionCellTemplates from "./ActionCellTemplates";
import "./EmailsTemplateTable";
import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import { useSWREmailTemplate } from "../../fetch/fetch-hooks/template-hooks/useSWREmailsTemplates";
import useAuthFetchWithMsal from "../../fetch/auth-hooks/authHook";
import { protectedResources } from "../../authConfig";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { type RichTextEditorRef } from "mui-tiptap";
import {
  EmailTemplateEditor,
  EmailTemplateEditorHidden,
} from "components/EmailTemplates/EmailTemplateEditor";
import EmailPreviewWindow from "components/EmailTemplates/EmailPreviewWindow";
import BannerTextEditor from "components/EmailTemplates/BannerTextEditor";
import CircularProgressMUI from "../../customized-mui-elements/CircularProgressMUI/CircularProgressMUI";
import {
  FetchParams,
  handleApiRequest,
} from "fetch/fetch-requests/handleApiRequest";
import { AlertsContext } from "contexts/AlertsContext";
import EmailStatuses from "components/EmailStatuses/EmailStatuses"

function EmailsTemplateTable({
  data,
  isTableDataLoaded,
  emailTemplateData,
  setSelectedEmail,
  isLoading,
  onSaveUpdateEmailTemplate,
}: any) {
  const bannerCanvasRef = useRef(null);
  const emailBodyRef = useRef<RichTextEditorRef>(null);
  const emailSignatureRef = useRef<RichTextEditorRef>(null);
  const [ emailTemplateType, setEmailTemplateType] = useState('');
  const [isEditStatus, setIsEditStatus] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [emailBodyContent, setEmailBodyContent] = useState("");
  const [emailSignatureContent, setEmailSignatureContent] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const [subjectText, setSubjectText] = useState("");
  const [bannertText, setBannertText] = useState<any>(null);
  const [isFirstPreviewMode, setIsFirstPreviewMode] = useState(false);
  const [isHiddenEditorLoaded, setHiddenEditorLoaded] = useState(false);

  const [isUpdateLoaded, setUpdateLoaded] = useState(false);
  const { setNewAlert } = useContext(AlertsContext);

  function handleClearAll() {
    setBannertText(null);
    setSubjectText("");
    setEmailSignatureContent("");
    setEmailBodyContent("");
  }

  useEffect(() => {
    if (isHiddenEditorLoaded && isFirstPreviewMode) {
      if (emailSignatureRef.current) {
        handlePreview();
      }
    }
  });

  useEffect(() => {
    if (!!emailTemplateData) {
      setEmailTemplateType(emailTemplateData?.type);
      setBannertText(emailTemplateData?.defaultBaneerText);
      setSubjectText(emailTemplateData?.title);
      setEmailBodyContent(emailTemplateData?.emailBody);
      setEmailSignatureContent(emailTemplateData?.emailSignature);
    }
    if (isLoading) {
      console.log("is loaded punk");
    }

    if (!isLoading) {
      console.log("is finish loading punk");
    }
  }, [emailTemplateData, isLoading]);

  const columns = [
    {
      field: "#",
      headerName: "#",
      filterable: false,
      renderCell: (params: any) =>
        params.api.getAllRowIds().indexOf(params.id) + 1,
      flex: 0.02,
    },
    {
      field: "title",
      headerName: "Title",
      filterable: false,

      flex: 0.45,
    },
    {
      field: "type",
      headerName: "Type",
      filterable: false,
      renderCell: (params: any) => (<EmailStatuses emailType={params?.row?.type}/>),
            flex: 0.45,
    },
    {
      field: "actions",
      headerName: " ",
      filterable: false,
      renderCell: (params: any) => (
        <div>
          <ActionCellTemplates
            ActionsCellTemplates
            data={params}
            onActionClick={(event: React.MouseEvent) =>
              handleActionClick(event, params)
            }
          />
        </div>
      ),
      flex: 0.05,
    },
  ];

  function handlePreviewFirst(title: any) {
    setSelectedEmail(title);
    setIsFirstPreviewMode(true);
  }

  function handleActionClick(event: React.MouseEvent, params: any) {
    event.stopPropagation();
    setSelectedEmail(params.row.title);
    setIsEditStatus(true);
  }

  function handlePreview() {
    handleToBase64();
    setEmailBodyContent(emailBodyRef.current?.editor?.getHTML() ?? "");
    setEmailSignatureContent(
      emailSignatureRef.current?.editor?.getHTML() ?? ""
    );
    setIsPreviewMode(true);
    setIsEditStatus(false);
  }

  function handleBackToEdit() {
    setIsPreviewMode(false);
    setIsEditStatus(true);

    if (isFirstPreviewMode) {
      setBannertText(emailTemplateData?.defaultBaneerText);
      setSubjectText(emailTemplateData?.title);
      setEmailBodyContent(emailBodyRef.current?.editor?.getHTML() ?? "");
      setEmailSignatureContent(
        emailSignatureRef.current?.editor?.getHTML() ?? ""
      );
      setIsFirstPreviewMode(false);
      setHiddenEditorLoaded(false);
    }
  }

  function handleCloseEmailPreviewWindow() {
    setIsFirstPreviewMode(false);
    setHiddenEditorLoaded(false);
    setIsPreviewMode(false);
  }

  const handleToBase64 = () => {
    const canvas: any = bannerCanvasRef.current;
    if (canvas) {
      const base64 = canvas.toDataURL("image/png");
      setBase64Image(base64); // Save base64 string
    }
  };

  function handleRowClick(clickedRow: any, e: any) {
    const { title } = clickedRow?.row;
    handlePreviewFirst(title);
  }

  function handleChangeEmailTempleteType(e: any){
     console.log(e, 'test-01');
     setEmailTemplateType("Error");
  }

  async function handleSave() {
    console.log(emailBodyContent, emailSignatureRef, 'test-6')
    onSaveUpdateEmailTemplate(
      setIsEditStatus,
      setUpdateLoaded,
      handleToBase64,
      bannertText,
      base64Image,
      { test: 1 }
    );
  }

  return (
    <>
      {!!bannertText && !!emailTemplateData?.defaultBanner && (
        <BannerTextEditor
          bannerCanvasRef={bannerCanvasRef}
          base64ImageDefault={emailTemplateData?.defaultBanner}
          text={bannertText}
        />
      )}

      {isFirstPreviewMode && (
        <EmailTemplateEditorHidden
          emailBodyRef={emailBodyRef}
          emailSignatureRef={emailSignatureRef}
          onPreview={handlePreview}
          onSave={handleSave}
          emailBody={emailTemplateData?.emailBody}
          emailSignature={emailTemplateData?.emailSignature}
          bannerText={bannertText}
          isLoading={isLoading}
          onChangeBannerText={setBannertText}
          onComponentLoaded={setHiddenEditorLoaded}
        />
      )}

      {emailBodyContent && emailSignatureContent && (
        <EmailTemplateEditor
          open={isEditStatus}
          onClose={() => {
            setIsEditStatus(false);
            handleClearAll();
            setSelectedEmail(null);
          }}
          emailBodyRef={emailBodyRef}
          emailSignatureRef={emailSignatureRef}
          onPreview={handlePreview}
          onSave={handleSave}
          emailBody={emailBodyContent}
          emailSignature={emailSignatureContent}
          bannerText={bannertText}
          isLoading={isLoading}
          subjectText={subjectText}
          onChangeBannerText={setBannertText}
          onChangeEmailSubject={setSubjectText}
          onChangeEmailTempleteType={handleChangeEmailTempleteType}
          isEmea={false}
          emailType={emailTemplateType}
        />
      )}

      <EmailPreviewWindow
        open={isPreviewMode}
        onClose={handleCloseEmailPreviewWindow}
        emailBodyContent={emailBodyContent}
        emailSignatureContent={emailSignatureContent}
        onBackToEdit={handleBackToEdit}
        base64Image={base64Image}
        text={bannertText}
        bannerCanvasRef={bannerCanvasRef}
      />
      <DataGridPro
        columns={columns}
        rows={data}
        getRowId={(row: any) => row.title}
        loading={isTableDataLoaded}
        onRowClick={handleRowClick}
        pagination
        pageSizeOptions={[10, 15]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        sx={{
          height: "calc(100vh - 180px)",
          background: "white",
          borderTop: "none",
          overflowY: "scroll",
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
          fontFamily: "Helvetica Neue",
          color: "#10384F",
          "& .MuiDataGrid-columnHeader, .MuiDataGrid-scrollbarFiller": {
            backgroundColor: "rgba(245, 245, 245, 1)",
          },
        }}
      />
      <CircularProgressMUI isLoaded={isLoading || isUpdateLoaded} />
    </>
  );
}

export default EmailsTemplateTable;
