"use client";
import React from "react";
import {
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  MobileStepper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import CustomStepIcon from "./CustomStepIcon";
import { Page, api } from "@/util";
import Question from "./Question";
import { useToast } from "@/hooks";

export default function Survey({
  survey,
  user,
  onError,
  onComplete,
  start = null,
  hideSteps = false,
  editMode = true,
  setEditMode,
  endpage = "/api/v1/me/survey",
  isProfile = false
}) {
  const [currentPage, setCurrentPage] = React.useState(start);
  const [validationError, setValidationError] = React.useState(null);
  const pages = survey.pages;
  const form = useForm({
    mode: "onChange",
  })
  let questions = pages[currentPage]
  if (questions?.includes("phone")) questions.push("phone-whatsapp")
  if (questions?.includes("alternate-phone")) questions.push("alternate-phone-whatsapp")
  questions = questions?.unique();
  const {
    data: me
  } = useQuery({
    queryKey: ["answers", pages?.[currentPage]?.[0], currentPage],
    queryFn: async ({ queryKey }) => {
      const resp = await api.post("/api/v1/me", {
        questions
      });
      Object.fromEntries(
        Object.entries(resp.data)
          .filter(ans => questions.includes(ans[0]))
          .map(([key, value]) => {
            console.log({
              key,
              value
            })
            form.setValue(key, value)
            if (key === "age") {
              form.setValue(key, "")
            }
            return [key, value]
          })
      )
      return resp.data;
    },
    enabled: ![null, undefined].includes(currentPage) && Boolean(pages?.[currentPage]?.length),
  });
  const saveOrUpdateAnswers = useMutation({
    mutationFn: (data) =>
      api.patch(endpage, {
        ...data,
        respID: survey.respID,
      }),
    onSuccess: () => {
      onComplete(true);
    },
    onError: (err) => {
      console.log(err)
      useToast(err);
    },
  });
  const onSubmit = (data) => {
    saveOrUpdateAnswers.mutate(data);
  }
  async function onNext() {
    let { link } = survey;
    if (link && link != "") {
      link = link.replace(/\$uid/g, survey.respID);
      return redirect(link)
    }
    if ([null, undefined].includes(currentPage))
      return setCurrentPage(0)
    const isValid = await form.trigger(pages[currentPage]);
    if (!isValid) return setValidationError("Please fill all required fields before proceeding.");
    if (pages[currentPage].includes("age")) {
      let age = form.watch("age");
      let dob = new Date(user.dob);
      if (new Date().getFullYear() !== dob.getFullYear() + Number(age)) {
        onError({
          title: "Security Check",
          btns: {
            ok: "Try Again",
            cancel: "Go Back",
          },
          onOk: (e) => {
            onError({ message: null })
          },
          cancel: (e) => {
            router.push("/");
          },
          message: (
            <>
              <p>
                For security reasons, the age entered must match your registered
                information.
              </p>
              <p>&nbsp;</p>
              <p>Please check and re-enter the correct age.</p>
            </>
          ),
        })
        return;
      }
    }
    setCurrentPage(currentPage + 1)
  }
  return <>
    {
      (hideSteps || [undefined, null].includes(currentPage))
        ? <></>
        : <SurveySteps currentPage={ currentPage } steps={ pages.map(p => p[0]) } />
    }
    <Grid
      component="form"
      onFocus={ () => {
        setValidationError(null);
      } }
      onSubmit={ form.handleSubmit(onSubmit) }
      size={ 12 }
      container
      direction="column"
      justifyContent="space-between"
      sx={ {
        minHeight: ([undefined, null].includes(currentPage)) ? "calc(90vh - 170px)" : "calc(90vh - 214px)",
        // steps[currentGroupIndex] !== "Welcome"
        //   ? "calc(90vh - 230px)"
      } }
    >
      <Grid
        size={ 12 }
        container
        sx={ {
          maxHeight: {
            md: editMode ? "calc(90vh - 240px)" : "calc(90vh - 185px)"
            // steps[currentGroupIndex] !== "Welcome"
            //   ? "calc(90vh - 300px)"
            //   : "calc(90vh - 215px)",
          },
          maxWidth: "100%",
          overflowY: "auto",
          borderRadius: 2,
          bgcolor: "#8cb2f333",
          border: "1px solid #f4f4f4",
          py: 2,
          px: { xs: 0, md: 2 },
          flex: 1,
          // flexDirection: "column",
          justifyContent: "space-between",
          alignContent: "flex-start"
        } }
      >
        {
          ([null, undefined].includes(currentPage))
            ? <SurveyDescription survey={ survey } />
            : pages[currentPage]?.slice(1)?.map(
              (que, index) => <Question
                key={ `${que}-${index}` }
                que={ que }
                user={ user }
                form={ form }
                disabled={ !editMode }
              />)
        }
      </Grid>
      { editMode && <Grid
        container
        size={ 12 }
        spacing={ 2 }
        sx={ {
          justifyContent: "flex-end",
          py: 2,
          px: isProfile ? 2 : 0,
        } }
      >
        { isProfile && <Page.MuiButton onClick={ () => { setEditMode(false) } } variant="outlined" sx={ { fontWeight: 600 } }>
          Cancel
        </Page.MuiButton> }
        { ((currentPage + 1) === pages.length) ? <Page.MuiButton
          variant="contained"
          color="secondary"
          sx={ {
            fontWeight: 600,
          } }
          loading={ saveOrUpdateAnswers?.isPending }
          onClick={ form.handleSubmit(onSubmit) }
        >
          Submit
        </Page.MuiButton> : <Page.MuiButton
          variant="contained"
          color="secondary"
          sx={ {
            fontWeight: 600,
          } }
          onClick={ onNext }
        >
          Next
        </Page.MuiButton> }
      </Grid> }
    </Grid>
  </>
}

function SurveySteps({
  currentPage,
  steps
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return <Grid size={ 12 }>
    { !isMobile ? (
      <Stepper
        activeStep={ currentPage }
        alternativeLabel
        connector={ <StepConnector /> }
        sx={ {
          my: 1,
          width: "100%",
        } }
      >
        { steps.map((label) => (
          <Step key={ label }>
            <StepLabel
              StepIconComponent={ (props) => (
                <CustomStepIcon { ...props } />
              ) }
              sx={ {
                "& .MuiStepLabel-label": {
                  fontSize: "12px",

                  "& .Mui-active": {
                    fontWeight: "bold",
                  },
                },
              } }
            >
              { label }
            </StepLabel>
          </Step>
        )) }
      </Stepper>
    ) : (
      <Grid size={ 12 } container justifyContent={ "center" }>
        <MobileStepper
          variant="dots"
          steps={ steps.length }
          position="static"
          activeStep={ currentPage }
          sx={ { my: 1 } }
        />
      </Grid>
    ) }
  </Grid>
}

function SurveyDescription({ survey }) {
  return <Page.Box
    component="div"
    sx={ {
      textAlign: "justify",
      p: 3,
      textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
    } }
    dangerouslySetInnerHTML={ { __html: survey.description } }
  />
}