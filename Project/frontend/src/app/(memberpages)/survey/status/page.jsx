"use client";
import { useRouter, useSearchParams, redirect } from "next/navigation";
import React from "react";
import Avatar from "@mui/material/Avatar";
import { CircularProgress } from "@mui/material";

import {
  HighlightOff as HighlightOffIcon,
  Mood as MoodIcon,
} from "@mui/icons-material";

import { api, loadData, Page } from "@/util";
import { useQuery } from "@/Context";

function page() {
  const [status, setStatus] = React.useState({ type: "terminate", points: 0 });
  const background = "/images/logo/groupofpeople2.jpg";
  const [isLoading, setIsLoading] = React.useState(true);
  const [query] = [useQuery()];
  React.useEffect(() => {
    setIsLoading(true);
    loadData(
      api.patch(`/api/v1/survey/response`, query),
      (resp) => {
        let { data } = resp;
        if (!data) return;
        setStatus({ type: data.status, points: data.points });
      },
      () => {
        setIsLoading(false);
      },
    );
  }, [query]);

  return (
    <Page.Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        background: "linear-gradient(-45deg, #b0d4f0, #d3e9f9, #b0d4f0)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <Page.Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.2,
          zIndex: -2,
        }}
      />
      <Page.Card
        sx={{
          minWidth: { xs: 300, md: 400 },
          minHeight: 300,
          textAlign: "center",
          p: 3,
          mx: 1,
          BoxShadow: 4,
          borderRadius: 4,
        }}
      >
        {isLoading ? (
          <Page.Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 300,
              width: { xs: 300, md: 400 },
            }}
          >
            <CircularProgress />
          </Page.Box>
        ) : (
          <Page.Box>
            <Page.Box
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                mb: 3,
                mt: 1,
              }}
            >
              <img src="/images/logo/t2o-logo.png" alt="logo" width={260} />
            </Page.Box>
            <Page.Divider sx={{ mb: 2, width: "90%", mx: "auto" }} />
            <StatusMessage
              type={status?.type ?? ""}
              points={status?.points ?? 0}
              link="/member/dashboard"
            />
          </Page.Box>
        )}
      </Page.Card>
    </Page.Box>
  );
}

