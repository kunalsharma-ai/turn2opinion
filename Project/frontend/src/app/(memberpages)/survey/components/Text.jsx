"use client"
import React from "react";
import { Page } from "@/util";
import { Form } from "@/components"
import { Controller } from "react-hook-form";
import {
  Grid,
} from "@mui/material";

export default function TextElement({ question, form, disabled, pattern }) {
  let isQuestionDisabled = disabled;
  let value = (!question) ? null : !("name" in question) ? null : form.getValues(question?.name);

  if (!isQuestionDisabled) isQuestionDisabled = ([null, undefined, "", []].includes(value)) ? false : !(("isEditable" in question) ? question.isEditable : false)
  const errors = form?.formState?.errors
  const [hideLabel, setHideLabel] = React.useState(false);

  if (Boolean(pattern))
    return <Grid
      size={ { xs: 12, md: Number(question?.size) } }
      alignSelf="flex-end"
      sx={ {
        px: 2,
        py: 1,
      } }
    >
      {
        !hideLabel
        &&
        <Page.Text
          sx={ { fontWeight: 600, mb: 0.5, color: (theme) => theme.palette.cardtext.main, } }
        >
          { question.label }{ " " }
          { question.required && (
            <span style={ { color: "red", fontWeight: 600 } }>*</span>
          ) }
        </Page.Text>
      }
      <Form.Input
        { ...form.register(question.name) }
        control={ form.control }
        watch={ form.watch }
        disabled={ isQuestionDisabled }
        // parent={ question.parent }
        api={ question.name }
        label={ question.label }
        showLabel={ false }
        prefix={Boolean(question.icon) && <i className={`fa-brands ${question.icon}`} style={{color:"blue", fontSize:20,...question.iconspecs}}/>}
        onHide={ (e) => {
          setHideLabel(e);
        } }
        validations={ {
          required: question.required ? "This field is required" : false,
          pattern
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
  return null;

}