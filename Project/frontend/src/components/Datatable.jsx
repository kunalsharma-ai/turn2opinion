"use client";
import * as React from "react";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableFooter,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  Select,
  Menu,
  MenuItem,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import { api, Page } from "@/util";
import PaginationButtons from "./PaginationButtons";
import { DownloadTable } from ".";
import { jsxToText } from "./DownloadTable";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function Icon(attr) {
  const btnStyle = {
    fontSize: "18px",
    height: "20px",
    width: "20px",
    padding: "0",
    filter: "drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.2))",
  };
  let aria = Object.keys(attr)
    .filter((key) => key.indexOf("aria") > -1 || key.indexOf("data") > -1)
    .reduce((a, c) => {
      a[c] = attr[c];
      return a;
    }, {});
  const iconBtn = (
    <IconButton
      {...aria}
      disabled={attr.disabled}
      tabIndex={attr.tabIndex ?? 0}
      onClick={attr.onClick}
      aria-label={attr.label || "icon-button"}
      sx={{
        color: "black",
        mx: "10px",
        p: 0,
        ...(attr.disabled
          ? {
              "&.Mui-disabled": {
                cursor: "not-allowed",
                pointerEvents: "auto",
              },
            }
          : { cursor: "pointer" }),
        ...attr.sx,
      }}
    >
      <i
        className={attr.iconClass}
        style={{ ...(attr.style || btnStyle) }}
        aria-hidden="true"
      />
      {attr.showLabel && (
        <span
          style={{
            fontSize: "13px",
            marginLeft: "6px",
            opacity: "0.6",
          }}
        >
          {attr.label}
        </span>
      )}
    </IconButton>
  );
  return attr?.disableTooltip ? (
    iconBtn
  ) : (
    <Tooltip title={attr.label} placement="top" arrow>
      <span>{iconBtn}</span>
    </Tooltip>
  );
}

function ColHeader(attr) {
  const col = attr.col;
  const feature = col?.feature?.reduce((a, c) => {
    a[c] = true;
    return a;
  }, {});
  const [isHovered, setIsHovered] = React.useState(false);
  const alignToJustifyContent = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    left: "flex-start",
    right: "flex-end",
  };
  const isEndOrRight = ["end", "right"].includes(col.align ?? "start");

  return (
    attr.visible && (
      <TableCell
        align={col.align ?? "start"}
        padding="none"
        sortDirection={attr.sorted}
        sx={{
          paddingLeft: "8px",
          paddingRight: "4px",
          top: 0,
          bgcolor: attr.headerColor
            ? `${attr.headerColor} !important`
            : "#063686",
          color: "white",
          zIndex: attr.locked ? 4 : 2,
          fontWeight: "600",
          fontSize: "14px",
          minWidth: col.width ?? 200,
          width: col.width || 200,
          height: "36px",
          textAlign: col.align ?? "start",
          ...(attr.locked && {
            position: "sticky",
            left: `${attr.lockOffset}px`,
            boxShadow: "2px 0 5px -2px rgba(0, 0, 0, 0.3)",
          }),
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: alignToJustifyContent[col.align ?? "start"],
          }}
        >
          {feature?.sortable && isEndOrRight && (
            <TableSortLabel
              active={!!attr.sorted || isHovered}
              direction={attr.sorted ? attr.sorted : "asc"}
              onClick={(event) => {
                attr.onSort(event, col.id);
              }}
              sx={{
                mr: 0.2,
                color: "white",
                visibility: attr.sorted || isHovered ? "visible" : "hidden",
                "& .MuiTableSortLabel-icon": {
                  color: "white !important",
                },
              }}
            />
          )}
          {feature?.sortable ? (
            <Box
              component="span"
              onClick={(event) => {
                attr.onSort(event, col.id);
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              sx={{
                cursor: "pointer",
              }}
            >
              <Tooltip title="click to sort" placement="top">
                {col.label}
              </Tooltip>
            </Box>
          ) : (
            <span>{col.label}</span>
          )}
          {feature?.lockable && (
            <Tooltip title="Toggle Column Lock" placement="top">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  attr.onLock(col.id);
                }}
                sx={{
                  color: "white",
                  pl: 0.5,
                  m: 0,
                  fontSize: "12px",
                  opacity: 0.5,
                }}
              >
                <i
                  className={`fa fa-${attr.locked ? "lock" : "lock-open"}`}
                  style={{ fontSize: "12px", marginLeft: "3px" }}
                />
              </IconButton>
            </Tooltip>
          )}
          {feature?.sortable && !isEndOrRight && (
            <TableSortLabel
              active={!!attr.sorted || isHovered}
              direction={attr.sorted ? attr.sorted : "asc"}
              onClick={(event) => {
                attr.onSort(event, col.id);
              }}
              sx={{
                ml: 0.2,
                color: "white",
                visibility: attr.sorted || isHovered ? "visible" : "hidden",
                "& .MuiTableSortLabel-icon": {
                  color: "white !important",
                },
              }}
            />
          )}
        </Box>
      </TableCell>
    )
  );
}

