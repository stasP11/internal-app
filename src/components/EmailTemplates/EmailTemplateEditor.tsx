import { Dialog, DialogContent, Box, Button } from "@mui/material";
import { useState, useEffect, useRef, useContext } from "react";
import TextField from "@mui/material/TextField";
import Editor from "components/Editor/Editor";
import StatusSelector from "components/StatusSelector/StatusSelector";
import PreviewIcon from "icons/preview/previewIcon.svg";
import "./EmailsTemplateTable";
import { type RichTextEditorRef } from "mui-tiptap";
import { EmailTemplateType } from "types/emailTemplatesTypes";
import BannerTextEditor from "components/EmailTemplates/BannerTextEditor";

export default function EmailTemplateEditor({
  open,
  selectedEmailData,
  isEmea,
  isLoading,
  onClose,
  onPreview,
  onSave,
  isMonolitEmail,
}: any | EmailTemplateType) {
  const emailBodyRef: any = useRef<RichTextEditorRef>(null);
  const subjectTextRef = useRef<any>(null);
  const bannerTextRef = useRef<any>(null);
  const emailSignatureRef = useRef<RichTextEditorRef>(null);
  const updatedBannerText = useRef<any>(null);
  const {
    notification_body: emailBody,
    signature_body: emailSignature,
    notification_title: subjectText,
    default_image_text: bannerText,
    default_image_value: base64Image,
    image_type: emailType,
  } = selectedEmailData;
  useEffect(() => {
    bannerTextRef.current = bannerText;
  }, []);

  const [updatedText, setUpdatedText] = useState(null);
  const [updatedBannerImage, setUpdatedBannerImage] = useState<any | string>(
    null
  );

  function updateSelectedValue(obj: EmailTemplateType) {
    obj.notification_body =
      typeof emailBodyRef?.current?.editor?.getHTML() === "string"
        ? emailBodyRef?.current.editor?.getHTML()
        : emailBody;
    obj.signature_body =
      typeof emailSignatureRef?.current?.editor?.getHTML() === "string"
        ? emailSignatureRef?.current.editor?.getHTML()
        : emailSignature;

    if (subjectTextRef.current) {
      obj.notification_title = subjectTextRef.current;
    }

    if (bannerTextRef.current) {
      obj.default_image_text = bannerTextRef.current;
    }

    if (updatedBannerImage) {
      console.log(updatedBannerImage, "updated image");
      obj.image_value = updatedBannerImage;
    }

    return obj;
  }

  function handlePreview() {
    const updatedEmailTemplate = updateSelectedValue(selectedEmailData);
    onPreview(updatedEmailTemplate);
  }

  const [saveProucess, setSaveProucess] = useState<null | "start" | "loading">(
    null
  );

  useEffect(() => {
    if (saveProucess === "start") {
      if (bannerTextRef.current !== bannerText) {
        /*necessary to avoid constant re-rendering of elements when changing the banner text.*/
        setUpdatedText(bannerTextRef.current);

        if (updatedBannerImage) {
          const updatedEmailTemplate = updateSelectedValue(selectedEmailData);
          updatedEmailTemplate.image_value = updatedBannerImage;
          onSave(updatedEmailTemplate);
          setSaveProucess(null);
        }
      } else {
        const updatedEmailTemplate = updateSelectedValue(selectedEmailData);
        onSave(updatedEmailTemplate);
        setSaveProucess(null);
      }
    }
  }, [saveProucess, updatedText, updatedBannerImage]);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      className="dialog"
      sx={{
        "& .MuiDialog-paper": {
          width: "880px",
          height: "calc(100vh - 113px)",
          borderRadius: "1%",
        },
      }}
    >
      <div className="dialog-header">
        <h2>Edit Notification {!isMonolitEmail && "Fragment"}</h2>
      </div>
      <BannerTextEditor
        base64ImageDefault={base64Image}
        text={updatedText ? updatedText : ""}
        isEditable={true}
        setUpdatedBanner={setUpdatedBannerImage}
      />
      {isLoading ? (
        "is loaded"
      ) : (
        <DialogContent
          className="dialog-content"
          sx={{ height: "calc(100vh - 113px - 64px - 64px)" }}
        >
          {" "}
          {isMonolitEmail && (
            <>
              <div className="dialog-content__email-type">
                <StatusSelector
                  value={emailType}
                  onChange={() => console.log()}
                  isEmea={isEmea}
                />
              </div>
              <div className="dialog-content__input">
                <TextField
                  sx={{ width: "100%" }}
                  id="outlined-required"
                  label="Banner title"
                  defaultValue={bannerText}
                  onChange={(e) => (bannerTextRef.current = e.target.value)}
                />
              </div>
              <div className="dialog-content__input">
                <TextField
                  sx={{ width: "100%" }}
                  id="outlined-required"
                  label="Subject"
                  defaultValue={subjectText}
                  onChange={(e) => (subjectTextRef.current = e.target.value)}
                />
              </div>
            </>
          )}
          <div className="editor-wrapper">
            <Editor content={emailBody} rteRef={emailBodyRef} />
          </div>
          {isMonolitEmail && (
            <div className="editor-wrapper">
              <Editor content={emailSignature} rteRef={emailSignatureRef} />
            </div>
          )}
        </DialogContent>
      )}
      <div className="dialog-footer --email-template-editor">
        <div></div>
        <div className="footer-buttons">
          <Button
            onClick={handlePreview}
            startIcon={<img src={PreviewIcon} alt={"preview-icon"} />}
          >
            Preview
          </Button>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{ color: "#10384F", borderColor: "rgba(0, 0, 0, 0.42)" }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setSaveProucess("start");
            }}
            variant="contained"
          >
            Save
          </Button>
        </div>
      </div>
    </Dialog>
  );
}