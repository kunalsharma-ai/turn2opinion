"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  ButtonGroup,
  Button,
  Box,
  Typography,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useMember, useQuery } from "@/Context";

export default function Header({ setOpenLogin, setOpenSignUp }) {
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showLogin, setShowLogin] = React.useState(true);

  const user = useMember();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const query = useQuery();

  useEffect(() => {
    if (!query) return;
    if (![null, undefined].includes(query.login)) {
      setOpenLogin(true);
    }
  }, [query]);
  React.useEffect(() => {
    if (!query) return;
    if (![null, undefined].includes(query.signup)) {
      setOpenSignUp(true);
    }
  }, [query]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const scrollToHowItWorks = () => {
    const el = document.getElementById("how-it-works");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const goToSteps = () => {
    if (pathname === "/") {
      scrollToHowItWorks();
    } else {
      router.push("/?scroll=howitworks");
    }
  };

  useEffect(() => {
    if (pathname !== "/") return;

    const params = new URLSearchParams(window.location.search);
    if (params.get("scroll") === "howitworks") {
      setTimeout(() => {
        scrollToHowItWorks();
        router.replace("/", { scroll: false });
      }, 50);
    }
  }, [pathname]);

  const navigationItems = [
    {
      label: "About",
      path: "/about",
      onClick: () => {
        router.push("/about");
        setMobileOpen(false);
      },
    },
    {
      label: "Steps to Join",
      path: "/",
      onClick: () => {
        goToSteps();
        setMobileOpen(false);
      },
    },
    {
      label: "Contact Us",
      path: "/contact",
      onClick: () => {
        router.push("/contact");
        setMobileOpen(false);
      },
    },
  ];

  const drawer = (
    <Box
      sx={ {
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(90deg, #fff 0, #fff1d8 100%)",
        color: "black",
        pt: 2,
        pb: 2,
        position: "relative",
      } }
    >
      <Box
        sx={ {
          px: 3,
          pb: 2,
          mb: 2,
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        } }
      >
        <img
          src="/images/logo/t2o-logo.png"
          alt="logo"
          height={ 26.8 }
          width={ 180 }
          style={ { cursor: "pointer" } }
          onClick={ () => {
            router.push("/");
            setMobileOpen(false);
          } }
        />
        <IconButton
          onClick={ () => setMobileOpen(false) }
          sx={ { color: "black" } }
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <List>
        { navigationItems.map((item, index) => (
          <ListItem
            key={ index }
            onClick={ item.onClick }
            sx={ { cursor: "pointer" } }
          >
            <ListItemText
              primary={ item.label }
              primaryTypographyProps={ {
                fontWeight: "bold",
                color: "primary.main",
                fontSize: "22px",
                borderBottom: "1px solid #ead0b9ff",
                pb: 2,
              } }
            />
          </ListItem>
        )) }
      </List>
      <Box sx={ { px: 3, mt: 3 } } position="absolute" bottom="20px">
        { showLogin &&
          (user === null ? (
            <ButtonGroup
              sx={ {
                height: 56,
                "& .MuiButtonGroup-grouped": { borderWidth: 2 },
                "& .MuiButtonGroup-grouped:not(:first-of-type)": {
                  marginLeft: "-3px",
                },
                "& .MuiButtonGroup-grouped:first-of-type": {
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                },
                "& .MuiButtonGroup-grouped:last-of-type": {
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                },
              } }
            >
              <Button
                variant="outlined"
                onClick={ () => {
                  setOpenLogin(true);
                } }
                sx={ {
                  padding: "15px 15px 15px 30px",
                  fontSize: "16px",
                  borderColor: "primary.main",
                  borderRadius: 20,
                  fontWeight: 700,
                  background: "transparent",
                  transition: "all 0.3s ease-in",
                  "&:hover": {
                    color: "white",
                    background: "var(--bg-primary-gradient)",
                  },
                } }
              >
                Sign In
              </Button>
              <Button
                variant="outlined"
                onClick={ () => {
                  setOpenSignUp(true);
                } }
                sx={ {
                  padding: "15px 30px 15px 15px",
                  fontSize: "16px",
                  borderRadius: 20,
                  fontWeight: 700,
                  borderColor: "primary.main",
                  background: "transparent",
                  transition: "all 0.3s ease-in",
                  "&:hover": {
                    color: "white",
                    background: "var(--bg-primary-gradient)",
                  },
                } }
              >
                Sign Up
              </Button>
            </ButtonGroup>
          ) : (
            <Box
              display={ "flex" }
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center">
                <Avatar
                  sx={ {
                    width: "40px",
                    height: "40px",
                    bgcolor: user?.profilePicture
                      ? "transparent"
                      : "primary.main",
                  } }
                  src={ user?.profilePicture || "" }
                  alt={ user?.name?.first ?? "U" }
                />
                <Typography
                  sx={ {
                    ml: 1,
                    fontSize: "16px",
                    fontWeight: "bold",
                  } }
                >
                  { user?.name?.first ?? "User" }
                </Typography>
              </Box>
              <Box display={ "flex" } alignItems="center" gap={ 2 } ml={ 3 }>
                <Tooltip
                  title="Dashboard"
                  enterTouchDelay={ 0 }
                  leaveTouchDelay={ 1500 }
                  placement="top"
                >
                  <IconButton
                    sx={ { fontSize: "26px", color: "black" } }
                    onClick={ () => {
                      router.push("/member/dashboard");
                      handleDrawerClose();
                    } }
                  >
                    <DashboardIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title="Log Out"
                  enterTouchDelay={ 0 }
                  leaveTouchDelay={ 1500 }
                  placement="top"
                >
                  <IconButton
                    sx={ { fontSize: "26px", color: "black" } }
                    onClick={ async () => {
                      localStorage.removeItem("token");
                      user.Reload();
                      router.push("/");
                      handleDrawerClose();
                    } }
                  >
                    <PowerSettingsNewIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          )) }
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        elevation={ 0 }
        sx={ {
          position: { xs: "sticky", md: "static" },
          top: { xs: 0, md: "auto" },
          bgcolor: { xs: "white", md: "transparent" },
          color: "black",
          p: { xs: "15px", lg: "30px" },
          zIndex: 200,
        } }
      >
        <Toolbar
          sx={ { justifyContent: "space-between", alignItems: "center", px: 0 } }
        >
          <Box
            component={ "img" }
            src="/images/logo/t2o-logo.png"
            alt="logo"
            height={ { xs: 26.8, md: 42 } }
            width={ { xs: 180, md: 282 } }
            style={ { cursor: "pointer" } }
            onClick={ () => {
              router.push("/");
            } }
          />
          <Box display="flex" gap={ 4 } justifyContent={ "flex-end" }>
            <Box
              sx={ {
                display: { xs: "none", lg: "flex" },
                gap: { xs: 2, xl: 4 },
                alignItems: "center",
              } }
            >
              { navigationItems.map((item, index) => (
                <Box
                  component="button"
                  tabIndex={ 0 }
                  key={ index }
                  className="hover-line"
                  onClick={ item.onClick }
                  sx={ {
                    fontFamily: "inherit",
                    bgcolor: "transparent",
                    border: "none",
                    "&:focus-visible": {
                      outline: "2px solid",
                      outlineColor: "primary.main",
                      outlineOffset: "2px",
                    },
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: { xs: "14px", lg: "16px" },
                    position: "relative",
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      width: 0,
                      height: "2px",
                      bottom: -4,
                      left: 0,
                      bgcolor: "primary.main",
                      transition: "width 0.3s ease",
                    },
                    "&:hover": {
                      color: "primary.main",
                      "&:after": { width: "100%" },
                    },
                  } }
                >
                  { item.label }
                </Box>
              )) }
            </Box>
            <Box
              sx={ { display: { xs: "flex", lg: "none" }, alignItems: "center" } }
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={ handleDrawerToggle }
                sx={ { mx: 0.5 } }
              >
                <MenuIcon fontSize="large" sx={ { color: "primary.main" } } />
              </IconButton>
            </Box>
            <Box
              sx={ {
                display: { xs: "none", lg: "block" },
                alignItems: "center",
              } }
            >
              { showLogin &&
                (user === null ? (
                  <ButtonGroup
                    sx={ {
                      height: 56,
                      "& .MuiButtonGroup-grouped": { borderWidth: 2 },
                      "& .MuiButtonGroup-grouped:not(:first-of-type)": {
                        marginLeft: "-3px",
                      },
                      "& .MuiButtonGroup-grouped:first-of-type": {
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      },
                      "& .MuiButtonGroup-grouped:last-of-type": {
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      },
                    } }
                  >
                    <Button
                      variant="outlined"
                      onClick={ () => {
                        setOpenLogin(true);
                      } }
                      sx={ {
                        padding: "15px 15px 15px 30px",
                        fontSize: "16px",
                        borderColor: "primary.main",
                        borderRadius: 20,
                        fontWeight: 700,
                        background: "transparent",
                        transition: "all 0.3s ease-in",
                        "&:hover": {
                          color: "white",
                          background: "var(--bg-primary-gradient)",
                        },
                      } }
                    >
                      Sign In
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={ () => {
                        setOpenSignUp(true);
                      } }
                      sx={ {
                        padding: "15px 30px 15px 15px",
                        fontSize: "16px",
                        borderRadius: 20,
                        fontWeight: 700,
                        borderColor: "primary.main",
                        background: "transparent",
                        transition: "all 0.3s ease-in",
                        "&:hover": {
                          color: "white",
                          background: "var(--bg-primary-gradient)",
                        },
                      } }
                    >
                      Sign Up
                    </Button>
                  </ButtonGroup>
                ) : (
                  <Button
                    onClick={ (event) => setProfileAnchorEl(event.currentTarget) }
                    color="inherit"
                    sx={ { textTransform: "none", px: 2 } }
                  >
                    <Avatar
                      sx={ {
                        width: "40px",
                        height: "40px",
                        bgcolor: user?.profilePicture
                          ? "transparent"
                          : "primary.main",
                      } }
                      src={ user?.profilePicture || "" }
                      alt={ "user photo" }
                    />
                    <Typography
                      sx={ {
                        display: { xs: "none", lg: "block" },
                        ml: 1,
                        fontSize: "16px",
                        fontWeight: "bold",
                      } }
                    >
                      { user?.name?.first ?? "User" }
                    </Typography>
                  </Button>
                )) }
            </Box>
          </Box>
        </Toolbar>
        <Menu
          anchorEl={ profileAnchorEl }
          open={ Boolean(profileAnchorEl) }
          onClose={ () => setProfileAnchorEl(null) }
          transformOrigin={ { horizontal: "left", vertical: "top" } }
          anchorOrigin={ { horizontal: "left", vertical: "bottom" } }
          PaperProps={ {
            sx: {
              color: "white",
              boxShadow: 24,
              mt: 1.5,
              overflow: "visible",
              "::before": {
                content: '""',
                display: "block",
                position: "absolute",
                width: 10,
                height: 10,
                bgcolor: "white",
                transform: "rotate(45deg)",
                top: -5,
                left: 16,
                zIndex: 0,
              },
            },
          } }
        >
          { user?.navbar?.map((link) => (
            <MenuItem
              key={ link?.text }
              onClick={ () => {
                setProfileAnchorEl(null);
                router.replace(link?.link ?? "/");
              } }
              sx={ { gap: 1, px: 3, py: 1, color: "black", fontWeight: 500 } }
            >
              { link?.icon && <i className={ link.icon } /> }
              { link?.text }
            </MenuItem>
          )) }
          <MenuItem
            onClick={ async () => {
              setProfileAnchorEl(null);
              user.Logout();
            } }
            sx={ {
              gap: 1,
              px: 3,
              py: 1,
              borderTop: "1px solid whitesmoke",
              color: "black",
              fontWeight: 500,
            } }
          >
            <i className="icon-power" />
            Logout
          </MenuItem>
        </Menu>
        <Drawer
          variant="temporary"
          open={ mobileOpen }
          onClose={ handleDrawerToggle }
          ModalProps={ { keepMounted: true } }
          sx={ {
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              position: "relative",
            },
          } }
        >
          { drawer }
        </Drawer>
      </AppBar>
    </>
  );
}
