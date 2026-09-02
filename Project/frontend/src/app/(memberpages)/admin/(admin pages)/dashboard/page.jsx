"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Grid, Typography, Box, Paper } from "@mui/material";
import { motion } from "framer-motion";
import {
  People as PeopleIcon,
  Person as PersonIcon,
  ChildCare as ChildCareIcon,
} from "@mui/icons-material";

import { useMember, useQuery } from "@/Context";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import { api, Page } from "@/util";
import { useToast } from "@/hooks";

export default function page() {
  const user = useMember();
  const router = useRouter();

  if (!user) return <LoadingOverlay />;
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, width: "100%" }}>
      <Box sx={{ mb: 4, display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: "24px", md: "30px" },
            fontWeight: "700",
            color: "text.primary",
            letterSpacing: "-0.5px",
          }}
        >
          Admin Dashboard
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "14px",
            color: "text.secondary",
          }}
        >
          Real-time metrics, panelists demographics, and activity overview.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Panelists />
        {/* <Surveys /> */}
      </Grid>
    </Box>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.08,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const getPanelistDetails = (label = "") => {
  const normalized = label.toLowerCase();

  if (normalized.includes("total")) {
    return {
      icon: <PeopleIcon sx={{ fontSize: 30 }} />,
      lightColor: "rgba(12, 90, 219, 0.12)",
      iconColor: "#0c5adb",
      shadow: "rgba(12, 90, 219, 0.25)",
    };
  }

  if (normalized.includes("b2c-minor") || normalized.includes("b2c minor")) {
    return {
      icon: <ChildCareIcon sx={{ fontSize: 30 }} />,
      lightColor: "rgba(255, 152, 0, 0.12)",
      iconColor: "#f57c00",
      shadow: "rgba(255, 152, 0, 0.25)",
    };
  }

  if (normalized.includes("b2c")) {
    return {
      icon: <PersonIcon sx={{ fontSize: 30 }} />,
      lightColor: "rgba(76, 175, 80, 0.12)",
      iconColor: "#2e7d32",
      shadow: "rgba(76, 175, 80, 0.25)",
    };
  }

  return {
    icon: <PeopleIcon sx={{ fontSize: 30 }} />,
    lightColor: "rgba(12, 90, 219, 0.12)",
    iconColor: "#0c5adb",
    shadow: "rgba(12, 90, 219, 0.25)",
  };
};

function Panelists() {
  const [statistics, setStatistics] = React.useState({});

  React.useEffect(() => {
    api
      .get(`/api/v1/user/summarize`)
      .then((resp) => {
        if (!resp.data) return useToast(resp);
        setStatistics(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const statsList = React.useMemo(() => {
    return Object.values(statistics) || [];
  }, [statistics]);

  return (
    <Grid size={12} container spacing={3}>
      <Grid size={12}>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "600",
            display: "inline-block",
            color: "primary.main",
            borderBottom: (theme) => `2px solid ${theme.palette.primary.main}`,
            pb: 0.5,
            mb: 1,
          }}
        >
          Panelists Statistics
        </Typography>
      </Grid>

      {statsList.map((stat, index) => {
        const { icon, lightColor, iconColor, shadow } = getPanelistDetails(
          stat?.label,
        );

        return (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <motion.div
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
              style={{ height: "100%" }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: "100%",
                  minHeight: "120px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  borderRadius: "18px",
                  bgcolor: "background.paper",
                  boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.02)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    boxShadow: `0 12px 24px -6px ${shadow}, 0 4px 12px 0 rgba(0, 0, 0, 0.04)`,
                    borderColor: iconColor,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    bgcolor: lightColor,
                    position: "absolute",
                    right: -25,
                    bottom: -25,
                    filter: "blur(18px)",
                    zIndex: 0,
                  }}
                />

                <Box
                  sx={{
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5,
                    flex: 1,
                    mr: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "text.secondary",
                      textTransform: "capitalize",
                    }}
                  >
                    {stat?.label}
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: "700",
                      fontSize: { xs: "24px", xl: "32px" },
                      color: "text.primary",
                      lineHeight: 1.2,
                    }}
                  >
                    {Number(stat?.value || 0).toLocaleString("en-US")}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    zIndex: 1,
                    width: 56,
                    height: 56,
                    flexShrink: 0,
                    borderRadius: "14px",
                    bgcolor: lightColor,
                    color: iconColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {icon}
                </Box>
              </Paper>
            </motion.div>
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
            borderBottom: (theme) => `2px solid ${theme.palette.primary.main}`,
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
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
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
