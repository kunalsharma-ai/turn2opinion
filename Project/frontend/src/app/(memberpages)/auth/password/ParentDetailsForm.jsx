"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Avatar,
  Box,
  IconButton,
  Typography,
  Grid,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormHelperText,
  Tooltip,
} from "@mui/material";

import { Form, RequiredLabel } from "@/components";
import { api, Page } from "@/util";
import user from "@/validators/user";
import { useToast } from "@/hooks";

export default function ParentDetailsForm({ form, submitLabel }) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = form;
  return (
    <Grid
      size={12}
      container
      spacing={2}
      px={{ xs: 3, md: 0 }}
      sx={{ maxWidth: { xs: "95vw", md: 500 } }}
    >
      <Page.Divider sx={{ width: "100%", opacity: "0.5" }} />
      <Grid size={12} container spacing={1}>
        <Page.Text
          sx={{
            fontSize: 16,
            fontWeight: 600,
            color: "secondary.main",
          }}
        >
          Parent / Legal Guardian Details
        </Page.Text>
        <Page.Text sx={{ textAlign: "justify" }}>
          Since you are under 18 years of age, we are required to obtain consent
          from your parent or legal guardian before proceeding. You are kindly
          requested to share the details below.
        </Page.Text>
      </Grid>
      <Grid size={12}>
        <Form.Select
          {...form.register("parent.relation")}
          control={form.control}
          options={[
            { label: "Father", value: "father" },
            { label: "Mother", value: "mother" },
            { label: "Legal Guardian", value: "guardian" },
          ]}
          labelText="Relation"
        />
      </Grid>
      <Grid
        size={12}
        container
        spacing={1.2}
        direction="row"
        style={{ alignItems: "flex-end" }}
      >
        <Grid size={{ xs: 12, md: 2 }}>
          <Form.Select
            {...form.register("parent.name.salutation")}
            control={form.control}
            options={[
              { value: "Mr.", label: "Mr." },
              { value: "Ms.", label: "Ms." },
              { value: "Mrs.", label: "Mrs." },
              { value: "Dr.", label: "Dr." },
              { value: "Prof.", label: "Prof." },
              { value: "Mx. ", label: "Mx." },
            ]}
            labelText="Sal."
          />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Form.Input
            {...form.register("parent.name.first")}
            control={form.control}
            labelText="First Name"
            required={true}
            errors={errors?.parent?.name?.first}
            validations={user.name.first}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Form.Input
            {...form.register("parent.name.last")}
            control={form.control}
            labelText="Last Name"
            required={true}
            errors={errors?.parent?.name?.last}
            validations={user.name.last}
          />
        </Grid>
      </Grid>

      <Grid size={12}>
        <Form.Input
          {...form.register("parent.email")}
          control={form.control}
          labelText="Email"
          required={true}
          errors={errors?.parent?.email}
          validations={user.parent.email}
        />
      </Grid>
      {![null, undefined, ""].includes(submitLabel) && (
        <Grid size={12} container justifyContent={"flex-end"} my={2}>
          <Page.MuiButton
            variant="contained"
            color="secondary"
            type={"submit"}
            sx={{
              ml: 1,
              fontWeight: 600,
              color: "white",
              px: 2,
            }}
          >
            {submitLabel}
          </Page.MuiButton>
        </Grid>
      )}
    </Grid>
  );
}
