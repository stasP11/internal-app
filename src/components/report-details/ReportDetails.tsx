import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useReportsData } from "../../hooks/swr-hooks/useReports";
import {
  useReportsDetailsData,
  useExceptionsReportsDetailsData,
} from "../../hooks/swr-hooks/useReportData";
import useURLParamsExtractor from "../../hooks/paramsExtractors";
import { aproveReport, deleteReportRow } from "../../api/requests";
import Button from "@mui/material/Button";
import BucketIcon from "../../icons/bucket-icon/bucketIcon.svg";
import { ApproveWindow } from "../../customized-mui-elements/ModalWindow/ModalWindow";
import { mutate } from 'swr';
import './ReportDetails.scss'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useFetchWithMsal2 } from "../../../src/hooks/useFetchWithMsal";
import { loginRequest, protectedResources } from "../../authConfig";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../services/storageInterection";

function SuccessStatus() {
  return (
    <div
      style={{
        backgroundColor: "rgb(225, 252, 239)",
        color: "rgb(20, 128, 74)",
        padding: "10px",
        borderRadius: "20px",
        cursor: "pointer",
        height: "18px",
        textAlign: "center",
        maxWidth: "150px",
      }}
    >
      Mapped
    </div>
  );
}

function AlternativeStatus({ text }: any) {
  return (
    <div
      style={{
        backgroundColor: "rgba(0, 145, 223, 1)",
        color: "White",
        padding: "10px",
        borderRadius: "20px",
        cursor: "pointer",
        height: "18px",
        textAlign: "center",
        maxWidth: "150px",
      }}
    >
      {text}
    </div>
  );
}

function defineStatus(
  matched: any,
  material_number: any,
  alternatives: Array<any>
) {
  if (matched === material_number && alternatives.length === 0) {
    return <SuccessStatus></SuccessStatus>;
  }

  if (matched && alternatives.length > 0) {
    return <AlternativeStatus text={"Unmapped (selected)"} />;
  }

  if (!matched && alternatives.length > 0) {
    return <AlternativeStatus text={"Unmapped"} />;
  }
}

