(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/theme/theme.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$createTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__createTheme$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/styles/createTheme.js [app-client] (ecmascript) <export default as createTheme>");
;
const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$createTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__createTheme$3e$__["createTheme"])({
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
                            fn: (param)=>{
                                let { state } = param;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/Context/query.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QueryProvider",
    ()=>QueryProvider,
    "useQuery",
    ()=>useQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const QueryContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])();
function QueryProvider(param) {
    let { children } = param;
    _s();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const queryParams = Array.from(searchParams.keys()).reduce((a, key)=>{
        const values = searchParams.getAll(key);
        a[key] = values.length === 1 ? values[0] : values;
        return a;
    }, {});
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QueryContext.Provider, {
        value: queryParams,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/Context/query.js",
        lineNumber: 13,
        columnNumber: 12
    }, this);
}
_s(QueryProvider, "a+DZx9DY26Zf8FVy1bxe3vp9l1w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = QueryProvider;
function useQuery() {
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(QueryContext);
}
_s1(useQuery, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var _c;
__turbopack_context__.k.register(_c, "QueryProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/util/page/card.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Card
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Card/Card.js [app-client] (ecmascript)");
;
;
function Card(attr) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        variant: "outlined",
        sx: attr.sx,
        children: attr.children
    }, void 0, false, {
        fileName: "[project]/src/util/page/card.js",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = Card;
var _c;
__turbopack_context__.k.register(_c, "Card");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/util/page/text.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript)");
;
;
function __TURBOPACK__default__export__(param) {
    let { children, sx, ...rest } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        sx: sx,
        ...rest,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/util/page/text.js",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/forms/RequiredLabel.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RequiredLabel",
    ()=>RequiredLabel,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const RequiredLabel = (param)=>{
    let { label } = param;
    return [
        null,
        undefined,
        ""
    ].includes(label) ? label : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            label,
            " ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
_c = RequiredLabel;
const __TURBOPACK__default__export__ = RequiredLabel;
var _c;
__turbopack_context__.k.register(_c, "RequiredLabel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/forms/InputTextField.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TextField/TextField.js [app-client] (ecmascript)");
;
;
;
const FormTextField = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].forwardRef(_c = (props, ref)=>{
    const { InputProps, inputProps, inputSX, error, helperText, id, type, name, label, placeholder, autoComplete, autoFocus, required, fullWidth, select, variant, color, sx, defaultValue, onChange, children, InputLabelProps, multiline, maxRows, disabled, ...rest } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        inputRef: ref,
        InputProps: {
            ...InputProps,
            sx: {
                backgroundColor: "white",
                ...InputProps === null || InputProps === void 0 ? void 0 : InputProps.sx
            }
        },
        inputProps: {
            ...inputProps,
            autoComplete: autoComplete || (inputProps === null || inputProps === void 0 ? void 0 : inputProps.autoComplete) || "off"
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
        sx: sx !== null && sx !== void 0 ? sx : inputSX,
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
_c1 = FormTextField;
FormTextField.displayName = "FormTextField";
const __TURBOPACK__default__export__ = FormTextField;
var _c, _c1;
__turbopack_context__.k.register(_c, "FormTextField$React.forwardRef");
__turbopack_context__.k.register(_c1, "FormTextField");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/forms/index.jsx [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$RequiredLabel$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forms/RequiredLabel.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$InputTextField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forms/InputTextField.jsx [app-client] (ecmascript)");
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/util/page/controls.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControl$2f$FormControl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/FormControl/FormControl.js [app-client] (ecmascript)");
;
;
function FormControls(attr) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControl$2f$FormControl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        fullWidth: true,
        children: attr.children
    }, void 0, false, {
        fileName: "[project]/src/util/page/controls.js",
        lineNumber: 4,
        columnNumber: 10
    }, this);
}
_c = FormControls;
const __TURBOPACK__default__export__ = FormControls;
var _c;
__turbopack_context__.k.register(_c, "FormControls");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/util/page/label.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormLabel$2f$FormLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/FormLabel/FormLabel.js [app-client] (ecmascript)");
;
;
function FormLabels(attr) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormLabel$2f$FormLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        htmlFor: attr.htmlFor,
        children: attr.children
    }, void 0, false, {
        fileName: "[project]/src/util/page/label.js",
        lineNumber: 4,
        columnNumber: 10
    }, this);
}
_c = FormLabels;
const __TURBOPACK__default__export__ = FormLabels;
var _c;
__turbopack_context__.k.register(_c, "FormLabels");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/util/page/controllabel.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/FormControlLabel/FormControlLabel.js [app-client] (ecmascript)");
;
;
function ControlLabel(attr) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
_c = ControlLabel;
const __TURBOPACK__default__export__ = ControlLabel;
var _c;
__turbopack_context__.k.register(_c, "ControlLabel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/util/page/checkbox.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Checkbox/Checkbox.js [app-client] (ecmascript)");
;
;
function FormCheckbox(attr) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        ...attr
    }, void 0, false, {
        fileName: "[project]/src/util/page/checkbox.js",
        lineNumber: 4,
        columnNumber: 10
    }, this);
}
_c = FormCheckbox;
const __TURBOPACK__default__export__ = FormCheckbox;
var _c;
__turbopack_context__.k.register(_c, "FormCheckbox");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/util/page/divider.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Divider$2f$Divider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Divider/Divider.js [app-client] (ecmascript)");
;
;
function DividerLine(attr) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Divider$2f$Divider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        sx: attr.sx,
        children: attr.children
    }, void 0, false, {
        fileName: "[project]/src/util/page/divider.js",
        lineNumber: 4,
        columnNumber: 10
    }, this);
}
_c = DividerLine;
const __TURBOPACK__default__export__ = DividerLine;
var _c;
__turbopack_context__.k.register(_c, "DividerLine");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/util/page/box.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript)");
;
;
function ContentBox(attr) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        ...attr,
        children: attr.children
    }, void 0, false, {
        fileName: "[project]/src/util/page/box.js",
        lineNumber: 4,
        columnNumber: 5
    }, this);
}
_c = ContentBox;
const __TURBOPACK__default__export__ = ContentBox;
var _c;
__turbopack_context__.k.register(_c, "ContentBox");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/util/page/link.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Link$2f$Link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Link/Link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
;
;
function Links(attr) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Link$2f$Link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        color: "secondary",
        href: attr.href,
        component: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
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
_c = Links;
const __TURBOPACK__default__export__ = Links;
var _c;
__turbopack_context__.k.register(_c, "Links");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/util/page/stack.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Stack/Stack.js [app-client] (ecmascript)");
;
;
function TextStack(attr) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stack$2f$Stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        direction: attr.direction,
        sx: attr.sx,
        children: attr.children
    }, void 0, false, {
        fileName: "[project]/src/util/page/stack.js",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = TextStack;
const __TURBOPACK__default__export__ = TextStack;
var _c;
__turbopack_context__.k.register(_c, "TextStack");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/util/page/button.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PageButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Button/Button.js [app-client] (ecmascript)");
;
;
function PageButton(attr) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
_c = PageButton;
var _c;
__turbopack_context__.k.register(_c, "PageButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/forms/InputTextField.jsx [app-client] (ecmascript) <export default as InputTextField>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InputTextField",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$InputTextField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$InputTextField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forms/InputTextField.jsx [app-client] (ecmascript)");
}),
"[project]/src/util/page/controls.js [app-client] (ecmascript) <export default as Control>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Control",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$controls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$controls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/controls.js [app-client] (ecmascript)");
}),
"[project]/src/util/page/controllabel.js [app-client] (ecmascript) <export default as ControlLabel>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ControlLabel",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$controllabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$controllabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/controllabel.js [app-client] (ecmascript)");
}),
"[project]/src/util/page/checkbox.js [app-client] (ecmascript) <export default as Checkbox>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Checkbox",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$checkbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$checkbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/checkbox.js [app-client] (ecmascript)");
}),
"[project]/src/util/checkPasswordStrength.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/util/page/Error.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Error
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Alert/Alert.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
;
function Error(attr) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        severity: "error",
        children: attr.message
    }, void 0, false, {
        fileName: "[project]/src/util/page/Error.jsx",
        lineNumber: 5,
        columnNumber: 12
    }, this);
}
_c = Error;
var _c;
__turbopack_context__.k.register(_c, "Error");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/util/page/select.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControl$2f$FormControl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControl$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/FormControl/FormControl.js [app-client] (ecmascript) <export default as FormControl>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputLabel$2f$InputLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputLabel$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/InputLabel/InputLabel.js [app-client] (ecmascript) <export default as InputLabel>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Select$2f$Select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Select/Select.js [app-client] (ecmascript) <export default as Select>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/MenuItem/MenuItem.js [app-client] (ecmascript) <export default as MenuItem>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const SelectInput = (param)=>{
    let { label, value, onChange, onClick, name, options, size = "small", fullWidth = true, sx = {}, slotProps = {}, defaultValue } = param;
    _s();
    var _ref;
    const [val, setVal] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState((_ref = defaultValue !== null && defaultValue !== void 0 ? defaultValue : value) !== null && _ref !== void 0 ? _ref : "");
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "SelectInput.useEffect": ()=>{
            var _ref;
            setVal((_ref = defaultValue !== null && defaultValue !== void 0 ? defaultValue : value) !== null && _ref !== void 0 ? _ref : "");
        }
    }["SelectInput.useEffect"], [
        defaultValue,
        value
    ]);
    const labelId = "".concat(name || label.toLowerCase().replace(/\s+/g, "-"), "-label");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControl$2f$FormControl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControl$3e$__["FormControl"], {
        size: size,
        fullWidth: fullWidth,
        sx: sx,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputLabel$2f$InputLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputLabel$3e$__["InputLabel"], {
                id: labelId,
                children: label
            }, void 0, false, {
                fileName: "[project]/src/util/page/select.js",
                lineNumber: 26,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Select$2f$Select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
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
                children: options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
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
_s(SelectInput, "CLrtUv+xuF7lAuB9ek4l7ai3OzA=");
_c = SelectInput;
const __TURBOPACK__default__export__ = SelectInput;
var _c;
__turbopack_context__.k.register(_c, "SelectInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/util/page/icononlyselect.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HeaderIconSelect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-client] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Menu$2f$Menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Menu/Menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/MenuItem/MenuItem.js [app-client] (ecmascript) <export default as MenuItem>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Tooltip/Tooltip.js [app-client] (ecmascript) <export default as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$KeyboardArrowDown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/KeyboardArrowDown.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function HeaderIconSelect(param) {
    let { options = [], value, onChange, tooltip = "" } = param;
    _s();
    const [anchorEl, setAnchorEl] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(null);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                title: tooltip,
                placement: "top",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                    "aria-controls": open ? "header-select-menu" : undefined,
                    "aria-haspopup": "true",
                    "aria-expanded": open ? "true" : undefined,
                    onClick: handleOpen,
                    sx: {
                        p: 0.5
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$KeyboardArrowDown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Menu$2f$Menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
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
                children: options.map((opt)=>{
                    var _opt_value;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                        sx: {
                            fontWeight: "bold"
                        },
                        selected: opt.value === value,
                        onClick: ()=>handleSelect(opt.value),
                        children: opt.label
                    }, String((_opt_value = opt.value) !== null && _opt_value !== void 0 ? _opt_value : opt.label), false, {
                        fileName: "[project]/src/util/page/icononlyselect.js",
                        lineNumber: 48,
                        columnNumber: 11
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/util/page/icononlyselect.js",
                lineNumber: 38,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(HeaderIconSelect, "+aMDa7FPcESUyQDF1vq0RSMn4/k=");
_c = HeaderIconSelect;
var _c;
__turbopack_context__.k.register(_c, "HeaderIconSelect");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/util/page/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Box",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "Card",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "Checkbox",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$checkbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "Control",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$controls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "ControlLabel",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$controllabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "Divider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$divider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "Error",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$Error$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "IconOnlySelect",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$icononlyselect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "Input",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$input$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "InputTextField",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$InputTextField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputTextField$3e$__["InputTextField"],
    "Label",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "Link",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "MuiButton",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "Password",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$Password$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "Select",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "Stack",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "Text",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/card.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/text.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$InputTextField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputTextField$3e$__ = __turbopack_context__.i("[project]/src/components/forms/InputTextField.jsx [app-client] (ecmascript) <export default as InputTextField>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$controls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/controls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/label.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$controllabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/controllabel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$checkbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/checkbox.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$divider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/divider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/stack.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$input$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/input.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$Error$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/Error.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$Password$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/Password.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/select.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$icononlyselect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/icononlyselect.js [app-client] (ecmascript)");
}),
"[project]/src/util/page/index.js [app-client] (ecmascript) <export * as Page>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Page",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-client] (ecmascript)");
}),
"[project]/src/util/page/Password.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TextField/TextField.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-client] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputAdornment$2f$InputAdornment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputAdornment$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/InputAdornment/InputAdornment.js [app-client] (ecmascript) <export default as InputAdornment>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LinearProgress$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/LinearProgress/LinearProgress.js [app-client] (ecmascript) <export default as LinearProgress>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Visibility$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Visibility.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$VisibilityOff$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/VisibilityOff.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$checkPasswordStrength$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/checkPasswordStrength.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-client] (ecmascript) <export * as Page>");
"use client";
;
;
;
;
;
;
;
;
function __TURBOPACK__default__export__(param) {
    let { unmaskable, strengthMeter, timeout, onTimeout, match, onStrengthChanged, error: Error, ...attr } = param;
    const [extraInfo, setExtraInfo] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState("");
    const [slotProps, setSlotProps] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState();
    const [masked, setMasked] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(true);
    const [countdown, setCountdown] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(0);
    const [showStrength, setShowStrength] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [password, setPassword] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState("");
    const [error, setError] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [passwordStrength, setPasswordStrength] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState({
        score: 0,
        color: "",
        strength: ""
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "useEffect": ()=>{
            if (!strengthMeter) return;
            setShowStrength(true);
        }
    }["useEffect"], [
        strengthMeter
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "useEffect": ()=>{
            if (countdown === undefined) return;
            if (countdown > 0) {
                setTimeout({
                    "useEffect": ()=>{
                        setCountdown(countdown - 1);
                    }
                }["useEffect"], 1000);
                setExtraInfo(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
        }
    }["useEffect"], [
        countdown
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "useEffect": ()=>{
            if (!onTimeout) return;
            setCountdown(timeout === null || timeout === void 0 ? void 0 : timeout.value);
            setTimeout({
                "useEffect": ()=>{
                    setExtraInfo("");
                    onTimeout();
                }
            }["useEffect"], (timeout === null || timeout === void 0 ? void 0 : timeout.value) * 1000);
        }
    }["useEffect"], [
        timeout === null || timeout === void 0 ? void 0 : timeout.value
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "useEffect": ()=>{
            setSlotProps({
                input: {
                    endAdornment: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputAdornment$2f$InputAdornment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputAdornment$3e$__["InputAdornment"], {
                        position: "end",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
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
                                masked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$VisibilityOff$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/src/util/page/Password.jsx",
                                    lineNumber: 77,
                                    columnNumber: 25
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Visibility$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
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
        }
    }["useEffect"], [
        unmaskable,
        masked
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "useEffect": ()=>{
            if (!showStrength) return;
            setPasswordStrength((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$checkPasswordStrength$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(password));
        }
    }["useEffect"], [
        password
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "useEffect": ()=>{
            if (!showStrength) return;
            setError(passwordStrength.score < 4);
            setExtraInfo(passwordStrength.score > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                        component: "span",
                        sx: {
                            fontSize: "12px",
                            mt: 0.5,
                            display: "flex",
                            justifyContent: "space-between"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LinearProgress$3e$__["LinearProgress"], {
                        variant: "determinate",
                        value: passwordStrength.score * 20,
                        color: passwordStrength.color
                    }, void 0, false, {
                        fileName: "[project]/src/util/page/Password.jsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {}, void 0, false));
            onStrengthChanged && onStrengthChanged(passwordStrength);
        }
    }["useEffect"], [
        passwordStrength
    ]);
    function toggleMasked() {
        setMasked(!masked);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
            let fld = form.querySelector("[name=".concat(match, "]"));
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/util/page/Password.jsx [app-client] (ecmascript) <export default as Password>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Password",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$Password$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$Password$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/Password.jsx [app-client] (ecmascript)");
}),
"[project]/src/util/page/input.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$InputTextField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputTextField$3e$__ = __turbopack_context__.i("[project]/src/components/forms/InputTextField.jsx [app-client] (ecmascript) <export default as InputTextField>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$controls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Control$3e$__ = __turbopack_context__.i("[project]/src/util/page/controls.js [app-client] (ecmascript) <export default as Control>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$controllabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ControlLabel$3e$__ = __turbopack_context__.i("[project]/src/util/page/controllabel.js [app-client] (ecmascript) <export default as ControlLabel>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$checkbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__ = __turbopack_context__.i("[project]/src/util/page/checkbox.js [app-client] (ecmascript) <export default as Checkbox>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$Password$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Password$3e$__ = __turbopack_context__.i("[project]/src/util/page/Password.jsx [app-client] (ecmascript) <export default as Password>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputAdornment$2f$InputAdornment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputAdornment$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/InputAdornment/InputAdornment.js [app-client] (ecmascript) <export default as InputAdornment>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-client] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function input(attr) {
    if (attr.control) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Controller"], {
        name: attr === null || attr === void 0 ? void 0 : attr.name,
        control: attr === null || attr === void 0 ? void 0 : attr.control,
        render: (param)=>{
            let { fld } = param;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputField, {
                ...fld,
                ...attr,
                name: undefined
            }, void 0, false, {
                fileName: "[project]/src/util/page/input.jsx",
                lineNumber: 20,
                columnNumber: 30
            }, void 0);
        }
    }, void 0, false, {
        fileName: "[project]/src/util/page/input.jsx",
        lineNumber: 17,
        columnNumber: 7
    }, this);
    else return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputField, {
        ...attr
    }, void 0, false, {
        fileName: "[project]/src/util/page/input.jsx",
        lineNumber: 23,
        columnNumber: 15
    }, this);
}
function InputField(attr) {
    _s();
    const [slotProps, setSlotProps] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(undefined);
    const [hasError, setHasError] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [errorMessage, setErrorMessage] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState("");
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "InputField.useEffect": ()=>{
            // console.log(attr)
            if (!attr.hasAction) {
                setSlotProps(undefined);
                return;
            }
            setSlotProps({
                input: {
                    endAdornment: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputAdornment$2f$InputAdornment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputAdornment$3e$__["InputAdornment"], {
                        position: "end",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
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
        }
    }["InputField.useEffect"], [
        attr.hasAction,
        attr.actionBtn
    ]);
    var _attr_type;
    switch((_attr_type = attr.type) !== null && _attr_type !== void 0 ? _attr_type : "text"){
        case "checkbox":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$controllabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ControlLabel$3e$__["ControlLabel"], {
                control: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$checkbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__["Checkbox"], {
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
            var _attr_id;
            // console.log("Loading password")
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$controls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Control$3e$__["Control"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$Password$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Password$3e$__["Password"], {
                    id: (_attr_id = attr.id) !== null && _attr_id !== void 0 ? _attr_id : attr.name,
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
            var _attr_id1, _attr_type1;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$controls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Control$3e$__["Control"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$InputTextField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputTextField$3e$__["InputTextField"], {
                    fullWidth: attr.fullWidth,
                    id: (_attr_id1 = attr.id) !== null && _attr_id1 !== void 0 ? _attr_id1 : attr.name,
                    type: (_attr_type1 = attr.type) !== null && _attr_type1 !== void 0 ? _attr_type1 : "text",
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
_s(InputField, "B+9vJ07mDesuDaOHAO14WrEhk5U=");
_c = InputField;
var _c;
__turbopack_context__.k.register(_c, "InputField");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/util/page/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/card.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/text.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$index$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/forms/index.jsx [app-client] (ecmascript) <locals>");
// export { default as InputTextField } from "./textfield";
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$controls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/controls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/label.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$controllabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/controllabel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$checkbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/checkbox.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$divider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/divider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$stack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/stack.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$input$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/input.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$Error$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/Error.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$Password$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/Password.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/select.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$icononlyselect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/icononlyselect.js [app-client] (ecmascript)");
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/util/api.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
function wait() {
    let time = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1000;
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve();
        }, time);
    });
}
class API {
    async request(method, endpoint) {
        let { body, headers = {} } = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        // await wait(5000);
        const url = "".concat(this.baseUrl).concat(endpoint);
        const token = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem('token') : "TURBOPACK unreachable";
        // Set default headers
        const defaultHeaders = {
            'Content-Type': 'application/json',
            ...token && {
                Authorization: "Bearer ".concat(token)
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
            } catch (e) {
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
    async getHtml(url) {
        let config = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
            mode: "no-cors"
        };
        console.log(url);
        const response = await fetch(url, config);
        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
                console.log(errorData);
            } catch (e) {
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
    get(endpoint) {
        let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        return this.request('GET', endpoint, options);
    }
    post(endpoint, body) {
        let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        return this.request('POST', endpoint, {
            ...options,
            body
        });
    }
    put(endpoint, body) {
        let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        return this.request('PUT', endpoint, {
            ...options,
            body
        });
    }
    patch(endpoint, body) {
        let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        return this.request('PATCH', endpoint, {
            ...options,
            body
        });
    }
    delete(endpoint, body) {
        let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        return this.request('DELETE', endpoint, {
            ...options,
            body
        });
    }
    copy(endpoint) {
        let body = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        return this.request('COPY', endpoint, {
            ...options,
            body
        });
    }
    constructor(baseUrl = ""){
        this.baseUrl = baseUrl;
    }
}
// Export as singleton instance
const api = new API();
const __TURBOPACK__default__export__ = api;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/util/loadPDF.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>loadPDF
]);
async function loadPDF(param) {
    let { onLoading, onLoad, onFileLoad, config } = param;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/util/submitWithAjax.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/api.js [app-client] (ecmascript)");
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
    var _target_getAttribute;
    const method = (_target_getAttribute = target.getAttribute("method")) !== null && _target_getAttribute !== void 0 ? _target_getAttribute : target.method.toLowerCase();
    const action = target.action;
    return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"][method](action, data);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/util/inputKeyboardShortcut.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>inputKeyboardShotcut
]);
function inputKeyboardShotcut(e) {
    var _document_querySelector;
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
    (_document_querySelector = document.querySelector('[name="'.concat(newName, '"]'))) === null || _document_querySelector === void 0 ? void 0 : _document_querySelector.focus();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/util/isAllowed.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>isAllowed
]);
function isAllowed(member, param) {
    let { module, feature, action } = param;
    if (!member || !member.permissions || !(member.permissions instanceof Array)) return false;
    if (!module || !feature || !action) return false;
    let permission = member.permissions.find((p)=>p.module === module && p.feature === feature && p.action.includes(action));
    if (!permission) return false;
    return true;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/util/api.js [app-client] (ecmascript) <export default as api>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "api",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/api.js [app-client] (ecmascript)");
}),
"[project]/src/util/getSecurityInfo.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__ = __turbopack_context__.i("[project]/src/util/api.js [app-client] (ecmascript) <export default as api>");
"use client";
;
class Telemetry {
    async browserID() {
        let browserid = window.localStorage.getItem("browserid");
        if (!browserid) {
            browserid = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__["api"].get("/api/v1/security/browserid");
            window.localStorage.setItem("browserid", browserid);
        }
    }
    gps() {
        return new Promise((resolve, reject)=>{
            if (!window || !window.navigator || !window.navigator.geolocation) return reject("GPS Access not available");
            window.navigator.geolocation.getCurrentPosition((location)=>{
                resolve(location.coords);
            }, (err)=>{
                reject(err);
            });
        });
    }
    async ip() {
        let info = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__["api"].get("/api/v1/get-country");
        return info;
    }
    async timezone() {
        let type = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "Name";
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
        return "".concat(window.screen.availWidth, " X ").concat(window.screen.availHeight, " (").concat(window.screen.colorDepth, ") [").concat(window.screen.orientation.type, " (").concat(window.screen.orientation.angle, "deg)]");
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
        return "".concat(battery.level * 100, "% (").concat(battery.charging ? "Charging" : "Discharging", ")");
    }
    constructor(){}
}
const __TURBOPACK__default__export__ = new Telemetry();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/util/getCurrency.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/util/getOptions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>getOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/api.js [app-client] (ecmascript)");
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
            img: "/images/flags/".concat(val.name.toLowerCase(), ".svg")
        }),
    roles: (val)=>({
            value: val.name,
            label: val.name
        })
};
async function getOptions(field) {
    let parameter = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, populateFn = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    if (!field || !(field in endpoints)) return null;
    if (parameters[field] !== "" && (parameter === null || parameter === "")) return null;
    const cacheKey = btoa("".concat(field, "_").concat(parameter !== null && parameter !== void 0 ? parameter : ""));
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
            temp = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(endpoints[field]);
            break;
        case "post":
            temp = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(endpoints[field], {
                [parameters[field]]: parameter
            });
            break;
    }
    if (temp.status === "success" && "data" in temp) temp = JSON.stringify(temp.data);
    localStorage.setItem(cacheKey, temp);
    return temp;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/util/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mutate",
    ()=>mutate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$loadPDF$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/loadPDF.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$submitWithAjax$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/submitWithAjax.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$checkPasswordStrength$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/checkPasswordStrength.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$inputKeyboardShortcut$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/inputKeyboardShortcut.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$isAllowed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/isAllowed.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getSecurityInfo$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/getSecurityInfo.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getCurrency$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/getCurrency.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getOptions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/getOptions.js [app-client] (ecmascript)");
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
function mutate(data) {
    return JSON.parse(JSON.stringify(data));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/util/getSecurityInfo.js [app-client] (ecmascript) <export default as telemetry>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "telemetry",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getSecurityInfo$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getSecurityInfo$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/getSecurityInfo.js [app-client] (ecmascript)");
}),
"[project]/src/Context/telemetry.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TelemetryProvider",
    ()=>TelemetryProvider,
    "useTelemetry",
    ()=>useTelemetry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getSecurityInfo$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__telemetry$3e$__ = __turbopack_context__.i("[project]/src/util/getSecurityInfo.js [app-client] (ecmascript) <export default as telemetry>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const TelemetryContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])();
function TelemetryProvider(param) {
    let { children } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TelemetryContext.Provider, {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getSecurityInfo$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__telemetry$3e$__["telemetry"],
        children: children
    }, void 0, false, {
        fileName: "[project]/src/Context/telemetry.js",
        lineNumber: 8,
        columnNumber: 10
    }, this);
}
_c = TelemetryProvider;
function useTelemetry() {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(TelemetryContext);
}
_s(useTelemetry, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var _c;
__turbopack_context__.k.register(_c, "TelemetryProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/Context/member.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MemberProvider",
    ()=>MemberProvider,
    "useMember",
    ()=>useMember
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__ = __turbopack_context__.i("[project]/src/util/api.js [app-client] (ecmascript) <export default as api>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const MemberContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])();
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
    let temp = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__["api"].get("/api/v1/me");
    if (temp.status === "error" && temp.message.toLowerCase() === "token expired") {
        window.localStorage.removeItem("token");
        setMe(null);
        throw new Error("token expired");
    }
    return temp.data;
}
function MemberProvider(param) {
    let { children } = param;
    _s();
    const [reload, setReload] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [me, setMe1] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [router, pathname] = [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])()
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MemberContext.Provider, {
        value: me,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/Context/member.js",
        lineNumber: 66,
        columnNumber: 10
    }, this);
}
_s(MemberProvider, "gNeOeRbiVWt+LxKXmdA+hnn7JJo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = MemberProvider;
function useMember() {
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(MemberContext);
} //*/
_s1(useMember, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var _c;
__turbopack_context__.k.register(_c, "MemberProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/Context/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$query$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/Context/query.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$telemetry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/Context/telemetry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$member$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/Context/member.js [app-client] (ecmascript)");
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/componentsMHO/LoadingOverlay.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-client] (ecmascript) <export * as Page>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CircularProgress/CircularProgress.js [app-client] (ecmascript) <export default as CircularProgress>");
;
;
;
;
function LoadingOverlay(param) {
    let { zIndex = 9998 } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
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
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
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
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
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
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__["CircularProgress"], {
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
_c = LoadingOverlay;
const __TURBOPACK__default__export__ = LoadingOverlay;
var _c;
__turbopack_context__.k.register(_c, "LoadingOverlay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/enhancements.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

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
Date.prototype.next = function() {
    let offsetStr = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "0d";
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
Date.prototype.showDate = function() {
    let format = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "dd-mmm-yyyy", locale = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "default";
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
    return "".concat(value, " ").concat(value === 1 ? units[0] : units[1]);
};
Date.prototype.toFormat = function() {
    let format = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "dd-mm-yyyy - hh:mm:ss", locale = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "en-IN";
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
Number.prototype.toMoney = function() {
    let currency = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "INR", locale = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "en-IN";
    const format = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency
    }).format;
    return format(this);
};
Number.prototype.toPercent = function() {
    let locale = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "en-IN";
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
    return "".concat(hr, ":").concat(min < 10 ? "0".concat(min) : min, ":").concat(sec < 10 ? "0".concat(sec) : sec, ".").concat(ms);
};
Array.prototype.avg = function() {
    let sum = 0;
    for(let i = 0; i < this.length; i++){
        sum += Number(this[i]);
    }
    return sum / this.length;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/providers.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2d$nextjs$2f$esm$2f$v13$2d$appRouter$2f$appRouterV13$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AppRouterCacheProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material-nextjs/esm/v13-appRouter/appRouterV13.js [app-client] (ecmascript) <export default as AppRouterCacheProvider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$ThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThemeProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/styles/ThemeProvider.js [app-client] (ecmascript) <export default as ThemeProvider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$theme$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/theme/theme.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/Context/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$member$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/Context/member.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$query$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/Context/query.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$telemetry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/Context/telemetry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$componentsMHO$2f$LoadingOverlay$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/componentsMHO/LoadingOverlay.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$enhancements$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/enhancements.js [app-client] (ecmascript)");
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
function Providers(param) {
    let { children } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$member$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MemberProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$telemetry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TelemetryProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$query$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryProvider"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2d$nextjs$2f$esm$2f$v13$2d$appRouter$2f$appRouterV13$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AppRouterCacheProvider$3e$__["AppRouterCacheProvider"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$ThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThemeProvider$3e$__["ThemeProvider"], {
                        theme: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$theme$2f$theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
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
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/PaginationButtons.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-client] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$ButtonGroup$2f$ButtonGroup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ButtonGroup$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/ButtonGroup/ButtonGroup.js [app-client] (ecmascript) <export default as ButtonGroup>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Button/Button.js [app-client] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$KeyboardArrowLeft$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/KeyboardArrowLeft.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$KeyboardArrowRight$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/KeyboardArrowRight.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$KeyboardDoubleArrowLeft$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/KeyboardDoubleArrowLeft.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$KeyboardDoubleArrowRight$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/KeyboardDoubleArrowRight.js [app-client] (ecmascript)");
;
;
;
;
;
;
// Custom pagination actions component
const PaginationButtons = (param)=>{
    let { count, page, rowsPerPage, onPageChange } = param;
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            display: "flex",
            alignItems: "center",
            gap: 1
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                onClick: ()=>handlePageClick(0),
                disabled: page === 0,
                "aria-label": "first page",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$KeyboardDoubleArrowLeft$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/components/PaginationButtons.jsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/PaginationButtons.jsx",
                lineNumber: 45,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                onClick: ()=>handlePageClick(page - 1),
                disabled: page === 0,
                "aria-label": "previous page",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$KeyboardArrowLeft$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/components/PaginationButtons.jsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/PaginationButtons.jsx",
                lineNumber: 52,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$ButtonGroup$2f$ButtonGroup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ButtonGroup$3e$__["ButtonGroup"], {
                variant: "text",
                children: visiblePageNumbers().map((pageNumber)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                onClick: ()=>handlePageClick(page + 1),
                disabled: page >= totalPages,
                "aria-label": "next page",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$KeyboardArrowRight$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/components/PaginationButtons.jsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/PaginationButtons.jsx",
                lineNumber: 77,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                onClick: ()=>handlePageClick(totalPages),
                disabled: page >= totalPages,
                "aria-label": "last page",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$KeyboardDoubleArrowRight$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
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
_c = PaginationButtons;
const __TURBOPACK__default__export__ = PaginationButtons;
var _c;
__turbopack_context__.k.register(_c, "PaginationButtons");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/SectionTitle.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Grid/Grid.js [app-client] (ecmascript) <export default as Grid>");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: "\n          @keyframes gradientShift {\n            0% {\n              background-position: 0% 50%;\n            }\n            50% {\n              background-position: 100% 50%;\n            }\n            100% {\n              background-position: 0% 50%;\n            }\n          }\n        "
            }, void 0, false, {
                fileName: "[project]/src/components/SectionTitle.jsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
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
_c = SectionTitle;
const __TURBOPACK__default__export__ = SectionTitle;
var _c;
__turbopack_context__.k.register(_c, "SectionTitle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/PageTitle.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-client] (ecmascript) <export * as Page>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Grid/Grid.js [app-client] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ArrowBack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/ArrowBack.js [app-client] (ecmascript)");
;
;
;
;
function PageTitle(param) {
    let { onBack, title = "", actions = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {}, void 0, false), sx } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                container: true,
                size: {
                    xs: 6,
                    md: 2
                },
                sx: {
                    alignItems: "center"
                },
                order: 1,
                children: onBack && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].MuiButton, {
                    "aria-label": "Back Button",
                    startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ArrowBack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                size: {
                    xs: 12,
                    md: 7
                },
                order: {
                    xs: 3,
                    md: 2
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
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
_c = PageTitle;
const __TURBOPACK__default__export__ = PageTitle;
var _c;
__turbopack_context__.k.register(_c, "PageTitle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Toast.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PositionedSnackbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Snackbar$2f$Snackbar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Snackbar/Snackbar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Alert/Alert.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function PositionedSnackbar() {
    _s();
    const [status, setStatus] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]("info");
    const [message, setMessage] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]();
    const [state, setState] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        open: false,
        vertical: "bottom",
        horizontal: "right"
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "PositionedSnackbar.useEffect": ()=>{
            const handleToast = {
                "PositionedSnackbar.useEffect.handleToast": (e)=>{
                    const { detail } = e;
                    var _detail_status;
                    setStatus((_detail_status = detail === null || detail === void 0 ? void 0 : detail.status) !== null && _detail_status !== void 0 ? _detail_status : "info");
                    var _detail_message;
                    setMessage((_detail_message = detail === null || detail === void 0 ? void 0 : detail.message) !== null && _detail_message !== void 0 ? _detail_message : "");
                    setState({
                        "PositionedSnackbar.useEffect.handleToast": (prev)=>({
                                ...prev,
                                open: true
                            })
                    }["PositionedSnackbar.useEffect.handleToast"]);
                }
            }["PositionedSnackbar.useEffect.handleToast"];
            document.addEventListener("toast", handleToast);
            return ({
                "PositionedSnackbar.useEffect": ()=>{
                    document.removeEventListener("toast", handleToast);
                }
            })["PositionedSnackbar.useEffect"];
        }
    }["PositionedSnackbar.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        sx: {
            width: 500,
            zIndex: 99999
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Snackbar$2f$Snackbar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
_s(PositionedSnackbar, "biIIJFB3lzkKzv8scHClTX1IsG0=");
_c = PositionedSnackbar;
var _c;
__turbopack_context__.k.register(_c, "PositionedSnackbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/FlagAndCountryCode.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FlagAndCountryCode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
function FlagAndCountryCode(param) {
    let { cn } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flagged-code",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: "/images/flags/".concat(cn.toLowerCase(), ".svg"),
                    alt: "".concat(cn, " flag")
                }, void 0, false, {
                    fileName: "[project]/src/components/FlagAndCountryCode.jsx",
                    lineNumber: 7,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
_c = FlagAndCountryCode;
var _c;
__turbopack_context__.k.register(_c, "FlagAndCountryCode");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/SelectedActions.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SelectedActions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Grid/Grid.js [app-client] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__ = __turbopack_context__.i("[project]/src/util/api.js [app-client] (ecmascript) <export default as api>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-client] (ecmascript) <export * as Page>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
;
;
function SelectedActions(param) {
    let { selected, actions, reloadData, onLoadingStatusChange, endpoint, ...attr } = param;
    async function bulkUpdate(data) {
        if (!!onLoadingStatusChange) onLoadingStatusChange({
            isVisible: true,
            current: 0
        });
        for(let index = 0; index < selected.length; index++){
            const element = selected[index];
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__["api"].put("".concat(endpoint).concat(element), data);
                if (!!onLoadingStatusChange) onLoadingStatusChange({
                    isVisible: true,
                    current: index + 1
                });
            } catch (err) {
                if (!!onLoadingStatusChange) onLoadingStatusChange({
                    isVisible: false,
                    current: 0
                });
                console.error("Error activating element ".concat(element, ":"), err);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
        container: true,
        gap: 1,
        sx: {
            ml: 2,
            pb: 1
        },
        children: actions.map((action)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].MuiButton, {
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
_c = SelectedActions;
var _c;
__turbopack_context__.k.register(_c, "SelectedActions");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/DownloadTable.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DownloadTable,
    "jsxToText",
    ()=>jsxToText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$enhancements$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/enhancements.js [app-client] (ecmascript)");
"use client";
;
;
function sluggify(param) {
    let { data } = param;
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
    if (/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isValidElement(value)) {
        try {
            const extractTextFromElement = (element)=>{
                if (typeof element === "string" || typeof element === "number") {
                    return element.toString();
                }
                if (/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isValidElement(element)) {
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
function DownloadTable(param) {
    let { info, title, replaceChars } = param;
    if (!info || !info.length) return;
    if (!title) title = "Sampledge-Downloads";
    const csvRows = info.map((row)=>row.map((val)=>{
            const textValue = jsxToText(val);
            // Escape quotes and handle comma-containing values
            const escapedValue = textValue.replace(/"/g, '""');
            const finalValue = textValue.includes(",") || textValue.includes('"') || textValue.includes("\n") ? '"'.concat(escapedValue, '"') : escapedValue;
            return finalValue.replace(replaceChars !== null && replaceChars !== void 0 ? replaceChars : /[\r\n]+/g, " ");
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
    link.setAttribute("download", "".concat(sluggify(title), ".csv"));
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
_c = DownloadTable;
var _c;
__turbopack_context__.k.register(_c, "DownloadTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/RequiredLabel.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RequiredLabel",
    ()=>RequiredLabel,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
const RequiredLabel = (param)=>{
    let { label } = param;
    return [
        null,
        undefined,
        ""
    ].includes(label) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {}, void 0, false) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            label,
            " ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
_c = RequiredLabel;
const __TURBOPACK__default__export__ = RequiredLabel;
var _c;
__turbopack_context__.k.register(_c, "RequiredLabel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Form/Checkbox.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Checkbox/Checkbox.js [app-client] (ecmascript) <export default as Checkbox>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControlLabel$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/FormControlLabel/FormControlLabel.js [app-client] (ecmascript) <export default as FormControlLabel>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormHelperText$2f$FormHelperText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormHelperText$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/FormHelperText/FormHelperText.js [app-client] (ecmascript) <export default as FormHelperText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-client] (ecmascript) <export * as Page>");
"use client";
;
;
;
;
;
function __TURBOPACK__default__export__(param) {
    let { control, name, label, validations, error, icon, size = "small", labelPlacement = "end", ...attr } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Controller"], {
        name: name,
        control: control,
        rules: validations,
        render: (param)=>{
            let { field } = param;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControlLabel$3e$__["FormControlLabel"], {
                        sx: attr.sx,
                        labelPlacement: labelPlacement,
                        label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
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
                        control: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__["Checkbox"], {
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
                    !!error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormHelperText$2f$FormHelperText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormHelperText$3e$__["FormHelperText"], {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/forms/RequiredLabel.jsx [app-client] (ecmascript) <export default as RequiredLabel>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RequiredLabel",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$RequiredLabel$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$RequiredLabel$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/forms/RequiredLabel.jsx [app-client] (ecmascript)");
}),
"[project]/src/util/page/link.js [app-client] (ecmascript) <export default as Link>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Link",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/page/link.js [app-client] (ecmascript)");
}),
"[project]/src/components/Form/Input.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$index$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/forms/index.jsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$InputTextField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputTextField$3e$__ = __turbopack_context__.i("[project]/src/components/forms/InputTextField.jsx [app-client] (ecmascript) <export default as InputTextField>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$RequiredLabel$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RequiredLabel$3e$__ = __turbopack_context__.i("[project]/src/components/forms/RequiredLabel.jsx [app-client] (ecmascript) <export default as RequiredLabel>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getOptions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/getOptions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__ = __turbopack_context__.i("[project]/src/util/page/link.js [app-client] (ecmascript) <export default as Link>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputAdornment$2f$InputAdornment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputAdornment$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/InputAdornment/InputAdornment.js [app-client] (ecmascript) <export default as InputAdornment>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Grid/Grid.js [app-client] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$InfoOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/InfoOutlined.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-client] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Tooltip/Tooltip.js [app-client] (ecmascript) <export default as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LinearProgress$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/LinearProgress/LinearProgress.js [app-client] (ecmascript) <export default as LinearProgress>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Zoom$2f$Zoom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Zoom/Zoom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Visibility$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Visibility.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$VisibilityOff$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/VisibilityOff.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$checkPasswordStrength$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/checkPasswordStrength.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-client] (ecmascript) <export * as Page>");
;
var _s = __turbopack_context__.k.signature();
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
function ParseErrorMessage(param) {
    let { error } = param;
    try {
        let err = JSON.parse(error);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                err.message,
                err.link && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__["Link"], {
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
_c = ParseErrorMessage;
function PasswordStrengthMeter(param) {
    let { passwordStrength, showStrength } = param;
    if (!showStrength || passwordStrength.score === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
        sx: {
            mt: 1,
            mb: 1
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LinearProgress$3e$__["LinearProgress"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                sx: {
                    fontSize: "12px",
                    mt: 0.5,
                    display: "flex",
                    justifyContent: "space-between"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
_c1 = PasswordStrengthMeter;
function Input(param) {
    let { prefix, compSize, suffix, control, errors, name, label, labelText, surveyLabel, required = false, sx, validations, parent, watch, api, showLabel = true, type, strengthMeter, match, onStrengthChanged, ...props } = param;
    var _props_InputProps;
    _s();
    const [hide, setHide] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [validate, setValidate] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(validations);
    const [masked, setMasked] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(true);
    const [password, setPassword] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState("");
    const [showStrength, setShowStrength] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [passwordStrength, setPasswordStrength] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState({
        score: 0,
        color: "",
        strength: ""
    });
    let pValue;
    if (parent) {
        pValue = watch(parent);
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "Input.useEffect": ()=>{
            if (!parent) return;
            if (!pValue || pValue === "") return setHide(true);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getOptions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(api, pValue, {
                "Input.useEffect": (e)=>{
                    return e.pattern;
                }
            }["Input.useEffect"]).then({
                "Input.useEffect": (r)=>{
                    if ((r === null || r === void 0 ? void 0 : r.length) === 1 && r[0] !== "") {
                        const pattern = {
                            value: new RegExp("^".concat(atob(r[0]), "$")),
                            message: "Invalid ".concat(label)
                        };
                        setValidate({
                            ...validate,
                            pattern
                        });
                    } else {
                        setHide(true);
                    }
                }
            }["Input.useEffect"]);
            setHide(false);
        }
    }["Input.useEffect"], [
        pValue
    ]);
    // Password strength logic
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "Input.useEffect": ()=>{
            if (!strengthMeter || type !== "password") return;
            setShowStrength(true);
        }
    }["Input.useEffect"], [
        strengthMeter,
        type
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "Input.useEffect": ()=>{
            if (!showStrength) return;
            const strength = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$checkPasswordStrength$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(password);
            setPasswordStrength(strength);
            onStrengthChanged && onStrengthChanged(strength);
        }
    }["Input.useEffect"], [
        password,
        showStrength
    ]);
    let temp = {};
    if (suffix && suffix !== "") temp.endAdornment = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputAdornment$2f$InputAdornment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputAdornment$3e$__["InputAdornment"], {
        position: "end",
        children: suffix
    }, void 0, false, {
        fileName: "[project]/src/components/Form/Input.jsx",
        lineNumber: 146,
        columnNumber: 7
    }, this);
    if (prefix && prefix !== "") temp.startAdornment = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputAdornment$2f$InputAdornment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputAdornment$3e$__["InputAdornment"], {
        position: "start",
        children: prefix
    }, void 0, false, {
        fileName: "[project]/src/components/Form/Input.jsx",
        lineNumber: 150,
        columnNumber: 7
    }, this);
    // Add visibility toggle for password fields
    if (type === "password" && !((_props_InputProps = props.InputProps) === null || _props_InputProps === void 0 ? void 0 : _props_InputProps.endAdornment)) {
        temp.endAdornment = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputAdornment$2f$InputAdornment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputAdornment$3e$__["InputAdornment"], {
            position: "end",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                    onClick: ()=>setMasked(!masked),
                    sx: {
                        height: "32px",
                        width: "32px",
                        p: 0,
                        "&:hover": {
                            boxShadow: "none"
                        }
                    },
                    children: masked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$VisibilityOff$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        fontSize: "small"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Form/Input.jsx",
                        lineNumber: 169,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Visibility$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
    if (hide) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {}, void 0, false);
    /* <Grid
          size={ { xs: 12, md: Number(question?.size) } }
          alignSelf="flex-end"
          sx={ { textAlign: "center", px: 2, py: 1 } }
        ></Grid> */ return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
        size: {
            xs: 12,
            md: Number(compSize !== null && compSize !== void 0 ? compSize : 12)
        },
        alignSelf: "flex-end",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Controller"], {
            name: name,
            control: control,
            rules: validate,
            render: (param)=>{
                let { field } = param;
                const hasError = !!errors;
                const errorMessage = errors === null || errors === void 0 ? void 0 : errors.message;
                const isPasswordField = type === "password";
                let inputProps = {
                    ...props.InputProps || {}
                };
                // Handle password visibility toggle
                if (isPasswordField) {
                    inputProps.endAdornment = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            inputProps.endAdornment,
                            hasError && errorMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                title: ParseErrorMessage({
                                    error: errorMessage
                                }),
                                arrow: true,
                                placement: "top-end",
                                slots: {
                                    transition: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Zoom$2f$Zoom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
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
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                    size: "small",
                                    "aria-label": "error info",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$InfoOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
                    inputProps.endAdornment = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            inputProps.endAdornment,
                            hasError && errorMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                title: ParseErrorMessage({
                                    error: errorMessage
                                }),
                                arrow: true,
                                placement: "top-end",
                                slots: {
                                    transition: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Zoom$2f$Zoom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
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
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                    size: "small",
                                    "aria-label": "error info",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$InfoOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
                    inputProps.startAdornment = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$InputAdornment$2f$InputAdornment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputAdornment$3e$__["InputAdornment"], {
                        position: "start",
                        children: prefix
                    }, void 0, false, {
                        fileName: "[project]/src/components/Form/Input.jsx",
                        lineNumber: 304,
                        columnNumber: 15
                    }, void 0);
                }
                var _field_value;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        surveyLabel,
                        labelText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                            sx: {
                                fontWeight: 500,
                                color: "#555"
                            },
                            children: [
                                labelText,
                                " ",
                                required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$InputTextField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputTextField$3e$__["InputTextField"], {
                            ...props,
                            ...field,
                            value: (_field_value = field.value) !== null && _field_value !== void 0 ? _field_value : "",
                            type: type === "password" ? masked ? "password" : "text" : type,
                            label: label === undefined ? undefined : (validate === null || validate === void 0 ? void 0 : validate.required) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$RequiredLabel$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RequiredLabel$3e$__["RequiredLabel"], {
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
                        isPasswordField && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PasswordStrengthMeter, {
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
_s(Input, "7rwCc+DebmAvKUj8yAzqlbHB7Qc=");
_c2 = Input;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ParseErrorMessage");
__turbopack_context__.k.register(_c1, "PasswordStrengthMeter");
__turbopack_context__.k.register(_c2, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Form/Phone.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Phone
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$phone$2d$input$2d$2$2f$lib$2f$lib$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-phone-input-2/lib/lib.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$libphonenumber$2d$js$2f$min$2f$exports$2f$parsePhoneNumberWithError$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__parsePhoneNumberWithError__as__parsePhoneNumber$3e$__ = __turbopack_context__.i("[project]/node_modules/libphonenumber-js/min/exports/parsePhoneNumberWithError.js [app-client] (ecmascript) <export parsePhoneNumberWithError as parsePhoneNumber>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-client] (ecmascript) <export * as Page>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function Phone(param) {
    let { control, errors, name, label, labelText, required, validations, onlyCountries, disableDropdown, disabled = false, selectedCountry } = param;
    _s();
    const [defaultCountry, setDefaultCountry] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState();
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "Phone.useEffect": ()=>{
            if (onlyCountries && onlyCountries.length > 0) setDefaultCountry(onlyCountries[0]);
        }
    }["Phone.useEffect"], [
        onlyCountries
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "Phone.useEffect": ()=>{
            if (selectedCountry) setDefaultCountry(selectedCountry);
        }
    }["Phone.useEffect"], [
        selectedCountry
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            labelText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                sx: {
                    fontWeight: 500,
                    color: "#555"
                },
                children: [
                    labelText,
                    required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Controller"], {
                name: name,
                control: control,
                rules: disabled ? {} : {
                    ...validations,
                    validate: (val)=>{
                        if (!val || val.trim() === "") return "Required"; // allow blank
                        try {
                            const parsedPhone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$libphonenumber$2d$js$2f$min$2f$exports$2f$parsePhoneNumberWithError$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__parsePhoneNumberWithError__as__parsePhoneNumber$3e$__["parsePhoneNumber"])("+" + val);
                            return parsedPhone.isValid() || "Invalid phone number";
                        } catch (err) {
                            return "Invalid phone number";
                        }
                    }
                },
                render: (param)=>{
                    let { field } = param;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$phone$2d$input$2d$2$2f$lib$2f$lib$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
                            borderColor: (errors === null || errors === void 0 ? void 0 : errors.message) ? "red" : " #0000003b"
                        },
                        inputClass: "custom-phone-font",
                        specialLabel: ""
                    }, void 0, false, {
                        fileName: "[project]/src/components/Form/Phone.jsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, void 0);
                }
            }, void 0, false, {
                fileName: "[project]/src/components/Form/Phone.jsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            errors && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
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
_s(Phone, "YfeaFnz0LmQS2G7T5n+X88b0dUs=");
_c = Phone;
var _c;
__turbopack_context__.k.register(_c, "Phone");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Form/Date.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DateField
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dayjs/dayjs.min.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$x$2d$date$2d$pickers$2f$esm$2f$LocalizationProvider$2f$LocalizationProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/x-date-pickers/esm/LocalizationProvider/LocalizationProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$x$2d$date$2d$pickers$2f$esm$2f$AdapterDayjs$2f$AdapterDayjs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/x-date-pickers/esm/AdapterDayjs/AdapterDayjs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$x$2d$date$2d$pickers$2f$esm$2f$DatePicker$2f$DatePicker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/x-date-pickers/esm/DatePicker/DatePicker.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-client] (ecmascript) <export * as Page>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const RequiredLabel = (param)=>{
    let { label } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            label,
            " ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
};
_c = RequiredLabel;
function DateField(param) {
    let { control, errors, name, label, labelText, required = false, parent, watch, validations, disabled, dateRange = [
        null,
        null
    ] } = param;
    _s();
    const [validate, setValidate] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](validations);
    const [minDate, setMinDate] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](new Date().toString());
    const [maxDate, setMaxDate] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    let pValue;
    if (parent) {
        pValue = watch(parent);
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "DateField.useEffect": ()=>{
            if (!parent) return;
            if (!pValue || pValue === "") return setHide(true);
            setMinDate(pValue);
        }
    }["DateField.useEffect"], [
        pValue
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "DateField.useEffect": ()=>{
            if (!dateRange || !(dateRange instanceof Array)) return;
            if (!!dateRange[0]) setMinDate(dateRange[0]);
            if (!!dateRange[1]) setMaxDate(dateRange[1]);
        }
    }["DateField.useEffect"], [
        dateRange
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$x$2d$date$2d$pickers$2f$esm$2f$LocalizationProvider$2f$LocalizationProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LocalizationProvider"], {
        dateAdapter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$x$2d$date$2d$pickers$2f$esm$2f$AdapterDayjs$2f$AdapterDayjs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdapterDayjs"],
        children: [
            labelText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                sx: {
                    fontWeight: 500,
                    color: "#555"
                },
                children: [
                    labelText,
                    " ",
                    required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Controller"], {
                name: name,
                control: control,
                rules: disabled ? {} : validate,
                render: (param)=>{
                    let { field } = param;
                    const handleBlur = (event)=>{
                        field.onBlur();
                        const day = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(field.value);
                        if (field.value && day.isValid() && !day.isBefore((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(minDate)) && (!maxDate || !day.isAfter((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(maxDate)))) {} else {
                            field.onChange(null);
                        }
                    };
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$x$2d$date$2d$pickers$2f$esm$2f$DatePicker$2f$DatePicker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DatePicker"], {
                        ...field,
                        disabled: disabled,
                        value: field.value ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(field.value) : null,
                        label: label && (validate === null || validate === void 0 ? void 0 : validate.required) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RequiredLabel, {
                            label: label
                        }, void 0, false, {
                            fileName: "[project]/src/components/Form/Date.jsx",
                            lineNumber: 81,
                            columnNumber: 19
                        }, void 0) : label,
                        minDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(minDate),
                        maxDate: maxDate ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(maxDate) : undefined,
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
                                helperText: errors === null || errors === void 0 ? void 0 : errors.message,
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
_s(DateField, "Pd3sjPQfYBIsrGbhtFwbQ7wqYWI=");
_c1 = DateField;
var _c, _c1;
__turbopack_context__.k.register(_c, "RequiredLabel");
__turbopack_context__.k.register(_c1, "DateField");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/util/getOptions.js [app-client] (ecmascript) <export default as getOptions>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getOptions",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getOptions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getOptions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/getOptions.js [app-client] (ecmascript)");
}),
"[project]/src/components/Form/Select.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Select
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$index$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/forms/index.jsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$InputTextField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputTextField$3e$__ = __turbopack_context__.i("[project]/src/components/forms/InputTextField.jsx [app-client] (ecmascript) <export default as InputTextField>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$RequiredLabel$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RequiredLabel$3e$__ = __turbopack_context__.i("[project]/src/components/forms/RequiredLabel.jsx [app-client] (ecmascript) <export default as RequiredLabel>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-client] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Tooltip/Tooltip.js [app-client] (ecmascript) <export default as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Popper$2f$Popper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Popper$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Popper/Popper.js [app-client] (ecmascript) <export default as Popper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Paper/Paper.js [app-client] (ecmascript) <export default as Paper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Autocomplete$2f$Autocomplete$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Autocomplete$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Autocomplete/Autocomplete.js [app-client] (ecmascript) <locals> <export default as Autocomplete>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Chip/Chip.js [app-client] (ecmascript) <export default as Chip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Zoom$2f$Zoom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Zoom/Zoom.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$InfoOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/InfoOutlined.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Cancel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Cancel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Add$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Add.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-client] (ecmascript) <export * as Page>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getOptions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__getOptions$3e$__ = __turbopack_context__.i("[project]/src/util/getOptions.js [app-client] (ecmascript) <export default as getOptions>");
;
;
var _s = __turbopack_context__.k.signature();
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
function Select(param) {
    let { name, errors, control, options, api, parent, label, labelText, required = false, watch, validations, multiple, noOptions: noOptionsMessage, pValue: parentDefault, populate, onChange, isDisabled = false, onKeyUp, sx, showSelect = false, showLabel = true, showSelectAllBtn = true, addOptions, ...attr } = param;
    _s();
    const [newOption, setNewOption] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState("");
    const [isOpen, setIsOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [isPopperOpen, setIsPopperOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [hide, setHide] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [optionList, setOptionList] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(options);
    const [noOptions, setNoOptions] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(noOptionsMessage);
    const [validate, setValidate] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(validations);
    const hasError = !!errors;
    const errorMessage = errors === null || errors === void 0 ? void 0 : errors.message;
    const autocompleteRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useRef(null);
    let pValue = parentDefault !== null && parentDefault !== void 0 ? parentDefault : "";
    if (api) {
        if (parent instanceof Array) {
            let parentVal = [];
            for(let index = 0; index < parent.length; index++){
                parentVal[index] = watch(parent[index]);
            }
            pValue = parentVal.reduce((a, c)=>{
                if (!c) return a;
                if (a === "") return c;
                return "".concat(a.toLowerCase(), "-").concat(c);
            }, "");
        } else if (parent) {
            pValue = watch(parent);
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
            "Select.useEffect": ()=>{
                if (pValue && pValue != "") setNoOptions("Please wait...");
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getOptions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__getOptions$3e$__["getOptions"])(api, pValue, populate).then({
                    "Select.useEffect": (opts)=>{
                        if (!opts || opts.length === 0) return setHide(true);
                        setOptionList(opts);
                        setHide(false);
                    }
                }["Select.useEffect"]).catch({
                    "Select.useEffect": (e)=>{
                        setNoOptions(undefined);
                    }
                }["Select.useEffect"]).finally({
                    "Select.useEffect": ()=>{
                        if (pValue && pValue != "") setNoOptions(addOptions ? "Add ".concat(label) : "No ".concat(label, " available"));
                    }
                }["Select.useEffect"]);
            }
        }["Select.useEffect"], [
            pValue
        ]);
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "Select.useEffect": ()=>{
            if (api && api !== "") return;
            if (options) {
                setOptionList(options);
            }
        }
    }["Select.useEffect"], [
        options
    ]);
    const formattedOptions = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "Select.useMemo[formattedOptions]": ()=>{
            return (optionList || []).map({
                "Select.useMemo[formattedOptions]": (opt)=>{
                    var _opt_label;
                    return {
                        ...opt,
                        label: (_opt_label = opt.label) === null || _opt_label === void 0 ? void 0 : _opt_label.replace(RegExp("(^\\p{L}|\\s\\p{L})", "gu"), {
                            "Select.useMemo[formattedOptions]": (char)=>char.toLocaleUpperCase("en")
                        }["Select.useMemo[formattedOptions]"])
                    };
                }
            }["Select.useMemo[formattedOptions]"]);
        }
    }["Select.useMemo[formattedOptions]"], [
        optionList
    ]);
    if (hide && !showSelect) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {}, void 0, false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            formattedOptions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Controller"], {
                name: name,
                control: control,
                rules: validate,
                render: (param)=>{
                    let { field } = param;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                        position: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                                display: "flex",
                                justifyContent: "flex-end",
                                children: isOpen && formattedOptions.length > 1 && multiple && showSelectAllBtn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].MuiButton, {
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
                            labelText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                                sx: {
                                    fontWeight: 500,
                                    color: "#555"
                                },
                                children: [
                                    labelText,
                                    " ",
                                    required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Autocomplete$2f$Autocomplete$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Autocomplete$3e$__["Autocomplete"], {
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
                                                fn: (param)=>{
                                                    let { state } = param;
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
                                options: formattedOptions !== null && formattedOptions !== void 0 ? formattedOptions : [],
                                open: showSelectAllBtn || addOptions ? isOpen : undefined,
                                getOptionLabel: (option)=>option.label || "",
                                value: multiple ? Array.isArray(field.value) ? field.value.map((val)=>formattedOptions.find((opt)=>opt.value === val)).filter(Boolean) : [] : !Array.isArray(field.value) ? (formattedOptions === null || formattedOptions === void 0 ? void 0 : formattedOptions.find((opt)=>opt.value === field.value)) || null : null,
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
                                filterOptions: (options, param)=>{
                                    let { inputValue: searchTerm } = param;
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                                size: "small",
                                                label: "".concat(selected.length, " items selected"),
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
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Chip$2f$Chip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                                                size: "small",
                                                avatar: option.img ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                                                deleteIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                                    size: "small",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Cancel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
                                renderOption: (props, option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])("li", {
                                        ...props,
                                        key: option.value,
                                        __source: {
                                            fileName: "[project]/src/components/Form/Select.jsx",
                                            lineNumber: 323,
                                            columnNumber: 21
                                        }
                                    }, option.img ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                    var _params_InputProps;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$InputTextField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputTextField$3e$__["InputTextField"], {
                                        ...params,
                                        label: isDisabled ? label : (validate === null || validate === void 0 ? void 0 : validate.required) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$forms$2f$RequiredLabel$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RequiredLabel$3e$__["RequiredLabel"], {
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
                                                ...((_params_InputProps = params.InputProps) === null || _params_InputProps === void 0 ? void 0 : _params_InputProps.sx) || {}
                                            },
                                            endAdornment: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    hasError && errorMessage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                                        title: errorMessage,
                                                        arrow: true,
                                                        placement: "top-end",
                                                        slots: {
                                                            transition: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Zoom$2f$Zoom$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
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
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                                            size: "small",
                                                            "aria-label": "error info",
                                                            sx: {
                                                                p: 0
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$InfoOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
                                                    isOpen && addOptions && (!parent || pValue !== "") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                                                        mr: isOpen && multiple && Array.isArray(field.value) && field.value.length > 0 ? 3 : 0,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                                            title: "Add Option",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
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
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Add$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
            isPopperOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Popper$2f$Popper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Popper$3e$__["Popper"], {
                open: isPopperOpen,
                anchorEl: autocompleteRef.current,
                style: {
                    zIndex: 9999
                },
                placement: "bottom",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Divider, {
                            sx: {
                                my: 1
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/Form/Select.jsx",
                            lineNumber: 502,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].InputTextField, {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                            sx: {
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: 1
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].MuiButton, {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].MuiButton, {
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
                                        if (parent && pValue) setOptionList(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getOptions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__getOptions$3e$__["getOptions"])(api, pValue, populate));
                                        else setOptionList(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getOptions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__getOptions$3e$__["getOptions"])(api, "", populate));
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
_s(Select, "L/Le+YoEYceTmqe53csGld5j40U=");
_c = Select;
var _c;
__turbopack_context__.k.register(_c, "Select");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Form/Text.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript)");
;
;
function __TURBOPACK__default__export__(attr) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Form/Text.jsx [app-client] (ecmascript) <export default as Text>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Text",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Text$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Text$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Text.jsx [app-client] (ecmascript)");
}),
"[project]/src/components/Form/Upload.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Upload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Grid/Grid.js [app-client] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Tooltip/Tooltip.js [app-client] (ecmascript) <export default as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Dialog/Dialog.js [app-client] (ecmascript) <export default as Dialog>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Slider$2f$Slider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Slider$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Slider/Slider.js [app-client] (ecmascript) <export default as Slider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Button/Button.js [app-client] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$easy$2d$crop$2f$index$2e$module$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-easy-crop/index.module.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/Form/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Text$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Text$3e$__ = __turbopack_context__.i("[project]/src/components/Form/Text.jsx [app-client] (ecmascript) <export default as Text>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__ = __turbopack_context__.i("[project]/src/util/api.js [app-client] (ecmascript) <export default as api>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-client] (ecmascript) <export * as Page>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function getCroppedImg(imageSrc, croppedAreaPixels) {
    let outputType = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "image/jpeg";
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
function Upload(param) {
    let { onUpload, label = "", accept = "image/*", endpoint, name, editMode = false, setup = false, hideCaption = false, form, tooltipTitle = "Logo", multiple = false, ...attr } = param;
    _s();
    const inputRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const preview = form.watch(name); // could be string or array
    const outputType = accept.includes("image") ? "image/webp" : "";
    // ===== Crop states =====
    const [openCrop, setOpenCrop] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [selectedFiles, setSelectedFiles] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState([]);
    const [tempImgURLs, setTempImgURLs] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState([]);
    const [cropIndex, setCropIndex] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(0);
    const [crop, setCrop] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState({
        x: 0,
        y: 0
    });
    const [zoom, setZoom] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(null);
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
        const fileName = file.name.replace(/\.[^/.]+$/, ".".concat(ext));
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
        const resp = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__["api"].post(endpoint, formData);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__["Dialog"], {
                open: openCrop,
                onClose: ()=>setOpenCrop(false),
                fullWidth: true,
                maxWidth: "sm",
                sx: {
                    zIndex: 99999
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "relative",
                            height: 400
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$easy$2d$crop$2f$index$2e$module$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: 16
                        },
                        children: [
                            multiple && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Slider$2f$Slider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Slider$3e$__["Slider"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
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
            outputType === "image/webp" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                container: true,
                flexDirection: "column",
                gap: 0.5,
                children: [
                    editMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
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
                    multiple ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].MuiButton, {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                container: true,
                                flexDirection: "column",
                                sx: {
                                    width: "100%",
                                    height: "100%"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                        title: "".concat(!preview ? "Add" : "Edit", " ").concat(tooltipTitle),
                                        placement: "top",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                    !hideCaption && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Text$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Text$3e$__["Text"], {
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
                    multiple && Array.isArray(preview) && preview.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                        container: true,
                        spacing: 1,
                        sx: {
                            mt: 1,
                            px: editMode ? 3 : 0
                        },
                        children: preview.map((img, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                item: true,
                                xs: 4,
                                sm: 3,
                                md: 2,
                                sx: {
                                    position: "relative"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                mt: 1,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].MuiButton, {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                        mt: 1,
                        fontSize: 13,
                        children: multiple ? Array.isArray(preview) ? preview.join(", ") : "" : preview
                    }, void 0, false, {
                        fileName: "[project]/src/components/Form/Upload.jsx",
                        lineNumber: 375,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
_s(Upload, "Nb/TR5BV4tMaK2McZYTwB4Fe+W8=");
_c = Upload;
var _c;
__turbopack_context__.k.register(_c, "Upload");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Form/Active.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Active
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Select$2f$Select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Select/Select.js [app-client] (ecmascript) <export default as Select>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/MenuItem/MenuItem.js [app-client] (ecmascript) <export default as MenuItem>");
;
;
;
function Active(param) {
    let { info, api, LoadData, endpoint, disabled = false } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Select$2f$Select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
        value: info.isActive,
        disabled: disabled,
        onChange: async (e)=>{
            await api.put("".concat(endpoint).concat(info._id), {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
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
_c = Active;
var _c;
__turbopack_context__.k.register(_c, "Active");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Form/Switch.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Switch$2f$Switch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Switch$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Switch/Switch.js [app-client] (ecmascript) <export default as Switch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-client] (ecmascript) <export * as Page>");
;
;
;
;
;
function __TURBOPACK__default__export__(param) {
    let { label, control, defaultValue = false, ...attr } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
        display: "flex",
        alignItems: "center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Controller"], {
                ...attr,
                control: control,
                defaultValue: defaultValue,
                render: (param)=>{
                    let { field } = param;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Switch$2f$Switch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Switch$3e$__["Switch"], {
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
                    }, void 0);
                }
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Form/SwitchWithText.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SwitchWithText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-client] (ecmascript) <export * as Page>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/styles/styled.js [app-client] (ecmascript) <locals> <export default as styled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Switch$2f$Switch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Switch/Switch.js [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
const TextSwitch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$styled$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Switch$2f$Switch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])((param)=>{
    let { theme } = param;
    return {
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
    };
});
function SwitchWithText(param) {
    let { label, control, defaultValue = false, ...attr } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
        display: "flex",
        alignItems: "center",
        gap: 2.5,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Controller"], {
                ...attr,
                control: control,
                defaultValue: defaultValue,
                render: (param)=>{
                    let { field } = param;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TextSwitch, {
                        id: "toggle-switch-with-text",
                        checked: field.value,
                        onChange: (e)=>field.onChange(e.target.checked)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Form/SwitchWithText.jsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, void 0);
                }
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
_c = SwitchWithText;
var _c;
__turbopack_context__.k.register(_c, "SwitchWithText");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Form/Radio.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$RadioGroup$2f$RadioGroup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RadioGroup$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/RadioGroup/RadioGroup.js [app-client] (ecmascript) <export default as RadioGroup>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Radio$2f$Radio$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Radio/Radio.js [app-client] (ecmascript) <export default as Radio>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControlLabel$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/FormControlLabel/FormControlLabel.js [app-client] (ecmascript) <export default as FormControlLabel>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-client] (ecmascript) <export * as Page>");
;
;
;
;
;
function __TURBOPACK__default__export__(param) {
    let { label, control, defaultValue = "", options = [], ...attr } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
        display: "flex",
        alignItems: "center",
        sx: {
            width: "100%"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Controller"], {
                ...attr,
                control: control,
                defaultValue: defaultValue,
                render: (param)=>{
                    let { field } = param;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$RadioGroup$2f$RadioGroup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RadioGroup$3e$__["RadioGroup"], {
                        id: "radio-group",
                        row: true,
                        ...field,
                        onChange: (e)=>field.onChange(e.target.value),
                        value: field.value,
                        sx: {
                            gap: 2
                        },
                        children: options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControlLabel$3e$__["FormControlLabel"], {
                                value: opt.value,
                                control: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Radio$2f$Radio$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__["Radio"], {
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
                    }, void 0);
                }
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Form/DateRange.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Button/Button.js [app-client] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Popover$2f$Popover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Popover$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Popover/Popover.js [app-client] (ecmascript) <export default as Popover>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$ToggleButton$2f$ToggleButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ToggleButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/ToggleButton/ToggleButton.js [app-client] (ecmascript) <export default as ToggleButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$ToggleButtonGroup$2f$ToggleButtonGroup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ToggleButtonGroup$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/ToggleButtonGroup/ToggleButtonGroup.js [app-client] (ecmascript) <export default as ToggleButtonGroup>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TextField/TextField.js [app-client] (ecmascript) <export default as TextField>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$x$2d$date$2d$pickers$2f$esm$2f$DatePicker$2f$DatePicker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/x-date-pickers/esm/DatePicker/DatePicker.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$x$2d$date$2d$pickers$2f$esm$2f$LocalizationProvider$2f$LocalizationProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/x-date-pickers/esm/LocalizationProvider/LocalizationProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$x$2d$date$2d$pickers$2f$esm$2f$AdapterDayjs$2f$AdapterDayjs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/x-date-pickers/esm/AdapterDayjs/AdapterDayjs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CalendarToday$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/CalendarToday.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ArrowDropDown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/ArrowDropDown.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dayjs/dayjs.min.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().startOf("day"),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().endOf("day")
    ],
    yesterday: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().subtract(1, "day").startOf("day"),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().subtract(1, "day").endOf("day")
    ],
    thisWeek: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().startOf("week"),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().endOf("day")
    ],
    lastWeek: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().subtract(1, "week").startOf("week"),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().subtract(1, "week").endOf("week")
    ],
    thisMonth: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().startOf("month"),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().endOf("day")
    ],
    lastMonth: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().subtract(1, "month").startOf("month"),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().subtract(1, "month").endOf("month")
    ],
    thisYear: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().startOf("year"),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().endOf("day")
    ],
    lastYear: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().subtract(1, "year").startOf("year"),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().subtract(1, "year").endOf("year")
    ]
};
const DateRangeSelector = (param)=>{
    let { onUpdate, defaultValue, ...attr } = param;
    _s();
    const [anchorEl, setAnchorEl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dateRange, setDateRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(ranges.thisMonth);
    const [rangeType, setRangeType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultValue !== null && defaultValue !== void 0 ? defaultValue : "thisMonth");
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "DateRangeSelector.useEffect": ()=>{
            if (!onUpdate) return;
            onUpdate(dateRange.map({
                "DateRangeSelector.useEffect": (d)=>d.toDate()
            }["DateRangeSelector.useEffect"]));
        }
    }["DateRangeSelector.useEffect"], [
        dateRange
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "DateRangeSelector.useEffect": ()=>{
            if (rangeType === "custom") {
                setDateRange(dateRange !== null && dateRange !== void 0 ? dateRange : [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])()
                ]);
            } else {
                setDateRange(ranges[rangeType]);
            }
        }
    }["DateRangeSelector.useEffect"], [
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
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(date).format("MMM D, YYYY");
    };
    const buttonLabel = Array.isArray(dateRange) && dateRange[0] && dateRange[1] ? "".concat(formatDate(dateRange[0]), " - ").concat(formatDate(dateRange[1])) : "Select Date Range";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$x$2d$date$2d$pickers$2f$esm$2f$LocalizationProvider$2f$LocalizationProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LocalizationProvider"], {
        dateAdapter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$x$2d$date$2d$pickers$2f$esm$2f$AdapterDayjs$2f$AdapterDayjs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdapterDayjs"],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
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
                        ...attr === null || attr === void 0 ? void 0 : attr.sx
                    },
                    startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CalendarToday$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            fontSize: "12px !important"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/Form/DateRange.jsx",
                        lineNumber: 124,
                        columnNumber: 22
                    }, void 0),
                    endIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ArrowDropDown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Popover$2f$Popover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Popover$3e$__["Popover"], {
                    open: open,
                    anchorEl: anchorEl,
                    onClose: handleClose,
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            maxWidth: 350
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$ToggleButtonGroup$2f$ToggleButtonGroup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ToggleButtonGroup$3e$__["ToggleButtonGroup"], {
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
                                ].map((range)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$ToggleButton$2f$ToggleButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ToggleButton$3e$__["ToggleButton"], {
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
                            rangeType === "custom" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                sx: {
                                    p: 2
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            display: "flex",
                                            gap: 2,
                                            mb: 2
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$x$2d$date$2d$pickers$2f$esm$2f$DatePicker$2f$DatePicker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DatePicker"], {
                                                label: "Start Date",
                                                value: dateRange[0],
                                                maxDate: dateRange[1],
                                                onChange: handleDateRangeChange(0),
                                                renderInput: (params)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
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
                                                                fn: (param)=>{
                                                                    let { state } = param;
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$x$2d$date$2d$pickers$2f$esm$2f$DatePicker$2f$DatePicker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DatePicker"], {
                                                label: "End Date",
                                                value: dateRange[1],
                                                disableFuture: true,
                                                onChange: handleDateRangeChange(1),
                                                renderInput: (params)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TextField$2f$TextField$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
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
                                                                fn: (param)=>{
                                                                    let { state } = param;
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            mb: 2
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
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
_s(DateRangeSelector, "QfKKLUAwgcyFZz+MAIKkO1dqurM=");
_c = DateRangeSelector;
const __TURBOPACK__default__export__ = DateRangeSelector;
var _c;
__turbopack_context__.k.register(_c, "DateRangeSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Form/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TextEditor",
    ()=>TextEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Checkbox$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Checkbox.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Input$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Input.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Phone$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Phone.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Date$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Date.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Select$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Select.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Text$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Text.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Upload$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Upload.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Active$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Active.jsx [app-client] (ecmascript)");
// export { default as Field } from "./Field";
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Switch$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Switch.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$SwitchWithText$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/SwitchWithText.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Radio$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Radio.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$DateRange$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/DateRange.jsx [app-client] (ecmascript)");
;
"use client";
;
const TextEditor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(_c = ()=>__turbopack_context__.A("[project]/src/components/Form/TextEditor.jsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
    loadableGenerated: {
        modules: [
            "[project]/src/components/Form/TextEditor.jsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c1 = TextEditor;
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
var _c, _c1;
__turbopack_context__.k.register(_c, "TextEditor$dynamic");
__turbopack_context__.k.register(_c1, "TextEditor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Form/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Active",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Active$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "Checkbox",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Checkbox$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "Date",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Date$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "DateRangeSelector",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$DateRange$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "Input",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Input$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "Phone",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Phone$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "Radio",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Radio$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "Select",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Select$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "Switch",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Switch$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "SwitchWithText",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$SwitchWithText$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "Text",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Text$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "TextEditor",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TextEditor"],
    "Upload",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Upload$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/Form/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Checkbox$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Checkbox.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Input$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Input.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Phone$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Phone.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Date$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Date.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Select$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Select.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Text$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Text.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Upload$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Upload.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Active$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Active.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Switch$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Switch.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$SwitchWithText$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/SwitchWithText.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$Radio$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/Radio.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$DateRange$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/DateRange.jsx [app-client] (ecmascript)");
}),
"[project]/src/components/Format/Date.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>date
]);
function date(param) {
    let { date, format = "dd-mmm-yyyy", locale = "default" } = param;
    try {
        if (!date) return "";
        if (date instanceof Date) return date.showDate(format, locale);
        return new Date(date).showDate(format, locale);
    } catch (e) {
        return "";
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Format/Currency.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Currency
]);
function Currency(param) {
    let { value, currency = "INR", locale = "en-IN" } = param;
    if (!value) return "";
    return value.toMoney(currency, locale);
}
_c = Currency;
var _c;
__turbopack_context__.k.register(_c, "Currency");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Format/index.jsx [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Format$2f$Date$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Format/Date.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Format$2f$Currency$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Format/Currency.jsx [app-client] (ecmascript)");
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Format/index.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Currency",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Format$2f$Currency$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "Date",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Format$2f$Date$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Format$2f$index$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/Format/index.jsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Format$2f$Date$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Format/Date.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Format$2f$Currency$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Format/Currency.jsx [app-client] (ecmascript)");
}),
"[project]/src/components/SectionTitle.jsx [app-client] (ecmascript) <export default as SectionTitle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SectionTitle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SectionTitle$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SectionTitle$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SectionTitle.jsx [app-client] (ecmascript)");
}),
"[project]/src/components/Popup/Popup.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Popup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Dialog/Dialog.js [app-client] (ecmascript) <export default as Dialog>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/DialogTitle/DialogTitle.js [app-client] (ecmascript) <export default as DialogTitle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/DialogContent/DialogContent.js [app-client] (ecmascript) <export default as DialogContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-client] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CircularProgress/CircularProgress.js [app-client] (ecmascript) <export default as CircularProgress>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Close$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Close.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Edit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Edit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Download.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-client] (ecmascript) <export * as Page>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$index$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/index.jsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SectionTitle$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SectionTitle$3e$__ = __turbopack_context__.i("[project]/src/components/SectionTitle.jsx [app-client] (ecmascript) <export default as SectionTitle>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function Popup(attr) {
    _s();
    var _attr_open;
    const [open, setOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState((_attr_open = attr.open) !== null && _attr_open !== void 0 ? _attr_open : false);
    const { title, children, loading } = attr;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "Popup.useEffect": ()=>{
            if (attr.open !== undefined) {
                setOpen(attr.open);
            }
        }
    }["Popup.useEffect"], [
        attr.open
    ]);
    var _attr_maxWidth, _attr_minHeight;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__["Dialog"], {
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
        maxWidth: (_attr_maxWidth = attr.maxWidth) !== null && _attr_maxWidth !== void 0 ? _attr_maxWidth : "lg",
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__["DialogTitle"], {
                sx: {
                    m: 0,
                    p: 0
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SectionTitle$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SectionTitle$3e$__["SectionTitle"], {
                    title: title,
                    sx: {
                        px: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "18px",
                        fontWeight: "bold"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                        children: [
                            attr.onEdit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
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
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Edit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/src/components/Popup/Popup.jsx",
                                    lineNumber: 88,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Popup/Popup.jsx",
                                lineNumber: 78,
                                columnNumber: 15
                            }, this),
                            attr.onDownload && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
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
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/src/components/Popup/Popup.jsx",
                                    lineNumber: 102,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Popup/Popup.jsx",
                                lineNumber: 92,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
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
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Close$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__["DialogContent"], {
                sx: {
                    maxHeight: "80vh",
                    minHeight: (_attr_minHeight = attr.minHeight) !== null && _attr_minHeight !== void 0 ? _attr_minHeight : "10vh",
                    position: "relative",
                    p: 0,
                    m: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            p: 1
                        },
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/components/Popup/Popup.jsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
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
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__["CircularProgress"], {}, void 0, false, {
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
_s(Popup, "ymmIcruxwkAsiHhpsKCNKBIggxA=");
_c = Popup;
var _c;
__turbopack_context__.k.register(_c, "Popup");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Popup/DeleteWithPassword.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Popover$2f$Popover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Popover$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Popover/Popover.js [app-client] (ecmascript) <export default as Popover>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Grid/Grid.js [app-client] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-client] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Alert/Alert.js [app-client] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Close$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Close.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-client] (ecmascript) <export * as Page>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function DeleteWithPassword(param) {
    let { anchorEl, onConfirm, onClose, title = "Confirm Delete?", message = "Do you want to delete this? Enter your password to confirm", btnLabel = "Delete", errorMessage = null, ...attr } = param;
    _s();
    const [anchorElement, setAnchorElement] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(null);
    const [password, setPassword] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState("");
    const [remark, setRemark] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState("");
    const isConfirmEnabled = (()=>{
        if (password.trim() === "") return false;
        if (!(attr === null || attr === void 0 ? void 0 : attr.askRemarks)) return true;
        if (remark.trim() === "") return false;
        return true;
    })();
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "DeleteWithPassword.useEffect": ()=>{
            // if (!anchorEl) return;
            setAnchorElement(anchorEl);
        }
    }["DeleteWithPassword.useEffect"], [
        anchorEl
    ]);
    function Close(e) {
        setAnchorElement(null);
        setPassword("");
        setRemark("");
        if (onClose) onClose(e);
    }
    const open = Boolean(anchorElement);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Popover$2f$Popover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Popover$3e$__["Popover"], {
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
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                            container: true,
                            justifyContent: "space-between",
                            alignItems: "center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                    onClick: Close,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Close$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                            container: true,
                            sx: {
                                pt: 1,
                                pb: 0.5,
                                gap: 1.5
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].InputTextField, {
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
                                attr.askRemarks && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].InputTextField, {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                            sx: {
                                pb: 2
                            },
                            children: errorMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
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
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                            container: true,
                            size: 12,
                            justifyContent: "flex-end",
                            gap: 0.5,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].MuiButton, {
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
_s(DeleteWithPassword, "GgvVQo/RgTm49K2fyOrWefsm9z4=");
_c = DeleteWithPassword;
const __TURBOPACK__default__export__ = DeleteWithPassword;
var _c;
__turbopack_context__.k.register(_c, "DeleteWithPassword");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Popup/SideDrawer.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SideDrawer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Drawer$2f$Drawer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Drawer$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Drawer/Drawer.js [app-client] (ecmascript) <export default as Drawer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-client] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Grid/Grid.js [app-client] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Close$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Close.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Edit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Edit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-client] (ecmascript) <export * as Page>");
"use client";
;
;
;
;
;
;
function SideDrawer(param) {
    let { open, onClose, onEdit, anchor = "left", children, title = "term", hideTitleBar = false, width = 900 } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Drawer$2f$Drawer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Drawer$3e$__["Drawer"], {
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
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
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
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                sx: {
                    bgcolor: "white",
                    p: hideTitleBar ? 0 : 2,
                    borderRadius: 2
                },
                children: [
                    !hideTitleBar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                        container: true,
                        sx: {
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 1,
                            pl: 2,
                            flexWrap: "nowrap"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                                sx: {
                                    display: "flex",
                                    gap: 1
                                },
                                children: [
                                    onEdit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                        onClick: onEdit,
                                        sx: {
                                            color: "#007acc"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Edit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                            fileName: "[project]/src/components/Popup/SideDrawer.jsx",
                                            lineNumber: 81,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Popup/SideDrawer.jsx",
                                        lineNumber: 80,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                        onClick: onClose,
                                        sx: {
                                            color: "#007acc"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Close$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
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
_c = SideDrawer;
var _c;
__turbopack_context__.k.register(_c, "SideDrawer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Popup/PopperForm.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-client] (ecmascript) <export * as Page>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Grid/Grid.js [app-client] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Popper$2f$Popper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Popper$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Popper/Popper.js [app-client] (ecmascript) <export default as Popper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Paper/Paper.js [app-client] (ecmascript) <export default as Paper>");
;
var _s = __turbopack_context__.k.signature();
;
;
;
const PopperForm = (param)=>{
    let { anchorEl, setAnchorEl: onClose, title, children, onSubmit } = param;
    _s();
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "PopperForm.useEffect": ()=>{
            const handleEscape = {
                "PopperForm.useEffect.handleEscape": (event)=>{
                    if (event.key === "Escape" && anchorEl) {
                        onClose(null);
                    }
                }
            }["PopperForm.useEffect.handleEscape"];
            if (anchorEl) {
                document.addEventListener("keydown", handleEscape);
            }
            return ({
                "PopperForm.useEffect": ()=>{
                    document.removeEventListener("keydown", handleEscape);
                }
            })["PopperForm.useEffect"];
        }
    }["PopperForm.useEffect"], [
        anchorEl,
        onClose
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            anchorEl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Popper$2f$Popper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Popper$3e$__["Popper"], {
                open: Boolean(anchorEl),
                anchorEl: anchorEl,
                style: {
                    zIndex: 9000
                },
                placement: "bottom",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                            sx: {
                                fontWeight: "bold"
                            },
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/src/components/Popup/PopperForm.jsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Divider, {
                            sx: {
                                my: 1
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/Popup/PopperForm.jsx",
                            lineNumber: 68,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                            sx: {
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: 1
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].MuiButton, {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].MuiButton, {
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
_s(PopperForm, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = PopperForm;
const __TURBOPACK__default__export__ = PopperForm;
var _c;
__turbopack_context__.k.register(_c, "PopperForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Popup/Confirm.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-client] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Popover$2f$Popover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Popover$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Popover/Popover.js [app-client] (ecmascript) <export default as Popover>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Check.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Clear$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Clear.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-client] (ecmascript) <export * as Page>");
;
;
;
;
;
;
function Confirm(param) {
    let { onClose, onConfirm, position, message = "Confirm Change?" } = param;
    console.log({
        position
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Popover$2f$Popover$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Popover$3e$__["Popover"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
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
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
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
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Clear$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
_c = Confirm;
const __TURBOPACK__default__export__ = Confirm;
var _c;
__turbopack_context__.k.register(_c, "Confirm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Popup/index.jsx [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Popup$2f$Popup$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Popup/Popup.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Popup$2f$DeleteWithPassword$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Popup/DeleteWithPassword.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Popup$2f$SideDrawer$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Popup/SideDrawer.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Popup$2f$PopperForm$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Popup/PopperForm.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Popup$2f$Confirm$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Popup/Confirm.jsx [app-client] (ecmascript)");
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Popup/index.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Confirm",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Popup$2f$Confirm$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "DeleteWithPassword",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Popup$2f$DeleteWithPassword$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "PopperForm",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Popup$2f$PopperForm$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "Popup",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Popup$2f$Popup$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "SideDrawer",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Popup$2f$SideDrawer$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Popup$2f$index$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/Popup/index.jsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Popup$2f$Popup$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Popup/Popup.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Popup$2f$DeleteWithPassword$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Popup/DeleteWithPassword.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Popup$2f$SideDrawer$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Popup/SideDrawer.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Popup$2f$PopperForm$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Popup/PopperForm.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Popup$2f$Confirm$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Popup/Confirm.jsx [app-client] (ecmascript)");
}),
"[project]/src/components/index.jsx [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Datatable$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Datatable.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PaginationButtons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/PaginationButtons.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SectionTitle$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SectionTitle.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PageTitle$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/PageTitle.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Toast$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Toast.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FlagAndCountryCode$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/FlagAndCountryCode.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SelectedActions$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SelectedActions.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DownloadTable$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/DownloadTable.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RequiredLabel$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RequiredLabel.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/Form/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Format$2f$index$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/Format/index.jsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Format$2f$index$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Format/index.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Popup$2f$index$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/Popup/index.jsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Popup$2f$index$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Popup/index.jsx [app-client] (ecmascript)");
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/DownloadTable.jsx [app-client] (ecmascript) <export default as DownloadTable>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DownloadTable",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DownloadTable$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DownloadTable$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/DownloadTable.jsx [app-client] (ecmascript)");
}),
"[project]/src/components/Datatable.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Icon",
    ()=>Icon,
    "ShowProgress",
    ()=>ShowProgress,
    "default",
    ()=>Datatable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Table$2f$Table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Table/Table.js [app-client] (ecmascript) <export default as Table>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableBody$2f$TableBody$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableBody$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableBody/TableBody.js [app-client] (ecmascript) <export default as TableBody>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableCell/TableCell.js [app-client] (ecmascript) <export default as TableCell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableContainer$2f$TableContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableContainer$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableContainer/TableContainer.js [app-client] (ecmascript) <export default as TableContainer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableHead$2f$TableHead$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableHead$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableHead/TableHead.js [app-client] (ecmascript) <export default as TableHead>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TablePagination$2f$TablePagination$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TablePagination$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TablePagination/TablePagination.js [app-client] (ecmascript) <export default as TablePagination>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableRow/TableRow.js [app-client] (ecmascript) <export default as TableRow>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableFooter$2f$TableFooter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableFooter$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableFooter/TableFooter.js [app-client] (ecmascript) <export default as TableFooter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableSortLabel$2f$TableSortLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableSortLabel$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/TableSortLabel/TableSortLabel.js [app-client] (ecmascript) <export default as TableSortLabel>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Toolbar$2f$Toolbar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Toolbar$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Toolbar/Toolbar.js [app-client] (ecmascript) <export default as Toolbar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Paper/Paper.js [app-client] (ecmascript) <export default as Paper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Checkbox/Checkbox.js [app-client] (ecmascript) <export default as Checkbox>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/IconButton/IconButton.js [app-client] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Tooltip/Tooltip.js [app-client] (ecmascript) <export default as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Select$2f$Select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Select/Select.js [app-client] (ecmascript) <export default as Select>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Menu$2f$Menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Menu/Menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/MenuItem/MenuItem.js [app-client] (ecmascript) <export default as MenuItem>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CircularProgress/CircularProgress.js [app-client] (ecmascript) <export default as CircularProgress>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-client] (ecmascript) <export * as Page>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PaginationButtons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/PaginationButtons.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$index$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/index.jsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DownloadTable$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DownloadTable$3e$__ = __turbopack_context__.i("[project]/src/components/DownloadTable.jsx [app-client] (ecmascript) <export default as DownloadTable>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DownloadTable$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/DownloadTable.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
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
    var _attr_tabIndex;
    const iconBtn = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
        ...aria,
        disabled: attr.disabled,
        tabIndex: (_attr_tabIndex = attr.tabIndex) !== null && _attr_tabIndex !== void 0 ? _attr_tabIndex : 0,
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
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
            attr.showLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
    return (attr === null || attr === void 0 ? void 0 : attr.disableTooltip) ? iconBtn : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
        title: attr.label,
        placement: "top",
        arrow: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
_c = Icon;
function ColHeader(attr) {
    var _col_feature;
    _s();
    const col = attr.col;
    const feature = col === null || col === void 0 ? void 0 : (_col_feature = col.feature) === null || _col_feature === void 0 ? void 0 : _col_feature.reduce((a, c)=>{
        a[c] = true;
        return a;
    }, {});
    const [isHovered, setIsHovered] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const alignToJustifyContent = {
        start: "flex-start",
        center: "center",
        end: "flex-end",
        left: "flex-start",
        right: "flex-end"
    };
    var _col_align;
    const isEndOrRight = [
        "end",
        "right"
    ].includes((_col_align = col.align) !== null && _col_align !== void 0 ? _col_align : "start");
    var _col_align1, _col_width, _col_align2, _col_align3;
    return attr.visible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
        align: (_col_align1 = col.align) !== null && _col_align1 !== void 0 ? _col_align1 : "start",
        padding: "none",
        sortDirection: attr.sorted,
        sx: {
            paddingLeft: "8px",
            paddingRight: "4px",
            top: 0,
            bgcolor: attr.headerColor ? "".concat(attr.headerColor, " !important") : "#063686",
            color: "white",
            zIndex: attr.locked ? 4 : 2,
            fontWeight: "600",
            fontSize: "14px",
            minWidth: (_col_width = col.width) !== null && _col_width !== void 0 ? _col_width : 200,
            width: col.width || 200,
            height: "36px",
            textAlign: (_col_align2 = col.align) !== null && _col_align2 !== void 0 ? _col_align2 : "start",
            ...attr.locked && {
                position: "sticky",
                left: "".concat(attr.lockOffset, "px"),
                boxShadow: "2px 0 5px -2px rgba(0, 0, 0, 0.3)"
            }
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
            sx: {
                display: "flex",
                alignItems: "center",
                justifyContent: alignToJustifyContent[(_col_align3 = col.align) !== null && _col_align3 !== void 0 ? _col_align3 : "start"]
            },
            children: [
                (feature === null || feature === void 0 ? void 0 : feature.sortable) && isEndOrRight && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableSortLabel$2f$TableSortLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableSortLabel$3e$__["TableSortLabel"], {
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
                (feature === null || feature === void 0 ? void 0 : feature.sortable) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    component: "span",
                    onClick: (event)=>{
                        attr.onSort(event, col.id);
                    },
                    onMouseEnter: ()=>setIsHovered(true),
                    onMouseLeave: ()=>setIsHovered(false),
                    sx: {
                        cursor: "pointer"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
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
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: col.label
                }, void 0, false, {
                    fileName: "[project]/src/components/Datatable.jsx",
                    lineNumber: 192,
                    columnNumber: 13
                }, this),
                (feature === null || feature === void 0 ? void 0 : feature.lockable) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                    title: "Toggle Column Lock",
                    placement: "top",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
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
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: "fa fa-".concat(attr.locked ? "lock" : "lock-open"),
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
                (feature === null || feature === void 0 ? void 0 : feature.sortable) && !isEndOrRight && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableSortLabel$2f$TableSortLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableSortLabel$3e$__["TableSortLabel"], {
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
_s(ColHeader, "FPQn8a98tPjpohC7NUYORQR8GJE=");
_c1 = ColHeader;
function Datatable(param) {
    let { parentData = null, hideToolbar = false, hideDownload = false, hideColumnSelector = false, columns, disabled, ...attr } = param;
    var _columns_find, _attr_progress;
    _s1();
    const [hidePagination, setHidePagination] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [showSearch, setShowSearch] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [order, setOrder] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]("asc");
    const [orderBy, setOrderBy] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]("");
    const [selected, setSelected] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    const [page, setPage] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](0);
    var _attr_pageSize;
    const [pageSize, setRowsPerPage] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]((_attr_pageSize = attr.pageSize) !== null && _attr_pageSize !== void 0 ? _attr_pageSize : 10);
    const [showSelectColumns, setShowSelectColumns] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [searchTerms, setSearchTerms] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({});
    const [lockedColumns, setLockedColumns] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({});
    const [lockedRows, setLockedRows] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({});
    const [filterValues, setFilterValues] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({});
    const [categoryFilterAnchor, setCategoryFilterAnchor] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [categoryFilter, setCategoryFilter] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    const tableRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"]();
    const [statusFilterAnchor, setStatusFilterAnchor] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [statusFilter, setStatusFilter] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    const disabledColumns = attr.disabledColumns || [];
    const defaultHiddenColumns = attr.defaultHiddenColumns || [];
    const [columnVisibility, setColumnVisibility] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        "Datatable.useState": ()=>columns.reduce({
                "Datatable.useState": (acc, cell)=>({
                        ...acc,
                        [cell.id]: !cell.hidden && !defaultHiddenColumns.includes(cell.id)
                    })
            }["Datatable.useState"], {})
    }["Datatable.useState"]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "Datatable.useEffect": ()=>{
            setHidePagination(attr.hidePagination);
        }
    }["Datatable.useEffect"], [
        attr.hidePagination
    ]);
    const hasSearchableColumn = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "Datatable.useMemo[hasSearchableColumn]": ()=>{
            return columns.some({
                "Datatable.useMemo[hasSearchableColumn]": (col)=>{
                    var _col_feature;
                    return col === null || col === void 0 ? void 0 : (_col_feature = col.feature) === null || _col_feature === void 0 ? void 0 : _col_feature.includes("searchable");
                }
            }["Datatable.useMemo[hasSearchableColumn]"]);
        }
    }["Datatable.useMemo[hasSearchableColumn]"], [
        columns
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "Datatable.useEffect": ()=>{
            setColumnVisibility(columns.reduce({
                "Datatable.useEffect": (acc, cell)=>({
                        ...acc,
                        [cell.id]: !cell.hidden && !defaultHiddenColumns.includes(cell.id)
                    })
            }["Datatable.useEffect"], {}));
        }
    }["Datatable.useEffect"], [
        columns
    ]);
    const handleColumnToggle = (columnId)=>{
        if (disabledColumns.includes(columnId)) return;
        setColumnVisibility((prev)=>({
                ...prev,
                [columnId]: !prev[columnId]
            }));
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "Datatable.useEffect": ()=>{
            if (!attr.onSelect) return;
            attr.onSelect(selected);
        }
    }["Datatable.useEffect"], [
        selected
    ]);
    const data = attr.data;
    const loading = "isLoading" in attr ? attr.isLoading : !data || data.length === 0;
    // const loading = attr.data === undefined;
    const effectiveStatusOptions = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "Datatable.useMemo[effectiveStatusOptions]": ()=>{
            var _attr_statusOptions;
            if (!data || data.length === 0 || !((_attr_statusOptions = attr.statusOptions) === null || _attr_statusOptions === void 0 ? void 0 : _attr_statusOptions.length)) {
                return [];
            }
            const uniqueStatuses = [
                ...new Set(data.map({
                    "Datatable.useMemo[effectiveStatusOptions].uniqueStatuses": (row)=>String(row.status)
                }["Datatable.useMemo[effectiveStatusOptions].uniqueStatuses"]))
            ].filter({
                "Datatable.useMemo[effectiveStatusOptions].uniqueStatuses": (value)=>value && value !== "null" && value !== "undefined"
            }["Datatable.useMemo[effectiveStatusOptions].uniqueStatuses"]);
            return attr.statusOptions.filter({
                "Datatable.useMemo[effectiveStatusOptions]": (option)=>uniqueStatuses.includes(option.value)
            }["Datatable.useMemo[effectiveStatusOptions]"]).map({
                "Datatable.useMemo[effectiveStatusOptions]": (param)=>{
                    let { value, label } = param;
                    return {
                        value,
                        label
                    };
                }
            }["Datatable.useMemo[effectiveStatusOptions]"]).sort({
                "Datatable.useMemo[effectiveStatusOptions]": (a, b)=>a.label.localeCompare(b.label)
            }["Datatable.useMemo[effectiveStatusOptions]"]);
        }
    }["Datatable.useMemo[effectiveStatusOptions]"], [
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
    const getRowValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "Datatable.useCallback[getRowValue]": (row, columnId)=>{
            const col = columns.find({
                "Datatable.useCallback[getRowValue].col": (c)=>c.id === columnId
            }["Datatable.useCallback[getRowValue].col"]);
            if (!col) return "";
            if (col.data) {
                var _row_col_data;
                return (_row_col_data = row[col.data]) !== null && _row_col_data !== void 0 ? _row_col_data : "";
            }
            if (col.render) {
                const rendered = col.render(row, parentData);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DownloadTable$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxToText"])(rendered);
            }
            var _row_columnId;
            return (_row_columnId = row[columnId]) !== null && _row_columnId !== void 0 ? _row_columnId : "";
        }
    }["Datatable.useCallback[getRowValue]"], [
        columns,
        parentData
    ]);
    const filteredRows = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "Datatable.useMemo[filteredRows]": ()=>{
            const rows = Array.isArray(data) ? data : [];
            return rows.filter({
                "Datatable.useMemo[filteredRows]": (row)=>{
                    var _row_category, _row_category1, _row_category2, _row_category3;
                    if (!row) return false;
                    const matchesSearch = Object.entries(searchTerms).every({
                        "Datatable.useMemo[filteredRows].matchesSearch": (param)=>{
                            let [column, term] = param;
                            return !term || String(row[column]).toLowerCase().includes(term.toLowerCase()) || String(getRowValue(row, column)).toLowerCase().includes(term.toLowerCase());
                        }
                    }["Datatable.useMemo[filteredRows].matchesSearch"]);
                    const matchesFilters = Object.entries(filterValues).every({
                        "Datatable.useMemo[filteredRows].matchesFilters": (param)=>{
                            let [column, value] = param;
                            return !value || String(row[column]) === value;
                        }
                    }["Datatable.useMemo[filteredRows].matchesFilters"]);
                    const matchesCategory = categoryFilter.length === 0 || categoryFilter.includes("client") && categoryFilter.includes("vendor") && ((_row_category = row.category) === null || _row_category === void 0 ? void 0 : _row_category.isClient) && ((_row_category1 = row.category) === null || _row_category1 === void 0 ? void 0 : _row_category1.isVendor) || categoryFilter.includes("client") && !categoryFilter.includes("vendor") && ((_row_category2 = row.category) === null || _row_category2 === void 0 ? void 0 : _row_category2.isClient) || categoryFilter.includes("vendor") && !categoryFilter.includes("client") && ((_row_category3 = row.category) === null || _row_category3 === void 0 ? void 0 : _row_category3.isVendor);
                    const matchesBidStatus = statusFilter.length === 0 || statusFilter.includes(row.status);
                    return matchesSearch && matchesFilters && matchesCategory && matchesBidStatus;
                }
            }["Datatable.useMemo[filteredRows]"]);
        }
    }["Datatable.useMemo[filteredRows]"], [
        data,
        searchTerms,
        filterValues,
        categoryFilter,
        statusFilter
    ]);
    const visibleRows = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "Datatable.useMemo[visibleRows]": ()=>{
            const sorted = [
                ...filteredRows
            ].sort(getComparator(order, orderBy));
            return hidePagination ? sorted : sorted.slice(page * pageSize, page * pageSize + pageSize);
        }
    }["Datatable.useMemo[visibleRows]"], [
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
            var _col_feature;
            if ((col === null || col === void 0 ? void 0 : (_col_feature = col.feature) === null || _col_feature === void 0 ? void 0 : _col_feature.includes("total")) && columnVisibility[col.id]) {
                const sum = rows.reduce((acc, row)=>{
                    let value;
                    if (col.data) {
                        value = parseFloat(row[col.data]);
                    } else if (col.render) {
                        let temp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DownloadTable$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxToText"])(col.render(row, parentData)).replace(/[^\d.-]+/g, "");
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
    const columnTotals = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "Datatable.useMemo[columnTotals]": ()=>calculateColumnTotals(visibleRows, columns, columnVisibility, parentData)
    }["Datatable.useMemo[columnTotals]"], [
        visibleRows,
        columns,
        columnVisibility,
        parentData
    ]);
    const columnTotalsOverall = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "Datatable.useMemo[columnTotalsOverall]": ()=>calculateColumnTotals(filteredRows, columns, columnVisibility, parentData)
    }["Datatable.useMemo[columnTotalsOverall]"], [
        filteredRows,
        columns,
        columnVisibility,
        parentData
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "Datatable.useEffect": ()=>{
            setSelected([]);
        }
    }["Datatable.useEffect"], [
        data
    ]);
    const firstVisibleColumn = (_columns_find = columns.find((col)=>columnVisibility[col.id])) === null || _columns_find === void 0 ? void 0 : _columns_find.id;
    var _attr_noDataMsg;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            minWidth: "100%"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    p: 0.5
                },
                children: [
                    !hideToolbar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            width: "100%"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Toolbar$2f$Toolbar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Toolbar$3e$__["Toolbar"], {
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
                                    attr.back && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        iconClass: "fa fa-arrow-left",
                                        onClick: attr.back,
                                        label: "Back"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Datatable.jsx",
                                        lineNumber: 583,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
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
                                    attr.upload && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        iconClass: "fas fa-upload",
                                        onClick: attr.upload,
                                        label: "Upload"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Datatable.jsx",
                                        lineNumber: 598,
                                        columnNumber: 17
                                    }, this),
                                    attr.categoryFilter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        iconClass: "fas fa-tag",
                                        onClick: handleOpenCategoryFilter,
                                        label: "Filter by category"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Datatable.jsx",
                                        lineNumber: 605,
                                        columnNumber: 17
                                    }, this),
                                    attr.statusFilter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        iconClass: "fas fa-tag",
                                        onClick: handleOpenStatusFilter,
                                        label: "Filter by status"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Datatable.jsx",
                                        lineNumber: 612,
                                        columnNumber: 17
                                    }, this),
                                    attr.add && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        iconClass: "fas fa-plus",
                                        onClick: attr.add,
                                        label: "Add"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Datatable.jsx",
                                        lineNumber: 619,
                                        columnNumber: 17
                                    }, this),
                                    !hideDownload && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        iconClass: "fas fa-download",
                                        label: "Download Table Data",
                                        onClick: (e)=>{
                                            const visibleColumns = columns.filter((col)=>columnVisibility[col.id]);
                                            const headers = visibleColumns.map((col)=>col.label);
                                            const dataRows = filteredRows.map((row)=>{
                                                return visibleColumns.map((col)=>{
                                                    if (col.data) {
                                                        var _row_col_data;
                                                        return (_row_col_data = row === null || row === void 0 ? void 0 : row[col.data]) !== null && _row_col_data !== void 0 ? _row_col_data : "";
                                                    } else if (col.render) {
                                                        const rendered = col.render(row, parentData);
                                                        return rendered;
                                                    }
                                                    return "";
                                                });
                                            });
                                            const totalsRow = visibleColumns.map((col, index)=>{
                                                var _col_feature;
                                                if (index === 0 && col.id === firstVisibleColumn) {
                                                    return "Total";
                                                }
                                                return (col === null || col === void 0 ? void 0 : (_col_feature = col.feature) === null || _col_feature === void 0 ? void 0 : _col_feature.includes("total")) ? columnTotalsOverall[col.id] || "0.00" : "";
                                            });
                                            const exportData = [
                                                headers,
                                                ...dataRows,
                                                totalsRow
                                            ];
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DownloadTable$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DownloadTable$3e$__["DownloadTable"])({
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
                                    hasSearchableColumn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
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
                                    !hideColumnSelector && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Menu$2f$Menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                anchorEl: showSelectColumns,
                                open: Boolean(showSelectColumns),
                                onClose: handleCloseColumnMenu,
                                children: columns.map((cell)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                        onClick: ()=>handleColumnToggle(cell.id),
                                        disabled: disabledColumns.includes(cell.id),
                                        sx: {
                                            fontSize: 14,
                                            px: 2,
                                            py: 0.5
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__["Checkbox"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Menu$2f$Menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                anchorEl: statusFilterAnchor,
                                open: Boolean(statusFilterAnchor),
                                onClose: handleCloseStatusFilter,
                                children: effectiveStatusOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                        onClick: ()=>handleStatusFilterToggle(option.value),
                                        sx: {
                                            fontSize: 14,
                                            pr: 3,
                                            py: 0.5
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__["Checkbox"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Menu$2f$Menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                anchorEl: categoryFilterAnchor,
                                open: Boolean(categoryFilterAnchor),
                                onClose: handleCloseCategoryFilter,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                        onClick: ()=>handleCategoryFilterToggle("client"),
                                        sx: {
                                            fontSize: 14,
                                            px: 2,
                                            py: 0.5
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__["Checkbox"], {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
                                        onClick: ()=>handleCategoryFilterToggle("vendor"),
                                        sx: {
                                            fontSize: 14,
                                            px: 2,
                                            py: 0.5
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__["Checkbox"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            position: "relative"
                        },
                        children: [
                            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                                        sx: {
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)",
                                            display: "inline-flex",
                                            zIndex: 10
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__["CircularProgress"], {
                                                size: 70,
                                                thickness: 1
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Datatable.jsx",
                                                lineNumber: 775,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
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
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableContainer$2f$TableContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableContainer$3e$__["TableContainer"], {
                                component: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"],
                                sx: {
                                    boxShadow: 2,
                                    borderRadius: 2,
                                    maxHeight: attr.maxHeight || ((attr === null || attr === void 0 ? void 0 : attr.withSelected) ? "calc(100vh - 293px)" : "calc(100vh - 250px)"),
                                    // maxHeight: "545px",
                                    overflow: "auto",
                                    position: "relative",
                                    minWidth: "100%"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Table$2f$Table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__["Table"], {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableHead$2f$TableHead$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableHead$3e$__["TableHead"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                                                    children: [
                                                        attr.rowLockable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
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
                                                        attr.rowSelectable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                            sx: {
                                                                position: "sticky",
                                                                top: 0,
                                                                bgcolor: attr.headerColor ? "".concat(attr.headerColor, " !important") : "#04662b",
                                                                width: "35.5px !important",
                                                                maxWidth: "35.5px !important",
                                                                p: "0 !important"
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                                                                sx: {
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    alignItems: "center"
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__["Checkbox"], {
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
                                                        columns.map((col)=>{
                                                            var _attr_headerColor;
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ColHeader, {
                                                                col: col,
                                                                visible: columnVisibility[col.id],
                                                                locked: lockedColumns[col.id],
                                                                sorted: orderBy === col.id ? order : false,
                                                                onSort: onSort,
                                                                headerColor: (_attr_headerColor = attr.headerColor) !== null && _attr_headerColor !== void 0 ? _attr_headerColor : "#063686",
                                                                onLock: onLockColumn,
                                                                lockOffset: getLockedColumnOffset(col.id)
                                                            }, col.id, false, {
                                                                fileName: "[project]/src/components/Datatable.jsx",
                                                                lineNumber: 910,
                                                                columnNumber: 21
                                                            }, this);
                                                        })
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/Datatable.jsx",
                                                    lineNumber: 849,
                                                    columnNumber: 17
                                                }, this),
                                                showSearch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                                                    children: [
                                                        attr.rowLockable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
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
                                                        attr.rowSelectable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
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
                                                            var _col_feature, _col_feature1;
                                                            const searchable = col === null || col === void 0 ? void 0 : (_col_feature = col.feature) === null || _col_feature === void 0 ? void 0 : _col_feature.includes("searchable");
                                                            const filterable = col === null || col === void 0 ? void 0 : (_col_feature1 = col.feature) === null || _col_feature1 === void 0 ? void 0 : _col_feature1.includes("filterable");
                                                            if (!columnVisibility[col.id]) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {}, void 0, false);
                                                            var _col_align, _col_width, _col_align1;
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                                align: (_col_align = col.align) !== null && _col_align !== void 0 ? _col_align : "start",
                                                                sx: {
                                                                    top: headerRowHeight,
                                                                    zIndex: lockedColumns[col.id] ? 5 : 1,
                                                                    backgroundColor: "white",
                                                                    border: "1px solid rgba(0, 0, 0, 0.12) !important",
                                                                    minWidth: (_col_width = col.width) !== null && _col_width !== void 0 ? _col_width : 200,
                                                                    py: 0.5,
                                                                    pr: 1,
                                                                    pl: 0,
                                                                    ...lockedColumns[col.id] && {
                                                                        position: "sticky",
                                                                        left: "".concat(getLockedColumnOffset(col.id), "px"),
                                                                        boxShadow: "2px 0 5px -2px rgba(0, 0, 0, 0.3)"
                                                                    }
                                                                },
                                                                children: [
                                                                    searchable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].InputTextField, {
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
                                                                                textAlign: (_col_align1 = col.align) !== null && _col_align1 !== void 0 ? _col_align1 : "start"
                                                                            }
                                                                        },
                                                                        size: "small",
                                                                        type: "text",
                                                                        value: searchTerms[col.id] || "",
                                                                        onChange: (e)=>onSearch(e, col.id),
                                                                        placeholder: "Search ".concat(col.label)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/Datatable.jsx",
                                                                        lineNumber: 974,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    filterable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Select$2f$Select$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
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
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
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
                                                                            getFilterOptions(col.id).map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MenuItem$2f$MenuItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MenuItem$3e$__["MenuItem"], {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableBody$2f$TableBody$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableBody$3e$__["TableBody"], {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
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
                                            }, this) : visibleRows.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    visibleRows.map((row, index)=>{
                                                        if (!row) return null;
                                                        const isItemSelected = (row === null || row === void 0 ? void 0 : row.id) ? isSelected(row.id) : false;
                                                        const isLocked = lockedRows[row.id];
                                                        const rowTop = isLocked ? stickyOffset : "auto";
                                                        if (isLocked) {
                                                            stickyOffset += 33;
                                                        }
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                                                            hover: true,
                                                            tabIndex: -1,
                                                            selected: isItemSelected,
                                                            sx: {
                                                                // wordBreak: "break-word",
                                                                // whiteSpace: "pre-wrap",
                                                                // overflowWrap: "break-word",
                                                                position: isLocked ? "sticky" : "static",
                                                                top: isLocked ? "".concat(rowTop, "px") : "auto",
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
                                                                attr.rowLockable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                                    sx: {
                                                                        width: "20px"
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                                                        title: "Toggle Row Lock",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
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
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                                className: "fa fa-".concat(lockedRows[row.id] ? "lock" : "lock-open")
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
                                                                attr.rowSelectable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                                    sx: {
                                                                        width: "35.5px !important",
                                                                        maxWidth: "35.5px !important",
                                                                        p: "0 !important"
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                                                                        sx: {
                                                                            display: "flex",
                                                                            justifyContent: "center",
                                                                            alignItems: "center"
                                                                        },
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__["Checkbox"], {
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
                                                                columns.map((cell)=>{
                                                                    var _cell_render;
                                                                    var _row_cell_data, _cell_render1;
                                                                    return columnVisibility[cell.id] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
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
                                                                                left: "".concat(getLockedColumnOffset(cell.id), "px"),
                                                                                backgroundColor: "inherit",
                                                                                boxShadow: "2px 0 5px -2px rgba(0, 0, 0, 0.3)",
                                                                                zIndex: 2
                                                                            }
                                                                        },
                                                                        children: cell.data ? (_row_cell_data = row === null || row === void 0 ? void 0 : row[cell.data]) !== null && _row_cell_data !== void 0 ? _row_cell_data : "" : (_cell_render1 = (_cell_render = cell.render) === null || _cell_render === void 0 ? void 0 : _cell_render.call(cell, row, parentData)) !== null && _cell_render1 !== void 0 ? _cell_render1 : ""
                                                                    }, cell.id, false, {
                                                                        fileName: "[project]/src/components/Datatable.jsx",
                                                                        lineNumber: 1200,
                                                                        columnNumber: 33
                                                                    }, this);
                                                                })
                                                            ]
                                                        }, (row === null || row === void 0 ? void 0 : row.id) || "row-".concat(index), true, {
                                                            fileName: "[project]/src/components/Datatable.jsx",
                                                            lineNumber: 1107,
                                                            columnNumber: 25
                                                        }, this);
                                                    }),
                                                    filteredRows.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
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
                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
                                                    colSpan: columns.filter((col)=>columnVisibility[col.id]).length + (attr.rowLockable ? 1 : 0) + (attr.rowSelectable ? 1 : 0),
                                                    align: "start",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
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
                                                        children: (_attr_noDataMsg = attr.noDataMsg) !== null && _attr_noDataMsg !== void 0 ? _attr_noDataMsg : "No data found."
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
                                        Object.keys(columnTotals).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableFooter$2f$TableFooter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableFooter$3e$__["TableFooter"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableRow$2f$TableRow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableRow$3e$__["TableRow"], {
                                                children: [
                                                    attr.rowLockable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
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
                                                    attr.rowSelectable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
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
                                                    columns.map((cell)=>{
                                                        var _cell_feature;
                                                        return columnVisibility[cell.id] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TableCell$2f$TableCell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TableCell$3e$__["TableCell"], {
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
                                                                    left: "".concat(getLockedColumnOffset(cell.id), "px"),
                                                                    boxShadow: "2px 0 5px -2px rgba(0, 0, 0, 0.3)",
                                                                    zIndex: 4
                                                                }
                                                            },
                                                            children: (cell === null || cell === void 0 ? void 0 : (_cell_feature = cell.feature) === null || _cell_feature === void 0 ? void 0 : _cell_feature.includes("total")) ? cell.total ? cell.total(columnTotals[cell.id] || "0.00") : columnTotals[cell.id] || "0.00" : cell.id === columns[0].id ? "Total" : ""
                                                        }, cell.id, false, {
                                                            fileName: "[project]/src/components/Datatable.jsx",
                                                            lineNumber: 1301,
                                                            columnNumber: 27
                                                        }, this);
                                                    })
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
                            !hidePagination && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
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
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$TablePagination$2f$TablePagination$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TablePagination$3e$__["TablePagination"], {
                                    rowsPerPageOptions: attr.pagination,
                                    component: "div",
                                    count: filteredRows.length,
                                    rowsPerPage: pageSize,
                                    page: page,
                                    onPageChange: handleChangePage,
                                    onRowsPerPageChange: handleChangeRowsPerPage,
                                    showFirstButton: true,
                                    showLastButton: true,
                                    ActionsComponent: (attr)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PaginationButtons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            ...attr,
                                            onPageChange: handleChangePage
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Datatable.jsx",
                                            lineNumber: 1369,
                                            columnNumber: 19
                                        }, void 0),
                                    labelDisplayedRows: (param)=>{
                                        let { from, to, count, page } = param;
                                        return "Showing ".concat(from, " - ").concat(to, " of ").concat(count);
                                    },
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
                            (attr === null || attr === void 0 ? void 0 : (_attr_progress = attr.progress) === null || _attr_progress === void 0 ? void 0 : _attr_progress.isVisible) === true && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ShowProgress, {
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
            attr === null || attr === void 0 ? void 0 : attr.withSelected
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Datatable.jsx",
        lineNumber: 563,
        columnNumber: 5
    }, this);
}
_s1(Datatable, "O0tUpPBW3qlcojL5uSFVuHjWaJ0=");
_c2 = Datatable;
function ShowProgress(param) {
    let { shape = "circle", status: currentValue = 0 } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
        sx: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "inline-flex",
            zIndex: 10
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__["CircularProgress"], {
                variant: "determinate",
                value: currentValue,
                size: 50,
                thickness: 3
            }, void 0, false, {
                fileName: "[project]/src/components/Datatable.jsx",
                lineNumber: 1473,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
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
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                    sx: {
                        fontSize: "12px"
                    },
                    children: "".concat(currentValue, "%")
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
_c3 = ShowProgress;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Icon");
__turbopack_context__.k.register(_c1, "ColHeader");
__turbopack_context__.k.register(_c2, "Datatable");
__turbopack_context__.k.register(_c3, "ShowProgress");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_542a3ff2._.js.map