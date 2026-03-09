"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

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
} from "@mui/material";

import {
  Male as MaleIcon,
  Female as FemaleIcon,
  Transgender as OtherIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";

import PopUp from "./PopUp";
import { Form, RequiredLabel } from "@/components";
import { api, Page } from "@/util";
import user from "@/validators/user";
import { useToast } from "@/hooks";
import { useMember, useQuery, useTelemetry } from "@/Context";
import MapComponent from "@/components/Map"; //Temporary Import
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

export default function SignUp({ open, onClose, setOpenLogin }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [telemetry, router] = [useTelemetry(), useRouter()];
  const [status, setStatus] = React.useState("signup"); // signup, success, duplicate
  const [isLoading, setIsLoading] = React.useState(false);
  const [country, setCountry] = React.useState("");
  const [categoryOptions, setCategoryOptions] = React.useState([]);
  const [query, member] = [useQuery(), useMember()];

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
    api.get(`/api/v1/category`).then((resp) => {
      if (resp.status === "error") return useToast(resp);
      setCategoryOptions(
        resp.data.map((cat) => {
          return {
            label: capitalizeName(cat.name),
            value: cat.name,
          };
        }),
      );
    });
  }, []);

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
  React.useEffect(() => {
    if (!telemetry) return;
    telemetry.timezone().then((timezone) => {
      form.setValue("timezone", timezone);
    });
    telemetry.ip().then((resp) => {
      if (resp.country) {
        form.setValue("address.0.country", resp.country.toLowerCase());
        setCountry(resp.country.toLowerCase());
      }
    });
  }, [telemetry]);

  let minDOB = new Date();
  minDOB.setFullYear(minDOB.getFullYear() - 120);
  let maxDOB = new Date();
  maxDOB.setFullYear(maxDOB.getFullYear() - 13);

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
          router.replace("/?login");
        }, 30000);
      } else if (temp?.message?.includes("duplicate")) setStatus("duplicate");
    } catch (error) {
      console.error(error);
      useToast(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <PopUp
      open={open}
      onClose={() => {
        onClose();
        const params = new URLSearchParams(searchParams.toString());
        params.delete("signup");

        router.replace(`${pathname}?${params.toString()}`, {
          scroll: false,
        });
      }}
      hideTitle={true}
      noBorder={true}
      backgroundColor="#dbbea2ff"
      maxWidth={status !== "signup" ? "md" : "xl"}
      DialogSx={{
        "& .MuiDialog-paper": {
          width: "100vw",
          margin: {
            xs: 1,
            sm: "32px",
          },
        },
      }}
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
              <Grid size={{ xs: 0, md: 7.5 }} container>
                <img
                  width={"100%"}
                  // src="images/Professional/personnel-department-specialist.jpg"
                  src="images/home/signup2.jpg"
                  // src="images/home/signup-image5.jpg"
                  loading="eager"
                  alt=""
                  style={{
                    objectFit: "cover",
                    backgroundColor: "white",
                    filter: "brightness(85%)",
                  }}
                />
              </Grid>
              <Grid
                size={{ xs: 12, md: 4.5 }}
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
                    p: { xs: 2, sm: 3 },
                  }}
                >
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
                  <IconButton
                    sx={{
                      "&:hover": { color: "red" },
                    }}
                    onClick={() => {
                      onClose();
                      const params = new URLSearchParams(
                        searchParams.toString(),
                      );
                      params.delete("signup");
                      router.replace(`${pathname}?${params.toString()}`, {
                        scroll: false,
                      });
                    }}
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
                    pb: 4,
                  }}
                >
                  <Page.Text
                    sx={{
                      alignSelf: "flex-start",
                      textAlign: "center",
                      fontSize: { xs: "18px", md: "26px" },
                      fontWeight: 600,
                      color: "secondary.main",

                      mb: 2,
                    }}
                  >
                    Signup
                  </Page.Text>
                  <Grid size={12} container direction="column" spacing={1.2}>
                    <Grid size={12}>
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
                        labelText="Salutation"
                      />
                    </Grid>
                    <Grid size={12}>
                      <Form.Input
                        {...register("name.first")}
                        control={control}
                        labelText="First Name"
                        required={true}
                        errors={errors?.name?.first}
                        validations={user.name.first}
                      />
                    </Grid>
                    <Grid size={12}>
                      <Form.Input
                        {...register("name.last")}
                        control={control}
                        labelText="Last Name"
                        required={true}
                        errors={errors?.name?.last}
                        validations={user.name.last}
                      />
                    </Grid>
                    <GenderRadioGroup
                      name={"gender"}
                      control={control}
                      label="Gender"
                      errors={errors?.gender}
                      validations={user.gender}
                    />
                    <Grid size={12}>
                      <Form.Date
                        {...register("dob")}
                        control={control}
                        labelText="Date of Birth"
                        required={true}
                        dateRange={[minDOB, maxDOB]}
                        errors={errors?.dob}
                        validations={user.dob}
                      />
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

                    <Grid
                      size={12}
                      container
                      spacing={0}
                      alignItems="flex-start"
                      mt={3}
                    >
                      <Form.Checkbox
                        size="medium"
                        {...register("agreedtoterms")}
                        control={control}
                      />
                      <Typography
                        sx={{ flex: 1, ml: -1.5 }}
                        textAlign={"justify"}
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
                      disabled={!Boolean(form.watch("agreedtoterms"))}
                      sx={{
                        my: 2,
                        p: 1,
                        fontSize: 14,
                        fontWeight: 600,
                        textTransform: "none",
                        color: "white",
                      }}
                    >
                      Sign Up
                    </Page.MuiButton>
                  </Grid>
                  <Grid
                    size={12}
                    container
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Page.Text>Already have an account? </Page.Text>
                    <Page.Text
                      sx={{
                        ml: 0.5,
                        color: "secondary.main",
                        cursor: "pointer",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                      onClick={() => {
                        (onClose(), setOpenLogin(true));
                        const params = new URLSearchParams(
                          searchParams.toString(),
                        );
                        params.delete("signup");

                        router.replace(`${pathname}?${params.toString()}`, {
                          scroll: false,
                        });
                      }}
                    >
                      Log in
                    </Page.Text>
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
                <CheckCircleIcon color="primary" sx={{ fontSize: "80px" }} />
                <Page.Text
                  sx={{
                    fontSize: { xs: "18px", md: "26px" },
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  Thanks for signing up with{" "}
                  <Page.Text
                    component="span"
                    sx={{
                      color: "secondary.main",
                      fontSize: { xs: "18px", md: "26px" },
                      fontWeight: 600,
                    }}
                  >
                    Turn 2 Opinion
                  </Page.Text>{" "}
                  - A Frequent Research Panel Community.{" "}
                </Page.Text>
                <Page.Text
                  sx={{
                    fontSize: "16px",
                    fontWeight: 500,
                    textAlign: "center",
                    borderRadius: 5,
                    bgcolor: (theme) => theme.palette.cardbg.main,
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
                  color="secondary"
                  sx={{ fontWeight: "bold", mt: 2, color: "white" }}
                  onClick={onClose}
                >
                  Go To Home
                </Page.MuiButton>
              </Grid>
            </Grid>
          )}
          {status === "duplicate" && (
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
                    bgcolor: (theme) => theme.palette.cardbg.main,
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
                        backgroundColor: "#124d86",
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
          <Grid size={12} container direction="column" spacing={0.5}>
            <Typography sx={{ fontWeight: 500, color: "#555" }}>
              {validations?.required ? <RequiredLabel label={label} /> : label}:
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
                        : "2px solid #dbbea2ff",
                    backgroundColor:
                      field.value === option.value
                        ? "primary.main"
                        : "transparent",
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
