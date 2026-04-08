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
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Footer({ sections = [] }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle scroll for home page sections
  const handleScroll = (ref) => {
    if (ref?.current) {
      const element = ref.current;
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }, 150);
    }
  };

  // Handle navigation
  const handleNavigation = (path, sectionLabel = null) => {
    if (pathname === path) {
      // If already on the target page
      if (path === "/" && sectionLabel) {
        const section = sections.find((s) => s.label === sectionLabel);
        if (section) handleScroll(section.ref);
      }
      return;
    }

    // If navigating to home with a section
    if (path === "/" && sectionLabel) {
      router.push(`/?section=${encodeURIComponent(sectionLabel)}`);
    } else {
      router.push(path);
    }
  };

  // Handle scrolling when arriving on home page with a section query
  useEffect(() => {
    if (pathname === "/") {
      const sectionLabel = searchParams.get("section");
      if (sectionLabel) {
        const section = sections.find(
          (s) => s.label === decodeURIComponent(sectionLabel),
        );
        if (section) {
          handleScroll(section.ref);
          // Clear the query parameter after scrolling
          router.replace("/", { scroll: false });
        }
      }
    }
  }, [pathname, searchParams, sections, router]);

  // Handle external navigation
  const handleExternalNavigation = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleKeyDown = (e, handler) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handler();
    }
  };

  return (
    <Grid
      size={12}
      sx={{ bgcolor: "#fff1d9", color: "white" }}
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
            height={{ xs: 26.8, md: 42 }}
            width={{ xs: 180, md: 282 }}
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
              fontWeight: "bold",
              fontSize: 24,
              color: "secondary.main",
              fontWeight: 700,
            }}
          >
            QUICK LINKS
          </Typography>
          <Typography
            role="button"
            tabIndex={0}
            fontSize={16}
            onClick={() => handleNavigation("/privacy")}
            onKeyDown={(e) =>
              handleKeyDown(e, () => handleNavigation("/privacy"))
            }
            sx={{
              color: "black",
              "&:hover": { cursor: "pointer", color: "primary.main" },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: "2px",
              },
            }}
          >
            <ChevronRightIcon
              sx={{ fontSize: 24, mb: -0.7, color: "primary.main" }}
            />
            Privacy Policy
          </Typography>
          <Typography
            role="button"
            tabIndex={0}
            fontSize={16}
            onClick={() => handleNavigation("/gdpr")}
            onKeyDown={(e) => handleKeyDown(e, () => handleNavigation("/gdpr"))}
            sx={{
              color: "black",
              "&:hover": { cursor: "pointer", color: "primary.main" },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: "2px",
              },
            }}
          >
            <ChevronRightIcon
              sx={{ fontSize: 24, mb: -0.7, color: "primary.main" }}
            />
            GDPR Compliance
          </Typography>
          <Typography
            role="button"
            tabIndex={0}
            fontSize={16}
            onClick={() => handleNavigation("/cookies")}
            onKeyDown={(e) =>
              handleKeyDown(e, () => handleNavigation("/cookies"))
            }
            sx={{
              color: "black",
              "&:hover": { cursor: "pointer", color: "primary.main" },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: "2px",
              },
            }}
          >
            <ChevronRightIcon
              sx={{ fontSize: 24, mb: -0.7, color: "primary.main" }}
            />
            Cookies Policy
          </Typography>
          <Typography
            role="button"
            tabIndex={0}
            fontSize={16}
            onClick={() => handleNavigation("/terms")}
            onKeyDown={(e) =>
              handleKeyDown(e, () => handleNavigation("/terms"))
            }
            sx={{
              color: "black",
              "&:hover": { cursor: "pointer", color: "primary.main" },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: "2px",
              },
            }}
          >
            <ChevronRightIcon
              sx={{ fontSize: 24, mb: -0.7, color: "primary.main" }}
            />
            Terms of Use
          </Typography>{" "}
          <Typography
            role="button"
            tabIndex={0}
            fontSize={16}
            onClick={() => handleNavigation("/profiling")}
            onKeyDown={(e) =>
              handleKeyDown(e, () => handleNavigation("/profiling"))
            }
            sx={{
              color: "black",
              "&:hover": { cursor: "pointer", color: "primary.main" },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: "2px",
              },
            }}
          >
            <ChevronRightIcon
              sx={{ fontSize: 24, mb: -0.7, color: "primary.main" }}
            />
            Profiling and Quality Score
          </Typography>
          <Typography
            role="button"
            tabIndex={0}
            fontSize={16}
            onClick={() =>
              handleExternalNavigation("//panels.frequentresearch.com/")
            }
            onKeyDown={(e) =>
              handleKeyDown(e, () =>
                handleExternalNavigation("//panels.frequentresearch.com/"),
              )
            }
            sx={{
              color: "black",
              "&:hover": { cursor: "pointer", color: "primary.main" },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: "2px",
              },
            }}
          >
            <ChevronRightIcon
              sx={{ fontSize: 24, mb: -0.7, color: "primary.main" }}
            />
            Panel Book
          </Typography>
          <Typography
            role="button"
            tabIndex={0}
            fontSize={16}
            onClick={() => handleNavigation("/faq")}
            onKeyDown={(e) => handleKeyDown(e, () => handleNavigation("/faq"))}
            sx={{
              color: "black",
              "&:hover": { cursor: "pointer", color: "primary.main" },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: "2px",
              },
            }}
          >
            <ChevronRightIcon
              sx={{ fontSize: 24, mb: -0.7, color: "primary.main" }}
            />
            FAQ
          </Typography>
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
            href="tel:+919810459700"
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
            <Typography sx={{ fontSize: 16 }}>+919810459700</Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            component="a"
            href="mailto:support@frequentresearch.com"
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
              support@frequentresearch.com
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
          <IconButton
            component="a"
            href="https://in.linkedin.com/company/frequentresearch"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="linkedin"
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
            <LinkedInIcon sx={{ fontSize: 26 }} />
          </IconButton>
          <IconButton
            component="a"
            target="_blank"
            href="https://www.facebook.com/frequentrfs/"
            rel="noopener noreferrer"
            aria-label="facebook"
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
            <FacebookIcon
              sx={{
                fontSize: 26,
              }}
            />
          </IconButton>
          <IconButton
            component="a"
            target="_blank"
            href="https://twitter.com/frequentrfs"
            rel="noopener noreferrer"
            aria-label="twitter"
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
            <XIcon
              sx={{
                fontSize: 22,
              }}
            />
          </IconButton>

          <IconButton
            component="a"
            target="_blank"
            href="https://www.youtube.com/channel/UCLxmn2kq4aACAHaL2eT6QIQ"
            rel="noopener noreferrer"
            aria-label="youtube"
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
            <YouTubeIcon
              sx={{
                fontSize: 26,
              }}
            />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Footer;
