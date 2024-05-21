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
  filenames: string[];
  statuses: string[];
}

interface MyTableProps {
  data: Row[];
}

const DashboardDistributorsTable: React.FC<MyTableProps> = ({ data }) => {
  return (
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
                  {report.statuses.map((status, idx) => (
                    <li key={idx}><ReportStatus label={status} small/></li>
                  ))}
                </ul>
              </TableCell>
              <TableCell>
                <ul  style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                  {report.filenames.map((filename, idx) => (
                    <li key={idx}>{filename}</li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DashboardDistributorsTable;
