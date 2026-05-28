"use client";
import React, { Suspense } from "react";
import { Fab, Zoom, useTheme, useMediaQuery, Box } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import Header from "@/componentsMHO/Header";
import Footer from "@/componentsMHO/Footer";
import JoinPanel from "@/componentsMHO/JoinPanel";
import SignUp from "@/componentsMHO/SignUp";
import Login from "@/componentsMHO/Login";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import { useQuery } from "@/Context";
import { ContextProviders } from "@/Context";

export default function MainLayout({ children }) {
  const [visible, setVisible] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openSignUp, setOpenSignUp] = React.useState(false);

  const query = useQuery();

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  React.useEffect(() => {
    if (query && query.signup !== undefined) {
      setOpenSignUp(true);
    }
  }, [query]);
  React.useEffect(() => {
    if (query && query.login !== undefined) {
      setOpenLogin(true);
    }
  }, [query]);

  React.useEffect(() => {
    const scrollContainer = document.getElementById("scroll-container");
    if (!scrollContainer) return;

    const toggleVisibility = () => {
      setVisible(scrollContainer.scrollTop > 300);
    };

    scrollContainer.addEventListener("scroll", toggleVisibility);
    return () =>
      scrollContainer.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    const scrollContainer = document.getElementById("scroll-container");
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  return (
    <div
      id="scroll-container"
      style={{
        height: "100vh",
        overflowY: "auto",
        background: "linear-gradient(90deg, #fff 0, #c6e3f4 100%)",
      }}
    >
      <ContextProviders>
        <Box sx={{ width: "100%", height: { xs: "86px", lg: "124px" } }}>
          <React.Suspense fallback={null}>
            <Header
              openLogin={openLogin}
              setOpenLogin={setOpenLogin}
              openSignUp={openSignUp}
              setOpenSignUp={setOpenSignUp}
            />
          </React.Suspense>
        </Box>
      </ContextProviders>
      <main>{children}</main>
      <JoinPanel setOpenSignUp={setOpenSignUp} />
      <React.Suspense fallback={<></>}>
        <Footer />
      </React.Suspense>
      <ContextProviders>
        <SignUp
          open={openSignUp}
          onClose={() => {
            setOpenSignUp(false);
          }}
          setOpenLogin={setOpenLogin}
        />
        <Login
          open={openLogin}
          setOpenSignUp={setOpenSignUp}
          onClose={() => {
            setOpenLogin(false);
          }}
        />
      </ContextProviders>
      {isMdUp && (
        <Zoom in={visible} unmountOnExit>
          <Fab
            size="medium"
            color="primary"
            onClick={scrollToTop}
            sx={{
              position: "fixed",
              bottom: 35,
              left: 35,
              boxShadow: 4,
              zIndex: 999,
              color: "white",
            }}
          >
            <KeyboardArrowUpIcon sx={{ fontSize: "30px" }} />
          </Fab>
        </Zoom>
      )}
    </div>
  );
}
