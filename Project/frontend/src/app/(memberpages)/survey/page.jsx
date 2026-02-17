"use client"
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useQuery as useQueryParameters, useMember } from "@/Context";
import { useQuery, useMutation } from "@tanstack/react-query"

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { enGB } from "date-fns/locale";

import {
  Grid,
} from "@mui/material";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import { api, Page } from "@/util";


import SecurityCheck from "./components/SecurityCheck";
import SurveyAlreadyTaken from "./components/SurveyAlreadyTaken";
import Survey from "./components/Survey";

export default function page() {
  const [user, router, query, pathName] = [
    useMember(),
    useRouter(),
    useQueryParameters(),
    usePathname(),
  ];
  const [surveyCompleted, setSurveyCompleted] = React.useState(false);
  const [errorPopup, setErrorPopup] = React.useState({
    title: "Security Check",
    message: null,
    btns: {
      ok: "Try Again",
      cancel: "Go Back",
    },
    onOk: (e) => {
      setErrorPopup({ ...errorPopup, message: null });
    },
    cancel: (e) => {
      router.push("/");
    },
  });
  React.useEffect(() => {
    if (!user) return;
    if (
      user.terms === null ||
      user.terms === undefined ||
      user.terms.length === 0
    ) {
      router.replace("/auth/terms");
    }
  }, [user])
  const {
    data: survey,
    isLoading: surveyLoading,
    isError: surveyError,
  } = useQuery({
    queryKey: ["survey", query?.name],
    queryFn: async ({ queryKey }) => {
      const [_key, slug] = queryKey;
      const resp = await api.put("/api/v1/me/survey", { slug });
      if (resp.status === "error") throw new Error(resp.message);
      return resp.data;
    },
    enabled: Boolean(query?.name && user?.category),
    retry: false,
  });
  const isLoading = surveyLoading || (!survey && !surveyError);

  return <LocalizationProvider dateAdapter={ AdapterDateFns } adapterLocale={ enGB }>
    <Grid
      size={ 12 }
      container
      sx={ {
        bgcolor: "primary.main",
        backgroundImage: "url(/imagesmfr/facts-bg-last.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
        minWidth: "100vw",
      } }
      justifyContent="center"
      alignItems="center"
      py={ 2 }
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={ 0 }
        sx={ {
          width: { xs: "90vw", lg: "80vw", xl: "70vw" },
          minHeight: "90vh",
          overflow: "hidden",
          bgcolor: "white",
          borderRadius: 4,
          boxShadow: 24,
          border: 1.5,
          borderColor: "#33aaca",
          py: 3,
          px: { xs: 1, md: 4 },
          textAlign: "justify",
        } }
      >
        {
          isLoading ?
            <LoadingOverlay />
            : surveyCompleted
              ? <Grid
                size={ 12 }
                container
                alignItems="space-between"
                sx={ { minHeight: "calc(90vh - 125px)" } }
              >
                <Page.Box
                  component="div"
                  sx={ {
                    textAlign: "justify",
                    p: 3,
                    width: "100%",
                    minHeight: "calc(90vh - 215px)",
                    bgcolor: "#8cb2f333",
                    border: "1px solid #f4f4f4",
                    textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                  } }
                  dangerouslySetInnerHTML={ { __html: survey.thankyou } }
                />
                <Grid size={ 12 } container justifyContent="center" mt={ 2 }>
                  <Page.MuiButton
                    variant="contained"
                    color="secondary"
                    sx={ {
                      height: "36px",
                      fontWeight: 600,
                    } }
                    onClick={ () => {
                      router.push("/member/dashboard");
                    } }
                  >
                    Go to Dashboard
                  </Page.MuiButton>
                </Grid>
              </Grid>
              : <>
                <Grid
                  container
                  size={ 12 }
                  alignItems="center"
                  justifyContent={ { xs: "center", md: "space-between" } }
                  mb={ 2 }
                  spacing={ { xs: 1, md: 2 } }
                  direction={ { xs: "column", md: "row" } }
                  sx={ { borderBottom: "1px solid #f4f4f4" } }
                >
                  <Page.Box sx={ { position: "relative" } }>
                    <Page.Box
                      sx={ {
                        height: { xs: "60px", md: "80px" },
                        width: { xs: "180px", md: "300px" },
                      } }
                    >
                      <img src="/images/logo/t2o-logo.png" alt="logo" width="100%" />
                    </Page.Box>{ " " }
                  </Page.Box>

                  <Page.Text
                    sx={ {
                      flex: 1,
                      textAlign: "center",
                      ml: { xs: 0, md: "-320px" },
                      fontSize: { xs: "18px", lg: "24px" },
                      fontWeight: 600,
                      color: "secondary.main",
                    } }
                  >
                    { survey?.name }
                  </Page.Text>
                </Grid>
                { Boolean(surveyError)
                  ? <SurveyAlreadyTaken
                    onExit={ e => {
                      router.push("/member/dashboard")
                    } }
                    timeout={ 10 }
                  />
                  : <Survey
                    survey={ survey }
                    user={ user }
                    onError={ err => {
                      setErrorPopup({ ...err });
                    } }
                    onComplete={ status => {
                      setSurveyCompleted(status);
                      setTimeout(() => {
                        router.replace("/member/dashboard")
                      }, 30000)
                    } }
                  />
                }

              </> }
      </Grid>
      <SecurityCheck
        title={ errorPopup.title }
        errorMessage={ errorPopup.message }
        onOk={ errorPopup.onOk }
        onCancel={
          errorPopup.onCancel
        }
        btns={
          errorPopup.btns
        }
      />
    </Grid>
  </LocalizationProvider>
}

