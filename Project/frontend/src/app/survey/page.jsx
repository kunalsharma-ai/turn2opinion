"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import {
  FormGroup,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Select,
  MenuItem,
  Grid,
  Chip,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  MobileStepper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CheckCircle from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import { useMember, useQuery } from "@/Context";
import { api, getCurrency, Page } from "@/util";
import { Form } from "@/components";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import Map from "@/components/Map";
import { useToast } from "@/hooks";

function CustomStepIcon(props) {
  const { active, completed, className } = props;
  const stepNumber = props.icon;

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 18,
        height: 18,
        borderRadius: "50%",
        backgroundColor: active
          ? "#06923E "
          : completed
            ? "#4caf50"
            : "#e0e0e0",
        color: "white",
        fontWeight: active ? "bold" : "normal",
        fontSize: "12px",
      }}
    >
      {completed ? <CheckCircle sx={{ fontSize: 16 }} /> : stepNumber}
    </div>
  );
}
async function loadSurvey({ slug, category }) {
  try {
    let resp = await api.put(`/api/v1/me/survey`, {
      slug,
    });
    if (resp.status === "error") throw new Error(resp.message);
    return resp;
  } catch (error) {
    throw new Error(error.message);
  }
}
export default function page() {
  const [surveyTaken, setSurveyTaken] = React.useState(false);
  const [user, router, query, pathName] = [
    useMember(),
    useRouter(),
    useQuery(),
    usePathname(),
  ];
  const [questionBank, setQuestionBank] = React.useState({});
  const [Questions, setQuestions] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [surveyCompleted, setSurveyCompleted] = React.useState(false);
  const [steps, setSteps] = React.useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [currentGroupIndex, setCurrentGroupIndex] = React.useState(0);
  const [validationError, setValidationError] = React.useState(null);
  const [survey, setSurvey] = React.useState({});
  const form = useForm({
    mode: "onChange",
    defaultValue: {},
  });
  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
    watch,
  } = form;
  const currentGroup =
    Questions.length > 0 ? Questions[currentGroupIndex] : Questions;

  const isLast = currentGroupIndex === Questions.length - 1;

  React.useEffect(() => {
    if (!query || !query.name || !user || !user.category) return;
    if ([null, undefined, ""].indexOf(survey?.slug) === -1) return;
    if (
      !user.terms ||
      !(user.terms instanceof Array) ||
      user.terms.length === 0
    ) {
      router.replace("/auth/terms");
    }
    loadSurvey({
      slug: query.name,
      category: user.category,
    })
      .then((resp) => {
        if ("data" in resp) setSurvey(resp.data);
      })
      .catch((err) => {
        console.log(err);
        setSurveyTaken(true);
        setIsLoading(false);
      });
  }, [query, user]);
  React.useEffect(() => {
    if (!survey || !survey.pages || !user) return;
    const userKeys = Object.keys(user);
    const questions = survey.pages
      .flat()
      .filter((que) => userKeys.indexOf(que) === -1);
    if (questions.length <= survey.pages.length) return;
    api
      .post(`/api/v1/me`, {
        questions,
      })
      .then((resp) => {
        if ("update" in user) {
          user.update(resp.data);
        }
      });
  }, [survey]);
  React.useEffect(() => {
    if (
      !survey ||
      !survey.pages ||
      !(survey.pages instanceof Array) ||
      survey.pages.length === 0
    )
      return;
    // console.log("154")
    let sections = [];
    const surveypages = survey.pages.reduce((a, c) => {
      sections.push(c[0]);
      c.splice(0, 1);
      a.push(c);
      return a;
    }, []);
    setSteps(["Welcome", ...sections]);

    setQuestions([["welcome"], ...surveypages]);
    setIsLoading(true);
    api
      .post(`/api/v1/question`, { name: { $in: survey.pages.flat() } })
      .then((resp) => {
        if (
          !resp.data ||
          !(resp.data instanceof Array) ||
          resp.data.length === 0
        )
          return;
        let surveyQuestions = resp.data.reduce((a, c) => {
          a[c.name] = {
            label: c.label,
            name: c.name,
            type: c.type,
            options: c.options ?? [],
            parent: c.parent,
            size: c.size,
            required: c.required,
            disabled: c.disabled,
          };
          if (c.name === "dob") {
            let today = new Date();
            a["dob"]["dateRange"] = [
              `${today.getFullYear() - 120}-01-01`,
              `${today.getFullYear() - 15}-01-01`,
            ];
          }
          return a;
        }, {});
        setQuestionBank({
          ...surveyQuestions,
          welcome: {
            label: survey.description,
            type: "note",
            name: "welcome",
            size: 12,
          },
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [survey]);
  React.useEffect(() => {
    if (!user) return;
    const data = Object.fromEntries(
      Object.entries(user).map((elm) => {
        let [key, value] = elm;
        if (key === "dob") value = value.split("T")[0];
        if (key === "age") value = "";
        return [key.toLowerCase(), value];
      }),
    );
    form.reset(data);
  }, [user]);
  const onSubmit = async (data) => {
    const resp = await api.patch(`/api/v1/me/survey`, {
      ...data,
      respID: survey.respID,
    });
    if (resp.status === "success") {
      setSurveyCompleted(true);
    } else useToast(resp);
  };

  const onBack = () => {
    if (currentGroupIndex > 0) {
      setCurrentGroupIndex(currentGroupIndex - 1);
    }
  };

  const onNext = async () => {
    const fieldsToValidate = currentGroup;
    const isValid = await trigger(fieldsToValidate);
    if (!isValid) {
      setValidationError("Please fill all required fields before proceeding.");
      return;
    }
    if (
      currentGroup.includes("works_in_healthcare") &&
      form.watch("works_in_healthcare") === "no"
    ) {
      await api.patch(`/api/v1/me/change-category`, { category: "patient" });
      let queryParameters = new URLSearchParams(query);
      router.replace(`${pathName}?${queryParameters.toString()}`);
      return;
    }
    if (
      currentGroup.includes("clinician") &&
      form.watch("clinician") === "no"
    ) {
      await api.patch(`/api/v1/me/change-category`, { category: "caregiver" });
      let queryParameters = new URLSearchParams(query);
      router.replace(`${pathName}?${queryParameters.toString()}`);
      return;
    }
    setValidationError(null);
    if (currentGroupIndex < Questions.length - 1) {
      setCurrentGroupIndex(currentGroupIndex + 1);
    } else {
      handleSubmit(onSubmit);
    }
  };
  (async () => {})();
  const visibleSteps = steps.filter((step) => step !== "Welcome");
  const visibleStepIndex = visibleSteps.indexOf(steps[currentGroupIndex]);

  return (
    <Grid
      size={12}
      container
      sx={{
        backgroundColor: "#dbbea2ff",
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
        }}
      >
        {isLoading && <LoadingOverlay />}
        <Grid
          container
          size={12}
          alignItems="center"
          justifyContent={{ xs: "center", md: "space-between" }}
          mb={2}
          pb={1}
          spacing={{ xs: 1, md: 2 }}
          direction={{ xs: "column", md: "row" }}
          sx={{ borderBottom: "1px solid #f4f4f4" }}
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

          <Page.Text
            sx={{
              flex: 1,
              textAlign: "center",
              ml: { xs: 0, md: "-240px" },
              fontSize: { xs: "18px", lg: "24px" },
              fontWeight: 600,
              color: "secondary.main",
            }}
          >
            {survey?.name}
          </Page.Text>
        </Grid>
        {!surveyTaken ? (
          !surveyCompleted ? (
            <>
              {steps[currentGroupIndex] !== "Welcome" && (
                <Grid size={12}>
                  {!isMobile ? (
                    <Stepper
                      activeStep={visibleStepIndex}
                      alternativeLabel
                      connector={<StepConnector />}
                      sx={{
                        my: 1,
                        width: "100%",
                      }}
                    >
                      {visibleSteps.map((label) => (
                        <Step key={label}>
                          <StepLabel
                            StepIconComponent={(props) => (
                              <CustomStepIcon {...props} />
                            )}
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
                        steps={visibleSteps.length}
                        position="static"
                        activeStep={visibleStepIndex}
                        sx={{ my: 1 }}
                      />
                    </Grid>
                  )}
                </Grid>
              )}
              <Grid
                component="form"
                onFocus={() => {
                  setValidationError(null);
                }}
                onSubmit={handleSubmit(onSubmit)}
                size={12}
                container
                direction="column"
                justifyContent="space-between"
                sx={{
                  minHeight:
                    steps[currentGroupIndex] !== "Welcome"
                      ? "calc(90vh - 230px)"
                      : "calc(90vh - 145px)",
                }}
              >
                <Grid
                  size={12}
                  container
                  sx={{
                    maxHeight: {
                      md:
                        steps[currentGroupIndex] !== "Welcome"
                          ? "calc(90vh - 300px)"
                          : "calc(90vh - 215px)",
                    },
                    maxWidth: "100%",
                    overflowY: "auto",
                    borderRadius: 2,
                    bgcolor: "#e8f0fd",
                    border: "1px solid #f4f4f4",
                    py: 2,
                    px: 2,
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Page.Box>
                    {validationError && (
                      <Page.Box sx={{ px: 1 }}>
                        <Alert
                          severity="error"
                          sx={{
                            borderRadius: 2,
                            fontWeight: "500",
                            py: 0,
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "rgba(255, 219, 219, 1)",
                          }}
                        >
                          {validationError}
                        </Alert>
                      </Page.Box>
                    )}
                    <Page.Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        flexWrap: "wrap",
                      }}
                    >
                      {currentGroup.map((que) => {
                        const question = questionBank[que] ?? null;
                        if (!question)
                          return (
                            <p key={que} style={{ width: "50%" }}>
                              Abhi ye question nahi bna hai
                            </p>
                          );
                        return (
                          <Question
                            form={form}
                            key={question.name}
                            question={question}
                            control={control}
                            errors={errors}
                            watch={watch}
                          />
                        );
                      })}
                    </Page.Box>
                  </Page.Box>
                </Grid>
                <Grid
                  container
                  size={12}
                  spacing={2}
                  sx={{
                    justifyContent: "flex-end",
                    py: 2,
                  }}
                >
                  {currentGroupIndex !== 0 && (
                    <Page.MuiButton
                      variant="outlined"
                      color="secondary"
                      sx={{ fontWeight: 600, borderWidth: 2 }}
                      onClick={onBack}
                    >
                      Back
                    </Page.MuiButton>
                  )}
                  <Page.MuiButton
                    variant="contained"
                    color="secondary"
                    // loading={true}
                    sx={{
                      fontWeight: 600,
                    }}
                    onClick={isLast ? handleSubmit(onSubmit) : onNext}
                  >
                    {isLast ? "Submit" : "Next"}
                  </Page.MuiButton>
                </Grid>
              </Grid>
            </>
          ) : (
            <Grid
              size={12}
              container
              alignItems="space-between"
              sx={{ minHeight: "calc(90vh - 125px)" }}
            >
              <Page.Box
                component="div"
                sx={{
                  textAlign: "justify",
                  p: 3,
                  width: "100%",
                  minHeight: "calc(90vh - 215px)",
                  bgcolor: "#e8f0fd",
                  border: "1px solid #f4f4f4",
                  textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                }}
                dangerouslySetInnerHTML={{ __html: survey.thankyou }}
              />
              <Grid size={12} container justifyContent="center" mt={2}>
                <Page.MuiButton
                  variant="contained"
                  color="secondary"
                  sx={{
                    height: "36px",
                    fontWeight: 600,
                  }}
                  onClick={() => {
                    router.push("/member/dashboard");
                  }}
                >
                  Go to Dashboard
                </Page.MuiButton>
              </Grid>
            </Grid>
          )
        ) : (
          <Grid size={12} container direction="column" spacing={3}>
            <Grid
              size={12}
              container
              spacing={2}
              alignSelf="flex-start"
              alignItems="center"
              direction="column"
              mt={6}
            >
              <ErrorIcon color="secondary" sx={{ fontSize: "80px" }} />
              <Page.Text sx={{ fontSize: "32px", textAlign: "center", my: 2 }}>
                Survey Already Taken
              </Page.Text>
              <Page.Text
                sx={{
                  fontSize: "16px",
                  width: { xs: "95%", lg: "75%" },
                  textAlign: "center",
                  py: 7,
                  px: 2,
                  bgcolor: "#e8f0fd",
                  border: `1px solid rgba(51, 169, 202, 0.4)`,
                  borderRadius: 2,
                }}
              >
                You have already completed this survey. You can now go to your
                dashboard to view your rewards and other available surveys.
              </Page.Text>
              <Page.MuiButton
                variant="contained"
                color="secondary"
                sx={{ fontWeight: "bold", mt: 2 }}
                onClick={() => {
                  router.push("/member/dashboard");
                }}
              >
                Go to Dashboard
              </Page.MuiButton>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export const Question = ({
  question,
  control,
  errors,
  watch,
  form,
  editMode = false,
}) => {
  const [options, setOptions] = React.useState([]);
  const user = useMember();
  const [isMapVisible, setIsMapVisible] = React.useState(false);

  const isQuestionDisabled = question.disabled || editMode;

  const parentValue = question.parent ? watch(question.parent) : null;

  React.useEffect(() => {
    if (!Boolean(parentValue)) setOptions(question.options);
    else if (parentValue instanceof Array) {
      setOptions(
        question.options.filter((opt) => {
          let temp = opt.parentValue.diff(parentValue);
          if (temp?.old?.length > 0) return true;
          return false;
        }),
      );
    } else
      setOptions(
        question.options.filter((opt) => opt.parentValue.includes(parentValue)),
      );
  }, [parentValue, question.options]);
  const renderQuestion = () => {
    if (
      ![null, undefined, ""].includes(question.parent) &&
      ["phone", "select", "text", "multiselect", "radio", "checkbox"].includes(
        question.type,
      )
    ) {
      if ([null, undefined, ""].includes(parentValue)) {
        return null;
      }
      if (
        ["select", "multiselect", "radio", "checkbox"].includes(
          question.type,
        ) &&
        (!options || !(options instanceof Array) || !(options.length > 0))
      ) {
        return null;
      }
      if (
        ["phone"].includes(question.type) &&
        !parentValue.includes(question.name)
      ) {
        return null;
      }
      if (["text"].includes(question.type) && parentValue === "No") {
        return null;
      }
    }
    if (question.name === "zipcode") {
      return (
        <Grid
          size={{ xs: 12, md: Number(question?.size) }}
          alignSelf="flex-end"
          sx={{ px: 2, py: 1 }}
        >
          <Form.Input
            {...form.register(`${question.name}`)}
            control={control}
            watch={watch}
            api="zipcode"
            parent={`${question.parent}`}
            surveyLabel={
              <Page.Text sx={{ fontWeight: 600, mb: 0.5, color: "#04662b" }}>
                {question.label}{" "}
                {/* {question.required && (
                  <span style={{ color: "red", fontWeight: 600 }}>*</span>
                )} */}
              </Page.Text>
            }
          />
        </Grid>
      );
    }
    switch (question.type) {
      case "note":
        return (
          <Grid
            size={{ xs: 12, md: Number(question?.size) }}
            alignSelf="flex-end"
            sx={{ textAlign: "center", px: 2, py: 1 }}
          >
            <>
              <Page.Box
                component="div"
                sx={{
                  textAlign: "justify",
                  p: 3,
                  textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
                }}
                dangerouslySetInnerHTML={{ __html: question.label }}
              />
            </>
          </Grid>
        );

      case "radio":
        return (
          <Grid
            size={{ xs: 12, md: Number(question?.size) }}
            alignSelf="flex-end"
            sx={{
              px: 2,
              py: 1,
            }}
          >
            <FormControl
              component="fieldset"
              required={question.required}
              fullWidth
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: 13,
                },
              }}
            >
              <Page.Text sx={{ fontWeight: 600, mb: 0.5, color: "#04662b" }}>
                {question.label}{" "}
                {question.required && (
                  <span style={{ color: "red", fontWeight: 600 }}>*</span>
                )}
              </Page.Text>
              <Controller
                name={question.name}
                control={control}
                rules={{
                  required: question.required
                    ? "This field is required"
                    : false,
                }}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <RadioGroup {...field} aria-label={question.label}>
                      {options.map((option) => (
                        <FormControlLabel
                          key={
                            typeof option === "string" ? option : option.label
                          }
                          value={
                            typeof option === "string" ? option : option.label
                          }
                          control={
                            <Radio
                              disabled={isQuestionDisabled}
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  color: "secondary.main",
                                },
                              }}
                            />
                          }
                          label={
                            typeof option === "string" ? option : option.label
                          }
                        />
                      ))}
                    </RadioGroup>
                    {errors[question.name] && (
                      <Page.Text
                        color="error"
                        variant="caption"
                        sx={{ fontWeight: "bold" }}
                      >
                        {errors[question.name].message}
                      </Page.Text>
                    )}
                  </>
                )}
              />
            </FormControl>
          </Grid>
        );

      case "checkbox":
        return (
          <Grid
            size={{ xs: 12, md: Number(question?.size) }}
            alignSelf="flex-end"
            sx={{
              px: 2,
              py: 1,
            }}
          >
            <FormControl
              component="fieldset"
              required={question.required}
              fullWidth
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: 13,
                },
              }}
            >
              <Page.Text sx={{ fontWeight: 600, mb: 0.5, color: "#04662b" }}>
                {question.label}{" "}
                {question.required && (
                  <span style={{ color: "red", fontWeight: 600 }}>*</span>
                )}
              </Page.Text>

              <Controller
                name={question.name}
                control={control}
                rules={{
                  required: question.required
                    ? "This field is required"
                    : false,
                }}
                defaultValue={[]}
                render={({ field }) => {
                  const handleChange = (optionValue) => {
                    const currentValue = field.value || [];

                    if (currentValue.includes(optionValue)) {
                      // console.log(optionValue);
                      // Remove value
                      field.onChange(
                        currentValue.filter((v) => v !== optionValue),
                      );
                    } else {
                      // Add value
                      field.onChange([...currentValue, optionValue]);
                    }
                  };

                  return (
                    <>
                      <FormGroup>
                        {options.map((option) => {
                          const label =
                            typeof option === "string" ? option : option.label;
                          const value =
                            typeof option === "string" ? option : option.value;
                          return (
                            <FormControlLabel
                              key={label}
                              control={
                                <Checkbox
                                  disabled={isQuestionDisabled}
                                  checked={field.value?.includes(value)}
                                  onChange={() => handleChange(value)}
                                  sx={{
                                    "& .MuiSvgIcon-root": {
                                      color: "secondary.main",
                                    },
                                  }}
                                />
                              }
                              label={label}
                            />
                          );
                        })}
                      </FormGroup>

                      {errors[question.name] && (
                        <Page.Text
                          color="error"
                          variant="caption"
                          sx={{ fontWeight: "500" }}
                        >
                          {errors[question.name].message}
                        </Page.Text>
                      )}
                    </>
                  );
                }}
              />
            </FormControl>
          </Grid>
        );

      case "date":
        return (
          <Grid
            size={{ xs: 12, md: Number(question?.size) }}
            alignSelf="flex-end"
            sx={{
              px: 2,
              py: 1,
            }}
          >
            <FormControl fullWidth required={question.required}>
              <Page.Text sx={{ fontWeight: 600, mb: 0.5, color: "#04662b" }}>
                {question.label}{" "}
                {question.required && (
                  <span style={{ color: "red", fontWeight: 600 }}>*</span>
                )}
              </Page.Text>
              <Grid size={12}>
                <Form.Date
                  {...form.register(question.name)}
                  control={form.control}
                  disabled={isQuestionDisabled}
                  validations={{
                    required: question.required
                      ? "This field is required"
                      : false,
                  }}
                  dateRange={question.dateRange}
                  errors={errors?.[question.name]}
                />
              </Grid>
            </FormControl>
          </Grid>
        );

      case "multiselect":
        return (
          <Grid
            size={{ xs: 12, md: Number(question?.size) }}
            alignSelf="flex-end"
            sx={{
              px: 2,
              py: 1,
            }}
          >
            <Page.Text sx={{ fontWeight: 600, mb: 0.5, color: "#04662b" }}>
              {question.label}{" "}
              {question.required && (
                <span style={{ color: "red", fontWeight: 600 }}>*</span>
              )}
            </Page.Text>
            <Form.Select
              {...form.register(question.name)}
              control={control}
              watch={watch}
              multiple={true}
              isDisabled={isQuestionDisabled}
              options={
                question?.options &&
                options instanceof Array &&
                options.map((opt) => {
                  if (typeof opt === "string")
                    return {
                      label: opt,
                      value: opt,
                    };
                  return opt;
                })
              }
              parent={question.parent}
              validations={{
                required: question.required ? "This field is required" : false,
              }}
              errors={errors?.[question.name]}
              sx={{
                "& .MuiOutlinedInput-notchedOutline legend": {
                  width: 0,
                  visibilty: "hidden",
                },
              }}
            />
          </Grid>
        );
      case "select":
        let optionList = options;
        if (question.parent === "rural") {
          const pvalue = form.watch(question.parent);
          if (!pvalue || pvalue === "") return "";
          let currency = getCurrency(pvalue.split("-")[0]);
          optionList = options.map((opt) => {
            let label = opt.label
              .split("-")
              .map((v) => Number(v).toMoney(currency))
              .join(" - ");
            return {
              ...opt,
              label,
            };
          });
        }
        optionList = Object.entries(
          optionList.reduce((a, c) => {
            a[c.value] = c.label;
            return a;
          }, {}),
        ).map((e) => ({
          value: e[0],
          label: e[1],
        }));
        return (
          <Grid
            size={{ xs: 12, md: Number(question?.size) }}
            alignSelf="flex-end"
            sx={{
              px: 2,
              py: 1,
            }}
          >
            <Page.Text sx={{ fontWeight: 600, mb: 0.5, color: "#04662b" }}>
              {question.label}{" "}
              {question.required && (
                <span style={{ color: "red", fontWeight: 600 }}>*</span>
              )}
            </Page.Text>
            <Form.Select
              {...form.register(question.name)}
              control={control}
              watch={watch}
              isDisabled={isQuestionDisabled}
              options={optionList}
              // api={question.api}
              parent={question.parent}
              validations={{
                required: question.required ? "This field is required" : false,
              }}
              errors={errors?.[question.name]}
              sx={{
                "& .MuiOutlinedInput-notchedOutline legend": {
                  width: 0,
                  visibilty: "hidden",
                },
              }}
            />
          </Grid>
        );

      case "text":
        return (
          <Grid
            size={{ xs: 12, md: Number(question?.size) }}
            alignSelf="flex-end"
            sx={{
              px: 2,
              py: 1,
            }}
          >
            <Page.Text sx={{ fontWeight: 600, mb: 0.5, color: "#04662b" }}>
              {question.label}{" "}
              {question.required && (
                <span style={{ color: "red", fontWeight: 600 }}>*</span>
              )}
            </Page.Text>
            <Form.Input
              {...form.register(question.name)}
              control={control}
              watch={watch}
              disabled={isQuestionDisabled}
              parent={question.parent}
              validations={{
                required: question.required ? "This field is required" : false,
              }}
              errors={errors?.[question.name]}
              sx={{
                "& label.MuiInputLabel-shrink": {
                  fontSize: "16px !important",
                  backgroundColor: "white",
                  borderRadius: "4px",
                  px: 2,
                  ml: -1.5,
                },
              }}
            />
          </Grid>
        );

      case "textarea":
        return (
          <Grid
            size={{ xs: 12, md: Number(question?.size) }}
            alignSelf="flex-end"
            sx={{
              px: 2,
              py: 1,
            }}
          >
            <Page.Text sx={{ fontWeight: 600, mb: 0.5, color: "#04662b" }}>
              {question.label}{" "}
              {question.required && (
                <span style={{ color: "red", fontWeight: 600 }}>*</span>
              )}
            </Page.Text>
            <Form.Input
              {...form.register(question.name)}
              control={control}
              watch={watch}
              parent={question.parent}
              disabled={isQuestionDisabled}
              validations={{
                required: question.required ? "This field is required" : false,
              }}
              errors={errors?.[question.name]}
              multiline
              rows={4}
              sx={{
                "& label.MuiInputLabel-shrink": {
                  fontSize: "16px !important",
                  backgroundColor: "white",
                  borderRadius: "4px",
                  px: 2,
                  ml: -1.5,
                },
              }}
            />
          </Grid>
        );

      case "editor":
        return (
          <Grid
            size={{ xs: 12, md: Number(question?.size) }}
            alignSelf="flex-end"
            sx={{
              px: 2,
              py: 1,
            }}
          >
            <Page.Text sx={{ fontWeight: 600, mb: 0.5, color: "#04662b" }}>
              {question.label}{" "}
              {question.required && (
                <span style={{ color: "red", fontWeight: 600 }}>*</span>
              )}
            </Page.Text>
            <Form.TextEditor
              {...form.register(question.name)}
              control={control}
              watch={watch}
              disabled={isQuestionDisabled}
              validations={{
                required: question.required ? "This field is required" : false,
              }}
              errors={errors?.[question.name]}
            />
          </Grid>
        );

      case "document":
        return (
          <Grid
            size={{ xs: 12, md: Number(question?.size) }}
            alignSelf="flex-end"
            sx={{
              px: 2,
              py: 1,
            }}
          >
            <FormControl fullWidth required={question.required}>
              <Page.Text sx={{ fontWeight: 600, mb: 0.5, color: "#04662b" }}>
                {question.label}{" "}
                {question.required && (
                  <span style={{ color: "red", fontWeight: 600 }}>*</span>
                )}
              </Page.Text>
              <Form.Upload
                endpoint="/api/v1/upload/pdf"
                name={question.name}
                control={control}
                form={form}
                rules={{
                  required: question.required
                    ? "This field is required"
                    : false,
                }}
                accept="application/pdf"
              />
            </FormControl>
          </Grid>
        );

      case "address":
        function setCoordinates(coordinates) {
          form.setValue(`${question.name}.coordinates`, coordinates);
        }
        return (
          <Grid size={12} container p={2}>
            <Page.Text
              sx={{ fontWeight: 600, mb: 0.5, color: "#04662b", width: "100%" }}
            >
              {question.label}{" "}
              {question.required && (
                <span style={{ color: "red", fontWeight: 600 }}>*</span>
              )}
            </Page.Text>

            <Grid
              size={{
                xs: 12,
                md: watch(`${question.name}.consent`) === "Yes" ? 6 : 12,
              }}
              container
              direction="column"
              justifySelf="flex-start"
              spacing={1.5}
              mt={1}
            >
              <Grid size={12} container direction="column" spacing={0}>
                <Page.Text sx={{ fontWeight: 600, mb: 0.5, color: "#04662b" }}>
                  Are you comfortable sharing your location on map?
                </Page.Text>
                <Controller
                  name={`${question.name}.consent`}
                  control={control}
                  rules={"This field is required"}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <RadioGroup
                        {...field}
                        aria-label={question.label}
                        onChange={(e) => {
                          if (e.target.value === "Yes") setIsMapVisible(true);
                          field.onChange(e);
                        }}
                      >
                        {[
                          {
                            label: "Yes",
                            value: "Yes",
                          },
                          { label: "No", value: "No" },
                        ].map((option) => (
                          <FormControlLabel
                            key={
                              typeof option === "string" ? option : option.label
                            }
                            value={
                              typeof option === "string" ? option : option.label
                            }
                            control={
                              <Radio
                                sx={{
                                  "& .MuiSvgIcon-root": {
                                    color: "secondary.main",
                                  },
                                }}
                              />
                            }
                            label={
                              typeof option === "string" ? option : option.label
                            }
                          />
                        ))}
                      </RadioGroup>
                      {errors[question.name] && (
                        <Page.Text
                          color="error"
                          variant="caption"
                          sx={{ fontWeight: "500" }}
                        >
                          {errors[question.name].message}
                        </Page.Text>
                      )}
                    </>
                  )}
                />
              </Grid>{" "}
              <Grid size={12} container direction="column" spacing={0}>
                <Form.Input
                  {...form.register(`${question.name}.line1`)}
                  control={control}
                  watch={watch}
                  labelText={"Address Line 1"}
                />
              </Grid>
              <Grid size={12} container direction="column" spacing={0}>
                <Form.Input
                  {...form.register(`${question.name}.line2`)}
                  control={control}
                  watch={watch}
                  labelText={"Address Line 2"}
                />
              </Grid>{" "}
              <Grid size={12} container direction="column" spacing={0}>
                <Form.Select
                  {...form.register(`${question.name}.country`)}
                  control={control}
                  watch={watch}
                  option={[]}
                  api="country"
                  labelText={"Country"}
                />
              </Grid>
              <Grid size={12} container direction="column" spacing={0}>
                <Form.Select
                  {...form.register(`${question.name}.state`)}
                  control={control}
                  watch={watch}
                  option={[]}
                  parent={`${question.name}.country`}
                  api="state"
                  labelText={"State"}
                />
              </Grid>
              <Grid size={12} container direction="column" spacing={0}>
                <Form.Select
                  {...form.register(`${question.name}.city`)}
                  control={control}
                  watch={watch}
                  option={[]}
                  parent={[
                    `${question.name}.country`,
                    `${question.name}.state`,
                  ]}
                  api="city"
                  labelText={"City"}
                />
              </Grid>
              <Grid size={12} container direction="column" spacing={0}>
                <Form.Input
                  {...form.register(`${question.name}.zipcode`)}
                  control={control}
                  watch={watch}
                  api="zipcode"
                  parent={`${question.name}.country`}
                  labelText={"Zipcode"}
                />
              </Grid>{" "}
            </Grid>

            {isMapVisible && (
              <Grid
                size={{ xs: 12, md: 6 }}
                direction="column"
                container
                p={2}
                display={
                  watch(`${question.name}.consent`) === "Yes" ? "flex" : "none"
                }
              >
                <Map setCoordinates={setCoordinates} />
                <Page.Text fontStyle="italic" mt={1}>
                  click on your location to place location marker
                </Page.Text>
              </Grid>
            )}
          </Grid>
        );

      case "phone":
        return (
          <Grid
            size={{ xs: 12, md: Number(question?.size) }}
            alignSelf="flex-end"
            sx={{
              px: 2,
              py: 1,
            }}
          >
            <Page.Text sx={{ fontWeight: 600, mb: 0.5, color: "#04662b" }}>
              {question.label}{" "}
              {question.required && (
                <span style={{ color: "red", fontWeight: 600 }}>*</span>
              )}
            </Page.Text>

            <Form.Phone
              name={question.name}
              control={control}
              onlyCountries={undefined}
              disabled={isQuestionDisabled}
              validations={{
                required: question.required ? "This field is required" : false,
              }}
              errors={errors?.[question.name]}
            />
          </Grid>
        );

      default:
        return null;
    }
  };

  return <>{renderQuestion()}</>;
};
