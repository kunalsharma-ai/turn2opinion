import { Page } from "@/util";
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

export default function TextElement({ question, form, disabled }) {
  const isQuestionDisabled = disabled || !(question.isEditable ?? true);
  const errors = form?.formState?.errors

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
    <Form.Input
      { ...form.register(question.name) }
      control={ form.control }
      watch={ form.watch }
      disabled={ isQuestionDisabled }
      parent={ question.parent }
      api={ question.name }
      validations={ {
        required: question.required ? "This field is required" : false,
      } }
      errors={ errors?.[question.name] }
      sx={ {
        "& label.MuiInputLabel-shrink": {
          fontSize: "16px !important",
          backgroundColor: "white",
          borderRadius: "4px",
          px: 2,
          ml: -1.5,
        },
      } }
    />
  </Grid>
}