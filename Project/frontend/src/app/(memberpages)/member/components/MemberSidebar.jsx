"use client";
import React from "react";
import {
  Grid,
  Box,
  Typography,
  Tooltip,
  useMediaQuery,
  useTheme,
  Popper,
  Grow,
} from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import { useMember } from "@/Context"
import OnboardingTour from "./OnboardingTour";

const sidebarItems = [
  { icon: "icon-drawer", label: "Dashboard", link: "/member/dashboard", tourId: "nav-dashboard" },
  { icon: "icon-user", label: "My Account", link: "/member/myaccount", tourId: "nav-myaccount" },
  { icon: "icon-people", label: "Profiles", link: "/member/profiles", tourId: "nav-profiles" },
  { icon: "icon-docs", label: "Surveys", link: "/member/surveys", tourId: "nav-surveys" },
  { icon: "icon-wallet", label: "Rewards", link: "/member/rewards", tourId: "nav-rewards" },
  { icon: "icon-share-alt", label: "Referrals", link: "/member/referrals", tourId: "nav-referrals" },
  { icon: "icon-settings", label: "Settings", link: "/member/settings", tourId: "nav-settings" },
  { icon: "icon-support", label: "Help & Support", link: "/member/support", tourId: "nav-support" },
];

export default function MemberSidebar({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const member=useMember();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <Box display="flex">
       <OnboardingTour member ={member} greeting={greeting} userName={member?.name?.first} />
      <Grid
        container
        sx={{
          width: { xs: "50px", lg: "110px" },
          flexDirection: "column",
          height: { xs: "calc(100vh - 122px)", sm: "calc(100vh - 104px)" },
          mt: "78px",
          display: "flex",
          justifyContent: "space-between",
          overflow: "auto",
          flexWrap: "nowrap",
          borderRadius: "0 0.75rem 0.75rem 0",
          borderLeft: "1px solid #f3f3f3",
          boxShadow: "0 3px 30px rgba(0,0,0,0.1), 0 3px 20px rgba(0,0,0,0.1)",
        }}
      >
        {sidebarItems.map((item, index) => {
          const isActive = pathname === item.link;

          const content = (
            <Box
              role="button"
              tabIndex={0}
              data-tour={item.tourId}
              onClick={(e) => router.push(item.link)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push(item.link);
                }
              }}
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #e0e0e0",
                color: isActive ? "secondary.main" : "inherit",
                bgcolor: isActive ? "#eaf7ffff" : "transparent",
                gap: 0.5,
                minHeight: 75,
                "&:hover": {
                  cursor: "pointer",
                  color: "secondary.main",
                  bgcolor: "#d6e8f3ff",
                },
              }}
            >
              <i className={item.icon} style={{ fontSize: "26px" }} />
              <Typography
                sx={{
                  display: { xs: "none", lg: "inline" },
                  fontWeight: 500,
                  fontSize: { xs: 12, xl: 14 },
                }}
              >
                {item.label}
              </Typography>
            </Box>
          );

          return isLgUp ? (
            <React.Fragment key={index}>{content}</React.Fragment>
          ) : (
            <Tooltip
              key={index}
              title={item.label}
              placement="right"
              enterTouchDelay={0}
              leaveTouchDelay={1000}
            >
              {content}
            </Tooltip>
          );
        })}
      </Grid>

      <Grid
        sx={{
          width: { xs: "calc(100vw - 50px)", lg: "calc(100vw - 110px)" },
          height: { xs: "calc(100vh - 122px)", sm: "calc(100vh - 104px)" },
          mt: "78px",
          overflow: "auto",
        }}
      >
        {children}
      </Grid>
    </Box>
  );
}