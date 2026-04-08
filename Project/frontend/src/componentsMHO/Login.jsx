import React, { startTransition } from "react";
import PopUp from "./PopUp";
import {
  Typography,
  Card,
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Fade,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { api, Page, submitWithAjax } from "@/util";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTelemetry } from "@/Context";
import { useToast } from "@/hooks";

function Login({ open, onClose, setOpenSignUp }) {
  const [cardType, setCardType] = React.useState("login");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
        const params = new URLSearchParams(searchParams.toString());
        params.delete("login");
        router.replace(`${pathname}?${params.toString()}`, {
          scroll: false,
        });
      }}
      sx={{
        zIndex: 3300,
        boxShadow: 24,
        overflowY: "auto",
        "& .MuiDialog-paper": {
          margin: 1,
          maxWidth: "unset",
        },
      }}
      slots={{ transition: Fade }}
      slotProps={{
        transition: {
          onExited: () => setCardType("login"),
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      {cardType === "login" ? (
        <LoginCard
          onClose={() => {
            onClose();
            const params = new URLSearchParams(searchParams.toString());
            params.delete("login");
            router.replace(`${pathname}?${params.toString()}`, {
              scroll: false,
            });
          }}
          setCardType={setCardType}
          setOpenSignUp={setOpenSignUp}
        />
      ) : (
        <ForgotCard
          onClose={() => {
            onClose();
            const params = new URLSearchParams(searchParams.toString());
            params.delete("login");
            router.replace(`${pathname}?${params.toString()}`, {
              scroll: false,
            });
          }}
          setCardType={setCardType}
          setOpenSignUp={setOpenSignUp}
        />
      )}
    </Dialog>
  );
}

export default Login;

function LoginCard({ onClose, setCardType, setOpenSignUp }) {
  const [telemetry, router] = [useTelemetry(), useRouter()];
  const [country, setCountry] = React.useState("in");
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [loginType, setLoginType] = React.useState("mail");
  const [phone, setPhone] = React.useState("");

  React.useEffect(() => {
    if (!telemetry) return;
    telemetry.ip().then((resp) => {
      if (resp.country) {
        setCountry(resp.country.toLowerCase());
      }
    });
  }, [telemetry]);

  const options = [
    { label: "Email", value: "mail" },
    { label: "Phone", value: "phone" },
  ];
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        minHeight: "520px",
        width: { xs: "95vw", sm: "430px" },
        px: { xs: 1, md: 3 },
        position: "relative",
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          right: 25,
          top: 20,
          "&:hover": { color: "red" },
        }}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
      <Typography
        sx={{
          width: "100%",
          fontSize: "30px",
          textAlign: "center",
          pt: 9,
          pb: 3,
          fontWeight: 500,
        }}
      >
        Log in
      </Typography>
      <Box
        component="form"
        onSubmit={async (e) => {
          e.preventDefault();
          // console.log(e);
          // let resp = await submitWithAjax(e);
          // console.log(resp);

          setLoading(true);
          try {
            const resp = await submitWithAjax(e);
            switch (resp.status) {
              case "success":
                router.replace("/member/dashboard")
                break;
            
              default:
                setErrorMessage(resp.message);
                setLoading(false);
                break;
            }
          } catch (error) {
            console.log({ error });
            setErrorMessage("Something went wrong.");
            setLoading(false);
          }
        }}
        method="post"
        action="/api/v1/user/login"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 1.8,
        }}
      >
        <Grid direction="column" container size={12} gap={2.5}>
          <ToggleButtonGroup
            value={loginType || ""}
            size="small"
            exclusive
            fullWidth
            onChange={(_, value) => {
              if (value !== null) setLoginType(value);
            }}
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              "& .MuiToggleButton-root": {
                textTransform: "none",
                fontWeight: 600,
                fontSize: 13,
                px: 2,
                py: 0.5,
                color: "secondary.main",
                borderColor: "primary.main",
                bgcolor: "white",
              },
              "& .MuiToggleButton-root.Mui-selected": {
                bgcolor: "primary.main",

                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              },
            }}
          >
            {options.map((option) => (
              <ToggleButton key={option.value} value={option.value}>
                <Typography
                  fontWeight={500}
                  color={loginType === option.value ? "#fff" : "secondary.main"}
                >
                  {option.label}
                </Typography>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          {loginType === "mail" ? (
            <Page.Input
              label="E-Mail Address"
              type="email"
              name="mail"
              variant="outlined"
              required
              autoFocus
              onFocus={(e) => {
                setErrorMessage(null);
              }}
            />
          ) : (
            <PhoneInput
              country={country}
              // onlyCountries={onlyCountries}
              // disableDropdown={true}
              name="phone"
              // value={phone}
              // onChange={(value) => setPhone(value)}
              inputProps={{
                name: "phone",
              }}
              inputStyle={{
                width: "100%",
                height: "34px",
                color: "grey",
                fontSize: "14px",
                borderColor: " #0000003b",
              }}
              inputClass="custom-phone-font"
              specialLabel={""}
            />
          )}
          <Page.Input
            onFocus={(e) => {
              setErrorMessage(null);
            }}
            label="Password"
            type="password"
            name="password"
          />
        </Grid>
        <Grid
          container
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            px: 0.5,
            mt: -1,
          }}
        >
          <Page.Input label="Remember me" type="checkbox" name="remember" />
          <Box
            sx={{ width: "100%" }}
            display="flex"
            justifyContent={{ xs: "center", md: "flex-end" }}
            mt={{ xs: 1, md: -1 }}
          >
            <Page.MuiButton
              color="secondary"
              sx={{
                fontWeight: 500,
                textTransform: "none",
                fontSize: 13,
                "&:hover": {
                  cursor: "pointer",
                  textDecoration: "underline",
                },
              }}
              onClick={() => {
                setCardType("forgot");
              }}
            >
              Forgot your password?
            </Page.MuiButton>
          </Box>
        </Grid>
        {errorMessage && <Page.Error message={errorMessage} />}
        <Page.MuiButton
          type="submit"
          fullWidth
          variant="contained"
          loading={loading}
          color="secondary"
          loadingIndicator="Signing in..."
          sx={{
            borderRadius: "8px",
            padding: "9px",

            color: "white",
            boxShadow: "none",
            fontWeight: "bold",
            transition: "box-shadow 0.3s ease",
            "&:hover": {
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
            },
          }}
        >
          Log in
        </Page.MuiButton>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography>Don&apos;t have an account?&nbsp;</Typography>
          <Page.MuiButton
            component={"span"}
            color="secondary"
            sx={{
              p: 0,
              fontWeight: 500,
              fontSize: 13,

              ml: -0.5,
              textTransform: "none",
              "&:hover": {
                cursor: "pointer",
                textDecoration: "underline",
              },
            }}
            onClick={() => {
              onClose();
              setOpenSignUp(true);
            }}
          >
            Sign up
          </Page.MuiButton>
        </Box>
      </Box>
    </Card>
  );
}

