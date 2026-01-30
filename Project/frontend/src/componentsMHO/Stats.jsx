"use client";
import { Grid, Typography } from "@mui/material";
import Counter from "./Counter";

const stats = [
  { label: "Registered Panellist", value: 1233332 },
  { label: "Incentives this Month", value: 3221333, prefix: "$" },
  { label: "Monthly Surveys", value: 142233 },
  { label: "Completed Surveys", value: 323212 },
];

function Stats() {
  return (
    <Grid
      size={12}
      container
      justifyContent="center"
      alignItems="center"
      py={{ xs: 8, lg: 12 }}
      px={{ xs: 0, lg: 12 }}
    >
      <Grid
        size={11}
        container
        spacing={3}
        p={{ xs: 3, lg: 6 }}
        sx={{
          bgcolor: "white",
          borderRadius: "45px",
          boxShadow: "rgba(149, 157, 165, .2) 0 8px 24px",
        }}
        justifyContent="center"
      >
        {stats.map((stat, index) => {
          return (
            <Grid
              container
              size={{ xs: 12, md: 6, lg: 3 }}
              key={index}
              direction="column"
              alignItems="center"
              justifyContent="center"
              spacing={1}
              sx={{
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: 30, lg: 34 },

                  fontWeight: 700,
                  background: "var(--bg-primary-gradient)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                  display: "inline-block",
                }}
              >
                <Counter value={stat.value} prefix={stat?.prefix} />
              </Typography>
              <Typography sx={{ fontSize: { xs: "15px", xl: "18px" } }}>
                {stat?.label}
              </Typography>
            </Grid>
          );
        })}
      </Grid>{" "}
    </Grid>
  );
}

export default Stats;
