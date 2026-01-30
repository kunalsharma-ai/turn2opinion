"use client";
import { useRouter, useSearchParams, redirect } from "next/navigation";
import React from "react";
import Avatar from "@mui/material/Avatar";
import { CircularProgress } from "@mui/material";

import {
  HighlightOff as HighlightOffIcon,
  Mood as MoodIcon,
} from "@mui/icons-material";

import { Page } from "@/util";

function page() {
  const [status, setStatus] = React.useState({ type: "complete" });
  const logo = "/images/logo/My-Health-Opinions.png";
  const background = "/images/logo/groupofpeople.jpg";

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
        {!status.type ? (
          <CircularProgress />
        ) : (
          <Page.Box>
            <Page.Box>
              <img src={logo} alt="Logo" style={{ height: 100 }} />
            </Page.Box>
            <Page.Divider sx={{ mb: 2, width: "90%", mx: "auto" }} />
            <StatusMessage
              type={status.type}
              points={100}
              link="/member/dashboard"
            />
          </Page.Box>
        )}
      </Page.Card>
    </Page.Box>
  );
}
function StatusMessage({ type, points, link }) {
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
        title: <div><h4>You have successfully completed the survey. </h4>
        You have earned <span style={{color:"green"}}>{points}</span> points.</div>,
        info: `Dear user, You have successfully completed this survey. We will reach you for more opportunities soon.`,
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
            mb: 4,
          }}
        >
          {statusMessage.info}
        </Page.Text>
      </Page.Box>

      {link && (
        <Page.MuiButton
          variant="contained"
          color="secondary"
          sx={{
            fontWeight: 600,
            mb: 2,
          }}
          onClick={() => redirect(link)}
        >
          Continue
        </Page.MuiButton>
      )}
    </>
  );
}

export default page;
