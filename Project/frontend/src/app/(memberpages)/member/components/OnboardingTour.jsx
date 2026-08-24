"use client";
import React from "react";
import { Box, Paper, Typography, Button, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { api, loadData } from "@/util";

const MotionPaper = motion.create(Paper);
const STORAGE_KEY = "mho_dashboard_tour_seen";
const MAX_RETRIES = 20; 
const RETRY_DELAY = 150;

export function resetOnboardingTour() {
  localStorage.removeItem(STORAGE_KEY);
}

export default function OnboardingTour({ userName = "", greeting = "" }) {
  const router = useRouter();
  const pathname = usePathname();

  const [mounted, setMounted] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [stepIndex, setStepIndex] = React.useState(0);
  const [rect, setRect] = React.useState(null);
  const [steps, setSteps] = React.useState([]);
  const [notFound, setNotFound] = React.useState(false);

  const retryRef = React.useRef(0);
  const retryTimerRef = React.useRef(null);

  const currentStep = steps[stepIndex];

  // Replaces {{name}} and {{greeting}} (case-insensitive) with live values.
  const fillTemplate = React.useCallback(
    (text) =>
      (text || "")
        .replace(/{{\s*name\s*}}/gi, userName?.trim() || "there")
        .replace(/{{\s*greeting\s*}}/gi, greeting?.trim() || "Hello"),
    [userName, greeting],
  );

  // Fetch tour steps
  React.useEffect(() => {
    loadData(api.get(`/data/tour.json`), async (resp) => {
      if (Array.isArray(resp)) setSteps(resp);
    });
  }, []);

  // Kick off tour once steps are loaded (first-time visitors only)
  React.useEffect(() => {
    if (steps.length === 0) return;
    setMounted(true);
    const alreadySeen = localStorage.getItem(STORAGE_KEY);
    if (!alreadySeen) {
      const timer = setTimeout(() => setActive(true), 700);
      return () => clearTimeout(timer);
    }
  }, [steps]);

  // If the current step belongs to a different route, navigate there first
  React.useEffect(() => {
    if (!active || !currentStep) return;
    if (currentStep.route && currentStep.route !== pathname) {
      router.replace(currentStep.route);
    }
  }, [active, currentStep, pathname, router]);

  const clearRetryTimer = () => {
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }
  };

  const updateRect = React.useCallback(() => {
    if (!currentStep) return;

    // Don't try to find the element until we're on the right route
    if (currentStep.route && currentStep.route !== pathname) return;

    const el = document.querySelector(currentStep.target);

    if (el) {
      clearRetryTimer();
      retryRef.current = 0;
      setNotFound(false);
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        setRect(el.getBoundingClientRect());
      }, 250);
      return;
    }

    // Retry a few times (element might mount slightly after route change)
    if (retryRef.current < MAX_RETRIES) {
      retryRef.current += 1;
      clearRetryTimer();
      retryTimerRef.current = setTimeout(updateRect, RETRY_DELAY);
    } else {
      console.warn(
        `OnboardingTour: target "${currentStep.target}" not found. Check data-tour attribute.`,
      );
      setRect(null);
      setNotFound(true);
    }
  }, [currentStep, pathname]);

  React.useEffect(() => {
    if (!active) return;
    retryRef.current = 0;
    setNotFound(false);
    updateRect();

    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, true);
    return () => {
      clearRetryTimer();
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect, true);
    };
  }, [active, updateRect, stepIndex, pathname]);

  const endTour = () => {
    clearRetryTimer();
    localStorage.setItem(STORAGE_KEY, "true");
    setActive(false);
    setStepIndex(0);
    setRect(null);
  };

  const handleNext = () => {
    if (stepIndex === steps.length - 1) {
      endTour();
    } else {
      setRect(null);
      setStepIndex((i) => i + 1);
    }
  };

  const handleBack = () => {
    setRect(null);
    setStepIndex((i) => Math.max(0, i - 1));
  };

  if (!mounted || !active || steps.length === 0) return null;

  const padding = 8;
  const highlightBox = rect
    ? {
        top: rect.top - padding,
        left: rect.left - padding,
        width: rect.width + padding * 2,
        height: rect.height + padding * 2,
      }
    : null;

  const tooltipWidth = 340;
  const tooltipHeight = 210;
  const gap = 18;
  const margin = 16;

  let tooltipTop, tooltipLeft, arrowSide = null; // 'left' | 'right' | 'top' | 'bottom'

  if (highlightBox) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const spaceRight = vw - (highlightBox.left + highlightBox.width);
    const spaceLeft = highlightBox.left;
    const spaceBelow = vh - (highlightBox.top + highlightBox.height);
    const spaceAbove = highlightBox.top;

    // Preference order: right > left > bottom > top
    if (spaceRight >= tooltipWidth + gap) {
      arrowSide = "left";
      tooltipLeft = highlightBox.left + highlightBox.width + gap;
      tooltipTop = highlightBox.top + highlightBox.height / 2 - tooltipHeight / 2;
    } else if (spaceLeft >= tooltipWidth + gap) {
      arrowSide = "right";
      tooltipLeft = highlightBox.left - tooltipWidth - gap;
      tooltipTop = highlightBox.top + highlightBox.height / 2 - tooltipHeight / 2;
    } else if (spaceBelow >= tooltipHeight + gap || spaceBelow >= spaceAbove) {
      arrowSide = "top";
      tooltipTop = highlightBox.top + highlightBox.height + gap;
      tooltipLeft = highlightBox.left;
    } else {
      arrowSide = "bottom";
      tooltipTop = highlightBox.top - tooltipHeight - gap;
      tooltipLeft = highlightBox.left;
    }

    // Clamp fully inside viewport with margin
    tooltipTop = Math.min(Math.max(tooltipTop, margin), vh - tooltipHeight - margin);
    tooltipLeft = Math.min(Math.max(tooltipLeft, margin), vw - tooltipWidth - margin);
  } else {
    tooltipTop = window.innerHeight / 2 - 100;
    tooltipLeft = window.innerWidth / 2 - tooltipWidth / 2;
  }

  // Arrow position along the edge it sits on, clamped so it stays on the tooltip body
  const arrowLeft = highlightBox
    ? Math.min(
        Math.max(highlightBox.left + highlightBox.width / 2 - tooltipLeft - 8, 20),
        tooltipWidth - 36,
      )
    : tooltipWidth / 2 - 8;

  const arrowTop = highlightBox
    ? Math.min(
        Math.max(highlightBox.top + highlightBox.height / 2 - tooltipTop - 8, 20),
        tooltipHeight - 36,
      )
    : tooltipHeight / 2 - 8;

  return (
    <Box sx={{ position: "fixed", inset: 0, zIndex: 10000 }}>
      <Box
        onClick={endTour}
        sx={{
          position: "fixed",
          inset: 0,
          bgcolor: "rgba(15, 23, 42, 0.6)",
          transition: "clip-path 0.3s ease",
          clipPath: highlightBox
            ? `polygon(
                0% 0%, 0% 100%, ${highlightBox.left}px 100%,
                ${highlightBox.left}px ${highlightBox.top}px,
                ${highlightBox.left + highlightBox.width}px ${highlightBox.top}px,
                ${highlightBox.left + highlightBox.width}px ${highlightBox.top + highlightBox.height}px,
                ${highlightBox.left}px ${highlightBox.top + highlightBox.height}px,
                ${highlightBox.left}px 100%, 100% 100%, 100% 0%
              )`
            : "none",
        }}
      />

      {highlightBox && (
        <motion.div
          style={{
            position: "fixed",
            top: highlightBox.top,
            left: highlightBox.left,
            width: highlightBox.width,
            height: highlightBox.height,
            borderRadius: "12px",
            border: "2px solid #0c5adb",
            pointerEvents: "none",
          }}
          animate={{
            boxShadow: [
              "0 0 0 4px rgba(12, 90, 219, 0.22)",
              "0 0 0 9px rgba(12, 90, 219, 0.08)",
              "0 0 0 4px rgba(12, 90, 219, 0.22)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <MotionPaper
        elevation={0}
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: [0, -6, 0], scale: 1 }}
        transition={{
          opacity: { duration: 0.3 },
          scale: { type: "spring", stiffness: 260, damping: 20 },
          y: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
        }}
        sx={{
          position: "fixed",
          top: tooltipTop,
          left: tooltipLeft,
          width: tooltipWidth,
          maxWidth: "calc(100vw - 32px)",
          p: 2.5,
          borderRadius: "16px",
          background: "linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(245,249,255,0.96) 100%)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow: "0 20px 45px rgba(12, 90, 219, 0.18), 0 4px 12px rgba(0,0,0,0.06)",
          transition: "top 0.35s ease, left 0.35s ease",
        }}
      >
        {/* Arrow pointer, only when we actually found the target. Points toward the highlighted element. */}
        {highlightBox && arrowSide && (
          <Box
            sx={{
              position: "absolute",
              width: 16,
              height: 16,
              bgcolor: "rgba(245,249,255,0.96)",
              transform: "rotate(45deg)",
              zIndex: -1,
              ...(arrowSide === "top" && {
                left: arrowLeft,
                top: -8,
                borderLeft: "1px solid rgba(255,255,255,0.6)",
                borderTop: "1px solid rgba(255,255,255,0.6)",
              }),
              ...(arrowSide === "bottom" && {
                left: arrowLeft,
                bottom: -8,
                borderRight: "1px solid rgba(255,255,255,0.6)",
                borderBottom: "1px solid rgba(255,255,255,0.6)",
              }),
              ...(arrowSide === "left" && {
                top: arrowTop,
                left: -8,
                borderLeft: "1px solid rgba(255,255,255,0.6)",
                borderBottom: "1px solid rgba(255,255,255,0.6)",
              }),
              ...(arrowSide === "right" && {
                top: arrowTop,
                right: -8,
                borderTop: "1px solid rgba(255,255,255,0.6)",
                borderRight: "1px solid rgba(255,255,255,0.6)",
              }),
            }}
          />
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={stepIndex}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
              <Typography sx={{ fontWeight: 700, fontSize: 16, color: "primary.main" }}>
                {fillTemplate(currentStep?.title)}
              </Typography>
              <IconButton size="small" onClick={endTour} sx={{ mt: -0.5, mr: -1 }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            <Typography sx={{ fontSize: 14, color: "text.secondary", lineHeight: 1.6, mb: notFound ? 1 : 2.5 }}>
              {fillTemplate(currentStep?.content)}
            </Typography>

            {notFound && (
              <Typography sx={{ fontSize: 12, color: "warning.main", mb: 1.5 }}>
                Yeh section abhi screen pe dikh nahi raha, par aap aage badh sakte ho.
              </Typography>
            )}
          </motion.div>
        </AnimatePresence>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          rowGap={1}
        >
          <Box display="flex" gap={0.6}>
            {steps.map((_, i) => (
              <Box
                key={i}
                sx={{
                  width: i === stepIndex ? 16 : 6,
                  height: 6,
                  borderRadius: 4,
                  bgcolor: i === stepIndex ? "primary.main" : "rgba(12,90,219,0.2)",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </Box>

          <Box display="flex" gap={0.75} flexShrink={0} ml="auto">
            <Button
              size="small"
              onClick={endTour}
              sx={{ textTransform: "none", color: "text.secondary", minWidth: "auto", px: 1 }}
            >
              Skip
            </Button>
            {stepIndex > 0 && (
              <Button
                size="small"
                onClick={handleBack}
                sx={{ textTransform: "none", minWidth: "auto", px: 1 }}
              >
                Back
              </Button>
            )}
            <Button
              size="small"
              variant="contained"
              onClick={handleNext}
              disableElevation
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                fontWeight: 600,
                minWidth: "auto",
                px: 1.75,
                boxShadow: "0 8px 18px rgba(12, 90, 219, 0.35)",
              }}
            >
              {stepIndex === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </Box>
      </MotionPaper>
    </Box>
  );
}