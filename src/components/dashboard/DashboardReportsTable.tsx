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
  status: string;
  widget_status: string;
  filename: string;
}

interface MyTableProps {
  data: Row[];
}

const DashboardReportsTable: React.FC<MyTableProps> = ({ data }) => {
  return (
    <TableContainer
      component={Paper}
      style={{ maxHeight: 360, overflowY: "auto" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Distributor</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Filename</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((report, index) => (
            <TableRow key={index}>
              <TableCell>
                <span className="distributor_name">
                  {report?.Distributor_Name}
                </span>
                <br />
                <span className="distributor_id">{report?.distributor_id}</span>
              </TableCell>
              <TableCell><ReportStatus label={report?.status} small/></TableCell>
              <TableCell>{report.filename}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DashboardReportsTable;
