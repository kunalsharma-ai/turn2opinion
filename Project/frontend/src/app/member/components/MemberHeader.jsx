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
            <Box display={{ xs: "none", md: "inline" }}>
              <Typography sx={{ color: "white", fontSize: "18px" }}>
                Quality Score -{" "}
                <Typography
                  component={"span"}
                  fontSize={"18px"}
                  fontWeight={600}
                  color="primary.main"
                >
                  {user?.qualityScore} / 200
                </Typography>
              </Typography>
            </Box>
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
        <MenuItem
          onClick={() => {
            setProfileAnchorEl(null);
            router.replace("/member/myaccount");
          }}
          sx={{ gap: 1, color: "black", fontWeight: 500 }}
        >
          <i className="icon-user" /> Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            setProfileAnchorEl(null);
            router.replace("/member/settings");
          }}
          sx={{
            gap: 1,
            color: "black",
            fontWeight: 500,
            borderTop: "1px solid whitesmoke",
          }}
        >
          <i className="icon-settings" /> Settings
        </MenuItem>
        <MenuItem
          onClick={async () => {
            setProfileAnchorEl(null);
            localStorage.removeItem("token");
            user.Reload();
          }}
          sx={{
            gap: 1,
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
