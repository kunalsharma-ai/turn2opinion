"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Box, Grid, Typography, Button, Stack, Divider } from "@mui/material";
import SubHeader from "@/componentsMHO/SubHeader";
import { Form } from "@/components";
import { useMember, useTelemetry } from "@/Context";
import contact from "@/validators/contact";
import { api, Page } from "@/util";
import { useToast } from "@/hooks";

const Contact = () => {
  const form = useForm();
  const [member, telemetry] = [useMember(), useTelemetry()];
  const [country, setCountry] = React.useState("");
  const errors = form.formState.errors;
  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      backgroundColor: "#FFFFFF",
      "& fieldset": {
        borderColor: "#D5E3F2",
      },
      "&:hover fieldset": {
        borderColor: "#0C5ADB",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#0C5ADB",
      },
    },
  };

  const contactCardSx = {
    height: "100%",
    p: { xs: 2.5, md: 3 },
    borderRadius: 2.5,
    border: "1px solid #C9DFF2",
    background: "linear-gradient(135deg, #FFFFFF 0%, #F0F8FF 100%)",
    boxShadow: "0 6px 20px rgba(12, 90, 219, 0.07)",
    transition: "all 0.25s ease",
    "&:hover": {
      borderColor: "#0C5ADB",
      boxShadow: "0 10px 28px rgba(12, 90, 219, 0.13)",
      transform: "translateY(-3px)",
    },
  };
  React.useEffect(() => {
    telemetry.ip().then((resp) => {
      if (resp.country) {
        setCountry(resp.country.toLowerCase());
      }
    });
  }, [telemetry]);

  return (
    <Grid
      size={12}
      container
      justifyContent="center"
      className="scroll-target"
      sx={{
        backgroundColor: "#EEF6FC",
      }}
    >
      <SubHeader title="Contact Us" pageName="Contact" />

      <Box
        sx={{
          width: "100%",
          py: { xs: 4, md: 6 },
          background: "whitesmoke",
          background: "linear-gradient(180deg, #EEF6FC 0%, #E5F2FC 100%)",
        }}
      >
        <Grid container size={{ xs: 11, md: 10 }} mx="auto" spacing={2.5}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={contactCardSx}>
              <Stack spacing={1}>
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 1.2,
                    color: "#0C5ADB",
                  }}
                >
                  Email
                </Typography>
                <Typography
                  component="a"
                  href="mailto:support@turn2opinion.com"
                  sx={{
                    color: "#102A43",
                    fontSize: { xs: 15, md: 16 },
                    fontWeight: 600,
                    textDecoration: "none",
                    wordBreak: "break-word",
                    "&:hover": {
                      color: "#0C5ADB",
                    },
                  }}
                >
                  support@turn2opinion.com
                </Typography>
              </Stack>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={contactCardSx}>
              <Stack spacing={1}>
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 1.2,
                    color: "#0C5ADB",
                  }}
                >
                  Phone
                </Typography>
                <Typography
                  component="a"
                  href="tel:+918130015743"
                  sx={{
                    color: "#102A43",
                    fontSize: { xs: 15, md: 16 },
                    fontWeight: 600,
                    textDecoration: "none",
                    "&:hover": {
                      color: "#0C5ADB",
                    },
                  }}
                >
                  +91 8130015743
                </Typography>
              </Stack>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={contactCardSx}>
              <Stack spacing={1}>
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 1.2,
                    color: "#0C5ADB",
                  }}
                >
                  Address
                </Typography>
                <Typography
                  component="a"
                  href="//goo.gl/maps/omWW4BDscx5fZpFdA"
                  target="_blank"
                  rel="noreferrer"
                  sx={{
                    color: "#102A43",
                    fontSize: { xs: 15, md: 16 },
                    fontWeight: 600,
                    lineHeight: 1.5,
                    textDecoration: "none",
                    "&:hover": {
                      color: "#0C5ADB",
                    },
                  }}
                >
                  Mangolpur Kalan, New Delhi - 110085
                </Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          width: "100%",
          py: { xs: 5, md: 7 },
          background: "linear-gradient(180deg, #E5F2FC 0%, #D7ECFA 100%)",
        }}
      >
        <Grid
          container
          size={{ xs: 11, md: 10 }}
          mx="auto"
          spacing={{ xs: 3, md: 4 }}
          alignItems="stretch"
        >
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box
              sx={{
                height: "100%",
                p: { xs: 2.5, sm: 3.5, md: 4 },
                borderRadius: 3,
                backgroundColor: "#FFFFFF",
                border: "1px solid #C9DFF2",
                boxShadow: "0 12px 35px rgba(12, 90, 219, 0.10)",
              }}
            >
              <Stack spacing={1} mb={3}>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: 28, md: 32 },
                    color: "#063686",
                  }}
                >
                  Get In Touch
                </Typography>

                <Typography
                  sx={{
                    color: "#52677A",
                    fontSize: 15,
                    lineHeight: 1.7,
                    maxWidth: 500,
                  }}
                >
                  Have a question or need assistance? Fill out the form below
                  and our team will get back to you shortly.
                </Typography>
              </Stack>

              <Divider
                sx={{
                  mb: 3,
                  borderColor: "#DCEAF5",
                }}
              />

              <Box
                component="form"
                onSubmit={form.handleSubmit(async (data) => {
                  const resp = await api.put(`/api/v1/quote`, data);
                  useToast(resp);
                })}
              >
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Form.Input
                      size="small"
                      fullWidth
                      label="First Name"
                      variant="outlined"
                      sx={inputSx}
                      control={form.control}
                      {...form.register("firstName")}
                      validations={contact.name.first}
                      errors={errors.firstName}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Form.Input
                      size="small"
                      fullWidth
                      label="Last Name"
                      variant="outlined"
                      sx={inputSx}
                      control={form.control}
                      {...form.register("lastName")}
                      validations={contact.name.last}
                      errors={errors.lastName}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Form.Input
                      size="small"
                      fullWidth
                      label="E-Mail"
                      variant="outlined"
                      sx={inputSx}
                      control={form.control}
                      {...form.register("email")}
                      validations={contact.email}
                      errors={errors.email}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Form.Phone
                      size="small"
                      fullWidth
                      label="Contact Number"
                      variant="outlined"
                      sx={inputSx}
                      selectedCountry={country}
                      disableDropdown={Boolean(country)}
                      control={form.control}
                      {...form.register("phone")}
                      validations={contact.phone}
                      errors={errors.phone}
                    />
                  </Grid>

                  <Grid size={12}>
                    <Form.TextEditor
                      size="small"
                      fullWidth
                      label="Message"
                      variant="outlined"
                      sx={inputSx}
                      control={form.control}
                      {...form.register("message")}
                      validations={contact.message}
                      errors={errors.message}
                    />
                  </Grid>

                  <Grid size={12}>
                    <Page.MuiButton
                      // <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      loading={true}
                      loadingIndicator={"Sending..."}
                      sx={{
                        mt: 0.5,
                        py: 1.4,
                        borderRadius: 2,
                        fontSize: 16,
                        fontWeight: 600,
                        color: "#FFFFFF",
                        textTransform: "none",
                        border: 1,
                        borderColor: "#063686",
                        background:
                          "linear-gradient(90deg, #063686 0%, #0C5ADB 100%)",
                        boxShadow: "0 6px 16px rgba(12, 90, 219, 0.25)",
                        "&:hover": {
                          background:
                            "linear-gradient(90deg, #052B6C 0%, #084AAE 100%)",
                          boxShadow: "0 8px 20px rgba(12, 90, 219, 0.32)",
                        },
                        "&:disabled": {
                          background: "lightgrey",
                          color: "transparent",
                          borderColor: "#f4f4f4",
                        },
                        "& .MuiButton-loadingIndicator": {
                          color: "#fff",
                        },
                      }}
                    >
                      Send Message
                      {/* </Button> */}
                    </Page.MuiButton>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <Box
              sx={{
                width: "100%",
                height: { xs: 380, sm: 450, lg: "100%" },
                minHeight: { lg: 550 },
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid #C9DFF2",
                boxShadow: "0 12px 35px rgba(12, 90, 219, 0.10)",
                backgroundColor: "#FFFFFF",
              }}
            >
              <Box
                component="iframe"
                src="//www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.8222201626054!2d77.1112085!3d28.694964199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d055691b37e47%3A0xa652bd028161255c!2sFrequent%20Research%20Fieldwork%20Solutions%20Pvt.%20Ltd!5e0!3m2!1sen!2sin!4v1680177657397!5m2!1sen!2sin"
                title="Frequent Research Fieldwork Solutions Location"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                sx={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default Contact;
