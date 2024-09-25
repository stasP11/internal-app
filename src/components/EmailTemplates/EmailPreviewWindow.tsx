import {
  Dialog,
  DialogContent,
  Box,
  Button,
} from "@mui/material";
import useExtensions from "components/Editor/useExtensions";
import {
  RichTextReadOnly,
} from "mui-tiptap";

const Base64ImageDecoder = ({ base64String, altText }: any) => {
  // Handle cases where the base64String is not provided or invalid
  if (!base64String) {
    return <p>No image data provided.</p>;
  }

  return (
    <div>
      <img
        src={`${base64String}`}
        alt={altText || "Decoded image"}
        style={{ maxWidth: "100%", border: "1px solid #ccc" }}
      />
    </div>
  );
};

function EmailPreviewWindow({
  open,
  onClose,
  onBackToEdit,
  emailBodyContent,
  emailSignatureContent,
  base64Image,
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
        <Base64ImageDecoder base64String={base64Image} altText="22" />
        <>
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
        <Button onClick={onClose} variant="outlined" sx={{color: "#10384F", borderColor: 'rgba(0, 0, 0, 0.42)'}}>Close</Button>
          <Button onClick={onBackToEdit} variant="contained">Edit</Button>
        </div>
      </Box>
    </Dialog>
  );
}

export default EmailPreviewWindow;
