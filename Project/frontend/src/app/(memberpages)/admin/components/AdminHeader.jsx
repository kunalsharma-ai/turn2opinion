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
import { useMember } from "@/Context";
import AdminNotification from "./AdminNotification";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";

export default function AdminHeader() {
  const [profileAnchorEl, setProfileAnchorEl] = React.useState(null);
  const me = useMember();
  const router = useRouter();

  // if (!me) return <LoadingOverlay />;
  return (
    <div>
      {" "}
      <AppBar
        position="fixed"
        sx={{
          // bgcolor: "#24292e",
          boxShadow: 3,
          pt: 1,
          color: "white",
          width: "100vw",
          zIndex: 1201,
          minHeight: "70px",

          bgcolor: "#c6e3f4",
          boxShadow: 2,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "70px",
          }}
        >
          <Box
            sx={{ cursor: "pointer" }}
            onClick={async (e) => {
              router.push(`/admin/dashboard`);
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
                filter: "drop-shadow(0 1px 2px rgba(255,255,255,0.25))",
              }}
              onClick={() => {
                router.push("/admin/dashboard");
              }}
            />{" "}
            <Box
              component="img"
              src="/images/logo/t2o-logo.png"
              alt="logo"
              // height="90px"
              // width="225px"
              height={60}
              sx={{
                cursor: "pointer",
                display: { xs: "none", sm: "block" },
                filter: "drop-shadow(0 1px 2px rgba(255,255,255,0.25))",
              }}
              onClick={() => {
                router.push("/admin/dashboard");
              }}
            />
          </Box>
          <Box
            display={"flex"}
            alignItems="center"
            gap={{ xs: 0, md: 2 }}
            pb={1}
          >
            <AdminNotification />

            <Button
              onClick={(event) => setProfileAnchorEl(event.currentTarget)}
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              <Avatar
                alt="User photo"
                src={me?.profilePicture ?? ""}
                sx={{ height: "50px", width: "50px" }}
              />
              <Typography
                fontSize={"16px"}
                fontWeight={600}
                ml={1}
                color={"secondary.main"}
              >
                {me?.name?.first ?? "User"}
              </Typography>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={profileAnchorEl}
        open={Boolean(profileAnchorEl)}
        onClose={() => setProfileAnchorEl(null)}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
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
        {me?.navbar?.map((link) => (
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
            me.Logout();
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
