"use client";
import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  useTheme,
} from "@mui/material";

import SubHeader from "@/componentsMHO/SubHeader";
const Contact = () => {
  const theme = useTheme();
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    // Handle form submission
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Grid size={12} container justifyContent="center" className="scroll-target">
      <SubHeader title="Contact Us" pageName="Contact" />

      <Grid size={12} container justifyContent={"center"} bgcolor="white">
        <Grid container size={{ xs: 11, md: 10 }} spacing={2} p={4} mt={2}>
          <Grid
            container
            size={{ xs: 12, lg: 4 }}
            direction="column"
            alignItems="flex-start"
            gap={0.5}
            sx={{
              bgcolor: "whitesmoke",
              border:  `1px solid #e0e0e0`,

              p: 2,
              minHeight: "90px",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, color: "primary.main" }}
            >
              Email
            </Typography>
            <Typography
              component="a"
              href="mailto:support@frequentresearch.com"
              sx={{
                display: "block",
                color: "secondary.main",
                fontSize: "16px",
                fontWeight: 600,
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              support@frequentresearch.com
            </Typography>
          </Grid>
          <Grid
            size={{ xs: 12, lg: 4 }}
            direction="column"
            alignItems="flex-start"
            gap={0.5}
            sx={{
              bgcolor: "whitesmoke",
              border: `1px solid #e0e0e0`,

              p: 2,
              minHeight: "90px",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, color: "primary.main" }}
            >
              Phone
            </Typography>
            <Typography
              component="a"
              href="tel:+918130015743"
              sx={{
                display: "block",
                color: "secondary.main",
                fontSize: "16px",
                fontWeight: 600,
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              +91 8130015743
            </Typography>
          </Grid>
          <Grid
            size={{ xs: 12, lg: 4 }}
            direction="column"
            alignItems="flex-start"
            gap={0.5}
            sx={{
              bgcolor: "whitesmoke",
              border: `1px solid #e0e0e0`,
              p: 2,
              minHeight: "90px",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, color: "primary.main" }}
            >
              Address
            </Typography>
            <Typography
              component="a"
              href="//goo.gl/maps/omWW4BDscx5fZpFdA"
              target="_blank"
              rel="noreferrer"
              sx={{
                display: "block",
                color: "secondary.main",
                fontSize: "16px",
                fontWeight: 600,
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Mangolpur Kalan, New Delhi - 110085
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          size={{ xs: 11, md: 10 }}
          spacing={2}
          p={{ xs: 1, md: 4 }}
          mb={3}
        >
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box
              sx={{
                px: { xs: 0, lg: 4 },
                borderRadius: 2,
                mb: { xs: 3, lg: 0 },
                bgcolor: "background.default",
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  my: 3,
                  color: "text.primary",
                }}
              >
                Get In Touch
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={1.5}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      size="small"
                      fullWidth
                      name="firstName"
                      label="First Name"
                      variant="outlined"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      inputProps={{
                        pattern: "^[a-zA-Z]+$",
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      size="small"
                      fullWidth
                      name="lastName"
                      label="Last Name"
                      variant="outlined"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      inputProps={{
                        pattern: "^[a-zA-Z]+$",
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      size="small"
                      fullWidth
                      name="email"
                      type="email"
                      label="Email"
                      variant="outlined"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      size="small"
                      fullWidth
                      name="phone"
                      type="tel"
                      label="Contact No"
                      variant="outlined"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={12}>
                    <TextField
                      size="small"
                      fullWidth
                      name="message"
                      label="Message"
                      variant="outlined"
                      multiline
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "white",
                        border: 1,
                        borderColor: "secondary.main",
                        textTransform: "none",
                        background: (theme) => theme.gradients.bgprimary.main,
                        bgcolor: "transparent",

                        "&:hover": {
                          background: (theme) =>
                            theme.gradients.bgsecondary.main,
                        },
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <Box
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                height: "100%",
              }}
            >
              <iframe
                src="//www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.8222201626054!2d77.1112085!3d28.694964199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d055691b37e47%3A0xa652bd028161255c!2sFrequent%20Research%20Fieldwork%20Solutions%20Pvt.%20Ltd!5e0!3m2!1sen!2sin!4v1680177657397!5m2!1sen!2sin"
                style={{ border: 0, width: "100%", height: "400px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Frequent Research Fieldwork Solutions Location"
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Contact;
