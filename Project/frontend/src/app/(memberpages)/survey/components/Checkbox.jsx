"use client";
import { Page } from "@/util";
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

export default function CheckboxElement({ question, form, options,disabled }) {
  const isQuestionDisabled = disabled ||!(question.isEditable ?? true);
  const errors = form?.formState?.errors
  return <Grid
    size={ { xs: 12, md: Number(question?.size) } }
    alignSelf="flex-end"
    sx={ {
      px: 2,
      py: 1,
    } }
  >
    <FormControl
      component="fieldset"
      required={ question.required }
      fullWidth
      sx={ {
        "& .MuiFormControlLabel-label": {
          fontSize: 13,
        },
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

      <Controller
        name={ question.name }
        control={ form.control }
        rules={ {
          required: question.required
            ? "This field is required"
            : false,
        } }
        defaultValue={ [] }
        render={ ({ field }) => {
          const handleChange = (optionValue) => {
            const currentValue = field.value || [];
            if (currentValue.includes(optionValue)) {
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
                { options.map((option) => {
                  const label =
                    typeof option === "string" ? option : option.label;
                  const value =
                    typeof option === "string" ? option : option.value;
                  return (
                    <FormControlLabel
                      key={ label }
                      control={
                        <Checkbox
                          disabled={ isQuestionDisabled }
                          checked={ field.value?.includes(value) }
                          onChange={ () => {
                            handleChange(value)
                          } }
                          sx={ {
                            "& .MuiSvgIcon-root": {
                              color: "secondary.main",
                            },
                          } }
                        />
                      }
                      label={ label }
                    />
                  );
                }) }
              </FormGroup>

              { errors[question.name] && (
                <Page.Text
                  color="error"
                  variant="caption"
                  sx={ { fontWeight: "500" } }
                >
                  { errors[question.name].message }
                </Page.Text>
              ) }
            </>
          );
        } }
      />
    </FormControl>
  </Grid>
}