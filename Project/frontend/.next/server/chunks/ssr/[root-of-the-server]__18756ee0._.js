module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/theme/theme.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$createTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__createTheme$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/styles/createTheme.js [app-ssr] (ecmascript) <export default as createTheme>");
;
const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$createTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__createTheme$3e$__["createTheme"])({
    palette: {
        primary: {
            main: "#e48025"
        },
        secondary: {
            main: "#124d86"
        },
        page: {
            main: "#f4f4f4"
        },
        card: {
            main: "#ffffff"
        },
        cardbg: {
            // main: "#c6e3f4",
            main: "#fff1d9"
        }
    },
    gradients: {
        bgprimary: {
            main: "linear-gradient(rgb(227, 16, 72), #e48025)"
        },
        bgsecondary: {
            main: "linear-gradient(#e48025, rgb(227, 16, 72))"
        }
    },
    typography: {
        color: "black",
        fontSize: 14,
        fontFamily: "'Open Sans', sans-serif"
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                html: {
                    fontSize: 14,
                    color: "black"
                },
                '[role="presentation"].MuiPopover-root': {
                    zIndex: 15000
                },
                ".MuiTooltip-arrow::before": {
                    border: "1px solid #ccc",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    boxSizing: "border-box"
                },
                "*": {
                    scrollbarWidth: "thin",
                    scrollbarColor: "#063686 transparent"
                },
                "*::-webkit-scrollbar": {
                    width: "8px",
                    height: "8px"
                },
                "*::-webkit-scrollbar-track": {
                    background: "transparent"
                },
                "*::-webkit-scrollbar-thumb": {
                    backgroundColor: "#063686",
                    borderRadius: "8px",
                    border: "2px solid transparent",
                    backgroundClip: "content-box"
                },
                "*::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "#063686"
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    fontSize: 14
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: 14
                },
                shrink: {
                    fontWeight: 500
                }
            }
        },
        MuiSelect: {
            styleOverrides: {
                select: {
                    fontSize: 14
                }
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    fontSize: 13
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: 12
                }
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: "14px",
                    "&.Mui-selected": {
                        color: "#063686"
                    }
                },
                indicator: {
                    backgroundColor: "#063686"
                }
            }
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: "secondary.main",
                    textDecoration: "none",
                    "&:hover": {
                        textDecoration: "underline",
                        color: "primary.main"
                    }
                }
            }
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    "&:before": {
                        display: "none"
                    }
                }
            }
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
                    maxWidth: 350
                },
                arrow: {
                    color: "#effeff"
                }
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
                            fn: ({ state })=>{
                                state.styles.popper.zIndex = 9999;
                            }
                        }
                    ]
                }
            }
        }
    }
});
const __TURBOPACK__default__export__ = theme;
}),
"[project]/src/Context/query.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QueryProvider",
    ()=>QueryProvider,
    "useQuery",
    ()=>useQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
const QueryContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])();
function QueryProvider({ children }) {
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const queryParams = Array.from(searchParams.keys()).reduce((a, key)=>{
        const values = searchParams.getAll(key);
        a[key] = values.length === 1 ? values[0] : values;
        return a;
    }, {});
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(QueryContext.Provider, {
        value: queryParams,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/Context/query.js",
        lineNumber: 13,
        columnNumber: 12
    }, this);
}
function useQuery() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(QueryContext);
}
}),
"[project]/src/util/page/card.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Card
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Card$2f$Card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Card/Card.js [app-ssr] (ecmascript)");
;
;
function Card(attr) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Card$2f$Card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        variant: "outlined",
        sx: attr.sx,
        children: attr.children
    }, void 0, false, {
        fileName: "[project]/src/util/page/card.js",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/util/page/text.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-ssr] (ecmascript)");
;
;
function __TURBOPACK__default__export__({ children, sx, ...rest }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        sx: sx,
        ...rest,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/util/page/text.js",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/forms/RequiredLabel.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RequiredLabel",
    ()=>RequiredLabel,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
const RequiredLabel = ({ label })=>{
    return [
        null,
        undefined,
        ""
    ].includes(label) ? label : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            label,
            " ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    color: "red"
                },
                children: "*"
            }, void 0, false, {
                fileName: "[project]/src/components/forms/RequiredLabel.jsx",
                lineNumber: 8,
                columnNumber: 15
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
const __TURBOPACK__default__export__ = RequiredLabel;
}),
"[project]/src/components/forms/InputTextField.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TextField/TextField.js [app-ssr] (ecmascript)");
;
;
;
const FormTextField = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].forwardRef((props, ref)=>{
    const { InputProps, inputProps, inputSX, error, helperText, id, type, name, label, placeholder, autoComplete, autoFocus, required, fullWidth, select, variant, color, sx, defaultValue, onChange, children, InputLabelProps, multiline, maxRows, disabled, ...rest } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        inputRef: ref,
        InputProps: {
            ...InputProps,
            sx: {
                backgroundColor: "white",
                ...InputProps?.sx
            }
        },
        inputProps: {
            ...inputProps,
            autoComplete: autoComplete || inputProps?.autoComplete || "off"
        },
        InputLabelProps: InputLabelProps,
        error: error,
        helperText: helperText,
        id: id,
        ...multiline ? {} : {
            type
        },
        name: name,
        label: label,
        placeholder: placeholder,
        autoFocus: autoFocus,
        required: required,
        fullWidth: fullWidth,
        select: multiline ? false : select,
        variant: variant,
        color: color,
        sx: sx ?? inputSX,
        defaultValue: defaultValue,
        onChange: onChange,
        maxRows: maxRows,
        multiline: multiline,
        size: "small",
        disabled: disabled,
        ...rest,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/forms/InputTextField.jsx",
        lineNumber: 35,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
FormTextField.displayName = "FormTextField";
const __TURBOPACK__default__export__ = FormTextField;
}),
"[project]/src/components/forms/index.jsx [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$RequiredLabel$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forms/RequiredLabel.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$InputTextField$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forms/InputTextField.jsx [app-ssr] (ecmascript)");
;
;
}),
"[project]/src/util/page/controls.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControl$2f$FormControl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/FormControl/FormControl.js [app-ssr] (ecmascript)");
;
;
function FormControls(attr) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControl$2f$FormControl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        fullWidth: true,
        children: attr.children
    }, void 0, false, {
        fileName: "[project]/src/util/page/controls.js",
        lineNumber: 4,
        columnNumber: 10
    }, this);
}
const __TURBOPACK__default__export__ = FormControls;
}),
"[project]/src/util/page/label.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormLabel$2f$FormLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/FormLabel/FormLabel.js [app-ssr] (ecmascript)");
;
;
function FormLabels(attr) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormLabel$2f$FormLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        htmlFor: attr.htmlFor,
        children: attr.children
    }, void 0, false, {
        fileName: "[project]/src/util/page/label.js",
        lineNumber: 4,
        columnNumber: 10
    }, this);
}
const __TURBOPACK__default__export__ = FormLabels;
}),
"[project]/src/util/page/controllabel.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/FormControlLabel/FormControlLabel.js [app-ssr] (ecmascript)");
;
;
function ControlLabel(attr) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        control: attr.control,
        label: attr.label,
        sx: {
            display: "inline",
            width: "200px"
        }
    }, void 0, false, {
        fileName: "[project]/src/util/page/controllabel.js",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = ControlLabel;
}),
"[project]/src/util/page/checkbox.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Checkbox/Checkbox.js [app-ssr] (ecmascript)");
;
;
function FormCheckbox(attr) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        ...attr
    }, void 0, false, {
        fileName: "[project]/src/util/page/checkbox.js",
        lineNumber: 4,
        columnNumber: 10
    }, this);
}
const __TURBOPACK__default__export__ = FormCheckbox;
}),
"[project]/src/util/page/divider.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Divider$2f$Divider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Divider/Divider.js [app-ssr] (ecmascript)");
;
;
function DividerLine(attr) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Divider$2f$Divider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        sx: attr.sx,
        children: attr.children
    }, void 0, false, {
        fileName: "[project]/src/util/page/divider.js",
        lineNumber: 4,
        columnNumber: 10
    }, this);
}
const __TURBOPACK__default__export__ = DividerLine;
}),
"[project]/src/util/page/box.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript)");
;
;
function ContentBox(attr) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        ...attr,
        children: attr.children
    }, void 0, false, {
        fileName: "[project]/src/util/page/box.js",
        lineNumber: 4,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = ContentBox;
}),
"[project]/src/util/page/link.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Link$2f$Link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Link/Link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
;
;
;
function Links(attr) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Link$2f$Link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        color: "secondary",
        href: attr.href,
        component: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        type: attr.type,
        onClick: attr.onClick,
        variant: attr.variant,
        sx: attr.sx,
        underline: attr.underline,
        target: attr.target,
        tabIndex: attr.tabIndex,
        children: attr.children
    }, void 0, false, {
        fileName: "[project]/src/util/page/link.js",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = Links;
}),
"[project]/src/util/page/stack.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Stack/Stack.js [app-ssr] (ecmascript)");
;
;
function TextStack(attr) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        direction: attr.direction,
        sx: attr.sx,
        children: attr.children
    }, void 0, false, {
        fileName: "[project]/src/util/page/stack.js",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = TextStack;
}),
"[project]/src/util/page/button.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PageButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Button/Button.js [app-ssr] (ecmascript)");
;
;
function PageButton(attr) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        onClick: attr.onClick,
        variant: attr.variant,
        type: attr.type,
        sx: attr.sx,
        endIcon: attr.endIcon,
        "aria-label": attr["aria - label"],
        ...attr,
        children: attr.children
    }, void 0, false, {
        fileName: "[project]/src/util/page/button.js",
        lineNumber: 4,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/forms/InputTextField.jsx [app-ssr] (ecmascript) <export default as InputTextField>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InputTextField",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$InputTextField$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$InputTextField$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forms/InputTextField.jsx [app-ssr] (ecmascript)");
}),
"[project]/src/util/page/controls.js [app-ssr] (ecmascript) <export default as Control>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Control",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$controls$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$controls$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/controls.js [app-ssr] (ecmascript)");
}),
"[project]/src/util/page/controllabel.js [app-ssr] (ecmascript) <export default as ControlLabel>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ControlLabel",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$controllabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$controllabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/controllabel.js [app-ssr] (ecmascript)");
}),
"[project]/src/util/page/checkbox.js [app-ssr] (ecmascript) <export default as Checkbox>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Checkbox",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$checkbox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$checkbox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/checkbox.js [app-ssr] (ecmascript)");
}),
"[project]/src/util/checkPasswordStrength.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>checkPasswordStrength
]);
function checkPasswordStrength(password) {
    const lengthRequirement = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    let score = 0;
    if (lengthRequirement) score++;
    if (hasUpperCase) score++;
    if (hasLowerCase) score++;
    if (hasNumbers) score++;
    if (hasSpecialChars) score++;
    let strength = "Very Weak";
    switch(score){
        case 1:
            strength = "Very Weak";
            break;
        case 2:
            strength = "Weak";
            break;
        case 3:
            strength = "Fair";
            break;
        case 4:
            strength = "Good";
            break;
        case 5:
            strength = "Strong";
            break;
    }
    return {
        score,
        color: [
            "",
            "error",
            "error",
            "warning",
            "success",
            "success"
        ][score],
        strength,
        requirements: {
            lengthRequirement,
            hasUpperCase,
            hasLowerCase,
            hasNumbers,
            hasSpecialChars
        }
    };
}
}),
"[project]/src/util/page/Error.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Error
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Alert/Alert.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
;
function Error(attr) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        severity: "error",
        children: attr.message
    }, void 0, false, {
        fileName: "[project]/src/util/page/Error.jsx",
        lineNumber: 5,
        columnNumber: 12
    }, this);
}
}),
"[project]/src/util/page/select.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControl$2f$FormControl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControl$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/FormControl/FormControl.js [app-ssr] (ecmascript) <export default as FormControl>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputLabel$2f$InputLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__InputLabel$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/InputLabel/InputLabel.js [app-ssr] (ecmascript) <export default as InputLabel>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Select$2f$Select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Select/Select.js [app-ssr] (ecmascript) <export default as Select>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/MenuItem/MenuItem.js [app-ssr] (ecmascript) <export default as MenuItem>");
"use client";
;
;
;
const SelectInput = ({ label, value, onChange, onClick, name, options, size = "small", fullWidth = true, sx = {}, slotProps = {}, defaultValue })=>{
    const [val, setVal] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(defaultValue ?? value ?? "");
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        setVal(defaultValue ?? value ?? "");
    }, [
        defaultValue,
        value
    ]);
    const labelId = `${name || label.toLowerCase().replace(/\s+/g, "-")}-label`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControl$2f$FormControl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControl$3e$__["FormControl"], {
        size: size,
        fullWidth: fullWidth,
        sx: sx,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputLabel$2f$InputLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__InputLabel$3e$__["InputLabel"], {
                id: labelId,
                children: label
            }, void 0, false, {
                fileName: "[project]/src/util/page/select.js",
                lineNumber: 26,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Select$2f$Select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                labelId: labelId,
                label: label,
                value: val,
                onChange: onChange,
                onClick: onClick,
                name: name,
                size: size,
                fullWidth: true,
                slotProps: {
                    ...slotProps,
                    paper: {
                        sx: {
                            zIndex: 15000
                        }
                    }
                },
                children: options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                        value: opt.value,
                        sx: {
                            fontWeight: 500
                        },
                        children: opt.label
                    }, opt.value, false, {
                        fileName: "[project]/src/util/page/select.js",
                        lineNumber: 46,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/util/page/select.js",
                lineNumber: 27,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/util/page/select.js",
        lineNumber: 25,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = SelectInput;
}),
"[project]/src/util/page/icononlyselect.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HeaderIconSelect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-ssr] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Menu$2f$Menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Menu/Menu.js [app-ssr] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/MenuItem/MenuItem.js [app-ssr] (ecmascript) <export default as MenuItem>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Tooltip/Tooltip.js [app-ssr] (ecmascript) <export default as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$KeyboardArrowDown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/KeyboardArrowDown.js [app-ssr] (ecmascript)");
;
;
;
;
function HeaderIconSelect({ options = [], value, onChange, tooltip = "" }) {
    const [anchorEl, setAnchorEl] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(null);
    const open = Boolean(anchorEl);
    const handleOpen = (e)=>setAnchorEl(e.currentTarget);
    const handleClose = ()=>setAnchorEl(null);
    const handleSelect = (val)=>{
        if (onChange) onChange({
            target: {
                value: val
            }
        });
        handleClose();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                title: tooltip,
                placement: "top",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                    "aria-controls": open ? "header-select-menu" : undefined,
                    "aria-haspopup": "true",
                    "aria-expanded": open ? "true" : undefined,
                    onClick: handleOpen,
                    sx: {
                        p: 0.5
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$KeyboardArrowDown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            color: "white",
                            fontSize: 24
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/util/page/icononlyselect.js",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/util/page/icononlyselect.js",
                    lineNumber: 25,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/util/page/icononlyselect.js",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Menu$2f$Menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                id: "header-select-menu",
                anchorEl: anchorEl,
                open: open,
                onClose: handleClose,
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                },
                transformOrigin: {
                    vertical: "top",
                    horizontal: "left"
                },
                PaperProps: {
                    sx: {
                        minWidth: 80,
                        zIndex: 15000
                    }
                },
                children: options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                        sx: {
                            fontWeight: "bold"
                        },
                        selected: opt.value === value,
                        onClick: ()=>handleSelect(opt.value),
                        children: opt.label
                    }, String(opt.value ?? opt.label), false, {
                        fileName: "[project]/src/util/page/icononlyselect.js",
                        lineNumber: 48,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/util/page/icononlyselect.js",
                lineNumber: 38,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/src/util/page/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Box",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    "Card",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    "Checkbox",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$checkbox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    "Control",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$controls$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    "ControlLabel",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$controllabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    "Divider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$divider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    "Error",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$Error$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    "IconOnlySelect",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$icononlyselect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    "Input",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$input$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    "InputTextField",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$InputTextField$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__InputTextField$3e$__["InputTextField"],
    "Label",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$label$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    "Link",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    "MuiButton",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    "Password",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$Password$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    "Select",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    "Stack",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    "Text",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/card.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/text.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$InputTextField$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__InputTextField$3e$__ = __turbopack_context__.i("[project]/src/components/forms/InputTextField.jsx [app-ssr] (ecmascript) <export default as InputTextField>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$controls$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/controls.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$label$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/label.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$controllabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/controllabel.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$checkbox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/checkbox.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$divider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/divider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/box.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/stack.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/button.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$input$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/input.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$Error$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/Error.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$Password$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/Password.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/select.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$icononlyselect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/icononlyselect.js [app-ssr] (ecmascript)");
}),
"[project]/src/util/page/index.js [app-ssr] (ecmascript) <export * as Page>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Page",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-ssr] (ecmascript)");
}),
"[project]/src/util/page/Password.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TextField/TextField.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-ssr] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputAdornment$2f$InputAdornment$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__InputAdornment$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/InputAdornment/InputAdornment.js [app-ssr] (ecmascript) <export default as InputAdornment>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LinearProgress$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/LinearProgress/LinearProgress.js [app-ssr] (ecmascript) <export default as LinearProgress>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Visibility$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Visibility.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$VisibilityOff$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/VisibilityOff.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$checkPasswordStrength$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/checkPasswordStrength.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-ssr] (ecmascript) <export * as Page>");
"use client";
;
;
;
;
;
;
;
;
function __TURBOPACK__default__export__({ unmaskable, strengthMeter, timeout, onTimeout, match, onStrengthChanged, error: Error, ...attr }) {
    const [extraInfo, setExtraInfo] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState("");
    const [slotProps, setSlotProps] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState();
    const [masked, setMasked] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(true);
    const [countdown, setCountdown] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(0);
    const [showStrength, setShowStrength] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [password, setPassword] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState("");
    const [error, setError] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [passwordStrength, setPasswordStrength] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState({
        score: 0,
        color: "",
        strength: ""
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (!strengthMeter) return;
        setShowStrength(true);
    }, [
        strengthMeter
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (countdown === undefined) return;
        if (countdown > 0) {
            setTimeout(()=>{
                setCountdown(countdown - 1);
            }, 1000);
            setExtraInfo(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex-end",
                children: [
                    timeout.prefix,
                    " ",
                    countdown,
                    " ",
                    timeout.suffix
                ]
            }, void 0, true, {
                fileName: "[project]/src/util/page/Password.jsx",
                lineNumber: 44,
                columnNumber: 9
            }, this));
        }
    }, [
        countdown
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (!onTimeout) return;
        setCountdown(timeout?.value);
        setTimeout(()=>{
            setExtraInfo("");
            onTimeout();
        }, timeout?.value * 1000);
    }, [
        timeout?.value
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        setSlotProps({
            input: {
                endAdornment: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputAdornment$2f$InputAdornment$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__InputAdornment$3e$__["InputAdornment"], {
                    position: "end",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                        variant: "contained",
                        onClick: toggleMasked,
                        sx: {
                            height: "32px",
                            width: "32px",
                            px: 2,
                            "&:hover": {
                                boxShadow: "none"
                            }
                        },
                        children: [
                            " ",
                            masked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$VisibilityOff$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/src/util/page/Password.jsx",
                                lineNumber: 77,
                                columnNumber: 25
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Visibility$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/src/util/page/Password.jsx",
                                lineNumber: 77,
                                columnNumber: 45
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/util/page/Password.jsx",
                        lineNumber: 64,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/util/page/Password.jsx",
                    lineNumber: 63,
                    columnNumber: 11
                }, this)
            },
            root: {}
        });
    }, [
        unmaskable,
        masked
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (!showStrength) return;
        setPasswordStrength((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$checkPasswordStrength$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(password));
    }, [
        password
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (!showStrength) return;
        setError(passwordStrength.score < 4);
        setExtraInfo(passwordStrength.score > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                    component: "span",
                    sx: {
                        fontSize: "12px",
                        mt: 0.5,
                        display: "flex",
                        justifyContent: "space-between"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: passwordStrength.color,
                            component: "span",
                            sx: {
                                fontSize: "13px",
                                fontWeight: "400",
                                color: passwordStrength.color
                            },
                            children: passwordStrength.strength
                        }, void 0, false, {
                            fileName: "[project]/src/util/page/Password.jsx",
                            lineNumber: 104,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                color: "#757575",
                                fontSize: "11px"
                            },
                            children: [
                                passwordStrength.score,
                                "/5"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/util/page/Password.jsx",
                            lineNumber: 115,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/util/page/Password.jsx",
                    lineNumber: 95,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LinearProgress$3e$__["LinearProgress"], {
                    variant: "determinate",
                    value: passwordStrength.score * 20,
                    color: passwordStrength.color
                }, void 0, false, {
                    fileName: "[project]/src/util/page/Password.jsx",
                    lineNumber: 119,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {}, void 0, false));
        onStrengthChanged && onStrengthChanged(passwordStrength);
    }, [
        passwordStrength
    ]);
    function toggleMasked() {
        setMasked(!masked);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        ...attr,
        InputProps: attr.InputProps,
        inputProps: {
            ...attr.inputProps,
            sx: {
                backgroundColor: "white"
            }
        },
        InputLabelProps: attr.InputLabelProps,
        error: error,
        helperText: extraInfo,
        id: attr.id,
        type: masked ? "password" : "text",
        name: attr.name,
        placeholder: attr.placeholder,
        autoComplete: attr.autocomplete,
        autoFocus: attr.autoFocus,
        required: attr.required,
        variant: attr.variant,
        color: attr.color,
        sx: attr.sx,
        size: "small",
        value: password,
        onChange: (e)=>{
            if (attr.onChange) attr.onChange(e);
            let target = e.target;
            setPassword(target.value);
            if (!match) return;
            let form = target.form;
            let fld = form.querySelector(`[name=${match}]`);
            let basePassword = fld.value;
            if (basePassword === target.value) {
                setError(false);
            } else {
                setError(true);
            }
        },
        onBlur: ()=>{
            if (Error) {
                setPassword("");
                setError(false);
            }
        },
        slotProps: slotProps,
        fullWidth: true
    }, void 0, false, {
        fileName: "[project]/src/util/page/Password.jsx",
        lineNumber: 136,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/util/page/Password.jsx [app-ssr] (ecmascript) <export default as Password>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Password",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$Password$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$Password$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/Password.jsx [app-ssr] (ecmascript)");
}),
"[project]/src/util/page/input.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$InputTextField$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__InputTextField$3e$__ = __turbopack_context__.i("[project]/src/components/forms/InputTextField.jsx [app-ssr] (ecmascript) <export default as InputTextField>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$controls$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Control$3e$__ = __turbopack_context__.i("[project]/src/util/page/controls.js [app-ssr] (ecmascript) <export default as Control>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$controllabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ControlLabel$3e$__ = __turbopack_context__.i("[project]/src/util/page/controllabel.js [app-ssr] (ecmascript) <export default as ControlLabel>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$checkbox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__ = __turbopack_context__.i("[project]/src/util/page/checkbox.js [app-ssr] (ecmascript) <export default as Checkbox>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$Password$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Password$3e$__ = __turbopack_context__.i("[project]/src/util/page/Password.jsx [app-ssr] (ecmascript) <export default as Password>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputAdornment$2f$InputAdornment$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__InputAdornment$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/InputAdornment/InputAdornment.js [app-ssr] (ecmascript) <export default as InputAdornment>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-ssr] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function input(attr) {
    if (attr.control) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Controller"], {
        name: attr?.name,
        control: attr?.control,
        render: ({ fld })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InputField, {
                ...fld,
                ...attr,
                name: undefined
            }, void 0, false, {
                fileName: "[project]/src/util/page/input.jsx",
                lineNumber: 20,
                columnNumber: 30
            }, void 0)
    }, void 0, false, {
        fileName: "[project]/src/util/page/input.jsx",
        lineNumber: 17,
        columnNumber: 7
    }, this);
    else return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(InputField, {
        ...attr
    }, void 0, false, {
        fileName: "[project]/src/util/page/input.jsx",
        lineNumber: 23,
        columnNumber: 15
    }, this);
}
function InputField(attr) {
    const [slotProps, setSlotProps] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(undefined);
    const [hasError, setHasError] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [errorMessage, setErrorMessage] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState("");
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        // console.log(attr)
        if (!attr.hasAction) {
            setSlotProps(undefined);
            return;
        }
        setSlotProps({
            input: {
                endAdornment: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputAdornment$2f$InputAdornment$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__InputAdornment$3e$__["InputAdornment"], {
                    position: "end",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                        variant: "contained",
                        onClick: attr.onAction,
                        sx: {
                            height: "32px",
                            width: "32px",
                            px: 2,
                            "&:hover": {
                                boxShadow: "none"
                            }
                        },
                        children: attr.actionBtn
                    }, void 0, false, {
                        fileName: "[project]/src/util/page/input.jsx",
                        lineNumber: 41,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/util/page/input.jsx",
                    lineNumber: 40,
                    columnNumber: 11
                }, this)
            },
            root: {}
        });
    }, [
        attr.hasAction,
        attr.actionBtn
    ]);
    switch(attr.type ?? "text"){
        case "checkbox":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$controllabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ControlLabel$3e$__["ControlLabel"], {
                control: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$checkbox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__["Checkbox"], {
                    name: attr.name,
                    value: attr.value,
                    color: "primary",
                    size: "small"
                }, void 0, false, {
                    fileName: "[project]/src/util/page/input.jsx",
                    lineNumber: 67,
                    columnNumber: 13
                }, void 0),
                label: attr.label
            }, void 0, false, {
                fileName: "[project]/src/util/page/input.jsx",
                lineNumber: 65,
                columnNumber: 9
            }, this);
            //TURBOPACK unreachable
            ;
        case "password":
            // console.log("Loading password")
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$controls$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Control$3e$__["Control"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$Password$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Password$3e$__["Password"], {
                    id: attr.id ?? attr.name,
                    name: attr.name,
                    required: attr.required,
                    autoFocus: attr.autoFocus,
                    unmaskable: attr.unmaskable,
                    strengthMeter: attr.strengthMeter,
                    timeout: attr.timeout,
                    onTimeout: attr.onTimeout,
                    match: attr.match,
                    ...attr
                }, void 0, false, {
                    fileName: "[project]/src/util/page/input.jsx",
                    lineNumber: 83,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/util/page/input.jsx",
                lineNumber: 81,
                columnNumber: 9
            }, this);
            //TURBOPACK unreachable
            ;
        default:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$controls$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Control$3e$__["Control"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$InputTextField$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__InputTextField$3e$__["InputTextField"], {
                    fullWidth: attr.fullWidth,
                    id: attr.id ?? attr.name,
                    type: attr.type ?? "text",
                    name: attr.name,
                    placeholder: attr.placeholder,
                    autoComplete: attr.autoComplete,
                    variant: attr.variant,
                    required: attr.required,
                    autoFocus: attr.autoFocus,
                    InputProps: attr.InputProps,
                    onFocus: attr.onFocus,
                    slotProps: slotProps,
                    error: hasError,
                    helperText: attr.helperText,
                    inputProps: attr.inputProps,
                    sx: attr.sx,
                    ...attr
                }, void 0, false, {
                    fileName: "[project]/src/util/page/input.jsx",
                    lineNumber: 112,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/util/page/input.jsx",
                lineNumber: 109,
                columnNumber: 9
            }, this);
            //TURBOPACK unreachable
            ;
    }
}
}),
"[project]/src/util/page/index.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/card.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/text.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$index$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/forms/index.jsx [app-ssr] (ecmascript) <locals>");
// export { default as InputTextField } from "./textfield";
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$controls$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/controls.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$label$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/label.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$controllabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/controllabel.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$checkbox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/checkbox.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$divider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/divider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/box.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$stack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/stack.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/button.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$input$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/input.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$Error$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/Error.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$Password$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/Password.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/select.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$icononlyselect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/icononlyselect.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/src/util/api.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
function wait(time = 1000) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve();
        }, time);
    });
}
class API {
    constructor(baseUrl = ""){
        this.baseUrl = baseUrl;
    }
    async request(method, endpoint, { body, headers = {} } = {}) {
        // await wait(5000);
        const url = `${this.baseUrl}${endpoint}`;
        const token = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
        // Set default headers
        const defaultHeaders = {
            'Content-Type': 'application/json',
            ...token && {
                Authorization: `Bearer ${token}`
            }
        };
        // Merge headers
        const mergedHeaders = {
            ...defaultHeaders,
            ...headers
        };
        // Handle FormData content type
        if (body instanceof FormData) {
            delete mergedHeaders['Content-Type'];
        }
        const config = {
            method,
            headers: mergedHeaders
        };
        if (body && method !== 'GET') {
            config.body = body instanceof FormData ? body : JSON.stringify(body);
        }
        const response = await fetch(url, config);
        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch  {
                console.log(response);
                errorData = {
                    message: response.statusText
                };
            }
            document.dispatchEvent(new CustomEvent('error-received', {
                detail: {
                    status: response.status,
                    message: errorData.message
                }
            }));
            return errorData; //throw new Error(errorData.message || 'Request failed');
        }
        return response.json();
    }
    async getHtml(url, config = {
        mode: "no-cors"
    }) {
        console.log(url);
        const response = await fetch(url, config);
        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
                console.log(errorData);
            } catch  {
                errorData = {
                    message: response.statusText
                };
            }
            document.dispatchEvent(new CustomEvent('error-received', {
                detail: {
                    status: response.status,
                    message: errorData.message
                }
            }));
            return errorData; //throw new Error(errorData.message || 'Request failed');
        }
        return response;
    }
    get(endpoint, options = {}) {
        return this.request('GET', endpoint, options);
    }
    post(endpoint, body, options = {}) {
        return this.request('POST', endpoint, {
            ...options,
            body
        });
    }
    put(endpoint, body, options = {}) {
        return this.request('PUT', endpoint, {
            ...options,
            body
        });
    }
    patch(endpoint, body, options = {}) {
        return this.request('PATCH', endpoint, {
            ...options,
            body
        });
    }
    delete(endpoint, body, options = {}) {
        return this.request('DELETE', endpoint, {
            ...options,
            body
        });
    }
    copy(endpoint, body = {}, options = {}) {
        return this.request('COPY', endpoint, {
            ...options,
            body
        });
    }
}
// Export as singleton instance
const api = new API();
const __TURBOPACK__default__export__ = api;
}),
"[project]/src/util/loadPDF.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>loadPDF
]);
async function loadPDF({ onLoading, onLoad, onFileLoad, config }) {
    if (onLoading) onLoading(true);
    if (onLoad) onLoad(null);
    try {
        const response = await fetch("/generate-pdf", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(config = {
                pageSize: "A4",
                orientation: "portrait",
                printBackground: true,
                margin: {
                    top: "1cm",
                    bottom: "1cm",
                    left: "1cm",
                    right: "1cm"
                },
                ...config
            })
        });
        if (!response.ok) {
            throw new Error("Failed to fetch PDF");
        }
        const blob = await response.blob();
        if (onFileLoad) onFileLoad(blob);
        const url = URL.createObjectURL(blob);
        if (onLoad) onLoad(url);
    } catch (error) {
        console.error(error);
        alert("Error fetching PDF");
    } finally{
        if (onLoading) onLoading(false);
    }
}
;
}),
"[project]/src/util/submitWithAjax.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/api.js [app-ssr] (ecmascript)");
;
async function __TURBOPACK__default__export__(e) {
    e.preventDefault();
    const target = e.target;
    let data = Array.from(target.querySelectorAll("[name]")).reduce((a, c)=>{
        let value = c.value;
        if (c.type === "checkbox") value = c.checked;
        if (!(c.name in a)) a[c.name] = value;
        else if (a[c.name] instanceof Array) a[c.name].push(value);
        else a[c.name] = [
            a[c.name],
            value
        ];
        return a;
    }, {});
    const method = target.getAttribute("method") ?? target.method.toLowerCase();
    const action = target.action;
    return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"][method](action, data);
}
}),
"[project]/src/util/inputKeyboardShortcut.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>inputKeyboardShotcut
]);
function inputKeyboardShotcut(e) {
    const ctrl = e.ctrlKey || e.metaKey;
    if (!ctrl) return;
    e.preventDefault();
    let target = e.target;
    let name = target.name.split(".");
    // console.log(name)
    let index = Number(name[1]);
    if (isNaN(index)) return;
    switch(e.key){
        case "ArrowUp":
            index--;
            break;
        case "ArrowDown":
            index++;
            break;
        default:
            return;
            //TURBOPACK unreachable
            ;
    }
    name[1] = index;
    let newName = name.join(".");
    document.querySelector(`[name="${newName}"]`)?.focus();
}
}),
"[project]/src/util/isAllowed.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>isAllowed
]);
function isAllowed(member, { module, feature, action }) {
    if (!member || !member.permissions || !(member.permissions instanceof Array)) return false;
    if (!module || !feature || !action) return false;
    let permission = member.permissions.find((p)=>p.module === module && p.feature === feature && p.action.includes(action));
    if (!permission) return false;
    return true;
}
}),
"[project]/src/util/api.js [app-ssr] (ecmascript) <export default as api>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "api",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/api.js [app-ssr] (ecmascript)");
}),
"[project]/src/util/getSecurityInfo.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__ = __turbopack_context__.i("[project]/src/util/api.js [app-ssr] (ecmascript) <export default as api>");
"use client";
;
class Telemetry {
    constructor(){}
    async browserID() {
        let browserid = window.localStorage.getItem("browserid");
        if (!browserid) {
            browserid = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__["api"].get(`/api/v1/security/browserid`);
            window.localStorage.setItem("browserid", browserid);
        }
    }
    gps() {
        return new Promise((resolve, reject)=>{
            if (!window || !window.navigator || !window.navigator.geolocation) return reject(`GPS Access not available`);
            window.navigator.geolocation.getCurrentPosition((location)=>{
                resolve(location.coords);
            }, (err)=>{
                reject(err);
            });
        });
    }
    async ip() {
        let info = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__["api"].get("/api/v1/get-country");
        return info;
    }
    async timezone(type = "Name") {
        switch(type){
            case "offset":
                return new Date().getTimezoneOffset();
                //TURBOPACK unreachable
                ;
            default:
                return Intl.DateTimeFormat().resolvedOptions().timeZone;
                //TURBOPACK unreachable
                ;
        }
    }
    async screen() {
        return `${window.screen.availWidth} X ${window.screen.availHeight} (${window.screen.colorDepth}) [${window.screen.orientation.type} (${window.screen.orientation.angle}deg)]`;
    }
    async languages() {
        return window.navigator.languages || window.navigator.language;
    }
    async userAgent() {
        return window.navigator.userAgent;
    }
    async device() {
        return /Mobi|Android/i.test(window.navigator.userAgent) ? "Mobile" : /Tablet|iPad/i.test(window.navigator.userAgent) ? "Tablet" : "Desktop";
    }
    async os() {
        const ua = window.navigator.userAgent;
        return /Android/i.test(ua) ? "android" : /iPhone|iPad|iPod/i.test(ua) ? "ios" : /Windows NT/i.test(ua) ? "windows" : /Mac OS X/i.test(ua) ? "mac" : /Linux/i.test(ua) ? "linux" : "other";
    }
    async webDriver() {
        return window.navigator.webDriver;
    }
    async doNotTrack() {
        return window.navigator.doNotTrack;
    }
    async battery() {
        let battery = await window.navigator.getBattery();
        if (!battery) return false;
        return `${battery.level * 100}% (${battery.charging ? "Charging" : "Discharging"})`;
    }
}
const __TURBOPACK__default__export__ = new Telemetry();
}),
"[project]/src/util/getCurrency.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const currencyList = {
    "AF": "AFN",
    "AX": "EUR",
    "AL": "ALL",
    "DZ": "DZD",
    "AS": "USD",
    "AD": "EUR",
    "AO": "AOA",
    "AI": "XCD",
    "AQ": "AAD",
    "AG": "XCD",
    "AR": "ARS",
    "AM": "AMD",
    "AW": "AWG",
    "AU": "AUD",
    "AT": "EUR",
    "AZ": "AZN",
    "BH": "BHD",
    "BD": "BDT",
    "BB": "BBD",
    "BY": "BYN",
    "BE": "EUR",
    "BZ": "BZD",
    "BJ": "XOF",
    "BM": "BMD",
    "BT": "BTN",
    "BO": "BOB",
    "BQ": "USD",
    "BA": "BAM",
    "BW": "BWP",
    "BV": "NOK",
    "BR": "BRL",
    "IO": "USD",
    "BN": "BND",
    "BG": "BGN",
    "BF": "XOF",
    "BI": "BIF",
    "KH": "KHR",
    "CM": "XAF",
    "CA": "CAD",
    "CV": "CVE",
    "KY": "KYD",
    "CF": "XAF",
    "TD": "XAF",
    "CL": "CLP",
    "CN": "CNY",
    "CX": "AUD",
    "CC": "AUD",
    "CO": "COP",
    "KM": "KMF",
    "CG": "XAF",
    "CK": "NZD",
    "CR": "CRC",
    "CI": "XOF",
    "HR": "HRK",
    "CU": "CUP",
    "CW": "ANG",
    "CY": "EUR",
    "CZ": "CZK",
    "CD": "CDF",
    "DK": "DKK",
    "DJ": "DJF",
    "DM": "XCD",
    "DO": "DOP",
    "TL": "USD",
    "EC": "USD",
    "EG": "EGP",
    "SV": "USD",
    "GQ": "XAF",
    "ER": "ERN",
    "EE": "EUR",
    "ET": "ETB",
    "FK": "FKP",
    "FO": "DKK",
    "FJ": "FJD",
    "FI": "EUR",
    "FR": "EUR",
    "GF": "EUR",
    "PF": "XPF",
    "TF": "EUR",
    "GA": "XAF",
    "GM": "GMD",
    "GE": "GEL",
    "DE": "EUR",
    "GH": "GHS",
    "GI": "GIP",
    "GR": "EUR",
    "GL": "DKK",
    "GD": "XCD",
    "GP": "EUR",
    "GU": "USD",
    "GT": "GTQ",
    "GG": "GBP",
    "GN": "GNF",
    "GW": "XOF",
    "GY": "GYD",
    "HT": "HTG",
    "HM": "AUD",
    "HN": "HNL",
    "HK": "HKD",
    "HU": "HUF",
    "IS": "ISK",
    "IN": "INR",
    "ID": "IDR",
    "IR": "IRR",
    "IQ": "IQD",
    "IE": "EUR",
    "IL": "ILS",
    "IT": "EUR",
    "JM": "JMD",
    "JP": "JPY",
    "JE": "GBP",
    "JO": "JOD",
    "KZ": "KZT",
    "KE": "KES",
    "KI": "AUD",
    "XK": "EUR",
    "KW": "KWD",
    "KG": "KGS",
    "LA": "LAK",
    "LV": "EUR",
    "LB": "LBP",
    "LS": "LSL",
    "LR": "LRD",
    "LY": "LYD",
    "LI": "CHF",
    "LT": "EUR",
    "LU": "EUR",
    "MO": "MOP",
    "MK": "MKD",
    "MG": "MGA",
    "MW": "MWK",
    "MY": "MYR",
    "MV": "MVR",
    "ML": "XOF",
    "MT": "EUR",
    "IM": "GBP",
    "MH": "USD",
    "MQ": "EUR",
    "MR": "MRO",
    "MU": "MUR",
    "YT": "EUR",
    "MX": "MXN",
    "FM": "USD",
    "MD": "MDL",
    "MC": "EUR",
    "MN": "MNT",
    "ME": "EUR",
    "MS": "XCD",
    "MA": "MAD",
    "MZ": "MZN",
    "MM": "MMK",
    "NA": "NAD",
    "NR": "AUD",
    "NP": "NPR",
    "NL": "EUR",
    "NC": "XPF",
    "NZ": "NZD",
    "NI": "NIO",
    "NE": "XOF",
    "NG": "NGN",
    "NU": "NZD",
    "NF": "AUD",
    "KP": "KPW",
    "MP": "USD",
    "NO": "NOK",
    "OM": "OMR",
    "PK": "PKR",
    "PW": "USD",
    "PS": "ILS",
    "PA": "PAB",
    "PG": "PGK",
    "PY": "PYG",
    "PE": "PEN",
    "PH": "PHP",
    "PN": "NZD",
    "PL": "PLN",
    "PT": "EUR",
    "PR": "USD",
    "QA": "QAR",
    "RE": "EUR",
    "RO": "RON",
    "RU": "RUB",
    "RW": "RWF",
    "SH": "SHP",
    "KN": "XCD",
    "LC": "XCD",
    "PM": "EUR",
    "VC": "XCD",
    "BL": "EUR",
    "MF": "EUR",
    "WS": "WST",
    "SM": "EUR",
    "ST": "STD",
    "SA": "SAR",
    "SN": "XOF",
    "RS": "RSD",
    "SC": "SCR",
    "SL": "SLL",
    "SG": "SGD",
    "SX": "ANG",
    "SK": "EUR",
    "SI": "EUR",
    "SB": "SBD",
    "SO": "SOS",
    "ZA": "ZAR",
    "GS": "GBP",
    "KR": "KRW",
    "SS": "SSP",
    "ES": "EUR",
    "LK": "LKR",
    "SD": "SDG",
    "SR": "SRD",
    "SJ": "NOK",
    "SZ": "SZL",
    "SE": "SEK",
    "CH": "CHF",
    "SY": "SYP",
    "TW": "TWD",
    "TJ": "TJS",
    "TZ": "TZS",
    "TH": "THB",
    "BS": "BSD",
    "TG": "XOF",
    "TK": "NZD",
    "TO": "TOP",
    "TT": "TTD",
    "TN": "TND",
    "TR": "TRY",
    "TM": "TMT",
    "TC": "USD",
    "TV": "AUD",
    "UG": "UGX",
    "UA": "UAH",
    "AE": "AED",
    "GB": "GBP",
    "US": "USD",
    "UM": "USD",
    "UY": "UYU",
    "UZ": "UZS",
    "VU": "VUV",
    "VA": "EUR",
    "VE": "VEF",
    "VN": "VND",
    "VG": "USD",
    "VI": "USD",
    "WF": "XPF",
    "EH": "MAD",
    "YE": "YER",
    "ZM": "ZMW",
    "ZW": "ZWL"
};
function __TURBOPACK__default__export__(cn) {
    return currencyList[cn];
}
}),
"[project]/src/util/getOptions.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>getOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/api.js [app-ssr] (ecmascript)");
;
const endpoints = {
    "country": "/api/v1/options/country",
    "state": "/api/v1/options/state",
    "city": "/api/v1/options/city",
    "department": "/api/v1/options/department",
    "designation": "/api/v1/options/designation",
    "zipcode": "/api/v1/options/zipcode",
    "language": "/api/v1/options/language",
    "currency": "/api/v1/options/currency",
    "service-category": "/api/v1/options/service-category",
    "services": "/api/v1/options/service",
    "project-type": "/api/v1/options/project-type",
    "industry": "/api/v1/options/industry",
    "tax": "/api/v1/options/tax",
    "client": "/api/v1/company",
    "vendor": "/api/v1/company",
    "user": "/api/v1/user",
    "roles": "/api/v1/role",
    "category": "/api/v1/category",
    "question": "/api/v1/question"
};
const parameters = {
    country: "",
    state: "country",
    city: "parent",
    department: "",
    designation: "department",
    zipcode: "country",
    language: "country",
    currency: "",
    "service-category": "",
    services: "parent",
    "project-type": "",
    industry: "",
    client: "category.isClient",
    vendor: "category.isVendor",
    tax: "parent",
    user: "",
    roles: "",
    category: "",
    question: ""
};
const populate = {
    category: (val)=>({
            label: val.name,
            value: val.name
        }),
    default: (val)=>({
            value: val.name,
            label: val.label
        }),
    country: (val)=>({
            value: val.name,
            label: val.label,
            img: `/images/flags/${val.name.toLowerCase()}.svg`
        }),
    roles: (val)=>({
            value: val.name,
            label: val.name
        })
};
async function getOptions(field, parameter = null, populateFn = null) {
    if (!field || !(field in endpoints)) return null;
    if (parameters[field] !== "" && (parameter === null || parameter === "")) return null;
    const cacheKey = btoa(`${field}_${parameter ?? ""}`);
    let temp = window.localStorage.getItem(cacheKey);
    if ("TURBOPACK compile-time truthy", 1) {
        temp = await updateOption(field, parameter, cacheKey);
    } else //TURBOPACK unreachable
    ;
    let populateFunction = populate.default;
    if (populate[field]) populateFunction = populate[field];
    if (!!populateFn) populateFunction = populateFn;
    return JSON.parse(temp).map(populateFunction);
}
async function updateOption(field, parameter, cacheKey) {
    let temp;
    switch(parameters[field] === "" ? "get" : "post"){
        case "get":
            temp = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(endpoints[field]);
            break;
        case "post":
            temp = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(endpoints[field], {
                [parameters[field]]: parameter
            });
            break;
    }
    if (temp.status === "success" && "data" in temp) temp = JSON.stringify(temp.data);
    localStorage.setItem(cacheKey, temp);
    return temp;
}
}),
"[project]/src/util/index.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mutate",
    ()=>mutate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/api.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$loadPDF$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/loadPDF.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$submitWithAjax$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/submitWithAjax.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$checkPasswordStrength$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/checkPasswordStrength.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$inputKeyboardShortcut$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/inputKeyboardShortcut.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$isAllowed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/isAllowed.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getSecurityInfo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/getSecurityInfo.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getCurrency$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/getCurrency.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getOptions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/getOptions.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
