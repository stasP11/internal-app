import { useState, useEffect, Fragment } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { CircularProgress, Divider } from "@mui/material";
import useDebounce from "hooks/useDebounce";

type Option = {
  label: string;
  type: "Suggested Toolbox Mapping" | "Search results";
};

type SearchResult = {
  material_name: string;
  material_number: number;
};

function SmartSearch({
  staticOptions,
  onOptionSelect,
  country,
}: any) {
  const [open, setOpen] = useState(false);
  const [dynamicOptions, setDynamicOptions] = useState<SearchResult[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const debouncedInputValue = useDebounce(inputValue, 500);

  useEffect(() => {
    const abortController = new AbortController();
    if (!debouncedInputValue.trim()) {
      setDynamicOptions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const loadDynamicOptions = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_PYTHON_API}/material_suggestions?query=${debouncedInputValue}&country=${country}`,
          { signal: abortController.signal }
        );
        const data = await response.json();
        if (data.data && Array.isArray(data.data)) {
          setDynamicOptions(data.data);
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          console.error("Fetch error: ", error);
        }
        setDynamicOptions([]);
      } finally {
        setLoading(false);
      }
    };

    loadDynamicOptions();

    return () => {
      abortController.abort();
    };
  }, [debouncedInputValue]);

  const allOptions = [
    ...staticOptions,
    ...dynamicOptions.map((option) => {
      return {
        label: `${option.material_number} ${option.material_name}`,
        type: "Search results" as const,
      };
    }),
  ];

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    stringify: (option: Option) => option.label,
  });


  function handleSelectFromSmartSearch(newValue: any){
    const materialNumber = parseInt(newValue.label.split(" ")[0]);
    const materialName = newValue.label.split(" ").slice(1).join(" ");
    onOptionSelect({
      material_number: materialNumber,
      material_name: materialName,
    });
  }

  return (
    <Autocomplete
      sx={{
        width: "100%",
        maxWidth: "340px",
        marginInline: "24px",
        height: 40,
      }}
      componentsProps={{ popper: { style: { width: "fit-content" } } }}
      open={open}
      onKeyDown={(event) => {
        if (event.key === " ") {
          event.stopPropagation();
        }
      }}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onChange={(_, newValue: any) => handleSelectFromSmartSearch(newValue)}
      getOptionLabel={(option) => option.label}
      options={allOptions}
      filterOptions={(options, state) => {
        return [
          ...staticOptions,
          ...filterOptions(
            options.filter(
              (option: Option) => option.type === "Search results"
            ),
            state
          ),
        ];
      }}
      loading={loading}
      groupBy={(option) => option.type}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
        if (newInputValue.trim() === "") {
          setLoading(false);
        } else {
          setLoading(true);
        }
      }}
      renderOption={(props, option) => (
        <li
          {...props}
          style={{
            color: "#10384F",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "24px",
          }}
        >
          {option.label}
        </li>
      )}
      renderGroup={(params) => (
        <Fragment key={params.key}>
          <li>
            <div
              style={{
                fontFamily: "Helvetica Neue",
                color: "#516E7F",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "48px",
                padding: "0 16px",
              }}
            >
              {params.group}
            </div>
          </li>
          {params.children}
          <Divider />
        </Fragment>
      )}
      renderInput={(params) => (
        <TextField
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "0px",
            },
          }}
          {...params}
          type="search"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}

export default SmartSearch;
