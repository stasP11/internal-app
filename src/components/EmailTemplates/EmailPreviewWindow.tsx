import { Dialog, DialogContent, Box, Button } from "@mui/material";
import useExtensions from "components/Editor/useExtensions";
import { RichTextReadOnly } from "mui-tiptap";
import BannerTextEditor from "components/EmailTemplates/BannerTextEditor";

function EmailPreviewWindowMonolit({
  open,
  onClose,
  onBackToEdit,
  emailBodyContent,
  emailSignatureContent,
  base64Image,
  bannerText,
}: any) {
  const extensions = useExtensions({
    placeholder: "Add your own content here...",
  });

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
      <Box className="dialog-header">
        <h2>Preview</h2>
      </Box>
      <DialogContent sx={{ height: "calc(100vh - 113px - 64px - 64px)" }}>
        <>
          <div></div>
          {!!base64Image && !!bannerText && (
            <BannerTextEditor
              base64ImageDefault={base64Image}
              text={bannerText}
              isEditable={false}
              setUpdatedBanner={(e: any) => console.log(e)}
            />
          )}
          <Box mt={3}>
            <RichTextReadOnly
              content={emailBodyContent}
              extensions={extensions}
            />
            <RichTextReadOnly
              content={emailSignatureContent}
              extensions={extensions}
            />
          </Box>
        </>
      </DialogContent>
      <Box className="dialog-footer --email-preview">
        <div className="footer-buttons">
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{ color: "#10384F", borderColor: "rgba(0, 0, 0, 0.42)" }}
          >
            Close
          </Button>
          <Button onClick={onBackToEdit} variant="contained">
            Edit
          </Button>
        </div>
      </Box>
    </Dialog>
  );
}

function EmailPreviewWindowComposite({
  open,
  onClose,
  onBackToEdit,
  emailBodyContent,
  emailSignatureContent,
  base64Image,
  bannerText,
  headerFragment,
  footerFragment,
  type,
}: any) {
  const extensions = useExtensions({
    placeholder: "Add your own content here...",
  });

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
      <Box className="dialog-header">
        <h2>Preview</h2>
      </Box>
      <DialogContent sx={{ height: "calc(100vh - 113px - 64px - 64px)" }}>
        <>
          <div></div>
          {!!base64Image && !!bannerText && (
            <BannerTextEditor
              base64ImageDefault={base64Image}
              text={bannerText}
              isEditable={false}
              setUpdatedBanner={(e: any) => console.log(e)}
            />
          )}
          <Box mt={3}>
            {type !== "composite_error_message_header" && (
              <RichTextReadOnly
                content={headerFragment}
                extensions={extensions}
              />
            )}

            {!!(type === "composite_error_message_footer") && (
              <RichTextReadOnly
                content={
                  "The body of the email, here is a description of the issues found by ToolBox"
                }
                extensions={extensions}
              />
            )}

            <RichTextReadOnly
              content={emailBodyContent}
              extensions={extensions}
            />

            {!!(type === "composite_error_message_header") && (
              <RichTextReadOnly
                content={
                  "The body of the email, here is a description of the issues found by ToolBox"
                }
                extensions={extensions}
              />
            )}

            {type !== "composite_error_message_footer" && (
              <RichTextReadOnly
                content={footerFragment}
                extensions={extensions}
              />
            )}
            <RichTextReadOnly
              content={emailSignatureContent}
              extensions={extensions}
            />
          </Box>
        </>
      </DialogContent>
      <Box className="dialog-footer --email-preview">
        <div className="footer-buttons">
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{ color: "#10384F", borderColor: "rgba(0, 0, 0, 0.42)" }}
          >
            Close
          </Button>
          <Button onClick={onBackToEdit} variant="contained">
            Edit
          </Button>
        </div>
      </Box>
    </Dialog>
  );
}

function EmailPreviewWindow({
  open,
  onClose,
  onBackToEdit,
  emailBodyContent,
  emailSignatureContent,
  base64Image,
  bannerText,
  headerFragment,
  footerFragment,
  type,
}: any) {
  return (
    <>
      {type && type.includes("monolit") ? (
        <EmailPreviewWindowMonolit
          open={open}
          onClose={onClose}
          emailBodyContent={emailBodyContent}
          emailSignatureContent={emailSignatureContent}
          onBackToEdit={onBackToEdit}
          base64Image={base64Image}
          bannerText={bannerText}
        />
      ) : (
        <EmailPreviewWindowComposite
          open={open}
          onClose={onClose}
          emailBodyContent={emailBodyContent}
          emailSignatureContent={emailSignatureContent}
          onBackToEdit={onBackToEdit}
          base64Image={base64Image}
          bannerText={bannerText}
          type={type}
          headerFragment={headerFragment}
          footerFragment={footerFragment}
        />
      )}
    </>
  );
}

export default EmailPreviewWindow;
