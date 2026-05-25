"use client";

import React from "react";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import { api, loadData } from "@/util";
import { useRouter } from "next/navigation";

export default function MyAccountPoints() {
  const router = useRouter();

  const [points, setPoints] = React.useState(0);
  const [threshold, setThreshold] = React.useState(15000);
  const [conversionRate, setConversionRate] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);

    loadData(
      api.get("/api/v1/me/points"),
      (resp) => {
        if (resp.status === "error") {
          return;
        }

        const data = resp.data;

        setPoints(data?.totalPoints ?? 0);
        setThreshold(data?.threshold ?? 15000);
        setConversionRate(data?.conversionRate ?? 0);
      },
      () => {
        setIsLoading(false);
      },
    );
  }, []);

  if (isLoading) return null;

  const percentage = Math.min((points / threshold) * 100, 100);
  const rewardAmount = Number(points) * Number(conversionRate);

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "18px",
        overflow: "hidden",
        position: "relative",
        px: { xs: 2, md: 4 },
        py: { xs: 2.5, md: 3 },
        background:
          "linear-gradient(135deg, #081a3d 0%, #0c5adb 45%, #063686 100%)",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 10px 40px rgba(6, 54, 134, 0.3)",
      }}
    >
      {/* Decorative lines */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.08,
          backgroundImage: `
            linear-gradient(120deg, transparent 0%, transparent 48%, #60a5fa 49%, transparent 50%),
            linear-gradient(60deg, transparent 0%, transparent 48%, #60a5fa 49%, transparent 50%)
          `,
          backgroundSize: "220px 220px",
          pointerEvents: "none",
        }}
      />

      <Grid
        container
        spacing={3}
        alignItems="center"
        position="relative"
        zIndex={2}
      >
        {/* Left - Current Rewards */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.9)",
              fontSize: { xs: "20px", md: "28px" },
              fontWeight: 500,
              lineHeight: 1.1,
            }}
          >
            Current Rewards:
          </Typography>

          <Typography
            sx={{
              mt: 1,
              fontSize: { xs: "34px", md: "52px" },
              lineHeight: 1,
              fontWeight: 800,
              background: "linear-gradient(180deg, #a5d6ff 0%, #60a5fa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {points.toLocaleString()} pts
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              color: "#93c5fd",
              fontSize: { xs: "15px", md: "18px" },
              fontWeight: 600,
            }}
          >
            ({rewardAmount.toMoney("USD")})
          </Typography>
        </Grid>

        {/* Center Icon */}
        <Grid
          size={{ xs: 12, md: 2 }}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{
              color: "#93c5fd",
            }}
          >
            <EmojiEventsRoundedIcon sx={{ fontSize: 72 }} />
          </Stack>
        </Grid>

        {/* Right - Payout Milestone */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography
              sx={{
                color: "#bfdbfe",
                fontWeight: 700,
                fontSize: { xs: "14px", md: "16px" },
              }}
            >
              Payout Milestone
            </Typography>

            <FlagRoundedIcon
              sx={{
                color: "#60a5fa",
                fontSize: 28,
              }}
            />
          </Stack>

          <Box sx={{ position: "relative" }}>
            <LinearProgress
              variant="determinate"
              value={percentage}
              sx={{
                height: 20,
                borderRadius: "999px",
                backgroundColor: "rgba(255,255,255,0.15)",
                "& .MuiLinearProgress-bar": {
                  borderRadius: "999px",
                  background: "#fff",
                },
              }}
            />

            <Typography
              sx={{
                mt: 1,
                color: "rgba(255,255,255,0.75)",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              [{points.toLocaleString()} / {threshold.toLocaleString()} pts to
              Payout]
            </Typography>

            <Typography
              sx={{
                position: "absolute",
                right: 0,
                top: 34,
                color: "#93c5fd",
                fontSize: "14px",
                fontWeight: 700,
                display: { xs: "block", md: "none", xl: "block" },
              }}
            >
              {threshold.toLocaleString()} pt
            </Typography>
          </Box>

          {points >= threshold && (
            <Button
              variant="contained"
              sx={{
                mt: 2,
                borderRadius: 999,
                px: 3,
                fontWeight: 700,
                background: "linear-gradient(90deg, #60a5fa 0%, #2563eb 100%)",
                color: "#0a1f3d",
                "&:hover": {
                  opacity: 0.95,
                },
              }}
            >
              Redeem Now
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
