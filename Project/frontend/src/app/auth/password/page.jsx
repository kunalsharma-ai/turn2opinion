"use client";
import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { Grid, List, ListItem } from "@mui/material";
import { api, Page } from "@/util";
import { useQuery, useTelemetry } from "@/Context";
import { useForm } from "react-hook-form";
import { Form } from "@/components";
import ErrorIcon from "@mui/icons-material/Error";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import { useToast } from "@/hooks";

function PasswordPage() {
  const [query, telemetry] = [useQuery(), useTelemetry()];

  const [isLoading, setIsLoading] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    if (!query.user || !query.code) return;
    setIsLoading(true);
    api
      .post(`/api/v1/user/${query.user}`, { code: query.code })
      .then((resp) => {
        setStatus(resp.status);
        if (resp.status === "success") {
          form.setValue("userID", query.user);
          form.setValue("emailOTP", query.code);
        }
      })
      .catch((err) => {
        console.log("Kuch to gadbad hai");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query]);
  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    watch,
    register,
    control,
  } = form;

  const onSubmit = async (data) => {
    console.log(data);
    let resp = await api.patch(`/api/v1/user`, {
      ...data,
      action: "set-password",
    });
    useToast(resp);
    router.replace(`/?login`);
  };

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
              Verification link you used has expired , please request a new one
              by clicking on <strong>Resend Verification Email</strong> button
              below.
            </Page.Text>
          </Page.Box>
          <Page.Box sx={{ display: "flex", gap: 2 }}>
            <Page.MuiButton
              variant="contained"
              color="secondary"
              sx={{ fontWeight: "bold", mt: 2, color: "white" }}
              onClick={async () => {
                let temp = await api.patch(`/api/v1/user/${query.user}`, {
                  action: "resend-otp",
                });
                console.log(temp);
                if (temp.status === "success") setStatus("resent");
              }}
            >
              Resend Verification Email
            </Page.MuiButton>{" "}
            <Page.MuiButton
              variant="outlined"
              color="secondary"
              sx={{ fontWeight: "bold", mt: 2, borderWidth: 3 }}
              onClick={() => {
                router.push("/");
              }}
            >
              Go To Home
            </Page.MuiButton>
          </Page.Box>
        </Grid>
      </>
    );
  }
  function LinkResentSuccessfully() {
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
              Link Resent!
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
              Please check your inbox/Spam and{" "}
              <strong>click the verification link</strong> to confirm your email
              and <strong>activate your account.</strong> Once verified, you
              will be able to create your password and access available surveys
              and research opportunities surveys made just for you!
            </Page.Text>
          </Page.Box>
          <Page.Box sx={{ display: "flex", gap: 2 }}>
            <Page.MuiButton
              variant="outlined"
              color="secondary"
              sx={{ fontWeight: "bold", mt: 2, borderWidth: 3 }}
              onClick={() => {
                router.push("/");
              }}
            >
              Go To Home
            </Page.MuiButton>
          </Page.Box>
        </Grid>
      </>
    );
  }
  return (
    <Grid
      component="form"
      onSubmit={handleSubmit(onSubmit)}
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
            {status === "success" ? (
              <SetPasswordForm form={form} />
            ) : status === "error" ? (
              <LinkExpiredMessage />
             ) : status === "resent" ? (
              <LinkResentSuccessfully />
             ) : (
              <LoadingOverlay />
            )}
          </>
        )}  
      </Grid>
    </Grid>
  );
}
function SetPasswordForm({ form }) {
  const {
    handleSubmit,
    formState: { errors },
    watch,
    register,
    control,
  } = form;
  return (
    <>
      <Page.Box
        sx={{
          height: { xs: 26.8, lg: 42 },
          width: { xs: 180, lg: 282 },
        }}
      >
        <img
          src="/images/logo/t2o-logo.png"
          alt="logo"
          height={"100%"}
          width={"100%"}
        />
      </Page.Box>
      <Page.Text
        sx={{
          fontSize: { xs: "24px", md: "32px" },
          fontWeight: 600,
          color: "secondary.main",
          my: { xs: 1, md: 2 },
        }}
      >
        Create Password
      </Page.Text>

      <Grid size={12}>
        <Page.Text>Enter your Password</Page.Text>
        <Form.Input
          {...register("password")}
          control={control}
          type="password"
          strengthMeter={true}
          errors={errors?.password}
          validations={{
            required: {
              value: true,
              message: "Password is required",
            },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'"\\|,.<>\/?`~])(?!.*\s).{8,}$/,
              message: "Password is insecure, try more complex password",
            },
          }}
        />
      </Grid>

      <Grid size={12}>
        <Page.Text>Confirm Password</Page.Text>
        <Form.Input
          {...register("confirmPassword")}
          control={control}
          type="password"
          errors={errors?.confirmPassword}
          // validations={}
        />
      </Grid>

      <Page.MuiButton
        type="submit"
        // loading={loading}
        loadingIndicator="Creating Password..."
        disabled={
          !watch("password") || watch("password") !== watch("confirmPassword")
        }
        variant="contained"
        color="secondary"
        sx={{ my: 2, fontWeight: 600, width: "100%", p: 1 }}
      >
        Create Password
      </Page.MuiButton>
      <Grid
        sx={{
          borderRadius: 2,
          bgcolor: "#8cb2f333",
          border: "1px solid #f4f4f4",
          py: 2,
          pl: 2,
          pr: { xs: 2, md: 8 },
        }}
      >
        <Page.Text fontSize={13}>Password should have:</Page.Text>
        <List
          sx={{
            listStyleType: "disc",
            pl: 3,
            "& .MuiListItem-root": {
              display: "list-item",
              p: 0.2,
              fontSize: "12px",
            },
          }}
        >
          <ListItem>
            Minimum <b>8 Characters</b>
          </ListItem>
          <ListItem>
            At least <b>One Lowercase Letter</b>
          </ListItem>
          <ListItem>
            At least <b>One Uppercase Letter</b>
          </ListItem>
          <ListItem>
            At least <b>One Number</b>
          </ListItem>
          <ListItem>
            At least <b>One Special Character</b> (e.g., @, #, $, &)
          </ListItem>
        </List>
      </Grid>
    </>
  );
}

export default function Page() {
  return (
    <Suspense>
      <PasswordPage />
    </Suspense>
  )
}

