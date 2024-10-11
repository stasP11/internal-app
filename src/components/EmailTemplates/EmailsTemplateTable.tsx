import ActionCellTemplates from "./ActionCellTemplates";
import "./EmailsTemplateTable";
import React from "react";
import { useState, useEffect } from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import EmailTemplateEditor from "components/EmailTemplates/EmailTemplateEditor";
import EmailPreviewWindow from "components/EmailTemplates/EmailPreviewWindow";
import { EmailTemplateType } from "types/emailTemplatesTypes";
import clsx from "clsx";

function EmailsTemplateTable({
  data,
  isLoading,
  onSaveUpdateEmailTemplate,
}: any) {
  console.log(data, "current emails data");
  const [choosedEmail, setChoosedEmail] = useState<EmailTemplateType | null>(
    null
  );
  const [isPreviewMode, setPreviewMode] = useState<boolean>(false);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [headerMessageFragment, setHeaderMessageFragment] =
    useState<EmailTemplateType | null>(null);
  const [footerMessageFragment, setFooterMessageFragment] =
    useState<EmailTemplateType | null>(null);

  useEffect(() => {
    if (data) {
      const headerMessageFragmentObj = data.find(
        (obj: EmailTemplateType) =>
          obj.notification_type === "composite_error_message_header"
      );
      const footerMessageFragmentObj = data.find(
        (obj: EmailTemplateType) =>
          obj.notification_type === "composite_error_message_footer"
      );
      headerMessageFragmentObj &&
        setHeaderMessageFragment(headerMessageFragmentObj.notification_body);
      footerMessageFragmentObj &&
        setFooterMessageFragment(footerMessageFragmentObj.notification_body);
    }
  }, [data]);

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
      field: "notification_name",
      headerName: "Name",
      filterable: false,

      flex: 0.45,
    },
    {
      field: "notification_type",
      headerName: "Type",
      filterable: false,
      flex: 0.45,
    },

    {
      field: "notification_title",
      headerName: "Title",
      flex: 0.45,
    },
    {
      field: "default_image_text",
      headerName: "Banner",
      flex: 0.45,
      cellClassName: (params: any) =>
        clsx("super-app", {
          error: params.row.image_type === "error",
          success: params.row.image_type === "success",
          info: params.row.image_type === "info",
          attention: params.row.image_type === "attention",
        }),
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

  function handleActionClick(event: React.MouseEvent, params: any) {
    //console.log(params?.row, "params");
    //  event.stopPropagation();
    //  setSelectedEmail(params.row.notification_name);
    //  setSelectedImageName(params.row.image_name)
    //  setIsEditStatus(true);
  }

  function closePrewiewWindow() {
    setPreviewMode(false);
    setChoosedEmail(null);
  }

  function closeEditWindow() {
    setEditMode(false);
    setChoosedEmail(null);
  }

  function openEditWindow() {
    setPreviewMode(false);
    setEditMode(true);
  }

  function handleRowClick(clickedRow: any, e: any) {
    setChoosedEmail(null);
    setTimeout(() => {
      setChoosedEmail({ ...clickedRow?.row });
    }, 0);
    setPreviewMode(true);
  }

  function handleSave(data: EmailTemplateType) {
    onSaveUpdateEmailTemplate(data);
    setEditMode(false);
    setChoosedEmail(null);
  }

  function openPreviewWindow(obj: EmailTemplateType) {
    setEditMode(false);
    setPreviewMode(true);
    if (obj) {
      setChoosedEmail(obj);
    }
  }

  return (
    <>
      <EmailPreviewWindow
        open={!!choosedEmail && isPreviewMode}
        onClose={closePrewiewWindow}
        emailBodyContent={choosedEmail?.notification_body}
        emailSignatureContent={choosedEmail?.signature_body}
        onBackToEdit={openEditWindow}
        base64Image={choosedEmail?.default_image_value}
        bannerText={choosedEmail?.default_image_text}
        headerFragment={headerMessageFragment}
        footerFragment={footerMessageFragment}
        type={choosedEmail?.notification_type}
      />

      {isEditMode && !!choosedEmail && (
        <EmailTemplateEditor
          open={isEditMode && !!choosedEmail}
          isEmea={true}
          selectedEmailData={choosedEmail}
          isLoading={false}
          onClose={closeEditWindow}
          onPreview={openPreviewWindow}
          onSave={handleSave}
          isMonolitEmail={choosedEmail?.notification_type.includes("monolit")}
        />
      )}

      <DataGridPro
        columns={columns}
        rows={!!data ? data : []}
        getRowId={(row) => row.notification_name}
        loading={isLoading}
        onRowClick={handleRowClick}
        pagination
        pageSizeOptions={[10, 25, 50, 100]}
        initialState={{
          pagination: { paginationModel: { pageSize: 25 } },
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

          "& .super-app.success": {
            backgroundColor: "rgba(102, 181, 18, 1)",
          },
          "& .super-app.error": {
            backgroundColor: "rgba(224, 87, 129, 1)",
          },
          "& .super-app.info": {
            backgroundColor: "rgba(53, 160, 254, 1)",
          },
          "& .super-app.attention": {
            backgroundColor: "rgba(223, 147, 0, 1)",
          },
        }}
      />
    </>
  );
}

export default EmailsTemplateTable;
