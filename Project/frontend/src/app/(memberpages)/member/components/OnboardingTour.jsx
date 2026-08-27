"use client";
import { Joyride } from "react-joyride";
import useOnboardingTour from "@/hooks/useOnboardingTour";


const JOYRIDE_OPTIONS = {
  primaryColor: "#0c5adb",
  textColor: "#1a1a1a",
  overlayColor: "rgba(15, 23, 42, 0.6)",
  zIndex: 10000,
  spotlightPadding: 8,
  
  showProgress: false,
  buttons: ["back", "primary", "skip"],
  skipBeacon: true,
  overlayClickAction: "close",
};

const JOYRIDE_STYLES = {
  tooltip: {
    borderRadius: 16,
    padding: 20,
  },
  tooltipTitle: {
    fontWeight: 700,
    fontSize: 16,
  },
  tooltipContent: {
    fontSize: 14,
    lineHeight: 1.6,
    padding: "8px 0",
  },
  // Renamed from `buttonNext` in v2.
  buttonPrimary: {
    borderRadius: 8,
    fontWeight: 600,
    padding: "8px 14px",
  },
  buttonBack: {
    marginRight: 8,
  },
};

export default function OnboardingTour({ member, userName = "", greeting = "" }) {
  const { run, steps, handleJoyrideCallback } = useOnboardingTour({
    member,
    userName,
    greeting,
  });

  if (steps.length === 0) return null;

  const locale = {
    back: "Back",
    close: "Close",
    skip: "Skip",
    next: "Next",
    last: "Finish",
  };

  return (
    <Joyride
      run={run}
      steps={steps}
      onEvent={handleJoyrideCallback}
      continuous
      options={JOYRIDE_OPTIONS}
      styles={JOYRIDE_STYLES}
      locale={locale}
    />
  );
}