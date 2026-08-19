"use client";

import React from "react";
import { Fab, Zoom, useTheme, useMediaQuery, Box } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Header from "@/componentsMHO/Header";
import HeroSection from "@/componentsMHO/HeroSection";
import Stats from "@/componentsMHO/Stats";
import WhoWeAre from "@/componentsMHO/WhoWeAre";
import HowItWorks from "@/componentsMHO/HowItWorks";
import Testimonial from "@/componentsMHO/Testimonial";
import JoinPanel from "@/componentsMHO/JoinPanel";
import Footer from "@/componentsMHO/Footer";
import WeArePart from "@/componentsMHO/WeArePart";
import Journey from "@/componentsMHO/Journey";

import SignUp from "@/componentsMHO/SignUp";
import Login from "@/componentsMHO/Login";
import { useQuery } from "@/Context";
import { ContextProviders } from "@/Context";

export default function HomeClient() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const query = useQuery();

  const [visible, setVisible] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openSignUp, setOpenSignUp] = React.useState(false);
  const [emailUnverified, setEmailUnverified] = React.useState(null);

  const sections = [
    { label: "About", id: "about" },
    { label: "Steps to Join", id: "how-it-works" },
    { label: "Contact Us", isExternalPage: true, path: "/contact" },
  ];

  React.useEffect(() => {
    const scrollContainer = document.getElementById("scroll-container");
    if (!scrollContainer) return;

    const onScroll = () => {
      setVisible(scrollContainer.scrollTop > 300);
    };

    scrollContainer.addEventListener("scroll", onScroll);
    return () => scrollContainer.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const el = document.getElementById("scroll-container");
    if (!el) return;

    el.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        id="scroll-container"
        style={{
          height: "100vh",
          overflowY: "auto",
          background: "linear-gradient(90deg, #fff 0, #c6e3f4 100%)",
        }}
      >
        <Box sx={{ width: "100%", height: { xs: "86px", lg: "124px" } }}>
          <ContextProviders>
            <React.Suspense fallback={<></>}>
              <Header
                sections={sections}
                setOpenLogin={setOpenLogin}
                setOpenSignUp={setOpenSignUp}
                setEmailUnverified={setEmailUnverified}
              />
            </React.Suspense>
          </ContextProviders>
        </Box>

        <main>
          <HeroSection setOpenSignUp={setOpenSignUp} />
          <WeArePart />
          <Journey setOpenSignUp={setOpenSignUp} />
          <Stats />
          <WhoWeAre />

          <div id="how-it-works">
            <HowItWorks setOpenSignUp={setOpenSignUp} />
          </div>

          <Testimonial />
          <JoinPanel setOpenSignUp={setOpenSignUp} />
        </main>
        <React.Suspense fallback={<></>}>
          <Footer sections={sections} />
        </React.Suspense>
        {isMdUp && (
          <Zoom in={visible} unmountOnExit>
            <Fab
              size="medium"
              color="primary"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              sx={{
                position: "fixed",
                bottom: 15,
                left: 15,
                zIndex: 999,
              }}
            >
              <KeyboardArrowUpIcon sx={{ fontSize: 30, color: "white" }} />
            </Fab>
          </Zoom>
        )}
        <ContextProviders>
          <SignUp
            open={openSignUp}
            onClose={() => setOpenSignUp(false)}
            setOpenLogin={setOpenLogin}
            emailUnverified={emailUnverified}
          />

          <Login
            open={openLogin}
            setOpenSignUp={setOpenSignUp}
            onClose={() => setOpenLogin(false)}
          />
        </ContextProviders>
      </div>
    </>
  );
}
