import React from 'react';
import "./MatchingTable.scss"
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';

const mockData: any = [
    {
      material_number: 84057002,
      material_name: "ANTRACOL WP70 1X10KG BAG UA",
    },
    {
      material_number: 88651251,
      material_name: "ANTRACOL WG70 1X10KG CAS UA",
    },
  ];


function MatchingTable({alternativites=mockData}: any){
    return (
        <Box display="flex" flexDirection="column" gap={2} style={{ position: 'relative' }}>
          <Paper />
    
          <Typography variant="h6">
            4 Alternatives Found
          </Typography>
    
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Material No.</TableCell>
                  <TableCell>Material Name</TableCell>
                  <TableCell>BUOM</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {alternativites.map((obj: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell className='cell'>{obj.material_number}</TableCell>
                    <TableCell className='cell'>
                      {obj.material_name}
                    </TableCell>
                    <TableCell className='cell'>l</TableCell>
                    <TableCell className='cell'>
                      <Button
                        variant="contained"
                        style={{
                          background: index === 2 ? '#109000' : '#0091DF',
                        }}
                      >
                        <Typography style={{ color: 'white', fontSize: 12, fontWeight: 500 }}>
                          {index === 2 ? 'Matched' : 'Match'}
                        </Typography>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
    
          <Button
            variant="contained"
            style={{
              background: '#0091DF'
            }}
          >
            <Typography style={{ color: 'white', fontSize: 12, fontWeight: 500 }}>
              Save
            </Typography>
          </Button>
        </Box>
      );
}

export default MatchingTable;