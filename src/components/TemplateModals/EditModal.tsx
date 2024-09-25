import React from "react";
import { ChangeEvent, useState, useEffect, useRef } from "react";
import { getFromLocalStorage } from "../../services/storageInterection";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import {
  DataGridPro,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridRenderCellParams,
  GridRowOrderChangeParams,
} from "@mui/x-data-grid-pro";
import { useDemoData } from "@mui/x-data-grid-generator";

import ToggleActiveSwitch from "components/ToggleActiveSwitch/ToggleActiveSwitch";

import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useFetchReportTemplateData from "../../fetch/fetch-hooks/template-hooks/useFetchReportTemplateData";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Typography,
  Popover,
  Box,
} from "@mui/material";
import { CountertopsOutlined } from "@mui/icons-material";
import generateRandomId from "../../utils/genereteRandomId.js";
import PriviewModal from "components/TemplatePriviewModal/TemplatePriviewModal";
import Divider from '@mui/material/Divider';

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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ "& .MuiDialog-paper": { width: 445 } }}
    >
      <DialogTitle>Edit</DialogTitle>
      <Divider/>
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          sx={{ padding: "10px" }}
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
          >
            {["Number", "Text", "Decimal"].map((option: string) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          {!!(dataTypeState === "Number" || dataTypeState === "Decimal") && (
            <>
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
            </>
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
      <Divider/>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ ml: 2 }}
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
