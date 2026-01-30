"use client"
import React from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";
function WhoWeAre() {
  const router = useRouter();
  return (
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
            width={240}
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
            background: "var(--bg-primary-gradient)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            display: "inline-block",
          }}
        >
          Who We Are
        </Typography>
        <Typography fontSize={16} my={2} color="#555" textAlign={"justify"}>
          We offer you no limit of earning surveys that need answering for
          brands, governments, agencies and institutions and you get paid for
          contributing to these surveys and polls. We reward our members with a
          choice of cash via Paypal or gift vouchers, including Amazon and other
          vouchers .{" "}
        </Typography>
        <Typography fontSize={16} color="#555" mb={2} textAlign={"justify"}>
          Our surveys campaigns are interesting short in length , fun to do and
          can be taken on mobile as well as on other devices on the move, or at
          home on your desktop. We give maximum offers in a day to earn you
          hassle free income.
        </Typography>

        <Button
          variant="contained"
          onClick={() => {
            router.push("/whoweare");
          }}
          sx={{
            height: { xs: 38, lg: 42, xl: 52 },
            width: 154,
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
          Read More
        </Button>
      </Grid>
    </Grid>
  );
}

export default WhoWeAre;
