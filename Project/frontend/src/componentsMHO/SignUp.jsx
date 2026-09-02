"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Avatar,
  Box,
  IconButton,
  Typography,
  Grid,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormHelperText,
  Tooltip,
  ToggleButtonGroup,
  ToggleButton,
  Collapse,
} from "@mui/material";

import {
  Male as MaleIcon,
  Female as FemaleIcon,
  Transgender as OtherIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";

import {
  Facebook,
  GitHub,
  Google,
  LinkedIn,
  YouTube,
  X,
  Apple,
  Microsoft,
  Login as LoginIcon,
  Instagram,
} from "@mui/icons-material";

import PopUp from "./PopUp";
import { Form, RequiredLabel } from "@/components";
import { api, loadData, Page } from "@/util";
import user from "@/validators/user";
import { useToast } from "@/hooks";
import { useMember, useQuery, useTelemetry } from "@/Context";
import Captcha from "./Captcha";
function capitalizeName(str) {
  if (!str) return "";

  return str
    .toLowerCase()
    .split(/(\W+)/) // split but keep delimiters (spaces, -, ', etc.)
    .map((part) => {
      // capitalize only word parts
      if (/^\w/.test(part)) {
        return part.charAt(0).toUpperCase() + part.slice(1);
      }
      return part;
    })
    .join("");
}
const today = new Date();

const socialIcons = {
  linkedin: <LinkedIn sx={{ color: "#0077B5", fontSize: "28px" }} />,
  facebook: <Facebook sx={{ color: "#1877F2", fontSize: "28px" }} />,
  youtube: <YouTube sx={{ color: "#FF0000", fontSize: "28px" }} />,
  twitter: <X sx={{ color: "black", fontSize: "22px" }} />,
  x: <X sx={{ color: "black", fontSize: "22px" }} />,
  instagram: <Instagram sx={{ color: "#E4405F", fontSize: "22px" }} />,
};

export default function SignUp({
  open,
  onClose,
  setOpenLogin,
  emailUnverified,
}) {
  const [query, member, telemetry, router] = [
    useQuery(),
    useMember(),
    useTelemetry(),
    useRouter(),
  ];
  const [status, setStatus] = React.useState("signup"); // signup, success, duplicate, unverified
  const [isLoading, setIsLoading] = React.useState(false);
  const [country, setCountry] = React.useState("");
  const [btnDisabled, setBtnDisabled] = React.useState(true);
  const form = useForm({
    defaultValues: {
      category: "b2c",
      name: {
        salutation: "Mr.",
        first: "",
        last: "",
      },
      gender: "",
      timezone: "",
      dob: "",
      mail: "",
      phone: "",
      address: [
        {
          tag: "home",
          country: "in",
        },
      ],
    },
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = form;

  const [socials, setSocials] = React.useState([]);

  React.useEffect(() => {
    loadData(api.get("/api/v1/socials"), (resp) => setSocials(resp.data || []));
  }, []);

  const socialsData = socials
    .filter(
      (social) =>
        social?.url &&
        typeof social.url === "string" &&
        social.url.trim() !== "",
    )
    .map((social) => {
      const name = social.platform?.toLowerCase();

      return {
        name,
        link: social.url,
        icon: socialIcons[name] || <LoginIcon />,
      };
    });

  const [providers, setProviders] = React.useState([]);
  React.useEffect(() => {
    api.post("/api/v1/auth/socials", {}).then((resp) => {
      setProviders(resp?.data ?? []);
    });
  }, []);

  const providerIcons = {
    google: <Google />,
    github: <GitHub />,
    facebook: <Facebook />,
    linkedin: <LinkedIn />,
    twitter: <X />,
    x: <X />,
    apple: <Apple />,
    microsoft: <Microsoft />,
  };

  const authProviders = providers.map((provider) => ({
    label: `Continue with ${
      provider.name.charAt(0).toUpperCase() + provider.name.slice(1)
    }`,
    icon: providerIcons[provider.name?.toLowerCase()] || <LoginIcon />,
    href: provider.authUrl,
  }));
  React.useEffect(() => {
    if (emailUnverified) {
      setStatus("unverified");
    }
  }, [emailUnverified]);

  React.useEffect(() => {
    if (!telemetry) return;
    telemetry.timezone().then((timezone) => {
      form.setValue("timezone", timezone);
    });
    telemetry.ip().then((resp) => {
      console.log(resp);
      if (resp.country) {
        form.setValue("address.0.country", resp.country.toLowerCase());
        setCountry(resp.country.toLowerCase());
      }
    });
  }, [telemetry]);

  let minDOB = new Date();
  minDOB.setFullYear(minDOB.getFullYear() - 120);
  let maxDOB = new Date();
  maxDOB.setFullYear(maxDOB.getFullYear() - 14);
  // const isMinor = new Date(form.watch("dob")).isMinor();

  const onSubmit = async (userData) => {
    setIsLoading(true);
    try {
      let { agreedtoterms, ...data } = userData;
      if (Boolean(query?.ref) && query.ref !== "") data.referredBy = query.ref;
      const temp = await api.put("api/v1/user", data);
      useToast(temp);

      if (temp?.status == "success") {
        setStatus("success");
        setTimeout(() => {
          router.replace("/");
        }, 30000);
      } else if (temp?.message?.includes("duplicate")) setStatus("duplicate");
    } catch (error) {
      console.error(error);
      useToast(error);
    } finally {
      setIsLoading(false);
    }
  };

  const RESEND_SECONDS = 60;

  const [cooldown, setCooldown] = React.useState(0);

  React.useEffect(() => {
    if (cooldown <= 0) return;

    const interval = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldown]);
  const progress = ((RESEND_SECONDS - cooldown) / RESEND_SECONDS) * 100;
  React.useEffect(() => {
    let userInfo = form.getValues();
    if ("name" in query) {
      let name = query?.name.split(" ");
      switch (name.length) {
        case 1:
          userInfo.name.first = name[0];
          break;
        case 2:
          userInfo.name.first = name[0];
          userInfo.name.last = name[1];
          break;
        case 3:
          userInfo.name.first = name[0];
          userInfo.name.middle = name[1];
          userInfo.name.last = name[2];
          break;
        default:
          userInfo.name.first = name[0] ?? "";
          userInfo.name.last = name.at(-1) ?? "";
      }
    }
    if ("email" in query) userInfo.mail = query?.email;
    form.reset(userInfo);
  }, [query]);
  const category = form.watch("category");
  return (
    <PopUp
      open={open}
      onClose={() => {
        onClose();
      }}
      hideTitle={true}
      noBorder={true}
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: "primary.main",
        color: "white",
        backgroundImage: "url(/imagest2o/facts-bg-last.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      DialogSx={{
        "& .MuiDialog-paper": {
          width: "100vw",
          margin: {
            xs: 1,
            sm: "32px",
          },
        },
      }}
      maxWidth={status !== "signup" ? "md" : "xl"}
      children={
        <>
          {status == "signup" && (
            <Grid
              size={12}
              container
              sx={{
                maxHeight: { xs: "90vh", lg: "75vh" },
                overflow: "hidden",
                border: 1.5,
                borderColor: "#33aaca",
              }}
            >
              <Grid size={{ xs: 0, lg: 7.5 }} container>
                <img
                  width={"100%"}
                  src="images/home/signup2.jpg"
                  loading="eager"
                  alt=""
                  style={{
                    objectFit: "cover",
                    backgroundColor: "white",
                    filter: "brightness(80%)",
                  }}
                />
              </Grid>
              <Grid
                size={{ xs: 12, lg: 4.5 }}
                container
                sx={{
                  maxHeight: { xs: "90vh", lg: "75vh" },
                  overflowY: "auto",
                  position: "relative",
                }}
              >
                <Grid
                  size={12}
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    position: "sticky",
                    bgcolor: "#f1f4f9",
                    zIndex: 4444,
                    top: 0,
                    right: 0,
                    px: 2,
                  }}
                >
                  <Page.Box
                    sx={{
                      position: "relative",
                      pt: 2,
                      // pt: 3
                    }}
                  >
                    <Page.Box
                      sx={{
                        height: 60,
                        // width: { xs: "180px", md: "300px" },
                      }}
                    >
                      <img
                        src="/images/logo/t2o-logo.png"
                        alt="logo"
                        height="100%"
                      />
                    </Page.Box>{" "}
                  </Page.Box>
                  <IconButton
                    sx={{
                      "&:hover": { color: "red" },
                    }}
                    onClick={onClose}
                  >
                    <CloseIcon sx={{ fontSize: { xs: "16px", md: "26px" } }} />
                  </IconButton>
                </Grid>
                <Grid
                  component="form"
                  size={12}
                  container
                  direction="column"
                  alignItems="center"
                  onSubmit={handleSubmit(onSubmit, (errors) => {
                    console.log(errors);
                  })}
                  spacing={0}
                  sx={{
                    px: { xs: 2, md: 4 },
                    pb: 2,
                  }}
                >
                  <Page.Text
                    sx={{
                      alignSelf: "flex-start",
                      textAlign: "center",
                      fontSize: { xs: "18px", md: "24px" },
                      fontWeight: 600,
                      color: "secondary.main",

                      my: 1,
                    }}
                  >
                    Signup
                  </Page.Text>
                  <Grid size={12} container direction="column" spacing={1.2}>
                    <Grid
                      size={12}
                      container
                      direction="row"
                      style={{ alignItems: "flex-end" }}
                    >
                      <Grid size={{ xs: 12, md: 2.2 }}>
                        <Form.Select
                          {...register("name.salutation")}
                          control={control}
                          options={[
                            { value: "Mr.", label: "Mr." },
                            { value: "Ms.", label: "Ms." },
                            { value: "Mrs.", label: "Mrs." },
                            { value: "Dr.", label: "Dr." },
                            { value: "Prof.", label: "Prof." },
                            { value: "Mx. ", label: "Mx." },
                          ]}
                          labelText="Sal."
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 4.9 }}>
                        <Form.Input
                          {...register("name.first")}
                          control={control}
                          labelText="First Name"
                          required={true}
                          errors={errors?.name?.first}
                          validations={user.name.first}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 4.9 }}>
                        <Form.Input
                          {...register("name.last")}
                          control={control}
                          labelText="Last Name"
                          required={true}
                          errors={errors?.name?.last}
                          validations={user.name.last}
                        />
                      </Grid>
                    </Grid>

                    <Grid size={12}>
                      <Form.Input
                        {...register("mail")}
                        control={control}
                        labelText="Email"
                        required={true}
                        errors={errors?.mail}
                        validations={user.email}
                      />
                    </Grid>

                    <Grid size={12}>
                      <Form.Phone
                        {...register("phone")}
                        control={control}
                        labelText="Phone"
                        required={true}
                        // onlyCountries={ [country] }
                        selectedCountry={country}
                        disableDropdown={Boolean(country)}
                        validations={user.phone}
                        errors={errors?.phone}
                        onBlur={(e) => {
                          console.log(form.getValues());
                        }}
                      />
                    </Grid>

                    <Grid size={12} container direction="row">
                      <Grid size={6}>
                        <Form.Date
                          {...register("dob")}
                          control={control}
                          labelText="Date of Birth"
                          required={true}
                          dateRange={[minDOB, maxDOB]}
                          errors={errors?.dob}
                          validations={user.dob}
                          onOutOfBound={(e, value) => {
                            if (!value) return;
                            alert(
                              "You are not meeting our age criteria, Type your date of birth again",
                            );
                            e.target.focus();
                          }}
                        />
                      </Grid>{" "}
                      <Grid size={6}>
                        <GenderRadioGroup
                          name={"gender"}
                          control={control}
                          label="Gender"
                          errors={errors?.gender}
                          validations={user.gender}
                        />
                      </Grid>
                    </Grid>
                    <Collapse in={!!btnDisabled} sx={{ width: "100%" }}>
                      <Grid
                        sx={{
                          py: 1,
                          my: 1,
                          px: 2,
                          border: "1px solid",
                          borderColor: "divider",
                          bgcolor: "#fff",
                          borderRadius: 2,
                        }}
                        size={12}
                        container
                        direction="row"
                        alignItems="center"
                      >
                        <Captcha
                          onVerified={() => {
                            setBtnDisabled(false);
                          }}
                        />
                      </Grid>
                    </Collapse>
                    <Grid
                      size={12}
                      container
                      spacing={0}
                      alignItems="flex-start"
                    >
                      <Form.Checkbox
                        size="medium"
                        {...register("agreedtoterms")}
                        control={control}
                      />
                      <Typography
                        sx={{ flex: 1, ml: -1.5, textAlign: "justify" }}
                      >
                        I agree for Turn2Opinion Panel to use my information for
                        the purposes of determining my eligibility and for
                        contacting me in relation to participation in market
                        research surveys. Also, I am agreeing to{" "}
                        <Typography
                          component={"a"}
                          href="/terms"
                          target="_blank"
                          sx={{
                            textDecoration: "underline",
                            color: "secondary.main",
                          }}
                        >
                          Terms & Conditions
                        </Typography>{" "}
                        and{" "}
                        <Typography
                          component={"a"}
                          href="/privacy"
                          target="_blank"
                          sx={{
                            textDecoration: "underline",
                            color: "secondary.main",
                          }}
                        >
                          Privacy Policy.
                        </Typography>
                      </Typography>
                    </Grid>
                    <Page.MuiButton
                      type="submit"
                      variant="contained"
                      color="secondary"
                      loading={isLoading}
                      loadingIndicator="Signing Up..."
                      disabled={
                        // !Boolean(form.watch("agreedtoterms")) &&
                        // !Boolean(form.watch("parent.email")) &&
                        !!btnDisabled
                      }
                      sx={{
                        bgcolor: "secondary.main",
                        mt: 2,
                        mb: 1,
                        p: 1,
                        fontSize: 14,
                        fontWeight: 600,
                        textTransform: "none",
                        color: "white",
                      }}
                    >
                      Sign Up
                    </Page.MuiButton>
                    {!query?.email && (
                      <>
                        {authProviders.length > 0 && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              my: 0.5,
                            }}
                          >
                            <Box
                              sx={{
                                flex: 1,
                                height: "1px",
                                bgcolor: "divider",
                              }}
                            />

                            <Typography
                              variant="body2"
                              sx={{
                                color: "text.secondary",
                                fontSize: 13,
                                whiteSpace: "nowrap",
                              }}
                            >
                              or continue with
                            </Typography>

                            <Box
                              sx={{
                                flex: 1,
                                height: "1px",
                                bgcolor: "divider",
                              }}
                            />
                          </Box>
                        )}
                        {authProviders.length <= 2 ? (
                          <Box display="flex" flexDirection="column" gap={1}>
                            {authProviders.map((provider, i) => (
                              <Page.MuiButton
                                component={"a"}
                                href={provider.href}
                                key={i}
                                fullWidth
                                variant="outlined"
                                color="secondary"
                                startIcon={provider.icon}
                                sx={{
                                  borderRadius: "8px",
                                  padding: "9px",
                                  fontWeight: 600,
                                  textTransform: "none",
                                  borderWidth: "1px",
                                  "&:hover": {
                                    borderWidth: "1px",
                                    backgroundColor: "transparent",
                                  },
                                }}
                              >
                                {provider.label}
                              </Page.MuiButton>
                            ))}
                          </Box>
                        ) : (
                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            gap={{ xs: 0.8, sm: 1.5 }}
                            flexWrap="wrap"
                            mb={0.5}
                          >
                            {authProviders.map((provider, i) => (
                              <IconButton
                                component={"a"}
                                href={provider.href}
                                onClick={provider.onClick}
                                key={i}
                                title={provider?.label}
                                sx={{
                                  border: "1px solid",
                                  borderColor: "secondary.main",
                                  color: "secondary.main",
                                  width: 42,
                                  height: 42,
                                  transition: "all 0.2s ease",
                                  "&:hover": {
                                    backgroundColor: "action.hover",
                                    transform: "translateY(-1px)",
                                  },
                                }}
                              >
                                {provider.icon}
                              </IconButton>
                            ))}
                          </Box>
                        )}
                      </>
                    )}
                    <Grid
                      size={12}
                      container
                      justifyContent="center"
                      alignItems="center"
                      mt={1}
                    >
                      <Page.Text>Already have an account?</Page.Text>
                      <Page.Text
                        sx={{
                          color: "secondary.main",
                          cursor: "pointer",
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                        onClick={() => {
                          (onClose(), setOpenLogin(true));
                        }}
                      >
                        Log in
                      </Page.Text>
                    </Grid>
                    {socialsData.length > 0 && (
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="center"
                        spacing={4}
                        sx={{
                          borderTop: "1px solid",
                          borderColor: "divider",
                          pt: 2,
                          mt: 1,
                        }}
                      >
                        <Page.Text
                          sx={{ fontSize: "13px", color: "text.secondary" }}
                        >
                          Follow us on
                        </Page.Text>
                        <Page.Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "20px",

                            justifyContent: "center",
                            alignItems: "center",
                            listStyle: "none",
                            textDecoration: "none",
                          }}
                        >
                          {socialsData.map((social) => (
                            <Page.Link
                              key={social.name}
                              href={social.link}
                              underline="none"
                              target="_blank"
                            >
                              {social.icon}
                            </Page.Link>
                          ))}
                        </Page.Box>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
          {status == "success" && (
            <Grid
              size={12}
              container
              alignItems="center"
              sx={{
                minHeight: { xs: "80vh", sm: "70vh" },
                p: { xs: 1, md: 6 },
                border: 1.5,
                borderColor: "#33aaca",
              }}
            >
              <Page.Box
                sx={{
                  width: "100%",
                  height: 60,
                  display: "flex",
                  justifyContent: "center",
                  mb: 1.5,
                }}
              >
                <img src="/images/logo/t2o-logo.png" alt="logo" height="100%" />
              </Page.Box>
              <Grid
                size={12}
                container
                spacing={{ xs: 1, sm: 3 }}
                alignItems="center"
                direction="column"
                justifyContent="center"
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 3,
                  p: { xs: 3, sm: 6 },
                  // bgcolor: "#8cb2f333",
                  color: (theme) => theme.palette.cardtext.main,
                  bgcolor: (theme) => theme.palette.cardbgdark.main,
                  flex: 1,
                }}
              >
                <CheckCircleIcon color="primary" sx={{ fontSize: "60px" }} />
                <Page.Text
                  sx={{
                    fontSize: { xs: "18px", md: "22px" },
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  Thanks for signing up with{" "}
                  <Page.Text
                    component="span"
                    sx={{
                      color: "#fff",
                      fontSize: { xs: "18px", md: "22px" },
                      fontWeight: 700,
                    }}
                  >
                    Turn2Opinion
                  </Page.Text>{" "}
                  - A Business and Consumer Research Panel Community of Frequent
                  Research Fieldwork Solutions Private Limited
                  {/* - A Frequent Research Panel Community.{" "} */}
                </Page.Text>
                <Page.Text
                  sx={{
                    fontSize: "15px",
                    fontWeight: 500,
                    textAlign: "center",
                    borderRadius: 5,
                    color: (theme) => theme.palette.cardtext.main,
                    bgcolor: (theme) => theme.palette.cardbgdark.main,
                    // bgcolor: "#fff",
                    border: "1px solid #f4f4f4",
                    p: 4,
                  }}
                >
                  Please check your inbox/Spam and{" "}
                  <strong>click the verification link</strong> to confirm your
                  email and <strong>activate your account.</strong> Once
                  verified, you will be able to create your password and access
                  available surveys and research opportunities surveys made just
                  for you!
                </Page.Text>
                <Page.MuiButton
                  variant="contained"
                  // color="secondary"
                  sx={{ fontWeight: "bold", mt: 2, color: "white" }}
                  onClick={onClose}
                >
                  Go To Home
                </Page.MuiButton>
              </Grid>
            </Grid>
          )}
          {status == "duplicate" && (
            <Grid
              size={12}
              container
              alignItems="center"
              sx={{
                minHeight: { xs: "90vh", lg: "80vh" },
                p: { xs: 1, md: 6 },
                border: 1.5,
                borderColor: "#33aaca",
              }}
            >
              <Grid
                size={12}
                container
                spacing={4}
                alignItems="center"
                direction="column"
              >
                <ErrorIcon color="primary" sx={{ fontSize: "80px" }} />
                <Page.Text
                  component="span"
                  sx={{
                    color: "secondary.main",
                    fontSize: { xs: "18px", md: "26px" },
                    fontWeight: 600,
                  }}
                >
                  Email Already Registered
                </Page.Text>{" "}
                <Page.Box
                  sx={{
                    textAlign: "center",
                    borderRadius: 5,
                    // bgcolor: "#8cb2f333",
                    color: (theme) => theme.palette.cardtext.main,
                    bgcolor: (theme) => theme.palette.cardbgdark.main,
                    border: "1px solid #f4f4f4",
                    p: 4,
                  }}
                >
                  <Page.Text
                    sx={{
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                  >
                    Please check your inbox/Spam and{" "}
                    <strong>click the verification link</strong> to confirm your
                    email and <strong>activate your account.</strong> Once
                    verified, you will be able to create your password and
                    access available surveys and research opportunities surveys
                    made just for you!
                  </Page.Text>
                  <Page.Text
                    sx={{
                      mt: 2,
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                  >
                    In case, verification link is expired, please request a new
                    one by clicking on{" "}
                    <strong>Resend Verification Email</strong> button below.
                  </Page.Text>
                </Page.Box>
                <Page.Box sx={{ display: "flex", gap: 2 }}>
                  <Page.MuiButton
                    variant="contained"
                    color="secondary"
                    disabled={cooldown > 0}
                    sx={{
                      position: "relative",
                      fontWeight: "bold",
                      mt: 2,
                      color: "white",
                      background:
                        cooldown > 0
                          ? `linear-gradient(to right,
            #437ad4 ${progress}%,
            rgba(255,255,255,0.2) ${progress}%
          )`
                          : undefined,
                      padding: "12px 24px",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: 3,
                        backgroundColor: "#063686",
                        borderRadius: "999px",
                        zIndex: -1,
                      },
                      "& > span": {
                        position: "relative",
                        zIndex: 1,
                      },
                    }}
                    onClick={async () => {
                      let resp = await api.post(`/api/v1/user/resend`, {
                        ...form.watch(),
                        action: "resend-otp",
                      });
                      useToast(resp);
                      setCooldown(RESEND_SECONDS);
                    }}
                  >
                    {cooldown > 0
                      ? `Resend Email Again in ${cooldown}s`
                      : "Resend Verification Email"}
                  </Page.MuiButton>

                  <Page.MuiButton
                    variant="outlined"
                    color="secondary"
                    sx={{ fontWeight: "bold", mt: 2, borderWidth: 3 }}
                    onClick={onClose}
                  >
                    Go To Home
                  </Page.MuiButton>
                </Page.Box>
              </Grid>
            </Grid>
          )}

          {status == "unverified" && (
            <Grid
              size={12}
              container
              alignItems="center"
              sx={{
                minHeight: { xs: "90vh", lg: "80vh" },
                p: { xs: 1, md: 6 },
                border: 1.5,
                borderColor: "#33aaca",
              }}
            >
              <Grid
                size={12}
                container
                spacing={4}
                alignItems="center"
                direction="column"
              >
                <ErrorIcon color="primary" sx={{ fontSize: "80px" }} />
                <Page.Text
                  component="span"
                  sx={{
                    color: "secondary.main",
                    fontSize: { xs: "18px", md: "26px" },
                    fontWeight: 600,
                  }}
                >
                  Email Already Registered
                </Page.Text>{" "}
                <Page.Box
                  sx={{
                    textAlign: "center",
                    borderRadius: 5,
                    // bgcolor: "#8cb2f333",
                    color: (theme) => theme.palette.cardtext.main,
                    bgcolor: (theme) => theme.palette.cardbgdark.main,
                    border: "1px solid #f4f4f4",
                    p: 4,
                  }}
                >
                  <Page.Text
                    sx={{
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                  >
                    Please check your inbox/Spam and{" "}
                    <strong>click the verification link</strong> to confirm your
                    email and <strong>activate your account.</strong> Once
                    verified, you will be able to create your password and
                    access available surveys and research opportunities surveys
                    made just for you!
                  </Page.Text>
                  <Page.Text
                    sx={{
                      mt: 2,
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                  >
                    In case, verification link is expired, please request a new
                    one by clicking on{" "}
                    <strong>Resend Verification Email</strong> button below.
                  </Page.Text>
                </Page.Box>
                <Page.Box sx={{ display: "flex", gap: 2 }}>
                  <Page.MuiButton
                    variant="contained"
                    color="secondary"
                    disabled={cooldown > 0}
                    sx={{
                      position: "relative",
                      fontWeight: "bold",
                      mt: 2,
                      color: "white",
                      background:
                        cooldown > 0
                          ? `linear-gradient(to right,
            #437ad4 ${progress}%,
            rgba(255,255,255,0.2) ${progress}%
          )`
                          : undefined,
                      padding: "12px 24px",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: 3,
                        backgroundColor: "#063686",
                        borderRadius: "999px",
                        zIndex: -1,
                      },
                      "& > span": {
                        position: "relative",
                        zIndex: 1,
                      },
                    }}
                    onClick={async () => {
                      let resp = await api.post(`/api/v1/user/resend`, {
                        mail: query.verifyemail,
                        action: "resend-otp",
                      });
                      useToast(resp);
                      setCooldown(RESEND_SECONDS);
                    }}
                  >
                    {cooldown > 0
                      ? `Resend Email Again in ${cooldown}s`
                      : "Resend Verification Email"}
                  </Page.MuiButton>

                  <Page.MuiButton
                    variant="outlined"
                    color="secondary"
                    sx={{ fontWeight: "bold", mt: 2, borderWidth: 3 }}
                    onClick={() => {
                      onClose();
                      router.push("/");
                    }}
                  >
                    Go To Home
                  </Page.MuiButton>
                </Page.Box>
              </Grid>
            </Grid>
          )}
        </>
      }
    />
  );
}

function GenderRadioGroup({
  name,
  errors,
  control,
  label = "Gender",
  validations,
  isDisabled = false,
}) {
  const hasError = !!errors;
  const errorMessage = errors?.message;

  const options = [
    { label: "Male", value: "Male", icon: <MaleIcon /> },
    { label: "Female", value: "Female", icon: <FemaleIcon /> },
    { label: "Other", value: "Other", icon: <OtherIcon /> },
  ];

  return (
    <Controller
      name={name}
      control={control}
      rules={validations}
      render={({ field }) => (
        <FormControl
          component="fieldset"
          error={hasError}
          disabled={isDisabled}
          fullWidth
          sx={{
            display: "flex",
          }}
        >
          <Grid size={12} container direction="column" spacing={0}>
            <Typography sx={{ fontWeight: 500, color: "#555" }}>
              {validations?.required ? <RequiredLabel label={label} /> : label}
            </Typography>

            <RadioGroup
              row
              value={field.value || ""}
              onChange={(e) => field.onChange(e.target.value)}
              sx={{
                display: "flex",
                gap: 1.5,
                minHeight: 36,
                alignItems: "center",
              }}
            >
              {options.map((option) => (
                <Page.Box
                  key={option.value}
                  sx={{
                    border:
                      field.value === option.value
                        ? "none"
                        : "2px solid #0c5bdb50",
                    backgroundColor:
                      field.value === option.value ? "#063686" : "transparent",
                    borderRadius: 1,
                    transition: "background-color 0.2s ease",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 32,
                    height: 32,
                    "&:hover": {
                      backgroundColor:
                        field.value === option.value
                          ? "primary.main"
                          : "action.hover",
                    },
                  }}
                >
                  <Tooltip title={option.label} placement="top">
                    <FormControlLabel
                      value={option.value}
                      control={
                        <Radio
                          checked={field.value === option.value}
                          icon={option.icon}
                          checkedIcon={option.icon}
                          aria-label={option.label}
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: 22,
                              color: hasError
                                ? "error.main"
                                : field.value === option.value
                                  ? "white"
                                  : "secondary.main",
                            },
                          }}
                        />
                      }
                      sx={{
                        m: 0,
                      }}
                    />
                  </Tooltip>
                </Page.Box>
              ))}
            </RadioGroup>
          </Grid>
          {hasError && errorMessage && (
            <FormHelperText sx={{ fontSize: "12px", mx: 0 }}>
              {errorMessage}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}

function AccountTypeButtonGroup({
  name = "category",
  control,
  validations,
  errors,
  isDisabled = false,
  options,
}) {
  const hasError = !!errors;
  const errorMessage = errors?.message;

  return (
    <Controller
      name={name}
      control={control}
      rules={validations}
      render={({ field }) => (
        <FormControl fullWidth error={hasError} disabled={isDisabled}>
          <ToggleButtonGroup
            value={field.value || ""}
            size="small"
            exclusive
            onChange={(_, value) => {
              if (value !== null) field.onChange(value);
            }}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              flexWrap: "nowrap",
              "& .MuiToggleButton-root": {
                textTransform: "none",
                fontWeight: 600,
                fontSize: 13,
                px: 2,
                py: 0.5,
                color: errorMessage ? "red" : "secondary.main",
                borderColor: errorMessage ? "red" : "secondary.main",
              },
              "& .Mui-selected": {
                backgroundColor: "#016550 !important",
                color: "#fff !important",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              },

              // xs only rounded corners
              "@media (max-width: 600px)": {
                "& .MuiToggleButton-root": {
                  borderRadius: 0,
                  flex: 1,
                  width: "100%",
                  justifyContent: "center",
                },
                "& .MuiToggleButton-root:first-of-type": {
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                },
                "& .MuiToggleButton-root:last-of-type": {
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                },
                "& .MuiToggleButton-root:not(:first-of-type)": {
                  borderTop: "none",
                },
              },
            }}
          >
            {options.map((option) => (
              <ToggleButton key={option.value} value={option.value}>
                {option.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          {errorMessage && (
            <Page.Text sx={{ color: "red", fontSize: "11px" }}>
              {errorMessage}
            </Page.Text>
          )}
        </FormControl>
      )}
    />
  );
}
