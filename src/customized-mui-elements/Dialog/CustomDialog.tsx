import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface CustomDialogProps {
  opened: boolean;
  title: string;
  actions: Action[];
  children?: React.ReactNode;
  contentText?: string;
  onClose: () => void;
}
type Action = { text: string; handler: any };

function CustomDialog({
  title,
  opened,
  actions,
  contentText,
  onClose,
  children,
}: CustomDialogProps) {
  return (
    <Dialog onClose={onClose} fullWidth maxWidth="sm" open={opened}>
      <DialogTitle fontFamily="Helvetica Neue" color="#10384F">
        {title}
      </DialogTitle>
      <DialogContent
        sx={{ border: "1px solid  rgba(0, 0, 0, 0.12)", padding: 0 }}
      >
        {children}
        {contentText && (
          <DialogContentText
            fontFamily="Helvetica Neue"
            padding="24px"
            color="#10384F"
          >
            {contentText}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions sx={{ padding: "16px 24px" }}>
        {actions.map((action, idx) => (
          <Button
            key={idx}
            sx={{ padding: "6px 16px", borderColor: "rgba(0, 0, 0, 0.42)" }}
            variant={idx === 1 ? "contained" : "outlined"}
            color={idx === 1 ? "primary" : "inherit"}
            size="medium"
            onClick={action.handler}
          >
            {action.text}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
}

export default CustomDialog;