function ForgotCard({ onClose, setCardType, setOpenSignUp }) {
  const [stage, setStage] = React.useState("user"); //user,otp,password
  const [user, setUser] = React.useState("");
  const [timeout, updateTimeout] = React.useState(30);

  React.useEffect(() => {
    setTimeout(() => {
      if (timeout <= 0) return;
      updateTimeout(timeout - 1);
    }, 1000);
  }, [timeout]);

  const form = useForm({});

  async function sendOTP(e) {
    const resp = await api.post(`/api/v1/forgot-password`, { user });
    useToast(resp);
    if (resp.status === "error") return;
    setStage("otp");
  }

  return (
    <Page.Card
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        height: "520px",
        width: { xs: "95vw", sm: "430px" },
        px: 3,

        position: "relative",
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          right: 25,
          top: 20,
          "&:hover": { color: "red" },
        }}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>

      <Page.Text
        sx={{
          width: "100%",
          fontSize: "30px",
          textAlign: "center",
          mt: 9,
          fontWeight: 500,
        }}
      >
        Reset Password
      </Page.Text>
      <Page.Box
        component="form"
        action="/api/v1/forgot-password"
        method="put"
        onSubmit={(e) => {
          e.preventDefault();
          //   submitWithAjax(e);
        }}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          gap: 2,
          py: 6,
        }}
      >
        <Grid container flexDirection="column" gap={2} size={12}>
          {stage === "user" && (
            <>
              <Page.Input
                name="user"
                label="Registered E-mail"
                onChange={(e) => setUser(e.target.value)}
                control={form.control}
              />

              <Page.MuiButton
                variant="contained"
                disabled={!user}
                color="secondary"
                onClick={sendOTP}
                sx={{
                  color: "white",
                  borderRadius: "8px",
                  padding: 1,
                  boxShadow: "none",
                  fontWeight: "bold",
                  transition: "box-shadow 0.3s ease",
                  "&:hover": {
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
                  },
                }}
                endIcon={<SendIcon />}
              >
                Send OTP
              </Page.MuiButton>
            </>
          )}

          {stage === "otp" && (
            <Page.Box
              sx={{
                textAlign: "center",
                borderRadius: 3,
                bgcolor: (theme) => theme.palette.cardbg.main,
                border: "1px solid #f4f4f4",
                p: 4,
              }}
            >
              <Page.Text sx={{ fontWeight: 600 }}>
                A link has been sent to you on your email. Please check your
                inbox and spam folders, find the link and reset your password.
              </Page.Text>
            </Page.Box>
          )}
        </Grid>
        <Grid>
          <Page.Text sx={{ textAlign: "center", color: "grey.700" }}>
            Try to remember your password?&nbsp;
            <Typography
              component={"span"}
              color="secondary"
              sx={{
                fontWeight: 500,
                "&:hover": {
                  cursor: "pointer",
                  textDecoration: "underline",
                },
              }}
              onClick={() => {
                setCardType("login");
              }}
            >
              Login
            </Typography>
          </Page.Text>
          {stage !== "otp" && (
            <Page.Text sx={{ mt: 1, textAlign: "center", color: "grey.700" }}>
              Not a Member?&nbsp;
              <Typography
                component={"span"}
                color="secondary"
                sx={{
                  fontWeight: 500,
                  "&:hover": {
                    cursor: "pointer",
                    textDecoration: "underline",
                  },
                }}
                onClick={() => {
                  onClose();
                  setCardType("login");
                  setOpenSignUp(true);
                }}
              >
                Sign up
              </Typography>
            </Page.Text>
          )}
        </Grid>
      </Page.Box>
    </Page.Card>
  );
}
