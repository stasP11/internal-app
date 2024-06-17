import "./Reports.scss";
import ellipsis from "../../icons/elipce.svg";
import React from "react";
import { ReportStatus } from "../../customized-mui-elements/Statuses/Statuses";
import { TableCell, TableRow } from "@mui/material";


export default function Row({
  report,
  startIndex,
  index,
  onSelected,
  onReportClick,
  onPopUpCall,
  onUserClick
}: any) {
  const [isOpen, setOpen] = React.useState(false);


  function setTemporaryMark(filename: any){
    if(filename === 'SelloutReport_899043_02_2024' || filename === 'InventoryReport_899039_02_2024' || filename ==='InventoryReport_4529276_02_2024'){
           return '.'
    }
    return ''
  }

  return (
    <>
      <TableRow
        key={report?.processed_date}
        selected={onSelected(report.distributor_id)}
        onClick={onUserClick}
      >
        <TableCell>{startIndex + index + 1}</TableCell>
        <TableCell>
          <span className="distributor_name">{report?.Distributor_Name}</span>
          <br />
          <span className="distributor_id">{report?.distributor_id}</span>
        </TableCell>
        <TableCell>
          <span className="report-name">{report?.filename} {setTemporaryMark(report?.filename)}</span>
        </TableCell>
        <TableCell>
          <span>{report?.reporting_period_start || "2023-12-16"}</span>
          <br />
          <span>{report?.reporting_period_end}</span>
        </TableCell>
        <TableCell>
          <ReportStatus label={report?.status} />
        </TableCell>

        <TableCell>
          <img
            className="action-icon"
            onClick={(event) => onPopUpCall(event, report?.filename, report?.status)}
            src={ellipsis}
            alt="show actions"
          />
        </TableCell>

        <TableCell>
        </TableCell>
      </TableRow>
    </>
  );
}
