"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { useMember, useQuery } from "@/Context";
import { Datatable } from "@/components";
import { DateRangeSelector } from "@/components/Form";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import { api, Page } from "@/util";
import { useToast } from "@/hooks";
import { SurveyPoints, CurrentUser } from "@/app/member/components/index";

export default function page() {
  const user = useMember();
  const router = useRouter();
  // React.useEffect(() => {
  //   if (!user) return;
  //   if (
  //     user.terms === null ||
  //     user.terms === undefined ||
  //     user.terms.length === 0
  //   ) {
  //     router.replace("/auth/terms");
  //   }
  //   api
  //     .post(`/api/v1/response`, {
  //       ["survey.slug"]: "welcome",
  //       status: "complete",
  //     })
  //     .then((resp) => {
  //       if ("data" in resp && resp.data.length !== 0) return;
  //       router.replace("/survey?name=welcome");
  //     });
  // }, [user]);
  // if (!user) return <LoadingOverlay />;
  return (
    <Grid container size={12}>
      <Grid
        size={12}
        container
        px={4}
        py={2}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <CurrentUser />
        <SurveyPoints />
      </Grid>
      <Stats />
      <Surveys />
      <SurveyHistory />
    </Grid>
  );
}

function Stats() {
  const [statistics, setStatistics] = React.useState({});
  // React.useEffect(() => {
  //   api
  //     .get(`/api/v1/me/statistics`)
  //     .then((resp) => {
  //       if (!resp.data) return useToast(resp);
  //       let data = resp.data;
  //       setStatistics(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {});
  // }, []);

  const stats = React.useMemo(() => {
    return [
      {
        label: "Survey Participated",
        value: statistics?.total ?? 0,
        icon: "/images/dashboard/totalsurveytaken.png",
      },
      {
        label: "Survey Completed",
        value: statistics?.complete ?? 0,
        icon: "/images/dashboard/completedsurvey.png",
      },
      {
        label: "Rewards Earned (Points)",
        value: statistics?.points ?? 0,
        icon: "/images/dashboard/rewardpoint.png",
      },
      // todo: { label: "Survey Abdoned", value: statistics?.abdoned ?? 0 },
      // todo: { label: "In House Surveys", value: statistics?.internal ?? 0 },
      // todo: { label: "External Surveys", value: statistics?.external ?? 0 },
      {
        label: "Survey Disqualified",
        value: statistics?.disqualified ?? 0,
        icon: "/images/dashboard/disqualifiedsurvey.png",
      },
      {
        label: "Rewards Earned (USD)",
        value: `${((statistics?.points ?? 0) / 100).toMoney("USD")}`,
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
    <Grid
      size={12}
      container
      spacing={2}
      mt={1}
      p={{ xs: 2, md: 3 }}
      justifyContent="center"
      sx={{ border: `1px solid #e0e0e0` }}
    >
      {stats.map((stat, index) => {
        return (
          <Grid
            container
            size={{ xs: 12, md: 6, lg: 4 }}
            key={index}
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
            sx={{
              border:(theme) =>`1px solid ${theme.palette.primary.main}`,  
              bgcolor: (theme) => theme.palette.cardbg.main,
              borderRadius: 4,
              px: { xs: 3, xl: 5 },
              py: 4,
              minHeight: "120px",
            }}
          >
            <Grid
              // size={6}
              direction="column"
              alignItems="flex-start"
              justifyContent="center"
            >
              <Typography fontSize={{ xs: 14, md: 16 }}>
                {stat?.label}
              </Typography>
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: "24px", xl: "26px" },
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                  whiteSpace: "normal",
                }}
              >
                {stat.value.toLocaleString("en-US")}
              </Typography>
            </Grid>

            <Page.Box
              component="img"
              src={stat.icon}
              height={60}
              alt="stats logo"
              // sx={ { filter: "drop-shadow(8px 8px 2px #59ac7781)" } }
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

function Surveys() {
  const [user, query] = [useMember(), useQuery()];
  const [availableSurveys, setAvailableSurveys] = React.useState({});
  // React.useEffect(() => {
  //   api
  //     .get(`/api/v1/me/survey`, {
  //       category: user.category,
  //     })
  //     .then((resp) => {
  //       if (!resp || resp.status === "error") return;
  //       const { data } = resp;
  //       setAvailableSurveys(data);
  //       console.log(data);
  //     });
  // }, [user]);
  const surveys = [
    {
      name: "Your Survey",
      link: "/member/surveys?source=internal",
      description: "Get paid to complete your profile details.",
      isAvailable: Boolean(availableSurveys?.internal),
    },
    {
      name: "Daily Survey",
      link: "/member/surveys?source=sampledge",
      description: "Get paid to complete daily surveys.",
      isAvailable: Boolean(availableSurveys?.sampledge),
    },
    {
      name: "External Survey",
      link: "/member/surveys?source=external",
      description: "Get paid to complete external surveys.",
      isAvailable: Boolean(availableSurveys?.external),
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
            borderBottom:(theme)=> `2px solid ${theme.palette.primary.main}`,
            pb: 0.5,
            my: 2,
          }}
        >
          Available Surveys
        </Typography>
      </Box>
      {surveys.map((survey, index) => {
        return (
          <Grid
            container
            key={index}
            size={{ xs: 12, lg: 4 }}
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={1}
            py={3}
            sx={{
           border:(theme) =>`1px solid ${theme.palette.primary.main}`,  
              bgcolor: (theme) => theme.palette.cardbg.main,
              borderRadius: 4,
              overflow: "hidden",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: "500",
                fontSize: "20px",
              }}
            >
              {survey.name}
            </Typography>{" "}
            <Typography sx={{ fontSize: "16px" }}>
              {survey?.description}
            </Typography>
            <Page.Link
              tabIndex={-1}
              href={!survey.isAvailable ? "#" : survey.link}
              sx={{ cursor: !survey.isAvailable ? "not-allowed" : "pointer" }}
            >
              <Button
                disabled={!survey.isAvailable}
                variant="contained"
                color="secondary"
                sx={{
                  my: 1,
                  px: 2,
                  fontWeight: "600",
                  color: "white",
                  borderRadius: 2,
                }}
              >
                TAKE SURVEY
              </Button>
            </Page.Link>
          </Grid>
        );
      })}
    </Grid>
  );
}

function SurveyHistory() {
  const [user] = [useMember()];
  const [data, setData] = React.useState([]);
  const [dateRange, setDateRange] = React.useState([]);
  React.useEffect(() => {
    if (!user) return;
    let filters = {};
    if (
      Boolean(dateRange) &&
      Boolean(dateRange instanceof Array) &&
      dateRange.length === 2
    )
      filters = { ...filters, dateRange };
    api.post(`/api/v1/response`, filters).then((resp) => {
      setData(resp.data);
    });
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
      render: (info) => new Date(info.timeline.start).toLocaleString(),
      feature: ["sortable", "lockable"],
    },
    {
      id: "loi",
      label: "Length of Interview",
      width: 220,
      render: (info) =>
        (new Date(info.updatedAt) - new Date(info.timeline.start))?.toTime(),
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
        data={data}
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
            borderBottom:(theme)=> `2px solid ${theme.palette.primary.main}`,
              pb: 0.5,
              my: 1,
            }}
          >
            Survey Participations History
          </Typography>
        }
        columns={columns}
      />
    </Grid>
  );
}
