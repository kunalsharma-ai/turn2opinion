"use client";

import React from "react";
import { Fab, Zoom, useTheme, useMediaQuery } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import SignUp from "@/componentsMHO/SignUp";
import Login from "@/componentsMHO/Login";
import { useQuery } from "@/Context";

export default function HomeClient() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const query = useQuery();

  const [visible, setVisible] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openSignUp, setOpenSignUp] = React.useState(false);

  React.useEffect(() => {
    if (query && query.signup !== undefined) {
      setOpenSignUp(true);
    }
  }, [query]);

  React.useEffect(() => {
    if (!query) return;
    if (![null, undefined].includes(query.login)) {
      setOpenLogin(true);
    }
  }, [query]);

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
      {isMdUp && (
        <Zoom in={visible} unmountOnExit>
          <Fab
            size="medium"
            color="primary"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            sx={{
              position: "fixed",
              bottom: 35,
              right: 35,
              zIndex: 999,
            }}
          >
            <KeyboardArrowUpIcon sx={{ fontSize: 30, color: "white" }} />
          </Fab>
        </Zoom>
      )}

      <SignUp
        open={openSignUp}
        onClose={() => setOpenSignUp(false)}
        setOpenLogin={setOpenLogin}
      />

      <Login
        open={openLogin}
        setOpenSignUp={setOpenSignUp}
        onClose={() => setOpenLogin(false)}
      />
    </>
  );
}
