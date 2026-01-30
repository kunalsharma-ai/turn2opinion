"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Grid, List, ListItem } from "@mui/material";
import { api, Page } from "@/util";
import { useMember, useQuery, useTelemetry } from "@/Context";
import { useForm } from "react-hook-form";
import { Form } from "@/components";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import { useToast } from "@/hooks";

export default function page() {
  const [query, telemetry, user] = [useQuery(), useTelemetry(), useMember()];
  const [isLoading, setIsLoading] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [message, setMessage] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    if (!query?.confcode) return;
    setIsLoading(true);
    api
      .post(`/api/v1/change-email`, {
        token: query.confcode,
      })
      .then((resp) => {
        setStatus(resp.status);
        setIsLoading(false);
        localStorage.removeItem("token");
        setMessage(resp.message);
      });
  }, [query]);
  React.useEffect(() => {
    if (!query?.updatecode) return;
    api
      .patch(`/api/v1/change-email`, {
        token: query.updatecode,
      })
      .then((resp) => {
        setStatus(resp.status);
        setMessage(resp.message);
        if (resp.status === "success") {
          router.replace("/member/dashboard");
        }
        localStorage.removeItem("token");
        useToast(resp);
      });
  }, [query]);

  return (
    <Grid
      size={12}
      container
      sx={{
       bgcolor: "#8cb2f333",
        minHeight: "100vh",
        width: "100vw",
      }}
      justifyContent="center"
      alignItems="center"
      p={{ xs: 1, md: 2 }}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={2}
        sx={{
          bgcolor: "white",
          borderRadius: 4,
          boxShadow: 24,
          py: 3,
          px: { xs: 2, md: 4 },
        }}
      >
        {isLoading ? (
          <LoadingOverlay />
        ) : (
          <>
            {status === "error" ? (
              <LinkExpiredMessage />
            ) : (
              <EmailChangedSuccess message={message} />
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
}

function LinkExpiredMessage() {
  return (
    <>
      <Grid
        size={12}
        container
        spacing={4}
        alignItems="center"
        direction="column"
        p={{ xs: 1, md: 6 }}
      >
        <Page.Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={1.5}
        >
          <ErrorIcon color="secondary" sx={{ fontSize: "80px" }} />
          <Page.Text
            component="span"
            sx={{
              color: "secondary.main",
              fontSize: { xs: "18px", md: "26px" },
              fontWeight: 600,
            }}
          >
            Link Expired!
          </Page.Text>{" "}
        </Page.Box>
        <Page.Box
          sx={{
            textAlign: "center",
            borderRadius: 5,
             bgcolor: "#8cb2f333",
            border: "1px solid #f4f4f4",
            p: 4,
          }}
        >
          <Page.Text
            sx={{
              mt: 2,
              fontSize: "16px",
              fontWeight: 500,
              maxWidth: "600px",
            }}
          >
            Verification link you used has expired , please request a new one by
            clicking on <strong>Resend Verification Email</strong> button below.
          </Page.Text>
        </Page.Box>
      </Grid>
    </>
  );
}

function EmailChangedSuccess({ message }) {
  const query = useQuery();
  const router =useRouter()
  return (
    <>
      <Grid
        size={12}
        container
        spacing={4}
        alignItems="center"
        direction="column"
        p={{ xs: 1, md: 6 }}
      >
        <Page.Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={1.5}
        >
          <CheckCircleIcon color="secondary" sx={{ fontSize: "80px" }} />
          <Page.Text
            component="span"
            sx={{
              color: "secondary.main",
              fontSize: { xs: "18px", md: "26px" },
              fontWeight: 600,
            }}
          >
            {query?.confcode
              ? "Current Email Verified!"
              : "Email Changed Succesfully!"}
          </Page.Text>{" "}
        </Page.Box>
        <Page.Box
          sx={{
            textAlign: "center",
            borderRadius: 5,
             bgcolor: "#8cb2f333",
            border: "1px solid #f4f4f4",
            p: 4,
          }}
        >
          <Page.Text
            sx={{
              mt: 2,
              fontSize: "16px",
              fontWeight: 500,
              maxWidth: "600px",
            }}
          >
            {message}
          </Page.Text>
        </Page.Box>
        {!query?.confcode && (
          <Page.Box sx={{ display: "flex", gap: 2 }}>
            <Page.MuiButton
              variant="outlined"
              color="secondary"
              sx={{ fontWeight: "bold", mt: 2, borderWidth: 3 }}
              onClick={() => {
                router.push("/?login");
              }}
            >
              Go To Login
            </Page.MuiButton>
          </Page.Box>
        )}
      </Grid>
    </>
  );
}
