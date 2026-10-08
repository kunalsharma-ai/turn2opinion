"use client";
import React from "react";

import { Box, Grid, Typography } from "@mui/material";
import { useMember } from "@/Context";
import { Datatable } from "@/components";
import { DateRangeSelector } from "@/components/Form";

import { api, loadData, Page } from "@/util";

export default function page() {
  const [user] = [useMember()];
  const [data, setData] = React.useState([]);
  const [dateRange, setDateRange] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);


  React.useEffect(() => {
    if (!user) return;
    setIsLoading(true);
    let filters = {
      status: {
        $nin: ["invited"]
      }
    };

    if (Array.isArray(dateRange) && dateRange.length === 2) {
      filters.dateRange = dateRange;
    }

    loadData(
      api.post(`/api/v1/response`, filters),
      resp => {
        setData(resp.data)
      },
      () => {
        setIsLoading(false)
      }
    )

  }, [user, dateRange]);

  const renderStatusBadge = (status, source, slug) => {
    if (source === "internal" && status === "dropout") {
      return (
        <Page.Link
          href={`/survey?name=${slug}`}
          sx={{
            display: "inline-block",
            textDecoration: "none",
            bgcolor: "primary.main",
            color: "#fff !important",
            px: 2,
            py: 0.4,
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "600",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(12, 90, 219, 0.2)",
            transition: "all 0.25s ease",
            "&:hover": {
              textDecoration: "none",
              transform: "translateY(-1px)",
              boxShadow: "0 4px 12px rgba(12, 90, 219, 0.4)",
              bgcolor: "secondary.main",
            },
          }}
        >
          Continue
        </Page.Link>
      );
    }

    const config = {
      complete: { bg: "#e6f4ea", color: "#137333", border: "rgba(19, 115, 51, 0.15)" },
      terminate: { bg: "#fce8e6", color: "#c5221f", border: "rgba(197, 34, 31, 0.15)" },
      overquota: { bg: "#fef7e0", color: "#b06000", border: "rgba(176, 96, 0, 0.15)" },
      dropout: { bg: "#f3f4f6", color: "#4b5563", border: "rgba(75, 85, 99, 0.15)" },
    };

    const style = config[status] || {
      bg: "#f3f4f6",
      color: "#4b5563",
      border: "rgba(75, 85, 99, 0.15)",
    };

    return (
      <Box
        sx={{
          display: "inline-block",
          bgcolor: style.bg,
          color: style.color,
          border: `1px solid ${style.border}`,
          borderRadius: "20px",
          px: 1.8,
          py: 0.4,
          fontSize: "12px",
          fontWeight: "600",
          textTransform: "capitalize",
          textAlign: "center",
        }}
      >
        {status}
      </Box>
    );
  };

  const columns = [
    {
      id: "surveyname",
      label: "Survey Name",
      width: 300,
      render: (info) => (
        <Typography
          sx={{
            fontWeight: "600",
            color: "primary.main",
            fontSize: "14px",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            maxWidth: 280,
          }}
        >
          {info?.survey?.name}
        </Typography>
      ),
      feature: ["searchable", "sortable", "lockable"],
    },
    {
      id: "start time",
      label: "Start time",
      render: (info) => {
        if (["complete", "terminate", "overquota"].includes(info.status))
          return (
            <Typography sx={{ color: "text.secondary", fontSize: "13px" }}>
              {new Date(info.timeline.start).toLocaleString()}
            </Typography>
          );
        return "";
      },
      feature: ["sortable", "lockable"],
    },
    {
      id: "loi",
      label: "Length of Interview",
      width: 220,
      render: (info) => {
        if (["complete", "terminate", "overquota"].includes(info.status)) {
          const loi = (
            new Date(info.updatedAt) - new Date(info.timeline.start)
          )?.toTime();
          return (
            <Typography sx={{ color: "text.secondary", fontSize: "13px" }}>
              {loi}
            </Typography>
          );
        }
        return "";
      },
      feature: ["sortable", "lockable"],
    },
    {
      id: "status",
      label: "Status",
      render: (info) =>
        renderStatusBadge(info.status, info.source, info.survey?.slug),
      feature: ["filterable", "sortable", "lockable"],
    },
    {
      id: "rewards",
      label: "Rewards",
      render: (info) => {
        const isComplete = info.status === "complete";
        return (
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: isComplete ? "#d97706" : "text.disabled",
              }}
            />
            <Typography
              sx={{
                fontWeight: isComplete ? "700" : "500",
                color: isComplete ? "#d97706" : "text.secondary",
                fontSize: "13px",
              }}
            >
              {isComplete ? `${info.points} Points` : "0 Points"}
            </Typography>
          </Box>
        );
      },
    },
  ];
  return (
    <Grid
      size={12}
      px={{ xs: 2, md: 3 }}
      py={2}
      justifyContent="center"
      sx={{ border: `1px solid #e0e0e0` }}
    >
      <Datatable
        isLoading={isLoading}
        pagination={[10, 20, 50, 100]}
        pageSize={20}
        noDataMsg="No Record Found."
        data={data}
        hideColumnSelector
        extra={
          <Box px={{ xs: 0, md: 2 }} my={{ xs: 1, md: 0 }}>
            <DateRangeSelector
              onUpdate={(e) => {
                setDateRange(
                  e.map((d) => new Date(d.toDate()).toISOString().split("T")[0])
                );
              }}
            />
          </Box>
        }
        title={
          <Typography
            sx={{
              fontSize: "16px",
              display: "inline-block",
              fontWeight: "600",
              borderBottom: (theme) => `2px solid ${theme.palette.primary.main}`,
              pb: 0.5,
              my: 1,
            }}
          >
            Rewards History
          </Typography>
        }
        columns={columns}
      />
    </Grid>
  );
}