function mutate(data) {
    return JSON.parse(JSON.stringify(data));
}
}),
"[project]/src/util/getSecurityInfo.js [app-ssr] (ecmascript) <export default as telemetry>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "telemetry",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getSecurityInfo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getSecurityInfo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/getSecurityInfo.js [app-ssr] (ecmascript)");
}),
"[project]/src/Context/telemetry.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TelemetryProvider",
    ()=>TelemetryProvider,
    "useTelemetry",
    ()=>useTelemetry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getSecurityInfo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__telemetry$3e$__ = __turbopack_context__.i("[project]/src/util/getSecurityInfo.js [app-ssr] (ecmascript) <export default as telemetry>");
"use client";
;
;
;
const TelemetryContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])();
function TelemetryProvider({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TelemetryContext.Provider, {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getSecurityInfo$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__telemetry$3e$__["telemetry"],
        children: children
    }, void 0, false, {
        fileName: "[project]/src/Context/telemetry.js",
        lineNumber: 8,
        columnNumber: 10
    }, this);
}
function useTelemetry() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(TelemetryContext);
}
}),
"[project]/src/Context/member.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MemberProvider",
    ()=>MemberProvider,
    "useMember",
    ()=>useMember
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__ = __turbopack_context__.i("[project]/src/util/api.js [app-ssr] (ecmascript) <export default as api>");
"use client";
;
;
;
;
const MemberContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])();
function notLoggedIn(pathname, router) {
    if (typeof pathname !== "string") return;
    if (pathname.startsWith("/member")) router.replace("/");
    if (pathname.startsWith("/admin")) router.replace("/");
}
function createEvent(name, detail) {
    if (typeof document === "undefined") return console.log("No Document");
    if (!name) return console.log("Event ka naam required hai");
    document.dispatchEvent(new CustomEvent(name, {
        detail
    }));
}
async function loadUserInfo() {
    let temp = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__["api"].get(`/api/v1/me`);
    if (temp.status === "error" && temp.message.toLowerCase() === "token expired") {
        window.localStorage.removeItem("token");
        setMe(null);
        throw new Error("token expired");
    }
    return temp.data;
}
function MemberProvider({ children }) {
    const [reload, setReload] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [me, setMe1] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [router, pathname] = [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])()
    ];
    function Reload() {
        setReload(reload + 1);
    }
    function update(data) {
        updateMe(data);
    }
    function updateMe(data) {
        setMe1({
            ...data,
            Reload,
            update
        });
    }
    // useEffect(() => {
    //   if (typeof window === "undefined")
    //     return console.error("Window not loaded yet");
    //   const token = localStorage.getItem("token");
    //   if (!token) {
    //     setMe(null)
    //     return notLoggedIn(pathname, router);
    //   }
    //   loadUserInfo()
    //     .then((resp) => {
    //       if(pathname.startsWith("/admin") && !["root","admin"].includes(resp.role)){
    //           router.replace("/")
    //       }
    //       updateMe(resp)
    //     })
    //     .catch((err) => {
    //       notLoggedIn(pathname, router);
    //     });
    // }, [reload, pathname]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MemberContext.Provider, {
        value: me,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/Context/member.js",
        lineNumber: 66,
        columnNumber: 10
    }, this);
}
function useMember() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(MemberContext);
} //*/
}),
"[project]/src/Context/index.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$query$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/Context/query.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$telemetry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/Context/telemetry.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$member$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/Context/member.js [app-ssr] (ecmascript)");
;
;
;
}),
"[project]/src/componentsMHO/LoadingOverlay.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-ssr] (ecmascript) <export * as Page>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CircularProgress/CircularProgress.js [app-ssr] (ecmascript) <export default as CircularProgress>");
;
;
;
;
function LoadingOverlay({ zIndex = 9998 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
        sx: {
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(15px)",
            zIndex: zIndex
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
            sx: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                zIndex: zIndex + 1,
                width: "300px"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                sx: {
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__["CircularProgress"], {
                    enableTrackSlot: true,
                    size: 120,
                    color: "primary"
                }, void 0, false, {
                    fileName: "[project]/src/componentsMHO/LoadingOverlay.jsx",
                    lineNumber: 47,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/componentsMHO/LoadingOverlay.jsx",
                lineNumber: 34,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/componentsMHO/LoadingOverlay.jsx",
            lineNumber: 21,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/componentsMHO/LoadingOverlay.jsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = LoadingOverlay;
}),
"[project]/src/lib/enhancements.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

Set.prototype.toArray = function() {
    return Array.from(this);
};
Array.prototype.pushUnique = function(value) {
    if (!(this.indexOf(value) === -1)) return this;
    this.push(value);
    return this;
};
Array.prototype.unique = function() {
    let set1 = new Set(this);
    return set1.toArray();
};
Array.prototype.last = function() {
    return this[this.length - 1];
};
Array.prototype.removeByValue = function(val) {
    let i = this.indexOf(val);
    if (i == -1) return this;
    this.splice(i, 1);
    return this;
};
Array.prototype.getUnique = function() {
    return this.filter((item, index)=>this.indexOf(item) === index);
};
Array.prototype.removeBlank = function() {
    let i = this.indexOf("");
    while(i != -1){
        this.splice(i, 1);
        i = this.indexOf("");
    }
    return this;
};
Array.prototype.diff = function(arr) {
    if (!Array.isArray(arr)) return {
        old: [],
        added: [],
        removed: []
    };
    let old = this.filter((item)=>arr.includes(item));
    let added = arr.filter((item)=>!this.includes(item));
    let removed = this.filter((item)=>!arr.includes(item));
    return {
        old,
        added,
        removed
    };
};
Array.prototype.min = function() {
    if (this.length === 0) return undefined;
    let min = this[0];
    for(let i = 1; i < this.length; i++){
        if (this[i] < min) {
            min = this[i];
        }
    }
    return min;
};
Date.prototype.timestamp = function() {
    return Math.floor(this.getTime() / 1000);
};
Date.prototype.next = function(offsetStr = "0d") {
    const match = offsetStr.match(/^(\d+)([dwmy])$/i);
    if (!match) {
        throw new Error("Invalid format. Use format like '5d', '2w', '3m', or '1y'.");
    }
    const value = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();
    const newDate = new Date(this.getTime()); // clone current date
    switch(unit){
        case "d":
            newDate.setDate(newDate.getDate() + value);
            break;
        case "w":
            newDate.setDate(newDate.getDate() + value * 7);
            break;
        case "m":
            newDate.setMonth(newDate.getMonth() + value);
            break;
        case "y":
            newDate.setFullYear(newDate.getFullYear() + value);
            break;
        default:
            throw new Error("Unsupported time unit.");
    }
    return newDate;
};
Date.prototype.showDate = function(format = "dd-mmm-yyyy", locale = "default") {
    const options = {
        day: "2-digit",
        month: format.includes("mmmm") ? "long" : format.includes("mmm") ? "short" : "2-digit",
        year: format.includes("yyyy") ? "numeric" : "2-digit"
    };
    try {
        const parts = new Intl.DateTimeFormat(locale, options).formatToParts(this);
        const map = {};
        parts.forEach((p)=>{
            if (p.type !== "literal") map[p.type] = p.value;
        });
        const day = map.day;
        const year = map.year;
        const month = map.month;
        return format.replace(/dd/, day).replace(/mmmm/, month) // full month
        .replace(/mmm/, month) // short month
        .replace(/mm/, this.getMonth() + 1 < 10 ? "0" + (this.getMonth() + 1) : this.getMonth() + 1).replace(/yyyy/, year).replace(/yy/, year.slice(-2));
    } catch (error) {
        return "";
    }
};
Date.prototype.toDate = function() {
    return this;
};
Date.prototype.relativeTime = function() {
    const slabs = [
        0,
        60,
        3600,
        86400,
        604800,
        2592000,
        31536000
    ];
    const slabNames = [
        "just now",
        [
            "second",
            "seconds"
        ],
        [
            "minute",
            "minutes"
        ],
        [
            "hour",
            "hours"
        ],
        [
            "day",
            "days"
        ],
        [
            "week",
            "weeks"
        ],
        [
            "month",
            "months"
        ],
        [
            "year",
            "years"
        ]
    ];
    const now = new Date();
    const diffMs = now - this;
    const diffSeconds = Math.round(Math.abs(diffMs) / 1000);
    const myslab = slabs.indexOf(slabs.find((slab)=>slab > diffSeconds));
    const range = myslab > -1 ? [
        slabs[myslab - 1],
        slabs[myslab]
    ] : [
        slabs.at(-1)
    ];
    const value = range[0] === 0 ? diffSeconds : Math.floor(diffSeconds / range[0]);
    const units = slabNames.at(myslab);
    return `${value} ${value === 1 ? units[0] : units[1]}`;
};
Date.prototype.toFormat = function(format = "dd-mm-yyyy - hh:mm:ss", locale = "en-IN") {
    const fmt = format.toLowerCase();
    const options = {
        day: "2-digit",
        month: fmt.includes("mmmm") ? "long" : fmt.includes("mmm") ? "short" : "2-digit",
        year: fmt.includes("yyyy") ? "numeric" : "2-digit",
        hour: fmt.includes("hh") ? "2-digit" : undefined,
        minute: fmt.includes("mm") ? "2-digit" : undefined,
        second: fmt.includes("ss") ? "2-digit" : undefined
    };
    return new Intl.DateTimeFormat(locale, options).format(this);
};
Date.prototype.isoWeek = function() {
    let yearStart = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((this - yearStart) / (1000 * 60 * 60 * 24 * 7));
};
String.prototype.Capitalize = function() {
    let char1 = this.charAt(0).toUpperCase();
    let string = this;
    return string.replace(string[0], char1);
};
String.prototype.sluggify = function() {
    return this.trim() // Remove leading/trailing whitespace
    .toLowerCase() // Convert to lowercase for consistency
    .replace(/[^a-z0-9\s]/g, "-") // Replace special characters with dash
    .replace(/\s+/g, "-") // Replace whitespace sequences with dash
    .replace(/-+/g, "-") // Collapse multiple consecutive dashes
    .replace(/^-|-$/g, ""); // Remove leading/trailing dashes
};
Number.prototype.toMoney = function(currency = "INR", locale = "en-IN") {
    const format = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency
    }).format;
    return format(this);
};
Number.prototype.toPercent = function(locale = "en-IN") {
    const { format } = new Intl.NumberFormat(locale, {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        minimumIntegerDigits: 2
    });
    return format(this / 100);
};
Number.prototype.toTime = Number.prototype.toTimeElapsed = function() {
    let temp = this;
    let ms = temp % 1000;
    temp = (temp - ms) / 1000;
    let sec = temp % 60;
    temp = (temp - sec) / 60;
    let min = temp % 60;
    temp = (temp - min) / 60;
    let hr = temp;
    return `${hr}:${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}.${ms}`;
};
Array.prototype.avg = function() {
    let sum = 0;
    for(let i = 0; i < this.length; i++){
        sum += Number(this[i]);
    }
    return sum / this.length;
};
}),
"[project]/src/app/providers.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2d$nextjs$2f$esm$2f$v13$2d$appRouter$2f$appRouterV13$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AppRouterCacheProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material-nextjs/esm/v13-appRouter/appRouterV13.js [app-ssr] (ecmascript) <export default as AppRouterCacheProvider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$ThemeProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ThemeProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/styles/ThemeProvider.js [app-ssr] (ecmascript) <export default as ThemeProvider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$theme$2f$theme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/theme/theme.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/Context/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$member$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/Context/member.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$query$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/Context/query.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$telemetry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/Context/telemetry.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$componentsMHO$2f$LoadingOverlay$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/componentsMHO/LoadingOverlay.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$enhancements$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/enhancements.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$member$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MemberProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$telemetry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TelemetryProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$query$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QueryProvider"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2d$nextjs$2f$esm$2f$v13$2d$appRouter$2f$appRouterV13$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AppRouterCacheProvider$3e$__["AppRouterCacheProvider"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$ThemeProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ThemeProvider$3e$__["ThemeProvider"], {
                        theme: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$theme$2f$theme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/app/providers.js",
                        lineNumber: 19,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/providers.js",
                    lineNumber: 18,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/providers.js",
                lineNumber: 17,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/providers.js",
            lineNumber: 16,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/providers.js",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/PaginationButtons.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-ssr] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$ButtonGroup$2f$ButtonGroup$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ButtonGroup$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/ButtonGroup/ButtonGroup.js [app-ssr] (ecmascript) <export default as ButtonGroup>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Button/Button.js [app-ssr] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$KeyboardArrowLeft$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/KeyboardArrowLeft.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$KeyboardArrowRight$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/KeyboardArrowRight.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$KeyboardDoubleArrowLeft$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/KeyboardDoubleArrowLeft.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$KeyboardDoubleArrowRight$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/KeyboardDoubleArrowRight.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
// Custom pagination actions component
const PaginationButtons = ({ count, page, rowsPerPage, onPageChange })=>{
    const totalPages = Math.ceil(count / rowsPerPage) - 1;
    const handlePageClick = (newPage)=>{
        onPageChange(null, newPage);
    };
    const visiblePageNumbers = ()=>{
        const currentPage = page + 1;
        const totalVisible = 5; // Number of visible page buttons
        const pages = [];
        let start = Math.max(1, currentPage - Math.floor(totalVisible / 2));
        let end = Math.min(totalPages + 1, start + totalVisible - 1);
        if (end - start + 1 < totalVisible) {
            start = Math.max(1, end - totalVisible + 1);
        }
        for(let i = start; i <= end; i++){
            pages.push(i);
        }
        // if(!pages.includes(1))pages.unshift(1);
        // if(!pages.includes(totalPages))pages.push(totalPages)
        return pages;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            display: "flex",
            alignItems: "center",
            gap: 1
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                onClick: ()=>handlePageClick(0),
                disabled: page === 0,
                "aria-label": "first page",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$KeyboardDoubleArrowLeft$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/components/PaginationButtons.jsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/PaginationButtons.jsx",
                lineNumber: 45,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                onClick: ()=>handlePageClick(page - 1),
                disabled: page === 0,
                "aria-label": "previous page",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$KeyboardArrowLeft$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/components/PaginationButtons.jsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/PaginationButtons.jsx",
                lineNumber: 52,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$ButtonGroup$2f$ButtonGroup$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ButtonGroup$3e$__["ButtonGroup"], {
                variant: "text",
                children: visiblePageNumbers().map((pageNumber)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                        onClick: ()=>handlePageClick(pageNumber - 1),
                        disabled: page === pageNumber - 1,
                        sx: {
                            minWidth: 32,
                            fontWeight: page === pageNumber - 1 ? "bold" : "normal",
                            color: page === pageNumber - 1 ? "primary.main" : "inherit"
                        },
                        children: pageNumber
                    }, pageNumber, false, {
                        fileName: "[project]/src/components/PaginationButtons.jsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/components/PaginationButtons.jsx",
                lineNumber: 60,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                onClick: ()=>handlePageClick(page + 1),
                disabled: page >= totalPages,
                "aria-label": "next page",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$KeyboardArrowRight$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/components/PaginationButtons.jsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/PaginationButtons.jsx",
                lineNumber: 77,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                onClick: ()=>handlePageClick(totalPages),
                disabled: page >= totalPages,
                "aria-label": "last page",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$KeyboardDoubleArrowRight$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/components/PaginationButtons.jsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/PaginationButtons.jsx",
                lineNumber: 85,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/PaginationButtons.jsx",
        lineNumber: 44,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = PaginationButtons;
}),
"[project]/src/components/SectionTitle.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Grid/Grid.js [app-ssr] (ecmascript) <export default as Grid>");
;
;
function SectionTitle(attr) {
    const sectionHeaderStyle = {
        // fontFamily: "Times New Roman",
        // fontFamily: "Roboto, Arial, sans-serif",
        fontWeight: 600,
        fontSize: "18px",
        height: "45px",
        p: 2,
        color: attr.isDisabled && "grey",
        background: attr.isDisabled ? "#e4e5e6" : "linear-gradient(-45deg, rgb(191, 226, 247), #e4e5e6, rgb(191, 226, 247))",
        backgroundSize: "150% 150%",
        animation: "gradientShift 12s ease infinite",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
          @keyframes gradientShift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `
            }, void 0, false, {
                fileName: "[project]/src/components/SectionTitle.jsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                size: 12,
                sx: {
                    ...sectionHeaderStyle,
                    ...attr.sx,
                    display: "flex",
                    alignItems: "center"
                },
                children: [
                    attr.title,
                    attr.children
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SectionTitle.jsx",
                lineNumber: 38,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
const __TURBOPACK__default__export__ = SectionTitle;
}),
"[project]/src/components/PageTitle.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-ssr] (ecmascript) <export * as Page>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Grid/Grid.js [app-ssr] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ArrowBack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/ArrowBack.js [app-ssr] (ecmascript)");
;
;
;
;
function PageTitle({ onBack, title = "", actions = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {}, void 0, false), sx }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
        size: 12,
        container: true,
        spacing: {
            xs: 1,
            md: 0
        },
        sx: {
            px: {
                xs: 0.5,
                md: 3.2
            },
            pb: 1,
            alignItems: "center",
            ...sx
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                container: true,
                size: {
                    xs: 6,
                    md: 2
                },
                sx: {
                    alignItems: "center"
                },
                order: 1,
                children: onBack && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].MuiButton, {
                    "aria-label": "Back Button",
                    startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ArrowBack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            fontSize: "18px !important"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/PageTitle.jsx",
                        lineNumber: 23,
                        columnNumber: 15
                    }, void 0),
                    sx: {
                        bgcolor: "whitesmoke",
                        color: "black",
                        borderRadius: 2,
                        border: "1px solid #c8c8c8ff",
                        px: 2,
                        height: "32px",
                        "&:hover": {
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)"
                        }
                    },
                    onClick: onBack,
                    children: "Back"
                }, void 0, false, {
                    fileName: "[project]/src/components/PageTitle.jsx",
                    lineNumber: 20,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/PageTitle.jsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                size: {
                    xs: 12,
                    md: 7
                },
                order: {
                    xs: 3,
                    md: 2
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                    sx: {
                        textAlign: "center",
                        fontSize: {
                            xs: 16,
                            xl: 22
                        },
                        fontWeight: "bold"
                    },
                    children: title
                }, void 0, false, {
                    fileName: "[project]/src/components/PageTitle.jsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/PageTitle.jsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                size: {
                    xs: 12,
                    md: 3
                },
                sx: {
                    display: "flex",
                    justifyContent: "flex-end"
                },
                order: {
                    xs: 2,
                    md: 3
                },
                children: actions
            }, void 0, false, {
                fileName: "[project]/src/components/PageTitle.jsx",
                lineNumber: 59,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/PageTitle.jsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = PageTitle;
}),
"[project]/src/components/Toast.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PositionedSnackbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Snackbar$2f$Snackbar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Snackbar/Snackbar.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Alert/Alert.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function PositionedSnackbar() {
    const [status, setStatus] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]("info");
    const [message, setMessage] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]();
    const [state, setState] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]({
        open: false,
        vertical: "bottom",
        horizontal: "right"
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        const handleToast = (e)=>{
            const { detail } = e;
            setStatus(detail?.status ?? "info");
            setMessage(detail?.message ?? "");
            setState((prev)=>({
                    ...prev,
                    open: true
                }));
        };
        document.addEventListener("toast", handleToast);
        return ()=>{
            document.removeEventListener("toast", handleToast);
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        sx: {
            width: 500,
            zIndex: 99999
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Snackbar$2f$Snackbar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            anchorOrigin: {
                ...state
            },
            open: state.open,
            sx: {
                zIndex: 99999
            },
            autoHideDuration: 2000,
            onClose: (e, reason)=>{
                if (reason === "clickaway") return;
                setState({
                    ...state,
                    open: false
                });
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    zIndex: 99999,
                    fontWeight: 600
                },
                severity: status,
                children: message
            }, void 0, false, {
                fileName: "[project]/src/components/Toast.jsx",
                lineNumber: 43,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/Toast.jsx",
            lineNumber: 33,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Toast.jsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/FlagAndCountryCode.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FlagAndCountryCode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
function FlagAndCountryCode({ cn }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flagged-code",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: `/images/flags/${cn.toLowerCase()}.svg`,
                    alt: `${cn} flag`
                }, void 0, false, {
                    fileName: "[project]/src/components/FlagAndCountryCode.jsx",
                    lineNumber: 7,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        display: "flex",
                        alignItems: "center"
                    },
                    children: cn
                }, void 0, false, {
                    fileName: "[project]/src/components/FlagAndCountryCode.jsx",
                    lineNumber: 8,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/FlagAndCountryCode.jsx",
            lineNumber: 6,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/FlagAndCountryCode.jsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/SelectedActions.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SelectedActions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Grid/Grid.js [app-ssr] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__ = __turbopack_context__.i("[project]/src/util/api.js [app-ssr] (ecmascript) <export default as api>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-ssr] (ecmascript) <export * as Page>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
;
;
function SelectedActions({ selected, actions, reloadData, onLoadingStatusChange, endpoint, ...attr }) {
    async function bulkUpdate(data) {
        if (!!onLoadingStatusChange) onLoadingStatusChange({
            isVisible: true,
            current: 0
        });
        for(let index = 0; index < selected.length; index++){
            const element = selected[index];
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__["api"].put(`${endpoint}${element}`, data);
                if (!!onLoadingStatusChange) onLoadingStatusChange({
                    isVisible: true,
                    current: index + 1
                });
            } catch (err) {
                if (!!onLoadingStatusChange) onLoadingStatusChange({
                    isVisible: false,
                    current: 0
                });
                console.error(`Error activating element ${element}:`, err);
            }
        }
        if (!!onLoadingStatusChange) onLoadingStatusChange({
            isVisible: false,
            current: selected.length
        });
        reloadData();
    }
    const actionHandlers = {
        activate: {
            label: "Activate",
            bgcolor: "#2a7a2a",
            onClick: async ()=>{
                await bulkUpdate({
                    isActive: true
                });
            }
        },
        deactivate: {
            label: "Deactivate",
            bgcolor: "#a12a2a",
            onClick: async ()=>{
                await bulkUpdate({
                    isActive: false
                });
            }
        },
        addFavourite: {
            label: "Add to Favourites",
            bgcolor: "#b68a24",
            onClick: async ()=>{
                await bulkUpdate({
                    sortOrder: 1
                });
            }
        },
        removeFavourite: {
            label: "Remove from Favourites",
            color: "black",
            bgcolor: "#ffce31",
            onClick: async ()=>{
                await bulkUpdate({
                    sortOrder: 0
                });
            }
        },
        delete: {
            label: "Delete",
            bgcolor: "#d12727ff",
            onClick: async ()=>{
                if (attr.onDelete) await attr.onDelete(selected);
                else await bulkUpdate({
                    isDeleted: true
                });
            }
        },
        holdAll: {
            label: "Hold All Projects",
            bgcolor: "#b68a24",
            onClick: async ()=>{
                await bulkUpdate({
                    status: "hold"
                });
            }
        },
        goLive: {
            label: "Switch to Live",
            bgcolor: "#2a7a2a",
            onClick: async ()=>{
                await bulkUpdate({
                    status: "live"
                });
            }
        },
        archive: {
            label: "Archive",
            bgcolor: "#a12a2a",
            onClick: async ()=>{
                await bulkUpdate({
                    isActive: "false"
                });
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
        container: true,
        gap: 1,
        sx: {
            ml: 2,
            pb: 1
        },
        children: actions.map((action)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].MuiButton, {
                sx: {
                    height: "26px",
                    fontSize: "12px",
                    color: actionHandlers[action].color || "white",
                    bgcolor: actionHandlers[action].bgcolor || "primary.main",
                    "&:hover": {
                        boxShadow: 8
                    },
                    textShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
                    textTransform: "none"
                },
                variant: "contained",
                onClick: actionHandlers[action].onClick,
                children: actionHandlers[action].label
            }, action, false, {
                fileName: "[project]/src/components/SelectedActions.jsx",
                lineNumber: 109,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/SelectedActions.jsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/DownloadTable.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DownloadTable,
    "jsxToText",
    ()=>jsxToText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$enhancements$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/enhancements.js [app-ssr] (ecmascript)");
"use client";
;
;
function sluggify({ data }) {
    if (!data) return;
    return data.trim() // Remove leading/trailing whitespace
    .toLowerCase() // Convert to lowercase for consistency
    .replace(/[^a-z0-9\s]/g, "-") // Replace special characters with dash
    .replace(/\s+/g, "-") // Replace whitespace sequences with dash
    .replace(/-+/g, "-") // Collapse multiple consecutive dashes
    .replace(/^-|-$/g, ""); // Remove leading/trailing dashes
}
function jsxToText(value) {
    if (value === null || value === undefined) return "";
    if (typeof value === "string") {
        // Clean string of invisible Unicode characters
        return value.replace(/[\u200B-\u200D\uFEFF]/g, "") // Remove zero-width characters
        .replace(/ /g, " ") // Replace non-breaking space with regular space
        .trim();
    }
    if (typeof value === "number") return value.toString();
    if (typeof value === "boolean") return value.toString();
    if (/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isValidElement(value)) {
        try {
            const extractTextFromElement = (element)=>{
                if (typeof element === "string" || typeof element === "number") {
                    return element.toString();
                }
                if (/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isValidElement(element)) {
                    const { children } = element.props || {};
                    if (!children) return "";
                    if (typeof children === "string" || typeof children === "number") {
                        return children.toString();
                    }
                    if (Array.isArray(children)) {
                        return children.map(extractTextFromElement).join(" ");
                    }
                    return extractTextFromElement(children);
                }
                return "";
            };
            const textContent = extractTextFromElement(value);
            return textContent.replace(/[\u200B-\u200D\uFEFF]/g, "") // Remove zero-width characters
            .replace(/ /g, " ") // Replace non-breaking space with regular space
            .replace(/\s+/g, " ") // Replace multiple whitespace with single space
            .trim();
        } catch (error) {
            console.warn("Failed to convert JSX to text:", error);
            return "";
        }
    }
    // Handle arrays (in case of multiple JSX elements)
    if (Array.isArray(value)) {
        return value.map(jsxToText).filter(Boolean).join(" ");
    }
    // Handle objects with toString method
    if (typeof value === "object" && value.toString !== Object.prototype.toString) {
        return value.toString();
    }
    return "";
}
function DownloadTable({ info, title, replaceChars }) {
    if (!info || !info.length) return;
    if (!title) title = "Sampledge-Downloads";
    const csvRows = info.map((row)=>row.map((val)=>{
            const textValue = jsxToText(val);
            // Escape quotes and handle comma-containing values
            const escapedValue = textValue.replace(/"/g, '""');
            const finalValue = textValue.includes(",") || textValue.includes('"') || textValue.includes("\n") ? `"${escapedValue}"` : escapedValue;
            return finalValue.replace(replaceChars ?? /[\r\n]+/g, " ");
        }).join(",")).join("\n");
    // Create blob without BOM - let the browser handle encoding
    const blob = new Blob([
        csvRows
    ], {
        type: "text/csv;charset=utf-8;"
    });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${sluggify(title)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
}),
"[project]/src/components/RequiredLabel.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RequiredLabel",
    ()=>RequiredLabel,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
const RequiredLabel = ({ label })=>{
    return [
        null,
        undefined,
        ""
    ].includes(label) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {}, void 0, false) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            label,
            " ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    color: "red"
                },
                children: "*"
            }, void 0, false, {
                fileName: "[project]/src/components/RequiredLabel.jsx",
                lineNumber: 8,
                columnNumber: 15
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
const __TURBOPACK__default__export__ = RequiredLabel;
}),
"[project]/src/components/Form/Checkbox.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Checkbox/Checkbox.js [app-ssr] (ecmascript) <export default as Checkbox>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControlLabel$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/FormControlLabel/FormControlLabel.js [app-ssr] (ecmascript) <export default as FormControlLabel>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormHelperText$2f$FormHelperText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FormHelperText$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/FormHelperText/FormHelperText.js [app-ssr] (ecmascript) <export default as FormHelperText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-ssr] (ecmascript) <export * as Page>");
"use client";
;
;
;
;
;
function __TURBOPACK__default__export__({ control, name, label, validations, error, icon, size = "small", labelPlacement = "end", ...attr }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Controller"], {
        name: name,
        control: control,
        rules: validations,
        render: ({ field })=>{
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControlLabel$3e$__["FormControlLabel"], {
                        sx: attr.sx,
                        labelPlacement: labelPlacement,
                        label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                            sx: {
                                display: "flex",
                                alignItems: "center",
                                gap: 0.6
                            },
                            children: [
                                icon,
                                label
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Form/Checkbox.jsx",
                            lineNumber: 32,
                            columnNumber: 17
                        }, void 0),
                        control: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__["Checkbox"], {
                            ...field,
                            checked: !!field.value,
                            size: size,
                            color: "secondary"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Form/Checkbox.jsx",
                            lineNumber: 44,
                            columnNumber: 17
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Form/Checkbox.jsx",
                        lineNumber: 28,
                        columnNumber: 13
                    }, void 0),
                    !!error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormHelperText$2f$FormHelperText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FormHelperText$3e$__["FormHelperText"], {
                        sx: {
                            color: "error.main"
                        },
                        children: error.message
                    }, void 0, false, {
                        fileName: "[project]/src/components/Form/Checkbox.jsx",
                        lineNumber: 53,
                        columnNumber: 15
                    }, void 0)
                ]
            }, void 0, true);
        }
    }, void 0, false, {
        fileName: "[project]/src/components/Form/Checkbox.jsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/forms/RequiredLabel.jsx [app-ssr] (ecmascript) <export default as RequiredLabel>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RequiredLabel",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$RequiredLabel$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$RequiredLabel$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forms/RequiredLabel.jsx [app-ssr] (ecmascript)");
}),
"[project]/src/util/page/link.js [app-ssr] (ecmascript) <export default as Link>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Link",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/link.js [app-ssr] (ecmascript)");
}),
"[project]/src/components/Form/Input.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$index$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/forms/index.jsx [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$InputTextField$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__InputTextField$3e$__ = __turbopack_context__.i("[project]/src/components/forms/InputTextField.jsx [app-ssr] (ecmascript) <export default as InputTextField>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$RequiredLabel$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RequiredLabel$3e$__ = __turbopack_context__.i("[project]/src/components/forms/RequiredLabel.jsx [app-ssr] (ecmascript) <export default as RequiredLabel>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getOptions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/getOptions.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__ = __turbopack_context__.i("[project]/src/util/page/link.js [app-ssr] (ecmascript) <export default as Link>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputAdornment$2f$InputAdornment$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__InputAdornment$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/InputAdornment/InputAdornment.js [app-ssr] (ecmascript) <export default as InputAdornment>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Grid/Grid.js [app-ssr] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$InfoOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/InfoOutlined.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-ssr] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Tooltip/Tooltip.js [app-ssr] (ecmascript) <export default as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LinearProgress$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/LinearProgress/LinearProgress.js [app-ssr] (ecmascript) <export default as LinearProgress>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Zoom$2f$Zoom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Zoom/Zoom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Visibility$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Visibility.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$VisibilityOff$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/VisibilityOff.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$checkPasswordStrength$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/checkPasswordStrength.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-ssr] (ecmascript) <export * as Page>");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function ParseErrorMessage({ error }) {
    try {
        let err = JSON.parse(error);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                err.message,
                err.link && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__["Link"], {
                    href: err.link.target,
                    children: err.link.text
                }, void 0, false, {
                    fileName: "[project]/src/components/Form/Input.jsx",
                    lineNumber: 22,
                    columnNumber: 22
                }, this)
            ]
        }, void 0, true);
    } catch (e) {
        return error;
    }
}
function PasswordStrengthMeter({ passwordStrength, showStrength }) {
    if (!showStrength || passwordStrength.score === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
        sx: {
            mt: 1,
            mb: 1
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LinearProgress$3e$__["LinearProgress"], {
                variant: "determinate",
                value: passwordStrength.score * 20,
                sx: {
                    height: 4,
                    borderRadius: 2,
                    "& .MuiLinearProgress-barColorPrimary": {
                        backgroundColor: passwordStrength.color === "success" ? "#4caf50" : passwordStrength.color === "warning" ? "#ff9800" : passwordStrength.color === "error" ? "#f44336" : "#9e9e9e"
                    }
                }
            }, void 0, false, {
                fileName: "[project]/src/components/Form/Input.jsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                sx: {
                    fontSize: "12px",
                    mt: 0.5,
                    display: "flex",
                    justifyContent: "space-between"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: passwordStrength.color,
                            fontWeight: 500
                        },
                        children: passwordStrength.strength
                    }, void 0, false, {
                        fileName: "[project]/src/components/Form/Input.jsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: "#757575",
                            fontSize: "11px"
                        },
                        children: [
                            passwordStrength.score,
                            "/5"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Form/Input.jsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Form/Input.jsx",
                lineNumber: 53,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Form/Input.jsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
function Input({ prefix, compSize, suffix, control, errors, name, label, labelText, surveyLabel, required = false, sx, validations, parent, watch, api, showLabel = true, type, strengthMeter, match, onStrengthChanged, ...props }) {
    const [hide, setHide] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [validate, setValidate] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(validations);
    const [masked, setMasked] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(true);
    const [password, setPassword] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState("");
    const [showStrength, setShowStrength] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [passwordStrength, setPasswordStrength] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState({
        score: 0,
        color: "",
        strength: ""
    });
    let pValue;
    if (parent) {
        pValue = watch(parent);
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (!parent) return;
        if (!pValue || pValue === "") return setHide(true);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getOptions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(api, pValue, (e)=>{
            return e.pattern;
        }).then((r)=>{
            if (r?.length === 1 && r[0] !== "") {
                const pattern = {
                    value: new RegExp(`^${atob(r[0])}$`),
                    message: `Invalid ${label}`
                };
                setValidate({
                    ...validate,
                    pattern
                });
            } else {
                setHide(true);
            }
        });
        setHide(false);
    }, [
        pValue
    ]);
    // Password strength logic
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (!strengthMeter || type !== "password") return;
        setShowStrength(true);
    }, [
        strengthMeter,
        type
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (!showStrength) return;
        const strength = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$checkPasswordStrength$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(password);
        setPasswordStrength(strength);
        onStrengthChanged && onStrengthChanged(strength);
    }, [
        password,
        showStrength
    ]);
    let temp = {};
    if (suffix && suffix !== "") temp.endAdornment = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputAdornment$2f$InputAdornment$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__InputAdornment$3e$__["InputAdornment"], {
        position: "end",
        children: suffix
    }, void 0, false, {
        fileName: "[project]/src/components/Form/Input.jsx",
        lineNumber: 146,
        columnNumber: 7
    }, this);
    if (prefix && prefix !== "") temp.startAdornment = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputAdornment$2f$InputAdornment$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__InputAdornment$3e$__["InputAdornment"], {
        position: "start",
        children: prefix
    }, void 0, false, {
        fileName: "[project]/src/components/Form/Input.jsx",
        lineNumber: 150,
        columnNumber: 7
    }, this);
    // Add visibility toggle for password fields
    if (type === "password" && !props.InputProps?.endAdornment) {
        temp.endAdornment = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputAdornment$2f$InputAdornment$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__InputAdornment$3e$__["InputAdornment"], {
            position: "end",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                    onClick: ()=>setMasked(!masked),
                    sx: {
                        height: "32px",
                        width: "32px",
                        p: 0,
                        "&:hover": {
                            boxShadow: "none"
                        }
                    },
                    children: masked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$VisibilityOff$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        fontSize: "small"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Form/Input.jsx",
                        lineNumber: 169,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Visibility$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        fontSize: "small"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Form/Input.jsx",
                        lineNumber: 171,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Form/Input.jsx",
                    lineNumber: 157,
                    columnNumber: 9
                }, this),
                temp.endAdornment
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Form/Input.jsx",
            lineNumber: 156,
            columnNumber: 7
        }, this);
    }
    props["InputProps"] = {
        ...temp
    };
    if (hide) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {}, void 0, false);
    /* <Grid
          size={ { xs: 12, md: Number(question?.size) } }
          alignSelf="flex-end"
          sx={ { textAlign: "center", px: 2, py: 1 } }
        ></Grid> */ return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
        size: {
            xs: 12,
            md: Number(compSize ?? 12)
        },
        alignSelf: "flex-end",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Controller"], {
            name: name,
            control: control,
            rules: validate,
            render: ({ field })=>{
                const hasError = !!errors;
                const errorMessage = errors?.message;
                const isPasswordField = type === "password";
                let inputProps = {
                    ...props.InputProps || {}
                };
                // Handle password visibility toggle
                if (isPasswordField) {
                    inputProps.endAdornment = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            inputProps.endAdornment,
                            hasError && errorMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                title: ParseErrorMessage({
                                    error: errorMessage
                                }),
                                arrow: true,
                                placement: "top-end",
                                slots: {
                                    transition: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Zoom$2f$Zoom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
                                },
                                slotProps: {
                                    transition: {
                                        timeout: 200
                                    }
                                },
                                PopperProps: {
                                    disablePortal: true,
                                    sx: {
                                        zIndex: 7600
                                    }
                                },
                                componentsProps: {
                                    tooltip: {
                                        sx: {
                                            zIndex: 7600,
                                            bgcolor: "#fff8f8",
                                            color: "#d32f2f",
                                            border: "1.5px solid #d32f2f",
                                            fontSize: "12px",
                                            px: 1,
                                            py: 0.75,
                                            borderRadius: 1,
                                            boxShadow: 2
                                        }
                                    },
                                    arrow: {
                                        sx: {
                                            color: "#fff8f8",
                                            filter: "drop-shadow(0 0 1.5px #d32f2f)"
                                        }
                                    }
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                    size: "small",
                                    "aria-label": "error info",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$InfoOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        color: "error",
                                        fontSize: "small"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Form/Input.jsx",
                                        lineNumber: 246,
                                        columnNumber: 23
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Form/Input.jsx",
                                    lineNumber: 245,
                                    columnNumber: 21
                                }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Form/Input.jsx",
                                lineNumber: 209,
                                columnNumber: 19
                            }, void 0)
                        ]
                    }, void 0, true);
                } else {
                    inputProps.endAdornment = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            inputProps.endAdornment,
                            hasError && errorMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                title: ParseErrorMessage({
                                    error: errorMessage
                                }),
                                arrow: true,
                                placement: "top-end",
                                slots: {
                                    transition: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Zoom$2f$Zoom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
                                },
                                slotProps: {
                                    transition: {
                                        timeout: 200
                                    }
                                },
                                PopperProps: {
                                    disablePortal: true,
                                    sx: {
                                        zIndex: 7600
                                    }
                                },
                                componentsProps: {
                                    tooltip: {
                                        sx: {
                                            zIndex: 7600,
                                            bgcolor: "#fff8f8",
                                            color: "#d32f2f",
                                            border: "1.5px solid #d32f2f",
                                            fontSize: "12px",
                                            px: 1,
                                            py: 0.75,
                                            borderRadius: 1,
                                            boxShadow: 2
                                        }
                                    },
                                    arrow: {
                                        sx: {
                                            color: "#fff8f8",
                                            filter: "drop-shadow(0 0 1.5px #d32f2f)"
                                        }
                                    }
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                    size: "small",
                                    "aria-label": "error info",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$InfoOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        color: "error",
                                        fontSize: "small"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Form/Input.jsx",
                                        lineNumber: 294,
                                        columnNumber: 23
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Form/Input.jsx",
                                    lineNumber: 293,
                                    columnNumber: 21
                                }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Form/Input.jsx",
                                lineNumber: 257,
                                columnNumber: 19
                            }, void 0)
                        ]
                    }, void 0, true);
                }
                if (prefix && prefix !== "") {
                    inputProps.startAdornment = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputAdornment$2f$InputAdornment$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__InputAdornment$3e$__["InputAdornment"], {
                        position: "start",
                        children: prefix
                    }, void 0, false, {
                        fileName: "[project]/src/components/Form/Input.jsx",
                        lineNumber: 304,
                        columnNumber: 15
                    }, void 0);
                }
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        surveyLabel,
                        labelText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                            sx: {
                                fontWeight: 500,
                                color: "#555"
                            },
                            children: [
                                labelText,
                                " ",
                                required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: "red",
                                        fontWeight: 600
                                    },
                                    children: "*"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Form/Input.jsx",
                                    lineNumber: 315,
                                    columnNumber: 21
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Form/Input.jsx",
                            lineNumber: 312,
                            columnNumber: 17
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$InputTextField$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__InputTextField$3e$__["InputTextField"], {
                            ...props,
                            ...field,
                            value: field.value ?? "",
                            type: type === "password" ? masked ? "password" : "text" : type,
                            label: label === undefined ? undefined : validate?.required ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$RequiredLabel$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RequiredLabel$3e$__["RequiredLabel"], {
                                label: label
                            }, void 0, false, {
                                fileName: "[project]/src/components/Form/Input.jsx",
                                lineNumber: 328,
                                columnNumber: 21
                            }, void 0) : label,
                            fullWidth: true,
                            sx: {
                                ...sx,
                                "& .MuiInputAdornment-root": {
                                    opacity: 0.7
                                }
                            },
                            error: hasError,
                            InputProps: inputProps,
                            onChange: (e)=>{
                                field.onChange(e);
                                // Update password state for strength meter
                                if (isPasswordField) {
                                    setPassword(e.target.value);
                                }
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/Form/Input.jsx",
                            lineNumber: 319,
                            columnNumber: 15
                        }, void 0),
                        isPasswordField && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PasswordStrengthMeter, {
                            passwordStrength: passwordStrength,
                            showStrength: showStrength
                        }, void 0, false, {
                            fileName: "[project]/src/components/Form/Input.jsx",
                            lineNumber: 351,
                            columnNumber: 17
                        }, void 0)
                    ]
                }, void 0, true);
            }
        }, void 0, false, {
            fileName: "[project]/src/components/Form/Input.jsx",
            lineNumber: 192,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Form/Input.jsx",
        lineNumber: 187,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/Form/Phone.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Phone
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$phone$2d$input$2d$2$2f$lib$2f$lib$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-phone-input-2/lib/lib.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$libphonenumber$2d$js$2f$min$2f$exports$2f$parsePhoneNumberWithError$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__parsePhoneNumberWithError__as__parsePhoneNumber$3e$__ = __turbopack_context__.i("[project]/node_modules/libphonenumber-js/min/exports/parsePhoneNumberWithError.js [app-ssr] (ecmascript) <export parsePhoneNumberWithError as parsePhoneNumber>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-ssr] (ecmascript) <export * as Page>");
"use client";
;
;
;
;
;
;
;
function Phone({ control, errors, name, label, labelText, required, validations, onlyCountries, disableDropdown, disabled = false, selectedCountry }) {
    const [defaultCountry, setDefaultCountry] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState();
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (onlyCountries && onlyCountries.length > 0) setDefaultCountry(onlyCountries[0]);
    }, [
        onlyCountries
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (selectedCountry) setDefaultCountry(selectedCountry);
    }, [
        selectedCountry
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            labelText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                sx: {
                    fontWeight: 500,
                    color: "#555"
                },
                children: [
                    labelText,
                    required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: "red",
                            fontWeight: 600
                        },
                        children: "*"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Form/Phone.jsx",
                        lineNumber: 35,
                        columnNumber: 24
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Form/Phone.jsx",
                lineNumber: 33,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Controller"], {
                name: name,
                control: control,
                rules: disabled ? {} : {
                    ...validations,
                    validate: (val)=>{
                        if (!val || val.trim() === "") return "Required"; // allow blank
                        try {
                            const parsedPhone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$libphonenumber$2d$js$2f$min$2f$exports$2f$parsePhoneNumberWithError$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__parsePhoneNumberWithError__as__parsePhoneNumber$3e$__["parsePhoneNumber"])("+" + val);
                            return parsedPhone.isValid() || "Invalid phone number";
                        } catch (err) {
                            return "Invalid phone number";
                        }
                    }
                },
                render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$phone$2d$input$2d$2$2f$lib$2f$lib$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        country: defaultCountry,
                        onlyCountries: onlyCountries,
                        disableDropdown: disabled || disableDropdown,
                        disabled: disabled,
                        value: field.value,
                        onChange: (value)=>field.onChange(value),
                        countryCodeEditable: !Boolean(selectedCountry),
                        inputProps: {
                            name: name,
                            autoFocus: false,
                            disabled: disabled
                        },
                        inputStyle: {
                            width: "100%",
                            height: "34px",
                            color: "grey",
                            fontSize: "14px",
                            borderColor: errors?.message ? "red" : " #0000003b"
                        },
                        inputClass: "custom-phone-font",
                        specialLabel: ""
                    }, void 0, false, {
                        fileName: "[project]/src/components/Form/Phone.jsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, void 0)
            }, void 0, false, {
                fileName: "[project]/src/components/Form/Phone.jsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            errors && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                style: {
                    color: "red"
                },
                children: errors.message
            }, void 0, false, {
                fileName: "[project]/src/components/Form/Phone.jsx",
                lineNumber: 84,
                columnNumber: 18
            }, this)
        ]
    }, void 0, true);
} /*
"use client";
import React from "react";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { parsePhoneNumber, isValidPhoneNumber } from "libphonenumber-js"
import "react-phone-input-2/lib/material.css";

export default function Phone({ control, errors, name, label, validations }) {
  const [defaultCountry, setDefaultCountry] = React.useState("in");

  return (
    <>
      <Controller
        name={ name }
        control={ control }
        rules={ {
          ...validations, validate: (val) => {
            if (!val || val.trim() === '') return;
            const parsedPhone = parsePhoneNumber("+"+val);
            return parsedPhone.isValid ?? "Invalid Phone number"
          }
        } }
        render={ ({ field }) => (
          <><PhoneInput
            country={ defaultCountry }
            value={ field.value }
            specialLabel={ label }
            onChange={ (value) => field.onChange(value) }
            inputProps={ {
              name: { name },
              height: "34px",
              autoFocus: false,
            } }
            inputStyle={ {
              width: "100%",
              height: "34px",
              color: "grey",
              fontSize: "14px",
            } }
            inputClass="custom-phone-font"
          />
          
          </>
        ) }
      />
    </>
  );
}
//*/ 
}),
"[project]/src/components/Form/Date.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DateField
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dayjs/dayjs.min.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$x$2d$date$2d$pickers$2f$esm$2f$LocalizationProvider$2f$LocalizationProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/x-date-pickers/esm/LocalizationProvider/LocalizationProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$x$2d$date$2d$pickers$2f$esm$2f$AdapterDayjs$2f$AdapterDayjs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/x-date-pickers/esm/AdapterDayjs/AdapterDayjs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$x$2d$date$2d$pickers$2f$esm$2f$DatePicker$2f$DatePicker$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/x-date-pickers/esm/DatePicker/DatePicker.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-ssr] (ecmascript) <export * as Page>");
"use client";
;
;
;
;
;
;
;
;
const RequiredLabel = ({ label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            label,
            " ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    color: "red"
                },
                children: "*"
            }, void 0, false, {
                fileName: "[project]/src/components/Form/Date.jsx",
                lineNumber: 12,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
function DateField({ control, errors, name, label, labelText, required = false, parent, watch, validations, disabled, dateRange = [
    null,
    null
] }) {
    const [validate, setValidate] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](validations);
    const [minDate, setMinDate] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](new Date().toString());
    const [maxDate, setMaxDate] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](null);
    let pValue;
    if (parent) {
        pValue = watch(parent);
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (!parent) return;
        if (!pValue || pValue === "") return setHide(true);
        setMinDate(pValue);
    }, [
        pValue
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (!dateRange || !(dateRange instanceof Array)) return;
        if (!!dateRange[0]) setMinDate(dateRange[0]);
        if (!!dateRange[1]) setMaxDate(dateRange[1]);
    }, [
        dateRange
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$x$2d$date$2d$pickers$2f$esm$2f$LocalizationProvider$2f$LocalizationProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LocalizationProvider"], {
        dateAdapter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$x$2d$date$2d$pickers$2f$esm$2f$AdapterDayjs$2f$AdapterDayjs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdapterDayjs"],
        children: [
            labelText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                sx: {
                    fontWeight: 500,
                    color: "#555"
                },
                children: [
                    labelText,
                    " ",
                    required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: "red",
                            fontWeight: 600
                        },
                        children: "*"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Form/Date.jsx",
                        lineNumber: 53,
                        columnNumber: 24
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Form/Date.jsx",
                lineNumber: 51,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Controller"], {
                name: name,
                control: control,
                rules: disabled ? {} : validate,
                render: ({ field })=>{
                    const handleBlur = (event)=>{
                        field.onBlur();
                        const day = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(field.value);
                        if (field.value && day.isValid() && !day.isBefore((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(minDate)) && (!maxDate || !day.isAfter((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(maxDate)))) {} else {
                            field.onChange(null);
                        }
                    };
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$x$2d$date$2d$pickers$2f$esm$2f$DatePicker$2f$DatePicker$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DatePicker"], {
                        ...field,
                        disabled: disabled,
                        value: field.value ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(field.value) : null,
                        label: label && validate?.required ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RequiredLabel, {
                            label: label
                        }, void 0, false, {
                            fileName: "[project]/src/components/Form/Date.jsx",
                            lineNumber: 81,
                            columnNumber: 19
                        }, void 0) : label,
                        minDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(minDate),
                        maxDate: maxDate ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(maxDate) : undefined,
                        slotProps: {
                            popper: {
                                disablePortal: true,
                                sx: {
                                    zIndex: 9999
                                }
                            },
                            day: {
                                sx: {
                                    "&.Mui-selected": {
                                        color: "white"
                                    }
                                }
                            },
                            yearButton: {
                                sx: {
                                    "&.Mui-selected": {
                                        color: "white"
                                    }
                                }
                            },
                            textField: {
                                placeholder: "date",
                                size: "small",
                                fullWidth: true,
                                error: !!errors,
                                helperText: errors?.message,
                                onBlur: handleBlur,
                                sx: {
                                    backgroundColor: "white",
                                    "& .MuiInputBase-input": {
                                        backgroundColor: "white"
                                    },
                                    "& .MuiFormHelperText-root": {
                                        fontWeight: "bold"
                                    }
                                }
                            }
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/Form/Date.jsx",
                        lineNumber: 75,
                        columnNumber: 13
                    }, void 0);
                }
            }, void 0, false, {
                fileName: "[project]/src/components/Form/Date.jsx",
                lineNumber: 56,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Form/Date.jsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/util/getOptions.js [app-ssr] (ecmascript) <export default as getOptions>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getOptions",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getOptions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getOptions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/getOptions.js [app-ssr] (ecmascript)");
}),
"[project]/src/components/Form/Select.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Select
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$index$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/forms/index.jsx [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$InputTextField$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__InputTextField$3e$__ = __turbopack_context__.i("[project]/src/components/forms/InputTextField.jsx [app-ssr] (ecmascript) <export default as InputTextField>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$RequiredLabel$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RequiredLabel$3e$__ = __turbopack_context__.i("[project]/src/components/forms/RequiredLabel.jsx [app-ssr] (ecmascript) <export default as RequiredLabel>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-ssr] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Tooltip/Tooltip.js [app-ssr] (ecmascript) <export default as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Popper$2f$Popper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Popper$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Popper/Popper.js [app-ssr] (ecmascript) <export default as Popper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Paper/Paper.js [app-ssr] (ecmascript) <export default as Paper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Autocomplete$2f$Autocomplete$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Autocomplete$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Autocomplete/Autocomplete.js [app-ssr] (ecmascript) <locals> <export default as Autocomplete>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Chip/Chip.js [app-ssr] (ecmascript) <export default as Chip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Zoom$2f$Zoom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Zoom/Zoom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$InfoOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/InfoOutlined.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Cancel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Cancel.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Add$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Add.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-ssr] (ecmascript) <export * as Page>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getOptions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__getOptions$3e$__ = __turbopack_context__.i("[project]/src/util/getOptions.js [app-ssr] (ecmascript) <export default as getOptions>");
"use client";
;
;
;
;
;
;
;
;
;
;
;
function Select({ name, errors, control, options, api, parent, label, labelText, required = false, watch, validations, multiple, noOptions: noOptionsMessage, pValue: parentDefault, populate, onChange, isDisabled = false, onKeyUp, sx, showSelect = false, showLabel = true, showSelectAllBtn = true, addOptions, ...attr }) {
    const [newOption, setNewOption] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState("");
    const [isOpen, setIsOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [isPopperOpen, setIsPopperOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [hide, setHide] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [optionList, setOptionList] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(options);
    const [noOptions, setNoOptions] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(noOptionsMessage);
    const [validate, setValidate] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(validations);
    const hasError = !!errors;
    const errorMessage = errors?.message;
    const autocompleteRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    let pValue = parentDefault ?? "";
    if (api) {
        if (parent instanceof Array) {
            let parentVal = [];
            for(let index = 0; index < parent.length; index++){
                parentVal[index] = watch(parent[index]);
            }
            pValue = parentVal.reduce((a, c)=>{
                if (!c) return a;
                if (a === "") return c;
                return `${a.toLowerCase()}-${c}`;
            }, "");
        } else if (parent) {
            pValue = watch(parent);
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
            if (pValue && pValue != "") setNoOptions("Please wait...");
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getOptions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__getOptions$3e$__["getOptions"])(api, pValue, populate).then((opts)=>{
                if (!opts || opts.length === 0) return setHide(true);
                setOptionList(opts);
                setHide(false);
            }).catch((e)=>{
                setNoOptions(undefined);
            }).finally(()=>{
                if (pValue && pValue != "") setNoOptions(addOptions ? `Add ${label}` : `No ${label} available`);
            });
        }, [
            pValue
        ]);
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (api && api !== "") return;
        if (options) {
            setOptionList(options);
        }
    }, [
        options
    ]);
    const formattedOptions = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useMemo(()=>{
        return (optionList || []).map((opt)=>({
                ...opt,
                label: opt.label?.replace(/(^\p{L}|\s\p{L})/gu, (char)=>char.toLocaleUpperCase("en"))
            }));
    }, [
        optionList
    ]);
    if (hide && !showSelect) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {}, void 0, false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            formattedOptions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Controller"], {
                name: name,
                control: control,
                rules: validate,
                render: ({ field })=>{
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                        position: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                                display: "flex",
                                justifyContent: "flex-end",
                                children: isOpen && formattedOptions.length > 1 && multiple && showSelectAllBtn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].MuiButton, {
                                    variant: "contained",
                                    color: "secondary",
                                    onMouseDown: (event)=>{
                                        event.preventDefault();
                                        field.onChange(formattedOptions.map((val)=>val.value));
                                    },
                                    sx: {
                                        position: "absolute",
                                        fontSize: "13px",
                                        px: 1,
                                        py: 0,
                                        top: "-27px",
                                        zIndex: 99999,
                                        textTransform: "none"
                                    },
                                    children: "Select All"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Form/Select.jsx",
                                    lineNumber: 124,
                                    columnNumber: 23
                                }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Form/Select.jsx",
                                lineNumber: 119,
                                columnNumber: 17
                            }, void 0),
                            labelText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                                sx: {
                                    fontWeight: 500,
                                    color: "#555"
                                },
                                children: [
                                    labelText,
                                    " ",
                                    required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: "red",
                                            fontWeight: 600
                                        },
                                        children: "*"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Form/Select.jsx",
                                        lineNumber: 168,
                                        columnNumber: 23
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Form/Select.jsx",
                                lineNumber: 165,
                                columnNumber: 19
                            }, void 0),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Autocomplete$2f$Autocomplete$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Autocomplete$3e$__["Autocomplete"], {
                                fullWidth: true,
                                disabled: isDisabled,
                                size: "small",
                                ref: autocompleteRef,
                                slotProps: {
                                    popper: {
                                        modifiers: [
                                            {
                                                name: "zIndex",
                                                enabled: true,
                                                phase: "write",
                                                fn: ({ state })=>{
                                                    state.styles.popper.zIndex = 15000;
                                                }
                                            }
                                        ]
                                    },
                                    paper: {
                                        sx: {
                                            maxHeight: "unset",
                                            overflow: "unset",
                                            "& .MuiAutocomplete-listbox": {
                                                maxHeight: "300px",
                                                overflowY: "auto"
                                            },
                                            "& .MuiAutocomplete-option": {
                                                '&[aria-selected="true"]': {
                                                    backgroundColor: "#c1e3ff !important"
                                                }
                                            }
                                        }
                                    }
                                },
                                multiple: !formattedOptions || formattedOptions.length === 0 ? undefined : !!multiple,
                                disableCloseOnSelect: !!multiple,
                                disableClearable: !multiple || hasError,
                                options: formattedOptions ?? [],
                                open: showSelectAllBtn || addOptions ? isOpen : undefined,
                                getOptionLabel: (option)=>option.label || "",
                                value: multiple ? Array.isArray(field.value) ? field.value.map((val)=>formattedOptions.find((opt)=>opt.value === val)).filter(Boolean) : [] : !Array.isArray(field.value) ? formattedOptions?.find((opt)=>opt.value === field.value) || null : null,
                                noOptionsText: !noOptions ? "Not Applicable" : noOptions,
                                onChange: (event, newValue)=>{
                                    if (onChange) {
                                        onChange(event, newValue);
                                    }
                                    if (multiple) {
                                        field.onChange(newValue.map((val)=>val.value));
                                        return;
                                    }
                                    field.onChange(newValue === null ? "" : newValue.value);
                                    setIsOpen(false);
                                },
                                filterOptions: (options, { inputValue: searchTerm })=>{
                                    let val = options.find((opt)=>opt.value.toLowerCase() === searchTerm.toLowerCase());
                                    if (val) {
                                        return [
                                            val
                                        ];
                                    }
                                    return options.filter((opt)=>opt.label.toLowerCase().includes(searchTerm.toLowerCase()));
                                },
                                onOpen: ()=>{
                                    setIsOpen(true);
                                },
                                onClose: (e, reason)=>{
                                    if (![
                                        "selectOption",
                                        "removeOption"
                                    ].includes(reason)) {
                                        setIsOpen(false);
                                    }
                                },
                                renderTags: (selected, getTagProps)=>{
                                    const threshold = 3;
                                    if (selected.length > threshold) {
                                        return [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                                size: "small",
                                                label: `${selected.length} items selected`,
                                                sx: {
                                                    fontWeight: "bold"
                                                }
                                            }, "summary", false, {
                                                fileName: "[project]/src/components/Form/Select.jsx",
                                                lineNumber: 269,
                                                columnNumber: 25
                                            }, void 0)
                                        ];
                                    } else {
                                        return selected.map((option, index)=>{
                                            const { key, ...tagProps } = getTagProps({
                                                index
                                            });
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                                size: "small",
                                                avatar: option.img ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: option.img,
                                                    alt: option.label,
                                                    style: {
                                                        width: 20,
                                                        height: 13,
                                                        objectFit: "contain",
                                                        filter: "drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5))"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Form/Select.jsx",
                                                    lineNumber: 285,
                                                    columnNumber: 33
                                                }, void 0) : undefined,
                                                label: showLabel ? option.label : option.value,
                                                deleteIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                                    size: "small",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Cancel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        sx: {
                                                            fontSize: "18px",
                                                            "&:hover": {
                                                                color: "#f24f4f !important"
                                                            }
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Form/Select.jsx",
                                                        lineNumber: 301,
                                                        columnNumber: 33
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Form/Select.jsx",
                                                    lineNumber: 300,
                                                    columnNumber: 31
                                                }, void 0),
                                                sx: {
                                                    fontWeight: "bold",
                                                    "& .MuiChip-deleteIcon": {
                                                        marginRight: "5px",
                                                        padding: 0
                                                    }
                                                },
                                                ...tagProps
                                            }, key, false, {
                                                fileName: "[project]/src/components/Form/Select.jsx",
                                                lineNumber: 280,
                                                columnNumber: 27
                                            }, void 0);
                                        });
                                    }
                                },
                                renderOption: (props, option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])("li", {
                                        ...props,
                                        key: option.value,
                                        __source: {
                                            fileName: "[project]/src/components/Form/Select.jsx",
                                            lineNumber: 323,
                                            columnNumber: 21
                                        }
                                    }, option.img ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: option.img,
                                                alt: option.label,
                                                style: {
                                                    width: 25,
                                                    height: 18,
                                                    marginRight: 10,
                                                    filter: "drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5))"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Form/Select.jsx",
                                                lineNumber: 326,
                                                columnNumber: 27
                                            }, void 0),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: option.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Form/Select.jsx",
                                                lineNumber: 337,
                                                columnNumber: 27
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Form/Select.jsx",
                                        lineNumber: 325,
                                        columnNumber: 25
                                    }, void 0) : option.label),
                                renderInput: (params)=>{
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$InputTextField$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__InputTextField$3e$__["InputTextField"], {
                                        ...params,
                                        label: isDisabled ? label : validate?.required ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$RequiredLabel$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RequiredLabel$3e$__["RequiredLabel"], {
                                            label: label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Form/Select.jsx",
                                            lineNumber: 352,
                                            columnNumber: 29
                                        }, void 0) : label,
                                        fullWidth: true,
                                        error: hasError,
                                        helperText: null,
                                        name: name,
                                        sx: sx,
                                        InputProps: {
                                            ...params.InputProps,
                                            sx: {
                                                pr: "32px !important",
                                                ...params.InputProps?.sx || {}
                                            },
                                            endAdornment: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    hasError && errorMessage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                                        title: errorMessage,
                                                        arrow: true,
                                                        placement: "top-end",
                                                        slots: {
                                                            transition: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Zoom$2f$Zoom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
                                                        },
                                                        slotProps: {
                                                            transition: {
                                                                timeout: 200
                                                            }
                                                        },
                                                        PopperProps: {
                                                            disablePortal: true,
                                                            sx: {
                                                                zIndex: 7500
                                                            }
                                                        },
                                                        componentsProps: {
                                                            tooltip: {
                                                                sx: {
                                                                    zIndex: 7600,
                                                                    bgcolor: "#fff8f8",
                                                                    color: "#d32f2f",
                                                                    border: "1.5px solid #d32f2f",
                                                                    fontSize: "12px",
                                                                    px: 1,
                                                                    py: 0.75,
                                                                    borderRadius: 1,
                                                                    boxShadow: 2
                                                                }
                                                            },
                                                            arrow: {
                                                                sx: {
                                                                    color: "#fff8f8",
                                                                    filter: "drop-shadow(0 0 1.5px #d32f2f)"
                                                                }
                                                            }
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                                            size: "small",
                                                            "aria-label": "error info",
                                                            sx: {
                                                                p: 0
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$InfoOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                color: "error",
                                                                fontSize: "inherit"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Form/Select.jsx",
                                                                lineNumber: 413,
                                                                columnNumber: 37
                                                            }, void 0)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Form/Select.jsx",
                                                            lineNumber: 408,
                                                            columnNumber: 35
                                                        }, void 0)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Form/Select.jsx",
                                                        lineNumber: 371,
                                                        columnNumber: 33
                                                    }, void 0) : null,
                                                    isOpen && addOptions && (!parent || pValue !== "") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                                                        mr: isOpen && multiple && Array.isArray(field.value) && field.value.length > 0 ? 3 : 0,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                                            title: "Add Option",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                                                size: "small",
                                                                onMouseDown: (e)=>{
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    setIsPopperOpen(true);
                                                                    setIsOpen(false);
                                                                },
                                                                sx: {
                                                                    p: 0.5
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Add$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                    color: "secondary"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/Form/Select.jsx",
                                                                    lineNumber: 444,
                                                                    columnNumber: 41
                                                                }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Form/Select.jsx",
                                                                lineNumber: 434,
                                                                columnNumber: 39
                                                            }, void 0)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Form/Select.jsx",
                                                            lineNumber: 433,
                                                            columnNumber: 37
                                                        }, void 0)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Form/Select.jsx",
                                                        lineNumber: 423,
                                                        columnNumber: 35
                                                    }, void 0),
                                                    params.InputProps.endAdornment
                                                ]
                                            }, void 0, true),
                                            onKeyUp
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Form/Select.jsx",
                                        lineNumber: 346,
                                        columnNumber: 23
                                    }, void 0);
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/Form/Select.jsx",
                                lineNumber: 172,
                                columnNumber: 17
                            }, void 0)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Form/Select.jsx",
                        lineNumber: 118,
                        columnNumber: 15
                    }, void 0);
                }
            }, void 0, false, {
                fileName: "[project]/src/components/Form/Select.jsx",
                lineNumber: 112,
                columnNumber: 9
            }, this),
            isPopperOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                sx: {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    bgcolor: "rgba(244, 244, 244, 0.1)",
                    backdropFilter: "blur(1px)",
                    WebkitBackdropFilter: "blur(1px)",
                    zIndex: 1400
                },
                onMouseDown: ()=>setIsPopperOpen(false)
            }, void 0, false, {
                fileName: "[project]/src/components/Form/Select.jsx",
                lineNumber: 465,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Popper$2f$Popper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Popper$3e$__["Popper"], {
                open: isPopperOpen,
                anchorEl: autocompleteRef.current,
                style: {
                    zIndex: 9999
                },
                placement: "bottom",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                    sx: {
                        p: 2,
                        minWidth: 280,
                        borderRadius: 2,
                        boxShadow: 24,
                        bgcolor: "#ffffff90",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)"
                    },
                    onMouseDown: (e)=>{
                        e.stopPropagation();
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                            sx: {
                                fontWeight: "bold"
                            },
                            children: [
                                "Add ",
                                label
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Form/Select.jsx",
                            lineNumber: 501,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Divider, {
                            sx: {
                                my: 1
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/Form/Select.jsx",
                            lineNumber: 502,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].InputTextField, {
                            onChange: (e)=>{
                                setNewOption(e.target.value);
                            },
                            label: "option",
                            sx: {
                                width: "100%",
                                my: 3
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/Form/Select.jsx",
                            lineNumber: 504,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                            sx: {
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: 1
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].MuiButton, {
                                    variant: "contained",
                                    sx: {
                                        borderRadius: 2,
                                        height: "30px",
                                        background: "linear-gradient(to top right, #ff512f, #dd2476)"
                                    },
                                    onClick: ()=>setIsPopperOpen(false),
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Form/Select.jsx",
                                    lineNumber: 518,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].MuiButton, {
                                    sx: {
                                        borderRadius: 2,
                                        height: "30px",
                                        background: "linear-gradient(to top right,rgba(0, 162, 199),rgb(0, 78, 187));",
                                        "&:disabled": {
                                            background: "linear-gradient(to left,#b0d4f0,#d3e9f9)",
                                            color: "whitesmoke"
                                        }
                                    },
                                    onClick: async (e)=>{
                                        await addOptions(newOption);
                                        if (parent && pValue) setOptionList(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getOptions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__getOptions$3e$__["getOptions"])(api, pValue, populate));
                                        else setOptionList(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getOptions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__getOptions$3e$__["getOptions"])(api, "", populate));
                                        setIsPopperOpen(false);
                                        setIsOpen(true);
                                    },
                                    variant: "contained",
                                    children: "Add"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Form/Select.jsx",
                                    lineNumber: 529,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Form/Select.jsx",
                            lineNumber: 511,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Form/Select.jsx",
                    lineNumber: 487,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Form/Select.jsx",
                lineNumber: 481,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/src/components/Form/Text.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-ssr] (ecmascript)");
;
;
function __TURBOPACK__default__export__(attr) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        component: attr.component,
        variant: attr.variant,
        sx: attr.sx,
        children: attr.children
    }, void 0, false, {
        fileName: "[project]/src/components/Form/Text.jsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/Form/Text.jsx [app-ssr] (ecmascript) <export default as Text>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Text",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Text$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Text$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Text.jsx [app-ssr] (ecmascript)");
}),
"[project]/src/components/Form/Upload.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Upload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Grid/Grid.js [app-ssr] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Tooltip/Tooltip.js [app-ssr] (ecmascript) <export default as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Dialog/Dialog.js [app-ssr] (ecmascript) <export default as Dialog>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Slider$2f$Slider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Slider$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Slider/Slider.js [app-ssr] (ecmascript) <export default as Slider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Button/Button.js [app-ssr] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$easy$2d$crop$2f$index$2e$module$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-easy-crop/index.module.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/Form/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Text$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Text$3e$__ = __turbopack_context__.i("[project]/src/components/Form/Text.jsx [app-ssr] (ecmascript) <export default as Text>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__ = __turbopack_context__.i("[project]/src/util/api.js [app-ssr] (ecmascript) <export default as api>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-ssr] (ecmascript) <export * as Page>");
"use client";
;
;
;
;
;
;
function getCroppedImg(imageSrc, croppedAreaPixels, outputType = "image/jpeg") {
    return new Promise((resolve)=>{
        const img = new Image();
        img.src = imageSrc;
        img.onload = ()=>{
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = croppedAreaPixels.width;
            canvas.height = croppedAreaPixels.height;
            ctx.drawImage(img, croppedAreaPixels.x, croppedAreaPixels.y, croppedAreaPixels.width, croppedAreaPixels.height, 0, 0, croppedAreaPixels.width, croppedAreaPixels.height);
            canvas.toBlob((blob)=>resolve(blob), outputType, outputType === "image/jpeg" ? 0.92 : undefined);
        };
    });
}
function Upload({ onUpload, label = "", accept = "image/*", endpoint, name, editMode = false, setup = false, hideCaption = false, form, tooltipTitle = "Logo", multiple = false, ...attr }) {
    const inputRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const preview = form.watch(name); // could be string or array
    const outputType = accept.includes("image") ? "image/webp" : "";
    // ===== Crop states =====
    const [openCrop, setOpenCrop] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [selectedFiles, setSelectedFiles] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState([]);
    const [tempImgURLs, setTempImgURLs] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState([]);
    const [cropIndex, setCropIndex] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(0);
    const [crop, setCrop] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState({
        x: 0,
        y: 0
    });
    const [zoom, setZoom] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(null);
    // ============================
    // FILE SELECTION
    // ============================
    function onSelectFile(e) {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        const urls = files.map((f)=>URL.createObjectURL(f));
        if (outputType === "image/webp") {
            // open crop for each file
            setSelectedFiles(files);
            setTempImgURLs(urls);
            setCropIndex(0);
            setOpenCrop(true);
        } else {
            // upload directly
            if (multiple) uploadMultipleFiles(files);
            else uploadFile(files[0]);
        }
        e.target.value = "";
    }
    // ============================
    // SAVING CROPPED IMAGE
    // ============================
    async function handleCropSave() {
        const file = selectedFiles[cropIndex];
        const imgURL = tempImgURLs[cropIndex];
        if (!croppedAreaPixels || !file) return;
        const croppedBlob = await getCroppedImg(imgURL, croppedAreaPixels, outputType);
        const ext = outputType.split("/")[1];
        const fileName = file.name.replace(/\.[^/.]+$/, `.${ext}`);
        const croppedFile = new File([
            croppedBlob
        ], fileName, {
            type: outputType
        });
        await uploadFile(croppedFile);
        // Next file if multiple
        if (cropIndex < selectedFiles.length - 1) {
            setCropIndex(cropIndex + 1);
            setZoom(1);
            return;
        }
        // All done
        setOpenCrop(false);
    }
    // ============================
    // UPLOAD HELPERS
    // ============================
    async function uploadMultipleFiles(files) {
        for (const f of files)await uploadFile(f);
    }
    async function uploadFile(fileToUpload) {
        const formData = new FormData();
        formData.append("file", fileToUpload);
        const resp = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__["api"].post(endpoint, formData);
        if (resp.status === "success") {
            if (multiple) {
                const oldVal = form.getValues(name) || [];
                form.setValue(name, [
                    ...oldVal,
                    resp.file.url
                ]);
            } else {
                form.setValue(name, resp.file.url);
            }
            if (onUpload) onUpload();
        }
    }
    // ============================
    // DELETE (for multiple)
    // ============================
    function removeImage(index) {
        const arr = form.getValues(name) || [];
        arr.splice(index, 1);
        form.setValue(name, [
            ...arr
        ]);
    }
    // ============================
    // UI
    // ============================
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__["Dialog"], {
                open: openCrop,
                onClose: ()=>setOpenCrop(false),
                fullWidth: true,
                maxWidth: "sm",
                sx: {
                    zIndex: 99999
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "relative",
                            height: 400
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$easy$2d$crop$2f$index$2e$module$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            image: tempImgURLs[cropIndex],
                            crop: crop,
                            zoom: zoom,
                            aspect: 1,
                            onCropChange: setCrop,
                            onZoomChange: setZoom,
                            onCropComplete: (a, aPx)=>setCroppedAreaPixels(aPx)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Form/Upload.jsx",
                            lineNumber: 172,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Form/Upload.jsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: 16
                        },
                        children: [
                            multiple && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: "center",
                                    marginBottom: 10
                                },
                                children: [
                                    "Image ",
                                    cropIndex + 1,
                                    " of ",
                                    selectedFiles.length
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Form/Upload.jsx",
                                lineNumber: 185,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Slider$2f$Slider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Slider$3e$__["Slider"], {
                                value: zoom,
                                min: 1,
                                max: 3,
                                step: 0.1,
                                onChange: (e, z)=>setZoom(z)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Form/Upload.jsx",
                                lineNumber: 190,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                variant: "contained",
                                color: "secondary",
                                fullWidth: true,
                                sx: {
                                    color: "white",
                                    fontWeight: 600,
                                    mt: 1
                                },
                                onClick: handleCropSave,
                                children: "Save Crop"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Form/Upload.jsx",
                                lineNumber: 198,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Form/Upload.jsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Form/Upload.jsx",
                lineNumber: 164,
                columnNumber: 7
            }, this),
            outputType === "image/webp" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                container: true,
                flexDirection: "column",
                gap: 0.5,
                children: [
                    editMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                        sx: {
                            px: 2,
                            pt: 2,
                            color: "grey"
                        },
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/src/components/Form/Upload.jsx",
                        lineNumber: 214,
                        columnNumber: 13
                    }, this),
                    multiple ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].MuiButton, {
                        component: "label",
                        variant: "outlined",
                        color: "secondary",
                        sx: {
                            width: "120px",
                            borderWidth: 2,
                            fontWeight: 600,
                            mb: 1
                        },
                        children: [
                            "Add Images",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "file-upload",
                                type: "file",
                                ref: inputRef,
                                hidden: true,
                                accept: accept,
                                onChange: onSelectFile,
                                multiple: multiple
                            }, void 0, false, {
                                fileName: "[project]/src/components/Form/Upload.jsx",
                                lineNumber: 230,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Form/Upload.jsx",
                        lineNumber: 218,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                        component: "label",
                        htmlFor: "file-upload",
                        sx: {
                            ml: editMode ? 3 : 0,
                            my: 0.5,
                            width: setup ? 100 : editMode ? 80 : 65,
                            height: setup ? 100 : editMode ? 80 : 65,
                            boxShadow: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            overflow: "hidden",
                            position: "relative",
                            ...attr.sx
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                container: true,
                                flexDirection: "column",
                                sx: {
                                    width: "100%",
                                    height: "100%"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                        title: `${!preview ? "Add" : "Edit"} ${tooltipTitle}`,
                                        placement: "top",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                                            sx: {
                                                py: 0.2,
                                                fontSize: 13,
                                                textAlign: "center",
                                                bgcolor: "secondary.main",
                                                color: "white",
                                                position: "absolute",
                                                bottom: 0,
                                                width: "100%"
                                            },
                                            children: !preview ? "Add" : "Edit"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Form/Upload.jsx",
                                            lineNumber: 268,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Form/Upload.jsx",
                                        lineNumber: 264,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: preview || "/images/logo/user.png",
                                        alt: "Preview",
                                        style: {
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain"
                                        },
                                        onError: (e)=>{
                                            e.target.src = "/images/logo/user.png";
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Form/Upload.jsx",
                                        lineNumber: 284,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Form/Upload.jsx",
                                lineNumber: 259,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "file-upload",
                                type: "file",
                                ref: inputRef,
                                hidden: true,
                                accept: accept,
                                onChange: onSelectFile,
                                multiple: multiple
                            }, void 0, false, {
                                fileName: "[project]/src/components/Form/Upload.jsx",
                                lineNumber: 298,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Form/Upload.jsx",
                        lineNumber: 241,
                        columnNumber: 13
                    }, this),
                    !hideCaption && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Text$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Text$3e$__["Text"], {
                        sx: {
                            color: "grey",
                            fontSize: 12,
                            ml: editMode ? 2 : 0
                        },
                        children: "Max 100KB, JPEG/PNG/SVG only."
                    }, void 0, false, {
                        fileName: "[project]/src/components/Form/Upload.jsx",
                        lineNumber: 311,
                        columnNumber: 13
                    }, this),
                    multiple && Array.isArray(preview) && preview.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                        container: true,
                        spacing: 1,
                        sx: {
                            mt: 1,
                            px: editMode ? 3 : 0
                        },
                        children: preview.map((img, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                item: true,
                                xs: 4,
                                sm: 3,
                                md: 2,
                                sx: {
                                    position: "relative"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: img,
                                        style: {
                                            width: "100%",
                                            height: 70,
                                            objectFit: "cover",
                                            borderRadius: 6,
                                            boxShadow: "0 0 6px rgba(0,0,0,0.15)"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Form/Upload.jsx",
                                        lineNumber: 328,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                        size: "small",
                                        sx: {
                                            minWidth: 0,
                                            width: 22,
                                            height: 22,
                                            borderRadius: "50%",
                                            position: "absolute",
                                            top: -8,
                                            right: -8,
                                            bgcolor: "error.main",
                                            color: "white",
                                            "&:hover": {
                                                bgcolor: "error.dark"
                                            },
                                            fontSize: 12,
                                            p: 0
                                        },
                                        onClick: ()=>removeImage(idx),
                                        children: "✕"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Form/Upload.jsx",
                                        lineNumber: 338,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, idx, true, {
                                fileName: "[project]/src/components/Form/Upload.jsx",
                                lineNumber: 320,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/Form/Upload.jsx",
                        lineNumber: 318,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Form/Upload.jsx",
                lineNumber: 212,
                columnNumber: 9
            }, this) : // ------- NON-IMAGE FILE UPLOAD -------
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                mt: 1,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].MuiButton, {
                        variant: "contained",
                        component: "label",
                        color: "secondary",
                        htmlFor: "file-upload",
                        children: "Upload File"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Form/Upload.jsx",
                        lineNumber: 366,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                        mt: 1,
                        fontSize: 13,
                        children: multiple ? Array.isArray(preview) ? preview.join(", ") : "" : preview
                    }, void 0, false, {
                        fileName: "[project]/src/components/Form/Upload.jsx",
                        lineNumber: 375,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "file-upload",
                        type: "file",
                        ref: inputRef,
                        hidden: true,
                        accept: accept,
                        onChange: onSelectFile,
                        multiple: multiple
                    }, void 0, false, {
                        fileName: "[project]/src/components/Form/Upload.jsx",
                        lineNumber: 383,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Form/Upload.jsx",
                lineNumber: 365,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/src/components/Form/Active.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Active
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Select$2f$Select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Select/Select.js [app-ssr] (ecmascript) <export default as Select>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/MenuItem/MenuItem.js [app-ssr] (ecmascript) <export default as MenuItem>");
;
;
;
function Active({ info, api, LoadData, endpoint, disabled = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Select$2f$Select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
        value: info.isActive,
        disabled: disabled,
        onChange: async (e)=>{
            await api.put(`${endpoint}${info._id}`, {
                isActive: e.target.value
            });
            await LoadData();
        },
        notched: false,
        inputProps: {
            "aria-label": "active status"
        },
        size: "small",
        MenuProps: {
            PaperProps: {
                sx: {
                    padding: 0,
                    marginTop: 0.5,
                    borderRadius: 2,
                    boxShadow: "none",
                    border: "none",
                    "& .MuiList-root": {
                        padding: 0
                    }
                }
            }
        },
        sx: {
            minWidth: "90px",
            backgroundColor: info.isActive ? "#b6f0b6" : "#f4b6b6",
            color: info.isActive ? "#184e18ff" : "#4e0e0eff",
            borderColor: info.isActive ? "#184e18ff" : "#4e0e0eff",
            "& .MuiSelect-select": {
                padding: "4px",
                fontSize: "12px !important",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            },
            height: "24px"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                value: "true",
                sx: {
                    backgroundColor: "#b6f0b6",
                    color: "#184e18ff",
                    fontSize: "12px !important",
                    pl: 2,
                    minHeight: "24px",
                    textShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
                    "&:hover": {
                        backgroundColor: "#b6f0b6 !important",
                        color: "#184e18ff"
                    },
                    "&.Mui-selected": {
                        backgroundColor: "#b6f0b6 !important",
                        color: "#184e18ff"
                    },
                    "&.Mui-selected:hover": {
                        backgroundColor: "#b6f0b6 !important",
                        color: "#184e18ff"
                    }
                },
                children: "Active"
            }, void 0, false, {
                fileName: "[project]/src/components/Form/Active.jsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                value: "false",
                sx: {
                    backgroundColor: "#f4b6b6",
                    color: "#4e0e0eff",
                    fontSize: "12px !important",
                    pl: 2,
                    minHeight: "24px",
                    textShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
                    "&:hover": {
                        backgroundColor: "#f4b6b6 !important",
                        color: "#4e0e0eff"
                    },
                    "&.Mui-selected": {
                        backgroundColor: "#f4b6b6 !important",
                        color: "#4e0e0eff"
                    },
                    "&.Mui-selected:hover": {
                        backgroundColor: "#f4b6b6 !important",
                        color: "#4e0e0eff"
                    }
                },
                children: "Inactive"
            }, void 0, false, {
                fileName: "[project]/src/components/Form/Active.jsx",
                lineNumber: 73,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Form/Active.jsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/Form/Switch.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Switch$2f$Switch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Switch$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Switch/Switch.js [app-ssr] (ecmascript) <export default as Switch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-ssr] (ecmascript) <export * as Page>");
;
;
;
;
;
function __TURBOPACK__default__export__({ label, control, defaultValue = false, ...attr }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
        display: "flex",
        alignItems: "center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: "toggle-switch",
                style: {
                    fontWeight: "bold"
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/Form/Switch.jsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Controller"], {
                ...attr,
                control: control,
                defaultValue: defaultValue,
                render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Switch$2f$Switch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Switch$3e$__["Switch"], {
                        size: "small",
                        id: "toggle-switch",
                        ...field,
                        sx: {
                            transform: "scale(0.7)",
                            filter: "drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5))"
                        },
                        checked: field.value,
                        onChange: (e)=>{
                            field.onChange(e.target.checked);
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/Form/Switch.jsx",
                        lineNumber: 17,
                        columnNumber: 11
                    }, void 0)
            }, void 0, false, {
                fileName: "[project]/src/components/Form/Switch.jsx",
                lineNumber: 12,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Form/Switch.jsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/Form/SwitchWithText.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SwitchWithText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-ssr] (ecmascript) <export * as Page>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/styles/styled.js [app-ssr] (ecmascript) <locals> <export default as styled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Switch$2f$Switch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Switch/Switch.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const TextSwitch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Switch$2f$Switch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(({ theme })=>({
        width: 64,
        height: 28,
        padding: 0,
        "& .MuiSwitch-switchBase": {
            padding: 0,
            margin: 2,
            transitionDuration: "200ms",
            "&.Mui-checked": {
                transform: "translateX(36px)",
                color: "white",
                "& + .MuiSwitch-track": {
                    backgroundColor: theme.palette.success.dark,
                    "&::before": {
                        opacity: 1
                    },
                    "&::after": {
                        opacity: 0
                    }
                }
            }
        },
        "& .MuiSwitch-thumb": {
            boxShadow: "none",
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: theme.palette.common.white
        },
        "& .MuiSwitch-track": {
            borderRadius: 14,
            backgroundColor: theme.palette.grey[400],
            opacity: 1,
            position: "relative",
            transition: theme.transitions.create([
                "background-color"
            ], {
                duration: theme.transitions.duration.shortest
            }),
            "&::before, &::after": {
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 12,
                fontWeight: 600,
                color: theme.palette.common.white
            },
            "&::before": {
                content: '"ON"',
                left: 8,
                opacity: 0
            },
            "&::after": {
                content: '"OFF"',
                right: 8,
                opacity: 1
            }
        }
    }));
function SwitchWithText({ label, control, defaultValue = false, ...attr }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
        display: "flex",
        alignItems: "center",
        gap: 2.5,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: "toggle-switch-with-text",
                style: {
                    fontWeight: "bold"
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/Form/SwitchWithText.jsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Controller"], {
                ...attr,
                control: control,
                defaultValue: defaultValue,
                render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TextSwitch, {
                        id: "toggle-switch-with-text",
                        checked: field.value,
                        onChange: (e)=>field.onChange(e.target.checked)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Form/SwitchWithText.jsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, void 0)
            }, void 0, false, {
                fileName: "[project]/src/components/Form/SwitchWithText.jsx",
                lineNumber: 77,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Form/SwitchWithText.jsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/Form/Radio.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$RadioGroup$2f$RadioGroup$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RadioGroup$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/RadioGroup/RadioGroup.js [app-ssr] (ecmascript) <export default as RadioGroup>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Radio$2f$Radio$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Radio/Radio.js [app-ssr] (ecmascript) <export default as Radio>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControlLabel$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/FormControlLabel/FormControlLabel.js [app-ssr] (ecmascript) <export default as FormControlLabel>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-ssr] (ecmascript) <export * as Page>");
;
;
;
;
;
function __TURBOPACK__default__export__({ label, control, defaultValue = "", options = [], ...attr }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
        display: "flex",
        alignItems: "center",
        sx: {
            width: "100%"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: "radio-group",
                style: {
                    fontWeight: "bold",
                    marginRight: 8
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/Form/Radio.jsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Controller"], {
                ...attr,
                control: control,
                defaultValue: defaultValue,
                render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$RadioGroup$2f$RadioGroup$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RadioGroup$3e$__["RadioGroup"], {
                        id: "radio-group",
                        row: true,
                        ...field,
                        onChange: (e)=>field.onChange(e.target.value),
                        value: field.value,
                        sx: {
                            gap: 2
                        },
                        children: options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControlLabel$3e$__["FormControlLabel"], {
                                value: opt.value,
                                control: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Radio$2f$Radio$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__["Radio"], {
                                    color: "secondary",
                                    sx: {
                                        filter: "drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.3))"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Form/Radio.jsx",
                                    lineNumber: 39,
                                    columnNumber: 19
                                }, void 0),
                                label: opt.label,
                                sx: {
                                    ".MuiFormControlLabel-label": {
                                        marginLeft: -0.5
                                    },
                                    marginRight: 1
                                }
                            }, opt.value, false, {
                                fileName: "[project]/src/components/Form/Radio.jsx",
                                lineNumber: 35,
                                columnNumber: 15
                            }, void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/Form/Radio.jsx",
                        lineNumber: 26,
                        columnNumber: 11
                    }, void 0)
            }, void 0, false, {
                fileName: "[project]/src/components/Form/Radio.jsx",
                lineNumber: 21,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Form/Radio.jsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/Form/DateRange.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Button/Button.js [app-ssr] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Popover$2f$Popover$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Popover$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Popover/Popover.js [app-ssr] (ecmascript) <export default as Popover>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$ToggleButton$2f$ToggleButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ToggleButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/ToggleButton/ToggleButton.js [app-ssr] (ecmascript) <export default as ToggleButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$ToggleButtonGroup$2f$ToggleButtonGroup$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ToggleButtonGroup$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/ToggleButtonGroup/ToggleButtonGroup.js [app-ssr] (ecmascript) <export default as ToggleButtonGroup>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TextField/TextField.js [app-ssr] (ecmascript) <export default as TextField>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$x$2d$date$2d$pickers$2f$esm$2f$DatePicker$2f$DatePicker$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/x-date-pickers/esm/DatePicker/DatePicker.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$x$2d$date$2d$pickers$2f$esm$2f$LocalizationProvider$2f$LocalizationProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/x-date-pickers/esm/LocalizationProvider/LocalizationProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$x$2d$date$2d$pickers$2f$esm$2f$AdapterDayjs$2f$AdapterDayjs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/x-date-pickers/esm/AdapterDayjs/AdapterDayjs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CalendarToday$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/CalendarToday.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ArrowDropDown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/ArrowDropDown.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dayjs/dayjs.min.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
const ranges = {
    today: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])().startOf("day"),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])().endOf("day")
    ],
    yesterday: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])().subtract(1, "day").startOf("day"),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])().subtract(1, "day").endOf("day")
    ],
    thisWeek: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])().startOf("week"),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])().endOf("day")
    ],
    lastWeek: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])().subtract(1, "week").startOf("week"),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])().subtract(1, "week").endOf("week")
    ],
    thisMonth: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])().startOf("month"),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])().endOf("day")
    ],
    lastMonth: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])().subtract(1, "month").startOf("month"),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])().subtract(1, "month").endOf("month")
    ],
    thisYear: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])().startOf("year"),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])().endOf("day")
    ],
    lastYear: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])().subtract(1, "year").startOf("year"),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])().subtract(1, "year").endOf("year")
    ]
};
const DateRangeSelector = ({ onUpdate, defaultValue, ...attr })=>{
    const [anchorEl, setAnchorEl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dateRange, setDateRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(ranges.thisMonth);
    const [rangeType, setRangeType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(defaultValue ?? "thisMonth");
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (!onUpdate) return;
        onUpdate(dateRange.map((d)=>d.toDate()));
    }, [
        dateRange
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (rangeType === "custom") {
            setDateRange(dateRange ?? [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])()
            ]);
        } else {
            setDateRange(ranges[rangeType]);
        }
    }, [
        rangeType
    ]);
    const handleClick = (event)=>{
        setAnchorEl(event.currentTarget);
    };
    const handleClose = ()=>{
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const handleRangeTypeChange = (event, newRangeType)=>{
        if (newRangeType) {
            setRangeType(newRangeType);
            if (newRangeType !== "custom") {
                const newRange = ranges[newRangeType];
                setDateRange(newRange);
                handleClose();
            }
        }
    };
    const handleDateRangeChange = (index)=>(newValue)=>{
            const newRange = [
                ...dateRange
            ];
            newRange[index] = newValue;
            if (index === 0 && newValue.isAfter(newRange[1])) {
                newRange[1] = newValue;
            } else if (index === 1 && newValue.isBefore(newRange[0])) {
                newRange[0] = newValue;
            }
            setDateRange(newRange);
        };
    const handleApply = ()=>{
        handleClose();
    };
    const formatDate = (date)=>{
        if (!date) return "Not set";
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(date).format("MMM D, YYYY");
    };
    const buttonLabel = Array.isArray(dateRange) && dateRange[0] && dateRange[1] ? `${formatDate(dateRange[0])} - ${formatDate(dateRange[1])}` : "Select Date Range";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$x$2d$date$2d$pickers$2f$esm$2f$LocalizationProvider$2f$LocalizationProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LocalizationProvider"], {
        dateAdapter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$x$2d$date$2d$pickers$2f$esm$2f$AdapterDayjs$2f$AdapterDayjs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdapterDayjs"],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                    variant: "outlined",
                    color: "black",
                    onClick: handleClick,
                    sx: {
                        minWidth: 240,
                        borderColor: "grey.500",
                        color: "grey.900",
                        fontWeight: "bold",
                        height: "30px",
                        "&:hover": {
                            borderColor: "grey.700",
                            backgroundColor: "grey.50"
                        },
                        ...attr?.sx
                    },
                    startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CalendarToday$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            fontSize: "12px !important"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/Form/DateRange.jsx",
                        lineNumber: 124,
                        columnNumber: 22
                    }, void 0),
                    endIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ArrowDropDown$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/components/Form/DateRange.jsx",
                        lineNumber: 125,
                        columnNumber: 20
                    }, void 0),
                    children: buttonLabel
                }, void 0, false, {
                    fileName: "[project]/src/components/Form/DateRange.jsx",
                    lineNumber: 107,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Popover$2f$Popover$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Popover$3e$__["Popover"], {
                    open: open,
                    anchorEl: anchorEl,
                    onClose: handleClose,
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            maxWidth: 350
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$ToggleButtonGroup$2f$ToggleButtonGroup$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ToggleButtonGroup$3e$__["ToggleButtonGroup"], {
                                value: rangeType,
                                exclusive: true,
                                onChange: handleRangeTypeChange,
                                "aria-label": "date range options",
                                sx: {
                                    display: "flex",
                                    flexDirection: "column",
                                    "& .MuiToggleButton-root": {
                                        color: "black",
                                        py: 1,
                                        px: 2,
                                        "&.Mui-selected": {
                                            color: "black"
                                        }
                                    }
                                },
                                children: [
                                    {
                                        name: "Today",
                                        value: "today"
                                    },
                                    {
                                        name: "Yesterday",
                                        value: "yesterday"
                                    },
                                    {
                                        name: "This Week",
                                        value: "thisWeek"
                                    },
                                    {
                                        name: "Last Week",
                                        value: "lastWeek"
                                    },
                                    {
                                        name: "This Month",
                                        value: "thisMonth"
                                    },
                                    {
                                        name: "Last Month",
                                        value: "lastMonth"
                                    },
                                    {
                                        name: "This Year",
                                        value: "thisYear"
                                    },
                                    {
                                        name: "Last Year",
                                        value: "lastYear"
                                    },
                                    {
                                        name: "Custom",
                                        value: "custom"
                                    }
                                ].map((range)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$ToggleButton$2f$ToggleButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ToggleButton$3e$__["ToggleButton"], {
                                        value: range.value,
                                        children: range.name
                                    }, range.value, false, {
                                        fileName: "[project]/src/components/Form/DateRange.jsx",
                                        lineNumber: 168,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/src/components/Form/DateRange.jsx",
                                lineNumber: 139,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            rangeType === "custom" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                sx: {
                                    p: 2
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            display: "flex",
                                            gap: 2,
                                            mb: 2
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$x$2d$date$2d$pickers$2f$esm$2f$DatePicker$2f$DatePicker$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DatePicker"], {
                                                label: "Start Date",
                                                value: dateRange[0],
                                                maxDate: dateRange[1],
                                                onChange: handleDateRangeChange(0),
                                                renderInput: (params)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                                        ...params,
                                                        size: "small"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Form/DateRange.jsx",
                                                        lineNumber: 182,
                                                        columnNumber: 23
                                                    }, void 0),
                                                slotProps: {
                                                    day: {
                                                        sx: {
                                                            "&.Mui-selected": {
                                                                color: "white"
                                                            }
                                                        }
                                                    },
                                                    yearButton: {
                                                        sx: {
                                                            "&.Mui-selected": {
                                                                color: "white"
                                                            }
                                                        }
                                                    },
                                                    popper: {
                                                        modifiers: [
                                                            {
                                                                name: "zIndex",
                                                                enabled: true,
                                                                phase: "beforeWrite",
                                                                fn: ({ state })=>{
                                                                    state.styles.popper.zIndex = "15000";
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Form/DateRange.jsx",
                                                lineNumber: 176,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$x$2d$date$2d$pickers$2f$esm$2f$DatePicker$2f$DatePicker$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DatePicker"], {
                                                label: "End Date",
                                                value: dateRange[1],
                                                disableFuture: true,
                                                onChange: handleDateRangeChange(1),
                                                renderInput: (params)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                                        ...params,
                                                        size: "small"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Form/DateRange.jsx",
                                                        lineNumber: 219,
                                                        columnNumber: 23
                                                    }, void 0),
                                                slotProps: {
                                                    day: {
                                                        sx: {
                                                            "&.Mui-selected": {
                                                                color: "white"
                                                            }
                                                        }
                                                    },
                                                    yearButton: {
                                                        sx: {
                                                            "&.Mui-selected": {
                                                                color: "white"
                                                            }
                                                        }
                                                    },
                                                    popper: {
                                                        modifiers: [
                                                            {
                                                                name: "zIndex",
                                                                enabled: true,
                                                                phase: "beforeWrite",
                                                                fn: ({ state })=>{
                                                                    state.styles.popper.zIndex = "15000";
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Form/DateRange.jsx",
                                                lineNumber: 213,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Form/DateRange.jsx",
                                        lineNumber: 175,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            mb: 2
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                                variant: "outlined",
                                                color: "secondary",
                                                onClick: handleClose,
                                                sx: {
                                                    mr: 1,
                                                    fontWeight: "bold"
                                                },
                                                children: "Cancel"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Form/DateRange.jsx",
                                                lineNumber: 254,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                                variant: "contained",
                                                color: "secondary",
                                                sx: {
                                                    fontWeight: "bold",
                                                    color: "#fff"
                                                },
                                                onClick: handleApply,
                                                disabled: !dateRange[0] || !dateRange[1],
                                                children: "Apply"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Form/DateRange.jsx",
                                                lineNumber: 265,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Form/DateRange.jsx",
                                        lineNumber: 251,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Form/DateRange.jsx",
                                lineNumber: 174,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Form/DateRange.jsx",
                        lineNumber: 138,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/Form/DateRange.jsx",
                    lineNumber: 129,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Form/DateRange.jsx",
            lineNumber: 106,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/Form/DateRange.jsx",
        lineNumber: 105,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = DateRangeSelector;
}),
"[project]/src/components/Form/index.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TextEditor",
    ()=>TextEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Checkbox$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Checkbox.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Input$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Input.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Phone$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Phone.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Date$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Date.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Select$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Select.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Text$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Text.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Upload$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Upload.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Active$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Active.jsx [app-ssr] (ecmascript)");
// export { default as Field } from "./Field";
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Switch$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Switch.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$SwitchWithText$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/SwitchWithText.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Radio$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Radio.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$DateRange$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/DateRange.jsx [app-ssr] (ecmascript)");
;
"use client";
;
const TextEditor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/src/components/Form/TextEditor.jsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/src/components/Format/Date.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>date
]);
function date({ date, format = "dd-mmm-yyyy", locale = "default" }) {
    try {
        if (!date) return "";
        if (date instanceof Date) return date.showDate(format, locale);
        return new Date(date).showDate(format, locale);
    } catch (e) {
        return "";
    }
}
}),
"[project]/src/components/Format/Currency.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Currency
]);
function Currency({ value, currency = "INR", locale = "en-IN" }) {
    if (!value) return "";
    return value.toMoney(currency, locale);
}
}),
"[project]/src/components/Format/index.jsx [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Format$2f$Date$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Format/Date.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Format$2f$Currency$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Format/Currency.jsx [app-ssr] (ecmascript)");
;
;
}),
"[project]/src/components/SectionTitle.jsx [app-ssr] (ecmascript) <export default as SectionTitle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SectionTitle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SectionTitle$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SectionTitle$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SectionTitle.jsx [app-ssr] (ecmascript)");
}),
"[project]/src/components/Popup/Popup.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Popup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Dialog/Dialog.js [app-ssr] (ecmascript) <export default as Dialog>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/DialogTitle/DialogTitle.js [app-ssr] (ecmascript) <export default as DialogTitle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/DialogContent/DialogContent.js [app-ssr] (ecmascript) <export default as DialogContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-ssr] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CircularProgress/CircularProgress.js [app-ssr] (ecmascript) <export default as CircularProgress>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Close$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Close.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Edit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Edit.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Download.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-ssr] (ecmascript) <export * as Page>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$index$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/index.jsx [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SectionTitle$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SectionTitle$3e$__ = __turbopack_context__.i("[project]/src/components/SectionTitle.jsx [app-ssr] (ecmascript) <export default as SectionTitle>");
"use client";
;
;
;
;
;
;
;
;
function Popup(attr) {
    const [open, setOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(attr.open ?? false);
    const { title, children, loading } = attr;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (attr.open !== undefined) {
            setOpen(attr.open);
        }
    }, [
        attr.open
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__["Dialog"], {
        open: open,
        onClose: ()=>{
            if (attr.onClose) attr.onClose();
            else setOpen(false);
        },
        // slots={{ transition: Fade }}
        // slotProps={{
        //   transition: {
        //     onExited: () => attr?.onExited(),
        //   },
        // }}
        maxWidth: attr.maxWidth ?? "lg",
        fullWidth: true,
        sx: {
            zIndex: 3300,
            boxShadow: 24,
            overflowY: "auto"
        },
        BackdropProps: {
            sx: {
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                backdropFilter: "blur(1px)"
            }
        },
        PaperProps: {
            sx: {
                borderRadius: 2
            }
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__["DialogTitle"], {
                sx: {
                    m: 0,
                    p: 0
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SectionTitle$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SectionTitle$3e$__["SectionTitle"], {
                    title: title,
                    sx: {
                        px: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "18px",
                        fontWeight: "bold"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                        children: [
                            attr.onEdit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                "aria-label": "Edit",
                                onClick: attr.onEdit,
                                sx: {
                                    color: "grey",
                                    mr: 2,
                                    "&:hover": {
                                        color: "info.light"
                                    }
                                },
                                size: "small",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Edit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/src/components/Popup/Popup.jsx",
                                    lineNumber: 88,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Popup/Popup.jsx",
                                lineNumber: 78,
                                columnNumber: 15
                            }, this),
                            attr.onDownload && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                "aria-label": "Download",
                                onClick: attr.onDownload,
                                sx: {
                                    color: "grey",
                                    mr: 2,
                                    "&:hover": {
                                        color: "success.light"
                                    }
                                },
                                size: "small",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/src/components/Popup/Popup.jsx",
                                    lineNumber: 102,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Popup/Popup.jsx",
                                lineNumber: 92,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                "aria-label": "close",
                                onClick: ()=>{
                                    if (attr.onClose) attr.onClose();
                                    else setOpen(false);
                                },
                                sx: {
                                    color: "grey",
                                    "&:hover": {
                                        color: "error.light"
                                    }
                                },
                                size: "small",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Close$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/src/components/Popup/Popup.jsx",
                                    lineNumber: 114,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Popup/Popup.jsx",
                                lineNumber: 105,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Popup/Popup.jsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Popup/Popup.jsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Popup/Popup.jsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__["DialogContent"], {
                sx: {
                    maxHeight: "80vh",
                    minHeight: attr.minHeight ?? "10vh",
                    position: "relative",
                    p: 0,
                    m: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            p: 1
                        },
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/components/Popup/Popup.jsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(255,255,255,0.6)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 1
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__["CircularProgress"], {}, void 0, false, {
                            fileName: "[project]/src/components/Popup/Popup.jsx",
                            lineNumber: 145,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Popup/Popup.jsx",
                        lineNumber: 131,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Popup/Popup.jsx",
                lineNumber: 119,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Popup/Popup.jsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/Popup/DeleteWithPassword.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Popover$2f$Popover$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Popover$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Popover/Popover.js [app-ssr] (ecmascript) <export default as Popover>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Grid/Grid.js [app-ssr] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-ssr] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Alert/Alert.js [app-ssr] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Close$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Close.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-ssr] (ecmascript) <export * as Page>");
"use client";
;
;
;
;
;
function DeleteWithPassword({ anchorEl, onConfirm, onClose, title = "Confirm Delete?", message = "Do you want to delete this? Enter your password to confirm", btnLabel = "Delete", errorMessage = null, ...attr }) {
    const [anchorElement, setAnchorElement] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(null);
    const [password, setPassword] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState("");
    const [remark, setRemark] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState("");
    const isConfirmEnabled = (()=>{
        if (password.trim() === "") return false;
        if (!attr?.askRemarks) return true;
        if (remark.trim() === "") return false;
        return true;
    })();
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        // if (!anchorEl) return;
        setAnchorElement(anchorEl);
    }, [
        anchorEl
    ]);
    function Close(e) {
        setAnchorElement(null);
        setPassword("");
        setRemark("");
        if (onClose) onClose(e);
    }
    const open = Boolean(anchorElement);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                sx: {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    bgcolor: "rgba(244, 244, 244, 0.1)",
                    backdropFilter: "blur(1px)",
                    WebkitBackdropFilter: "blur(1px)",
                    zIndex: 1400
                },
                onClick: Close
            }, void 0, false, {
                fileName: "[project]/src/components/Popup/DeleteWithPassword.jsx",
                lineNumber: 47,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Popover$2f$Popover$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Popover$3e$__["Popover"], {
                open: open,
                anchorEl: anchorElement,
                onClose: Close,
                disableEnforceFocus: true,
                disableAutoFocus: true,
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "bottom"
                },
                transformOrigin: {
                    vertical: "top",
                    horizontal: "center"
                },
                style: {
                    zIndex: 1401
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                    container: true,
                    size: 12,
                    direction: "column",
                    sx: {
                        p: 2,
                        minWidth: "300px",
                        borderRadius: 2,
                        boxShadow: 2
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                            container: true,
                            justifyContent: "space-between",
                            alignItems: "center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                                    sx: {
                                        fontWeight: "bold",
                                        maxWidth: {
                                            xs: "300px",
                                            md: "500px"
                                        }
                                    },
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Popup/DeleteWithPassword.jsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                    onClick: Close,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Close$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        sx: {
                                            color: "#f24f4f"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Popup/DeleteWithPassword.jsx",
                                        lineNumber: 93,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Popup/DeleteWithPassword.jsx",
                                    lineNumber: 92,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Popup/DeleteWithPassword.jsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                            sx: {
                                mt: 1,
                                maxWidth: {
                                    xs: "300px",
                                    md: "500px"
                                },
                                textAlign: "justify"
                            },
                            children: message
                        }, void 0, false, {
                            fileName: "[project]/src/components/Popup/DeleteWithPassword.jsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                            container: true,
                            sx: {
                                pt: 1,
                                pb: 0.5,
                                gap: 1.5
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].InputTextField, {
                                    fullWidth: true,
                                    label: "Enter Password",
                                    type: "password",
                                    size: "small",
                                    value: password,
                                    onChange: (event)=>setPassword(event.target.value)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Popup/DeleteWithPassword.jsx",
                                    lineNumber: 106,
                                    columnNumber: 13
                                }, this),
                                attr.askRemarks && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].InputTextField, {
                                    fullWidth: true,
                                    label: "Remark",
                                    size: "small",
                                    multiline: true,
                                    rows: 4,
                                    value: remark,
                                    onChange: (event)=>setRemark(event.target.value)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Popup/DeleteWithPassword.jsx",
                                    lineNumber: 115,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Popup/DeleteWithPassword.jsx",
                            lineNumber: 105,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                            sx: {
                                pb: 2
                            },
                            children: errorMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                                severity: "error",
                                sx: {
                                    py: 0,
                                    height: "25px",
                                    width: "100%",
                                    "& .MuiAlert-icon": {
                                        fontSize: "14px",
                                        mr: 0.5,
                                        alignItems: "center"
                                    },
                                    "& .MuiAlert-message": {
                                        p: 0,
                                        m: 0,
                                        display: "flex",
                                        alignItems: "center"
                                    }
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                                    sx: {
                                        fontSize: "12px",
                                        p: 0,
                                        m: 0,
                                        lineHeight: "1",
                                        width: "100%"
                                    },
                                    children: errorMessage
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Popup/DeleteWithPassword.jsx",
                                    lineNumber: 147,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Popup/DeleteWithPassword.jsx",
                                lineNumber: 128,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Popup/DeleteWithPassword.jsx",
                            lineNumber: 126,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                            container: true,
                            size: 12,
                            justifyContent: "flex-end",
                            gap: 0.5,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].MuiButton, {
                                disabled: !isConfirmEnabled,
                                color: "error",
                                onClick: async (e)=>{
                                    await onConfirm(password, e, remark);
                                    setPassword("");
                                    setRemark("");
                                },
                                variant: "contained",
                                sx: {
                                    fontWeight: "bold",
                                    height: "26px",
                                    ml: 1,
                                    "&:hover": {
                                        bgcolor: "error.light",
                                        color: "white"
                                    }
                                },
                                children: btnLabel
                            }, void 0, false, {
                                fileName: "[project]/src/components/Popup/DeleteWithPassword.jsx",
                                lineNumber: 171,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Popup/DeleteWithPassword.jsx",
                            lineNumber: 161,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Popup/DeleteWithPassword.jsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Popup/DeleteWithPassword.jsx",
                lineNumber: 62,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
const __TURBOPACK__default__export__ = DeleteWithPassword;
}),
"[project]/src/components/Popup/SideDrawer.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SideDrawer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Drawer$2f$Drawer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Drawer$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Drawer/Drawer.js [app-ssr] (ecmascript) <export default as Drawer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-ssr] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Grid/Grid.js [app-ssr] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Close$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Close.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Edit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Edit.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-ssr] (ecmascript) <export * as Page>");
"use client";
;
;
;
;
;
;
function SideDrawer({ open, onClose, onEdit, anchor = "left", children, title = "term", hideTitleBar = false, width = 900 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Drawer$2f$Drawer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Drawer$3e$__["Drawer"], {
        anchor: anchor,
        open: open,
        onClose: ()=>{
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
            onClose();
        },
        sx: {
            zIndex: 7000
        },
        ModalProps: {
            BackdropProps: {
                sx: {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(1px)",
                    pointerEvents: "none"
                }
            }
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
            id: "drawer-container",
            sx: {
                width: {
                    xs: "98vw",
                    lg: width
                },
                height: "100%",
                backgroundColor: "#e6f3ff",
                p: 2,
                overflowY: "auto",
                position: "relative"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                sx: {
                    bgcolor: "white",
                    p: hideTitleBar ? 0 : 2,
                    borderRadius: 2
                },
                children: [
                    !hideTitleBar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                        container: true,
                        sx: {
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 1,
                            pl: 2,
                            flexWrap: "nowrap"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                                sx: {
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    color: "#007acc",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    flex: 1
                                },
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/src/components/Popup/SideDrawer.jsx",
                                lineNumber: 64,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                                sx: {
                                    display: "flex",
                                    gap: 1
                                },
                                children: [
                                    onEdit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                        onClick: onEdit,
                                        sx: {
                                            color: "#007acc"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Edit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                            fileName: "[project]/src/components/Popup/SideDrawer.jsx",
                                            lineNumber: 81,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Popup/SideDrawer.jsx",
                                        lineNumber: 80,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                        onClick: onClose,
                                        sx: {
                                            color: "#007acc"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Close$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                            fileName: "[project]/src/components/Popup/SideDrawer.jsx",
                                            lineNumber: 85,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Popup/SideDrawer.jsx",
                                        lineNumber: 84,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Popup/SideDrawer.jsx",
                                lineNumber: 78,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Popup/SideDrawer.jsx",
                        lineNumber: 54,
                        columnNumber: 13
                    }, this),
                    children
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Popup/SideDrawer.jsx",
                lineNumber: 50,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/Popup/SideDrawer.jsx",
            lineNumber: 39,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Popup/SideDrawer.jsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/Popup/PopperForm.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-ssr] (ecmascript) <export * as Page>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Grid/Grid.js [app-ssr] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Popper$2f$Popper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Popper$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Popper/Popper.js [app-ssr] (ecmascript) <export default as Popper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Paper/Paper.js [app-ssr] (ecmascript) <export default as Paper>");
;
;
;
;
const PopperForm = ({ anchorEl, setAnchorEl: onClose, title, children, onSubmit })=>{
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        const handleEscape = (event)=>{
            if (event.key === "Escape" && anchorEl) {
                onClose(null);
            }
        };
        if (anchorEl) {
            document.addEventListener("keydown", handleEscape);
        }
        return ()=>{
            document.removeEventListener("keydown", handleEscape);
        };
    }, [
        anchorEl,
        onClose
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            anchorEl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                sx: {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    bgcolor: "rgba(244, 244, 244, 0.1)",
                    backdropFilter: "blur(1px)",
                    WebkitBackdropFilter: "blur(1px)",
                    zIndex: 1400
                },
                onMouseDown: ()=>{
                    if (onClose) onClose(null);
                }
            }, void 0, false, {
                fileName: "[project]/src/components/Popup/PopperForm.jsx",
                lineNumber: 30,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Popper$2f$Popper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Popper$3e$__["Popper"], {
                open: Boolean(anchorEl),
                anchorEl: anchorEl,
                style: {
                    zIndex: 9000
                },
                placement: "bottom",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                    component: "form",
                    onSubmit: onSubmit,
                    sx: {
                        p: 2,
                        width: 320,
                        borderRadius: 2,
                        boxShadow: 24,
                        bgcolor: "#ffffff90",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)"
                    },
                    onMouseDown: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                            sx: {
                                fontWeight: "bold"
                            },
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/src/components/Popup/PopperForm.jsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Divider, {
                            sx: {
                                my: 1
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/Popup/PopperForm.jsx",
                            lineNumber: 68,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                            size: 12,
                            spacing: 1.5,
                            container: true,
                            mb: 2,
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/src/components/Popup/PopperForm.jsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                            sx: {
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: 1
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].MuiButton, {
                                    variant: "contained",
                                    sx: {
                                        borderRadius: 2,
                                        height: "30px",
                                        background: "linear-gradient(to top right, #ff512f, #dd2476)"
                                    },
                                    onClick: ()=>{
                                        try {
                                            if (onClose) onClose(null);
                                        } catch (error) {
                                            console.log(error);
                                            console.log([
                                                onClose
                                            ]);
                                        }
                                    },
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Popup/PopperForm.jsx",
                                    lineNumber: 79,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].MuiButton, {
                                    sx: {
                                        borderRadius: 2,
                                        height: "30px",
                                        background: "linear-gradient(to top right,rgba(0, 162, 199),rgb(0, 78, 187));",
                                        "&:disabled": {
                                            background: "linear-gradient(to left,#b0d4f0,#d3e9f9)",
                                            color: "whitesmoke"
                                        }
                                    },
                                    variant: "contained",
                                    type: "submit",
                                    children: "Update"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Popup/PopperForm.jsx",
                                    lineNumber: 97,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Popup/PopperForm.jsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Popup/PopperForm.jsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/Popup/PopperForm.jsx",
                lineNumber: 47,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
const __TURBOPACK__default__export__ = PopperForm;
}),
"[project]/src/components/Popup/Confirm.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-ssr] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Popover$2f$Popover$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Popover$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Popover/Popover.js [app-ssr] (ecmascript) <export default as Popover>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Check.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Clear$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Clear.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-ssr] (ecmascript) <export * as Page>");
;
;
;
;
;
;
function Confirm({ onClose, onConfirm, position, message = "Confirm Change?" }) {
    console.log({
        position
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Popover$2f$Popover$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Popover$3e$__["Popover"], {
        open: Boolean(position),
        anchorEl: position,
        onClose: onClose,
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "center"
        },
        transformOrigin: {
            vertical: "top",
            horizontal: "center"
        },
        PaperProps: {
            sx: {
                px: 2,
                py: 1,
                display: "flex",
                alignItems: "center",
                borderRadius: "10px"
            }
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                sx: {
                    mr: 1.5,
                    fontWeight: 500
                },
                children: message
            }, void 0, false, {
                fileName: "[project]/src/components/Popup/Confirm.jsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                color: "success",
                size: "small",
                onClick: (e)=>{
                    e.preventDefault();
                    onConfirm(e);
                },
                sx: {
                    "&:hover": {
                        bgcolor: "success.light",
                        color: "white"
                    }
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    fontSize: "small"
                }, void 0, false, {
                    fileName: "[project]/src/components/Popup/Confirm.jsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Popup/Confirm.jsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                color: "error",
                size: "small",
                onClick: onClose,
                sx: {
                    ml: 0.5,
                    "&:hover": {
                        bgcolor: "error.light",
                        color: "white"
                    }
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Clear$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    fontSize: "small"
                }, void 0, false, {
                    fileName: "[project]/src/components/Popup/Confirm.jsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Popup/Confirm.jsx",
                lineNumber: 45,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Popup/Confirm.jsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = Confirm;
}),
"[project]/src/components/Popup/index.jsx [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Popup$2f$Popup$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Popup/Popup.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Popup$2f$DeleteWithPassword$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Popup/DeleteWithPassword.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Popup$2f$SideDrawer$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Popup/SideDrawer.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Popup$2f$PopperForm$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Popup/PopperForm.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Popup$2f$Confirm$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Popup/Confirm.jsx [app-ssr] (ecmascript)");
;
;
;
;
;
}),
"[project]/src/components/index.jsx [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Datatable$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Datatable.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PaginationButtons$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/PaginationButtons.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SectionTitle$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SectionTitle.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PageTitle$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/PageTitle.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Toast$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Toast.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FlagAndCountryCode$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/FlagAndCountryCode.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SelectedActions$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SelectedActions.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DownloadTable$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/DownloadTable.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RequiredLabel$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RequiredLabel.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/Form/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Format$2f$index$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/Format/index.jsx [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Popup$2f$index$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/Popup/index.jsx [app-ssr] (ecmascript) <locals>");
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/src/components/DownloadTable.jsx [app-ssr] (ecmascript) <export default as DownloadTable>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DownloadTable",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DownloadTable$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DownloadTable$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/DownloadTable.jsx [app-ssr] (ecmascript)");
}),
"[project]/src/components/Datatable.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Icon",
    ()=>Icon,
    "ShowProgress",
    ()=>ShowProgress,
    "default",
    ()=>Datatable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Table$2f$Table$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Table/Table.js [app-ssr] (ecmascript) <export default as Table>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableBody$2f$TableBody$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableBody$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableBody/TableBody.js [app-ssr] (ecmascript) <export default as TableBody>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableCell/TableCell.js [app-ssr] (ecmascript) <export default as TableCell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableContainer$2f$TableContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableContainer$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableContainer/TableContainer.js [app-ssr] (ecmascript) <export default as TableContainer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableHead$2f$TableHead$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableHead$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableHead/TableHead.js [app-ssr] (ecmascript) <export default as TableHead>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TablePagination$2f$TablePagination$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TablePagination$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TablePagination/TablePagination.js [app-ssr] (ecmascript) <export default as TablePagination>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableRow/TableRow.js [app-ssr] (ecmascript) <export default as TableRow>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableFooter$2f$TableFooter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableFooter$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableFooter/TableFooter.js [app-ssr] (ecmascript) <export default as TableFooter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableSortLabel$2f$TableSortLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableSortLabel$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableSortLabel/TableSortLabel.js [app-ssr] (ecmascript) <export default as TableSortLabel>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Toolbar$2f$Toolbar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Toolbar$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Toolbar/Toolbar.js [app-ssr] (ecmascript) <export default as Toolbar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Paper/Paper.js [app-ssr] (ecmascript) <export default as Paper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Checkbox/Checkbox.js [app-ssr] (ecmascript) <export default as Checkbox>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-ssr] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Tooltip/Tooltip.js [app-ssr] (ecmascript) <export default as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Select$2f$Select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Select/Select.js [app-ssr] (ecmascript) <export default as Select>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Menu$2f$Menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Menu/Menu.js [app-ssr] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/MenuItem/MenuItem.js [app-ssr] (ecmascript) <export default as MenuItem>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CircularProgress/CircularProgress.js [app-ssr] (ecmascript) <export default as CircularProgress>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-ssr] (ecmascript) <export * as Page>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PaginationButtons$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/PaginationButtons.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$index$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/index.jsx [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DownloadTable$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DownloadTable$3e$__ = __turbopack_context__.i("[project]/src/components/DownloadTable.jsx [app-ssr] (ecmascript) <export default as DownloadTable>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DownloadTable$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/DownloadTable.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
}
function getComparator(order, orderBy) {
    return order === "desc" ? (a, b)=>descendingComparator(a, b, orderBy) : (a, b)=>-descendingComparator(a, b, orderBy);
}
function Icon(attr) {
    const btnStyle = {
        fontSize: "18px",
        height: "20px",
        width: "20px",
        padding: "0",
        filter: "drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.2))"
    };
    let aria = Object.keys(attr).filter((key)=>key.indexOf("aria") > -1 || key.indexOf("data") > -1).reduce((a, c)=>{
        a[c] = attr[c];
        return a;
    }, {});
    const iconBtn = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
        ...aria,
        disabled: attr.disabled,
        tabIndex: attr.tabIndex ?? 0,
        onClick: attr.onClick,
        "aria-label": attr.label || "icon-button",
        sx: {
            color: "black",
            mx: "10px",
            p: 0,
            ...attr.disabled ? {
                "&.Mui-disabled": {
                    cursor: "not-allowed",
                    pointerEvents: "auto"
                }
            } : {
                cursor: "pointer"
            },
            ...attr.sx
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                className: attr.iconClass,
                style: {
                    ...attr.style || btnStyle
                },
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/components/Datatable.jsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            attr.showLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontSize: "13px",
                    marginLeft: "6px",
                    opacity: "0.6"
                },
                children: attr.label
            }, void 0, false, {
                fileName: "[project]/src/components/Datatable.jsx",
                lineNumber: 86,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Datatable.jsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
    return attr?.disableTooltip ? iconBtn : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
        title: attr.label,
        placement: "top",
        arrow: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: iconBtn
        }, void 0, false, {
            fileName: "[project]/src/components/Datatable.jsx",
            lineNumber: 102,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Datatable.jsx",
        lineNumber: 101,
        columnNumber: 5
    }, this);
}
function ColHeader(attr) {
    const col = attr.col;
    const feature = col?.feature?.reduce((a, c)=>{
        a[c] = true;
        return a;
    }, {});
    const [isHovered, setIsHovered] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const alignToJustifyContent = {
        start: "flex-start",
        center: "center",
        end: "flex-end",
        left: "flex-start",
        right: "flex-end"
    };
    const isEndOrRight = [
        "end",
        "right"
    ].includes(col.align ?? "start");
    return attr.visible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
        align: col.align ?? "start",
        padding: "none",
        sortDirection: attr.sorted,
        sx: {
            paddingLeft: "8px",
            paddingRight: "4px",
            top: 0,
            bgcolor: attr.headerColor ? `${attr.headerColor} !important` : "#063686",
            color: "white",
            zIndex: attr.locked ? 4 : 2,
            fontWeight: "600",
            fontSize: "14px",
            minWidth: col.width ?? 200,
            width: col.width || 200,
            height: "36px",
            textAlign: col.align ?? "start",
            ...attr.locked && {
                position: "sticky",
                left: `${attr.lockOffset}px`,
                boxShadow: "2px 0 5px -2px rgba(0, 0, 0, 0.3)"
            }
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
            sx: {
                display: "flex",
                alignItems: "center",
                justifyContent: alignToJustifyContent[col.align ?? "start"]
            },
            children: [
                feature?.sortable && isEndOrRight && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableSortLabel$2f$TableSortLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableSortLabel$3e$__["TableSortLabel"], {
                    active: !!attr.sorted || isHovered,
                    direction: attr.sorted ? attr.sorted : "asc",
                    onClick: (event)=>{
                        attr.onSort(event, col.id);
                    },
                    sx: {
                        mr: 0.2,
                        color: "white",
                        visibility: attr.sorted || isHovered ? "visible" : "hidden",
                        "& .MuiTableSortLabel-icon": {
                            color: "white !important"
                        }
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/Datatable.jsx",
                    lineNumber: 159,
                    columnNumber: 13
                }, this),
                feature?.sortable ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    component: "span",
                    onClick: (event)=>{
                        attr.onSort(event, col.id);
                    },
                    onMouseEnter: ()=>setIsHovered(true),
                    onMouseLeave: ()=>setIsHovered(false),
                    sx: {
                        cursor: "pointer"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                        title: "click to sort",
                        placement: "top",
                        children: col.label
                    }, void 0, false, {
                        fileName: "[project]/src/components/Datatable.jsx",
                        lineNumber: 187,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Datatable.jsx",
                    lineNumber: 176,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: col.label
                }, void 0, false, {
                    fileName: "[project]/src/components/Datatable.jsx",
                    lineNumber: 192,
                    columnNumber: 13
                }, this),
                feature?.lockable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                    title: "Toggle Column Lock",
                    placement: "top",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                        size: "small",
                        onClick: (e)=>{
                            e.stopPropagation();
                            attr.onLock(col.id);
                        },
                        sx: {
                            color: "white",
                            pl: 0.5,
                            m: 0,
                            fontSize: "12px",
                            opacity: 0.5
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: `fa fa-${attr.locked ? "lock" : "lock-open"}`,
                            style: {
                                fontSize: "12px",
                                marginLeft: "3px"
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/Datatable.jsx",
                            lineNumber: 210,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Datatable.jsx",
                        lineNumber: 196,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Datatable.jsx",
                    lineNumber: 195,
                    columnNumber: 13
                }, this),
                feature?.sortable && !isEndOrRight && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableSortLabel$2f$TableSortLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableSortLabel$3e$__["TableSortLabel"], {
                    active: !!attr.sorted || isHovered,
                    direction: attr.sorted ? attr.sorted : "asc",
                    onClick: (event)=>{
                        attr.onSort(event, col.id);
                    },
                    sx: {
                        ml: 0.2,
                        color: "white",
                        visibility: attr.sorted || isHovered ? "visible" : "hidden",
                        "& .MuiTableSortLabel-icon": {
                            color: "white !important"
                        }
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/Datatable.jsx",
                    lineNumber: 218,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Datatable.jsx",
            lineNumber: 151,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Datatable.jsx",
        lineNumber: 125,
        columnNumber: 7
    }, this);
}
function Datatable({ parentData = null, hideToolbar = false, hideDownload = false, hideColumnSelector = false, columns, disabled, ...attr }) {
    const [hidePagination, setHidePagination] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const [showSearch, setShowSearch] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const [order, setOrder] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]("asc");
    const [orderBy, setOrderBy] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]("");
    const [selected, setSelected] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]([]);
    const [page, setPage] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](0);
    const [pageSize, setRowsPerPage] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](attr.pageSize ?? 10);
    const [showSelectColumns, setShowSelectColumns] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](null);
    const [searchTerms, setSearchTerms] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]({});
    const [lockedColumns, setLockedColumns] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]({});
    const [lockedRows, setLockedRows] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]({});
    const [filterValues, setFilterValues] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]({});
    const [categoryFilterAnchor, setCategoryFilterAnchor] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](null);
    const [categoryFilter, setCategoryFilter] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]([]);
    const tableRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"]();
    const [statusFilterAnchor, setStatusFilterAnchor] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](null);
    const [statusFilter, setStatusFilter] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]([]);
    const disabledColumns = attr.disabledColumns || [];
    const defaultHiddenColumns = attr.defaultHiddenColumns || [];
    const [columnVisibility, setColumnVisibility] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](()=>columns.reduce((acc, cell)=>({
                ...acc,
                [cell.id]: !cell.hidden && !defaultHiddenColumns.includes(cell.id)
            }), {}));
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        setHidePagination(attr.hidePagination);
    }, [
        attr.hidePagination
    ]);
    const hasSearchableColumn = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        return columns.some((col)=>col?.feature?.includes("searchable"));
    }, [
        columns
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        setColumnVisibility(columns.reduce((acc, cell)=>({
                ...acc,
                [cell.id]: !cell.hidden && !defaultHiddenColumns.includes(cell.id)
            }), {}));
    }, [
        columns
    ]);
    const handleColumnToggle = (columnId)=>{
        if (disabledColumns.includes(columnId)) return;
        setColumnVisibility((prev)=>({
                ...prev,
                [columnId]: !prev[columnId]
            }));
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (!attr.onSelect) return;
        attr.onSelect(selected);
    }, [
        selected
    ]);
    const data = attr.data;
    const loading = "isLoading" in attr ? attr.isLoading : !data || data.length === 0;
    // const loading = attr.data === undefined;
    const effectiveStatusOptions = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (!data || data.length === 0 || !attr.statusOptions?.length) {
            return [];
        }
        const uniqueStatuses = [
            ...new Set(data.map((row)=>String(row.status)))
        ].filter((value)=>value && value !== "null" && value !== "undefined");
        return attr.statusOptions.filter((option)=>uniqueStatuses.includes(option.value)).map(({ value, label })=>({
                value,
                label
            })).sort((a, b)=>a.label.localeCompare(b.label));
    }, [
        data,
        attr.statusOptions
    ]);
    const getFilterOptions = (columnId)=>{
        if (!data) return [];
        const uniqueValues = [
            ...new Set(data.map((row)=>String(row[columnId])))
        ].sort();
        return uniqueValues.filter((value)=>value !== undefined && value !== null && value !== "");
    };
    const handleOpenStatusFilter = (event)=>setStatusFilterAnchor(event.currentTarget);
    const handleCloseStatusFilter = ()=>setStatusFilterAnchor(null);
    const handleStatusFilterToggle = (value)=>{
        setStatusFilter((prev)=>prev.includes(value) ? prev.filter((item)=>item !== value) : [
                ...prev,
                value
            ]);
        setPage(0);
    };
    const onLockColumn = (columnId)=>{
        setLockedColumns((prev)=>({
                ...prev,
                [columnId]: !prev[columnId]
            }));
    };
    const toggleRowLock = (rowId)=>{
        setLockedRows((prev)=>({
                ...prev,
                [rowId]: !prev[rowId]
            }));
    };
    const onSort = (event, property)=>{
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };
    const handleSelectAllClick = (event)=>{
        if (event.target.checked) {
            const newSelected = filteredRows.map((n)=>n.id);
            setSelected(newSelected);
        } else {
            setSelected([]);
        }
    };
    const onCheckRow = (event, id)=>{
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) newSelected = [
            ...selected,
            id
        ];
        else if (selectedIndex === 0) newSelected = selected.slice(1);
        else if (selectedIndex === selected.length - 1) newSelected = selected.slice(0, -1);
        else newSelected = [
            ...selected.slice(0, selectedIndex),
            ...selected.slice(selectedIndex + 1)
        ];
        setSelected(newSelected);
    };
    const handleChangePage = (event, newPage)=>setPage(newPage);
    const handleChangeRowsPerPage = (event)=>{
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleOpenColumnMenu = (event)=>setShowSelectColumns(event.currentTarget);
    const handleCloseColumnMenu = ()=>setShowSelectColumns(null);
    const handleOpenCategoryFilter = (event)=>setCategoryFilterAnchor(event.currentTarget);
    const handleCloseCategoryFilter = ()=>setCategoryFilterAnchor(null);
    const handleCategoryFilterToggle = (value)=>{
        setCategoryFilter((prev)=>prev.includes(value) ? prev.filter((item)=>item !== value) : [
                ...prev,
                value
            ]);
        setPage(0);
    };
    const onSearch = (event, columnId)=>{
        setSearchTerms((prev)=>({
                ...prev,
                [columnId]: event.target.value
            }));
        setPage(0);
    };
    const onFilterChange = (event, columnId)=>{
        setFilterValues((prev)=>({
                ...prev,
                [columnId]: event.target.value
            }));
        setPage(0);
    };
    const getRowValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((row, columnId)=>{
        const col = columns.find((c)=>c.id === columnId);
        if (!col) return "";
        if (col.data) {
            return row[col.data] ?? "";
        }
        if (col.render) {
            const rendered = col.render(row, parentData);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DownloadTable$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxToText"])(rendered);
        }
        return row[columnId] ?? "";
    }, [
        columns,
        parentData
    ]);
    const filteredRows = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        const rows = Array.isArray(data) ? data : [];
        return rows.filter((row)=>{
            if (!row) return false;
            const matchesSearch = Object.entries(searchTerms).every(([column, term])=>!term || String(row[column]).toLowerCase().includes(term.toLowerCase()) || String(getRowValue(row, column)).toLowerCase().includes(term.toLowerCase()));
            const matchesFilters = Object.entries(filterValues).every(([column, value])=>!value || String(row[column]) === value);
            const matchesCategory = categoryFilter.length === 0 || categoryFilter.includes("client") && categoryFilter.includes("vendor") && row.category?.isClient && row.category?.isVendor || categoryFilter.includes("client") && !categoryFilter.includes("vendor") && row.category?.isClient || categoryFilter.includes("vendor") && !categoryFilter.includes("client") && row.category?.isVendor;
            const matchesBidStatus = statusFilter.length === 0 || statusFilter.includes(row.status);
            return matchesSearch && matchesFilters && matchesCategory && matchesBidStatus;
        });
    }, [
        data,
        searchTerms,
        filterValues,
        categoryFilter,
        statusFilter
    ]);
    const visibleRows = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        const sorted = [
            ...filteredRows
        ].sort(getComparator(order, orderBy));
        return hidePagination ? sorted : sorted.slice(page * pageSize, page * pageSize + pageSize);
    }, [
        order,
        orderBy,
        page,
        pageSize,
        filteredRows,
        hidePagination
    ]);
    const isSelected = (id)=>selected.indexOf(id) !== -1;
    const headerRowHeight = 0;
    let stickyOffset = headerRowHeight + 40;
    const getLockedColumnOffset = (columnId)=>{
        let offset = 0;
        for (const cell of columns){
            if (!columnVisibility[cell.id] || !lockedColumns[cell.id]) continue;
            if (cell.id === columnId) break;
            offset += parseInt(cell.width, 10) || 180;
        }
        return offset;
    };
    const calculateColumnTotals = (rows, columns, columnVisibility, parentData)=>{
        const totals = {};
        columns.forEach((col)=>{
            if (col?.feature?.includes("total") && columnVisibility[col.id]) {
                const sum = rows.reduce((acc, row)=>{
                    let value;
                    if (col.data) {
                        value = parseFloat(row[col.data]);
                    } else if (col.render) {
                        let temp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DownloadTable$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxToText"])(col.render(row, parentData)).replace(/[^\d.-]+/g, "");
                        value = parseFloat(temp);
                    }
                    const numericValue = isNaN(value) ? 0 : value;
                    return acc + numericValue;
                }, 0);
                totals[col.id] = sum;
            }
        });
        return totals;
    };
    const columnTotals = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>calculateColumnTotals(visibleRows, columns, columnVisibility, parentData), [
        visibleRows,
        columns,
        columnVisibility,
        parentData
    ]);
    const columnTotalsOverall = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>calculateColumnTotals(filteredRows, columns, columnVisibility, parentData), [
        filteredRows,
        columns,
        columnVisibility,
        parentData
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        setSelected([]);
    }, [
        data
    ]);
    const firstVisibleColumn = columns.find((col)=>columnVisibility[col.id])?.id;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            minWidth: "100%"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    p: 0.5
                },
                children: [
                    !hideToolbar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            width: "100%"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Toolbar$2f$Toolbar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Toolbar$3e$__["Toolbar"], {
                                sx: {
                                    minHeight: "52px !important",
                                    py: 1,
                                    px: "0 !important",
                                    display: "flex",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                    justifyContent: "space-between"
                                },
                                children: [
                                    attr.back && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        iconClass: "fa fa-arrow-left",
                                        onClick: attr.back,
                                        label: "Back"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Datatable.jsx",
                                        lineNumber: 583,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        sx: {
                                            flex: "1",
                                            fontWeight: "bold"
                                        },
                                        variant: "h5",
                                        component: "div",
                                        children: attr.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Datatable.jsx",
                                        lineNumber: 589,
                                        columnNumber: 15
                                    }, this),
                                    attr.extra,
                                    attr.upload && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        iconClass: "fas fa-upload",
                                        onClick: attr.upload,
                                        label: "Upload"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Datatable.jsx",
                                        lineNumber: 598,
                                        columnNumber: 17
                                    }, this),
                                    attr.categoryFilter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        iconClass: "fas fa-tag",
                                        onClick: handleOpenCategoryFilter,
                                        label: "Filter by category"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Datatable.jsx",
                                        lineNumber: 605,
                                        columnNumber: 17
                                    }, this),
                                    attr.statusFilter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        iconClass: "fas fa-tag",
                                        onClick: handleOpenStatusFilter,
                                        label: "Filter by status"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Datatable.jsx",
                                        lineNumber: 612,
                                        columnNumber: 17
                                    }, this),
                                    attr.add && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        iconClass: "fas fa-plus",
                                        onClick: attr.add,
                                        label: "Add"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Datatable.jsx",
                                        lineNumber: 619,
                                        columnNumber: 17
                                    }, this),
                                    !hideDownload && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        iconClass: "fas fa-download",
                                        label: "Download Table Data",
                                        onClick: (e)=>{
                                            const visibleColumns = columns.filter((col)=>columnVisibility[col.id]);
                                            const headers = visibleColumns.map((col)=>col.label);
                                            const dataRows = filteredRows.map((row)=>{
                                                return visibleColumns.map((col)=>{
                                                    if (col.data) {
                                                        return row?.[col.data] ?? "";
                                                    } else if (col.render) {
                                                        const rendered = col.render(row, parentData);
                                                        return rendered;
                                                    }
                                                    return "";
                                                });
                                            });
                                            const totalsRow = visibleColumns.map((col, index)=>{
                                                if (index === 0 && col.id === firstVisibleColumn) {
                                                    return "Total";
                                                }
                                                return col?.feature?.includes("total") ? columnTotalsOverall[col.id] || "0.00" : "";
                                            });
                                            const exportData = [
                                                headers,
                                                ...dataRows,
                                                totalsRow
                                            ];
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DownloadTable$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DownloadTable$3e$__["DownloadTable"])({
                                                info: exportData,
                                                title: attr.title,
                                                replaceChars: attr.replaceChars
                                            });
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Datatable.jsx",
                                        lineNumber: 622,
                                        columnNumber: 17
                                    }, this),
                                    hasSearchableColumn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        iconClass: "fas fa-search",
                                        onClick: (e)=>{
                                            setShowSearch(!showSearch);
                                        },
                                        label: showSearch ? "Hide Search" : "Show Search"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Datatable.jsx",
                                        lineNumber: 664,
                                        columnNumber: 17
                                    }, this),
                                    !hideColumnSelector && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        iconClass: "fas fa-filter",
                                        onClick: handleOpenColumnMenu,
                                        label: "Show / Hide Columns"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Datatable.jsx",
                                        lineNumber: 673,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Datatable.jsx",
                                lineNumber: 571,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Menu$2f$Menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                anchorEl: showSelectColumns,
                                open: Boolean(showSelectColumns),
                                onClose: handleCloseColumnMenu,
                                children: columns.map((cell)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                        onClick: ()=>handleColumnToggle(cell.id),
                                        disabled: disabledColumns.includes(cell.id),
                                        sx: {
                                            fontSize: 14,
                                            px: 2,
                                            py: 0.5
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__["Checkbox"], {
                                                checked: columnVisibility[cell.id],
                                                size: "small"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Datatable.jsx",
                                                lineNumber: 696,
                                                columnNumber: 19
                                            }, this),
                                            cell.label
                                        ]
                                    }, cell.id, true, {
                                        fileName: "[project]/src/components/Datatable.jsx",
                                        lineNumber: 686,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/Datatable.jsx",
                                lineNumber: 680,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Menu$2f$Menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                anchorEl: statusFilterAnchor,
                                open: Boolean(statusFilterAnchor),
                                onClose: handleCloseStatusFilter,
                                children: effectiveStatusOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                        onClick: ()=>handleStatusFilterToggle(option.value),
                                        sx: {
                                            fontSize: 14,
                                            pr: 3,
                                            py: 0.5
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__["Checkbox"], {
                                                checked: statusFilter.length === 0 || statusFilter.includes(option.value),
                                                size: "small"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Datatable.jsx",
                                                lineNumber: 712,
                                                columnNumber: 19
                                            }, this),
                                            option.label
                                        ]
                                    }, option.value, true, {
                                        fileName: "[project]/src/components/Datatable.jsx",
                                        lineNumber: 707,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/Datatable.jsx",
                                lineNumber: 701,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Menu$2f$Menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                anchorEl: categoryFilterAnchor,
                                open: Boolean(categoryFilterAnchor),
                                onClose: handleCloseCategoryFilter,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                        onClick: ()=>handleCategoryFilterToggle("client"),
                                        sx: {
                                            fontSize: 14,
                                            px: 2,
                                            py: 0.5
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__["Checkbox"], {
                                                checked: categoryFilter.includes("client"),
                                                size: "small"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Datatable.jsx",
                                                lineNumber: 732,
                                                columnNumber: 17
                                            }, this),
                                            "Client"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Datatable.jsx",
                                        lineNumber: 728,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                        onClick: ()=>handleCategoryFilterToggle("vendor"),
                                        sx: {
                                            fontSize: 14,
                                            px: 2,
                                            py: 0.5
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__["Checkbox"], {
                                                checked: categoryFilter.includes("vendor"),
                                                size: "small"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Datatable.jsx",
                                                lineNumber: 742,
                                                columnNumber: 17
                                            }, this),
                                            "Vendor"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Datatable.jsx",
                                        lineNumber: 738,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Datatable.jsx",
                                lineNumber: 723,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Datatable.jsx",
                        lineNumber: 570,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            position: "relative"
                        },
                        children: [
                            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                                        sx: {
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            backgroundColor: "rgba(255, 255, 255, 0.5)",
                                            zIndex: 9
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Datatable.jsx",
                                        lineNumber: 754,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                                        sx: {
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)",
                                            display: "inline-flex",
                                            zIndex: 10
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__["CircularProgress"], {
                                                size: 70,
                                                thickness: 1
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Datatable.jsx",
                                                lineNumber: 775,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                                                sx: {
                                                    top: 0,
                                                    left: 0,
                                                    bottom: 0,
                                                    right: 0,
                                                    position: "absolute",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                                                    sx: {
                                                        fontSize: "10px",
                                                        color: "secondary.main",
                                                        fontWeight: "bold"
                                                    },
                                                    children: "Loading"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Datatable.jsx",
                                                    lineNumber: 788,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Datatable.jsx",
                                                lineNumber: 776,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Datatable.jsx",
                                        lineNumber: 765,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableContainer$2f$TableContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableContainer$3e$__["TableContainer"], {
                                component: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"],
                                sx: {
                                    boxShadow: 2,
                                    borderRadius: 2,
                                    maxHeight: attr.maxHeight || (attr?.withSelected ? "calc(100vh - 293px)" : "calc(100vh - 250px)"),
                                    // maxHeight: "545px",
                                    overflow: "auto",
                                    position: "relative",
                                    minWidth: "100%"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Table$2f$Table$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__["Table"], {
                                    ref: tableRef,
                                    stickyHeader: true,
                                    size: "small",
                                    sx: {
                                        minWidth: "100%",
                                        overflowX: "scroll",
                                        tableLayout: "fixed",
                                        "& tbody td": {
                                            height: "32px",
                                            border: "1px solid rgba(0, 0, 0, 0.12)",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap"
                                        },
                                        "& tbody tr": {
                                            height: "32px"
                                        },
                                        "& thead th": {
                                            border: "1px solid rgba(255, 255, 255, 0.4)"
                                        },
                                        "& tfoot td": {
                                            border: "1px solid rgba(0, 0, 0, 0.12)",
                                            fontWeight: "bold",
                                            color: "black",
                                            fontSize: "13px",
                                            height: "32px"
                                        },
                                        filter: disabled ? "grayscale(1)" : ""
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableHead$2f$TableHead$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableHead$3e$__["TableHead"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                                                    children: [
                                                        attr.rowLockable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                            sx: {
                                                                position: "sticky",
                                                                top: 0,
                                                                zIndex: 5,
                                                                backgroundColor: "white",
                                                                width: "50px !important"
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Datatable.jsx",
                                                            lineNumber: 851,
                                                            columnNumber: 21
                                                        }, this),
                                                        attr.rowSelectable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                            sx: {
                                                                position: "sticky",
                                                                top: 0,
                                                                bgcolor: attr.headerColor ? `${attr.headerColor} !important` : "#04662b",
                                                                width: "35.5px !important",
                                                                maxWidth: "35.5px !important",
                                                                p: "0 !important"
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                                                                sx: {
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    alignItems: "center"
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__["Checkbox"], {
                                                                    color: "white",
                                                                    size: "small",
                                                                    inputProps: {
                                                                        "aria-label": "select all rows"
                                                                    },
                                                                    sx: {
                                                                        width: "16px !important",
                                                                        height: "16px !important",
                                                                        padding: 0,
                                                                        margin: 0,
                                                                        "& .MuiSvgIcon-root": {
                                                                            width: "16px !important",
                                                                            height: "16px !important",
                                                                            color: "white"
                                                                        }
                                                                    },
                                                                    indeterminate: selected.length > 0 && selected.length < filteredRows.length,
                                                                    checked: filteredRows.length > 0 && selected.length === filteredRows.length,
                                                                    onChange: handleSelectAllClick
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/Datatable.jsx",
                                                                    lineNumber: 881,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Datatable.jsx",
                                                                lineNumber: 874,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Datatable.jsx",
                                                            lineNumber: 862,
                                                            columnNumber: 21
                                                        }, this),
                                                        columns.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ColHeader, {
                                                                col: col,
                                                                visible: columnVisibility[col.id],
                                                                locked: lockedColumns[col.id],
                                                                sorted: orderBy === col.id ? order : false,
                                                                onSort: onSort,
                                                                headerColor: attr.headerColor ?? "#063686",
                                                                onLock: onLockColumn,
                                                                lockOffset: getLockedColumnOffset(col.id)
                                                            }, col.id, false, {
                                                                fileName: "[project]/src/components/Datatable.jsx",
                                                                lineNumber: 910,
                                                                columnNumber: 21
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/Datatable.jsx",
                                                    lineNumber: 849,
                                                    columnNumber: 17
                                                }, this),
                                                showSearch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                                                    children: [
                                                        attr.rowLockable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                            sx: {
                                                                position: "sticky",
                                                                top: headerRowHeight,
                                                                zIndex: 5,
                                                                backgroundColor: "white",
                                                                border: "1px solid rgba(0, 0, 0, 0.12) !important",
                                                                width: "20px"
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Datatable.jsx",
                                                            lineNumber: 926,
                                                            columnNumber: 23
                                                        }, this),
                                                        attr.rowSelectable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                            sx: {
                                                                position: "sticky",
                                                                top: headerRowHeight,
                                                                border: "1px solid rgba(0, 0, 0, 0.12) !important",
                                                                zIndex: 5,
                                                                backgroundColor: "white",
                                                                width: "35px !important"
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Datatable.jsx",
                                                            lineNumber: 938,
                                                            columnNumber: 23
                                                        }, this),
                                                        columns.map((col)=>{
                                                            const searchable = col?.feature?.includes("searchable");
                                                            const filterable = col?.feature?.includes("filterable");
                                                            if (!columnVisibility[col.id]) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {}, void 0, false);
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                                align: col.align ?? "start",
                                                                sx: {
                                                                    top: headerRowHeight,
                                                                    zIndex: lockedColumns[col.id] ? 5 : 1,
                                                                    backgroundColor: "white",
                                                                    border: "1px solid rgba(0, 0, 0, 0.12) !important",
                                                                    minWidth: col.width ?? 200,
                                                                    py: 0.5,
                                                                    pr: 1,
                                                                    pl: 0,
                                                                    ...lockedColumns[col.id] && {
                                                                        position: "sticky",
                                                                        left: `${getLockedColumnOffset(col.id)}px`,
                                                                        boxShadow: "2px 0 5px -2px rgba(0, 0, 0, 0.3)"
                                                                    }
                                                                },
                                                                children: [
                                                                    searchable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].InputTextField, {
                                                                        sx: {
                                                                            mx: 1,
                                                                            width: "calc(100% - 8px)",
                                                                            height: "24px",
                                                                            "& .MuiInputBase-root": {
                                                                                height: "24px",
                                                                                fontSize: "12px"
                                                                            },
                                                                            "& .MuiInputBase-input": {
                                                                                padding: "8px 10px",
                                                                                textAlign: col.align ?? "start"
                                                                            }
                                                                        },
                                                                        size: "small",
                                                                        type: "text",
                                                                        value: searchTerms[col.id] || "",
                                                                        onChange: (e)=>onSearch(e, col.id),
                                                                        placeholder: `Search ${col.label}`
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/Datatable.jsx",
                                                                        lineNumber: 974,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    filterable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Select$2f$Select$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                                                        value: filterValues[col.id] || "",
                                                                        onChange: (e)=>onFilterChange(e, col.id),
                                                                        size: "small",
                                                                        displayEmpty: true,
                                                                        sx: {
                                                                            ml: 1,
                                                                            width: "calc(100% - 8px)",
                                                                            height: "24px",
                                                                            display: "flex",
                                                                            justifyContent: "center",
                                                                            alignItems: "center",
                                                                            "& .MuiSelect-select": {
                                                                                padding: "4px",
                                                                                fontSize: "12px !important",
                                                                                display: "flex",
                                                                                justifyContent: "center",
                                                                                alignItems: "center"
                                                                            }
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                                                                value: "",
                                                                                sx: {
                                                                                    pl: 1,
                                                                                    fontSize: "12px",
                                                                                    pl: 2,
                                                                                    minHeight: "24px"
                                                                                },
                                                                                children: "All"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/Datatable.jsx",
                                                                                lineNumber: 1017,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            getFilterOptions(col.id).map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                                                                    value: opt,
                                                                                    sx: {
                                                                                        pl: 2,
                                                                                        fontSize: "12px",
                                                                                        minHeight: "24px"
                                                                                    },
                                                                                    children: opt === "true" ? "Active" : opt === "false" ? "Inactive" : opt
                                                                                }, opt, false, {
                                                                                    fileName: "[project]/src/components/Datatable.jsx",
                                                                                    lineNumber: 1029,
                                                                                    columnNumber: 33
                                                                                }, this))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/Datatable.jsx",
                                                                        lineNumber: 996,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, col.id, true, {
                                                                fileName: "[project]/src/components/Datatable.jsx",
                                                                lineNumber: 954,
                                                                columnNumber: 25
                                                            }, this);
                                                        })
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/Datatable.jsx",
                                                    lineNumber: 924,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Datatable.jsx",
                                            lineNumber: 848,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableBody$2f$TableBody$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableBody$3e$__["TableBody"], {
                                            children: loading ? // [...Array(7)].map((_, rowIndex) => (
                                            //   <TableRow key={`skeleton-${rowIndex}`}>
                                            //     {attr.rowLockable && <TableCell />}
                                            //     {attr.rowSelectable && <TableCell />}
                                            //     {columns.map(
                                            //       (col) =>
                                            //         columnVisibility[col.id] && (
                                            //           <TableCell
                                            //             key={col.id}
                                            //             sx={{
                                            //               minWidth: col.width ?? "140px",
                                            //               height: "30px",
                                            //             }}
                                            //           >
                                            //             <Skeleton
                                            //               animation="wave"
                                            //               height="30px"
                                            //               sx={{ bgcolor: "grey.100" }}
                                            //             />
                                            //           </TableCell>
                                            //         )
                                            //     )}
                                            //   </TableRow>
                                            // ))
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    colSpan: columns.filter((col)=>columnVisibility[col.id]).length + (attr.rowLockable ? 1 : 0) + (attr.rowSelectable ? 1 : 0),
                                                    sx: {
                                                        height: "320px !important",
                                                        position: "relative"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Datatable.jsx",
                                                    lineNumber: 1080,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Datatable.jsx",
                                                lineNumber: 1079,
                                                columnNumber: 19
                                            }, this) : visibleRows.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    visibleRows.map((row, index)=>{
                                                        if (!row) return null;
                                                        const isItemSelected = row?.id ? isSelected(row.id) : false;
                                                        const isLocked = lockedRows[row.id];
                                                        const rowTop = isLocked ? stickyOffset : "auto";
                                                        if (isLocked) {
                                                            stickyOffset += 33;
                                                        }
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                                                            hover: true,
                                                            tabIndex: -1,
                                                            selected: isItemSelected,
                                                            sx: {
                                                                // wordBreak: "break-word",
                                                                // whiteSpace: "pre-wrap",
                                                                // overflowWrap: "break-word",
                                                                position: isLocked ? "sticky" : "static",
                                                                top: isLocked ? `${rowTop}px` : "auto",
                                                                zIndex: isLocked ? 5 : 0,
                                                                "&.Mui-selected": {
                                                                    backgroundColor: "#c1e3ff !important"
                                                                },
                                                                ":hover": {
                                                                    backgroundColor: "#effeff !important"
                                                                },
                                                                "&.Mui-selected:hover": {
                                                                    backgroundColor: "#a7d4fc !important"
                                                                },
                                                                backgroundColor: isLocked ? "#e4f5f7" : index & 1 ? "#f0f0f0" : "background.default"
                                                            },
                                                            children: [
                                                                attr.rowLockable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                                    sx: {
                                                                        width: "20px"
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                                                        title: "Toggle Row Lock",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                                                            size: "small",
                                                                            "aria-label": "toggle row lock",
                                                                            onClick: (e)=>{
                                                                                e.stopPropagation();
                                                                                toggleRowLock(row.id);
                                                                            },
                                                                            sx: {
                                                                                color: "grey",
                                                                                pl: 0.5,
                                                                                m: 0,
                                                                                fontSize: "12px",
                                                                                opacity: 0.5
                                                                            },
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                                className: `fa fa-${lockedRows[row.id] ? "lock" : "lock-open"}`
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/Datatable.jsx",
                                                                                lineNumber: 1153,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/Datatable.jsx",
                                                                            lineNumber: 1138,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/Datatable.jsx",
                                                                        lineNumber: 1137,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/Datatable.jsx",
                                                                    lineNumber: 1136,
                                                                    columnNumber: 29
                                                                }, this),
                                                                attr.rowSelectable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                                    sx: {
                                                                        width: "35.5px !important",
                                                                        maxWidth: "35.5px !important",
                                                                        p: "0 !important"
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                                                                        sx: {
                                                                            display: "flex",
                                                                            justifyContent: "center",
                                                                            alignItems: "center"
                                                                        },
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__["Checkbox"], {
                                                                            color: "primary",
                                                                            size: "small",
                                                                            inputProps: {
                                                                                "aria-label": "select row"
                                                                            },
                                                                            sx: {
                                                                                width: "16px !important",
                                                                                height: "16px !important",
                                                                                padding: 0,
                                                                                margin: 0,
                                                                                "& .MuiSvgIcon-root": {
                                                                                    width: "16px !important",
                                                                                    height: "16px !important"
                                                                                }
                                                                            },
                                                                            onClick: (event)=>onCheckRow(event, row.id),
                                                                            checked: isItemSelected
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/Datatable.jsx",
                                                                            lineNumber: 1177,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/Datatable.jsx",
                                                                        lineNumber: 1170,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/Datatable.jsx",
                                                                    lineNumber: 1163,
                                                                    columnNumber: 29
                                                                }, this),
                                                                columns.map((cell)=>columnVisibility[cell.id] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                                        align: cell.align || "start",
                                                                        sx: {
                                                                            // textOverflow: "ellipsis",
                                                                            // overflow: "hidden",
                                                                            whiteSpace: "nowrap",
                                                                            // wordBreak: "break-word",
                                                                            // overflowWrap: "break-word",
                                                                            textAlign: cell.align || "start",
                                                                            p: "0 !important",
                                                                            m: "0 !important",
                                                                            height: "20px",
                                                                            fontSize: "13px",
                                                                            fontWeight: "500",
                                                                            minWidth: "100px",
                                                                            width: cell.width || "150px",
                                                                            px: "8px !important",
                                                                            ...lockedColumns[cell.id] && {
                                                                                position: "sticky",
                                                                                left: `${getLockedColumnOffset(cell.id)}px`,
                                                                                backgroundColor: "inherit",
                                                                                boxShadow: "2px 0 5px -2px rgba(0, 0, 0, 0.3)",
                                                                                zIndex: 2
                                                                            }
                                                                        },
                                                                        children: cell.data ? row?.[cell.data] ?? "" : cell.render?.(row, parentData) ?? ""
                                                                    }, cell.id, false, {
                                                                        fileName: "[project]/src/components/Datatable.jsx",
                                                                        lineNumber: 1200,
                                                                        columnNumber: 33
                                                                    }, this))
                                                            ]
                                                        }, row?.id || `row-${index}`, true, {
                                                            fileName: "[project]/src/components/Datatable.jsx",
                                                            lineNumber: 1107,
                                                            columnNumber: 25
                                                        }, this);
                                                    }),
                                                    filteredRows.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                            colSpan: columns.length + 2
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Datatable.jsx",
                                                            lineNumber: 1241,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Datatable.jsx",
                                                        lineNumber: 1240,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    colSpan: columns.filter((col)=>columnVisibility[col.id]).length + (attr.rowLockable ? 1 : 0) + (attr.rowSelectable ? 1 : 0),
                                                    align: "start",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                                                        sx: {
                                                            width: {
                                                                xs: "100vw",
                                                                md: "calc(100vw - 280px)"
                                                            },
                                                            height: "320px !important",
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center"
                                                        },
                                                        children: attr.noDataMsg ?? "No data found."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Datatable.jsx",
                                                        lineNumber: 1256,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Datatable.jsx",
                                                    lineNumber: 1247,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Datatable.jsx",
                                                lineNumber: 1246,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Datatable.jsx",
                                            lineNumber: 1053,
                                            columnNumber: 15
                                        }, this),
                                        Object.keys(columnTotals).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableFooter$2f$TableFooter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableFooter$3e$__["TableFooter"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                                                children: [
                                                    attr.rowLockable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                        sx: {
                                                            width: "20px",
                                                            position: "sticky",
                                                            bottom: 0,
                                                            zIndex: 3,
                                                            backgroundColor: "#f0f0f0"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Datatable.jsx",
                                                        lineNumber: 1275,
                                                        columnNumber: 23
                                                    }, this),
                                                    attr.rowSelectable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                        sx: {
                                                            width: "35.5px !important",
                                                            maxWidth: "35.5px !important",
                                                            p: "0 !important",
                                                            position: "sticky",
                                                            bottom: 0,
                                                            zIndex: 3,
                                                            backgroundColor: "#f0f0f0"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Datatable.jsx",
                                                        lineNumber: 1286,
                                                        columnNumber: 23
                                                    }, this),
                                                    columns.map((cell)=>columnVisibility[cell.id] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                            align: cell.align || "start",
                                                            sx: {
                                                                whiteSpace: "nowrap",
                                                                textAlign: cell.align || "start",
                                                                p: "0 !important",
                                                                m: "0 !important",
                                                                height: "32px",
                                                                fontSize: "13px",
                                                                fontWeight: "bold",
                                                                minWidth: "100px",
                                                                width: cell.width || "150px",
                                                                px: "8px !important",
                                                                position: "sticky",
                                                                bottom: 0,
                                                                zIndex: 3,
                                                                backgroundColor: "#f0f0f0",
                                                                ...lockedColumns[cell.id] && {
                                                                    position: "sticky",
                                                                    left: `${getLockedColumnOffset(cell.id)}px`,
                                                                    boxShadow: "2px 0 5px -2px rgba(0, 0, 0, 0.3)",
                                                                    zIndex: 4
                                                                }
                                                            },
                                                            children: cell?.feature?.includes("total") ? cell.total ? cell.total(columnTotals[cell.id] || "0.00") : columnTotals[cell.id] || "0.00" : cell.id === columns[0].id ? "Total" : ""
                                                        }, cell.id, false, {
                                                            fileName: "[project]/src/components/Datatable.jsx",
                                                            lineNumber: 1301,
                                                            columnNumber: 27
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Datatable.jsx",
                                                lineNumber: 1273,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Datatable.jsx",
                                            lineNumber: 1272,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Datatable.jsx",
                                    lineNumber: 817,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Datatable.jsx",
                                lineNumber: 801,
                                columnNumber: 11
                            }, this),
                            !hidePagination && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                sx: {
                                    bgcolor: "white",
                                    position: "sticky",
                                    borderBottomLeftRadius: "10px",
                                    borderBottomRightRadius: "10px",
                                    bottom: 0,
                                    width: "100%",
                                    zIndex: 3,
                                    p: 0.5,
                                    display: "flex",
                                    justifyContent: "flex-end"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TablePagination$2f$TablePagination$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TablePagination$3e$__["TablePagination"], {
                                    rowsPerPageOptions: attr.pagination,
                                    component: "div",
                                    count: filteredRows.length,
                                    rowsPerPage: pageSize,
                                    page: page,
                                    onPageChange: handleChangePage,
                                    onRowsPerPageChange: handleChangeRowsPerPage,
                                    showFirstButton: true,
                                    showLastButton: true,
                                    ActionsComponent: (attr)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PaginationButtons$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            ...attr,
                                            onPageChange: handleChangePage
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Datatable.jsx",
                                            lineNumber: 1369,
                                            columnNumber: 19
                                        }, void 0),
                                    labelDisplayedRows: ({ from, to, count, page })=>`Showing ${from} - ${to} of ${count}`,
                                    slotProps: {
                                        select: {
                                            MenuProps: {
                                                PaperProps: {
                                                    sx: {
                                                        "& .MuiMenuItem-root": {
                                                            fontSize: "13px"
                                                        },
                                                        zIndex: 4000
                                                    }
                                                },
                                                MenuListProps: {
                                                    sx: {
                                                        zIndex: 4000
                                                    }
                                                },
                                                disablePortal: true
                                            }
                                        }
                                    },
                                    sx: {
                                        height: "auto",
                                        p: 0,
                                        m: 0,
                                        "& .MuiTablePagination-toolbar": {
                                            minHeight: "30px",
                                            padding: 0,
                                            margin: 0,
                                            width: "100%",
                                            flexWrap: "wrap",
                                            justifyContent: "center"
                                        },
                                        "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                                            margin: 0,
                                            padding: 0,
                                            fontSize: "13px !important"
                                        },
                                        "& .MuiTablePagination-select": {
                                            fontSize: "13px !important"
                                        },
                                        "& .MuiInputBase-root": {
                                            fontSize: "13px !important"
                                        },
                                        "& .MuiTablePagination-actions": {
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: "4px",
                                            margin: 0
                                        }
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Datatable.jsx",
                                    lineNumber: 1358,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Datatable.jsx",
                                lineNumber: 1344,
                                columnNumber: 13
                            }, this),
                            attr?.progress?.isVisible === true && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                                            backdropFilter: "blur(2px)",
                                            zIndex: 9
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Datatable.jsx",
                                        lineNumber: 1435,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ShowProgress, {
                                        shape: "circle",
                                        status: Math.round(attr.progress.current / selected.length * 100)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Datatable.jsx",
                                        lineNumber: 1447,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Datatable.jsx",
                        lineNumber: 751,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Datatable.jsx",
                lineNumber: 564,
                columnNumber: 7
            }, this),
            attr?.withSelected
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Datatable.jsx",
        lineNumber: 563,
        columnNumber: 5
    }, this);
}
function ShowProgress({ shape = "circle", status: currentValue = 0 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
        sx: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "inline-flex",
            zIndex: 10
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__["CircularProgress"], {
                variant: "determinate",
                value: currentValue,
                size: 50,
                thickness: 3
            }, void 0, false, {
                fileName: "[project]/src/components/Datatable.jsx",
                lineNumber: 1473,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                sx: {
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                    sx: {
                        fontSize: "12px"
                    },
                    children: `${currentValue}%`
                }, void 0, false, {
                    fileName: "[project]/src/components/Datatable.jsx",
                    lineNumber: 1491,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Datatable.jsx",
                lineNumber: 1479,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Datatable.jsx",
        lineNumber: 1463,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/Form/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Active",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Active$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    "Checkbox",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Checkbox$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    "Date",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Date$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    "DateRangeSelector",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$DateRange$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    "Input",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Input$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    "Phone",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Phone$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    "Radio",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Radio$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    "Select",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Select$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    "Switch",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Switch$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    "SwitchWithText",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$SwitchWithText$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    "Text",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Text$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    "TextEditor",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TextEditor"],
    "Upload",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Upload$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/Form/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Checkbox$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Checkbox.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Input$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Input.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Phone$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Phone.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Date$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Date.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Select$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Select.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Text$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Text.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Upload$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Upload.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Active$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Active.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Switch$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Switch.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$SwitchWithText$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/SwitchWithText.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Radio$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Radio.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$DateRange$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/DateRange.jsx [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__18756ee0._.js.map