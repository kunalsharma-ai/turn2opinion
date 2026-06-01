"use client";

import * as React from "react";

import {
  Box,
  Card,
  CircularProgress,
  Skeleton,
  TablePagination,
  Toolbar,
  Typography,
} from "@mui/material";

import PaginationButtons from "./PaginationButtons";

export default function DataCards({
  data = [],
  title,
  card,
  filter,
  hideToolbar = false,
  hidePagination = false,
  pageSize: defaultPageSize = 10,
  isLoading = false,
  disabled = false,
  emptyMessage = "No data found.",
  getSearchText,
  renderToolbar,
  toolbarActions,
  pagination = [1, 5, 10, 25, 50],
  cardProps = {},
}) {
  const rawdata =
    [null, undefined].indexOf(filter?.filter) === -1
      ? data.filter(filter.filter)
      : data;
  const [page, setPage] = React.useState(0);

  const [pageSize, setPageSize] = React.useState(defaultPageSize);

  const [search, setSearch] = React.useState("");

  const filteredRows = React.useMemo(() => {
    if (!search?.trim()) return rawdata;

    return rawdata.filter((row) => {
      if (!getSearchText) {
        return JSON.stringify(row).toLowerCase().includes(search.toLowerCase());
      }

      return getSearchText(row)?.toLowerCase()?.includes(search.toLowerCase());
    });
  }, [rawdata, search, getSearchText]);

  const visibleRows = React.useMemo(() => {
    if (hidePagination) return filteredRows;

    return filteredRows.slice(page * pageSize, page * pageSize + pageSize);
  }, [filteredRows, page, pageSize, hidePagination]);

  return (
    <Box sx={{ width: "100%" }}>
      {!hideToolbar && (
        <Toolbar
          sx={{
            px: "0 !important",
            py: 1,
            minHeight: "52px !important",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
                flex: 1,
              }}
            >
              {typeof title === "string" ? (
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  {title}
                </Typography>
              ) : (
                title
              )}

              {renderToolbar?.()}
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  height: "34px",
                  borderRadius: "8px",
                  border: "1px solid rgba(0,0,0,0.2)",
                  padding: "0 12px",
                  outline: "none",
                  minWidth: "220px",
                }}
              />

              {toolbarActions}
            </Box>
          </Box>
        </Toolbar>
      )}

      <Box sx={{ position: "relative" }}>
        {isLoading && (
          <>
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                bgcolor: "rgba(255,255,255,0.6)",
                zIndex: 5,
              }}
            />

            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 6,
              }}
            >
              <CircularProgress />
            </Box>
          </>
        )}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(auto-fill, minmax(300px, 1fr))",
              md: "repeat(auto-fill, minmax(320px, 1fr))",
            },
            gap: 2,
            filter: disabled ? "grayscale(1)" : "",
          }}
        >
          {isLoading
            ? [...Array(8)].map((_, i) => (
                <Card
                  key={i}
                  sx={{
                    borderRadius: "12px",
                    p: 2,
                  }}
                >
                  <Skeleton height={40} />
                  <Skeleton height={20} />
                  <Skeleton height={20} />
                  <Skeleton height={20} />
                </Card>
              ))
            : visibleRows.map((row, index) => (
                <Card
                  key={row.id || `card-${index}`}
                  elevation={2}
                  {...cardProps}
                  sx={{
                    borderRadius: "8px",
                    overflow: "hidden",
                    transition: "all 0.2s ease",
                    // border: "1px solid rgba(0,0,0,0.01)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      // boxShadow: 4,
                    },
                    ...cardProps?.sx,
                  }}
                >
                  {card(row)}
                </Card>
              ))}
        </Box>

        {/* {!isLoading && visibleRows.length === 0 && (
          <Box
            sx={{
              height: "300px",
              border: "1px dashed rgba(0,0,0,0.2)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "background.paper",
            }}
          >
            <Typography color="text.secondary">{emptyMessage}</Typography>
          </Box>
        )} */}

        {!isLoading && visibleRows.length === 0 && (
          <Box
            sx={{
              minHeight: { xs: 180, md: 360 },
              border: "1px solid rgba(0,0,0,0.06)",
              borderRadius: "20px",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "relative",
                zIndex: 2,
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                src="/images/empty-state.png"
                alt="No data found"
                sx={{
                  transform:"scale(0.8)",
                  width: "100%",
                  maxWidth: 720,
                  objectFit: "contain",
                  userSelect: "none",
                  pointerEvents: "none",
                  // filter: "drop-shadow(0 12px 30px rgba(0,0,0,0.08))",
                }}
              />
            </Box>
          </Box>
        )}
      </Box>

      {!hidePagination && (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "flex-end",
            bgcolor: "white",
            borderRadius: "8px",
            p: 1,
          }}
        >
          <TablePagination
            component="div"
            count={filteredRows.length}
            rowsPerPage={pageSize}
            page={page}
            labelRowsPerPage="Cards per page"
            rowsPerPageOptions={pagination}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setPageSize(parseInt(e.target.value, 10));

              setPage(0);
            }}
            showFirstButton
            showLastButton
            ActionsComponent={(props) => <PaginationButtons {...props} />}
            labelDisplayedRows={({ from, to, count }) =>
              `Showing ${from} - ${to} of ${count}`
            }
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
    </Box>
  );
}
