import React, { useState, useEffect } from "react";
import { Select, MenuItem, CircularProgress, Box } from "@mui/material";
import successIcon from "icons/success-icon/successIcon.svg";
import errorIcon from "icons/error-icon/errorIcon.svg";
import RightIcon from "icons/right-arrow/ArrowForwardFilled.svg";
import RemoveIcon from "icons/bucket-icon-light/bucketIconLight.svg";

// Assuming you have types defined for the alternatives and params
interface AlternativesType {
  material_number: number;
  material_name: string;
}

interface ParamsType {
  alternatives: AlternativesType[];
  matched: number;
  material_number: number;
  product_name: string;
  statusUpdate: string;
}

interface MappingAlternativesCellProps {
  params: ParamsType;
  onAlternativeChoose: any;
}

const ItemMapping = ({
  alternatives,
  onChange,
  matched,
  updateStatus,
  product_name,
}: any) => {
  const defineValue = (value: string | number) => {
    if (typeof value === "string") {
      return value;
    } else if (value) {
      const result = alternatives.find(
        ({ material_number }: any) => material_number == value
      );
      return result?.material_name;
    }
  };

  if (alternatives.length > 0) {
    const selectedOption = alternatives.filter(
      (obj: any) => obj?.material_number === matched
    );

    return (
      <Select
        sx={{ height: 40, maxWidth: 340 }}
        value={
          selectedOption.length > 0
            ? selectedOption[0]?.material_number
            : `${alternatives.length} ${
                alternatives.length > 1 ? "alternatives" : "alternative"
              } found`
        }
        variant="outlined"
        onChange={onChange}
        fullWidth
        renderValue={(value) => {
          return (
            <Box
              sx={{
                display: "flex",
                width: "98%",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  width: "87%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {defineValue(value)}
              </span>
              {updateStatus === "loading" && <CircularProgress size={20} />}
              {updateStatus === "success" && (
                <img src={successIcon} alt="success" />
              )}
              {updateStatus === "error" && <img src={errorIcon} alt="error" />}
            </Box>
          );
        }}
      >
        <MenuItem
          value={`${alternatives.length} ${
            alternatives.length > 1 ? "alternatives" : "alternative"
          } found`}
          disabled
        >
          {`${alternatives.length} ${
            alternatives.length > 1 ? "alternatives" : "alternative"
          } found`}
        </MenuItem>
        {alternatives.map(({ material_number, material_name }: any) => (
          <MenuItem key={material_number} value={material_number}>
            {material_name}
          </MenuItem>
        ))}
      </Select>
    );
  }

  return (
    <Select
      sx={{ height: 40, maxWidth: 340 }}
      value={`${alternatives.length} alternative${
        alternatives.length > 1 ? "s" : ""
      } found`}
      variant="outlined"
      fullWidth
      disabled
    >
      <MenuItem
        value={`${alternatives.length} alternative${
          alternatives.length > 1 ? "s" : ""
        } found`}
      >
        {product_name}
      </MenuItem>
      {alternatives.map(({ material_number, material_name }: any) => (
        <MenuItem key={material_number} value={material_number}>
          {material_name}
        </MenuItem>
      ))}
    </Select>
  );
};

const MappingAlternativesCell: React.FC<MappingAlternativesCellProps> = ({
  params,
  onAlternativeChoose,
}): JSX.Element => {
  const { alternatives, matched, material_number, product_name, statusUpdate } =
    params;

  function handleChange(e: any) {
    onAlternativeChoose({ ...e.target, params });
  }

  return (
    <div className="alternatives-cell" style={{ position: "relative" }}>
      <img src={RightIcon} alt="arrow" />
      <ItemMapping
        alternatives={alternatives}
        onChange={handleChange}
        matched={matched}
        updateStatus={statusUpdate}
        product_name={product_name}
      />
      <img src={RemoveIcon} alt="remove-bucket" />
    </div>
  );
};

export default MappingAlternativesCell;