export default function Datatable({
  parentData = null,
  hideToolbar = false,
  hideDownload = false,
  hideColumnSelector = false,
  columns,
  disabled,
  ...attr
}) {
  const [hidePagination, setHidePagination] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [pageSize, setRowsPerPage] = React.useState(attr.pageSize ?? 10);
  const [showSelectColumns, setShowSelectColumns] = React.useState(null);
  const [searchTerms, setSearchTerms] = React.useState({});
  const [lockedColumns, setLockedColumns] = React.useState({});
  const [lockedRows, setLockedRows] = React.useState({});

  const [filterValues, setFilterValues] = React.useState({});
  const [categoryFilterAnchor, setCategoryFilterAnchor] = React.useState(null);
  const [categoryFilter, setCategoryFilter] = React.useState([]);
  const tableRef = React.useRef();
  const [statusFilterAnchor, setStatusFilterAnchor] = React.useState(null);
  const [statusFilter, setStatusFilter] = React.useState([]);

  const disabledColumns = attr.disabledColumns || [];
  const defaultHiddenColumns = attr.defaultHiddenColumns || [];
  const [columnVisibility, setColumnVisibility] = React.useState(() =>
    columns.reduce(
      (acc, cell) => ({
        ...acc,
        [cell.id]: !cell.hidden && !defaultHiddenColumns.includes(cell.id),
      }),
      {}
    )
  );

  React.useEffect(() => {
    setHidePagination(attr.hidePagination);
  }, [attr.hidePagination]);
  const hasSearchableColumn = React.useMemo(() => {
    return columns.some((col) => col?.feature?.includes("searchable"));
  }, [columns]);

  React.useEffect(() => {
    setColumnVisibility(
      columns.reduce(
        (acc, cell) => ({
          ...acc,
          [cell.id]: !cell.hidden && !defaultHiddenColumns.includes(cell.id),
        }),
        {}
      )
    );
  }, [columns]);

  const handleColumnToggle = (columnId) => {
    if (disabledColumns.includes(columnId)) return;
    setColumnVisibility((prev) => ({ ...prev, [columnId]: !prev[columnId] }));
  };

  React.useEffect(() => {
    if (!attr.onSelect) return;
    attr.onSelect(selected);
  }, [selected]);
  const data = attr.data;

  const loading =
    "isLoading" in attr ? attr.isLoading : !data || data.length === 0;

  // const loading = attr.data === undefined;
  const effectiveStatusOptions = React.useMemo(() => {
    if (!data || data.length === 0 || !attr.statusOptions?.length) {
      return [];
    }
    const uniqueStatuses = [
      ...new Set(data.map((row) => String(row.status))),
    ].filter((value) => value && value !== "null" && value !== "undefined");
    return attr.statusOptions
      .filter((option) => uniqueStatuses.includes(option.value))
      .map(({ value, label }) => ({ value, label }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [data, attr.statusOptions]);

  const getFilterOptions = (columnId) => {
    if (!data) return [];
    const uniqueValues = [
      ...new Set(data.map((row) => String(row[columnId]))),
    ].sort();
    return uniqueValues.filter(
      (value) => value !== undefined && value !== null && value !== ""
    );
  };

  const handleOpenStatusFilter = (event) =>
    setStatusFilterAnchor(event.currentTarget);

  const handleCloseStatusFilter = () => setStatusFilterAnchor(null);

  const handleStatusFilterToggle = (value) => {
    setStatusFilter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
    setPage(0);
  };

  const onLockColumn = (columnId) => {
    setLockedColumns((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  const toggleRowLock = (rowId) => {
    setLockedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  const onSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredRows.map((n) => n.id);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const onCheckRow = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) newSelected = [...selected, id];
    else if (selectedIndex === 0) newSelected = selected.slice(1);
    else if (selectedIndex === selected.length - 1)
      newSelected = selected.slice(0, -1);
    else
      newSelected = [
        ...selected.slice(0, selectedIndex),
        ...selected.slice(selectedIndex + 1),
      ];

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenColumnMenu = (event) =>
    setShowSelectColumns(event.currentTarget);

  const handleCloseColumnMenu = () => setShowSelectColumns(null);

  const handleOpenCategoryFilter = (event) =>
    setCategoryFilterAnchor(event.currentTarget);

  const handleCloseCategoryFilter = () => setCategoryFilterAnchor(null);

  const handleCategoryFilterToggle = (value) => {
    setCategoryFilter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
    setPage(0);
  };

  const onSearch = (event, columnId) => {
    setSearchTerms((prev) => ({ ...prev, [columnId]: event.target.value }));
    setPage(0);
  };

  const onFilterChange = (event, columnId) => {
    setFilterValues((prev) => ({ ...prev, [columnId]: event.target.value }));
    setPage(0);
  };

  const getRowValue = React.useCallback(
    (row, columnId) => {
      const col = columns.find((c) => c.id === columnId);
      if (!col) return "";
      if (col.data) {
        return row[col.data] ?? "";
      }
      if (col.render) {
        const rendered = col.render(row, parentData);
        return jsxToText(rendered);
      }
      return row[columnId] ?? "";
    },
    [columns, parentData]
  );

  const filteredRows = React.useMemo(() => {
    const rows = Array.isArray(data) ? data : [];
    return rows.filter((row) => {
      if (!row) return false;
      const matchesSearch = Object.entries(searchTerms).every(
        ([column, term]) =>
          !term ||
          String(row[column]).toLowerCase().includes(term.toLowerCase()) ||
          String(getRowValue(row, column))
            .toLowerCase()
            .includes(term.toLowerCase())
      );

      const matchesFilters = Object.entries(filterValues).every(
        ([column, value]) => !value || String(row[column]) === value
      );

      const matchesCategory =
        categoryFilter.length === 0 ||
        (categoryFilter.includes("client") &&
          categoryFilter.includes("vendor") &&
          row.category?.isClient &&
          row.category?.isVendor) ||
        (categoryFilter.includes("client") &&
          !categoryFilter.includes("vendor") &&
          row.category?.isClient) ||
        (categoryFilter.includes("vendor") &&
          !categoryFilter.includes("client") &&
          row.category?.isVendor);

      const matchesBidStatus =
        statusFilter.length === 0 || statusFilter.includes(row.status);
      return (
        matchesSearch && matchesFilters && matchesCategory && matchesBidStatus
      );
    });
  }, [data, searchTerms, filterValues, categoryFilter, statusFilter]);

  const visibleRows = React.useMemo(() => {
    const sorted = [...filteredRows].sort(getComparator(order, orderBy));
    return hidePagination
      ? sorted
      : sorted.slice(page * pageSize, page * pageSize + pageSize);
  }, [order, orderBy, page, pageSize, filteredRows, hidePagination]);

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const headerRowHeight = 0;
  let stickyOffset = headerRowHeight + 40;

  const getLockedColumnOffset = (columnId) => {
    let offset = 0;
    for (const cell of columns) {
      if (!columnVisibility[cell.id] || !lockedColumns[cell.id]) continue;
      if (cell.id === columnId) break;
      offset += parseInt(cell.width, 10) || 180;
    }
    return offset;
  };

  const calculateColumnTotals = (
    rows,
    columns,
    columnVisibility,
    parentData
  ) => {
    const totals = {};
    columns.forEach((col) => {
      if (col?.feature?.includes("total") && columnVisibility[col.id]) {
        const sum = rows.reduce((acc, row) => {
          let value;
          if (col.data) {
            value = parseFloat(row[col.data]);
          } else if (col.render) {
            let temp = jsxToText(col.render(row, parentData)).replace(
              /[^\d.-]+/g,
              ""
            );
            value = parseFloat(temp);
          }
          const numericValue = isNaN(value) ? 0 : value;
          return acc + numericValue;
        }, 0);
        totals[col.id] = sum;
      }
    });
    return totals;
  };

  const columnTotals = React.useMemo(
    () =>
      calculateColumnTotals(visibleRows, columns, columnVisibility, parentData),
    [visibleRows, columns, columnVisibility, parentData]
  );

  const columnTotalsOverall = React.useMemo(
    () =>
      calculateColumnTotals(
        filteredRows,
        columns,
        columnVisibility,
        parentData
      ),
    [filteredRows, columns, columnVisibility, parentData]
  );

  React.useEffect(() => {
    setSelected([]);
  }, [data]);

  const firstVisibleColumn = columns.find(
    (col) => columnVisibility[col.id]
  )?.id;
  return (
    <Box sx={{ minWidth: "100%" }}>
      <Box
        sx={{
          p: 0.5,
        }}
      >
        {!hideToolbar && (
          <Box sx={{ width: "100%" }}>
            <Toolbar
              sx={{
                minHeight: "52px !important",
                py: 1,
                px: "0 !important",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {attr.back && (
                <Icon
                  iconClass="fa fa-arrow-left"
                  onClick={attr.back}
                  label="Back"
                />
              )}
              <Typography
                sx={{ flex: "1", fontWeight: "bold" }}
                variant="h5"
                component="div"
              >
                {attr.title}
              </Typography>
              {attr.extra}
              {attr.upload && (
                <Icon
                  iconClass="fas fa-upload"
                  onClick={attr.upload}
                  label="Upload"
                />
              )}
              {attr.categoryFilter && (
                <Icon
                  iconClass="fas fa-tag"
                  onClick={handleOpenCategoryFilter}
                  label="Filter by category"
                />
              )}
              {attr.statusFilter && (
                <Icon
                  iconClass="fas fa-tag"
                  onClick={handleOpenStatusFilter}
                  label="Filter by status"
                />
              )}
              {attr.add && (
                <Icon iconClass="fas fa-plus" onClick={attr.add} label="Add" />
              )}
              {!hideDownload && (
                <Icon
                  iconClass="fas fa-download"
                  label="Download Table Data"
                  onClick={(e) => {
                    const visibleColumns = columns.filter(
                      (col) => columnVisibility[col.id]
                    );

                    const headers = visibleColumns.map((col) => col.label);

                    const dataRows = filteredRows.map((row) => {
                      return visibleColumns.map((col) => {
                        if (col.data) {
                          return row?.[col.data] ?? "";
                        } else if (col.render) {
                          const rendered = col.render(row, parentData);
                          return rendered;
                        }
                        return "";
                      });
                    });

                    const totalsRow = visibleColumns.map((col, index) => {
                      if (index === 0 && col.id === firstVisibleColumn) {
                        return "Total";
                      }
                      return col?.feature?.includes("total")
                        ? columnTotalsOverall[col.id] || "0.00"
                        : "";
                    });

                    const exportData = [headers, ...dataRows, totalsRow];

                    DownloadTable({
                      info: exportData,
                      title: attr.title,
                      replaceChars: attr.replaceChars,
                    });
                  }}
                />
              )}
              {hasSearchableColumn && (
                <Icon
                  iconClass="fas fa-search"
                  onClick={(e) => {
                    setShowSearch(!showSearch);
                  }}
                  label={showSearch ? "Hide Search" : "Show Search"}
                />
              )}
              {!hideColumnSelector && (
                <Icon
                  iconClass="fas fa-filter"
                  onClick={handleOpenColumnMenu}
                  label="Show / Hide Columns"
                />
              )}
            </Toolbar>
            <Menu
              anchorEl={showSelectColumns}
              open={Boolean(showSelectColumns)}
              onClose={handleCloseColumnMenu}
            >
              {columns.map((cell) => (
                <MenuItem
                  key={cell.id}
                  onClick={() => handleColumnToggle(cell.id)}
                  disabled={disabledColumns.includes(cell.id)}
                  sx={{
                    fontSize: 14,
                    px: 2,
                    py: 0.5,
                  }}
                >
                  <Checkbox checked={columnVisibility[cell.id]} size="small" />
                  {cell.label}
                </MenuItem>
              ))}
            </Menu>
            <Menu
              anchorEl={statusFilterAnchor}
              open={Boolean(statusFilterAnchor)}
              onClose={handleCloseStatusFilter}
            >
              {effectiveStatusOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  onClick={() => handleStatusFilterToggle(option.value)}
                  sx={{ fontSize: 14, pr: 3, py: 0.5 }}
                >
                  <Checkbox
                    checked={
                      statusFilter.length === 0 ||
                      statusFilter.includes(option.value)
                    }
                    size="small"
                  />
                  {option.label}
                </MenuItem>
              ))}
            </Menu>
            <Menu
              anchorEl={categoryFilterAnchor}
              open={Boolean(categoryFilterAnchor)}
              onClose={handleCloseCategoryFilter}
            >
              <MenuItem
                onClick={() => handleCategoryFilterToggle("client")}
                sx={{ fontSize: 14, px: 2, py: 0.5 }}
              >
                <Checkbox
                  checked={categoryFilter.includes("client")}
                  size="small"
                />
                Client
              </MenuItem>
              <MenuItem
                onClick={() => handleCategoryFilterToggle("vendor")}
                sx={{ fontSize: 14, px: 2, py: 0.5 }}
              >
                <Checkbox
                  checked={categoryFilter.includes("vendor")}
                  size="small"
                />
                Vendor
              </MenuItem>
            </Menu>
          </Box>
        )}
        <Box sx={{ position: "relative" }}>
          {loading && (
            <>
              <Page.Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  zIndex: 9,
                }}
              />
              <Page.Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  display: "inline-flex",
                  zIndex: 10,
                }}
              >
                <CircularProgress size={70} thickness={1} />
                <Page.Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Page.Text
                    sx={{
                      fontSize: "10px",
                      color: "secondary.main",
                      fontWeight: "bold",
                    }}
                  >
                    Loading
                  </Page.Text>
                </Page.Box>
              </Page.Box>
            </>
          )}
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: 2,
              borderRadius: 2,
              maxHeight:
                attr.maxHeight ||
                (attr?.withSelected
                  ? "calc(100vh - 293px)"
                  : "calc(100vh - 250px)"),
              // maxHeight: "545px",
              overflow: "auto",
              position: "relative",
              minWidth: "100%",
            }}
          >
            <Table
              ref={tableRef}
              stickyHeader
              size="small"
              sx={{
                minWidth: "100%",
                overflowX: "scroll",
                tableLayout: "fixed",
                "& tbody td": {
                  height: "32px",
                  border: "1px solid rgba(0, 0, 0, 0.12)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                },
                "& tbody tr": {
                  height: "32px",
                },
                "& thead th": {
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                },
                "& tfoot td": {
                  border: "1px solid rgba(0, 0, 0, 0.12)",
                  fontWeight: "bold",
                  color: "black",
                  fontSize: "13px",
                  height: "32px",
                },
                filter: disabled ? "grayscale(1)" : "",
              }}
            >
              <TableHead>
                <TableRow>
                  {attr.rowLockable && (
                    <TableCell
                      sx={{
                        position: "sticky",
                        top: 0,
                        zIndex: 5,
                        backgroundColor: "white",
                        width: "50px !important",
                      }}
                    />
                  )}
                  {attr.rowSelectable && (
                    <TableCell
                      sx={{
                        position: "sticky",
                        top: 0,
                        bgcolor: attr.headerColor
                          ? `${attr.headerColor} !important`
                          : "#04662b",
                        width: "35.5px !important",
                        maxWidth: "35.5px !important",
                        p: "0 !important",
                      }}
                    >
                      <Page.Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Checkbox
                          color="white"
                          size="small"
                          inputProps={{ "aria-label": "select all rows" }}
                          sx={{
                            width: "16px !important",
                            height: "16px !important",
                            padding: 0,
                            margin: 0,
                            "& .MuiSvgIcon-root": {
                              width: "16px !important",
                              height: "16px !important",
                              color: "white",
                            },
                          }}
                          indeterminate={
                            selected.length > 0 &&
                            selected.length < filteredRows.length
                          }
                          checked={
                            filteredRows.length > 0 &&
                            selected.length === filteredRows.length
                          }
                          onChange={handleSelectAllClick}
                        />
                      </Page.Box>
                    </TableCell>
                  )}
                  {columns.map((col) => (
                    <ColHeader
                      col={col}
                      key={col.id}
                      visible={columnVisibility[col.id]}
                      locked={lockedColumns[col.id]}
                      sorted={orderBy === col.id ? order : false}
                      onSort={onSort}
                      headerColor={attr.headerColor ?? "#063686"}
                      onLock={onLockColumn}
                      lockOffset={getLockedColumnOffset(col.id)}
                    />
                  ))}
                </TableRow>
                {showSearch && (
                  <TableRow>
                    {attr.rowLockable && (
                      <TableCell
                        sx={{
                          position: "sticky",
                          top: headerRowHeight,
                          zIndex: 5,
                          backgroundColor: "white",
                          border: "1px solid rgba(0, 0, 0, 0.12) !important",
                          width: "20px",
                        }}
                      />
                    )}
                    {attr.rowSelectable && (
                      <TableCell
                        sx={{
                          position: "sticky",
                          top: headerRowHeight,
                          border: "1px solid rgba(0, 0, 0, 0.12) !important",
                          zIndex: 5,
                          backgroundColor: "white",
                          width: "35px !important",
                        }}
                      />
                    )}
                    {columns.map((col) => {
                      const searchable = col?.feature?.includes("searchable");
                      const filterable = col?.feature?.includes("filterable");
                      if (!columnVisibility[col.id]) return <></>;
                      return (
                        <TableCell
                          key={col.id}
                          align={col.align ?? "start"}
                          sx={{
                            top: headerRowHeight,
                            zIndex: lockedColumns[col.id] ? 5 : 1,
                            backgroundColor: "white",
                            border: "1px solid rgba(0, 0, 0, 0.12) !important",
                            minWidth: col.width ?? 200,
                            py: 0.5,
                            pr: 1,
                            pl: 0,
                            ...(lockedColumns[col.id] && {
                              position: "sticky",
                              left: `${getLockedColumnOffset(col.id)}px`,
                              boxShadow: "2px 0 5px -2px rgba(0, 0, 0, 0.3)",
                            }),
                          }}
                        >
                          {searchable && (
                            <Page.InputTextField
                              sx={{
                                mx: 1,
                                width: "calc(100% - 8px)",
                                height: "24px",
                                "& .MuiInputBase-root": {
                                  height: "24px",
                                  fontSize: "12px",
                                },
                                "& .MuiInputBase-input": {
                                  padding: "8px 10px",
                                  textAlign: col.align ?? "start",
                                },
                              }}
                              size="small"
                              type="text"
                              value={searchTerms[col.id] || ""}
                              onChange={(e) => onSearch(e, col.id)}
                              placeholder={`Search ${col.label}`}
                            />
                          )}
                          {filterable && (
                            <Select
                              value={filterValues[col.id] || ""}
                              onChange={(e) => onFilterChange(e, col.id)}
                              size="small"
                              displayEmpty
                              sx={{
                                ml: 1,
                                width: "calc(100% - 8px)",
                                height: "24px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                "& .MuiSelect-select": {
                                  padding: "4px",
                                  fontSize: "12px !important",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                },
                              }}
                            >
                              <MenuItem
                                value=""
                                sx={{
                                  pl: 1,
                                  fontSize: "12px",
                                  pl: 2,
                                  minHeight: "24px",
                                }}
                              >
                                All
                              </MenuItem>
                              {getFilterOptions(col.id).map((opt) => (
                                <MenuItem
                                  key={opt}
                                  value={opt}
                                  sx={{
                                    pl: 2,
                                    fontSize: "12px",
                                    minHeight: "24px",
                                  }}
                                >
                                  {opt === "true"
                                    ? "Active"
                                    : opt === "false"
                                    ? "Inactive"
                                    : opt}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                )}
              </TableHead>
              <TableBody>
                {loading ? (
                  // [...Array(7)].map((_, rowIndex) => (
                  //   <TableRow key={`skeleton-${rowIndex}`}>
                  //     {attr.rowLockable && <TableCell />}
                  //     {attr.rowSelectable && <TableCell />}
                  //     {columns.map(
                  //       (col) =>
                  //         columnVisibility[col.id] && (
                  //           <TableCell
                  //             key={col.id}
                  //             sx={{
                  //               minWidth: col.width ?? "140px",
                  //               height: "30px",
                  //             }}
                  //           >
                  //             <Skeleton
                  //               animation="wave"
                  //               height="30px"
                  //               sx={{ bgcolor: "grey.100" }}
                  //             />
                  //           </TableCell>
                  //         )
                  //     )}
                  //   </TableRow>
                  // ))
                  <TableRow>
                    <TableCell
                      colSpan={
                        columns.filter((col) => columnVisibility[col.id])
                          .length +
                        (attr.rowLockable ? 1 : 0) +
                        (attr.rowSelectable ? 1 : 0)
                      }
                      sx={{
                        height: "320px !important",
                        position: "relative",
                      }}
                    ></TableCell>
                  </TableRow>
                ) : visibleRows.length > 0 ? (
                  <>
                    {visibleRows.map((row, index) => {
                      if (!row) return null;
                      const isItemSelected = row?.id
                        ? isSelected(row.id)
                        : false;
                      const isLocked = lockedRows[row.id];
                      const rowTop = isLocked ? stickyOffset : "auto";

                      if (isLocked) {
                        stickyOffset += 33;
                      }
                      return (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={row?.id || `row-${index}`}
                          selected={isItemSelected}
                          sx={{
                            // wordBreak: "break-word",
                            // whiteSpace: "pre-wrap",
                            // overflowWrap: "break-word",
                            position: isLocked ? "sticky" : "static",
                            top: isLocked ? `${rowTop}px` : "auto",
                            zIndex: isLocked ? 5 : 0,
                            "&.Mui-selected": {
                              backgroundColor: "#c1e3ff !important",
                            },
                            ":hover": {
                              backgroundColor: "#effeff !important",
                            },
                            "&.Mui-selected:hover": {
                              backgroundColor: "#a7d4fc !important",
                            },
                            backgroundColor: isLocked
                              ? "#e4f5f7"
                              : index & 1
                              ? "#f0f0f0"
                              : "background.default",
                          }}
                        >
                          {attr.rowLockable && (
                            <TableCell sx={{ width: "20px" }}>
                              <Tooltip title="Toggle Row Lock">
                                <IconButton
                                  size="small"
                                  aria-label="toggle row lock"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleRowLock(row.id);
                                  }}
                                  sx={{
                                    color: "grey",
                                    pl: 0.5,
                                    m: 0,
                                    fontSize: "12px",
                                    opacity: 0.5,
                                  }}
                                >
                                  <i
                                    className={`fa fa-${
                                      lockedRows[row.id] ? "lock" : "lock-open"
                                    }`}
                                  />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          )}
                          {attr.rowSelectable && (
                            <TableCell
                              sx={{
                                width: "35.5px !important",
                                maxWidth: "35.5px !important",
                                p: "0 !important",
                              }}
                            >
                              <Page.Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Checkbox
                                  color="primary"
                                  size="small"
                                  inputProps={{ "aria-label": "select row" }}
                                  sx={{
                                    width: "16px !important",
                                    height: "16px !important",
                                    padding: 0,
                                    margin: 0,
                                    "& .MuiSvgIcon-root": {
                                      width: "16px !important",
                                      height: "16px !important",
                                    },
                                  }}
                                  onClick={(event) => onCheckRow(event, row.id)}
                                  checked={isItemSelected}
                                />
                              </Page.Box>
                            </TableCell>
                          )}
                          {columns.map(
                            (cell) =>
                              columnVisibility[cell.id] && (
                                <TableCell
                                  key={cell.id}
                                  align={cell.align || "start"}
                                  sx={{
                                    // textOverflow: "ellipsis",
                                    // overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    // wordBreak: "break-word",
                                    // overflowWrap: "break-word",
                                    textAlign: cell.align || "start",
                                    p: "0 !important",
                                    m: "0 !important",
                                    height: "20px",
                                    fontSize: "13px", //table data cell fontSize
                                    fontWeight: "500",
                                    minWidth: "100px",
                                    width: cell.width || "150px",
                                    px: "8px !important",
                                    ...(lockedColumns[cell.id] && {
                                      position: "sticky",
                                      left: `${getLockedColumnOffset(
                                        cell.id
                                      )}px`,
                                      backgroundColor: "inherit",
                                      boxShadow:
                                        "2px 0 5px -2px rgba(0, 0, 0, 0.3)",
                                      zIndex: 2,
                                    }),
                                  }}
                                >
                                  {cell.data
                                    ? row?.[cell.data] ?? ""
                                    : cell.render?.(row, parentData) ?? ""}
                                </TableCell>
                              )
                          )}
                        </TableRow>
                      );
                    })}
                    {filteredRows.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={columns.length + 2} />
                      </TableRow>
                    )}
                  </>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={
                        columns.filter((col) => columnVisibility[col.id])
                          .length +
                        (attr.rowLockable ? 1 : 0) +
                        (attr.rowSelectable ? 1 : 0)
                      }
                      align="start"
                    >
                      <Page.Box
                        sx={{
                          width: { xs: "100vw", md: "calc(100vw - 280px)" },
                          height: "320px !important",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {attr.noDataMsg ?? "No data found."}
                      </Page.Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              {Object.keys(columnTotals).length > 0 && (
                <TableFooter>
                  <TableRow>
                    {attr.rowLockable && (
                      <TableCell
                        sx={{
                          width: "20px",
                          position: "sticky",
                          bottom: 0,
                          zIndex: 3,
                          backgroundColor: "#f0f0f0",
                        }}
                      />
                    )}
                    {attr.rowSelectable && (
                      <TableCell
                        sx={{
                          width: "35.5px !important",
                          maxWidth: "35.5px !important",
                          p: "0 !important",
                          position: "sticky",
                          bottom: 0,
                          zIndex: 3,
                          backgroundColor: "#f0f0f0",
                        }}
                      />
                    )}
                    {columns.map(
                      (cell) =>
                        columnVisibility[cell.id] && (
                          <TableCell
                            key={cell.id}
                            align={cell.align || "start"}
                            sx={{
                              whiteSpace: "nowrap",
                              textAlign: cell.align || "start",
                              p: "0 !important",
                              m: "0 !important",
                              height: "32px",
                              fontSize: "13px",
                              fontWeight: "bold",
                              minWidth: "100px",
                              width: cell.width || "150px",
                              px: "8px !important",
                              position: "sticky",
                              bottom: 0,
                              zIndex: 3,
                              backgroundColor: "#f0f0f0",
                              ...(lockedColumns[cell.id] && {
                                position: "sticky",
                                left: `${getLockedColumnOffset(cell.id)}px`,
                                boxShadow: "2px 0 5px -2px rgba(0, 0, 0, 0.3)",
                                zIndex: 4,
                              }),
                            }}
                          >
                            {cell?.feature?.includes("total")
                              ? cell.total
                                ? cell.total(columnTotals[cell.id] || "0.00")
                                : columnTotals[cell.id] || "0.00"
                              : cell.id === columns[0].id
                              ? "Total"
                              : ""}
                          </TableCell>
                        )
                    )}
                  </TableRow>
                </TableFooter>
              )}
            </Table>
          </TableContainer>

          {!hidePagination && (
            <Box
              sx={{
                bgcolor: "white",
                position: "sticky",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
                bottom: 0,
                width: "100%",
                zIndex: 3,
                p: 0.5,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <TablePagination
                rowsPerPageOptions={attr.pagination}
                component="div"
                count={filteredRows.length}
                rowsPerPage={pageSize}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                showFirstButton={true}
                showLastButton={true}
                ActionsComponent={(attr) => (
                  <PaginationButtons
                    {...attr}
                    onPageChange={handleChangePage}
                  />
                )}
                labelDisplayedRows={({ from, to, count, page }) =>
                  `Showing ${from} - ${to} of ${count}`
                }
                slotProps={{
                  select: {
                    MenuProps: {
                      PaperProps: {
                        sx: {
                          "& .MuiMenuItem-root": {
                            fontSize: "13px",
                          },
                          zIndex: 4000,
                        },
                      },
                      MenuListProps: {
                        sx: {
                          zIndex: 4000,
                        },
                      },
                      disablePortal: true,
                    },
                  },
                }}
                sx={{
                  height: "auto",
                  p: 0,
                  m: 0,

                  "& .MuiTablePagination-toolbar": {
                    minHeight: "30px",
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  },
                  "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                    {
                      margin: 0,
                      padding: 0,
                      fontSize: "13px !important",
                    },
                  "& .MuiTablePagination-select": {
                    fontSize: "13px !important",
                  },
                  "& .MuiInputBase-root": {
                    fontSize: "13px !important",
                  },
                  "& .MuiTablePagination-actions": {
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "4px",
                    margin: 0,
                  },
                }}
              />
            </Box>
          )}

          {attr?.progress?.isVisible === true && (
            <>
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(2px)",
                  zIndex: 9,
                }}
              />
              <ShowProgress
                shape="circle"
                status={Math.round(
                  (attr.progress.current / selected.length) * 100
                )}
              />
            </>
          )}
        </Box>
      </Box>
      {attr?.withSelected}
    </Box>
  );
}
export function ShowProgress({ shape = "circle", status: currentValue = 0 }) {
  return (
    <Page.Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "inline-flex",
        zIndex: 10,
      }}
    >
      <CircularProgress
        variant="determinate"
        value={currentValue}
        size={50}
        thickness={3}
      />
      <Page.Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Page.Text
          sx={{
            fontSize: "12px",
          }}
        >{`${currentValue}%`}</Page.Text>
      </Page.Box>
    </Page.Box>
  );
}
