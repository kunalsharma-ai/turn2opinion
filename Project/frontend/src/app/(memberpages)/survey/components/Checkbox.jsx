"use client";
import { Page, api } from "@/util";
import { useQuery } from "@tanstack/react-query";
import { Controller } from "react-hook-form";
import {
  FormGroup,
  FormControl,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import { useMember } from "@/Context";
import { Form } from "@/components";
export default function CheckboxElement({ question, form, options, disabled }) {
  const isQuestionDisabled = disabled || !(question.isEditable ?? true);
  const errors = form?.formState?.errors;
  const user = useMember();
  const showPhoneInput =
    question.name === "communication-methods" && !user?.phone;
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
        <Page.Text
          sx={{
            fontWeight: 600,
            mb: 0.5,
            color: (theme) => theme.palette.cardtext.main,
          }}
        >
          {question.label}{" "}
          {question.required && (
            <span style={{ color: "red", fontWeight: 600 }}>*</span>
          )}
        </Page.Text>

        <Controller
          name={question.name}
          control={form.control}
          rules={{
            required: question.required ? "This field is required" : false,
          }}
          defaultValue={
            question.name === "communication-methods" &&
            options?.some(
              (option) =>
                (typeof option === "string" ? option : option.value) ===
                "email",
            )
              ? ["email"]
              : []
          }
          render={({ field }) => {
            const currentValue = field.value || [];
            const handleChange = (optionValue) => {
              if (currentValue.includes(optionValue)) {
                field.onChange(currentValue.filter((v) => v !== optionValue));
              } else {
                field.onChange([...currentValue, optionValue]);
              }
            };

            const requiresPhone =
              showPhoneInput &&
              currentValue.some((value) => ["sms", "phone"].includes(value));

            return (
              <>
                <FormGroup
                  row
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    columnGap: 2,
                    rowGap: 0.5,
                  }}
                >
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
                            checked={currentValue.includes(value)}
                            onChange={() => handleChange(value)}
                            sx={{
                              "& .MuiSvgIcon-root": {
                                color: "#fff",
                              },
                            }}
                          />
                        }
                        label={label}
                      />
                    );
                  })}
                </FormGroup>

                {errors?.[question.name] && (
                  <Page.Text
                    color="error"
                    variant="caption"
                    sx={{ fontWeight: "500" }}
                  >
                    {errors[question.name].message}
                  </Page.Text>
                )}
                {requiresPhone && (
                  <PhoneInput
                    form={form}
                    disabled={isQuestionDisabled}
                    errors={errors}
                  />
                )}
              </>
            );
          }}
        />
      </FormControl>
    </Grid>
  );
}
function PhoneInput({ form, disabled, errors }) {
  const phoneFieldName = "phone";
  const value = form.watch(phoneFieldName);
  const { data: { country } = {} } = useQuery({
    queryKey: ["country"],
    queryFn: async () => {
      const resp = await api.get("/api/v1/get-country");
      resp.country = resp.country.toLowerCase().trim();
      return resp;
    },
    enabled: [undefined, null].includes(value),
  });

  const lockCountry = {
    disableDropdown: !Boolean(value),
    ...(!value && country
      ? {
          selectedCountry: country,
          disableDropdown: true,
        }
      : {}),
  };

  return (
    <Grid size={{ xs: 12, sm: 3 }} sx={{ mt: 1 }}>
      <Page.Text
        sx={{
          fontWeight: 600,
          mb: 0.5,
          color: (theme) => theme.palette.cardtext.main,
        }}
      >
        Phone number for communication
      </Page.Text>

      <Form.Phone
        name={phoneFieldName}
        control={form.control}
        disabled={disabled && Boolean(value)}
        {...lockCountry}
        errors={errors?.[phoneFieldName]}
      />
    </Grid>
  );
}
