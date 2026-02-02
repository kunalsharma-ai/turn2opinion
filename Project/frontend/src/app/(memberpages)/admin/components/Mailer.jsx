"use client";
import React from "react";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { Form } from "@/components";
import { Page } from "@/util";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const newSurvey = `<table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center">
      <img
        src="https://myhealthopinions.com/images/logo/logo-300w.png"
        alt="My Health Opinions"
        style="width: 320px; height: auto; margin: 0; padding: 0"
      />
    </td>
  </tr>
</table>

<div
  style="
    max-width: 600px;
    margin: auto;
    background: #f8f8f8;
    border: 1px solid rgba(89, 172, 119, 0.3);
    border-radius: 6px;
  "
>
  <div style="padding: 30px 20px; font-family: Roboto, sans-serif">
    <h2 style="text-align: center; color: #2a3940; font-weight: 400; margin: 0">
      Hey {{user.name.first}},
    </h2>

    <p
      style="
        font-size: 17px;
        color: #2a3940;
        text-align: center;
        margin: 20px 0;
      "
    >
      A new survey is now available for you on MyHealthOpinions.
    </p>

    <table
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="
        background: #ffffff;
        border: 1px solid #dcdcdc;
        border-radius: 4px;
        font-family: Roboto, sans-serif;
        font-size: 15px;
        color: #2a3940;
        margin: 30px auto;
      "
    >
      <tr>
        <td
          style="
            padding: 12px 10px;
            border-bottom: 1px solid #eaeaea;
            font-weight: 600;
            width: 40%;
          "
        >
          Survey Name
        </td>
        <td style="padding: 12px 10px; border-bottom: 1px solid #eaeaea">
          {{survey.name}}
        </td>
      </tr>

      <tr>
        <td
          style="
            padding: 12px 10px;
            border-bottom: 1px solid #eaeaea;
            font-weight: 600;
          "
        >
          Category
        </td>
        <td style="padding: 12px 10px; border-bottom: 1px solid #eaeaea">
          {{survey.category}}
        </td>
      </tr>

      <tr>
        <td
          style="
            padding: 12px 10px;
            border-bottom: 1px solid #eaeaea;
            font-weight: 600;
          "
        >
          Points
        </td>
        <td style="padding: 12px 10px; border-bottom: 1px solid #eaeaea">
          {{survey.points}}
        </td>
      </tr>

      <tr>
        <td style="padding: 12px 10px; font-weight: 600">Estimated Time</td>
        <td style="padding: 12px 10px">{{survey.time}} minutes</td>
      </tr>
    </table>

    <p
      style="
        font-size: 17px;
        color: #2a3940;
        text-align: center;
        margin: 20px 0;
      "
    >
      Your insights matter, and we'd appreciate your participation. Click below
      to start the survey.
    </p>

    <div style="text-align: center; margin: 55px 0">
      <a
        href=""
        target="_blank"
        style="
          display: inline-block;
          background: #04662b;
          color: #fff;
          padding: 12px 40px;
          text-decoration: none;
          font-size: 18px;
          border-radius: 2px;
        "
      >
        Start Survey
      </a>
    </div>

    <hr style="border: 0; border-top: 2px solid #e8e8e8; margin: 30px 0" />

     <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="font-family: Calibri, sans-serif"
    >
      <tr>
        <td style="padding: 0 10px; font-size: 12px; color: #555">
          <span>With Regards,</span><br />

          <strong style="font-size: 16px; color: #04662b"
            >Frequent Research Fieldwork Solutions</strong
          ><br /><br />

          <span>Email:&nbsp;</span>
          <a
            href="mailto:support@frequentresearch.com"
            style="color: #04662b; text-decoration: none"
          >
            <strong>support@frequentresearch.com</strong>
          </a>

          <span>&nbsp; | &nbsp;Mobile:&nbsp;</span>
          <a
            href="tel:+919810459700"
            style="color: #04662b; text-decoration: none"
          >
            <strong>+919810459700</strong>
          </a>

          <br />

          <table cellpadding="0" cellspacing="0" style="font-size: 12px; color: #555">
            <tr valign="top">
              <td style="padding-right: 20px">
                <a href="https://www.frequentresearch.com/" style="text-decoration: none">
                  <img
                    src="https://www.frequentresearch.com/mailer/frequent_signature_logo.jpg"
                    alt="Frequent Research Fieldwork Solutions Pvt. Ltd."
                    width="125"
                    height="93"
                    style="display: block; margin: 5px 0"
                  />
                </a>

                <div>
                  <span>Website:&nbsp;</span>
                  <a
                    href="https://www.frequentresearch.com/"
                    style="text-decoration: none"
                  >
                    <strong style="color: #04662b">www.frequentresearch.com</strong>
                  </a>
                </div>
              </td>

              <td>
                <a
                  href="https://directory.esomar.org/company/8408/frequent-research-fieldwork-solutions"
                  style="text-decoration: none"
                >
                  <img
                    src="https://www.frequentresearch.com/mailer/iso_esomarv3.png"
                    width="155"
                    height="93"
                    alt="ISO ESOMAR"
                    style="display: block; margin: 5px 0"
                  />
                </a>

                <strong>
                  <em>
                    <span style="font-size: 11px; color: #1f497d">Connect with us:</span>
                  </em>
                </strong>

                <table cellpadding="0" cellspacing="0" style="margin-top: 5px">
                  <tr>
                    <td>
                      <a href="https://in.linkedin.com/company/frequentresearch">
                        <img
                          src="https://www.frequentresearch.com/mailer/Linkedin.png"
                          width="20"
                          height="20"
                          alt="LinkedIn"
                          style="display: block"
                        />
                      </a>
                    </td>

                    <td style="width: 5px"></td>

                    <td>
                      <a href="https://www.facebook.com/frequentrfs/">
                        <img
                          src="https://www.frequentresearch.com/mailer/facebook.png"
                          width="20"
                          height="20"
                          alt="Facebook"
                          style="display: block"
                        />
                      </a>
                    </td>

                    <td style="width: 5px"></td>

                    <td>
                      <a href="https://twitter.com/frequentrfs/">
                        <img
                          src="https://www.frequentresearch.com/mailer/twitter.png"
                          width="20"
                          height="20"
                          alt="Twitter"
                          style="display: block"
                        />
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td colspan="2" height="10" style="line-height: 10px; font-size: 1px">
                &nbsp;
              </td>
            </tr>
          </table>

          <em>
            <span
              style="
                font-size: 11px;
                font-family: Webdings;
                color: green;
                float: right;
              "
              >P</span
            >
          </em>
          <span style="font-size: 11px; color: #339966; float: right">
            Printing emails kills trees. Print is murder!
          </span>
        </td>
      </tr>
    </table>
    </table>
  </div>
</div>
`;

