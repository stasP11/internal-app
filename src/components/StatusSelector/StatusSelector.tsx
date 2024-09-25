import { MenuItem, TextField } from "@mui/material";

interface SelectStatusFieldProps {
  value: any;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  isEmea: boolean;
}

const successColor = "rgba(102, 181, 18, 1)";
const errorColor = "rgba(224, 87, 129, 1)";
const infoColor = "rgba(53, 160, 254, 1)";
const attentionColor = "rgba(223, 147, 0, 1)";

function StatusSelector({ value, onChange, isEmea }: SelectStatusFieldProps) {
  const markStyle = {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    marginTop: "-2px",
  };

  return (
    <TextField
      fullWidth
      select
      label="Type"
      value={value}
      onChange={onChange}
      disabled={!isEmea}
      sx={{width: '240px'}}
    >
      <MenuItem value="Success">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              background: successColor,
              ...markStyle,
            }}
          ></div>
          <span style={{ lineHeight: "24px", fontFamily: "Helvetica Neue" }}>
          Success
          </span>
        </div>
      </MenuItem>
      <MenuItem value="Error">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              background: errorColor,
              ...markStyle,
            }}
          ></div>
          <span style={{ lineHeight: "24px", fontFamily: "Helvetica Neue" }}>
            Error
          </span>
        </div>
      </MenuItem>
      <MenuItem value="Info">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              background: infoColor,
              ...markStyle,
            }}
          ></div>
          <span style={{ lineHeight: "24px", fontFamily: "Helvetica Neue" }}>
            Info
          </span>
        </div>
      </MenuItem>
      <MenuItem value="Attention">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              background: attentionColor,
              ...markStyle,
            }}
          ></div>
          <span style={{ lineHeight: "24px", fontFamily: "Helvetica Neue" }}>
            Attention
          </span>
        </div>
      </MenuItem>
    </TextField>
  );
}

export default StatusSelector;
