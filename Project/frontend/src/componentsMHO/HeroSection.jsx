"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useAnimationFrame,
  wrap,
  useTransform,
} from "framer-motion";

import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  useMediaQuery,
  Grid,
} from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
    title2: "your opinion gets rewarded",
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

const surveys = [
  {
    title: "Shopping Habits",
    description:
      "Share your shopping preferences and experiences to help brands improve their products and services.",
    reward: "$4",
    duration: "10 min",
    category: "Shopping",
    color: "#0c5adb",
  },
  {
    title: "Technology & Apps",
    description:
      "Tell us what you think about the latest apps, devices, and technology products.",
    reward: "$6",
    duration: "15 min",
    category: "Technology",
    color: "#7B1FA2",
  },
  {
    title: "Food & Lifestyle",
    description:
      "Share your opinions about food, restaurants, brands, and everyday lifestyle choices.",
    reward: "$5",
    duration: "12 min",
    category: "Lifestyle",
    color: "#2E7D32",
  },
  {
    title: "Travel Experience",
    description:
      "Tell us about your travel preferences and experiences to help shape future services.",
    reward: "$7",
    duration: "18 min",
    category: "Travel",
    color: "#E48025",
  },
  {
    title: "Entertainment",
    description:
      "Share your views on movies, shows, games, and the entertainment you enjoy.",
    reward: "$4",
    duration: "10 min",
    category: "Entertainment",
    color: "#00838F",
  },
  {
    title: "Consumer Opinion",
    description:
      "Give your honest opinion about products and services and earn rewards for your participation.",
    reward: "$6",
    duration: "14 min",
    category: "Consumer",
    color: "#C62828",
  },
];

