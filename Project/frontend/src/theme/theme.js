import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: "#e48025",
  //   },
  //   secondary: {
  //     main: "#124d86",
  //   },

  //   page: {
  //     main: "#f4f4f4",
  //   },
  //   card: {
  //     main: "#ffffff",
  //   },
  //   cardbg: {
  //     // main: "#c6e3f4",
  //     main: "#fff1d9",
  //   },
  // },
  palette: {
    primary: {
      main: "#0c5adb",
    },
    secondary: {
      main: "#063686",
    },
    page: {
      main: "#f4f4f4",
    },
    card: {
      main: "#ffffff",
    },
    cardbg: {
      main: "#c6e3f4", //   "#8cb2f333",
    },
  },
  gradients: {
    bgprimary: {
      main: "linear-gradient(#04142f, #0c5adb)",
    },
    bgsecondary: {
      main: "linear-gradient(#0c5adb, #7cc4ff)",
    },
  },
  typography: {
    color: "black",
    fontSize: 14,
    fontFamily: "'Open Sans', sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: 14,
          color: "black",
        },
        '[role="presentation"].MuiPopover-root': {
          zIndex: 15000,
        },
        ".MuiTooltip-arrow::before": {
          border: "1px solid #ccc",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          boxSizing: "border-box",
        },
        "*": {
          scrollbarWidth: "thin",
          scrollbarColor: "#063686 transparent",
        },
        "*::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "*::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "#063686",
          borderRadius: "8px",
          border: "2px solid transparent",
          backgroundClip: "content-box",
        },
        "*::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#063686",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: 14,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
        shrink: {
          fontWeight: 500,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          fontSize: 14,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: 13,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: 12,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: "bold",
          fontSize: "14px",
          "&.Mui-selected": {
            color: "#063686",
          },
        },
        indicator: {
          backgroundColor: "#063686",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "secondary.main",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
            color: "primary.main",
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          "&:before": {
            display: "none",
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: 13,
          fontWeight: "500",
          border: "1px solid #ccc",
          borderRadius: 4,
          background: "#effeff",
          color: "black",
          px: 3,
          py: 5,
          whiteSpace: "normal",
          hyphens: "auto",
          maxWidth: 350,
        },
        arrow: {
          color: "#effeff",
        },
      },
      defaultProps: {
        arrow: true,
        enterTouchDelay: 10,
        leaveTouchDelay: 3000,
        PopperProps: {
          modifiers: [
            {
              name: "zIndex",
              enabled: true,
              phase: "write",
              fn: ({ state }) => {
                state.styles.popper.zIndex = 9999;
              },
            },
          ],
        },
      },
    },
  },
});

export default theme;
