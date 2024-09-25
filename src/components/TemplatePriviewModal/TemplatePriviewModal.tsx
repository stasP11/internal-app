import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableFooter,
} from "@mui/material";
import iconTimelines from "../../icons/cancel-icon/Vector.svg";
import './TemplatePriviewModal.scss';

function PriviewModal({ reportType, open, data, onClose }: any) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
      ) => {
        setPage(newPage);
      };

      const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    const headers = data.map((columnObj: any)=>{
       return columnObj.localName
    });

    function createData(rowData: Array<string>, number: number){
        const row: any = [];
        rowData.forEach((name: string, index: number)=>{
          const { dataType } = data[index];
          if(dataType === 'Text'){
            row.push(`${name} ${number}`)
          } else if(dataType === 'Decimal'){
            row.push(11.08)
          } else {
            row.push(15525)
          }
        })
        return row
    }

    const rows = [
        createData(headers, 1),
        createData(headers, 2),
        createData(headers, 3),
        createData(headers, 4),
        createData(headers, 5),
        createData(headers, 6),
      ];

    return (
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        sx={{ "& .MuiDialog-paper": { width: '98vw', height: '98vh' } }}
      >
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <DialogTitle sx={{color: 'rgba(16, 56, 79, 1)', size: '24px'}}>{reportType} Report Template Preview</DialogTitle>
        <IconButton aria-label="delete" onClick={onClose} sx={{marginRight: '16px'}}>
        <img src={iconTimelines} alt="cancel icon" />
        </IconButton>
        </Box>
        <DialogContent>

        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{backgroundColor: 'rgba(236, 239, 241, 1)', color: 'rgba(16, 56, 79, 1)', weight: 500}}>
          <TableRow>
          <TableCell>#</TableCell>
            {headers.map((tableCell: string)=> <TableCell key={tableCell}>{tableCell}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '52px'}}
            >
                <TableCell align="left" >{index+1}</TableCell>
                {row.map((cellContent: string |number)=> <TableCell  align="left">{cellContent}</TableCell>)}
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>

        </DialogContent>
      </Dialog>
    );
  }

export default PriviewModal;
