import React from 'react';
import { useState, useRef } from "react";
import MenuItem from "@mui/material/MenuItem";
import Divider from '@mui/material/Divider';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Box,
} from "@mui/material";
import generateRandomId from "../../utils/genereteRandomId.js";

function AddRowModal({ open, onClose, onSave, order }: any) {
    const [dataTypeState, setDataType] = useState();
    const localNameRef = useRef();
    const nameRef = useRef();
    const minValueRef = useRef();
    const maxValueRef = useRef();
    const isMandatoryRef = useRef();
    const isMandatoryEMEARef = useRef();
    const newElementOrder = order;
    const id = generateRandomId();
  
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
              onChange={(e: any) => (localNameRef.current = e.target.value)}
              fullWidth
            />
            <TextField
              label="Field Name in English"
              variant="outlined"
              onChange={(e: any) => (nameRef.current = e.target.value)}
              fullWidth
            />
            <TextField
              label="Data Type"
              variant="outlined"
              fullWidth
              select
              onChange={(e: any) => (setDataType(e.target.value))}
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
            />
            <TextField
              label="Max Value"
              variant="outlined"
              fullWidth
              onChange={(e: any) => (maxValueRef.current = e.target.value)}
            />
            </>)}  
            <FormControlLabel
              onChange={(e: any) => {isMandatoryRef.current = e.target.checked; isMandatoryEMEARef.current = e.target.checked  }}
              control={<Switch value={true}/>}
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
            onClick={() => onSave({
              name: nameRef.current, 
              localName: localNameRef.current,
              dataType: dataTypeState,
              isMandatoryEMEA: isMandatoryEMEARef.current,
              isMandatory: isMandatoryRef.current,
              id,
              order: newElementOrder,
              maxValue: maxValueRef.current,
              minValue: maxValueRef.current,
            })}
          >
            Save
          </Button>
        </Box>
      </Dialog>
    );
  }

  export default AddRowModal;