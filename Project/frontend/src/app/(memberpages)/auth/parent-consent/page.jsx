"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter, usePathname } from "next/navigation";
import {
  Grid,
  FormControlLabel,
  Checkbox,
  List,
  ListItem,
  Typography,
  Button,
  Container,
} from "@mui/material";

import { useMember, useQuery } from "@/Context";
import { api, loadData, Page } from "@/util";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import { useToast } from "@/hooks";

export default function page() {
  const [submitted, setSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [User, setUser] = React.useState({});
  const query = useQuery();
  React.useEffect(() => {
    setIsLoading(true);
    loadData(
      api.post(`/api/v1/user/${query.user}`, {
        code: query.code,
        channel: "parent-consent",
      }),
      async (resp) => {
        setUser(resp?.data);
        setIsLoading(false);
      },
    );
  }, [query.user]);
  if (isLoading) {
    return <LoadingOverlay />;
  }
  if (!User) {
    return <LinkExpired />;
  }
  if (submitted) {
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
            py: 4,
            px: { xs: 2, md: 5 },
            width: { xs: "92vw", md: "70vw", lg: "50vw" },
            textAlign: "center",
          }}
        >
          <Page.Box sx={{ height: 60, mb: 3 }}>
            <img src="/images/logo/t2o-logo.png" alt="logo" height="100%" />
          </Page.Box>
          <Page.Box
            sx={{
              width: "100%",
              p: { xs: 3, md: 5 },
              borderRadius: 2,
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
              bgcolor: "#f4f8ff",
            }}
          >
            <Page.Text
              sx={{
                fontSize: { xs: 22, md: 28 },
                fontWeight: 700,
                color: "primary.main",
                mb: 2,
              }}
            >
              Consent Successfully Submitted
            </Page.Text>
            <Page.Text sx={{ fontSize: { xs: 15, md: 17 }, lineHeight: 1.7 }}>
              Thank you for reviewing and accepting the terms. Your consent has
              been successfully recorded.
            </Page.Text>
            <Page.Text
              sx={{ fontSize: { xs: 15, md: 17 }, lineHeight: 1.7, mt: 1.5 }}
            >
              Your child may now continue participating in Turn2Opinion.
            </Page.Text>
          </Page.Box>
        </Grid>
      </Grid>
    );
  }
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
        <Page.Box
          sx={{
            height: 60,
            mb: 2,
          }}
        >
          <img src="/images/logo/t2o-logo.png" alt="logo" height={"100%"} />
        </Page.Box>
        <Page.Box
          sx={{
            width: { xs: "90vw", lg: "80vw", xl: "70vw" },
            mb: 2,
            p: { xs: 2, md: 3 },
            borderRadius: 2,
            border: (theme) => `1px solid ${theme.palette.primary.main}`,
            bgcolor: "#f4f8ff",
          }}
        >
          <Page.Text
            sx={{
              fontSize: { xs: 20, md: 26 },
              fontWeight: 700,
              color: "primary.main",
              mb: 1.5,
            }}
          >
            Your Child's Participation Has Been Approved
          </Page.Text>

          <Page.Text
            sx={{
              fontSize: { xs: 14, md: 16 },
              lineHeight: 1.7,
              mb: 1.5,
            }}
          >
            Thank you for confirming your approval for your child to participate
            in <strong>Turn2Opinion</strong>, an online survey and market
            research panel operated by Frequent Research Fieldwork Solutions
            Pvt. Ltd.
          </Page.Text>

          <Page.Text
            sx={{
              fontSize: { xs: 14, md: 16 },
              lineHeight: 1.7,
              mb: 1.5,
            }}
          >
            As the parent or legal guardian, you are now requested to review the
            terms below and accept them on behalf of your child.
          </Page.Text>

          <Page.Text
            sx={{
              fontSize: { xs: 14, md: 16 },
              lineHeight: 1.7,
              fontWeight: 600,
              color: "secondary.main",
            }}
          >
            By selecting the required acceptance options, you confirm that you
            have reviewed and understood the applicable terms and agree to them
            on behalf of your child.
          </Page.Text>
        </Page.Box>
        <Terms
          maxHeight="calc(100vh - 500px)"
          setSubmitted={setSubmitted}
          User={User}
        />
      </Grid>
    </Grid>
  );
}
export function Terms({
  width = { xs: "90vw", lg: "80vw", xl: "70vw" },
  hideLoading = false,
  maxHeight = "calc(100vh - 190px)",
  setSubmitted,
  User,
}) {
  const [category, setCategory] = React.useState({});
  const [query] = [useQuery()];

  React.useEffect(() => {
    console.log({ User });
    loadData(
      api.post(`/api/v1/category`, {
        name: User?.category,
      }),
      async (resp) => {
        setCategory(resp?.data?.[0]);
      },
    );
  }, [User.category]);
  // return <pre>{JSON.stringify(info,null,2)}</pre>

  const [termOptions, setTermsOptions] = React.useState([
    { label: "I Accept all", value: "accept_all", required: false },
  ]);

  const [acceptedTerms, setAcceptedTerms] = React.useState([]);
  const [initialTerms, setInitialTerms] = React.useState([]);
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

  const isTermsChanged = React.useMemo(() => {
    const sortArr = (arr) => [...arr].sort();
    return (
      JSON.stringify(sortArr(initialTerms)) !==
      JSON.stringify(sortArr(acceptedTerms))
    );
  }, [initialTerms, acceptedTerms]);

  const isAllChecked = termOptions
    .filter((t) => t.value !== "accept_all")
    .every((t) => acceptedTerms.includes(t.value));

  const handleSubmit = async () => {
    let resp = api.put(`/api/v1/user/parent-consent/${User._id}`, {
      ...query,
      terms: acceptedTerms,
    });
    // if (pathName === "/auth/terms") router.push("/survey?name=welcome");
    // if ("Reload" in user) user.Reload();
    // else
    useToast({
      status: "success",
      message: "Terms acceptance updated successfully",
    });
    setSubmitted(true);
  };

  return (
    <>
      <Grid
        sx={{
          borderRadius: 2,
          border: (theme) => `1px solid ${theme.palette.primary.main}`,
          bgcolor: (theme) => theme.palette.cardbgdark.main,
          color: (theme) => theme.palette.cardtext.main,
          py: 2,
          px: 2,
          width: width,
          maxHeight: { md: maxHeight },
          overflow: "auto",
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
              color: "#fff",
              fontWeight: 700,
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
              sx={
                {
                  // borderBottom: "1px solid #fcfcfc",
                }
              }
            >
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    // color="secondary"
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
                    sx={{
                      color: "#fff",
                      "&.Mui-checked": {
                        color: "#fff",
                      },
                    }}
                  />
                }
                label={
                  <Page.Box display="flex" alignItems="flex-start" gap={0.5}>
                    <Page.Box>{option.label}</Page.Box>
                    {option.required && (
                      <Page.Text
                        component="span"
                        sx={{
                          color: "error.main",
                          fontWeight: 700,
                          lineHeight: 1,
                        }}
                      >
                        *
                      </Page.Text>
                    )}
                  </Page.Box>
                }
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
                sx={{
                  color: (theme) => theme.palette.cardtext.main,
                  fontWeight: 700,
                }}
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
              disabled={!allRequiredSelected || !isTermsChanged}
              variant="contained"
              // color="secondary"
              sx={{
                ml: 1,
                fontWeight: 600,
                color: "white",
                px: 2,
              }}
            >
              Accept and allow {User?.name?.first} to use this panel
            </Page.MuiButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

function LinkExpired() {
  const router = useRouter();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      size={12}
      sx={{
        textAlign: "center",
        minHeight: "100vh",
        background: "linear-gradient(90deg, #fff 0, #eef5ff 100%)",
      }}
    >
      <Container maxWidth="lg">
        <img
          src="/imagest2o/shook.png"
          alt="Link expired"
          height={120}
          width={120}
          style={{
            filter: "brightness(0.9) sepia(1) hue-rotate(180deg) saturate(4)",
          }}
        />

        <Typography
          sx={{
            mt: 6,
            fontSize: { xs: 36, md: 48 },
            fontWeight: "bold",
            color: "#0c5adb",
          }}
        >
          Link Expired
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: 22, md: 26 },
            fontWeight: 700,
            lineHeight: 1.3,
            mt: 2,
            color: "black",
          }}
        >
          This parent consent link is no longer valid.
        </Typography>

        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 400,
            lineHeight: 1.6,
            mt: 4,
            mb: 2,
            color: "#444",
          }}
        >
          The link you used may have expired or already been used. Please
          contact Turn2Opinion support if you still need to complete the parent
          consent process.
        </Typography>

        <Button
          variant="contained"
          onClick={() => router.replace("/")}
          sx={{
            mt: 2,
            height: 58,
            background: "#0c5adb",
            color: "white",
            borderRadius: 20,
            fontSize: 16,
            fontWeight: 700,
            px: 5,
            "&:hover": {
              background: "#063686",
            },
          }}
        >
          Go to Home Page
        </Button>
      </Container>
    </Grid>
  );
}

/*
purana data
import React from "react";
import { useForm } from "react-hook-form";
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
import ParentDetailsForm from "../password/ParentDetailsForm";
import { Terms } from "../terms/page";
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
            // height: { xs: 26.8, lg: 42 },
            // width: { xs: 180, lg: 282 },
            height: 60,
            mb: 2,
          }}
        >
          <img
            src="/images/logo/t2o-logo.png"
            alt="logo"
            height={"100%"}
            // width={"100%"}
          />
        </Page.Box>
        <Terms />
      </Grid>
    </Grid>
  );
}
//*/
