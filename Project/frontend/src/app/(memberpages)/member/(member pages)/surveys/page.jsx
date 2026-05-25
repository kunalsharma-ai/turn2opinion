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
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";

import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

import DataCards from "@/components/DataCards";
import { loadData, api } from "@/util";
import { SurveyPoints } from "../../components";
import { useQuery } from "@/Context";

const permittedStatus = ["invited", "dropout"];
export default function SurveyDashboard() {
  const [query] = [useQuery()];
  const [surveys, setSurveys] = React.useState([]);
  React.useEffect(() => {
    loadData(api.post(`/api/v1/me/survey`, { source: query.source }), (resp) => {
      setSurveys(resp.data);
    });
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
      value: `${availableSurveys?.reduce((sum, survey) => sum + survey.points, 0)} pts`,
      subtitle: "Across all surveys",
      icon: <AccountBalanceWalletOutlinedIcon />,
      color: "#16A34A",
      bg: "#ECFDF3",
    },
    {
      title: "Estimated Time",
      value: `${Math.round(availableSurveys?.reduce((sum, survey) => sum + survey.loi, 0) / availableSurveys?.length)} min`,
      subtitle: "On average",
      icon: <AccessTimeOutlinedIcon />,
      color: "#7C3AED",
      bg: "#F5F3FF",
    },
    {
      title: "Average Reward",
      value: `${availableSurveys?.reduce((sum, survey) => sum + survey.points, 0) / availableSurveys?.length} pts`,
      subtitle: "Per survey",
      icon: <CardGiftcardOutlinedIcon />,
      color: "#F59E0B",
      bg: "#FFFBEB",
    },
  ];

  return (
    <Box sx={{ p: { xs: 1, md: 2.5 }, bgcolor: "#eff3f5" }}>
      <SurveyStat stats={stats} />
      <Divider sx={{ my: 3, bgcolor: "#ffe" }} />
      <SurveyList surveys={surveys} query={query} />
    </Box>
  );
}

function SurveyStat({ stats }) {
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        mb={4}
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
        <Grid size={{ xs: 12, md: 6 }}>
          <SurveyPoints onUpdate={() => { }} />
        </Grid>

        {/* <IconButton
          onClick={() => {}}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            bgcolor: "#fff",
            px: 2,
            py: 1,
            gap: 1,
            color: "primary.main",
          }}
        >
          <RefreshIcon fontSize="small" />

          <Typography variant="button" fontWeight={600}>
            Refresh
          </Typography>
        </IconButton> */}
      </Stack>
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
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
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

                    <Typography variant="body2" color="text.secondary" mt={0.5}>
                      {item.subtitle}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

function SurveyList({ surveys, query }) {
  const [activeFilter, setActiveFilter] = React.useState(query.filter ?? "All Surveys");
  console.log(activeFilter)
  const filters = [
    {
      label: "All Surveys",
    },
    {
      label: "High Reward",
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
    <Box sx={{ mt: 4 }}>
      <DataCards
        data={surveys}
        isLoading={false}
        filter={filters.find((filter) => filter.label === activeFilter)}
        pageSize={5}
        getSearchText={(row) => row.name}
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

    const surveyCategory = survey.category || survey.slug || survey.name || survey.type || "";

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
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        minHeight: 220,
        position: "relative",
      }}
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
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: lightBg,
              color: darkColor,
              border: "1px solid",
              borderColor: `${darkColor}40`,
              boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
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
          <AccountBalanceWalletOutlinedIcon
            sx={{ fontSize: 24, color: "success.main" }}
          />
          <Box>
            <Typography fontSize={26} fontWeight={700} color="success.main">
              {survey.points} pts
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Reward
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <AccessTimeRoundedIcon
            sx={{ fontSize: 24, color: "secondary.main" }}
          />
          <Box>
            <Typography variant="body1" fontWeight={700}>
              {survey.loi} min
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Time
            </Typography>
          </Box>
        </Stack>
      </Stack>

      <Box sx={{ mt: "auto" }}>
        {permittedStatus.includes(survey?.participationStatus) && (
          <Button
            fullWidth
            variant="contained"
            href={`/survey?name=${survey.slug}`}
            color="secondary"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            Start Survey
          </Button>
        )}
      </Box>
    </Box>
  );
}
