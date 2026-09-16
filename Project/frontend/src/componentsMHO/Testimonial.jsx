"use client";
import React, { useState, useEffect } from "react";
import { Grid, Typography, Paper, Box, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const testimonialsData = [
  {
    user: "Maya",
    country: "United States",
    content:
      "I joined without expecting much, but the experience has been better than I thought. The surveys are straightforward and earning rewards feels simple.",
  },
  {
    user: "Thomas",
    country: "Ireland",
    content:
      "A very easy platform to use. I can complete surveys whenever I have some free time, and I like knowing what the survey is about before starting.",
  },
  {
    user: "Samantha",
    country: "New Zealand",
    content:
      "The whole process is quite smooth. From creating an account to completing surveys, everything is explained clearly and the website is easy to navigate.",
  },
  {
    user: "Ahmed",
    country: "Saudi Arabia",
    content:
      "I have been using the site for a while and the experience has been positive. There are different types of surveys and the interface is very user friendly.",
  },
  {
    user: "Clara",
    country: "Portugal",
    content:
      "What I like most is that I can participate from home whenever I have spare time. The surveys are generally interesting and don't feel complicated.",
  },
  {
    user: "Robert",
    country: "Sweden",
    content:
      "A simple way to participate in market research. I appreciate the clear survey instructions and the professional look of the platform.",
  },
  {
    user: "Fatima",
    country: "Malaysia",
    content:
      "I was searching for a genuine survey platform and decided to give this one a chance. So far, the experience has been convenient and easy to manage.",
  },
  {
    user: "George",
    country: "United Kingdom",
    content:
      "The website is clean and easy to use. I can quickly see available opportunities and decide which surveys I have time to complete.",
  },
  {
    user: "Elena",
    country: "Mexico",
    content:
      "I enjoy giving my opinion on different products and services. Getting rewarded for sharing those opinions makes the experience even better.",
  },
  {
    user: "Hassan",
    country: "Egypt",
    content:
      "The sign-up process was quick and I found the platform very easy to understand. It is a convenient option for using my spare time productively.",
  },
  {
    user: "Anna",
    country: "Poland",
    content:
      "I have used several online survey platforms, and I really like the simplicity of this one. No confusing steps and the survey information is easy to follow.",
  },
  {
    user: "Diego",
    country: "Argentina",
    content:
      "A nice opportunity to share opinions about brands and everyday products. The surveys are easy to access and the overall experience has been good.",
  },
  {
    user: "Chloe",
    country: "Belgium",
    content:
      "I like the flexibility of participating whenever I have a few minutes available. The website is responsive and the survey process is quite simple.",
  },
  {
    user: "Nathan",
    country: "Philippines",
    content:
      "The platform is easy to understand even for someone new to paid surveys. I had no trouble finding my way around and completing my first survey.",
  },
  {
    user: "Yuki",
    country: "Japan",
    content:
      "A convenient way to participate in research while earning rewards. I like the straightforward design and the fact that the survey process is clearly explained.",
  },
];

const MotionPaper = motion.create(Paper);

function Testimonial() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % testimonialsData.length);
  const prev = () =>
    setIndex(
      (prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length,
    );

  // optional autoplay
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonialsData[index];

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: { xs: "100vh", lg: 600 },
        py: 12,
        px: 2,
        position: "relative",
        bgcolor: "secondary.main",
        backgroundImage: "url(/imagest2o/testi-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: "#8cbcff",
          opacity: 0.6,
          zIndex: 1,
        },
      }}
    >
      <Box
        sx={{
          zIndex: 2,
          height: 650,
          width: 650,
          borderRadius: { xs: "20px", lg: "50%" },
          bgcolor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          px: { xs: 2, lg: 6 },
          textAlign: "center",
        }}
      >
        <IconButton
          aria-label="previous button"
          onClick={prev}
          sx={{
            position: "absolute",
            left: { xs: -10, lg: 20 },
            color: "#eee",
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        <IconButton
          aria-label="next button"
          onClick={next}
          sx={{
            position: "absolute",
            right: { xs: -10, lg: 20 },
            color: "#eee",
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>

        <AnimatePresence mode="wait">
          <MotionPaper
            key={index}
            elevation={0}
            sx={{ background: "transparent" }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
          >
            <Typography fontSize={22} color="black" fontWeight={700} mb={3}>
              {current.content}
            </Typography>

            <Typography
              fontStyle="italic"
              fontWeight={700}
              color="primary.main"
              fontSize={16}
            >
              {current.user} ({current.country})
            </Typography>
          </MotionPaper>
        </AnimatePresence>
      </Box>
    </Grid>
  );
}

export default Testimonial;
