"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { Grid, Typography, Box } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function SubHeader({ title = "Title", pageName = "name" }) {
  const router = useRouter();
  return (
    <Grid
      container
      size={12}
      direction={"column"}
      justifyContent="center"
      alignItems={"center"}
      py={{ xs: 3, lg: 7 }}
      sx={{
        color: "white",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <img src="/imagest2o/star.png" alt="star icon" height={30} width={30} />
      <Typography
        fontSize={{ xs: "26px", md: "44px" }}
        sx={{
          fontWeight: "bold",
          background: "var(--bg-primary-gradient)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
          display: "inline-block",
          textAlign: "center",
        }}
      >
        {title}
      </Typography>
      <Box
        display={"flex"}
        sx={{ gap: 1, mt: 1 }}
        alignItems={"center"}
        justifyContent={"center"}
        fontWeight={500}
      >
        <Typography
          onClick={() => {
            router.push("/");
          }}
          sx={{
            fontSize: "16px",
            color: "primary.main",
            "&:hover": {
              textDecoration: "underline",
              cursor: "pointer",
            },
          }}
        >
          Home
        </Typography>
        <ArrowForwardIosIcon sx={{ color: "black", fontSize: 13 }} />{" "}
        <Typography fontSize="16px" color="#777">
          {pageName}
        </Typography>
      </Box>
    </Grid>
  );
}

export default SubHeader;
