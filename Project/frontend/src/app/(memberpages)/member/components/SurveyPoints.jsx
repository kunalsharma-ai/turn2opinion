"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { api } from "@/util";
import { useToast } from "@/hooks";


export default function SurveyPoints() {
  const router=useRouter();
  const [points, setPoints] = React.useState(0); //todo: set from api call
  const [conversionRate, setConversionRate] = React.useState(1); //todo: set conversion rate from api call
  const [threshold, setThreshold] = React.useState(1500); //todo: set from server config
  React.useEffect(() => {
    api
      .get(`/api/v1/me/points`)
      .then((resp) => {
        if(resp.status==="error")
          router.replace("/survey?name=welcome");
        // if (!resp.data) return useToast(resp);
        let data = resp.data;
        setPoints(data.totalPoints);
        setThreshold(data.threshold);
        setConversionRate(data.conversionRate);
      })
      .catch((err) => {})
      .finally(() => {});
  }, []);
  return (
    <Grid
      size={{ xs: 12, md: 6 }}
      container
      direction={"column"}
      alignItems={{ xs: "center", md: "flex-end" }}
      textAlign={{ xs: "center", md: "right" }}
    >
      <Typography
        fontSize={{ xs: "16px", md: "20px" }}
        color="secondary.main"
        fontWeight={"500"}
      >
        Earned Points : {points} (~{" "}
        {(Number(points) * Number(conversionRate)).toMoney("USD")})
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
    </Grid>
  );
}
