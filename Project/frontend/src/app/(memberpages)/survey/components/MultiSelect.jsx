"use client";
import React from "react";
import { Page } from "@/util";
import { Form } from "@/components"
import {
  Grid,
} from "@mui/material";

export default function MultiSelectElement({ question, form, options, disabled }) {
  const isQuestionDisabled = disabled || !(question.isEditable ?? true);
  const errors = form?.formState?.errors
  const value = form.watch(question.name);
  function onChange() {
    question?.children.map(child => {
      form.setValue(child, null)
    })
  }
  if (!options || options?.length === 0) return <></>
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
      multiple={ true }
      isDisabled={ isQuestionDisabled }
      options={
        options.map((opt) => {
          if (typeof opt === "string")
            return {
              label: opt,
              value: opt,
            };
          return {
            label: opt.label,
            value: opt.value
          };
        })
      }
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