"use client";
import React from "react";
import { api, Page } from "@/util";
import {
  Grid,
  Box,
  Typography,
  IconButton,
  Button,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  Collapse,
} from "@mui/material";
import { Terms } from "@/app/(memberpages)/auth/terms/page";
import { useMember } from "@/Context";
import { useDebounce, useToast } from "@/hooks";

export default function page() {
  return (
    <Grid
      size={12}
      container
      spacing={2}
      py={2}
      px={{ xs: 2, md: 3 }}
      justifyContent="center"
      alignItems={"flex-start"}
    >
      <ChangePassword />
      <SurveyNotification />
      <Grid size={12}>
        <ChangeEmail />
      </Grid>
      <TermsAndConditions />
    </Grid>
  );
}

function ChangePassword() {
  const [inputs, setInputs] = React.useState({
    oldPassword: "",
    newPassword: "",
    cnfPassword: "",
  });
  return (
    <Grid
      size={{ xs: 12, md: 6 }}
      container
      spacing={2}
      component="form"
      onSubmit={async (e) => {
        e.preventDefault();
        let resp = await api.patch(`/api/v1/me`, inputs);
        useToast(resp);
        if (resp.status === "success")
          setInputs({
            oldPassword: "",
            newPassword: "",
            cnfPassword: "",
          });
      }}
    >
      <Box
        width="100%"
        display={"flex"}
        alignItems="center"
        justifyContent={"space-between"}
        px={1}
        pt={1}
      >
        <Typography
          sx={{
            fontSize: "16px",
            display: "inline-block",
            fontWeight: 600,
            borderBottom:(theme)=> `2px solid ${theme.palette.primary.main}`,
            pb: 0.5,
          }}
        >
          Change Password
        </Typography>
      </Box>

      <Grid
        container
        size={12}
        direction="column"
        spacing={2}
        px={2}
        py={2}
        sx={{
        border:(theme) =>`1px solid ${theme.palette.primary.main}`,  
              bgcolor: (theme) => theme.palette.cardbg.main,
          borderRadius: 2,
        }}
      >
        <Page.Input
          label="Current Password"
          type="password"
          name="password"
          onChange={(e) => {
            setInputs({ ...inputs, oldPassword: e?.target?.value ?? "" });
          }}
          sx={{ bgcolor: "white" }}
        />
        <Page.Input
          label="New Password"
          type="password"
          name="newPassword"
          strengthMeter={true}
          onChange={(e) => {
            setInputs({ ...inputs, newPassword: e?.target?.value ?? "" });
          }}
          sx={{ bgcolor: "white" }}
        />
        <Page.Input
          label="Confirm New Password"
          type="password"
          name="cnfPassword"
          match="newPassword"
          sx={{ bgcolor: "white" }}
          onChange={(e) => {
            setInputs({ ...inputs, cnfPassword: e?.target?.value ?? "" });
          }}
        />
      </Grid>

      <Button
        type="submit"
        variant="contained"
        color="secondary"
        disabled={
          inputs.cnfPassword !== inputs.newPassword || inputs.newPassword === ""
        }
        sx={{
          ml: 1,
          color: "white",
          px: 2,
          fontWeight: 600,
        }}
      >
        Change Password
      </Button>
    </Grid>
  );
}

function SurveyNotification() {
  const [selected, setSelected] = React.useState([]);
  const [user] = [useMember()];
  React.useEffect(() => {
    if (!user) return;
    api
      .post(`/api/v1/me`, { questions: ["communication-methods"] })
      .then((resp) => {
        setSelected(resp.data["communication-methods"] ?? []);
      });
  }, [user]);

  const options = [
    { label: "By E-Mail", value: "email" },
    { label: "By SMS (Short Message Service)", value: "sms" },
    { label: "By Phone Call", value: "phone" },
    { label: "By Dashboard Notifications", value: "dashboard" },
    { label: "By Whatsapp", value: "whatsapp" },
  ];

  return (
    <Grid size={{ xs: 12, md: 6 }} container spacing={2}>
      <Box
        width="100%"
        display={"flex"}
        alignItems="center"
        justifyContent={"space-between"}
        px={1}
        pt={1}
      >
        <Typography
          sx={{
            fontSize: "16px",
            display: "inline-block",
            fontWeight: "600",
          borderBottom:(theme)=> `2px solid ${theme.palette.primary.main}`,
            pb: 0.5,
          }}
        >
          Survey Notification
        </Typography>
      </Box>

      <Grid
        container
        size={12}
        direction="column"
        spacing={0}
        px={2}
        py={2}
        sx={{
          border:(theme) =>`1px solid ${theme.palette.primary.main}`,  
              bgcolor: (theme) => theme.palette.cardbg.main,
          borderRadius: 2,
        }}
      >
        <Typography fontSize={16} my={1}>
          How do you like to be notified for new survey
        </Typography>

        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                checked={selected.includes(option.value)}
                onChange={(e) => {
                  selected.includes(option.value)
                    ? setSelected(
                        selected.filter((opt) => opt !== option.value)
                      )
                    : setSelected([...selected, option.value]);
                }}
                sx={{ color: "secondary.main" }}
              />
            }
            label={option.label}
          />
        ))}
      </Grid>

      <Button
        onClick={async (e) => {
          let resp = await api.patch(`/api/v1/me/answer`, {
            "communication-methods": selected,
          });
          useToast(resp);
          console.log(resp);
        }}
        variant="contained"
        color="secondary"
        sx={{
          ml: 1,
          color: "white",
          px: 2,
          fontWeight: 600,
        }}
      >
        Save and Update
      </Button>
    </Grid>
  );
}

