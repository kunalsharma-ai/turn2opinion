module.exports = [
"[project]/src/hooks/useToast.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
function __TURBOPACK__default__export__(detail) {
    if (!document) return console.log("No Document");
    if (!detail || !detail.status) return console.log("No Status");
    document.dispatchEvent(new CustomEvent("toast", {
        detail
    }));
}
}),
"[project]/src/hooks/useDebounce.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>useDebounce
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function useDebounce(callback, delay = 500, deps = []) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timeout = setTimeout(()=>{
            callback();
        }, delay);
        return ()=>clearTimeout(timeout);
    }, [
        ...deps,
        delay
    ]);
}
}),
"[project]/src/hooks/index.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useToast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useToast.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useDebounce$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useDebounce.js [app-ssr] (ecmascript)"); // export {default as useSSE} from "./useSSE";
;
;
}),
"[project]/src/hooks/useToast.js [app-ssr] (ecmascript) <export default as useToast>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useToast",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useToast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useToast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useToast.js [app-ssr] (ecmascript)");
}),
"[project]/src/app/admin/(admin pages)/dashboard/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Grid/Grid.js [app-ssr] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/Context/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$member$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/Context/member.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$componentsMHO$2f$LoadingOverlay$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/componentsMHO/LoadingOverlay.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__ = __turbopack_context__.i("[project]/src/util/api.js [app-ssr] (ecmascript) <export default as api>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-ssr] (ecmascript) <export * as Page>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/hooks/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useToast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useToast$3e$__ = __turbopack_context__.i("[project]/src/hooks/useToast.js [app-ssr] (ecmascript) <export default as useToast>");
"use client";
;
;
;
;
;
;
;
;
function page() {
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$member$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMember"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    // if (!user) return <LoadingOverlay />;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
        container: true,
        size: 12,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Panelists, {}, void 0, false, {
            fileName: "[project]/src/app/admin/(admin pages)/dashboard/page.jsx",
            lineNumber: 18,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/admin/(admin pages)/dashboard/page.jsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
function Panelists() {
    const [statistics, setStatistics] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState({});
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__["api"].get(`/api/v1/user/summarize`).then((resp)=>{
            if (!resp.data) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useToast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useToast$3e$__["useToast"])(resp);
            let data = resp.data;
            console.log(data);
            setStatistics(data);
        }).catch((err)=>{
            console.log(err);
        }).finally(()=>{});
    }, []);
    const stats = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useMemo(()=>{
        return [
            {
                label: "Total Panelist",
                value: statistics?.total ?? 0
            },
            {
                label: "Healthcare Professionals",
                value: statistics?.dsjkljfklds ?? 0
            },
            {
                label: "Patients",
                value: statistics?.points ?? 0
            },
            {
                label: "Caregivers",
                value: statistics?.disqualified ?? 0
            }
        ];
    }, [
        statistics
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
        size: 12,
        container: true,
        spacing: 2,
        mt: 1,
        p: {
            xs: 2,
            md: 3
        },
        sx: {
            border: `1px solid #e0e0e0`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                width: "100%",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                    sx: {
                        fontSize: "16px",
                        display: "inline-block",
                        fontWeight: "600",
                        borderBottom: (theme)=>`2px solid ${theme.palette.primary.main}`,
                        pb: 0.5,
                        my: 2
                    },
                    children: "Panelists"
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/(admin pages)/dashboard/page.jsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/admin/(admin pages)/dashboard/page.jsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            Object.values(statistics)?.map((stat, index)=>{
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                    container: true,
                    size: {
                        xs: 12,
                        md: 6,
                        lg: 3
                    },
                    alignItems: "center",
                    justifyContent: "space-between",
                    spacing: 1,
                    sx: {
                        border: (theme)=>`1px solid ${theme.palette.primary.main}`,
                        bgcolor: (theme)=>theme.palette.cardbg.main,
                        borderRadius: 4,
                        px: {
                            xs: 3,
                            xl: 5
                        },
                        py: 2,
                        minHeight: "120px"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                        // size={6}
                        direction: "column",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                fontSize: 16,
                                sx: {
                                    textTransform: "capitalize"
                                },
                                children: stat?.label
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/(admin pages)/dashboard/page.jsx",
                                lineNumber: 111,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                sx: {
                                    fontWeight: "500",
                                    fontSize: {
                                        xs: "24px",
                                        xl: "36px"
                                    },
                                    wordBreak: "break-word",
                                    overflowWrap: "anywhere",
                                    whiteSpace: "normal"
                                },
                                children: stat.value.toLocaleString("en-US")
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/(admin pages)/dashboard/page.jsx",
                                lineNumber: 114,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/(admin pages)/dashboard/page.jsx",
                        lineNumber: 105,
                        columnNumber: 13
                    }, this)
                }, index, false, {
                    fileName: "[project]/src/app/admin/(admin pages)/dashboard/page.jsx",
                    lineNumber: 89,
                    columnNumber: 11
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/admin/(admin pages)/dashboard/page.jsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
}
function Surveys() {
    const [statistics, setStatistics] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState({});
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__["api"].get(`/api/v1/me/statistics`).then((resp)=>{
            if (!resp.data) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useToast$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useToast$3e$__["useToast"])(resp);
            let data = resp.data;
            setStatistics(data);
        }).catch((err)=>{
            console.log(err);
        }).finally(()=>{});
    }, []);
    const stats = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useMemo(()=>{
        return [
            {
                label: "Total Surveys",
                value: statistics?.total ?? 0
            },
            {
                label: "MHO Surveys",
                value: statistics?.complete ?? 0
            },
            {
                label: "Sampledge Surveys",
                value: statistics?.points ?? 0
            },
            {
                label: "External Surveys",
                value: statistics?.disqualified ?? 0
            },
            {
                label: "Completes",
                value: statistics?.total ?? 0
            },
            {
                label: "Terminates",
                value: statistics?.complete ?? 0
            },
            {
                label: "Overquotas",
                value: statistics?.points ?? 0
            },
            {
                label: "Security",
                value: statistics?.disqualified ?? 0
            }
        ];
    }, [
        statistics
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
        size: 12,
        container: true,
        spacing: 2,
        mt: 1,
        p: {
            xs: 2,
            md: 3
        },
        justifyContent: "center",
        sx: {
            borderBottom: `1px solid #e0e0e0`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                width: "100%",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                    sx: {
                        fontSize: "16px",
                        display: "inline-block",
                        fontWeight: "600",
                        borderBottom: (theme)=>`2px solid ${theme.palette.primary.main}`,
                        pb: 0.5,
                        my: 2
                    },
                    children: "Surveys"
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/(admin pages)/dashboard/page.jsx",
                    lineNumber: 198,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/admin/(admin pages)/dashboard/page.jsx",
                lineNumber: 197,
                columnNumber: 7
            }, this),
            stats.map((stat, index)=>{
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                    container: true,
                    size: {
                        xs: 12,
                        md: 6,
                        lg: 3
                    },
                    alignItems: "center",
                    justifyContent: "space-between",
                    spacing: 1,
                    sx: {
                        border: (theme)=>`1px solid ${theme.palette.primary.main}`,
                        bgcolor: (theme)=>theme.palette.cardbg.main,
                        borderRadius: 4,
                        px: {
                            xs: 3,
                            xl: 5
                        },
                        py: 2,
                        minHeight: "120px"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                        // size={6}
                        direction: "column",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                fontSize: 16,
                                children: stat?.label
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/(admin pages)/dashboard/page.jsx",
                                lineNumber: 235,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                sx: {
                                    fontWeight: "500",
                                    fontSize: {
                                        xs: "24px",
                                        xl: "36px"
                                    },
                                    wordBreak: "break-word",
                                    overflowWrap: "anywhere",
                                    whiteSpace: "normal"
                                },
                                children: stat.value.toLocaleString("en-US")
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/(admin pages)/dashboard/page.jsx",
                                lineNumber: 236,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/(admin pages)/dashboard/page.jsx",
                        lineNumber: 229,
                        columnNumber: 13
                    }, this)
                }, index, false, {
                    fileName: "[project]/src/app/admin/(admin pages)/dashboard/page.jsx",
                    lineNumber: 213,
                    columnNumber: 11
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/admin/(admin pages)/dashboard/page.jsx",
        lineNumber: 188,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_afd9bb7d._.js.map