const HeroSection = ({ setOpenSignUp }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
        minHeight: {
          xs: 700,
          lg: "calc(100vh - 120px)",
        },
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: {
            xs: "none",
            lg: "block",
          },
        }}
      >
        <Box
          component="img"
          src="/imagest2o/survey.png"
          alt="survey logo"
          height={{ lg: 70, xl: 100 }}
          width={{ lg: 70, xl: 100 }}
          sx={{
            position: "absolute",
            top: 20,
            left: 50,
          }}
        />

        <Box
          component="img"
          src="/imagest2o/thumb.png"
          alt="thumbs up logo"
          height={{ lg: 80, xl: 120 }}
          width={{ lg: 80, xl: 120 }}
          sx={{
            position: "absolute",
            top: 20,
            right: 40,
            transform: "rotate(-30deg)",
          }}
        />

        <Box
          component="img"
          src="/imagest2o/banner3.png"
          alt="side image"
          height={{ lg: 160, xl: 220 }}
          width={{ lg: 160, xl: 220 }}
          sx={{
            position: "absolute",
            bottom: -80,
            left: 0,
          }}
        />

        <Box
          component="img"
          src="/imagest2o/banner4.png"
          alt="side image 2"
          height={{ lg: 160, xl: 220 }}
          width={{ lg: 160, xl: 220 }}
          sx={{
            position: "absolute",
            bottom: -80,
            right: 0,
          }}
        />
      </Box>

      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid
          container
          alignItems="center"
          sx={{
            width: "100%",
            py: {
              xs: 5,
              lg: 8,
            },
            px: {
              xs: 2,
              sm: 4,
              lg: 6,
            },
          }}
        >
          <Grid
            size={{
              xs: 12,
              lg: 6,
            }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: {
                xs: "center",
                lg: "flex-start",
              },
              justifyContent: "center",
              textAlign: {
                xs: "center",
                lg: "left",
              },
              pr: {
                lg: 5,
                xl: 8,
              },
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -15,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
                style={{
                  width: "100%",
                }}
              >
                <Typography
                  component="h1"
                  sx={{
                    fontSize: {
                      xs: 24,
                      sm: 32,
                      xl: 40,
                    },
                    fontWeight: 700,
                    lineHeight: 1.2,
                    mb: 2,
                    color: "black",
                    textTransform: "capitalize",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      fontSize: {
                        xs: 24,
                        sm: 32,
                        xl: 40,
                      },
                      fontWeight: "bold",
                      background: "var(--bg-primary-gradient)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "transparent",
                    }}
                  >
                    {currentBanner.title1}
                  </Box>{" "}
                  {currentBanner.title2}
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    color: "text.secondary",
                    fontSize: {
                      xs: 14,
                      sm: 16,
                      xl: 18,
                    },
                    fontWeight: 400,
                    lineHeight: 1.6,
                    mt: 2,
                    mb: 3,
                    maxWidth: 700,
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
                    height: {
                      xs: 50,
                      lg: 42,
                      xl: 58,
                    },
                    background: "var(--bg-primary-gradient)",
                    color: "white",
                    borderRadius: 20,
                    fontSize: 16,
                    fontWeight: 700,
                    px: 5,
                    "&:hover": {
                      background: "var(--bg-secondary-gradient)",
                    },
                  }}
                >
                  Join Now
                </Button>
              </motion.div>
            </AnimatePresence>
          </Grid>

          <Grid
            size={{
              xs: 12,
              lg: 6,
            }}
            sx={{
              display: {
                xs: "none",
                lg: "flex",
              },
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <SurveyCarousel
              surveys={surveys}
              onSurveyClick={() => setOpenSignUp(true)}
            />
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

function SurveyCarousel({ surveys, onSurveyClick }) {
  const cards = [...surveys, ...surveys];

  const x = useMotionValue(0);
  const trackRef = useRef(null);

  const [trackWidth, setTrackWidth] = useState(0);
  const isSurveyHovered = useRef(false);

  const SPEED = 42;

  useLayoutEffect(() => {
    if (!trackRef.current) return;

    setTrackWidth(trackRef.current.scrollWidth / 2);
  }, [surveys]);

  useAnimationFrame((_, delta) => {
    if (!trackWidth) return;

    if (isSurveyHovered.current) {
      return;
    }

    x.set(x.get() - (SPEED * delta) / 1000);
  });

  const translateX = useTransform(
    x,
    (value) => `${wrap(-trackWidth, 0, value)}px`,
  );

  const handleMouseEnter = () => {
    isSurveyHovered.current = true;
  };

  const handleMouseLeave = () => {
    isSurveyHovered.current = false;
  };

  return (
    <Box
      component={motion.div}
      initial={{
        opacity: 0,
        x: 60,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        x: 0,
        scale: 1,
      }}
      transition={{
        delay: 0.45,
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        width: "100%",
        maxWidth: 680,
      }}
    >
      <Typography
        sx={{
          color: "#555",
          fontSize: 13,
          fontWeight: 600,
          mb: 1,
          ml: 2,
        }}
      >
        Browse a few of our paid surveys
      </Typography>

      <Box
        sx={{
          overflow: "hidden",
          py: 2,

          maskImage:
            "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",

          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
        }}
      >
        <motion.div
          ref={trackRef}
          style={{
            display: "flex",
            gap: 18,
            width: "max-content",
            x: translateX,
          }}
        >
          {cards.map((survey, index) => (
            <Box
              key={`${survey.title}-${index}`}
              sx={{
                width: 250,
                minHeight: 180,
                flexShrink: 0,
                position: "relative",
              }}
            >
              <Box
                component={motion.div}
                whileHover={{
                  y: -6,
                  scale: 1.03,
                }}
                transition={{
                  duration: 0.2,
                }}
                sx={{
                  width: "100%",
                  minHeight: 180,
                  p: 1.75,

                  borderRadius: 3,

                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(245,248,255,0.92))",

                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",

                  border: "1px solid rgba(12,90,219,0.12)",

                  boxShadow: "0 12px 35px rgba(12,90,219,0.10)",

                  transition: "box-shadow .25s, border-color .25s",

                  "&:hover": {
                    borderColor: "rgba(12,90,219,0.35)",
                    boxShadow: "0 18px 40px rgba(12,90,219,0.18)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      px: 1.1,
                      py: 0.4,
                      borderRadius: 5,
                      bgcolor: survey.color,
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 10,
                    }}
                  >
                    {survey.category}
                  </Box>

                  <Typography
                    sx={{
                      color: "#0c5adb",
                      fontWeight: 800,
                      fontSize: 18,
                    }}
                  >
                    {survey.reward}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    color: "#172033",
                    fontWeight: 700,
                    fontSize: 17,
                    lineHeight: 1.3,
                    mb: 0.7,
                  }}
                >
                  {survey.title}
                </Typography>

                <Typography
                  sx={{
                    color: "#667085",
                    fontSize: 12,
                    lineHeight: 1.45,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {survey.description}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 1.5,
                    pt: 1,
                    borderTop: "1px solid rgba(12,90,219,.1)",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#667085",
                      fontSize: 11,
                    }}
                  >
                    {survey.duration}
                  </Typography>

                  <Button
                    onClick={onSurveyClick}
                    variant="contained"
                    disableElevation
                    endIcon={
                      <ArrowForwardIcon
                        sx={{
                          fontSize: 16,
                        }}
                      />
                    }
                    sx={{
                      height: "30px",
                      color: "#fff",
                      background: "var(--bg-primary-gradient)",
                      minWidth: 0,
                      fontWeight: 600,
                      fontSize: 12,
                      textTransform: "none",
                      lineHeight: 1,

                      "&:hover": {
                        background: "var(--bg-secondary-gradient)",
                      },

                      "& .MuiButton-endIcon": {
                        ml: 0.5,
                        mr: 0,
                      },
                    }}
                  >
                    Take Survey
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </motion.div>
      </Box>
    </Box>
  );
}

export default HeroSection;
