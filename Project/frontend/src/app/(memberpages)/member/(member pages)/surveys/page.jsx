"use client";

import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  IconButton,
  Avatar,
  Button,
  Chip,
  Divider,
  CircularProgress,
  Collapse,
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";

import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import DataCards from "@/components/DataCards";

import { loadData, api } from "@/util";
import { useQuery } from "@/Context";
import { SurveyPoints } from "../../components";
import { SurveyHistory } from "../dashboard/page";

const permittedStatus = ["invited", "dropout"];
export default function SurveyDashboard() {
  const [query] = [useQuery()];
  const [surveys, setSurveys] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setIsLoading(true);
    loadData(
      api.post(`/api/v1/me/survey`, { source: query.source, status: "active" }),
      (resp) => {
        setSurveys(resp.data);
      },
      () => setIsLoading(false),
    );
  }, [query]);
  const availableSurveys = surveys?.filter((s) =>
    permittedStatus.includes(s.participationStatus),
  );
  const stats = [
    {
      title: "Available Surveys",
      value: availableSurveys?.length,
      subtitle: "Surveys",
      icon: <AssignmentOutlinedIcon />,
      color: "#3B82F6",
      bg: "#EFF6FF",
    },
    {
      title: "Total Earning Opportunity",
      value:
        availableSurveys.length === 0
          ? `-`
          : `${availableSurveys?.reduce((sum, survey) => sum + survey.points, 0)} pts`,
      subtitle: "Across all surveys",
      icon: <AccountBalanceWalletOutlinedIcon />,
      color: "#16A34A",
      bg: "#ECFDF3",
    },
    {
      title: "Estimated Time",
      value:
        availableSurveys.length === 0
          ? `-`
          : `${Math.round(availableSurveys?.reduce((sum, survey) => sum + survey.loi, 0) / availableSurveys?.length)} min`,
      subtitle: "On average",
      icon: <AccessTimeOutlinedIcon />,
      color: "#7C3AED",
      bg: "#F5F3FF",
    },
    {
      title: "Average Reward",
      value:
        availableSurveys.length === 0
          ? `-`
          : `${Math.round(availableSurveys?.reduce((sum, survey) => sum + survey.points, 0) / availableSurveys?.length)} pts`,
      subtitle: "Per survey",
      icon: <CardGiftcardOutlinedIcon />,
      color: "#F59E0B",
      bg: "#FFFBEB",
    },
  ];

  return (
    <Box sx={{ p: { xs: 1, md: 2.5 }, bgcolor: "#eff3f5" }}>
      <Grid
        size={12}
        container
        justifyContent="space-between"
        alignItems="flex-start"
        mb={3}
        spacing={{ xs: 3, md: 0 }}
      >
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            fontSize={{ xs: 20, md: 26 }}
            fontWeight={700}
            color="text.primary"
          >
            Available Surveys
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Complete surveys, share your opinion and earn rewards.
          </Typography>
        </Grid>

        <SurveyPoints onUpdate={() => {}} />
      </Grid>
      <Collapse
        in={availableSurveys.length !== 0 && !isLoading}
        timeout="auto"
        unmountOnExit
      >
        <SurveyStat stats={stats} isLoading={isLoading} />
      </Collapse>
      <Divider sx={{ my: 2, bgcolor: "#ffe" }} />
      <SurveyList surveys={surveys} query={query} isLoading={isLoading} />
      <Divider sx={{ my: 2, bgcolor: "#ffe" }} />
      <SurveyHistory />
    </Box>
  );
}

