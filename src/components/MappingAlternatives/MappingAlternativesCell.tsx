import React, { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material";

import RightIcon from "icons/right-arrow/ArrowForwardFilled.svg";
import RemoveIcon from "icons/bucket-icon-light/bucketIconLight.svg";
import SmartSearch from "components/SmartSearch/SmartSearch";
import ItemMapping from "components/MappingAlternatives/ItemMapping";

export interface AlternativesType {
  material_number: number;
  material_name: string;
}

type initialPproductData = {
  material_number: string;
  product_name: string;
  initially_matched_material_number: string;
  initially_matched_item_name: string;
};

interface ParamsType {
  alternatives: AlternativesType[];
  matched: number;
  material_number: number;
  product_name: string;
  statusUpdate: string;
  smart_search: AlternativesType[];
  initial_product_data: initialPproductData;
}

interface MappingAlternativesCellProps {
  params: ParamsType;
  onAlternativeChoose: any;
  country: string;
}
const MappingAlternativesCell: React.FC<MappingAlternativesCellProps> = ({
  params,
  onAlternativeChoose,
  country,
}): JSX.Element => {
  const {
    alternatives,
    matched,
    material_number,
    product_name,
    statusUpdate,
    smart_search,
    initial_product_data,
  } = params;

  const [showSmartSearch, setShowSmartSearch] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<string | null>(statusUpdate);

  useEffect(() => {
    if (matched && alternatives.length > 0 && statusUpdate !== "loading") {
      setUpdateStatus("success");
    }
  }, [matched, alternatives, statusUpdate]);

  async function handleOptionSelect(
    e: SelectChangeEvent<any>,
    fromSmartSearch: boolean
  ) {
    const number = e.target.value;
    const findNameNotFromSmartSearch = (number: any, params: ParamsType) => {
      const isExistInAlternatives = params.alternatives.find(
        (obj: any) => Number(obj.material_number) === Number(number)
      );

      if (
        Number(params.initial_product_data.material_number) === Number(number)
      ) {
        return params.initial_product_data.product_name;
      }

      if (
        Number(
          params.initial_product_data.initially_matched_material_number
        ) === Number(number)
      ) {
        return params.initial_product_data.initially_matched_item_name;
      }

      if (isExistInAlternatives) {
        return isExistInAlternatives.material_name;
      }

      return undefined;
    };

    setUpdateStatus(null);
    if (!fromSmartSearch) {
      await onAlternativeChoose(
        {
          value: number,
          name: findNameNotFromSmartSearch(number, params),
          params,
        },
        fromSmartSearch,
        setUpdateStatus
      );
    } else {
      await onAlternativeChoose(
        { ...e.target, params },
        fromSmartSearch,
        setUpdateStatus
      );
    }
  }

  const handleSelectInSmartSearch = (value: AlternativesType) => {
    const fromSmartSearch = !alternatives.some(
      (alternative: AlternativesType) =>
        alternative.material_number === value.material_number
    );

    const notInitialData =
      Number(initial_product_data?.material_number) !== value.material_number &&
      Number(initial_product_data?.initially_matched_material_number) !==
        value.material_number;

    setShowSmartSearch(false);
    handleOptionSelect(
      {
        target: {
          value: value.material_number,
          name: value.material_name,
        },
        params,
      } as unknown as SelectChangeEvent<any>,
      notInitialData && fromSmartSearch
    );
  };

  function handleRemove(e: React.MouseEvent<HTMLImageElement>) {
    e.stopPropagation();
    setShowSmartSearch(true);
  }

  function getSuggestedOptionsForSmartSearch() {
    if (alternatives.length > 0) {
      return alternatives.map((alternative: AlternativesType) => {
        return {
          label: alternative.material_number + " " + alternative.material_name,
          type: "Suggested Toolbox Mapping" as const,
        };
      });
    } else if (
      !alternatives.length &&
      Number(initial_product_data?.material_number) &&
      initial_product_data?.product_name
    ) {
      return [
        {
          label:
            initial_product_data?.material_number +
            " " +
            initial_product_data?.product_name,
          type: "Suggested Toolbox Mapping" as const,
        },
      ];
    } else if (
      !alternatives.length &&
      Number(initial_product_data?.initially_matched_material_number) &&
      initial_product_data?.initially_matched_item_name
    ) {
      return [
        {
          label:
            initial_product_data?.initially_matched_material_number +
            " " +
            initial_product_data?.initially_matched_item_name,
          type: "Suggested Toolbox Mapping" as const,
        },
      ];
    }

    // no need
    if (smart_search) {
      return smart_search.map((product: AlternativesType) => {
        return [
          {
            label: product.material_number + " " + product.material_name,
            type: "Result of previous date mapping" as const,
          },
        ];
      });
    } else if (matched && product_name) {
      return [
        {
          label: matched + " " + product_name,
          type: "Suggested Toolbox Mapping" as const,
        },
      ];
    }
  }

  return (
    <div className="alternatives-cell" style={{ position: "relative" }}>
      <img src={RightIcon} alt="arrow" />
      {showSmartSearch ? (
        <SmartSearch
          onOptionSelect={handleSelectInSmartSearch}
          staticOptions={getSuggestedOptionsForSmartSearch()}
          country={country}
        />
      ) : (
        <ItemMapping
          handleRemove={handleRemove}
          alternatives={alternatives}
          onChange={(e: SelectChangeEvent<any>) => handleOptionSelect(e, false)}
          matched={matched}
          updateStatus={updateStatus}
          product_name={product_name}
          smart_search={smart_search}
          material_number={material_number}
          initialData={initial_product_data}
        />
      )}
      <img src={RemoveIcon} alt="remove-bucket" />
    </div>
  );
};

export default MappingAlternativesCell;
