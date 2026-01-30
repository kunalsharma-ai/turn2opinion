module.exports = [
"[project]/src/components/Datatable.jsx [app-ssr] (ecmascript) <export default as Datatable>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Datatable",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Datatable$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Datatable$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Datatable.jsx [app-ssr] (ecmascript)");
}),
"[project]/src/components/Form/DateRange.jsx [app-ssr] (ecmascript) <export default as DateRangeSelector>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DateRangeSelector",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$DateRange$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$DateRange$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/DateRange.jsx [app-ssr] (ecmascript)");
}),
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
"[project]/src/app/member/components/SurveyPoints.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SurveyPoints
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Button/Button.js [app-ssr] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Grid/Grid.js [app-ssr] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__ = __turbopack_context__.i("[project]/src/util/api.js [app-ssr] (ecmascript) <export default as api>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/hooks/index.js [app-ssr] (ecmascript) <locals>");
"use client";
;
;
;
;
;
;
function SurveyPoints() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [points, setPoints] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(0); //todo: set from api call
    const [conversionRate, setConversionRate] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(1); //todo: set conversion rate from api call
    const [threshold, setThreshold] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(1500); //todo: set from server config
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__["api"].get(`/api/v1/me/points`).then((resp)=>{
            if (resp.status === "error") router.replace("/survey?name=welcome");
            // if (!resp.data) return useToast(resp);
            let data = resp.data;
            setPoints(data.totalPoints);
            setThreshold(data.threshold);
            setConversionRate(data.conversionRate);
        }).catch((err)=>{}).finally(()=>{});
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
        size: {
            xs: 12,
            md: 6
        },
        container: true,
        direction: "column",
        alignItems: {
            xs: "center",
            md: "flex-end"
        },
        textAlign: {
            xs: "center",
            md: "right"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                fontSize: {
                    xs: "16px",
                    md: "20px"
                },
                color: "secondary.main",
                fontWeight: "500",
                children: [
                    "Earned Points : ",
                    points,
                    " (~",
                    " ",
                    (Number(points) * Number(conversionRate)).toMoney("USD"),
                    ")"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/member/components/SurveyPoints.jsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            threshold > points ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                    fontSize: "13px",
                    children: [
                        "Get ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                            children: threshold - points
                        }, void 0, false, {
                            fileName: "[project]/src/app/member/components/SurveyPoints.jsx",
                            lineNumber: 48,
                            columnNumber: 17
                        }, this),
                        " more points to redeem"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/member/components/SurveyPoints.jsx",
                    lineNumber: 47,
                    columnNumber: 11
                }, this)
            }, void 0, false) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                    variant: "contained",
                    size: "small",
                    color: "secondary",
                    sx: {
                        color: "white",
                        mt: 1,
                        px: 2,
                        fontWeight: 600,
                        borderRadius: 2
                    },
                    onClick: (e)=>{
                    // todo: open redeem form
                    },
                    children: "Redeem Points"
                }, void 0, false, {
                    fileName: "[project]/src/app/member/components/SurveyPoints.jsx",
                    lineNumber: 53,
                    columnNumber: 11
                }, this)
            }, void 0, false)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/member/components/SurveyPoints.jsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/member/components/CurrentUser.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CurrentUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Avatar$2f$Avatar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Avatar/Avatar.js [app-ssr] (ecmascript) <export default as Avatar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Grid/Grid.js [app-ssr] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/Context/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$member$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/Context/member.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function CurrentUser() {
    const [user] = [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$member$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMember"])()
    ];
    // todo: change profile picture
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
        size: {
            xs: 12,
            md: 6
        },
        container: true,
        alignItems: "center",
        justifyContent: {
            xs: "center",
            md: "flex-start"
        },
        spacing: 2,
        pb: {
            xs: 2,
            md: 0
        },
        mb: {
            xs: 2,
            md: 0
        },
        borderBottom: {
            xs: `1px solid #e0e0e0`,
            md: "none"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Avatar$2f$Avatar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                src: user?.profilePicture || "",
                alt: user?.name?.first ?? "U",
                sx: {
                    height: "70px",
                    width: "70px",
                    fontSize: "36px",
                    bgcolor: user?.profilePicture ? "transparent" : "primary.main"
                }
            }, void 0, false, {
                fileName: "[project]/src/app/member/components/CurrentUser.jsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: {
                        xs: "center",
                        sm: "flex-start"
                    }
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                        fontSize: "16px",
                        fontWeight: 600,
                        children: user?.fullName
                    }, void 0, false, {
                        fileName: "[project]/src/app/member/components/CurrentUser.jsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                        fontSize: "13px",
                        fontWeight: 500,
                        children: user?.mail
                    }, void 0, false, {
                        fileName: "[project]/src/app/member/components/CurrentUser.jsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                        fontSize: "13px",
                        color: "secondary.main",
                        fontWeight: 600,
                        textTransform: "capitalize",
                        children: user?.category
                    }, void 0, false, {
                        fileName: "[project]/src/app/member/components/CurrentUser.jsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/member/components/CurrentUser.jsx",
                lineNumber: 31,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/member/components/CurrentUser.jsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/member/components/index.jsx [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$member$2f$components$2f$SurveyPoints$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/member/components/SurveyPoints.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$member$2f$components$2f$CurrentUser$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/member/components/CurrentUser.jsx [app-ssr] (ecmascript)");
;
;
}),
"[project]/src/app/member/components/SurveyPoints.jsx [app-ssr] (ecmascript) <export default as SurveyPoints>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SurveyPoints",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$member$2f$components$2f$SurveyPoints$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$member$2f$components$2f$SurveyPoints$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/member/components/SurveyPoints.jsx [app-ssr] (ecmascript)");
}),
"[project]/src/app/member/components/CurrentUser.jsx [app-ssr] (ecmascript) <export default as CurrentUser>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CurrentUser",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$member$2f$components$2f$CurrentUser$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$member$2f$components$2f$CurrentUser$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/member/components/CurrentUser.jsx [app-ssr] (ecmascript)");
}),
"[project]/src/app/member/(member pages)/dashboard/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Button/Button.js [app-ssr] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Grid/Grid.js [app-ssr] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/Context/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$member$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/Context/member.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$query$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/Context/query.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$index$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/index.jsx [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Datatable$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Datatable$3e$__ = __turbopack_context__.i("[project]/src/components/Datatable.jsx [app-ssr] (ecmascript) <export default as Datatable>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/Form/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$DateRange$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DateRangeSelector$3e$__ = __turbopack_context__.i("[project]/src/components/Form/DateRange.jsx [app-ssr] (ecmascript) <export default as DateRangeSelector>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$componentsMHO$2f$LoadingOverlay$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/componentsMHO/LoadingOverlay.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__ = __turbopack_context__.i("[project]/src/util/api.js [app-ssr] (ecmascript) <export default as api>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-ssr] (ecmascript) <export * as Page>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/hooks/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$member$2f$components$2f$index$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/app/member/components/index.jsx [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$member$2f$components$2f$SurveyPoints$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SurveyPoints$3e$__ = __turbopack_context__.i("[project]/src/app/member/components/SurveyPoints.jsx [app-ssr] (ecmascript) <export default as SurveyPoints>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$member$2f$components$2f$CurrentUser$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CurrentUser$3e$__ = __turbopack_context__.i("[project]/src/app/member/components/CurrentUser.jsx [app-ssr] (ecmascript) <export default as CurrentUser>");
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
function page() {
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$member$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMember"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    // React.useEffect(() => {
    //   if (!user) return;
    //   if (
    //     user.terms === null ||
    //     user.terms === undefined ||
    //     user.terms.length === 0
    //   ) {
    //     router.replace("/auth/terms");
    //   }
    //   api
    //     .post(`/api/v1/response`, {
    //       ["survey.slug"]: "welcome",
    //       status: "complete",
    //     })
    //     .then((resp) => {
    //       if ("data" in resp && resp.data.length !== 0) return;
    //       router.replace("/survey?name=welcome");
    //     });
    // }, [user]);
    // if (!user) return <LoadingOverlay />;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
        container: true,
        size: 12,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                size: 12,
                container: true,
                px: 4,
                py: 2,
                alignItems: "center",
                justifyContent: "space-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$member$2f$components$2f$CurrentUser$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CurrentUser$3e$__["CurrentUser"], {}, void 0, false, {
                        fileName: "[project]/src/app/member/(member pages)/dashboard/page.jsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$member$2f$components$2f$SurveyPoints$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SurveyPoints$3e$__["SurveyPoints"], {}, void 0, false, {
                        fileName: "[project]/src/app/member/(member pages)/dashboard/page.jsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/member/(member pages)/dashboard/page.jsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Stats, {}, void 0, false, {
                fileName: "[project]/src/app/member/(member pages)/dashboard/page.jsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Surveys, {}, void 0, false, {
                fileName: "[project]/src/app/member/(member pages)/dashboard/page.jsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SurveyHistory, {}, void 0, false, {
                fileName: "[project]/src/app/member/(member pages)/dashboard/page.jsx",
                lineNumber: 51,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/member/(member pages)/dashboard/page.jsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
function Stats() {
    const [statistics, setStatistics] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState({});
    // React.useEffect(() => {
    //   api
    //     .get(`/api/v1/me/statistics`)
    //     .then((resp) => {
    //       if (!resp.data) return useToast(resp);
    //       let data = resp.data;
    //       setStatistics(data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     })
    //     .finally(() => {});
    // }, []);
    const stats = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useMemo(()=>{
        return [
            {
                label: "Survey Participated",
                value: statistics?.total ?? 0,
                icon: "/images/dashboard/totalsurveytaken.png"
            },
            {
                label: "Survey Completed",
                value: statistics?.complete ?? 0,
                icon: "/images/dashboard/completedsurvey.png"
            },
            {
                label: "Rewards Earned (Points)",
                value: statistics?.points ?? 0,
                icon: "/images/dashboard/rewardpoint.png"
            },
            // todo: { label: "Survey Abdoned", value: statistics?.abdoned ?? 0 },
            // todo: { label: "In House Surveys", value: statistics?.internal ?? 0 },
            // todo: { label: "External Surveys", value: statistics?.external ?? 0 },
            {
                label: "Survey Disqualified",
                value: statistics?.disqualified ?? 0,
                icon: "/images/dashboard/disqualifiedsurvey.png"
            },
            {
                label: "Rewards Earned (USD)",
                value: `${((statistics?.points ?? 0) / 100).toMoney("USD")}`,
                icon: "/images/dashboard/currentreward.png"
            },
            {
                label: "Rewards Claimed (USD)",
                value: `${((statistics?.claimed ?? 0) / 100).toMoney("USD")}`,
                icon: "/images/dashboard/claimedreward.png"
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
            border: `1px solid #e0e0e0`
        },
        children: stats.map((stat, index)=>{
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                container: true,
                size: {
                    xs: 12,
                    md: 6,
                    lg: 4
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
                    py: 4,
                    minHeight: "120px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                        // size={6}
                        direction: "column",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                fontSize: {
                                    xs: 14,
                                    md: 16
                                },
                                children: stat?.label
                            }, void 0, false, {
                                fileName: "[project]/src/app/member/(member pages)/dashboard/page.jsx",
                                lineNumber: 144,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                sx: {
                                    fontWeight: "600",
                                    fontSize: {
                                        xs: "24px",
                                        xl: "26px"
                                    },
                                    wordBreak: "break-word",
                                    overflowWrap: "anywhere",
                                    whiteSpace: "normal"
                                },
                                children: stat.value.toLocaleString("en-US")
                            }, void 0, false, {
                                fileName: "[project]/src/app/member/(member pages)/dashboard/page.jsx",
                                lineNumber: 147,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/member/(member pages)/dashboard/page.jsx",
                        lineNumber: 138,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                        component: "img",
                        src: stat.icon,
                        height: 60,
                        alt: "stats logo"
                    }, void 0, false, {
                        fileName: "[project]/src/app/member/(member pages)/dashboard/page.jsx",
                        lineNumber: 160,
                        columnNumber: 13
                    }, this)
                ]
            }, index, true, {
                fileName: "[project]/src/app/member/(member pages)/dashboard/page.jsx",
                lineNumber: 122,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/src/app/member/(member pages)/dashboard/page.jsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
function Surveys() {
    const [user, query] = [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$member$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMember"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$query$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])()
    ];
    const [availableSurveys, setAvailableSurveys] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState({});
    // React.useEffect(() => {
    //   api
    //     .get(`/api/v1/me/survey`, {
    //       category: user.category,
    //     })
    //     .then((resp) => {
    //       if (!resp || resp.status === "error") return;
    //       const { data } = resp;
    //       setAvailableSurveys(data);
    //       console.log(data);
    //     });
    // }, [user]);
    const surveys = [
        {
            name: "Your Survey",
            link: "/member/surveys?source=internal",
            description: "Get paid to complete your profile details.",
            isAvailable: Boolean(availableSurveys?.internal)
        },
        {
            name: "Daily Survey",
            link: "/member/surveys?source=sampledge",
            description: "Get paid to complete daily surveys.",
            isAvailable: Boolean(availableSurveys?.sampledge)
        },
        {
            name: "External Survey",
            link: "/member/surveys?source=external",
            description: "Get paid to complete external surveys.",
            isAvailable: Boolean(availableSurveys?.external)
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
        size: 12,
        container: true,
        spacing: 2,
        px: {
            xs: 2,
            md: 3
        },
        py: 2,
        justifyContent: "center",
        sx: {
            border: `1px solid #e0e0e0`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
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
                    children: "Available Surveys"
                }, void 0, false, {
                    fileName: "[project]/src/app/member/(member pages)/dashboard/page.jsx",
                    lineNumber: 220,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/member/(member pages)/dashboard/page.jsx",
                lineNumber: 219,
                columnNumber: 7
            }, this),
            surveys.map((survey, index)=>{
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                    container: true,
                    size: {
                        xs: 12,
                        lg: 4
                    },
                    direction: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    spacing: 1,
                    py: 3,
                    sx: {
                        border: (theme)=>`1px solid ${theme.palette.primary.main}`,
                        bgcolor: (theme)=>theme.palette.cardbg.main,
                        borderRadius: 4,
                        overflow: "hidden",
                        textAlign: "center"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            sx: {
                                fontWeight: "500",
                                fontSize: "20px"
                            },
                            children: survey.name
                        }, void 0, false, {
                            fileName: "[project]/src/app/member/(member pages)/dashboard/page.jsx",
                            lineNumber: 252,
                            columnNumber: 13
                        }, this),
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            sx: {
                                fontSize: "16px"
                            },
                            children: survey?.description
                        }, void 0, false, {
                            fileName: "[project]/src/app/member/(member pages)/dashboard/page.jsx",
                            lineNumber: 260,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Link, {
                            tabIndex: -1,
                            href: !survey.isAvailable ? "#" : survey.link,
                            sx: {
                                cursor: !survey.isAvailable ? "not-allowed" : "pointer"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                disabled: !survey.isAvailable,
                                variant: "contained",
                                color: "secondary",
                                sx: {
                                    my: 1,
                                    px: 2,
                                    fontWeight: "600",
                                    color: "white",
                                    borderRadius: 2
                                },
                                children: "TAKE SURVEY"
                            }, void 0, false, {
                                fileName: "[project]/src/app/member/(member pages)/dashboard/page.jsx",
                                lineNumber: 268,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/member/(member pages)/dashboard/page.jsx",
                            lineNumber: 263,
                            columnNumber: 13
                        }, this)
                    ]
                }, index, true, {
                    fileName: "[project]/src/app/member/(member pages)/dashboard/page.jsx",
                    lineNumber: 235,
                    columnNumber: 11
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/member/(member pages)/dashboard/page.jsx",
        lineNumber: 210,
        columnNumber: 5
    }, this);
}
function SurveyHistory() {
    const [user] = [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$member$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMember"])()
    ];
    const [data, setData] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState([]);
    const [dateRange, setDateRange] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState([]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (!user) return;
        let filters = {};
        if (Boolean(dateRange) && Boolean(dateRange instanceof Array) && dateRange.length === 2) filters = {
            ...filters,
            dateRange
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__["api"].post(`/api/v1/response`, filters).then((resp)=>{
            setData(resp.data);
        });
    }, [
        user,
        dateRange
    ]);
    const columns = [
        {
            id: "surveyname",
            label: "Survey Name",
            render: (info)=>info?.survey?.name,
            feature: [
                "searchable",
                "sortable",
                "lockable"
            ]
        },
        {
            id: "start time",
            label: "Start time",
            render: (info)=>new Date(info.timeline.start).toLocaleString(),
            feature: [
                "sortable",
                "lockable"
            ]
        },
        {
            id: "loi",
            label: "Length of Interview",
            width: 220,
            render: (info)=>(new Date(info.updatedAt) - new Date(info.timeline.start))?.toTime(),
            feature: [
                "sortable",
                "lockable"
            ]
        },
        {
            id: "status",
            label: "Status",
            render: (info)=>info.source === "internal" && info.status === "dropout" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Link, {
                    href: `/survey?name=${info.survey.slug}`,
                    children: "Continue"
                }, void 0, false, {
                    fileName: "[project]/src/app/member/(member pages)/dashboard/page.jsx",
                    lineNumber: 333,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                    sx: {
                        fontSize: 13,
                        textTransform: "capitalize",
                        color: info.status === "dropout" ? "red" : "black"
                    },
                    children: info.status
                }, void 0, false, {
                    fileName: "[project]/src/app/member/(member pages)/dashboard/page.jsx",
                    lineNumber: 337,
                    columnNumber: 11
                }, this),
            feature: [
                "filterable",
                "sortable",
                "lockable"
            ]
        },
        {
            id: "rewards",
            label: "Rewards",
            render: (info)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: [
                        info.status === "complete" ? info.points : 0,
                        " Points"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/member/(member pages)/dashboard/page.jsx",
                    lineNumber: 353,
                    columnNumber: 9
                }, this)
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
        size: 12,
        px: {
            xs: 2,
            md: 3
        },
        py: 2,
        justifyContent: "center",
        sx: {
            border: `1px solid #e0e0e0`
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Datatable$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Datatable$3e$__["Datatable"], {
            isLoading: false,
            pagination: [
                10,
                20,
                50,
                100
            ],
            pageSize: 20,
            noDataMsg: "No Record Found.",
            data: data,
            hideColumnSelector: true,
            extra: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                px: {
                    xs: 0,
                    md: 2
                },
                my: {
                    xs: 1,
                    md: 0
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$DateRange$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DateRangeSelector$3e$__["DateRangeSelector"], {
                    onUpdate: (e)=>{
                        setDateRange(e.map((d)=>new Date(d.toDate()).toISOString().split("T")[0]));
                    }
                }, void 0, false, {
                    fileName: "[project]/src/app/member/(member pages)/dashboard/page.jsx",
                    lineNumber: 374,
                    columnNumber: 13
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/src/app/member/(member pages)/dashboard/page.jsx",
                lineNumber: 373,
                columnNumber: 11
            }, void 0),
            title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                sx: {
                    fontSize: "16px",
                    display: "inline-block",
                    fontWeight: "600",
                    borderBottom: (theme)=>`2px solid ${theme.palette.primary.main}`,
                    pb: 0.5,
                    my: 1
                },
                children: "Survey Participations History"
            }, void 0, false, {
                fileName: "[project]/src/app/member/(member pages)/dashboard/page.jsx",
                lineNumber: 384,
                columnNumber: 11
            }, void 0),
            columns: columns
        }, void 0, false, {
            fileName: "[project]/src/app/member/(member pages)/dashboard/page.jsx",
            lineNumber: 365,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/member/(member pages)/dashboard/page.jsx",
        lineNumber: 358,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_eb41074f._.js.map