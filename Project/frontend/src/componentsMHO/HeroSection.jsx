"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  useMediaQuery,
  Grid,
  Avatar,
} from "@mui/material";

const BannerData = [
  {
    backgroundImg: "/images/home/banner/bg1.jpg",
    title1: "Make fast and easy money with us",
    title2: "Simple way to generate more cash rewards",
    caption:
      "We have a very easy process to make you rewarded for your efforts and time with a high value incentives in just a very simple three step process i.e. → Free registration, → Quick survey Participation and → Earn Rewards",
  },
  {
    backgroundImg: "/images/home/banner/bg2.jpg",
    title1: "We value your feedback",
    title2: "	your opinion gets rewarded",
    caption:
      "Our service will give you more opportunities to enhance your knowledge and experience. Our community gives a high value monitory rewards on sharing your thought, knowledge and experiences.",
  },
  {
    backgroundImg: "/images/home/banner/bg3.jpg",
    title1: "Let's make your opinion reach the world",
    title2: "Earn more & more money with us",
    caption:
      "Your experiences and loyal feedback will help Global Industrial Clients to improve their product and services with a new innovative approach",
  },
];

const HeroSection = ({ setOpenSignUp }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BannerData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentBanner = BannerData[currentSlide];

  return (
    <Grid
      size={12}
      sx={{
        position: "relative",
        zIndex: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 0, sm: 4 },
        py: { xs: 5, md: 0 },
        textAlign: "center",
        minHeight: { xs: 400, lg: "calc(100vh - 120px)" },
      }}
    >
      <Box sx={{ display: { xs: "none", lg: "block" } }}>
        <Box
          component="img"
          src={"/imagest2o/survey.png"}
          alt="survey logo"
          height={{ lg: 70, xl: 100 }}
          width={{ lg: 70, xl: 100 }}
          style={{
            position: "absolute",
            top: 40,
            left: 50,
          }}
        />
        <Box
          component={"img"}
          src={"/imagest2o/thumb.png"}
          alt="thumbs up logo"
          height={{ lg: 80, xl: 120 }}
          width={{ lg: 80, xl: 120 }}
          style={{
            position: "absolute",
            top: 40,
            right: 40,
            transform: "rotate(-30deg)",
          }}
        />
        <Box
          component="img"
          src={"/imagest2o/banner3.png"}
          alt="side image"
          height={{ lg: 160, xl: 220 }}
          width={{ lg: 160, xl: 220 }}
          style={{
            position: "absolute",
            bottom: -80,
            left: 0,
          }}
        />
        <Box
          component={"img"}
          src={"/imagest2o/banner4.png"}
          alt="side image 2"
          height={{ lg: 160, xl: 220 }}
          width={{ lg: 160, xl: 220 }}
          style={{
            position: "absolute",
            bottom: -80,
            right: 0,
          }}
        />
      </Box>
      <Container maxWidth="lg">
        <Typography
          component={"span"}
          variant="h1"
          sx={{
            fontSize: { xs: 24, xl: 48 },
            fontWeight: 700,
            lineHeight: 1.2,
            mb: 2,
            pr: { md: 4 },
            color: "black",
            textTransform: "capitalize",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 24, xl: 48 },
              fontWeight: "bold",
              background: "var(--bg-primary-gradient)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              display: "inline-block",
              textAlign: "center",
            }}
          >
            {currentBanner.title1}
          </Typography>{" "}
          {currentBanner.title2}
        </Typography>

        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: 14, xl: 18 },
            fontWeight: 400,
            lineHeight: 1.5,
            mt: 2,
            mb: 4,
            color: "#555",
          }}
        >
          {currentBanner.caption}
        </Typography>

        <Button
          variant="contained"
          onClick={() => {
            setOpenSignUp(true);
          }}
          sx={{
            height: { xs: 58, lg: 42, xl: 58 },
            background: "var(--bg-primary-gradient)",
            color: "white",
            borderRadius: 20,
            fontSize: 16,
            fontWeight: 700,
            padding: "18px 40px",
            "&:hover": {
              background: "var(--bg-secondary-gradient)",
            },
          }}
        >
          Join Now
        </Button>
      </Container>
    </Grid>
  );
};

export default HeroSection;
