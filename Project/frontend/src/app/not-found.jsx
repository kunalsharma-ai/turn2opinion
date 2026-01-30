"use client";
import React from "react";
import { Grid, Typography, Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      size={12}
      sx={{
        textAlign: "center",
        minHeight: "100vh",
        background: "linear-gradient(90deg, #fff 0, #fff1d8 100%)",
      }}
    >
      <Container maxWidth="lg">
        <img src="/imagest2o/shook.png" alt="error" height={120} width={120} />
        <Typography
          sx={{
            mt:6,
            fontSize: 48,
            fontWeight: "bold",
            background: (theme) => theme.gradients.bgprimary.main,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
  
          }}
        >
          Page Not Found
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: 26,
            fontWeight: 700,
            lineHeight: 1.2,
            mt: 2,
            color: "black",
          }}
        >
          The Page you are looking is not available or has been removed.
        </Typography>

        <Typography
          variant="h5"
          sx={{
            fontSize: 18,
            fontWeight: 400,
            lineHeight: 1.5,
            mt: 4,
            mb: 2,
            color: "#777",
          }}
        >
          Go to home page using button below
        </Typography>

        <Button
          variant="contained"
          onClick={() => {
            router.replace("/");
          }}
          sx={{
            height: 58,
            background: (theme) => theme.gradients.bgprimary.main,
            color: "white",
            borderRadius: 20,
            fontSize: 16,
            fontWeight: 700,
            padding: "18px 40px",
            "&:hover": {
              background: (theme) => theme.gradients.bgsecondary.main,
            },
          }}
        >
          Go to Home Page
        </Button>
      </Container>
    </Grid>
  );
}

export default page;
