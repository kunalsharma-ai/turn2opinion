"use client"
import { useQuery } from "@tanstack/react-query";
import { api, Page } from "@/util";
import { Form } from "@/components"
import { Controller } from "react-hook-form";
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

export default function PhoneElement({ question, form, disabled }) {
  const isQuestionDisabled = disabled || !(question.isEditable ?? true);
  const errors = form?.formState?.errors
  const value = form.watch(question.name);

  const {
    data: { country, ip } = {}
  } = useQuery({
    queryKey: ["country"],
    queryFn: async () => {
      const resp = await api.get("/api/v1/get-country");
      resp.country = resp.country.toLowerCase().trim();
      return resp;
    },
    enabled: [undefined, null].includes(value)
  });
  let validations = undefined;
  if (question.required)
    validations["required"] = "This field is required"
  return <Grid
    size={ { xs: 12, md: Number(question?.size) } }
    alignSelf="flex-end"
    sx={ {
      px: 2,
      py: 1,
    } }
  >
    <Page.Text
      sx={ { fontWeight: 600, mb: 0.5, color: "secondary.main" } }
    >
      { question.label }{ " " }
      { question.required && (
        <span style={ { color: "red", fontWeight: 600 } }>*</span>
      ) }
    </Page.Text>
    <Form.Phone
      name={ question.name }
      control={ form.control }
      disabled={ isQuestionDisabled && Boolean(value) }
      validations={ validations }
      selectedCountry={ country }
      disableDropdown={ Boolean(country) }
      errors={ errors?.[question.name] }
    />
    {
      Boolean(value) &&
      !Boolean(errors[question.name]) &&
      <Controller
        name={ `${question.name}-whatsapp` }
        control={ form.control }
        defaultValue={ false }
        render={ ({ field }) => (
          <FormControlLabel
            sx={ { mt: 1, display: "flex", alignItems: "flex-start" } }
            control={
              <Checkbox
                { ...field }
                checked={ Boolean(field.value) }
                sx={ {
                  py: 0,
                  "& .MuiSvgIcon-root": {
                    color: "secondary.main",
                  },
                } }
              />
            }
            label="I agree to receive updates, alerts, and support messages on WhatsApp from My Frequent Rewards"
          />
        ) }
      />
    }
  </Grid>
}