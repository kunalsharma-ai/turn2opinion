"use client";

import React, { useState } from "react";
import {
  Avatar,
  Box,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useMember } from "@/Context";

const maskEmail = (email) => {
  if (!email) return "";

  const [name, domain] = email.split("@");
  if (!domain) return "xxxx";

  return `${name.slice(0, 2)}xxxx@${domain}`;
};

export default function CurrentUser() {
  const [user] = [useMember()];
  const [showEmail, setShowEmail] = useState(false);

  return (
    <Grid
      size={{ xs: 12, md: 6 }}
      container
      alignItems="center"
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
          opacity: user?.profilePicture ? 1 : 0.7,
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
        <Typography
          fontSize={{ xs: "16px", md: "20px" }}
          fontWeight={600}
          color="secondary.main"
        >
          {user?.fullName}
        </Typography>

        <Box display="flex" alignItems="center">
          <Typography
            fontSize={{ xs: "14px", md: "18px" }}
            fontWeight={500}
          >
            {showEmail ? user?.mail : maskEmail(user?.mail)}
          </Typography>

          <IconButton
            size="small"
            onClick={() => setShowEmail((prev) => !prev)}
            aria-label={showEmail ? "Hide email" : "Show email"}
          >
            {showEmail ? (
              <VisibilityOffIcon fontSize="small" />
            ) : (
              <VisibilityIcon fontSize="small" />
            )}
          </IconButton>
        </Box>
      </Box>
    </Grid>
  );
}