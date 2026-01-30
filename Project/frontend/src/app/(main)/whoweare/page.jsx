"use client";
import React from "react";
import { Grid, Box, Container, Typography } from "@mui/material";
import SubHeader from "@/componentsMHO/SubHeader";
function page() {
  return (
    <Box className="scroll-target">
      <SubHeader title="Who We Are" pageName="Who We Are" />
      <Grid
        size={12}
        container
        bgcolor="white"
        sx={{ p: { xs: "50px 0", lg: "50px 20px" } }}
      >
        <Container maxWidth="xl">
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
              component={"span"}
              sx={{
                fontSize: { xs: 20, lg: 28 },
                fontWeight: "bold",
                background: (theme) => theme.gradients.bgprimary.main,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                display: "inline-block",
                textAlign: "center",
              }}
            >
              Welcomes you as our new panel members to take participate and
              share your opinion and perspective to wide-ranging market research
              survey campaigns.
            </Typography>
            <Typography
              fontSize={16}
              color="#777"
              textAlign={{ xs: "justify", md: "center" }}
            >
              Turn2Opinion is a world wide Consumer and Business Community of
              Frequent Research. Turn2Opinion welcomes you as our new panel
              members to take participate and share your opinion and perspective
              to wide-ranging market research survey campaigns.
            </Typography>
            <Typography
              fontSize={16}
              color="#777"
              textAlign={{ xs: "justify", md: "center" }}
            >
              It is a platform which helps you to generate more and more
              revenues in high incentive rewards. You get the studies that are
              best fit for you. The more participation you do in the surveys,
              You will be able to earn more and more money.
            </Typography>{" "}
            <Typography
              fontSize={16}
              color="#777"
              textAlign={{ xs: "justify", md: "center" }}
            >
              We offer you no limit of earning surveys that need answering for
              brands, governments, agencies and institutions and you get paid
              for contributing to these surveys and polls. We reward our members
              with a choice of cash via Paypal or gift vouchers, including
              Amazon and other vouchers .
            </Typography>
          </Grid>
        </Container>{" "}
      </Grid>
      <Grid
        size={12}
        container
        sx={{ minHeight: "100vh" }}
        spacing={3}
        p={{ xs: 2, lg: 5 }}
      >
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ position: "relative" }}
          container
          alignItems={"center"}
          justifyContent={{ xs: "center", lg: "flex-start" }}
        >
          <Box
            component={"img"}
            src="/imagest2o/who1.png"
            alt="who we are icon"
            height={{ xs: 241, md: "auto", xl: 900 }}
            width={{ xs: 241, md: "100%", xl: 900 }}
            maxWidth={"100%"}
          />
          <Box sx={{ display: { xs: "none", lg: "block" } }}>
            <img
              src="/imagest2o/who2.png"
              alt="who we are icon"
              height={230}
              width={221}
              style={{ position: "absolute", bottom: 80, left: 30 }}
            />{" "}
            <img
              src="/imagest2o/who3.png"
              alt="who we are icon"
              height={230}
              width={215.3}
              style={{ position: "absolute", top: 0, right: 20 }}
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} spacing={0} container direction="column">
          <img
            src="/imagest2o/who-icon.png"
            alt="who we are icon"
            height={80}
            width={80}
          />
          <Typography
            sx={{
              mt: { xs: 0, lg: 4 },
              fontSize: { xs: 24, lg: 28 },

              fontWeight: "bold",
              background: (theme) => theme.gradients.bgprimary.main,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              display: "inline-block",
            }}
          >
            You Collaborate, We Share
          </Typography>
          <Typography fontSize={16} my={2} color="#777" textAlign={"justify"}>
            Our surveys campaigns are interesting short in length , fun to do
            and can be taken on mobile as well as on other devices on the move,
            or at home on your desktop. We give maximum offers in a day to earn
            you hassle free income.
          </Typography>
          <Typography fontSize={16} mb={2} color="#777" textAlign={"justify"}>
            We have a very unique and fast earning site with a fairly low
            pay-out threshold of $15.
          </Typography>
          <Typography fontSize={16} mb={2} color="#777" textAlign={"justify"}>
            You do not have to spend much time on being a member, as you will
            receive an email invitation, when there is a new survey available.
            So you do not have to login to the site to check yourself every
            time. It might however take you some time to reach. You can get paid
            in cash through PayPal or choose to get paid in gift cards.
          </Typography>
          <Typography fontSize={16} color="#777" textAlign={"justify"}>
            Turn2Opinion users make money by taking paid surveys about all
            different topics. Your input helps corporate business better serve
            consumers like you! Just Think: Businesses those need your opinions
            so that they can make products & services you’ll prefer more, and
            Companies are going to pay you. So, Turn2Opinion is the one stop
            solutions to earn extra income.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default page;
