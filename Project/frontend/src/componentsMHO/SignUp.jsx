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

const SALUTATION_OPTIONS = [
  { value: "Mr.", label: "Mr.", genderBased: true },
  { value: "Ms.", label: "Ms.", genderBased: true },
  { value: "Mrs.", label: "Mrs.", genderBased: true },
  { value: "Dr.", label: "Dr.", genderBased: false },
  { value: "Prof.", label: "Prof.", genderBased: false },
  { value: "Mx.", label: "Mx.", genderBased: true },
];

const GENDER_SALUTATION_MAP = {
  Male: ["Mr.", "Dr.", "Prof."],
  Female: ["Ms.", "Mrs.", "Dr.", "Prof."],
  Other: ["Mx.", "Dr.", "Prof."],
};

const DEFAULT_SALUTATION_MAP = {
  Male: "Mr.",
  Female: "Ms.",
  Other:"Mx.",
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
  const gender = form.watch("gender");
  const salutation = form.watch("name.salutation");
  React.useEffect(() => {
    if(!gender) return;

    const validSalutation = GENDER_SALUTATION_MAP[gender] || [];
    const defaultSalutation = DEFAULT_SALUTATION_MAP[gender];

    if(!validSalutation.includes(salutation)){
      form.setValue("name.salutation", defaultSalutation, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [gender]);

  return (
    <PopUp
      open={open}
      onClose={() => {
        onClose();
      }}
      hideTitle={true}
      noBorder={status == "signup"}
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
      maxWidth={status !== "signup" ? "sm" : "xl"}
      children={
        <>
          {status == "signup" && (
            <Grid
              size={12}
              container
              sx={{
                maxHeight: { xs: "95vh", lg: "80vh" },
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
                  maxHeight: { xs: "90vh", lg: "80vh" },
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
                          options={
                            gender ? SALUTATION_OPTIONS.filter((option) => GENDER_SALUTATION_MAP[gender]?.includes(
                              option.value,
                            ),
                          )
                          : SALUTATION_OPTIONS
                          }
                          labelText="Sal."
                          required={true}
                          errors={errors?.name?.salutation}
                          validations={user.name.salutation}
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

                    <Grid size={12} container>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Form.Input
                          {...register("mail")}
                          control={control}
                          labelText="Email"
                          required={true}
                          errors={errors?.mail}
                          validations={user.email}
                        />
                      </Grid>

                      <Grid size={{ xs: 12, md: 6 }}>
                        <Form.Phone
                          {...register("phone")}
                          control={control}
                          labelText="Phone"
                          // required={true}
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
                      alignItems="center"
                    >
                      <Captcha
                        onVerified={() => {
                          setBtnDisabled(false);
                        }}
                      />
                    </Grid>

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
                      disabled={btnDisabled || !form.watch("agreedtoterms")}
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
              justifyContent="center"
              alignItems="center"
              sx={{
                // minHeight: { xs: "90vh", md: "80vh" },
                p: { xs: 2, sm: 4, md: 6 },
                border: "1.5px solid #33aaca",
              }}
            >
              <Grid
                size={12}
                container
                direction="column"
                alignItems="center"
                sx={{
                  textAlign: "center",
                }}
              >
                <Page.Box
                  sx={{
                    width: 68,
                    height: 68,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "primary.main",
                    mb: 2.5,
                    boxShadow: "0 8px 24px rgba(12, 91, 219, 0.2)",
                  }}
                >
                  <CheckCircleIcon
                    sx={{
                      fontSize: 40,
                      color: "#fff",
                    }}
                  />
                </Page.Box>

                <Page.Text
                  sx={{
                    color: "primary.dark",
                    fontSize: { xs: "22px", sm: "28px", md: "32px" },
                    fontWeight: 700,
                    lineHeight: 1.25,
                    mb: 1,
                  }}
                >
                  Registration Successful
                </Page.Text>

                <Page.Text
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: "14px", sm: "16px" },
                    fontWeight: 500,
                    mb: 3.5,
                  }}
                >
                  You're almost ready to start participating
                </Page.Text>

                <Page.Box
                  sx={{
                    width: "100%",
                    textAlign: "justify",
                    bgcolor: "#f5f8fc",
                    border: "1px solid #dbe5f0",
                    borderRadius: 3,
                    p: { xs: 2.5, sm: 3.5 },
                    mb: 3,
                  }}
                >
                  <Page.Text
                    sx={{
                      color: "text.primary",
                      fontSize: { xs: "14px", sm: "15px" },
                      lineHeight: 1.7,
                      mb: 2,
                    }}
                  >
                    Thanks for signing up with <strong>Turn2Opinion</strong>, a
                    Business and Consumer Research Panel Community of Frequent
                    Research Fieldwork Solutions Private Limited.
                  </Page.Text>

                  <Page.Text
                    sx={{
                      color: "text.primary",
                      fontSize: { xs: "14px", sm: "15px" },
                      lineHeight: 1.7,
                    }}
                  >
                    Please check your Inbox and Spam folder for your
                    verification email. Click the verification link to confirm
                    your email and activate your account. Once verified, you'll
                    be able to create your password and access research
                    opportunities made just for you.
                  </Page.Text>

                  <Page.Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1,
                      mt: 2.5,
                      bgcolor: "#fff",
                      border: "1px solid #e1e7ef",
                      borderRadius: 2,
                      p: 1.75,
                    }}
                  >
                    <CheckCircleIcon
                      sx={{
                        fontSize: 18,
                        color: "primary.main",
                        mt: 0.2,
                        flexShrink: 0,
                      }}
                    />

                    <Page.Text
                      sx={{
                        color: "text.secondary",
                        fontSize: { xs: "13px", sm: "14px" },
                        lineHeight: 1.6,
                      }}
                    >
                      Your registration is complete. Verify your email to finish
                      activating your account.
                    </Page.Text>
                  </Page.Box>
                </Page.Box>

                <Page.MuiButton
                  variant="contained"
                  color="secondary"
                  sx={{
                    minWidth: { xs: "100%", sm: 160 },
                    minHeight: 46,
                    px: 3,
                    fontSize: 13,
                    fontWeight: 600,
                    textTransform: "none",
                    color: "#fff",
                    borderRadius: 1.5,
                  }}
                  onClick={() => {
                    onClose();
                    router.push("/");
                  }}
                >
                  Go To Home
                </Page.MuiButton>
              </Grid>
            </Grid>
          )}
          {status == "unverified" && (
            <Grid
              size={12}
              container
              justifyContent="center"
              alignItems="center"
              sx={{
                // minHeight: { xs: "90vh", md: "60vh" },
                p: { xs: 2, sm: 4, md: 6 },
                border: "1.5px solid #33aaca",
              }}
            >
              <Grid
                size={12}
                container
                direction="column"
                alignItems="center"
                sx={{
                  textAlign: "center",
                }}
              >
                <Page.Box
                  sx={{
                    width: 68,
                    height: 68,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "primary.main",
                    mb: 2.5,
                    boxShadow: "0 8px 24px rgba(12, 91, 219, 0.2)",
                  }}
                >
                  <ErrorIcon
                    sx={{
                      fontSize: 38,
                      color: "#fff",
                    }}
                  />
                </Page.Box>

                <Page.Text
                  sx={{
                    color: "primary.dark",
                    fontSize: { xs: "22px", sm: "28px", md: "32px" },
                    fontWeight: 700,
                    lineHeight: 1.25,
                    mb: 1,
                  }}
                >
                  Almost There!
                </Page.Text>

                <Page.Text
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: "14px", sm: "16px" },
                    fontWeight: 500,
                    mb: 3.5,
                  }}
                >
                  Verify your email to activate your account
                </Page.Text>

                <Page.Box
                  sx={{
                    width: "100%",
                    bgcolor: "#f5f8fc",
                    border: "1px solid #dbe5f0",
                    borderRadius: 3,
                    p: { xs: 2.5, sm: 3.5 },
                    mb: 3,
                    textAlign: "justify",
                  }}
                >
                  <Page.Text
                    sx={{
                      color: "text.primary",
                      fontSize: { xs: "14px", sm: "15px" },
                      lineHeight: 1.7,
                      mb: 2,
                    }}
                  >
                    Welcome! We're excited to have you. To keep your account
                    secure and ready for surveys, please verify your email
                    address.
                  </Page.Text>

                  <Page.Text
                    sx={{
                      color: "text.primary",
                      fontSize: { xs: "14px", sm: "15px" },
                      lineHeight: 1.7,
                      mb: 2,
                    }}
                  >
                    Check your Inbox and Spam folder for your verification
                    email. Click the verification link to activate your account,
                    create your password, and start accessing research
                    opportunities.
                  </Page.Text>

                  <Page.Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1,
                      bgcolor: "#fff",
                      border: "1px solid #e1e7ef",
                      borderRadius: 2,
                      p: 1.75,
                    }}
                  >
                    <ErrorIcon
                      sx={{
                        fontSize: 18,
                        color: "secondary.main",
                        mt: 0.2,
                        flexShrink: 0,
                      }}
                    />

                    <Page.Text
                      sx={{
                        color: "text.secondary",
                        fontSize: { xs: "13px", sm: "14px" },
                        lineHeight: 1.6,
                      }}
                    >
                      Didn't receive the email or has the link expired? You can
                      request a new verification email below.
                    </Page.Text>
                  </Page.Box>
                </Page.Box>

                <Page.Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 1.5,
                    width: "100%",
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <Page.MuiButton
                    variant="contained"
                    color="secondary"
                    disabled={cooldown > 0}
                    sx={{
                      position: "relative",
                      minWidth: { sm: 230 },
                      minHeight: 46,
                      px: 3,
                      fontSize: 13,
                      fontWeight: 600,
                      textTransform: "none",
                      color: "#fff",
                      borderRadius: 1.5,
                      overflow: "hidden",
                      background:
                        cooldown > 0
                          ? `linear-gradient(
                    to right,
                    #437ad4 ${progress}%,
                    #063686 ${progress}%
                  )`
                          : undefined,

                      "&.Mui-disabled": {
                        color: "#fff !important",
                        opacity: 1,
                        background:
                          cooldown > 0
                            ? `linear-gradient(
              to right,
              #1d4fa3 ${progress}%,
              #063686 ${progress}%
            ) !important`
                            : "#063686 !important",
                        WebkitTextFillColor: "#fff",
                      },
                    }}
                    onClick={async () => {
                    let resp = await api.post("/api/v1/user/resend", {
                      mail: query.verifyemail,
                      action: "resend-otp",
                    });
                      useToast(resp);
                      // setCooldown(RESEND_SECONDS);
                      if(resp?.status !== "error"){
                        setCooldown(60);
                      }
                    }}
                  >
                    {cooldown > 0
                      ? `Resend Email Again in ${cooldown}s`
                      : "Resend Verification Email"}
                  </Page.MuiButton>

                  <Page.MuiButton
                    variant="outlined"
                    color="secondary"
                    sx={{
                      minWidth: { sm: 140 },
                      minHeight: 46,
                      px: 3,
                      fontSize: 13,
                      fontWeight: 600,
                      textTransform: "none",
                      borderRadius: 1.5,
                      borderWidth: 1.5,
                      "&:hover": {
                        borderWidth: 1.5,
                      },
                    }}
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
          {status == "duplicate" && (
            <Grid
              size={12}
              container
              justifyContent="center"
              alignItems="center"
              sx={{
                // minHeight: { xs: "90vh", md: "80vh" },
                p: { xs: 2, sm: 4, md: 6 },
                border: "1.5px solid #33aaca",
              }}
            >
              <Grid
                size={12}
                container
                direction="column"
                alignItems="center"
                sx={{
                  textAlign: "center",
                }}
              >
                <Page.Box
                  sx={{
                    width: 68,
                    height: 68,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "primary.main",
                    mb: 2.5,
                    boxShadow: "0 8px 24px rgba(12, 91, 219, 0.2)",
                  }}
                >
                  <ErrorIcon
                    sx={{
                      fontSize: 38,
                      color: "#fff",
                    }}
                  />
                </Page.Box>

                <Page.Text
                  sx={{
                    color: "primary.dark",
                    fontSize: { xs: "22px", sm: "28px", md: "32px" },
                    fontWeight: 700,
                    lineHeight: 1.25,
                    mb: 1,
                  }}
                >
                  Email Already Registered
                </Page.Text>

                <Page.Text
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: "14px", sm: "16px" },
                    fontWeight: 500,
                    mb: 3.5,
                  }}
                >
                  It looks like you already have an account with us
                </Page.Text>

                <Page.Box
                  sx={{
                    width: "100%",
                    textAlign: "justify",
                    bgcolor: "#f5f8fc",
                    border: "1px solid #dbe5f0",
                    borderRadius: 3,
                    p: { xs: 2.5, sm: 3.5 },
                    mb: 3,
                  }}
                >
                  <Page.Text
                    sx={{
                      color: "text.primary",
                      fontSize: { xs: "14px", sm: "15px" },
                      lineHeight: 1.7,
                      mb: 2,
                    }}
                  >
                    This email address is already registered with Turn2Opinion.
                    Please check your Inbox and Spam folder for your
                    verification email.
                  </Page.Text>

                  <Page.Text
                    sx={{
                      color: "text.primary",
                      fontSize: { xs: "14px", sm: "15px" },
                      lineHeight: 1.7,
                      mb: 2,
                    }}
                  >
                    If you haven't verified your email yet, click the
                    verification link in the email to activate your account.
                    Once verified, you'll be able to create your password and
                    access available research opportunities.
                  </Page.Text>

                  <Page.Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1,
                      bgcolor: "#fff",
                      border: "1px solid #e1e7ef",
                      borderRadius: 2,
                      p: 1.75,
                    }}
                  >
                    <ErrorIcon
                      sx={{
                        fontSize: 18,
                        color: "secondary.main",
                        mt: 0.2,
                        flexShrink: 0,
                      }}
                    />

                    <Page.Text
                      sx={{
                        color: "text.secondary",
                        fontSize: { xs: "13px", sm: "14px" },
                        lineHeight: 1.6,
                      }}
                    >
                      If your verification link has expired, request a new one
                      using the button below.
                    </Page.Text>
                  </Page.Box>
                </Page.Box>

                <Page.Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 1.5,
                    width: "100%",
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <Page.MuiButton
                    variant="contained"
                    color="secondary"
                    disabled={cooldown > 0}
                    sx={{
                      position: "relative",
                      minWidth: { sm: 230 },
                      minHeight: 46,
                      px: 3,
                      fontSize: 13,
                      fontWeight: 600,
                      textTransform: "none",
                      color: "#fff",
                      borderRadius: 1.5,
                      overflow: "hidden",
                      background:
                        cooldown > 0
                          ? `linear-gradient(
                    to right,
                    #1d4fa3 ${progress}%,
                    #063686 ${progress}%
                  )`
                          : undefined,

                      "&.Mui-disabled": {
                        color: "#fff !important",
                        opacity: 1,
                        background:
                          cooldown > 0
                            ? `linear-gradient(
                      to right,
                      #1d4fa3 ${progress}%,
                      #063686 ${progress}%
                    ) !important`
                            : "#063686 !important",
                        WebkitTextFillColor: "#fff",
                      },
                    }}
                    onClick={async () => {
                      let resp = await api.post("/api/v1/user/resend", {
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
                    sx={{
                      minWidth: { sm: 140 },
                      minHeight: 46,
                      px: 3,
                      fontSize: 13,
                      fontWeight: 600,
                      textTransform: "none",
                      borderRadius: 1.5,
                      borderWidth: 1.5,
                      "&:hover": {
                        borderWidth: 1.5,
                      },
                    }}
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