function AltTable({ data }: any) {
  const {
    alternatives,
    id,
    material_number,
    product_name,
    uom,
    volume,
    fileName,
    country,
    matched,
  } = data;
  const [selectedAlternativeNumber, setSelectedAlternativeNumber] =
    useState<any>(matched);
  const [selectedAlternativeName, setSelectedAlternativeName] =
    useState<any>(null);

  function onAltRowClick(obj: any) {
    console.log(obj);
    const { material_name, material_number } = obj;
    setSelectedAlternativeNumber(material_number);
    setSelectedAlternativeName(material_name);
  }

  function sendRequest() {
    console.log('request to server is work')
    const postData = {
      filename: `${fileName}.csv`,
      data: [
        {
          id,
          matched_material_id: selectedAlternativeNumber,
          country: country,
          product_name: selectedAlternativeName,
        },
      ],
    };

    console.log(postData);

    fetch("https://csci-api-skthk6k3ja-ew.a.run.app/approve_alternative", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log(response.json());
        return response.json();
      })
      .then((data) => {
        //setResponse(data); // Store the response in state
        console.log("Success:", data);
        mutate(`https://csci-api-skthk6k3ja-ew.a.run.app/get_exceptions_file?filename=${fileName}.csv`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <>
      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alternatives.map((obj: any) => (
            <TableRow
              onClick={() => onAltRowClick(obj)}
              key={obj?.material_name}
              sx={{
                background:
                  selectedAlternativeNumber === obj?.material_number
                    ? "rgba(245, 246, 250, 1)"
                    : "none",
              }}
            >
              <TableCell>{obj?.material_name}</TableCell>
              <TableCell>{obj?.material_number}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={sendRequest}>Save</Button>
    </>
  );
}

function Row({ data, onRemoveItem }: any) {
  const {
    alternatives,
    id,
    material_number,
    product_name,
    uom,
    volume,
    fileName,
    country,
    matched,
  } = data;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          {!!alternatives.length && (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? "-" : "+"}
            </IconButton>
          )}
        </TableCell>
        <TableCell component="th" scope="row">
          {product_name}
        </TableCell>
        <TableCell align="right">{material_number}</TableCell>
        <TableCell align="right">{uom}</TableCell>
        <TableCell align="right">{volume}</TableCell>
        <TableCell align="right">
          {defineStatus(matched, material_number, alternatives)}
        </TableCell>
        <TableCell align="center">
          <img
            onClick={() => onRemoveItem(id, fileName)}
            src={BucketIcon}
            alt="trashIcon"
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Founded {alternatives.length} alternatives
              </Typography>
              <AltTable alternatives={alternatives} data={data} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {

  const { error: authError, result: authResult }: any = useFetchWithMsal2({
    scopes: protectedResources.apiTodoList.scopes.read,
  });

  const selectedCountry = getFromLocalStorage('selectedCountry');

  const { data: reportsData, error: reportsError } = useReportsData([
    authResult,
    "GET",
    `${process.env.REACT_APP_API_URL}/api/reportslist`,
    { selectedCountry },
  ]);






  const [report, setReport] = useState<any>("");
  const [reportStatus, setreportStatus] = React.useState(false);
  const [reportExceptionsStatus, setExceptionsReportStatus] = useState(false);
  const { data: reportsDetailsData } = useReportsDetailsData(
    reportStatus,
    report
  );
  const { data: reportsExceptionsReportsDetailsData } =
    useExceptionsReportsDetailsData(reportExceptionsStatus, report);
  const [reportCountry, setReportCountry] = useState();
  const [removeModalWindowStatus, setRemoveModalWindowStatus] = useState(false);
  const [removedItem, setRemovedItemLine] = useState<any>({});
  const navigate = useNavigate();

  function actualReportData() {
    let result = [];
    if (reportExceptionsStatus) {
      result= reportsExceptionsReportsDetailsData;
    }

    if (reportStatus) {
      result= reportsDetailsData;
    }
    return result;
  }

  function handleCancelRemoveModalWindow() {
    setRemoveModalWindowStatus(false);
  }

  async function handleApproveRemoveModalWindow() {
    setRemoveModalWindowStatus(false);
    const { row_number, filename } = removedItem;
    const deleteRowResult = await deleteReportRow(filename, row_number);
    if(deleteRowResult.status=== 200){
      mutate(`https://csci-api-skthk6k3ja-ew.a.run.app/get_exceptions_file?filename=${filename}.csv`);
    }
  }

  function handleRemoveItem(lineNumber: any, filename: any) {
    setRemovedItemLine({ row_number: lineNumber, filename });
    setRemoveModalWindowStatus(true);
  }

  function handleApproveReport(reportName: any) {
    console.log("report is sended");
    aproveReport(report);
    navigate(`/reports`, { replace: true });
  }

  useURLParamsExtractor(setReport);
  useEffect(() => {
    if (reportsData && report) {
      // reportsData
      const foundReport = reportsData?.data?.find((obj: any) => {
        setReportCountry(obj?.country);
        return obj?.filename === report;
      });

      console.log(foundReport, foundReport?.status, foundReport?.status === 'REVIEW', 'status test')

      if (foundReport?.status === "REVIEW") {
        setExceptionsReportStatus(true);
      }

      if (
        foundReport?.status !== "REVIEW" &&
        foundReport?.status !== "MISSING"
      ) {
        setreportStatus(true);
      }
    }
  }, [report, reportsData]);

  return (
    <div>
      <ApproveWindow
        open={removeModalWindowStatus}
        onApprove={handleApproveRemoveModalWindow}
        onCancel={handleCancelRemoveModalWindow}
      />

      {Array.isArray(actualReportData()) ? (
        <>
              <div className="header-column">
              <Button onClick={handleApproveReport} color="error">Cancel</Button>
              <Button onClick={handleApproveReport} color="success">Approve</Button>
            </div>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Product Name</TableCell>
                <TableCell align="right">material_number</TableCell>
                <TableCell align="right">uom</TableCell>
                <TableCell align="right">volume</TableCell>
                <TableCell align="center">status</TableCell>
                <TableCell align="right">actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {actualReportData().map((obj: any) => (
                <Row
                  key={obj.name}
                  data={{ ...obj, fileName: report, country: reportCountry }}
                  onRemoveItem={handleRemoveItem}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
}