export default function Mailer({ users, survey }) {
  const form = useForm();
  const editorId = React.useId();
  const { handleSubmit, control } = form;

  React.useEffect(() => {
    if (!survey) return;
    form.setValue("subject", survey?.name || "");
    form.setValue("content", newSurvey || "");
  }, [survey]);

  const submitHandler = (data) => {
    console.log(data);
  };
console.log(survey)
  return (
    <Grid
      component="form"
      onSubmit={handleSubmit(submitHandler)}
      size={12}
      container
      p={2}
      spacing={1.5}
    >
      {/* <pre>{JSON.stringify(survey, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}
      <Grid size={12}>
        <Form.Select
          control={control}
          {...form.register("from")}
          label="From"
          options={[
            {
              label: "mail@abc.com",
              value: "value",
            },
          ]}
        />
      </Grid>
      <Form.Input
        control={control}
        {...form.register("subject")}
        label="Subject"
      />
      <Form.TextEditor
        {...form.register("content")}
        control={control}
        label="Content"
        height={430}
        editorId={editorId}
        dialogScoped
      />
      <Grid
        size={12}
        container
        justifyContent="space-between"
        alignItems="center"
        pl={2}
      >
        <Page.Box display="flex" alignItems="center">
          <Form.Checkbox
            name="isScheduled"
            label="Schedule Email"
            control={control}
          />

          {form.watch("isScheduled") && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                // value=""
                onChange={(newValue) => form.setValue("schedule", newValue)}
                format="DD MMM YYYY hh:mm A"
                slotProps={{
                  popper: {
                    sx: {
                      zIndex: 20000,
                    },
                  },
                  textField: {
                    size: "small",
                    sx: {
                      "& .MuiInputBase-input": {
                        fontSize: 12,
                      },
                    },
                  },
                }}
              />
            </LocalizationProvider>
          )}
        </Page.Box>
        <Page.MuiButton
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ fontWeight: 600 }}
        >
          Send
        </Page.MuiButton>
      </Grid>
    </Grid>
  );
}
