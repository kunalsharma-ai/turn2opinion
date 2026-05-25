"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { api, loadData } from "@/util";

export default function SurveyPoints({ onUpdate }) {
  const router = useRouter();
  const [points, setPoints] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [conversionRate, setConversionRate] = React.useState(null);
  const [threshold, setThreshold] = React.useState(null);
  React.useEffect(() => {
    setIsLoading(true);
    loadData(
      api.get(`/api/v1/me/points`),
      (resp) => {
        // if (resp.status === "error") router.replace("/survey?name=welcome");
        let data = resp.data;
        setPoints(data?.totalPoints ?? 0);
        setThreshold(data?.threshold ?? 0);
        setConversionRate(data?.conversionRate ?? 0);
      },
      () => {
        setIsLoading(false);
      },
    );
  }, []);
  React.useEffect(() => {
    onUpdate({
      threshold,
      conversionRate,
    });
  }, [threshold, conversionRate]);
  return isLoading ? (
    <></>
  ) : (
    <Grid
      size={{ xs: 12, md: 6 }}
      container
      direction={"column"}
      alignItems={{ xs: "center", md: "flex-end" }}
      textAlign={{ xs: "center", md: "right" }}
    >
      <Box
        sx={{
          px: 3,
          py: 2,
          borderRadius: "8px",

          background: "rgba(248, 250, 252, 0.85)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",

          border: "1px solid rgba(0, 0, 0, 0.06)",
          boxShadow: "0 12px 35px rgba(0, 0, 0, 0.1)",

          minWidth: { xs: "100%", md: 320 },
          textAlign: { xs: "center", md: "right" },
        }}
      >
        <Typography
          fontSize={{ xs: "16px", md: "20px" }}
          color="secondary.main"
          fontWeight={"500"}
        >
          Earned Points :{"  "}
          <Typography
            component="span"
            fontSize={{ xs: "16px", md: "20px" }}
            color="primary.main"
            fontWeight={"500"}
          >
            {points} Points
          </Typography>
        </Typography>
        <Typography
          fontSize={{ xs: "14px", md: "18px" }}
          color="primary.main"
          fontWeight={"500"}
        >
          ( {(Number(points) * Number(conversionRate)).toMoney("USD")} )
        </Typography>
        {threshold > points ? (
          <>
            <Typography fontSize="13px">
              Get <b>{threshold - points}</b> more points to redeem
            </Typography>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              sx={{
                color: "white",
                mt: 1,
                px: 2,
                fontWeight: 600,
                borderRadius: 2,
              }}
              onClick={(e) => {
                // todo: open redeem form
              }}
            >
              Redeem Points
            </Button>
          </>
        )}
      </Box>
    </Grid>
  );
}
