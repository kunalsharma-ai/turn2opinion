"use client";
import React from "react";

import { Box, Grid, Typography } from "@mui/material";
import { useMember } from "@/Context";
import { Datatable } from "@/components";
import { DateRangeSelector } from "@/components/Form";

import { api, Page } from "@/util";

export default function page() {
  const [user] = [useMember()];
  const [data, setData] = React.useState([]);
  const [dateRange, setDateRange] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        let filters = {};

        if (Array.isArray(dateRange) && dateRange.length === 2) {
          filters.dateRange = dateRange;
        }

        const resp = await api.post(`/api/v1/response`, filters);
        setData(resp.data);
      } catch (error) {
        console.error("Failed to fetch responses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, dateRange]);

  const columns = [
    {
      id: "surveyname",
      label: "Survey Name",
      render: (info) => info?.survey?.name,
      feature: ["searchable", "sortable", "lockable"],
    },
    {
      id: "start time",
      label: "Start time",
      render: (info) => new Date(info.timeline.start).toLocaleString(),
      feature: ["sortable", "lockable"],
    },
    {
      id: "loi",
      label: "Length of Interview",
      width: 220,
      render: (info) =>
        (new Date(info.updatedAt) - new Date(info.timeline.start))?.toTime(),
      feature: ["sortable", "lockable"],
    },
    {
      id: "status",
      label: "Status",
      render: (info) =>
        info.source === "internal" && info.status === "dropout" ? (
          <Page.Link href={`/survey?name=${info.survey.slug}`}>
            Continue
          </Page.Link>
        ) : (
          <Page.Text
            sx={{
              fontSize: 13,
              textTransform: "capitalize",
              color: info.status === "dropout" ? "red" : "black",
            }}
          >
            {info.status}
          </Page.Text>
        ),
      feature: ["filterable", "sortable", "lockable"],
    },
    {
      id: "rewards",
      label: "Rewards",
      render: (info) => (
        <span>{info.status === "complete" ? info.points : 0} Points</span>
      ),
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
            borderBottom:(theme)=> `2px solid ${theme.palette.primary.main}`,
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
