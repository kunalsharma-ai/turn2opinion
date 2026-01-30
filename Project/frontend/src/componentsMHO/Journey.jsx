"use client";
import React from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

function Journey() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const steps = [
    "Create a free account via your active E-mail ID & valid Contact Number.",
    "You will receive a verification link to verify your email and contact number with OTP.",
    "After verify you will be able to access the available surveys.",
    "To earn more rewards and to have access maximum surveys per week you need to complete all your Profiles Particulars.",
    "As soon as you complete your profiles you would be able to achieve your threshold amount to claim.",
    "Once you achieve your threshold you will be able to claim your rewards money via Paypal, Gift-vouchers, or it can be directly transfers to your account as per request and availability.",
  ];
  return (
    <Grid size={12} container px={{ xs: 0, lg: 6 }} pt={6}>
      <Grid
        size={{ xs: 12, lg: 8 }}
        order={{ xs: 2, lg: 1 }}
        container
        direction="column"
        spacing={0}
        pl={2}
      >
        <Box
          component={"img"}
          src="imagest2o/journey-icon.png"
          alt="journey-icon"
          height={80}
          width={80}
          sx={{ ml: { xs: 0, lg: "20px" } }}
        />
        <Typography
          sx={{
            mt: 1,
            ml: { xs: 0, lg: 2 },
            fontSize: { xs: 24, lg: 28 },
            fontWeight: "bold",
            background: "var(--bg-primary-gradient)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            display: "inline-block",
          }}
        >
          Journey From Free Joining To Rewards Claiming
        </Typography>
        <Box
          component="ul"
          sx={{
            listStyle: "none",
            p: 0,
            mt: 2,
            ml: { xs: 0, lg: 2 },
            color: "#555",
            fontSize: 16,
          }}
        >
          {steps.map((text, index) => (
            <Box
              component="li"
              key={index}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
                mb: 1.5,
              }}
            >
              <TaskAltIcon
                fontSize="small"
                color="primary"
                sx={{ mt: "4px" }}
              />
              <Typography sx={{ fontSize: 16, color: "#555", pr: 0.3 }}>
                {text}
              </Typography>
            </Box>
          ))}
        </Box>
        <Grid
          size={12}
          container
          justifyContent={{ xs: "center", md: "flex-start" }}
        >
          <Button
            variant="contained"
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("signup", "1");

              router.replace(`${pathname}?${params.toString()}`, {
                scroll: false,
              });
            }}
            sx={{
              height: { xs: 38, lg: 42, xl: 52 },
              mt: 2,
              background: "var(--bg-primary-gradient)",
              color: "white",
              borderRadius: 20,
              fontSize: { xs: "1rem", md: "1.1rem" },
              fontWeight: 700,
              padding: "15px 30px",
              "&:hover": {
                background: "var(--bg-secondary-gradient)",
              },
            }}
          >
            I WANT TO JOIN
          </Button>
        </Grid>
      </Grid>
      <Grid
        size={{ xs: 12, lg: 4 }}
        order={{ xs: 1, lg: 2 }}
        container
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          component="img"
          src="imagest2o/journey.png"
          alt="journey"
          height={"auto"}
          width={"100%"}
          sx={{ aspectRatio: "1/1" }}
          maxWidth={500}
        />
      </Grid>
    </Grid>
  );
}

export default Journey;
