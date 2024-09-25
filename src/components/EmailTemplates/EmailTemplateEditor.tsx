import { Dialog, DialogContent, Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Editor from "components/Editor/Editor";
import StatusSelector from "components/StatusSelector/StatusSelector";
import PreviewIcon from "icons/preview/previewIcon.svg";
import "./EmailsTemplateTable";

export function EmailTemplateEditor({
  open,
  emailType,
  isEmea,
  emailBodyRef,
  emailSignatureRef,
  bannerText,
  isLoading,
  emailBody,
  emailSignature,
  subjectText,
  onClose,
  onPreview,
  onSave,
  onChangeBannerText,
  onChangeEmailSubject,
  onChangeEmailTempleteType,
}: any) {
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
        <h2>Edit Notification</h2>
      </div>
      {isLoading ? (
        "is loaded"
      ) : (
        <DialogContent
          className="dialog-content"
          sx={{ height: "calc(100vh - 113px - 64px - 64px)" }}
        >
          <div className="dialog-content__email-type">
            <StatusSelector
              value={emailType}
              onChange={() => onChangeEmailTempleteType()}
              isEmea={isEmea}
            />
          </div>
          <div className="dialog-content__input">
            <TextField
              sx={{ width: "100%" }}
              id="outlined-required"
              label="Banner title"
              value={bannerText}
              onChange={(e) => onChangeBannerText(e.target.value)}
            />
          </div>
          <div className="dialog-content__input">
            <TextField
              sx={{ width: "100%" }}
              id="outlined-required"
              label="Subject"
              value={subjectText}
              onChange={(e) => onChangeEmailSubject(e.target.value)}
            />
          </div>
          <div className="editor-wrapper">
            <Editor content={emailBody} rteRef={emailBodyRef} />
          </div>
          <div className="editor-wrapper">
            <Editor content={emailSignature} rteRef={emailSignatureRef} />
          </div>
        </DialogContent>
      )}
      <div className="dialog-footer --email-template-editor">
        <div></div>
        <div className="footer-buttons">
        <Button onClick={onPreview}  startIcon={<img src={PreviewIcon} alt={'preview-icon'}/>}>Preview</Button>
        <Button onClick={onClose} variant="outlined" sx={{color: "#10384F", borderColor: 'rgba(0, 0, 0, 0.42)'}}>Cancel</Button>
        <Button onClick={onSave} variant="contained">Save</Button>
        </div>
      </div>
    </Dialog>
  );
}

export function EmailTemplateEditorHidden({
  emailBodyRef,
  emailSignatureRef,
  bannerText,
  isLoading,
  emailBody,
  emailSignature,
  onPreview,
  onSave,
  onChangeBannerText,
  onComponentLoaded,
}: any) {
  return (
    <div style={{ display: "none" }}>
      <Box className="dialog-header">
        <h2>Edit Notification</h2>
      </Box>
      {isLoading ? (
        "is loaded"
      ) : (
        <DialogContent className="dialog-content">
          <div className="dialog-content__input">
            <TextField
              sx={{ width: "100%" }}
              id="outlined-required"
              label="Banner title"
              value={bannerText}
              onChange={(e) => onChangeBannerText(e.target.value)}
            />
          </div>
          <div className="dialog-content__input">
            <TextField
              sx={{ width: "100%" }}
              id="outlined-required"
              label="Subject"
              defaultValue="text"
            />
          </div>
          <div
            style={{
              width: "100%",
              maxHeight: "525px",
              minHeight: "225px",
              overflowY: "scroll",
              border: "1px solid",
            }}
          >
            <Editor
              content={emailBody}
              rteRef={emailBodyRef}
              onComponentLoaded={onComponentLoaded}
            />
          </div>
          <div
            style={{
              width: "100%",
              maxHeight: "525px",
              minHeight: "225px",
              overflowY: "scroll",
              border: "1px solid",
            }}
          >
            <Editor
              content={emailSignature}
              rteRef={emailSignatureRef}
              onComponentLoaded={onComponentLoaded}
            />
          </div>
        </DialogContent>
      )}
    </div>
  );
}
