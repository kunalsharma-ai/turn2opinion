"use client";
import { api } from "@/util";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Page } from "@/util";
import { Form } from "@/components"

import {
  FormControl,
  Grid,
} from "@mui/material";
import CheckboxElement from "./Checkbox";
import TextElement from "./Text";
import PhoneElement from "./Phone";
import SelectElement from "./Select";
import MultiSelectElement from "./MultiSelect";
export default function Question({
  que, user, form, disabled
}) {
  if(que==="alternate-phone-whatsapp")return <></>
  const question = useQuery({
    queryKey: ["question", que],
    queryFn: async () => {
      const resp = await api.post("/api/v1/question", {
        name: que
      })
      if (resp.status === "error") throw new Error(resp.message);
      if (resp.data instanceof Array && resp.data.length === 1)
        return resp.data[0]
      return {}
    },
    enabled: Boolean(que)
  })
  return (question.isLoading
    ? <></>
    : question.isError
      ? <></>
      : Boolean(question.data)
        ? <Que question={ question.data } form={ form } disabled={ disabled } />
        : <></>
  )
}
function Que({ question, form, disabled }) {
  if(!question || !question.name )return <></>
  const parentValue = question.parent ? form.watch(question.parent) : null;
  const { data: options, isLoading } = useQuery({
    queryKey: [
      "options",
      question?.name,
      parentValue,
      question?.parent
    ],
    queryFn: async ({ queryKey }) => {
      if (!hasOption(question.type)) return [];
      if (question.parent) {
        if ([null, undefined, "", []].includes(parentValue)) return [];
        let resp = await api.post(`/api/v1/option/${question.name}`, {
          parentValue
        });
        return resp.data;
      }
      let resp = await api.get(`/api/v1/option/${question.name}`);
      return resp.data;
    },
    enabled: !Boolean(question.parent) || Boolean(parentValue)
  })
  if (isLoading) return <></>

  switch (question.type) {
    case "checkbox":
      return <CheckboxElement disabled={ disabled } form={ form } options={ options } question={ question } />

    case "text":
      return <TextElement disabled={ disabled } form={ form } question={ question } />

    case "phone":
      return <PhoneElement disabled={ disabled } form={ form } question={ question } />

    case "select":
      return <SelectElement disabled={ disabled } form={ form } question={ question } options={ options } />

    case "multiselect":
      return <MultiSelectElement disabled={ disabled } form={ form } question={ question } options={ options } />

    case "date":
      return <DateElement disabled={ disabled } form={ form } question={ question } />
      break;
    default:
      console.log({
        name: question.name,
        parent: question.parent,
        [question.type]: options
      })
      return <>Under development </>
      break;
  }
}


function hasOption(questionType) {
  return [
    "select",
    "multiselect",
    "checkbox",
    "radio"
  ].includes(questionType)
}

function DateElement({ question, form, disabled }) {
  const isQuestionDisabled = disabled || !(question.isEditable ?? true);
  const errors = form?.formState?.errors
  const value = form.watch(question.name);
  return <Grid
    size={ { xs: 12, md: Number(question?.size) } }
    alignSelf="flex-end"
    sx={ {
      px: 2,
      py: 1,
    } }
  >
    <FormControl fullWidth required={ question.required }>
      <Page.Text
        sx={ { fontWeight: 600, mb: 0.5, color: "secondary.main" } }
      >
        { question.label }{ " " }
        { question.required && (
          <span style={ { color: "red", fontWeight: 600 } }>*</span>
        ) }
      </Page.Text>
      <Grid size={ 12 }>
        <Form.Date
          { ...form.register(question.name) }
          control={ form.control }
          disabled={ isQuestionDisabled }
          validations={ {
            required: question.required
              ? "This field is required"
              : false,
          } }
          dateRange={ question.dateRange }
          errors={ errors?.[question.name] }
        />
      </Grid>
    </FormControl>
  </Grid>
}