function ChangeEmail() {
  const [email, setEmail] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);
  const [isUnused, setIsUnused] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const user = useMember();
  useDebounce(
    () => {
      if (
        !Boolean(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/.test(
            email
          )
        )
      )
        return setIsValid(false);
      api
        .post(`/api/v1/user`, {
          mail: email.trim().toLowerCase(),
        })
        .then((resp) => {
          if (resp.data.length === 0) setIsUnused(true);
        });
    },
    1000,
    [email]
  );
  useDebounce(
    () => {
      if (
        !Boolean(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/.test(
            email
          )
        )
      )
        return setIsValid(false);
      api
        .post(`/api/v1/validator/email`, {
          email: email.trim().toLowerCase(),
        })
        .then((resp) => {
          setIsValid(resp.valid);
        });
    },
    1000,
    [email]
  );

  return (
    <Grid
      size={{ xs: 12, md: 6 }}
      container
      spacing={2}
      justifySelf="flex-start"
      component="form"
      onSubmit={async (e) => {
        e.preventDefault();
        let resp = await api.patch(`/api/v1/me/change-email`, { email });
        // useToast(resp);
        setMessage(resp.message);
        if (resp.status === "success" && "Reload" in user) user.Reload();
        setIsValid(false);
      }}
    >
      <Box
        width="100%"
        display={"flex"}
        alignItems="center"
        justifyContent={"space-between"}
        px={1}
        pt={1}
      >
        <Typography
          sx={{
            fontSize: "16px",
            display: "inline-block",
            fontWeight: 600,
          borderBottom:(theme)=> `2px solid ${theme.palette.primary.main}`,
            pb: 0.5,
          }}
        >
          Change Email
        </Typography>
      </Box>

      <Grid
        container
        size={12}
        direction="column"
        spacing={2}
        px={2}
        py={2}
        sx={{
          border:(theme) =>`1px solid ${theme.palette.primary.main}`,  
              bgcolor: (theme) => theme.palette.cardbg.main,
          borderRadius: 2,
        }}
      >
        <Page.Input
          label="New Email"
          onChange={(e) => {
            setEmail(e?.target?.value ?? "");
          }}
          sx={{ bgcolor: "white" }}
        />
      </Grid>

      <Typography width="100%" ml={1} color="secondary" fontWeight={500}>
        {message}
      </Typography>

      <Button
        type="submit"
        variant="contained"
        color="secondary"
        disabled={!isValid || !isUnused}
        sx={{
          ml: 1,
          px: 2,
          color: "white",
          fontWeight: 600,
        }}
      >
        Change Email
      </Button>
    </Grid>
  );
}

function TermsAndConditions() {
  return (
    <Grid size={12} container spacing={2} my={2}>
      <Box
        width="100%"
        display={"flex"}
        alignItems="center"
        justifyContent={"space-between"}
        px={1}
        pt={1}
      >
        <Typography
          sx={{
            fontSize: "16px",
            display: "inline-block",
            fontWeight: "600",
          borderBottom:(theme)=> `2px solid ${theme.palette.primary.main}`,
            pb: 0.5,
          }}
        >
          Terms and Conditions
        </Typography>
      </Box>
      <Grid
        size={12}
        sx={{
          border: `1px solid rgba(51, 169, 202, 0.4)`,
          borderRadius: 2,
        }}
      >
        <Terms width={"100%"} hideLoading={true} />
      </Grid>
    </Grid>
  );
}
