"use client";
import React from "react";
import { api, Page } from "@/util";
import { Grid } from "@mui/material";

function StatsCard({ label, value, onClick }) {
  return (
    <Page.MuiButton
      variant="contained"
      // disabled={!onClick}
      onClick={() => onClick(label)}
      sx={{
        width: "100%",
        height: "74px",
        borderRadius: "10px",
        background: "#06923E",
        color: "white",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
        "&:disabled": {
          background: "#06923E",
          color: "white",
        },
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
        },
      }}
    >
      <Grid>
        <Page.Text sx={{ fontSize: "14px" }}>{label}</Page.Text>
        <Page.Text sx={{ fontSize: "22px", fontWeight: "bold" }}>
          {value}
        </Page.Text>
      </Grid>
    </Page.MuiButton>
  );
}
export default function SurveyStatsCards({ survey, onClick }) {
  const [projectStatistics, setProjectStatistics] = React.useState({
    clicks: 0,
    completes: 0,
    terminates: 0,
    overquotas: 0,
    dropouts: 0,
    ir: 0,
    speeders: 0,
    avgLoi: 0,
  });

  const completes =
    survey?.markets?.reduce((a, c) => {
      a += Number(c.completes);
      return a;
    }, 0) ?? 0;
  const statistics = [
    {
      label: "Qualified",
      value: survey?.qualified ?? 0,
    },
    {
      label: "Invited",
      value: survey?.invited ?? 0,
    },
    {
      label: "Pending",
      value: survey?.pending ?? 0,
    },
    {
      label: "Clicks",
      value: survey?.clicks ?? 0,
    },
    {
      label: "Completes",
      value: survey?.completes ?? 0,
    },
    {
      label: "Disqualified",
      value: survey?.disqualified ?? 0,
    },
    {
      label: "Overquota",
      value: survey?.overquota ?? 0,
    },
    {
      label: "Dropout",
      value: survey?.dropout ?? 0,
    },
    {
      label: "LOI",
      value: survey?.loi ?? 0,
    },
    {
      label: "IR",
      value: survey?.ir ?? 0,
    },
  ];
  return (
    <Page.Box
      display="grid"
      gridTemplateColumns={{
        xs: "1fr",
        md: "repeat(3, 1fr)",
        lg: "repeat(5, 1fr)",
      }}
      gap={2}
      sx={{
        p: 2,
        bgcolor: "white",
        boxShadow: 2,
        borderRadius: "10px",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 1,
      }}
    >
      {statistics.map(({ label, value }, index) => (
        <Grid size={12} container key={index}>
          <StatsCard
            key={label}
            label={label}
            value={value}
            onClick={onClick}
          />
        </Grid>
      ))}
    </Page.Box>
  );
}
