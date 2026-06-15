"use client";
import { useRouter, useSearchParams, redirect } from "next/navigation";
import React from "react";
import Avatar from "@mui/material/Avatar";
import { CircularProgress, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

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
          p: { xs: 1, md: 3 },
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
      <Page.Box
        mb={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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

      <Page.Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mb={2}
      >
        <Page.Text mb={1}>
          Your feedback helps us improve future surveys. Please rate your
          experience.
        </Page.Text>
        <StarRating />
      </Page.Box>

      {link && (
        <Page.MuiButton
          variant="contained"
          color="primary"
          sx={{
            fontWeight: 600,
            mt: 1,
            mb: 2,
          }}
          onClick={() => redirect(link)}
        >
          Go to Dashboard
        </Page.MuiButton>
      )}

      {availableSurveys.length !== 0 && (
        <Page.Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Page.Divider sx={{ mb: 2, width: "90%", mx: "auto" }} />
          <Page.Text
            color="text.secondary"
            mt={1}
            sx={{
              maxWidth: { xs: "320px", sm: "640px" },
              textAlign: "center",
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
              maxWidth: { xs: "98vw", sm: "640px" },
              background: "#fff",
              maxHeight: 200,
              overflow: "auto",
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
              <thead
                style={{
                  position: "sticky",
                  top: 0,
                  background: "#f8fafc",
                  zIndex: 2,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
                }}
              >
                <tr
                  style={{
                    background: "#f8fafc",
                  }}
                >
                  <th
                    style={{
                      width: "35%",
                      padding: "4px 8px",
                      fontWeight: 700,
                      borderBottom: "1px solid rgba(0,0,0,0.12)",
                      borderRight: "1px solid rgba(0,0,0,0.08)",
                    }}
                  >
                    Survey Name
                  </th>
                  <th
                    style={{
                      width: "25%",
                      padding: "4px 8px",
                      fontWeight: 700,
                      borderBottom: "1px solid rgba(0,0,0,0.12)",
                      borderRight: "1px solid rgba(0,0,0,0.08)",
                    }}
                  >
                    Time Required
                  </th>
                  <th
                    style={{
                      width: "15%",
                      padding: "4px 8px",
                      fontWeight: 700,
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      borderBottom: "1px solid rgba(0,0,0,0.12)",
                      borderRight: "1px solid rgba(0,0,0,0.08)",
                    }}
                  >
                    Points
                  </th>
                  <th
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
                    key={index}
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
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {survey.loi} minutes (approx)
                    </td>
                    <td
                      style={{
                        padding: "4px 8px",
                        fontSize: 13,
                        whiteSpace: "nowrap",
                        verticalAlign: "middle",
                        borderRight: "1px solid rgba(0,0,0,0.08)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
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
        </Page.Box>
      )}
    </>
  );
}
export default page;

function StarRating() {
  const [value, setValue] = React.useState(3.5);
  const [hover, setHover] = React.useState(-1);

  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  return (
    <Page.Box
      sx={{ width: 200, display: "flex", alignItems: "center", ml: "60px" }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        onChange={(event, newValue) => {
          setValue(newValue);
          // todo: api call to add rating value to response
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Page.Box sx={{ ml: 2 }}>
          {labels[hover !== -1 ? hover : value]}
        </Page.Box>
      )}
    </Page.Box>
  );
}
