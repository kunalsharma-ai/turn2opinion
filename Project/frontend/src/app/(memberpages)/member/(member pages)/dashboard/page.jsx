"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useMember, useQuery } from "@/Context";
import { Datatable } from "@/components";
import { DateRangeSelector } from "@/components/Form";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import { api, loadData, Page } from "@/util";
import { useToast } from "@/hooks";
import {
  SurveyPoints,
  CurrentUser,
} from "@/app/(memberpages)/member/components";

import {
  Poll as PollIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Stars as StarsIcon,
  AttachMoney as AttachMoneyIcon,
  Payments as PaymentsIcon,
} from "@mui/icons-material";

const formatNumber = (value) =>
  Number(value).toLocaleString("en-US", { maximumFractionDigits: 2 });

export default function page() {
  const user = [];
  const router = useRouter();
  const [[threshold, setThreshold], [conversionRate, setConversionRate]] = [
    React.useState(15000),
    React.useState(0.001),
  ];
  function onPointsUpdate(data) {
    setThreshold(data.threshold);
    setConversionRate(data.conversionRate);
  }
  if (!user) return <LoadingOverlay />;
  return (
    <Grid container size={12} sx={{ bgcolor: "#eff3f5" }}>
      <Grid
        size={12}
        container
        pl={4}
        pr={3}
        py={2}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <CurrentUser />
        <SurveyPoints onUpdate={onPointsUpdate} />
      </Grid>
      <Stats threshold={threshold} conversionRate={conversionRate} />
      <Surveys />
      <SurveyHistory />
    </Grid>
  );
}

function Stats({ threshold, conversionRate }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [statistics, setStatistics] = React.useState({});
  React.useEffect(() => {
    setIsLoading(true);
    loadData(
      api.get(`/api/v1/me/statistics`),
      (resp) => {
        if (!resp.data) return useToast(resp);
        let data = resp.data;
        console.table(data);
        setStatistics(data);
      },
      () => {
        setIsLoading(false);
      },
    );
  }, [threshold, conversionRate]);

  const stats = React.useMemo(() => {
    return [
      {
        label: "Survey Participated",
        value: Number(statistics?.total ?? 0),
        icon: "/images/dashboard/totalsurveytaken.png",
      },
      {
        label: "Survey Completed",
        value: statistics?.complete ?? 0,
        icon: "/images/dashboard/completedsurvey.png",
      },
      {
        label: "Survey Disqualified",
        value: statistics?.disqualified ?? 0,
        icon: "/images/dashboard/disqualifiedsurvey.png",
      },
      {
        label: "Rewards Earned (Points)",
        value: `${statistics?.points ?? 0} pts`,
        icon: "/images/dashboard/rewardpoint.png",
      },
      {
        label: "Rewards Earned (USD)",
        value: `${(Number(statistics?.points ?? 0) * Number(conversionRate)).toMoney("USD")}`,
        icon: "/images/dashboard/currentreward.png",
      },
      {
        label: "Rewards Claimed (USD)",
        value: `${((statistics?.claimed ?? 0) / 100).toMoney("USD")}`,
        icon: "/images/dashboard/claimedreward.png",
      },
    ];
  }, [statistics]);

  return (
    <Grid size={12} px={2}>
      <StatCards
        statistics={statistics}
        isLoading={isLoading}
        conversionRate={conversionRate}
      />
    </Grid>
  );

}

