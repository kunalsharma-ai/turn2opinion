"use client";
import React from "react";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { parsePhoneNumber } from "libphonenumber-js";
import "react-phone-input-2/lib/material.css";
import { Page } from "@/util";

export default function Phone({
  control,
  errors,
  name,
  label,
  labelText,
  required,
  validations,
  onlyCountries,
  disableDropdown,
  disabled = false,
  selectedCountry
}) {
  const [defaultCountry, setDefaultCountry] = React.useState();
  React.useEffect(() => {
    if (onlyCountries && onlyCountries.length > 0)
      setDefaultCountry(onlyCountries[0]);
  }, [onlyCountries]);
  React.useEffect(()=>{
    if(selectedCountry)setDefaultCountry(selectedCountry)
  },[selectedCountry])
  return (
    <>
      {labelText && (
        <Page.Text sx={{ fontWeight: 500, color: "#555" }}>
          {labelText}
          {required && <span style={{ color: "red", fontWeight: 600 }}>*</span>}
        </Page.Text>
      )}
      <Controller
        name={name}
        control={control}
        rules={
          disabled
            ? {}
            : {
                ...validations,
                validate: (val) => {
                  if (!val || val.trim() === "") return "Required"; // allow blank
                  try {
                    const parsedPhone = parsePhoneNumber("+" + val);
                    return parsedPhone.isValid() || "Invalid phone number";
                  } catch (err) {
                    return "Invalid phone number";
                  }
                },
              }
        }
        render={({ field }) => (
          <PhoneInput
            country={defaultCountry}
            onlyCountries={onlyCountries}
            disableDropdown={disabled || disableDropdown}
            disabled={disabled}
            value={field.value}
            onChange={(value) => field.onChange(value)}
            countryCodeEditable={!Boolean(selectedCountry)}
            inputProps={{
              name: name,
              autoFocus: false,
              disabled: disabled,
            }}
            inputStyle={{
              width: "100%",
              height: "34px",
              color: "grey",
              fontSize: "14px",
              borderColor: errors?.message ? "red" : " #0000003b",
            }}
            inputClass="custom-phone-font"
            specialLabel={""}
          />
        )}
      />

      {errors && <small style={{ color: "red" }}>{errors.message}</small>}
    </>
  );
}
/*
"use client";
import React from "react";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { parsePhoneNumber, isValidPhoneNumber } from "libphonenumber-js"
import "react-phone-input-2/lib/material.css";

export default function Phone({ control, errors, name, label, validations }) {
  const [defaultCountry, setDefaultCountry] = React.useState("in");

  return (
    <>
      <Controller
        name={ name }
        control={ control }
        rules={ {
          ...validations, validate: (val) => {
            if (!val || val.trim() === '') return;
            const parsedPhone = parsePhoneNumber("+"+val);
            return parsedPhone.isValid ?? "Invalid Phone number"
          }
        } }
        render={ ({ field }) => (
          <><PhoneInput
            country={ defaultCountry }
            value={ field.value }
            specialLabel={ label }
            onChange={ (value) => field.onChange(value) }
            inputProps={ {
              name: { name },
              height: "34px",
              autoFocus: false,
            } }
            inputStyle={ {
              width: "100%",
              height: "34px",
              color: "grey",
              fontSize: "14px",
            } }
            inputClass="custom-phone-font"
          />
          
          </>
        ) }
      />
    </>
  );
}
//*/
