import React, { useState } from "react";
import {
  Select,
  MenuItem,
  CircularProgress,
  Box,
  Divider,
} from "@mui/material";
import successIcon from "../../icons/success-icon/successIcon.svg";
import errorIcon from "../../icons/error-icon/errorIcon.svg";
import getInteger from "utils/getInteger";
import closeIcon from "../../icons/close-icon/closeIcon.svg";

const menuItemStyles = {
  fontFamily: "inherit",
  color: "#10384F",
};

export interface AlternativesType {
  material_number: number;
  material_name: string;
}

interface ParamsType {
  alternatives: AlternativesType[];
  matched: number;
  material_number: number;
  product_name: string;
  statusUpdate: string;
  smart_search: AlternativesType[];
}

interface MappingAlternativesCellProps {
  params: ParamsType;
  onAlternativeChoose: any;
  country: string;
}

const ItemMapping = ({
  alternatives,
  onChange,
  matched,
  updateStatus,
  product_name,
  smart_search,
  material_number,
  handleRemove,
  initialData,
}: any) => {
  const [isHovered, setIsHovered] = useState(false);

  const isAutomaticallyMapped =
    (alternatives.length === 0 &&
      Number(initialData.initially_matched_material_number) ===
        Number(matched)) ||
    Number(initialData.material_numberr) === Number(matched);
  const isHasInitialMappedData =
    !!initialData.initially_matched_material_number &&
    !!initialData.initially_matched_item_name;

  // handle value, if need transform product number to full name
  const handleValue = (value: string | number): string => {
    // Handle case when value is a string
    if (typeof value === "string") {
      return value;
    }

    // Verify smart_search is not null or empty and check for a material number match
    if (
      smart_search &&
      smart_search.length > 0 &&
      smart_search[0].material_number === value
    ) {
      return `${smart_search[0].material_number} ${smart_search[0].material_name}`;
    }

    // Check alternatives for a matching material number
    if (alternatives.length > 0) {
      const alternativeMatch = alternatives.find(
        (alt: AlternativesType) => alt.material_number === value
      );
      if (alternativeMatch) {
        return `${alternativeMatch.material_number} ${alternativeMatch.material_name}`;
      }
    }

    // Check if 'matched' is the same as initial 'material_number' and there are no alternatives
    if (
      !alternatives.length &&
      matched === Number(initialData.material_number)
    ) {
      if (isAutomaticallyMapped) {
        return `${matched} ${initialData.product_name}`;
      }
    }

    // When no specific matches found, but there's a valid 'matched' scenario
    if (matched) {
      return `${matched} ${product_name}`;
    }

    // Fallback to a default phrase or handling when value could not match any conditions
    return "Unknown material";
  };

  function getMatchingAlternative(
    alternatives: AlternativesType[],
    integerMatched: number
  ) {
    return alternatives
      .map((alternative) => ({
        ...alternative,
        material_number: getInteger(alternative.material_number),
      }))
      .find((alternative) => alternative.material_number === integerMatched);
  }

  function isMatchingSmartSearch(
    smart_search: AlternativesType[],
    integerMatched: number
  ) {
    return (
      smart_search.length > 0 &&
      getInteger(smart_search[0].material_number) === integerMatched
    );
  }

  function getValueForSelect(): number | string {
    const integerMatched = getInteger(matched);
    const integerMaterialNumber = getInteger(material_number);

    // No alternatives found, no match found. Return string with number of alternatives
    if (alternatives.length > 0 && matched === null) {
      const alternativeWord =
        alternatives.length > 1 ? "alternatives" : "alternative";
      return `${alternatives.length} ${alternativeWord} found`;
    }

    // Matched from alternatives
    const matchingAlternative = getMatchingAlternative(
      alternatives,
      integerMatched
    );
    if (matchingAlternative) {
      return Number(matchingAlternative.material_number);
    }

    //Matched from smart search
    if (isMatchingSmartSearch(smart_search, integerMatched)) {
      return Number(smart_search[0].material_number);
    }

    // automatch by tollbox
    if (
      Number(initialData?.initially_matched_material_number) === Number(matched)
    ) {
      return Number(initialData?.initially_matched_material_number);
    }

    // if evrething fine, initial data created by distributor is correct
    if (Number(initialData?.material_number) === Number(matched)) {
      return Number(initialData?.material_number);
    }

    return "Search for Bayer Item";
  }

  const renderValueWithActualIcon = (value: string | number) => (
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
        {handleValue(value)}
      </span>
      {updateStatus === "loading" && <CircularProgress size={20} />}

      {isHovered && (
        <>
          {updateStatus === "success" ? (
            <img onMouseDown={handleRemove} src={closeIcon} alt="remove" />
          ) : (
            isAutomaticallyMapped && (
              <img onMouseDown={handleRemove} src={closeIcon} alt="remove" />
            )
          )}
        </>
      )}

      {!isHovered && updateStatus === "success" && (
        <img src={successIcon} alt="success" />
      )}

      {updateStatus === "error" && <img src={errorIcon} alt="error" />}
    </Box>
  );

  return (
    <>
      <Select
        onMouseEnter={() => {
          updateStatus !== "loading" && setIsHovered(true);
        }}
        onMouseLeave={() => setIsHovered(false)}
        value={getValueForSelect()}
        variant="outlined"
        onChange={(e) => {
          setIsHovered(false);
          onChange(e);
        }}
        onClose={() => setIsHovered(false)}
        fullWidth
        sx={{
          height: 40,
          maxWidth: 340,
          fontFamily: "Helvetica Neue",
          color: "#10384F",
        }}
        renderValue={renderValueWithActualIcon}
        disabled={
          isAutomaticallyMapped && matched !== smart_search[0]?.material_number
        }
      >
        {alternatives.length > 0 && [
          <MenuItem
            sx={menuItemStyles}
            value={`${alternatives.length} ${
              alternatives.length > 1 ? "alternatives" : "alternative"
            } found`}
            key="count"
          >
            {`${alternatives.length} ${
              alternatives.length > 1 ? "alternatives" : "alternative"
            } found`}
          </MenuItem>,

          ...alternatives.map(
            ({ material_number, material_name }: AlternativesType) => (
              <MenuItem
                sx={menuItemStyles}
                key={material_number}
                value={material_number}
              >
                {`${material_number} ${material_name}`}
              </MenuItem>
            )
          ),
        ]}

        {/* need aditional fix */}
        {!alternatives.length &&
          isHasInitialMappedData && [
            <MenuItem disabled key="suggested-toolbox">
              Suggested Toolbox Mapping
            </MenuItem>,
            <MenuItem
              key={initialData.initially_matched_material_number}
              sx={menuItemStyles}
              value={initialData.initially_matched_material_number}
            >
              {" "}
              {`${initialData.initially_matched_material_number} ${initialData.initially_matched_item_name}`}
            </MenuItem>,
          ]}

        {smart_search.length > 0 &&
          matched === smart_search[0].material_number && [
            <Divider key="divider" />,
            <MenuItem disabled key="manual-data-steward-mapping">
              Manual Data Steward Mapping
            </MenuItem>,
            <MenuItem
              sx={menuItemStyles}
              value={getValueForSelect()}
              key="manual-data-value"
            >
              {handleValue(getValueForSelect())}
            </MenuItem>,
          ]}
      </Select>
    </>
  );
};

export default ItemMapping;
