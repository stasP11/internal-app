import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Checkbox,
} from "@mui/material";
import filterIcon from "../../icons/filter-icon/filter.svg";
import ellipsis from "../../icons/elipce.svg";
import { StickyBottomPopUp } from "../../customized-mui-elements/PopUp/StickyPopUps";
import ActionsList from "./ActionList";
import Row from "./Row";
import { useNavigate } from 'react-router-dom';

function ReportsTable({
  reportsList,
  usedFilter,
  onFilterByReportName,
  sortAZ,
  sortZA,
  onClearFilter,
  onReportView
}: any) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [selected, setSelected] = useState([] as any);
  const [anchorElAction, setAnchorElAction] = useState(null);
  const [anchorElStatus, setAnchorElStatus] = useState(null);
  const [anchorElReportNameColumn, setanchorElReportNameColumn] =
    useState(null);
  const [reportId, setreportId] = useState("");
  const [selectedReportStatus, setSelectedReportStatus] = useState("");
  const [reportErrorsStatus, setReportErrosStatus] = useState("");

  const handlStatusCall = (event: any, reportErrors: any) => {
    setAnchorElStatus(event.currentTarget);
    setReportErrosStatus(reportErrors);
  };

  const handleActionPopUpCall = (event: any, reportId: any, status: any) => {
    setAnchorElAction(event.currentTarget);
    setreportId(reportId);
    setSelectedReportStatus(status);
  };


  const handleReportClick = (event: any, distributorID: any) => {
    const selectedIndex = selected.indexOf(distributorID);
    let newSelected: any[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, distributorID);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (distributorID: any) =>
    selected.indexOf(distributorID) !== -1;

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;



  function handleUserReportClick(report: any){
    console.log(report, 'report');
  //  navigate(`/report/${report?.filename}`, { replace: true });
  }

  return (
    <>
      <TableContainer component={Paper} className="report-table">
        <Table>
          <TableHead className="main-table__table-header">
            <TableRow>
              <TableCell>
                <span className="main-table__head-cell">#</span>
              </TableCell>
              <TableCell>
                <span className="main-table__head-cell">Distributor</span>
              </TableCell>
              <TableCell>
                <div className="main-table__column-head-cell">
                  <span className="main-table__head-cell">Filename</span>
                  {usedFilter === "reportName" && (
                    <img
                      className="filter-icon"
                      onClick={onClearFilter}
                      src={filterIcon}
                      alt="filterIcon"
                    />
                  )}
                  <img
                    className="action-icon"
                    onClick={(e: any) => setanchorElReportNameColumn(e.target)}
                    src={ellipsis}
                    alt="show actions"
                  />
                </div>
              </TableCell>
              <TableCell>
                <span className="main-table__head-cell">Reporting Period</span>
              </TableCell>
              <TableCell>
                <span className="main-table__head-cell">Status</span>
              </TableCell>
              <TableCell>{}</TableCell>
              <TableCell>{}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportsList
              .slice(startIndex, endIndex)
              .map((report: any, index: any) => (
                  <Row
                    report={report}
                    startIndex={startIndex}
                    index={index}
                    key={report?.filename}
                    onSelected={isSelected}
                    onReportClick={handleReportClick}
                    onStatusClick={handlStatusCall}
                    onPopUpCall={handleActionPopUpCall}
                    onUserClick={()=>console.log(report)}
                  />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className="main-table__pagination"
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={reportsList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <StickyBottomPopUp
        anchorEl={anchorElAction}
        setAnchorEl={setAnchorElAction}
      >
        <ActionsList
          reportId={reportId}
          onView={(e: any) => onReportView( reportId, selectedReportStatus)}
          onApprove={(e: any) => console.log(e, reportId)}
          onReject={(e: any) => console.log(e, reportId)}
        />
      </StickyBottomPopUp>

      <StickyBottomPopUp
        anchorEl={anchorElStatus}
        setAnchorEl={setAnchorElStatus}
      >
        <div>{reportErrorsStatus}</div>
      </StickyBottomPopUp>

      <StickyBottomPopUp
        anchorEl={anchorElReportNameColumn}
        setAnchorEl={setanchorElReportNameColumn}
      >
        <ul className="selector-list">
          <li onClick={sortAZ}>Sort A-Z</li>
          <li onClick={sortZA}>Sort Z-A</li>
          <li
            onClick={() => {
              onFilterByReportName(true);
              setanchorElReportNameColumn(null);
            }}
          >
            Filter
          </li>
        </ul>
      </StickyBottomPopUp>
    </>
  );
};

export default ReportsTable;
