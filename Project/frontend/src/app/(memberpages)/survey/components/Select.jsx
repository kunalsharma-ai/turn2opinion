"use client";
import React from "react";
import { Page, getCurrency } from "@/util";
import { Form } from "@/components"

import {
  Grid,
} from "@mui/material";

export default function SelectElement({ question, form, options, disabled }) {
  const isQuestionDisabled = disabled || !(question.isEditable ?? true);
  const errors = form?.formState?.errors
  function onChange() {
    question?.children.map(child => {
      form.setValue(child, null)
    })
  }
  if (!options || options?.length === 0) options=[];//return <></>
  let formattedOptions = options;
  if (question.isMoney) {
    let country = form.watch("country");
    if (!country) return null;
    formattedOptions = options.sortRange("asc").map(range => ({ ...range, label: range.label.toMoneyRange(getCurrency(country), "en-IN") }))
  }

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
    <Form.Select
      { ...form.register(question.name) }
      control={ form.control }
      watch={ form.watch }
      isDisabled={ isQuestionDisabled }
      options={ formattedOptions.map((opt) => {
        if (typeof opt === "string")
          return {
            label: opt,
            value: opt,
          };
        return {
          label: opt.label,
          value: opt.value
        };
      }) }
      // api={question.api}
      parent={ question.parent }
      validations={ {
        required: question.required ? "This field is required" : false,
      } }
      errors={ errors?.[question.name] }
      sx={ {
        "& .MuiOutlinedInput-notchedOutline legend": {
          width: 0,
          visibilty: "hidden",
        },
      } }
      onChange={ onChange }
    />
  </Grid>
}