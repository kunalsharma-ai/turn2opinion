"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Button,
  LinearProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import MemberNotification from "./MemberNotification";
import { useMember } from "@/Context";

export default function MemberHeader() {
  const [profileAnchorEl, setProfileAnchorEl] = React.useState(null);
  const [router, user] = [useRouter(), useMember()];

  return (
    <div>
      {" "}
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 3,
          pt: 1,
          color: "black",
          width: "100vw",
          zIndex: 1201,
          minHeight: "70px",
          bgcolor: "white",
          // bgcolor: "#044236",
          bgcolor: "#24292e",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "70px",
            p: 0,
            pr: 3,
          }}
        >
          <Box
            sx={{ cursor: "pointer" }}
            onClick={async (e) => {
              router.push(`/member/dashboard`);
            }}
          >
            <Box
              component="img"
              src="/images/logo/t2o-logo.png"
              alt="logo"
              // height="60px"
              width="180px"
              sx={{
                ml: 2,
                mb: 1,
                cursor: "pointer",
                display: { xs: "block", sm: "none" },
              }}
              onClick={() => {
                router.push("/member/dashboard");
              }}
            />{" "}
            <Box
              component="img"
              src="/images/logo/t2o-logo.png"
              alt="logo"
              // height="90px"
              width="225px"
              sx={{
                cursor: "pointer",
                display: { xs: "none", sm: "block" },
                scale: 1.1,
              }}
              onClick={() => {
                router.push("/member/dashboard");
              }}
            />
          </Box>
          <Box
            display={"flex"}
            alignItems="center"
            gap={{ xs: 0, md: 2 }}
            pb={1}
          >
            <QualityScore value={user?.qualityScore ?? 0} total={200} />
            <MemberNotification />

            <Button
              onClick={(event) => setProfileAnchorEl(event.currentTarget)}
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              <Avatar
                src={user?.profilePicture || ""}
                alt={"User photo"}
                sx={{
                  bgcolor: user?.profilePicture
                    ? "transparent"
                    : "primary.main",
                  height: "45px",
                  width: "45px",
                  cursor: "pointer",
                }}
              />
              <Typography
                sx={{
                  ml: 1,
                  display: { xs: "none", lg: "block" },
                  fontSize: "16px",
                  color: "white",
                }}
              >
                {user?.name?.first ?? "User"}
              </Typography>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={profileAnchorEl}
        open={Boolean(profileAnchorEl)}
        onClose={() => setProfileAnchorEl(null)}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        PaperProps={{
          sx: {
            color: "black",
            width: 150,
            color: "white",
            boxShadow: 24,
            mt: 1.5,
            overflow: "visible",
          },
        }}
      >
        {user?.navbar?.map((link) => (
          <MenuItem
            key={link?.text}
            onClick={() => {
              setProfileAnchorEl(null);
              router.replace(link?.link ?? "/");
            }}
            sx={{ gap: 1, px: 3, py: 1, color: "black", fontWeight: 500 }}
          >
            {link?.icon && <i className={link.icon} />}
            {link?.text}
          </MenuItem>
        ))}
        <MenuItem
          onClick={async () => {
            setProfileAnchorEl(null);
            user.Logout();
          }}
          sx={{
            gap: 1,
            px: 3,
            py: 1,
            borderTop: "1px solid whitesmoke",
            color: "black",
            fontWeight: 500,
          }}
        >
          <i className="icon-power" />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

function getProgressColor(value, total) {
  const ratio = Math.max(0, Math.min(1, value / total));
  const r = Math.round(255 * (1 - ratio));
  const g = Math.round(255 * ratio);
  const b = 0;
  return `rgb(${r}, ${g}, ${b})`;
}

const QualityScore = ({ value, total }) => {
  const percentage = Math.min(100, (value / total) * 100);
  const progressColor = getProgressColor(value, total);

  return (
    <Box
      display={{ xs: "none", md: "flex" }}
      flexDirection="column"
      alignItems="center"
      gap={0}
    >
      <Box>
        <Typography sx={{ color: "white", fontSize: "18px" }}>
          Quality Score -{" "}
          <Typography
            component={"span"}
            fontSize={"18px"}
            fontWeight={600}
            color="primary.main"
          >
            {`${value}/${total}`}
          </Typography>
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          width: "100%",
          height: 6,
          borderRadius: 4,
          backgroundColor: "rgba(255,255,255,0.15)",
          mt: 0.5,
          "& .MuiLinearProgress-bar": {
            background: progressColor,
          },
        }}
      />
    </Box>
  );
};
