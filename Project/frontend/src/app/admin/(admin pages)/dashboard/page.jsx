"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Grid, Typography } from "@mui/material";
import { useMember, useQuery } from "@/Context";

import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import { api, Page } from "@/util";
import { useToast } from "@/hooks";

export default function page() {
  const user = useMember();
  const router = useRouter();

  // if (!user) return <LoadingOverlay />;
  return (
    <Grid container size={12}>
      <Panelists />
      {/* <Surveys /> */}
    </Grid>
  );
}

function Panelists() {
  const [statistics, setStatistics] = React.useState({});
  React.useEffect(() => {
    api
      .get(`/api/v1/user/summarize`)
      .then((resp) => {
        if (!resp.data) return useToast(resp);
        let data = resp.data;

        console.log(data);
        setStatistics(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, []);

  const stats = React.useMemo(() => {
    return [
      {
        label: "Total Panelist",
        value: statistics?.total ?? 0,
      },
      {
        label: "Healthcare Professionals",
        value: statistics?.dsjkljfklds ?? 0,
      },
      {
        label: "Patients",
        value: statistics?.points ?? 0,
      },

      {
        label: "Caregivers",
        value: statistics?.disqualified ?? 0,
      },
    ];
  }, [statistics]);

  return (
    <Grid
      size={12}
      container
      spacing={2}
      mt={1}
      p={{ xs: 2, md: 3 }}
      sx={{ border: `1px solid #e0e0e0` }}
    >
      <Page.Box width="100%">
        <Typography
          sx={{
            fontSize: "16px",
            display: "inline-block",
            fontWeight: "600",
            borderBottom:(theme)=> `2px solid ${theme.palette.primary.main}`,
            pb: 0.5,
            my: 2,
          }}
        >
          Panelists
        </Typography>
      </Page.Box>
      {Object.values(statistics)?.map((stat, index) => {
        return (
          <Grid
            container
            size={{ xs: 12, md: 6, lg: 3 }}
            key={index}
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
            sx={{
              border:(theme) =>`1px solid ${theme.palette.primary.main}`,  
              bgcolor: (theme) => theme.palette.cardbg.main,
              borderRadius: 4,
              px: { xs: 3, xl: 5 },
              py: 2,
              minHeight: "120px",
            }}
          >
            <Grid
              // size={6}
              direction="column"
              alignItems="flex-start"
              justifyContent="center"
            >
              <Typography fontSize={16} sx={{ textTransform: "capitalize" }}>
                {stat?.label}
              </Typography>
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: { xs: "24px", xl: "36px" },
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                  whiteSpace: "normal",
                }}
              >
                {stat.value.toLocaleString("en-US")}
              </Typography>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}
function Surveys() {
  const [statistics, setStatistics] = React.useState({});
  React.useEffect(() => {
    api
      .get(`/api/v1/me/statistics`)
      .then((resp) => {
        if (!resp.data) return useToast(resp);
        let data = resp.data;
        setStatistics(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, []);

  const stats = React.useMemo(() => {
    return [
      {
        label: "Total Surveys",
        value: statistics?.total ?? 0,
      },
      {
        label: "MHO Surveys",
        value: statistics?.complete ?? 0,
      },
      {
        label: "Sampledge Surveys",
        value: statistics?.points ?? 0,
      },

      {
        label: "External Surveys",
        value: statistics?.disqualified ?? 0,
      },
      {
        label: "Completes",
        value: statistics?.total ?? 0,
      },
      {
        label: "Terminates",
        value: statistics?.complete ?? 0,
      },
      {
        label: "Overquotas",
        value: statistics?.points ?? 0,
      },

      {
        label: "Security",
        value: statistics?.disqualified ?? 0,
      },
    ];
  }, [statistics]);

  return (
    <Grid
      size={12}
      container
      spacing={2}
      mt={1}
      p={{ xs: 2, md: 3 }}
      justifyContent="center"
      sx={{ borderBottom: `1px solid #e0e0e0` }}
    >
      <Page.Box width="100%">
        <Typography
          sx={{
            fontSize: "16px",
            display: "inline-block",
            fontWeight: "600",
            borderBottom:(theme)=> `2px solid ${theme.palette.primary.main}`,
            pb: 0.5,
            my: 2,
          }}
        >
          Surveys
        </Typography>
      </Page.Box>
      {stats.map((stat, index) => {
        return (
          <Grid
            container
            size={{ xs: 12, md: 6, lg: 3 }}
            key={index}
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
            sx={{
              border:(theme) =>`1px solid ${theme.palette.primary.main}`,  
              bgcolor: (theme) => theme.palette.cardbg.main,
              borderRadius: 4,
              px: { xs: 3, xl: 5 },
              py: 2,
              minHeight: "120px",
            }}
          >
            <Grid
              // size={6}
              direction="column"
              alignItems="flex-start"
              justifyContent="center"
            >
              <Typography fontSize={16}>{stat?.label}</Typography>
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: { xs: "24px", xl: "36px" },
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                  whiteSpace: "normal",
                }}
              >
                {stat.value.toLocaleString("en-US")}
              </Typography>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}
