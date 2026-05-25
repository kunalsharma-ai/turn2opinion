"use client";
import React from "react";
import { Grid, Container, Typography, Box, Button } from "@mui/material";

function HowItWorks({ setOpenSignUp }) {
  const cardData = [
    {
      img: "step1",
      title: "Sign Up For Free",
      subtitle: "Register with your Active email id and contact number.",
    },
    {
      img: "step2",
      title: "Participate In Surveys",
      subtitle: "Register with your Active email id and contact number.",
    },
    {
      img: "step3",
      title: "Get Rewards",
      subtitle: "Acheive your threshold to claim the rewards via paypal",
    },
  ];
  return (
    <Grid
      size={12}
      sx={{
        bgcolor: "white",
        padding: { xs: "50px 0", lg: "50px 30px" },
        height: { xs: "auto", lg: 650 },
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          size={12}
          container
          direction="column"
          alignItems="center"
          spacing={2}
        >
          <img
            src="/imagest2o/icon-review.png"
            alt="review icon"
            height={80}
            width={80}
          />
          <Typography
            sx={{
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
            See How It Works In 3 Simple Steps
          </Typography>
          <Typography fontSize={16} color="#555" textAlign="center">
            Turn2Opinion research panel community provides a very simple and
            easy way to engage you as our new community member. You just need to
            follow a few small steps to be a part of our global community to
            earn rewards with free registration.
          </Typography>
        </Grid>
      </Container>
      <Grid size={12} container mt={5} spacing={3}>
        {cardData.map((card, index) => {
          return (
            <Grid
              size={{ xs: 12, md: 4 }}
              container
              spacing={{ xs: 0, lg: 1 }}
              direction="column"
              alignItems={"center"}
              key={index}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: { xs: 90, lg: 120 },
                  width: { xs: 90, lg: 120 },
                  background: "var(--bg-primary-gradient)",
                  borderRadius: "50%",
                }}
              >
                <Box
                  component={"img"}
                  src={`/imagest2o/${card?.img}.png`}
                  alt={card?.img}
                  height={{ xs: 60, lg: 80 }}
                  width={{ xs: 60, lg: 80 }}
                />
              </Box>
              <Typography fontSize={22} fontWeight={700} mt={{ xs: 1, lg: 3 }}>
                {card?.title}
              </Typography>
              <Typography fontSize={15} color="#555">
                {card?.subtitle}
              </Typography>
            </Grid>
          );
        })}
      </Grid>

      <Grid size={12} container justifyContent={"center"} mt={4}>
        <Button
          variant="outlined"
          onClick={() => {
            setOpenSignUp(true);
          }}
          sx={{
            height: { xs: 38, lg: 42, xl: 52 },
            padding: "15px  30px",
            fontSize: { xs: "14px", lg: "16px" },
            borderRadius: 20,
            fontWeight: 700,
            color: "#fff",
            background: "var(--bg-primary-gradient)",
            transition: "all 0.3s  ease-in",
            border: "none",
            "&:hover": {
              background: "var(--bg-secondary-gradient)",
            },
          }}
        >
          I WANT TO REGISTER
        </Button>
      </Grid>
    </Grid>
  );
}

export default HowItWorks;
