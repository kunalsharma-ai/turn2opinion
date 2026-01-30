"use client";
import React from "react";
import { Datatable } from "@/components";

import { Box, Grid, Typography } from "@mui/material";
import { DateRangeSelector } from "@/components/Form";
import { useMember, useQuery } from "@/Context";
import { api, Page } from "@/util";
export default function () {
  const [user, query] = [useMember(), useQuery()];
  
  return (
    <>
      <AvailableSurvey user={user} query={query} />
      <MySurveys user={user} query={query} />
    </>
  );
}

function MySurveys({ user, query }) {
  const [dateRange, setDateRange] = React.useState([]);
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    let filter = { dateRange };
    if (!user || !user.category) return;
    if (query && "source" in query) filter.source = query.source;
    api.post(`/api/v1/me/survey`, filter).then((resp) => {
      if ("data" in resp) setData(resp.data);
    });
  }, [user, query, dateRange]);
  const columns = [
    { id: "name", label: "Survey", data: "name", width: 260 },
    {
      id: "loi",
      label: "Approximate duration (minutes)",
      data: "loi",
      width: 260,
    },
    { id: "points", label: "Survey Points", data: "points", width: 130 },
    {
      id: "source",
      label: "Survey Type",
      render: (info) =>
        ({
          internal: "Your Survey",
          external: "External Survey",
          sampledge: "Daily Survey",
        }[info.source]),
    },
    {
      id: "createdAt",
      label: "Started On",
      render: (info) => new Date(info.createdAt).showDate(),
      width: 130,
    },
    {
      id: "status",
      label: "Survey Status",
      width: 130,
      render: (info) =>
        info.status === "active" && info.participationStatus === "" ? (
          <Page.Link
            sx={{ color: "secondary.main", fontWeight: 600 }}
            href={`/survey?name=${info.slug}`}
          >
            Open
          </Page.Link>
        ) : info.participationStatus === "" ? (
          info.status
        ) : (
          info.participationStatus
        ),
    },
  ];

  return (
    <Grid size={12} px={{ xs: 2, md: 3 }} mt={2} spacing={0}>
      <Datatable
        isLoading={false}
        pagination={[10, 20, 50, 100]}
        pageSize={20}
        data={data}
        hideColumnSelector
        noDataMsg="No Survey Available."
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
            My Survey
          </Typography>
        }
        columns={columns}
      />
    </Grid>
  );
}

function AvailableSurvey({ user, query }) {
  const [dateRange, setDateRange] = React.useState([]);
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    let filter = { status: "active" };
    if (!user || !user.category) return;
    if (query && "source" in query) filter.source = query.source;
    api.post(`/api/v1/me/survey`, filter).then((resp) => {
      if ("data" in resp) setData(resp.data);
    });
  }, [user, query, dateRange]);
  const columns = [
    { id: "name", label: "Survey", data: "name", width: 260 },
    {
      id: "loi",
      label: "Approximate duration (minutes)",
      data: "loi",
      width: 260,
    },
    { id: "points", label: "Survey Points", data: "points", width: 130 },
    {
      id: "source",
      label: "Survey Type",
      render: (info) =>
        ({
          internal: "Your Survey",
          external: "External Survey",
          sampledge: "Daily Survey",
        }[info.source]),
    },
    {
      id: "createdAt",
      label: "Started On",
      render: (info) => new Date(info.createdAt).showDate(),
      width: 130,
    },
    {
      id: "status",
      label: "Survey Status",
      render: (info) => info.status,
      width: 130,
    },
    {
      id: "participate",
      label: "",
      render: (info) =>
        info.status === "active" &&
        (info.participationStatus === "" ||
          (info.source === "internal" &&
            ["", "dropout"].includes(info.participationStatus))) ? (
          <Page.Link
            sx={{ color: "secondary.main", fontWeight: 600 }}
            href={`/survey?name=${info.slug}`}
          >
            Participate
          </Page.Link>
        ) : (
          <>{info.participationStatus}</>
        ),
    },
  ];
  if (data.length === 0) return <></>;
  return (
    <Grid size={12} px={{ xs: 2, md: 3 }} mt={2} spacing={0}>
      <Datatable
        isLoading={false}
        pagination={[10, 20, 50, 100]}
        pageSize={20}
        data={data}
        hideColumnSelector
        noDataMsg="No Survey available."
        title={
          <Typography
            sx={{
              fontSize: "16px",
              display: "inline-block",
              fontWeight: "600",
              borderBottom: "2px solid #59AC77",
              pb: 0.5,
              my: 1,
            }}
          >
            Available Surveys
          </Typography>
        }
        columns={columns}
      />
    </Grid>
  );
}