function Surveys() {
  const [user, query] = [useMember(), useQuery()];
  const [availableSurveys, setAvailableSurveys] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setIsLoading(true);
    loadData(
      api.get(`/api/v1/me/survey`),
      (resp) => {
        if (!resp || resp.status === "error") return;
        const { data } = resp;
        setAvailableSurveys(data);
        console.table(data);
      },
      () => {
        setIsLoading(false);
      },
    );
  }, [user]);
  const surveys = [
    {
      name: "Your Survey",
      link: "/member/surveys?source=internal",
      description:
        "Handpicked opportunities curated specifically around your unique profile insights. Complete these high-value matches to maximize your earnings securely and directly.",
      isAvailable: Boolean(availableSurveys?.internal),
      stat: [
        {
          title: "All",
          filter: null,
          count: availableSurveys?.internal?.all ?? 0,
          bg: "#2563eb",
        },
        {
          title: "High Reward",
          filter: "High Reward",
          count: availableSurveys?.internal?.highRewards ?? 0,
          bg: "#9333ea",
        },
        {
          filter: "Short",
          title: "Short",
          count: availableSurveys?.internal?.short ?? 0,
          bg: "#059669",
        },
        {
          title: "New",
          filter: "New Survey",
          count: availableSurveys?.internal?.newSurveys ?? 0,
          bg: "#ea580c",
        },
      ],
    },
    {
      name: "Daily Survey",
      link: "/member/surveys?source=external",
      description:
        "High-frequency, rotating questionnaires updated constantly throughout the day. Dive in anytime for quick, continuous chances to boost your daily points balance.",
      isAvailable: Boolean(availableSurveys?.external),
      stat: [
        {
          title: "All",
          filter: null,
          count: 0,
          bg: "#2563eb",
        },
        {
          title: "High Reward",
          filter: "High Reward",
          count: 0,
          bg: "#9333ea",
        },
        {
          filter: "Short",
          title: "Short Surveys",
          count: 0,
          bg: "#059669",
        },
        {
          title: "New",
          filter: "New Surveys",
          count: 0,
          bg: "#ea580c",
        },
      ],
    },
  ];
  return (
    <Grid
      size={12}
      container
      spacing={2}
      px={{ xs: 2, md: 3 }}
      py={2}
      justifyContent="center"
      sx={{ border: `1px solid #e0e0e0` }}
    >
      <Box width="100%">
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
          Available Surveys
        </Typography>
      </Box>
      {/*<pre>{JSON.stringify(availableSurveys,null,1)}</pre>*/}
      {surveys.map((survey, index) => {
        return (
          <Grid
            container
            key={index}
            size={{ xs: 12, lg: 6 }}
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={1}
            py={3}
            sx={{
              boxShadow: 3,
              // border: (theme) => `1px solid ${theme.palette.primary.main}`,
              // bgcolor: (theme) => theme.palette.cardbg.main,
              background:
                index === 0
                  ? "linear-gradient(135deg, #0891b2 0%, #3dbddf  100%)"
                  : "linear-gradient(90deg, #3dbddf 0%, #3b82f6 100%)",
              borderRadius: 1,
              color: "#fff",
              overflow: "hidden",
              textAlign: "center",
              transition: "transform 0.35s ease, box-shadow 0.35s ease",
              willChange: "transform",

              pointerEvents: survey.isAvailable ? "auto" : "none",
              filter: survey.isAvailable ? "grayscale(0)" : "grayscale(1)",
              userSelect: survey.isAvailable ? "auto" : "none",
              "&:hover": {
                boxShadow: "0 12px 32px rgba(0,0,0,0.28)",
                // transform: "translateY(-2px) scale(1.01)",
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "20px",
              }}
            >
              {survey.name}
            </Typography>{" "}
            <Typography sx={{ fontSize: "15px", px: 1 }}>
              {survey?.description}
            </Typography>
            <Grid
              container
              spacing={1.2}
              justifyContent="center"
              width="100%"
              px={2}
              mt={1}
            >
              {survey?.stat.map((item, statIndex) => (
                <Grid key={statIndex} size={{ xs: 6, sm: 3 }}>
                  <Page.Link
                    href={`${survey.link}&filter=${item.filter}`}
                    sx={{
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "none",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        borderRadius: 2,
                        background: item.bg,
                        color: "#fff",
                        py: 1,
                        px: 1,
                        textAlign: "center",
                        cursor: "pointer",

                        transition: "all 0.25s ease",

                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: 600,
                          opacity: 0.9,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.title}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: "22px",
                          fontWeight: 700,
                          lineHeight: 1.1,
                        }}
                      >
                        {item.count}
                      </Typography>
                    </Box>
                  </Page.Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}

function SurveyHistory() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [user] = [useMember()];
  const [data, setData] = React.useState([]);
  const [dateRange, setDateRange] = React.useState([]);
  React.useEffect(() => {
    if (!user) return;
    setIsLoading(true);
    let filters = {
      status: {
        $nin: ["invited"]
      }
    };
    if (
      Boolean(dateRange) &&
      Boolean(dateRange instanceof Array) &&
      dateRange.length === 2
    )
      filters = { ...filters, dateRange };
    loadData(
      api.post(`/api/v1/response`, filters),
      (resp) => {
        setData(resp?.data)
      },
      () => { setIsLoading(false) }
    )
  }, [user, dateRange]);
  const columns = [
    {
      id: "surveyname",
      label: "Survey Name",
      render: (info) => info?.survey?.name,
      feature: ["searchable", "sortable", "lockable"],
    },
    {
      id: "start time",
      label: "Start time",
      render: (info) => {
        if (["complete", "terminate", "overquota"].includes(info.status))
          return new Date(info.timeline.start).toLocaleString();
        return "";
      },
      feature: ["sortable", "lockable"],
    },
    {
      id: "loi",
      label: "Length of Interview",
      width: 220,
      render: (info) =>
        ["complete", "terminate", "overquota"].includes(info.status)
          ? (new Date(info.updatedAt) - new Date(info.timeline.start))?.toTime()
          : "",
      feature: ["sortable", "lockable"],
    },
    {
      id: "status",
      label: "Status",
      render: (info) =>
        info.source === "internal" && info.status === "dropout" ? (
          <Page.Link href={`/survey?name=${info.survey.slug}`}>
            Continue
          </Page.Link>
        ) : (
          <Page.Text
            sx={{
              fontSize: 13,
              textTransform: "capitalize",
              color: info.status === "dropout" ? "red" : "black",
            }}
          >
            {info.status}
          </Page.Text>
        ),
      feature: ["filterable", "sortable", "lockable"],
    },
    {
      id: "rewards",
      label: "Rewards",
      render: (info) => (
        <span>{info.status === "complete" ? info.points : 0} Points</span>
      ),
    },
  ];
  return (
    <Grid
      size={12}
      px={{ xs: 2, md: 3 }}
      py={2}
      justifyContent="center"
      sx={{ border: `1px solid #e0e0e0` }}
    >
      <Datatable
        isLoading={false}
        pagination={[10, 20, 50, 100]}
        pageSize={20}
        noDataMsg="No Record Found."
        data={data.filter((info) => info.status !== "invited")}
        // noBorderRadius={true}
        hideDownload={true}
        hideColumnSelector
        extra={
          <Box px={{ xs: 0, md: 2 }} my={{ xs: 1, md: 0 }}>
            <DateRangeSelector
              onUpdate={(e) => {
                setDateRange(
                  e.map((d) => new Date(d.toDate()).toISOString().split("T")[0])
                );
              }}
            />
          </Box>
        }
        title={
          <Typography
            sx={{
              fontSize: "16px",
              display: "inline-block",
              fontWeight: "600",
              borderBottom: (theme) =>
                `2px solid ${theme.palette.primary.main}`,
              pb: 0.5,
              my: 1,
            }}
          >
            Survey Participation History
          </Typography>
        }
        columns={columns}
      />
    </Grid>
  );
}

const StatCards = ({ statistics, isLoading, conversionRate }) => {
  const iconStyle = {
    className: "card-icon",
    sx: {
      position: "absolute",
      top: 49,
      right: 49.5,
      fontSize: 42,
      transition: "transform 0.35s ease",
      transformOrigin: "center",
      opacity: 0.22,
    },
  };

  const stats = React.useMemo(() => {
    return [
      {
        title: "Survey Participated",
        value: formatNumber(statistics?.total ?? 0),
        icon: <PollIcon {...iconStyle} />,
        background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
        hideOnLargeScreen: false,
      },

      {
        title: "Survey Completed",
        value: formatNumber(statistics?.complete ?? 0),
        icon: <CheckCircleIcon {...iconStyle} />,
        background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
        hideOnLargeScreen: false,
      },

      {
        title: "Survey Disqualified",
        value: formatNumber(statistics?.disqualified ?? 0),
        icon: <CancelIcon {...iconStyle} />,
        background: "linear-gradient(135deg, #dc2626 0%, #ef4444 100%)",
        hideOnLargeScreen: false,
      },

      {
        title: "Rewards Earned (Points)",
        value: `${formatNumber(statistics?.points ?? 0)} Points`,
        icon: <StarsIcon {...iconStyle} />,
        background: "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
        hideOnLargeScreen: true,
      },

      {
        title: "Rewards Earned",
        value: {
          usd: `${(Number(statistics?.points ?? 0) * Number(conversionRate)).toMoney("USD")}`,
          local: `${(Number(statistics?.points ?? 0) * Number(conversionRate)).toLocalCurrency("USD")}`,
        },
        icon: <AttachMoneyIcon {...iconStyle} />,
        background: "linear-gradient(135deg, #0891b2 0%, #3b82f6 100%)",
        hideOnLargeScreen: false,
      },

      {
        title: "Rewards Claimed",
        value: {
          usd: `${((statistics?.claimed ?? 0) / 100).toMoney("USD")}`,
          local: `${((statistics?.claimed ?? 0) / 100).toLocalCurrency("USD")}`,
        },
        icon: <PaymentsIcon {...iconStyle} />,
        background: "linear-gradient(135deg, #be185d 0%, #ec4899 100%)",
        hideOnLargeScreen: false,
      },
    ];
  }, [statistics, conversionRate]);
  return (
    <Page.Box
      display="grid"
      gridTemplateColumns={{
        xs: "1fr",
        lg: "repeat(3, 1fr)",
        xl: "repeat(5, 1fr)",
      }}
      sx={{ gap: 2, py: 2, px: 1 }}
    >
      {stats.map((data, index) => (
        <Grid
          key={index}
          size={12}
          sx={{
            display: data.hideOnLargeScreen
              ? { xs: "block", xl: "none" }
              : "block",
            height: 140,
            position: "relative",
            bgcolor: "black",
            background: data.background,
            color: "white",
            borderRadius: 1,

            transition: "transform 0.35s ease, box-shadow 0.35s ease",
            willChange: "transform",

            "&:hover": {
              boxShadow: "0 12px 32px rgba(0,0,0,0.28)",
              transform: "translateY(-6px) scale(1.02)",

              "& .card-icon": {
                transform: "scale(1.4) rotate(4deg)",
              },
            },
          }}
        >
          {isLoading ? (
            <Page.Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "inline-flex",
                zIndex: 10,
              }}
            >
              <CircularProgress sx={{ color: "white" }} thickness={2} />
            </Page.Box>
          ) : (
            <Page.Box
              sx={{
                position: "relative",
                overflow: "hidden",
                height: "100%",
              }}
            >
              <Page.Box
                sx={{
                  content: '""',
                  position: "absolute",
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.12)",
                  bottom: -60,
                  right: -70,
                }}
              />
              <Page.Box
                sx={{
                  content: '""',
                  position: "absolute",
                  width: 70,
                  height: 70,
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.16)",
                  top: 35,
                  right: 35,
                }}
              />
              <Page.Box
                display="flex"
                flexDirection="column-reverse"
                height="100%"
                justifyContent="center"
              >
                <Page.Text
                  sx={{ fontSize: "15px", px: 2, pt: 2, fontWeight: 600 }}
                >
                  {data.title}
                </Page.Text>
                {data.icon}
                <Page.Box sx={{ px: 2 }}>
                  {typeof data.value === "object" ? (
                    <>
                      <Page.Text
                        sx={{
                          fontWeight: "bold",
                          fontSize: "30px",
                          lineHeight: 1.1,
                          textShadow: "1px 1px 1px rgba(0, 0, 0, 0.4)",
                          letterSpacing: "-1.2px",
                        }}
                      >
                        {data.value.usd}
                      </Page.Text>

                      <Page.Text
                        sx={{
                          fontWeight: 500,
                          fontSize: "15px",
                          opacity: 0.8,
                          mt: 0.3,
                          lineHeight: 1.1,
                          wordBreak: "break-word",
                        }}
                      >
                        {data.value.local}
                      </Page.Text>
                    </>
                  ) : (
                    <Page.Text
                      sx={{
                        fontWeight: "bold",
                        fontSize: "36px",
                        marginTop: "12px",
                        lineHeight: 1.1,
                        letterSpacing: "-1.2px",
                        textShadow: "1px 1px 1px rgba(0, 0, 0, 0.4)",
                      }}
                    >
                      {data.value}
                    </Page.Text>
                  )}
                </Page.Box>
              </Page.Box>
            </Page.Box>
          )}
        </Grid>
      ))}
    </Page.Box>
  );
};