function SurveyStat({ stats, isLoading }) {
  return (
    <>
      <Grid container spacing={3}>
        {stats.map((item, index) => (
          <Grid
            key={index}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3,
            }}
          >
            <Card
              elevation={0}
              sx={{
                height: "100%",
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                position: "relative",
                minHeight: 120,
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                {isLoading ? (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      display: "inline-flex",
                      zIndex: 10,
                    }}
                  >
                    <CircularProgress
                      sx={{ color: "primary.main" }}
                      thickness={2}
                    />
                  </Box>
                ) : (
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Avatar
                      sx={{
                        width: 56,
                        height: 56,
                        bgcolor: item.bg,
                        color: item.color,
                      }}
                    >
                      {item.icon}
                    </Avatar>

                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontWeight={600}
                        mb={1}
                      >
                        {item.title}
                      </Typography>

                      <Typography variant="h5" fontWeight={700}>
                        {item.value}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mt={0.5}
                      >
                        {item.subtitle}
                      </Typography>
                    </Box>
                  </Stack>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

function SurveyList({ surveys, query, isLoading }) {
  const [activeFilter, setActiveFilter] = React.useState(
    query.filter ?? "All Surveys",
  );
  console.log(activeFilter);
  const filters = [
    {
      label: "All Surveys",
    },
    {
      label: "High Reward Surveys",
      filter: (survey) => survey.points > 1500,
    },
    {
      label: "Short Surveys",
      filter: (survey) => survey.loi < 15,
    },
    {
      label: "New Surveys",
      badge: "New",
      filter: (survey) => survey.participationStatus === "invited",
    },
  ];

  return (
    <Box sx={{ mt: 2 }}>
      <DataCards
        data={surveys}
        isLoading={isLoading}
        filter={filters.find((filter) => filter.label === activeFilter)}
        pageSize={5}
        getSearchText={(row) => row.name}
        emptyMessage="No surveys available."
        renderToolbar={() => (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1.5,
              width: "100%",
              alignItems: "center",
            }}
          >
            {filters.map((filter) => {
              const active = activeFilter === filter.label;

              return (
                <Button
                  key={filter.label}
                  variant={active ? "contained" : "outlined"}
                  color={active ? "secondary" : "inherit"}
                  onClick={() => setActiveFilter(filter.label)}
                  sx={{
                    height: 34,
                    px: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 700,
                    borderColor: "divider",
                    bgcolor: active ? "secondary.main" : "#fff",
                    color: active ? "#fff" : "text.primary",
                    boxShadow: "none",
                    "&:hover": {
                      boxShadow: 1,
                    },
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body2" fontWeight={700}>
                      {filter.label}
                    </Typography>

                    {filter.badge && (
                      <Chip
                        label={filter.badge}
                        size="small"
                        color="success"
                        sx={{
                          height: 20,
                          fontSize: 10,
                          fontWeight: 600,
                          color: "#fff",
                          background:
                            "linear-gradient(45deg, #00c853, #64dd17)",
                        }}
                      />
                    )}
                  </Stack>
                </Button>
              );
            })}
          </Box>
        )}
        card={(row) => <SurveyCard survey={row} />}
        cardProps={{
          elevation: 0,
          sx: {
            mt: 1,
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
          },
        }}
      />
    </Box>
  );
}

function SurveyCard({ survey }) {
  const getCategoryData = (survey) => {
    const categories = [
      { name: "basic", icon: "fa-id-card-clip", color: "#1E40AF" },
      { name: "professional", icon: "fa-user-tie", color: "#1F2937" },
      { name: "educational", icon: "fa-graduation-cap", color: "#7C3AED" },
      {
        name: "Survey and Rewards",
        icon: "fa-clipboard-list",
        color: "#16A34A",
      },
      { name: "financial", icon: "fa-circle-dollar-to-slot", color: "#CA8A04" },
      { name: "parenting", icon: "fa-people-roof", color: "#DB2777" },
      {
        name: "Home and Pet Ownership",
        icon: "fa-house-chimney",
        color: "#EA580C",
      },
      { name: "shopping", icon: "fa-cart-shopping", color: "#E11D48" },
      { name: "Lifestyle and food", icon: "fa-utensils", color: "#B45309" },
      { name: "travel", icon: "fa-plane-departure", color: "#0E7490" },
      { name: "automobile", icon: "fa-car-side", color: "#334155" },
      { name: "health", icon: "fa-heart-pulse", color: "#DC2626" },
      { name: "beauty & fashion", icon: "fa-hand-dots", color: "#C026D3" },
      {
        name: "media, electronics, mobile & technology",
        icon: "fa-microchip",
        color: "#4338CA",
      },
      { name: "sports", icon: "fa-basketball", color: "#F59E0B" },
      { name: "gaming", icon: "fa-gamepad", color: "#7C3AED" },
    ];

    const surveyCategory = survey.surveyCategory || "";

    return (
      categories.find(
        (cat) =>
          surveyCategory.toLowerCase().includes(cat.name.toLowerCase()) ||
          cat.name.toLowerCase().includes(surveyCategory.toLowerCase()),
      ) || { icon: "fa-clipboard-list", color: "#64748B" }
    );
  };

  const category = getCategoryData(survey);
  const darkColor = category.color;
  const lightBg = darkColor + "20";

  return (
    <Box
      sx={(theme) => ({
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        minHeight: 220,
        position: "relative",
        borderRadius: 4,
        bgcolor: "card.main",
        transition: "all 0.3s ease",

        "& .survey-icon": {
          width: 56,
          height: 56,
          bgcolor: lightBg,
          color: darkColor,
          border: "1px solid",
          borderColor: `${darkColor}40`,
          boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
        },

        "& .survey-title": {
          color: "text.primary",
          transition: "all 0.3s ease",
        },

        "& .survey-subtext": {
          color: "text.secondary",
          transition: "all 0.3s ease",
        },

        "& .survey-reward-icon": {
          color: "success.main",
          transition: "all 0.3s ease",
        },

        "& .survey-time-icon": {
          color: "secondary.main",
          transition: "all 0.3s ease",
        },

        "& .survey-reward-text": {
          color: "success.main",
          transition: "all 0.3s ease",
        },

        "& .survey-time-text": {
          color: "text.primary",
          transition: "all 0.3s ease",
        },

        "& .survey-button": {
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 700,
          transition: "all 0.3s ease",
        },

        "& hr": {
          transition: "all 0.3s ease",
          borderColor: "rgba(0,0,0,0.08)",
        },

        "&:hover": {
          bgcolor: "secondary.main",
          transform: "translateY(-4px)",
          boxShadow: 6,

          "& .survey-icon": {
            bgcolor: "#fff",
            color: theme.palette.secondary.main,
            borderColor: "#fff",
          },

          "& .survey-title": {
            color: "#fff",
          },

          "& .survey-subtext": {
            color: "rgba(255,255,255,0.75)",
          },

          "& .survey-reward-icon": {
            color: "#fff",
          },

          "& .survey-time-icon": {
            color: "#fff",
          },

          "& .survey-reward-text": {
            color: "#fff",
          },

          "& .survey-time-text": {
            color: "#fff",
          },

          "& hr": {
            borderColor: "rgba(255,255,255,0.18)",
          },

          "& .survey-button": {
            bgcolor: "#fff",
            color: theme.palette.secondary.main,

            "&:hover": {
              bgcolor: "rgba(255,255,255,0.92)",
            },
          },
        },
      })}
    >
      <Box
        sx={{
          position: "relative",
          height: 60,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Avatar className="survey-icon">
            <i
              className={`fa-solid ${category.icon}`}
              style={{ fontSize: 22 }}
            ></i>
          </Avatar>
        </Box>

        <Box sx={{ position: "absolute", right: 0, top: 0 }}>
          {survey.participationStatus === "invited" ? (
            <Chip
              size="small"
              color="secondary"
              label="New"
              sx={{
                color: "white",
                fontWeight: 600,
                background: "linear-gradient(45deg, #00c853, #64dd17)",
              }}
            />
          ) : (
            <Chip
              label={survey.participationStatus}
              size="small"
              color={
                survey.participationStatus === "complete"
                  ? "success"
                  : survey.participationStatus === "dropout"
                    ? "error"
                    : "primary"
              }
              sx={{
                textTransform: "capitalize",
                fontWeight: 600,
                color: "#fff",
              }}
            />
          )}
        </Box>
      </Box>

      <Box>
        <Typography
          className="survey-title"
          title={survey.name}
          variant="h6"
          fontWeight={700}
          sx={{
            mb: 1,
            lineHeight: 1.4,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            textAlign: "center",
          }}
        >
          {survey.name}
        </Typography>
      </Box>

      <Divider />

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        px={3}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <AccountBalanceWalletOutlinedIcon className="survey-reward-icon" />

          <Box>
            <Typography
              className="survey-reward-text"
              fontSize={26}
              fontWeight={700}
            >
              {survey.points} pts
            </Typography>

            <Typography className="survey-subtext" variant="body2">
              Reward
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <AccessTimeRoundedIcon className="survey-time-icon" />

          <Box>
            <Typography
              className="survey-time-text"
              variant="body1"
              fontWeight={700}
            >
              {survey.loi} min
            </Typography>

            <Typography className="survey-subtext" variant="body2">
              Time
            </Typography>
          </Box>
        </Stack>
      </Stack>

      <Box
        sx={{
          mt: "auto",
          minHeight: 40,
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        {permittedStatus.includes(survey?.participationStatus) && (
          <Button
            className="survey-button"
            fullWidth
            variant="contained"
            href={`/survey?name=${survey.slug}`}
            color="secondary"
          >
            Start Survey
          </Button>
        )}
      </Box>
    </Box>
  );
}
