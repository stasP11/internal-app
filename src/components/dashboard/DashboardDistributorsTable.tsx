import React from "react";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { ReportStatus } from "../../customized-mui-elements/Statuses/Statuses";


interface Row {
  distributor_id: number;
  Distributor_Name: string;
  filename: string[];
  status: string[];
}

interface MyTableProps {
  data: Row[];
}

/*
Distributor_Name
: 
"A ONE CONSULTING T/A NYANGA SERVICE"
country
: 
"South Africa"
distributor_id
: 
4302851
filename
: 
(4) ['SelloutReport_4302851_03_2024', 'InventoryReport_4302851_02_2024', 'InventoryReport_4302851_03_2024', 'SelloutReport_4302851_02_2024']
status
: 
(4) ['REWORK', 'MISSING', 'MISSING', 'MISSING']
*/

const DashboardDistributorsTable: React.FC<MyTableProps> = ({ data }) => {
  console.log(data, 'DashboardDistributorsTable');

  return (
    <>
       {
      !!data.length &&
      <TableContainer
      component={Paper}
      style={{ maxHeight: 360, overflowY: "auto" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Distributor</TableCell>
            <TableCell>Filenames</TableCell>
            <TableCell>Statuses</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((report, index) => (
            <TableRow key={index}>
              <TableCell>
                {" "}
                <span className="distributor_name">
                  {report?.Distributor_Name}
                </span>
                <br />
                <span className="distributor_id">{report?.distributor_id}</span>
              </TableCell>
              <TableCell>
                <ul  style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                  {report?.status.map((result, idx) => (
                    <li key={idx}><ReportStatus label={result} small/></li>
                  ))}
                </ul>
              </TableCell>
              <TableCell>
                <ul  style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                  {report.filename.map((file, idx) => (
                    <li key={idx}>{file}</li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    }
    </>
  );
};

export default DashboardDistributorsTable;
