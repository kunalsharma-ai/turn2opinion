"use client";
import React from "react";
import { Button, Grid, Typography, Box } from "@mui/material";

function JoinPanel({ setOpenSignUp }) {
  return (
    <Grid
      size={12}
      container
      spacing={{ xs: 0, lg: 3 }}
      alignItems="center"
      sx={{
        textAlign: "center",
        bgcolor: "white",
        minHeight: "200px",
        p: { xs: "50px 0", lg: "50px 30px" },
        bgcolor: "#f8f8f8",
      }}
    >
      <Grid
        size={{ xs: 12, md: 3 }}
        px={2}
        container
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          component={"img"}
          src={"/imagest2o/thumb.png"}
          height={{ xs: 80, lg: 278 }}
          width={{ xs: 80, lg: 278 }}
          alt="thumbs up"
        />
      </Grid>
      <Grid
        size={{ xs: 12, md: 9 }}
        justifyContent="center"
        alignItems="center"
        container
        spacing={2}
        py={{ xs: 2, lg: 8 }}
        px={{ xs: 1, lg: 0 }}
      >
        <Box pr={1}>
          <Typography
            sx={{
              fontSize: { xs: "22px", lg: "36px" },
              fontWeight: "bold",
              background: "var(--bg-primary-gradient)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              display: "inline-block",
            }}
          >
            Get Paid to take Survey Online.
          </Typography>
          <Typography sx={{ fontSize: "16px", mt: { xs: 2, lg: 0 } }}>
            Be our community member and get rewarded with points and credit your
            paypal account after your loyal inputs.
          </Typography>
        </Box>
        <Button
          onClick={() => {
            setOpenSignUp(true);
          }}
          variant="contained"
          sx={{
            bgcolor: "black",
            color: "white",
            borderRadius: 20,
            background: "var(--bg-primary-gradient)",
            fontWeight: "bold",
            height: { xs: 38, lg: 42, xl: 52 },
            px: 4,
            boxShadow: 5,
            fontSize: "16px",
            "&:hover": {
              background: "var(--bg-secondary-gradient)",
            },
          }}
        >
          JOIN NOW
        </Button>
      </Grid>
    </Grid>
  );
}

export default JoinPanel;
