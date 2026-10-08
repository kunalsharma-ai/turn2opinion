"use client";

import React from "react";
import { Box, Typography, Grid } from "@mui/material";

import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function RewardClaims() {
  const rewardData = [
    {
      icon: <CardGiftcardIcon />,
      title: "EARN REWARDS",
      description:
        "Participate in eligible surveys and research studies to earn valuable rewards.",
    },
    {
      icon: <AccountBalanceWalletIcon />,
      title: "CHECK YOUR BALANCE",
      description:
        "Keep track of your available rewards and monitor your earned points.",
    },
    {
      icon: <AssignmentTurnedInIcon />,
      title: "SUBMIT A CLAIM",
      description:
        "Request your reward when you meet the eligibility and claim requirements.",
    },
    {
      icon: <CheckCircleIcon />,
      title: "RECEIVE YOUR REWARD",
      description:
        "Get your reward after your claim has been successfully processed.",
    },
  ];

  return (
    <Box
      id="reward-claim"
      sx={{
        py: { xs: 6, md: 9 },
        px: { xs: 2, md: 5, lg: 8 },
      }}
    >
      <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { xs: 24, md: 32 },
            color: "primary.main",
            mb: 1,
          }}
        >
          REWARDS CLAIM
        </Typography>

        <Box
          sx={{
            width: 70,
            height: 4,
            bgcolor: "primary.main",
            borderRadius: 2,
            mx: "auto",
            mb: 2,
          }}
        />

        <Typography
          sx={{
            fontSize: { xs: 14, md: 16 },
            color: "text.secondary",
            maxWidth: 700,
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          Complete surveys, earn rewards, and easily claim your eligible
          rewards.
        </Typography>
      </Box>

      {/* Reward Cards */}
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {rewardData.map((reward, index) => (
          <Grid
            key={index}
            size={{ xs: 12, sm: 6, lg: 3 }}
          >
            <Box
              sx={{
                height: "100%",
                p: { xs: 3, md: 4 },
                textAlign: "center",
                borderRadius: 3,
                bgcolor: "white",
                border: "1px solid",
                borderColor: "rgba(12, 90, 219, 0.15)",
                boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
                transition: "all 0.3s ease",

                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 10px 28px rgba(0,0,0,0.10)",
                },
              }}
            >
              <Box
                sx={{
                  width: 70,
                  height: 70,
                  mx: "auto",
                  mb: 2.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  bgcolor: "rgba(12, 90, 219, 0.08)",
                  color: "primary.main",

                  "& svg": {
                    fontSize: 34,
                  },
                }}
              >
                {reward.icon}
              </Box>

              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: 17, md: 19 },
                  color: "primary.main",
                  mb: 1.5,
                }}
              >
                {reward.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: 14, md: 15 },
                  color: "text.secondary",
                  lineHeight: 1.6,
                }}
              >
                {reward.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}