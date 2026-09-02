"use client";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import React, { useEffect } from "react";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { api, loadData } from "@/util";

const socialIcons = {
  linkedin: LinkedInIcon,
  facebook: FacebookIcon,
  twitter: XIcon,
  x: XIcon,
  youtube: YouTubeIcon,
  instagram: InstagramIcon,
};

function Footer({ sections = [] }) {
  const [socials, setSocials] = React.useState([]);

  React.useEffect(() => {
    loadData(api.get("/api/v1/socials"), (resp) => setSocials(resp.data || []));
  }, []);

  const availableSocials = socials.filter(
    (social) =>
      social?.url &&
      typeof social.url === "string" &&
      social.url.trim() !== "" &&
      socialIcons[social.platform?.toLowerCase()],
  );

  return (
    <Grid
      size={12}
      sx={{ bgcolor: "#c6e3f4", color: "white" }}
      container
      justifyContent="center"
      // px={3}
    >
      <Grid
        size={12}
        container
        px={{ xs: 2, lg: 5 }}
        justifyContent="center"
        spacing={{ xs: 0, lg: 5 }}
      >
        <Grid
          size={{ xs: 12, lg: 4 }}
          container
          direction="column"
          spacing={2}
          py={4}
        >
          <Box
            component={"img"}
            src="/images/logo/t2o-logo.png"
            alt="logo"
            height={80}
            width={263}
            // height={{ xs: 26.8, md: 42 }}
            // width={{ xs: 180, md: 282 }}
          />
          <Typography color="#555" fontSize={16} textAlign="justify">
            Turn2Opinion is a world wide Consumer and Business Community of
            Frequent Research. Turn2Opinion welcomes you as our new panel
            members to take participate and share your opinion and perspective
            to wide-ranging market research survey campaigns.
          </Typography>
        </Grid>
        <Grid
          size={{ xs: 12, sm: 6, lg: 4 }}
          container
          direction="column"
          spacing={{ xs: 0.5, lg: 2 }}
          py={{ xs: 1, lg: 4 }}
        >
          <Typography
            sx={{
              fontSize: 24,
              color: "secondary.main",
              fontWeight: 700,
            }}
          >
            QUICK LINKS
          </Typography>

          {[
            { label: "Privacy Policy", href: "/privacy" },
            { label: "GDPR Compliance", href: "/gdpr" },
            { label: "Cookies Policy", href: "/cookies" },
            { label: "Terms of Use", href: "/terms" },
            {
              label: "Profiling and Quality Score",
              href: "/profiling",
            },
            {
              label: "Panel Book",
              href: "https://panels.frequentresearch.com/",
            },
            { label: "FAQ", href: "/faq" },
          ].map((link) => (
            <Typography
              key={link.href}
              component="a"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              fontSize={16}
              sx={{
                color: "black",
                textDecoration: "none",
                "&:hover": {
                  cursor: "pointer",
                  color: "primary.main",
                },
                "&:focus-visible": {
                  outline: "2px solid",
                  outlineColor: "primary.main",
                  outlineOffset: "2px",
                },
              }}
            >
              <ChevronRightIcon
                sx={{
                  fontSize: 24,
                  mb: -0.7,
                  color: "primary.main",
                }}
              />
              {link.label}
            </Typography>
          ))}
        </Grid>

        <Grid
          size={{ xs: 12, sm: 6, lg: 4 }}
          container
          direction="column"
          spacing={{ xs: 0.5, lg: 2 }}
          py={{ xs: 2, lg: 4 }}
        >
          <Typography
            sx={{ fontWeight: "bold", fontSize: 24, color: "secondary.main" }}
          >
            CONTACT US
          </Typography>
          <Box
            display="flex"
            component="a"
            href="https://goo.gl/maps/omWW4BDscx5fZpFdA"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "black",
              "&:hover": {
                color: "primary.main",
              },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: "2px",
              },
            }}
          >
            <LocationPinIcon
              sx={{
                mr: { xs: 1, lg: 2 },
                mt: 0.5,
                color: "primary.main",
                fontSize: { xs: "22px", xl: "26px" },
              }}
            />
            <Box>
              <Typography sx={{ fontSize: 16 }}>Mangolpur Kalan,</Typography>
              <Typography sx={{ fontSize: 16 }}>New Delhi - 110085</Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            component="a"
            href="tel:+918130015743"
            sx={{
              color: "black",
              "&:hover": {
                color: "primary.main",
              },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: "2px",
              },
            }}
          >
            <CallIcon
              sx={{
                mr: { xs: 1, lg: 2 },
                color: "primary.main",
                fontSize: { xs: "22px", xl: "26px" },
              }}
            />
            <Typography sx={{ fontSize: 16 }}>+918130015743</Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            component="a"
            href="mailto:support@turn2opinion.com"
            sx={{
              color: "black",
              "&:hover": {
                color: "primary.main",
              },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: "2px",
              },
            }}
          >
            <EmailIcon
              sx={{
                mr: { xs: 1, lg: 2 },
                color: "primary.main",
                fontSize: { xs: "22px", xl: "26px" },
              }}
            />
            <Typography sx={{ fontSize: 16 }}>
              support@turn2opinion.com
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid
        size={12}
        container
        sx={{
          bgcolor: "black",
          py: 1,
          color: "#fff",
          fontWeight: 500,
          fontSize: 13,
        }}
      >
        <Grid
          size={{ xs: 12, md: 8 }}
          container
          alignItems={"center"}
          justifyContent={{ xs: "center", md: "flex-start" }}
          pl={{ md: 5 }}
        >
          Copyright 2026 ©{" "}
          <Typography
            component="a"
            href="https://frequentresearch.com/"
            target="_blank"
            rel="noopener noreferrer"
            color="primary.main"
            fontSize={13}
            sx={{
              "&:hover": { textDecoration: "underline" },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: "2px",
              },
            }}
          >
            Frequent Research Fieldwork Solutions Pvt. Ltd.
          </Typography>{" "}
          (d/b/a Turn2Opinion). All Rights Reserved.
        </Grid>
        <Grid
          size={{ xs: 12, md: 4 }}
          container
          alignItems="center"
          justifyContent={{ xs: "center", lg: "flex-start" }}
          spacing={2}
          pl={1}
          mt={{ xs: 0.5, lg: 0 }}
        >
          {availableSocials.map((social) => {
            const platform = social.platform?.toLowerCase();
            const Icon = socialIcons[platform];
            return (
              <IconButton
                key={social._id || platform}
                component="a"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.platform}
                sx={{
                  p: 0,
                  color: "white",
                  "&:hover": { color: "primary.main" },
                  "&:focus-visible": {
                    outline: "2px solid",
                    outlineColor: "primary.main",
                    outlineOffset: "2px",
                  },
                }}
              >
                <Icon
                  sx={{
                    fontSize:
                      platform === "twitter" || platform === "x" ? 22 : 26,
                  }}
                />
              </IconButton>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Footer;
