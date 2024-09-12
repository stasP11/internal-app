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
  const columnHeaderStyles = {
    fontFamily: "inherit",
    color: "inherit",
    fontSize: "11px",
    fontWeight: 700,
    padding: "12px",

    lineHeight: "16px",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  };

  return (
    <TableContainer
      component={Paper}
      style={{ maxHeight: 360, overflowY: "auto" }}
    >
      <Table
        stickyHeader
        sx={{
          fontFamily: "Helvetica Neue",
          color: "#10384f",
          "& .MuiTableCell-root": {
            verticalAlign: "top",
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell sx={columnHeaderStyles}>Distributor</TableCell>
            <TableCell sx={columnHeaderStyles}>Report name</TableCell>
            <TableCell sx={columnHeaderStyles}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((report, index) => (
            <TableRow key={index}>
              <TableCell>
                <span className="distributor-name">
                  {report?.Distributor_Name}
                </span>
                <br />
                <span className="distributor-id">{report?.distributor_id}</span>
              </TableCell>

              <TableCell
                sx={{
                  fontFamily: "Helvetica Neue",
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "20px",
                  textAlign: "left",
                  color: "#10384f",
                }}
              >
                {report.filename}
              </TableCell>
              <TableCell>
                <ReportStatus label={report?.status} small />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DashboardReportsTable;
