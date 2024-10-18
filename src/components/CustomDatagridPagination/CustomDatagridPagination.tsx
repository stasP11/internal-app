import {
  gridPageCountSelector,
  gridPageSizeSelector,
  gridPaginationSelector,
  gridRowCountSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid-pro";

import {
  Box,
  FormControl,
  MenuItem,
  Pagination,
  PaginationItem,
  PaginationRenderItemParams,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

interface CustomDatagridPaginationProps {
  pageSizes?: number[];
  [key: string]: any;
}

const CustomDatagridPagination = (props: CustomDatagridPaginationProps) => {
  const { pageSizes = [5, 10, 25], ...otherProps } = props;

  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);
  const rowCount = useGridSelector(apiRef, gridRowCountSelector);
  const paginationState = useGridSelector(apiRef, gridPaginationSelector);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    apiRef.current.setPage(value - 1);
  };

  const handleChangePageSize = (event: SelectChangeEvent<number>) => {
    apiRef.current.setPageSize(Number(event.target.value));
  };

  const currentPage = paginationState.paginationModel.page + 1;
  const firstItemIndex = (currentPage - 1) * pageSize + 1;
  const lastItemIndex = Math.min(firstItemIndex + pageSize - 1, rowCount);

  const styles = {
    root: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      padding: "0 20px",
    },
    typography: {
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "20px",
      fontFamily: "Helvetica Neue",
      color: "#10384F",
      minWidth: "90px",
    },
    pagination: {
      fontWeight: 400,
      lineHeight: "20px",
      fontFamily: "Helvetica Neue",
      color: "#10384F",
      "& .MuiPagination-ul": {
        color: "red",
        "& .Mui-selected": {
          fontFamily: "Helvetica Neue",
          backgroundColor: "transparent",
          color: "#10384F",
        },
      },
      "& .MuiPaginationItem-previousNext, & .MuiPaginationItem-firstLast": {
        color: "#10384F",
      },
    },
    formControl: {
      m: 1,
      minWidth: 120,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "8px",
      ".MuiInput-underline:before": {
        borderBottom: "none",
      },
    },
    itemsPerPage: {
      color: "#516E7F",
      fontFamily: "Helvetica Neue",
      fontSize: "12px",
    },
    select: {
      fontSize: "12px",
      fontFamily: "Helvetica Neue",
      "& .MuiSelect-root::before": {
        borderBottom: "none",
      },
      "& .MuiSelect-root::after": {
        borderBottom: "none",
      },
    },
  };

  const renderItem = (
    item: PaginationRenderItemParams,
    currentPage: number
  ) => {
    if (item.type === "start-ellipsis" || item.type === "end-ellipsis") {
      return null;
    }
    if (item.type === "page") {
      return item.page === currentPage ? <PaginationItem {...item} /> : null;
    }
    return <PaginationItem {...item} />;
  };

  return (
    <Box sx={styles.root}>
      <Typography
        sx={styles.typography}
      >{`${firstItemIndex}-${lastItemIndex} of ${rowCount}`}</Typography>
      <Pagination
        sx={styles.pagination}
        showFirstButton
        showLastButton
        count={pageCount}
        page={currentPage}
        onChange={handleChangePage}
        renderItem={(item) => renderItem(item, currentPage)}
        {...otherProps}
      />

      <FormControl variant="standard" sx={styles.formControl}>
        <Typography sx={styles.itemsPerPage}>Show items per page:</Typography>
        <Select
          sx={styles.select}
          value={pageSize}
          onChange={handleChangePageSize}
        >
          {pageSizes.map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CustomDatagridPagination;
