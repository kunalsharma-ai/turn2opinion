"use client";

import * as React from "react";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Page } from "@/util";
const RequiredLabel = ({ label }) => (
  <>
    {label} <span style={{ color: "red" }}>*</span>
  </>
);

export default function DateField({
  control,
  errors,
  name,
  label,
  labelText,
  required = false,
  parent,
  watch,
  validations,
  disabled,
  dateRange = [null, null],
}) {
  const [validate, setValidate] = React.useState(validations);
  const [minDate, setMinDate] = React.useState(new Date().toString());
  const [maxDate, setMaxDate] = React.useState(null);

  let pValue;
  if (parent) {
    pValue = watch(parent);
  }
  React.useEffect(() => {
    if (!parent) return;
    if (!pValue || pValue === "") return setHide(true);
    setMinDate(pValue);
  }, [pValue]);
  React.useEffect(() => {
    if (!dateRange || !(dateRange instanceof Array)) return;
    if (!!dateRange[0]) setMinDate(dateRange[0]);
    if (!!dateRange[1]) setMaxDate(dateRange[1]);
  }, [dateRange]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {labelText && (
        <Page.Text sx={{ fontWeight: 500, color: "#555" }}>
          {labelText}{" "}
          {required && <span style={{ color: "red", fontWeight: 600 }}>*</span>}
        </Page.Text>
      )}
      <Controller
        name={name}
        control={control}
        rules={disabled ? {} : validate}
        render={({ field }) => {
          const handleBlur = (event) => {
            field.onBlur();
            const day = dayjs(field.value);
            if (
              field.value &&
              day.isValid() &&
              !day.isBefore(dayjs(minDate)) &&
              (!maxDate || !day.isAfter(dayjs(maxDate)))
            ) {
            } else {
              field.onChange(null);
            }
          };
          return (
            <DatePicker
              {...field}
              disabled={disabled}
              value={field.value ? dayjs(field.value) : null}
              label={
                label && validate?.required ? (
                  <RequiredLabel label={label} />
                ) : (
                  label
                )
              }
              minDate={dayjs(minDate)}
              maxDate={maxDate ? dayjs(maxDate) : undefined}
              slotProps={{
                popper: {
                  disablePortal: true,
                  sx: {
                    zIndex: 9999,
                  },
                },
                day: {
                  sx: {
                    "&.Mui-selected": {
                      color: "white",
                    },
                  },
                },
                yearButton: {
                  sx: {
                    "&.Mui-selected": {
                      color: "white",
                    },
                  },
                },
                textField: {
                  placeholder: "date",
                  size: "small",
                  fullWidth: true,
                  error: !!errors,
                  helperText: errors?.message,
                  onBlur: handleBlur,
                  sx: {
                    backgroundColor: "white",
                    "& .MuiInputBase-input": {
                      backgroundColor: "white",
                    },
                    "& .MuiFormHelperText-root": {
                      fontWeight: "bold",
                    },
                  },
                },
              }}
            />
          );
        }}
      />
    </LocalizationProvider>
  );
}
