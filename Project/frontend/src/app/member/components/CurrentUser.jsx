"use client";

import React from "react";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { useMember } from "@/Context";

export default function CurrentUser() {
  const [user] = [useMember()];
  // todo: change profile picture
  return (
    <Grid
      size={{ xs: 12, md: 6 }}
      container
      alignItems={"center"}
      justifyContent={{ xs: "center", md: "flex-start" }}
      spacing={2}
      pb={{ xs: 2, md: 0 }}
      mb={{ xs: 2, md: 0 }}
      borderBottom={{ xs: `1px solid #e0e0e0`, md: "none" }}
    >
      <Avatar
        src={user?.profilePicture || ""}
        alt={user?.name?.first ?? "U"}
        sx={{
          height: "70px",
          width: "70px",
          fontSize: "36px",
          bgcolor: user?.profilePicture ? "transparent" : "primary.main",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", sm: "flex-start" },
        }}
      >
        <Typography fontSize={"16px"} fontWeight={600}>
          {user?.fullName}
        </Typography>
        <Typography fontSize="13px" fontWeight={500}>
          {user?.mail}
        </Typography>
        <Typography
          fontSize="13px"
          color="secondary.main"
          fontWeight={600}
          textTransform="capitalize"
        >
          {user?.category}
        </Typography>
      </Box>
    </Grid>
  );
}
