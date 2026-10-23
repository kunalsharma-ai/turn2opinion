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
  isProfile = false,
}) {
  const [currentPage, setCurrentPage] = React.useState(start);
  const [validationError, setValidationError] = React.useState(null);
  const pages = survey.pages;
  const form = useForm({
    mode: "onChange",
  });
  const phoneHasValue = Boolean(form.watch("phone"));
  const questionStatesRef = React.useRef({});
  const isLoadingAnswersRef = React.useRef(false);
  const isResettingRef = React.useRef(false);
  const previousValuesRef = React.useRef({});

  const pageQuestionsForReset = React.useMemo(() => {
    if ([null, undefined].includes(currentPage)) return [];

    return [...(pages?.[currentPage] || [])].slice(1);
  }, [pages, currentPage]);

  let questions = pages[currentPage];
  // if (questions?.includes("phone")) questions.push("phone-whatsapp");
  // if (questions?.includes("alternate-phone"))
  //   questions.push("alternate-phone-whatsapp");
  questions = questions?.unique();
  React.useEffect(() => {
    previousValuesRef.current = form.getValues();

    const subscription = form.watch((values, { name }) => {
      if (!name) return;

      if (isLoadingAnswersRef.current) return;

      if (isResettingRef.current) return;

      const changedIndex = pageQuestionsForReset.indexOf(name);

      if (changedIndex === -1) return;

      if (questionStatesRef.current[name] !== true) return;

      const previousValue = previousValuesRef.current[name];
      const currentValue = values?.[name];

      if (JSON.stringify(previousValue) === JSON.stringify(currentValue)) {
        return;
      }

      previousValuesRef.current[name] = currentValue;

      const questionsToClear = pageQuestionsForReset.slice(changedIndex + 1);

      if (!questionsToClear.length) return;

      isResettingRef.current = true;

      questionsToClear.forEach((question) => {
        if (!question) return;

        if (questionStatesRef.current[question] !== true) {
          return;
        }

        form.setValue(question, null, {
          shouldDirty: true,
          shouldTouch: false,
          shouldValidate: false,
        });
      });

      isResettingRef.current = false;
      previousValuesRef.current = form.getValues();
    });

    return () => subscription.unsubscribe();
  }, [currentPage, pageQuestionsForReset, form]);

  const { data: me } = useQuery({
    queryKey: ["answers", pages?.[currentPage]?.[0], currentPage],
    queryFn: async ({ queryKey }) => {
      const resp = await api.post("/api/v1/me", {
        questions,
      });

      isLoadingAnswersRef.current = true;

      try {
        Object.fromEntries(
          Object.entries(resp.data)
            .filter((ans) => questions.includes(ans[0]))
            .map(([key, value]) => {
              form.setValue(key, value);

              if (key === "age") {
                form.setValue(key, "");
              }

              return [key, value];
            }),
        );
      } finally {
        previousValuesRef.current = form.getValues();
        isLoadingAnswersRef.current = false;
      }
      return resp.data;
    },
    enabled:
      ![null, undefined].includes(currentPage) &&
      Boolean(pages?.[currentPage]?.length),
  });
  const phoneLocked = Boolean(me?.phone && String(me.phone).trim().length > 0);
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
      console.log(err);
      useToast(err);
    },
  });
  const onSubmit = (data) => {
    saveOrUpdateAnswers.mutate(data);
  };
  async function onNext() {
    let { link } = survey;
    if (link && link != "") {
      link = link.replace(/\$uid/g, survey.respID);
      return redirect(link);
    }
    if ([null, undefined].includes(currentPage)) return setCurrentPage(0);
    const isValid = await form.trigger(pages[currentPage]);
    if (!isValid)
      return setValidationError(
        "Please fill all required fields before proceeding.",
      );
    if (pages[currentPage].includes("age")) {
      let age = form.watch("age");
      let dob = new Date(user.dob);
      if (new Date().getFullYear() !== dob.getFullYear() + Number(age)) {
        onError({
          title: "Invalid Age",
          btns: {
            ok: "Try Again",
            cancel: "Go Back",
          },
          onOk: (e) => {
            onError({ message: null });
          },
          cancel: (e) => {
            router.push("/");
          },
          message: (
            <>
              <p>
                The age you entered doesn't match the information on your
                profile. Please check and correct your age and try again.
              </p>
            </>
          ),
        });
        return;
      }
    }
    setCurrentPage(currentPage + 1);
  }
  const handleQuestionStateChange = React.useCallback((name, isEnabled) => {
    questionStatesRef.current[name] = isEnabled;
  }, []);
  return (
    <>
      {hideSteps || [undefined, null].includes(currentPage) ? (
        <></>
      ) : (
        <SurveySteps currentPage={currentPage} steps={pages.map((p) => p[0])} />
      )}
      <Grid
        component="form"
        onFocus={() => {
          setValidationError(null);
        }}
        onSubmit={form.handleSubmit(onSubmit)}
        size={12}
        container
        direction="column"
        justifyContent="space-between"
        sx={{
          bgcolor: (theme) => theme.palette.cardbgdark.main,
          borderRadius: 2,
          ...(isProfile
            ? { flex: 1, minHeight: 0, flexWrap: "nowrap" }
            : {
                minHeight: [undefined, null].includes(currentPage)
                  ? "calc(90vh - 170px)"
                  : "calc(90vh - 214px)",
              }),
        }}
      >
        <Grid
          size={12}
          container
          sx={{
            maxHeight: isProfile
              ? "none"
              : { md: editMode ? "calc(90vh - 240px)" : "calc(90vh - 185px)" },
            minHeight: isProfile ? 0 : undefined,
            maxWidth: "100%",
            overflowY: "auto",
            // bgcolor: "#8cb2f333",
            bgcolor: (theme) => theme.palette.cardbgdark.main,
            color: (theme) => theme.palette.cardtext.main,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            py: 2,
            px: { xs: 0, md: 2 },
            flex: 1,
            // flexDirection: "column",
            justifyContent: "space-between",
            alignContent: "flex-start",
          }}
        >
          {[null, undefined].includes(currentPage) ? (
            <SurveyDescription survey={survey} />
          ) : (
            pages[currentPage]
              ?.slice(1)
              ?.filter((que) => que !== "alternate-phone" || phoneHasValue)
              ?.filter((que) => que !== "phone" || me)
              ?.map((que, index) => (
                <Question
                  key={`${que}-${index}`}
                  que={que}
                  user={user}
                  form={form}
                  // disabled={!editMode}
                  disabled={!editMode || (que === "phone" && (!me || phoneLocked))}
                  onQuestionStateChange={handleQuestionStateChange}
                />
              ))
          )}
        </Grid>
        {editMode && (
          <Grid
            container
            size={12}
            spacing={2}
            sx={{
              justifyContent: "flex-end",
              py: 2,
              px: isProfile ? 2 : 0,
              bgcolor: isProfile ? "transparent" : "white",
              borderTop: "1px solid rgba(254,254,254,0.3)",
            }}
          >
            {isProfile && (
              <Page.MuiButton
                onClick={() => {
                  setEditMode(false);
                }}
                variant="outlined"
                sx={{ fontWeight: 600, bgcolor: "white" }}
              >
                Cancel
              </Page.MuiButton>
            )}
            {currentPage + 1 === pages.length ? (
              <Page.MuiButton
                variant="contained"
                color="primary"
                sx={{
                  fontWeight: 600,
                }}
                loading={saveOrUpdateAnswers?.isPending}
                onClick={form.handleSubmit(onSubmit)}
              >
                Submit
              </Page.MuiButton>
            ) : (
              <Page.MuiButton
                variant="contained"
                color="primary"
                sx={{
                  fontWeight: 600,
                }}
                onClick={onNext}
              >
                {[null, undefined].includes(currentPage) ? "Start" : "Next "}
              </Page.MuiButton>
            )}
          </Grid>
        )}
      </Grid>
    </>
  );
}

function SurveySteps({ currentPage, steps }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid size={12}>
      {!isMobile ? (
        <Stepper
          activeStep={currentPage}
          alternativeLabel
          connector={<StepConnector />}
          sx={{
            my: 1,
            width: "100%",
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                StepIconComponent={(props) => <CustomStepIcon {...props} />}
                sx={{
                  "& .MuiStepLabel-label": {
                    fontSize: "12px",

                    "& .Mui-active": {
                      fontWeight: "bold",
                    },
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      ) : (
        <Grid size={12} container justifyContent={"center"}>
          <MobileStepper
            variant="dots"
            steps={steps.length}
            position="static"
            activeStep={currentPage}
            sx={{ my: 1 }}
          />
        </Grid>
      )}
    </Grid>
  );
}

function SurveyDescription({ survey }) {
  return (
    <Page.Box
      component="div"
      sx={{
        textAlign: "justify",
        p: 3,
        textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
      }}
      dangerouslySetInnerHTML={{ __html: survey.description }}
    />
  );
}
