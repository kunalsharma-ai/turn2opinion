"use client";
import React from "react";
import SubHeader from "@/componentsMHO/SubHeader";
import Testimonial from "@/componentsMHO/Testimonial";
import { Grid, Typography, Box } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

function page() {
  return (
    <div>
      <SubHeader title="About Us" pageName="About Us" />
      <AboutUs />
      <Testimonial />
    </div>
  );
}

export default page;

function AboutUs() {
  const steps = [
    "Create a free account via your active E-mail ID & valid Contact Number.",
    "You will receive a verification link to verify your email and contact number with OTP.",
    "After verify you will be able to access the available surveys.",
    "To earn more rewards and to have access maximum surveys per week you need to complete all your Profiles Particulars.",
    "As soon as you complete your profiles you would be able to achieve your threshold amount to claim.",
    "Once you achieve your threshold you will be able to claim your rewards money via Paypal, Gift-vouchers, or it can be directly transfers to your account as per request and availability.",
  ];
  return (
    <Grid
      size={12}
      container
      px={{ xs: 1, lg: 6 }}
      pt={6}
      sx={{ bgcolor: "white" }}
    >
      <Grid
        size={{ xs: 12, lg: 8 }}
        container
        order={{ xs: 2, lg: 1 }}
        direction="column"
        spacing={0}
        pl={{ xs: 0, lg: 4 }}
      >
        <img
          src="imagest2o/journey-icon.png"
          alt="journey-icon"
          height={80}
          width={80}
        />
        <Typography
          component={"div"}
          sx={{ fontSize: { xs: 24, lg: 28 }, fontWeight: "bold", my: 1, textAlign:{xs:'center',lg:"justify"} }}
        >
          We Started In 2015 & Currently Have More Than {" "}
          <Box
            component="span"
            sx={{
              fontSize: { xs: 24, lg: 28 },
              pl: { xs: 0, lg: 1 },
              fontWeight: "bold",
              textAlign:"center",
              background: (theme) => theme.gradients.bgprimary.main,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              display: "inline-block",
            }}
          >
            3 Million Members Worldwide
          </Box>
        </Typography>
        <Typography fontSize={16} mb={2} color="#777" textAlign="justify">
          Turn2Opinion is a world wide Consumer and Business Community of
          Frequent Research. Turn2Opinion welcomes you as our new panel members
          to take participate and share your opinion and perspective to
          wide-ranging market research survey campaigns.
        </Typography>
        <Typography fontSize={16} mb={2} color="#777" textAlign="justify">
          It is a platform which helps you to generate more and more revenues in
          high incentive rewards. You get the studies that are best fit for you.
          The more participation you do in the surveys, You will be able to earn
          more and more money.
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, lg: 4 }} order={{ xs: 1, lg: 2 }} container justifyContent={"center"} alignItems={"center"}>
        <Box
          component={"img"}
          src="imagest2o/journey.png"
          alt="journey"
          height={"auto"}
          width={"100%"}
          maxWidth={500}
        />
      </Grid>
    </Grid>
  );
}
