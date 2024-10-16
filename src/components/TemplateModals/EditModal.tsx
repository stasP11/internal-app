import { useState, useEffect, useRef } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Box,
  InputAdornment,
  Tooltip,
  tooltipClasses,
  TooltipProps,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import styled from "@emotion/styled";

function EditModal({ open, onClose, onSave, data }: any) {
  const {
    name,
    localName,
    dataType,
    isMandatoryEMEA,
    isMandatory,
    id,
    order,
    maxValue,
    minValue,
  } = data;
  const [dataTypeState, setDataType] = useState();
  const localNameRef = useRef();
  const nameRef = useRef();
  const minValueRef = useRef();
  const maxValueRef = useRef();
  const isMandatoryRef = useRef();
  const isMandatoryEMEARef = useRef();

  useEffect(() => {
    localNameRef.current = localName;
    nameRef.current = name;
    minValueRef.current = minValue;
    maxValueRef.current = maxValue;
    isMandatoryRef.current = isMandatory;
    isMandatoryEMEARef.current = isMandatoryEMEA;
    setDataType(dataType);
  }, []);

  const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "white",
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: `0px 3px 5px -1px #00000033, 
                0px 6px 10px 0px #00000024, 
                0px 1px 18px 0px #0000001F`,
      minWidth: "400px",
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: "white",
    },
  }));

  const tooltipContentStyles = {
    "& div": {
      marginBottom: "8px",
      display: "flex",
      flexDirection: "column",
      fontFamily: "Helvetica Neue",
      color: "#10384F",
      "& p": {
        fontSize: "10px",
        margin: 0,
        lineHeight: "14px",
        fontWeight: 500,
      },
      "& p:first-child": {
        fontSize: "12px",
        lineHeight: "20px",
        fontWeight: 400,
      },
    },
  };

  const TooltipContent = () => {
    return (
      <Box sx={tooltipContentStyles}>
        <div>
          <p>Number Data Type</p>
          <p>Numeric values without decimal points, e.g. 375</p>
        </div>
        <div>
          <p>Decimal Data Type</p>
          <p>Numeric values with decimal points, e.g. 3.75</p>
        </div>
        <div>
          <p>Date Data Type</p>
          <p>Calendar dates in dd/mm/yyyy format, e.g. 13/01/2024</p>
        </div>
        <div>
          <p>Text Data Type</p>
          <p>
            Alphanumeric characters, including letters, numbers, and symbols,
            e.g. for Field 'Invoice Number' the value can be
            UA-24-17-030/0001-21​33
          </p>
        </div>
      </Box>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ "& .MuiDialog-paper": { width: 445 } }}
    >
      <DialogTitle>Edit</DialogTitle>
      <Divider />
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          sx={{
            padding: "10px",
            "& .MuiInputBase-input, & .MuiButton-outlined": {
              fontFamily: "Helvetica Neue",
              color: "#10384F",
            },
            "& .MuiButton-outlined": {
              borderColor: "rgba(0, 0, 0, 0.42)",
            },
          }}
        >
          <TextField
            label="Field Name in Local Language"
            variant="outlined"
            defaultValue={localName}
            onChange={(e: any) => (localNameRef.current = e.target.value)}
            fullWidth
          />
          <TextField
            label="Field Name in English"
            variant="outlined"
            defaultValue={name}
            onChange={(e: any) => (nameRef.current = e.target.value)}
            fullWidth
          />
          <TextField
            label="Data Type"
            variant="outlined"
            fullWidth
            defaultValue={dataType}
            select
            onChange={(e: any) => setDataType(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment sx={{ marginRight: "8px" }} position="end">
                  <LightTooltip title={<TooltipContent />} arrow>
                    <IconButton>
                      <InfoOutlinedIcon />
                    </IconButton>
                  </LightTooltip>
                </InputAdornment>
              ),
            }}
          >
            {["Number", "Text", "Decimal"].map((option: string) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          {!!(dataTypeState === "Number" || dataTypeState === "Decimal") && (
            <Box sx={{ display: "flex", gap: "16px" }}>
              <TextField
                label="Min Value"
                variant="outlined"
                fullWidth
                onChange={(e: any) => (minValueRef.current = e.target.value)}
                defaultValue={minValue}
              />
              <TextField
                label="Max Value"
                variant="outlined"
                fullWidth
                onChange={(e: any) => (maxValueRef.current = e.target.value)}
                defaultValue={maxValue}
              />
            </Box>
          )}
          <FormControlLabel
            onChange={(e: any) => {
              isMandatoryRef.current = e.target.checked;
              isMandatoryEMEARef.current = e.target.checked;
            }}
            control={<Switch defaultChecked={isMandatory} />}
            label="Set as Mandatory"
          />
        </Box>
      </DialogContent>
      <Divider />
      <Box
        fontFamily={"Helvetica Neue"}
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          sx={{
            borderColor: "rgba(0, 0, 0, 0.42)",
            color: "#10384F",
            fontFamily: "inherit",
          }}
          variant="outlined"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ ml: 2, fontFamily: "inherit" }}
          onClick={() =>
            onSave({
              name: nameRef.current,
              localName: localNameRef.current,
              dataType: dataTypeState,
              isMandatoryEMEA: isMandatoryEMEARef.current,
              isMandatory: isMandatoryRef.current,
              id,
              order,
              maxValue: maxValueRef.current,
              minValue: minValueRef.current,
            })
          }
        >
          Save
        </Button>
      </Box>
    </Dialog>
  );
}

export default EditModal;
