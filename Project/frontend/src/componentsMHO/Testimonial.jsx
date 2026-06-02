"use client";
import React, { useState, useEffect } from "react";
import { Grid, Typography, Paper, Box, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const testimonialsData = [
  {
    content:
      "Earn money is never been so easy before, It's very good to share my opinion and get excellent rewards point. I'm so happy to earn money from Turn2Opinion",
    user: "Praveen Mehta",
    country: "India",
  },
  {
    content: "Quick redemption. Cheers",
    user: "Smith",
    country: "United States",
  },
  {
    content: "Amazing website and one of Best surveys website",
    user: "Amanda",
    country: "United States",
  },
  {
    content:
      "The clear design and technical functionality of the surveys are excellent! Very impressive function to explore more surveys.",
    user: "Eadfrith",
    country: "United Kingdom",
  },
  {
    content: "That's nice website give extra money for interesting services",
    user: "Haden",
    country: "Germany",
  },
  {
    content:
      "Easy process for registration, impressive payoff for our feedback ",
    user: "Oscar",
    country: "United States",
  },
  {
    content:
      "I really enjoy taking surveys through Turn2opinion. I feel they offer great promotions and reward their users very well. They also have an amazing customer service with timely responses and great follow through. Thank you!",
    user: "Gaera",
    country: "United States",
  },
  {
    content:
      "I've been using turn2opinion for around 4 or 5 years now, and not once in those years have I had a bad experience. Plenty of different survey engines to work from, and if you don't want to do surveys then you're free to do offers and play mobile games.",
    user: "Gavin",
    country: "United States",
  },
  {
    content:
      "If you like taking surveys this has to be the site for you. There's always plenty of surveys and the money soon mounts up. You can cash out with as little as a $2 via paypal which is far better than sites that make you hang on until you've hit $20+.",
    user: "Geetika",
    country: "India",
  },
  {
    content:
      "Whoa, I was so excited when I checked my mail today! My $12 credit reedeem at my paypal account so quickly! Thanks so much, turn2opinion.",
    user: "Wei",
    country: "China",
  },
];

const MotionPaper = motion(Paper);

function Testimonial() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % testimonialsData.length);
  const prev = () =>
    setIndex(
      (prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length
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
