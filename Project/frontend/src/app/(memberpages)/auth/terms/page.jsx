"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Grid,
  FormControlLabel,
  Checkbox,
  List,
  ListItem,
} from "@mui/material";

import { useMember } from "@/Context";
import { api, Page } from "@/util";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import { useToast } from "@/hooks";

export default function page() {
  return (
    <Grid
      size={12}
      container
      sx={{
        bgcolor: "#8cb2f333",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
      justifyContent="center"
      alignItems="center"
      py={2}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={0}
        sx={{
          bgcolor: "white",
          borderRadius: 4,
          boxShadow: 24,
          py: 3,
          px: { xs: 1, md: 4 },
          textAlign: "justify",
        }}
      >
        {" "}
        <Page.Box
          sx={{
            height: { xs: 26.8, lg: 42 },
            width: { xs: 180, lg: 282 },
            mb:1,
          }}
        >
          <img
            src="/images/logo/t2o-logo.png"
            alt="logo"
            height={"100%"}
            width={"100%"}
          />
        </Page.Box>
        <Terms />
      </Grid>
    </Grid>
  );
}
export function Terms({
  width = { xs: "90vw", lg: "80vw", xl: "70vw" },
  hideLoading = false,
}) {
  const [user, router, pathName] = [useMember(), useRouter(), usePathname()];
  const [category, setCategory] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [termOptions, setTermsOptions] = React.useState([
    { label: "I Accept all", value: "accept_all", required: false },
    /* todo: sab final hone ke bad delete hoga
     {
      label: (
        <>
          I accept to the{" "}
          <Page.Text
            component={"a"}
            href="/privacy"
            target="_blank"
            color="secondary.main"
            fontWeight={600}
            sx={{ textDecoration: "underline" }}
          >
            Privacy Policy.
          </Page.Text>{" "}
          and{" "}
          <Page.Text
            component={"a"}
            href="/terms"
            target="_blank"
            color="secondary.main"
            fontWeight={600}
            sx={{ textDecoration: "underline" }}
          >
            Terms & Conditions
          </Page.Text>{" "}
          <Page.Text component="span" color="red">
            {" "}
            (required)
          </Page.Text>
        </>
      ),
      value: "accept_privacy_and_terms",
      required: true,
    },
    {
      label: (
        <>
          I confirm that I am a <b>Caregiver</b> (either family caregiver or
          professional caregiver) who provides care or support to patients, the
          elderly, or individuals with health conditions or disabilities.
          <Page.Text component="span" color="red">
            {" "}
            (required)
          </Page.Text>
        </>
      ),
      value: "confirm_identity",
      required: true,
    },
    {
      label: (
        <>
          I agree to provide <b>accurate and verifiable information</b>,
          including your <b>name, email, and mobile number</b>, and to keep
          these details updated.
          <Page.Text component="span" color="red">
            {" "}
            (required)
          </Page.Text>
        </>
      ),
      value: "consent_accurate_information",
      required: true,
    },
    {
      label: (
        <>
          I accept to participate in{" "}
          <b>surveys and other market research patients opinion activities.</b>
          <Page.Text component="span" color="red">
            {" "}
            (required)
          </Page.Text>
        </>
      ),
      value: "consent_participation_research",
      required: true,
    },
    {
      label: (
        <>
          I accept for <b>Frequent Research / Turn 2 Opinion</b> and its{" "}
          <b>trusted third parties</b> to use cookies to improve my experience
          and personalize content for market research
          <Page.Text component="span" color="red">
            {" "}
            (required)
          </Page.Text>
        </>
      ),
      value: "accept_cookies_usage",
      required: true,
    },
    {
      label: (
        <>
          I accept to share my <b>sensitive data</b> for market research
          purposes only
        </>
      ),
      value: "consent_sensitive_data_sharing",
      required: false,
    },
    {
      label: (
        <>
          I accept to share my <b>profile information</b> with third parties for
          market research purposes only
        </>
      ),
      value: "consent_profile_data_sharing",
      required: false,
    },
    {
      label: (
        <>
          I accept the{" "}
          <b>
            data collection and sharing of my mobile advertising identifiers
          </b>{" "}
          or other identifiers or market research purposes only
        </>
      ),
      value: "consent_mobile_identifiers_sharing",
      required: false,
    },
    {
      label: (
        <>
          I accept the{" "}
          <b>use of cookies and the collection of my device ID information </b>
          for market research purposes only
        </>
      ),
      value: "consent_device_data_collection",
      required: false,
    },
    {
      label: (
        <>
          I agree to verify my identity through a{" "}
          <b>video confirmation process</b>, where your face, name, and
          professional credentials may be reviewed by Frequent Research for
          authenticity.
        </>
      ),
      value: "consent_video_verification",
      required: false,
    },
    {
      label: (
        <>
          By joining the panel, I consent to the collection, processing, and use
          of my data as described in the <b>Privacy Notice</b>, including but
          not limited to:{" "}
          <Page.Text component="span" color="red">
            {" "}
            (required)
          </Page.Text>
          <List
            sx={{
              listStyleType: "disc",
              pl: { xs: 1.5, md: 3 },
              "& .MuiListItem-root": {
                display: "list-item",
                p: 0.2,
              },
            }}
          >
            <ListItem>
              <b>Personal Details:</b> name, age, gender, email, phone, and
              health condition or caregiving background
            </ListItem>{" "}
            <ListItem>
              <b>Sensitive Data:</b> caregiving background, patient condition
              (if applicable), and related experience used only for market
              research and analysis.
            </ListItem>{" "}
            <ListItem>
              <b>Behavioural Tracking:</b> participation patterns, survey
              engagement, and site interaction behaviour.
            </ListItem>
            <ListItem>
              <b>Cookies & Device Data:</b> collection of cookie history, IP
              address, device ID, and mobile advertising identifiers for
              analytics and research personalization.
            </ListItem>
            <ListItem>
              <b>Third-Party Sharing:</b> sharing of anonymized or pseudonymized
              profile information with trusted market research partners and
              healthcare clients.
            </ListItem>
          </List>
        </>
      ),
      value: "consent_data_collection_and_processing",
      required: true,
    }, */
  ]);

  const [acceptedTerms, setAcceptedTerms] = React.useState([]);
  React.useEffect(() => {
    if (!category?.terms) return;
    setTermsOptions([
      termOptions[0],
      ...category.terms.map((term) => {
        return {
          label: <div dangerouslySetInnerHTML={{ __html: term.body }} />,
          value: term.name,
          required: term.isRequired ?? false,
        };
      }),
    ]);
  }, [category]);
  React.useEffect(() => {
    if (!user) return;
    setIsLoading(true);
    setAcceptedTerms(user.terms);
    api
      .post(`/api/v1/category`, {
        name: user.category,
      })
      .then((resp) => {
        if (resp.status === "success") {
          setCategory(resp.data[0] ?? null);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user]);
  const handleCheckboxChange = (value) => {
    setAcceptedTerms((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const handleAcceptAll = () => {
    const allOtherValues = termOptions
      .filter((t) => t.value !== "accept_all")
      .map((t) => t.value);

    const allChecked = allOtherValues.every((v) => acceptedTerms.includes(v));

    if (allChecked) {
      setAcceptedTerms([]);
    } else {
      setAcceptedTerms(allOtherValues);
    }
  };

  const allRequiredSelected = termOptions.reduce((a, c) => {
    return c.required ? a && acceptedTerms.includes(c.value) : a;
  }, true);

  const isAllChecked = termOptions
    .filter((t) => t.value !== "accept_all")
    .every((t) => acceptedTerms.includes(t.value));

  const handleSubmit = async () => {
    let resp = api.put(`/api/v1/user/${user._id}`, {
      terms: acceptedTerms,
    });
    if (pathName === "/auth/terms") router.push("/survey?name=welcome");
    if ("Reload" in user) user.Reload();
    else
      useToast({
        status: "success",
        message: "Terms acceptance updated successfully",
      });
  };
  if (isLoading && !hideLoading) {
    return <LoadingOverlay />;
  }
  return (
    <>
      {/* <Page.Text
        sx={{
          fontSize: { xs: "24px", md: "32px" },
          fontWeight: 600,
          color: "secondary.main",
          my: { xs: 1, md: 2 },
        }}
      ></Page.Text> */}
      <Grid
        sx={{
          borderRadius: 2,
          border: (theme) => `1px solid ${theme.palette.primary.main}`,
          bgcolor: (theme) => theme.palette.cardbg.main,
          py: 2,
          px: 2,
          width: width,
        }}
      >
        <Page.Box
          fontSize={15}
          py={2}
          sx={{
            textAlign: "justify",
            "& p": {
              fontSize: 14,
              mb: 2,
              lineHeight: 1.7,
            },
            "& h2": {
              fontSize: 16,
              my: 1,
              fontWeight: 600,
            },
            "& ul": {
              pl: 3,
              mb: 2,
            },
            "& li": {
              fontSize: 14,
              mb: 1,
            },
            "& a": {
              color: "#063686",
              textDecoration: "none",
            },
          }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: category?.termsMessage ?? "",
            }}
          />
          {/* todo: deleted once flow is finalized
          
           By applying to join,{" "}
            <Page.Text component="span" color="secondary" fontWeight={600}>
              MyHealthOpinions
            </Page.Text>
            , you agree to these Terms and Conditions and Privacy Notice, which
            govern your participation as a <b>Caregiver</b> in healthcare market
            research activities conducted by Frequent Research and its trusted
            partners. */}
        </Page.Box>
        {/* todo: deleted once flow is finalized
          
          <Page.Text fontSize={15} pb={2}>
            Your participation helps share real-life caregiving experiences that
            support improvements in healthcare services, patient support, and
            product design.
          </Page.Text> */}
        {/* todo: deleted once flow is finalized
          
           <Page.Text fontSize={15} fontWeight={600}>
            Eligibility and Identity Verification
          </Page.Text> */}

        <Grid
          size={12}
          container
          direction={"column"}
          mt={2}
          gap={0}
          sx={{
            "& ul": {
              pl: 3,
              my: 1,
            },
          }}
        >
          {termOptions.map((option, index) => (
            <Page.Box
              key={index}
              className={option.required ? "required" : "not-required"}
              sx={{
                borderBottom: "2px solid #fcfcfc",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    color="secondary"
                    checked={
                      option.value === "accept_all"
                        ? isAllChecked
                        : acceptedTerms.includes(option.value)
                    }
                    onChange={() =>
                      option.value === "accept_all"
                        ? handleAcceptAll()
                        : handleCheckboxChange(option.value)
                    }
                  />
                }
                label={option.label}
                sx={{
                  alignItems: "flex-start",
                  "& .MuiFormControlLabel-label": {
                    my: "6px",
                  },
                }}
              />
            </Page.Box>
          ))}

          <Page.Text pt={3}>
            <em>
              Your data will be stored securely and used solely for market
              research and opinion analysis purposes in compliance with
              applicable data protection laws (such as GDPR and relevant local
              regulations)
            </em>
          </Page.Text>
          <Page.Text mt={1}>
            <em>
              {" "}
              You may withdraw your consent or deactivate your account at any
              time by contacting{" "}
              <Page.Text
                component="a"
                href="mailto:support@turn2opinion.com"
                sx={{ color: "secondary.main", fontWeight: 600 }}
              >
                support@turn2opinion.com
              </Page.Text>
              . Upon withdrawal, your profile and data will be deleted or
              anonymized per our data retention policy.
            </em>
          </Page.Text>

          <Grid size={12} container justifyContent={"flex-end"} my={2}>
            <Page.MuiButton
              onClick={handleSubmit}
              disabled={!allRequiredSelected}
              variant="contained"
              color="secondary"
              sx={{
                ml: 1,
                fontWeight: 600,
                color: "white",
                px: 2,
              }}
            >
              Accept
            </Page.MuiButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