function StatusMessage({ type, points, link }) {
  const [availableSurveys, setAvailableSurveys] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [query, setQuery] = [useQuery()];
  React.useEffect(() => {
    setIsLoading(true);
    loadData(
      api.post("/api/v1/me/survey", {
        status: "new",
      }),
      (resp) => {
        setAvailableSurveys(resp.data);
      },
      () => {
        setIsLoading(false);
      },
    );
  }, []);

  let avatarIcon = <HighlightOffIcon />;
  let statusColor = "#f44336";
  let surveyStatus = "";
  let statusMessage = { title: "", info: "" };

  switch (type) {
    case "speeder":
      surveyStatus = "Under Review !!!";
      statusMessage = {
        title: "Sorry, but your response to this survey seems suspicious.",
        info: `Dear user, Your response to the survey seems suspicious, our team is working on it. We will reach you for more opportunities soon.`,
      };
      break;

    case "terminate":
      surveyStatus = "Terminate !!!";
      statusMessage = {
        title: "Sorry, but you do not qualify for this survey.",
        info: `Dear user, You do not qualify for this survey hence we are terminating your response. We will reach you for more opportunities soon.`,
      };
      break;

    case "overquota":
      surveyStatus = "Overquota !!!";
      statusMessage = {
        title: "Sorry, but we have met the quota for this survey.",
        info: `Dear user, Thank you for your valuable response but we already have reached out the quota for this survey hence your response shall be disgarded. We will reach you for more opportunities soon.`,
      };
      break;

    case "unavailable":
      surveyStatus = "Survey Unavailable !!!";
      statusMessage = {
        title: "Sorry, but this survey is not available at the moment.",
        info: `Dear user, The survey you have requested is not available at this moment. Please reach out with the same link after some time, your response definately makes some difference. We will reach you for more opportunities soon.`,
      };
      break;

    case "complete":
      avatarIcon = <MoodIcon />;
      statusColor = "green";
      surveyStatus = "Complete !!!";
      statusMessage = {
        title: (
          <div>
            <h4>You have successfully completed the survey. </h4>
            You have earned <span style={{ color: "green" }}>
              {points}
            </span>{" "}
            points.
          </div>
        ),
        info:
          availableSurveys.length !== 0
            ? ""
            : `Dear user, You have successfully completed this survey. We will reach you for more opportunities soon.`,
      };
      break;
  }

  return (
    <>
      <Page.Box mb={2}>
        <Page.Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Avatar
            sx={{
              bgcolor: statusColor,
              width: 21,
              height: 21,
            }}
          >
            {avatarIcon}
          </Avatar>

          <Page.Text variant="h6" color={statusColor} fontWeight="bold">
            {surveyStatus}
          </Page.Text>
        </Page.Box>

        <Page.Text
          variant="subtitle1"
          color="text.primary"
          mt={1.5}
          fontWeight="bold"
        >
          {statusMessage.title}
        </Page.Text>

        <Page.Text
          color="text.secondary"
          mt={1}
          sx={{
            maxWidth: { xs: "320px", md: "500px" },
            textAlign: "center",
            fontWeight: 500,
            mb: availableSurveys.length !== 0 ? 0 : 4,
          }}
        >
          {statusMessage.info}
        </Page.Text>
      </Page.Box>

      {link && (
        <Page.MuiButton
          variant="contained"
          color="primary"
          sx={{
            fontWeight: 600,
            mb: 2,
          }}
          onClick={() => redirect(link)}
        >
          Go to Dashboard
        </Page.MuiButton>
      )}

      {availableSurveys.length !== 0 && (
        <>
          <Page.Divider sx={{ mb: 2, width: "90%", mx: "auto" }} />
          <Page.Text
            color="text.secondary"
            mt={1}
            sx={{
              maxWidth: { xs: "320px", md: "640px" },

              fontWeight: 500,
            }}
          >
            More earning opportunities are waiting for you. Please check out the
            available surveys below and earn more points by sharing your
            valuable opinions.
          </Page.Text>

          <Page.Box
            sx={{
              mt: 2,
              border: "1px solid rgba(0,0,0,0.12)",
              borderRadius: 2,
              overflow: "hidden",
              maxWidth: { xs: "320px", md: "640px" },
              background: "#fff",
            }}
          >
            <table
              width="100%"
              cellPadding="0"
              cellSpacing="0"
              style={{
                fontSize: 14,
                color: "#2a3940",
                tableLayout: "fixed",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#f8fafc",
                  }}
                >
                  <td
                    style={{
                      width: "35%",
                      padding: "4px 8px",
                      fontWeight: 700,
                      borderBottom: "1px solid rgba(0,0,0,0.12)",
                      borderRight: "1px solid rgba(0,0,0,0.08)",
                    }}
                  >
                    Survey Name
                  </td>
                  <td
                    style={{
                      width: "25%",
                      padding: "4px 8px",
                      fontWeight: 700,
                      borderBottom: "1px solid rgba(0,0,0,0.12)",
                      borderRight: "1px solid rgba(0,0,0,0.08)",
                    }}
                  >
                    Time Required
                  </td>{" "}
                  <td
                    style={{
                      width: "15%",
                      padding: "4px 8px",
                      fontWeight: 700,
                      borderBottom: "1px solid rgba(0,0,0,0.12)",
                      borderRight: "1px solid rgba(0,0,0,0.08)",
                    }}
                  >
                    Points
                  </td>
                  <td
                    style={{
                      width: "25%",
                      padding: "4px 8px",
                      borderBottom: "1px solid rgba(0,0,0,0.12)",
                    }}
                  />
                </tr>
              </thead>

              <tbody>
                {availableSurveys.map((survey, index, arr) => (
                  <tr
                    key={survey.id}
                    style={{
                      borderBottom:
                        index !== arr.length - 1
                          ? "1px solid rgba(0,0,0,0.08)"
                          : "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#f8fafc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#ffffff";
                    }}
                  >
                    <td
                      style={{
                        padding: "4px 8px",
                        fontSize: 13,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        verticalAlign: "middle",
                        borderRight: "1px solid rgba(0,0,0,0.08)",
                      }}
                    >
                      {survey.name}
                    </td>
                    <td
                      style={{
                        padding: "4px 8px",
                        fontSize: 13,
                        whiteSpace: "nowrap",
                        verticalAlign: "middle",
                        borderRight: "1px solid rgba(0,0,0,0.08)",
                      }}
                    >
                      {survey.loi} minutes (approx)
                    </td>{" "}
                    <td
                      style={{
                        padding: "4px 8px",
                        fontSize: 13,
                        whiteSpace: "nowrap",
                        verticalAlign: "middle",
                        borderRight: "1px solid rgba(0,0,0,0.08)",
                      }}
                    >
                      {survey.points || 50} pts
                    </td>
                    <td
                      style={{
                        padding: "4px 8px",
                        textAlign: "right",
                        verticalAlign: "middle",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Page.MuiButton
                        component="a"
                        href={`/survey?name=${survey.slug}`}
                        size="small"
                        variant="outlined"
                        color="primary"
                        sx={{
                          height: { md: 24 },
                          minWidth: { xs: 50, md: 100 },
                          textAlign: "center",
                        }}
                      >
                        Take Survey
                      </Page.MuiButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Page.Box>
        </>
      )}
    </>
  );
}
export default page;
