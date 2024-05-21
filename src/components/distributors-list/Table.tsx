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

const DistributorsTable = ({
  distributorsList,
  usedFilter,
  onFilterByReportName,
  sortAZ,
  sortZA,
  onClearFilter,
}: any) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([] as any);
  const [anchorElReportNameColumn, setanchorElReportNameColumn] =
    useState(null);

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds = distributorsList.map(
        (distributor: any) => distributor.distributor_id
      );
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event: any, distributorID: any) => {
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

  return (
    <>
      <TableContainer component={Paper} className="main-table">
        <Table>
          <TableHead className="main-table__table-header">
            <TableRow>
              <TableCell>
                <Checkbox
                  size="small"
                  indeterminate={
                    selected.length > 0 &&
                    selected.length < distributorsList.length
                  }
                  checked={selected.length === distributorsList.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell>#</TableCell>
              <TableCell>Distributor ID</TableCell>
              <TableCell>
                <div className="main-table__column-head-cell">
                  <span>Distributor Name</span>
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
              <TableCell>Reports</TableCell>
              <TableCell>Statuses</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {distributorsList
              .slice(startIndex, endIndex)
              .map((distributor: any, index: any) => (
                <TableRow
                  key={distributor.distributor_id}
                  selected={isSelected(distributor.distributor_id)}
                >
                  <TableCell>
                    <Checkbox
                      size="small"
                      checked={isSelected(distributor.distributor_id)}
                      onChange={(event) =>
                        handleClick(event, distributor.distributor_id)
                      }
                    />
                  </TableCell>
                  <TableCell>{startIndex + index + 1}</TableCell>
                  <TableCell>{distributor.distributor_id}</TableCell>
                  <TableCell>{distributor.Distributor_Name}</TableCell>
                  <TableCell>
                    {distributor?.filename.map((filename:any, index:any) => (
                      <div key={index}>{filename}</div>
                    ))}
                  </TableCell>
                  <TableCell>
                    {distributor?.status.map((status:any, index:any) => (
                      <div key={index}>{status}</div>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className="main-table__pagination"
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={distributorsList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

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

export default DistributorsTable;
