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
import "./DashboardDistributorsTable.scss";

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
  console.log(data, "DashboardDistributorsTable");

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
    <>
      {!!data.length && (
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
                borderBottom: "none",
              },
              "& th.MuiTableCell-root": {
                borderBottom: "1px solid rgba(224, 224, 224, 1);",
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
                    <span className="distributor-id">
                      {report?.distributor_id}
                    </span>
                  </TableCell>

                  <TableCell>
                    <ul
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        listStyleType: "none",
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      {report.filename.map((file, idx) => (
                        <li className="report-name list-item" key={idx}>
                          {file}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>
                    <ul
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        listStyleType: "none",
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      {report?.status.map((result, idx) => (
                        <li className="list-item" key={idx}>
                          <ReportStatus label={result} small />
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default DashboardDistributorsTable;
