(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/util/getCurrency.js [app-client] (ecmascript) <export default as getCurrency>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCurrency",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getCurrency$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getCurrency$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/util/getCurrency.js [app-client] (ecmascript)");
}),
"[project]/src/components/Form/index.js [app-client] (ecmascript) <export * as Form>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Form",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Form/index.js [app-client] (ecmascript)");
}),
"[project]/src/components/Map.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Map
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$google$2d$maps$2f$api$2f$dist$2f$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-google-maps/api/dist/esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/Context/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$telemetry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/Context/telemetry.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const containerStyle = {
    width: "100%",
    height: "500px"
};
function Map(param) {
    let { setCoordinates } = param;
    _s();
    const [markers, setMarkers] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState([]);
    const [center, setCenter] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState({
        lat: 22.9734,
        lng: 78.6569,
        isDefault: true
    });
    const telemetry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$telemetry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTelemetry"])();
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "Map.useEffect": ()=>{
            telemetry.gps().then({
                "Map.useEffect": (resp)=>{
                    setCenter({
                        lat: resp.latitude,
                        lng: resp.longitude
                    });
                    setMarkers([
                        {
                            lat: resp.latitude,
                            lng: resp.longitude,
                            label: "my Current Location"
                        }
                    ]);
                }
            }["Map.useEffect"]);
        }
    }["Map.useEffect"], [
        telemetry
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "Map.useEffect": ()=>{
            if (markers.length > 0) {
                if (center.isDefault) setCenter({
                    lat: markers[0].lat,
                    lng: markers[0].lng
                });
                setCoordinates({
                    lat: markers[0].lat,
                    lng: markers[0].lng
                });
            }
        }
    }["Map.useEffect"], [
        markers
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$google$2d$maps$2f$api$2f$dist$2f$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoadScript"], {
        googleMapsApiKey: "AIzaSyCNbWx_rMz7HI8YFR0cXI-cRUZ0yBfi_3E",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$google$2d$maps$2f$api$2f$dist$2f$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GoogleMap"], {
            mapContainerStyle: containerStyle,
            center: center,
            zoom: markers.length > 0 ? 16 : 4,
            onClick: (e)=>{
                setMarkers([
                    {
                        label: "selectedLocation",
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng()
                    }
                ]);
            },
            children: markers.map((point, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$google$2d$maps$2f$api$2f$dist$2f$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Marker"], {
                    position: point,
                    title: point.label
                }, index, false, {
                    fileName: "[project]/src/components/Map.jsx",
                    lineNumber: 72,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/src/components/Map.jsx",
            lineNumber: 57,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Map.jsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_s(Map, "PsUveIrdjNCxh/eMPany5G8yl4g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$telemetry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTelemetry"]
    ];
});
_c = Map;
var _c;
__turbopack_context__.k.register(_c, "Map");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useToast.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useDebounce.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>useDebounce
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useDebounce(callback) {
    let delay = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 500, deps = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDebounce.useEffect": ()=>{
            const timeout = setTimeout({
                "useDebounce.useEffect.timeout": ()=>{
                    callback();
                }
            }["useDebounce.useEffect.timeout"], delay);
            return ({
                "useDebounce.useEffect": ()=>clearTimeout(timeout)
            })["useDebounce.useEffect"];
        }
    }["useDebounce.useEffect"], [
        ...deps,
        delay
    ]);
}
_s(useDebounce, "OD7bBpZva5O2jO+Puf00hKivP7c=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useToast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useToast.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useDebounce$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useDebounce.js [app-client] (ecmascript)"); // export {default as useSSE} from "./useSSE";
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useToast.js [app-client] (ecmascript) <export default as useToast>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useToast",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useToast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useToast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useToast.js [app-client] (ecmascript)");
}),
"[project]/src/app/survey/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Question",
    ()=>Question,
    "default",
    ()=>page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormGroup$2f$FormGroup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormGroup$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/FormGroup/FormGroup.js [app-client] (ecmascript) <export default as FormGroup>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControl$2f$FormControl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControl$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/FormControl/FormControl.js [app-client] (ecmascript) <export default as FormControl>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControlLabel$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/FormControlLabel/FormControlLabel.js [app-client] (ecmascript) <export default as FormControlLabel>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Radio$2f$Radio$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Radio/Radio.js [app-client] (ecmascript) <export default as Radio>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$RadioGroup$2f$RadioGroup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RadioGroup$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/RadioGroup/RadioGroup.js [app-client] (ecmascript) <export default as RadioGroup>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Checkbox/Checkbox.js [app-client] (ecmascript) <export default as Checkbox>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Grid/Grid.js [app-client] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Alert/Alert.js [app-client] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stepper$2f$Stepper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stepper$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Stepper/Stepper.js [app-client] (ecmascript) <export default as Stepper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Step$2f$Step$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Step$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Step/Step.js [app-client] (ecmascript) <export default as Step>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$StepLabel$2f$StepLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__StepLabel$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/StepLabel/StepLabel.js [app-client] (ecmascript) <export default as StepLabel>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$StepConnector$2f$StepConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__StepConnector$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/StepConnector/StepConnector.js [app-client] (ecmascript) <export default as StepConnector>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MobileStepper$2f$MobileStepper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MobileStepper$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/MobileStepper/MobileStepper.js [app-client] (ecmascript) <export default as MobileStepper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$useMediaQuery$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useMediaQuery$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/useMediaQuery/index.js [app-client] (ecmascript) <export default as useMediaQuery>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/styles/useTheme.js [app-client] (ecmascript) <export default as useTheme>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CheckCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/CheckCircle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Error.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/Context/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$member$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/Context/member.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$query$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/Context/query.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/util/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__ = __turbopack_context__.i("[project]/src/util/api.js [app-client] (ecmascript) <export default as api>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getCurrency$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__getCurrency$3e$__ = __turbopack_context__.i("[project]/src/util/getCurrency.js [app-client] (ecmascript) <export default as getCurrency>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__ = __turbopack_context__.i("[project]/src/util/page/index.js [app-client] (ecmascript) <export * as Page>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$index$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/index.jsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Form$3e$__ = __turbopack_context__.i("[project]/src/components/Form/index.js [app-client] (ecmascript) <export * as Form>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$componentsMHO$2f$LoadingOverlay$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/componentsMHO/LoadingOverlay.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Map$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Map.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/hooks/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useToast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useToast$3e$__ = __turbopack_context__.i("[project]/src/hooks/useToast.js [app-client] (ecmascript) <export default as useToast>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
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
function CustomStepIcon(props) {
    const { active, completed, className } = props;
    const stepNumber = props.icon;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 18,
            height: 18,
            borderRadius: "50%",
            backgroundColor: active ? "#06923E " : completed ? "#4caf50" : "#e0e0e0",
            color: "white",
            fontWeight: active ? "bold" : "normal",
            fontSize: "12px"
        },
        children: completed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CheckCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            sx: {
                fontSize: 16
            }
        }, void 0, false, {
            fileName: "[project]/src/app/survey/page.jsx",
            lineNumber: 59,
            columnNumber: 20
        }, this) : stepNumber
    }, void 0, false, {
        fileName: "[project]/src/app/survey/page.jsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_c = CustomStepIcon;
async function loadSurvey(param) {
    let { slug, category } = param;
    try {
        let resp = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__["api"].put("/api/v1/me/survey", {
            slug
        });
        if (resp.status === "error") throw new Error(resp.message);
        return resp;
    } catch (error) {
        throw new Error(error.message);
    }
}
function page() {
    _s();
    var _s1 = __turbopack_context__.k.signature();
    const [surveyTaken, setSurveyTaken] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [user, router, query, pathName] = [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$member$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMember"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$query$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])()
    ];
    const [questionBank, setQuestionBank] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState({});
    const [Questions, setQuestions] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState([]);
    const [isLoading, setIsLoading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(true);
    const [surveyCompleted, setSurveyCompleted] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [steps, setSteps] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState([]);
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    const isMobile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$useMediaQuery$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useMediaQuery$3e$__["useMediaQuery"])(theme.breakpoints.down("md"));
    const [currentGroupIndex, setCurrentGroupIndex] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(0);
    const [validationError, setValidationError] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(null);
    const [survey, setSurvey] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState({});
    const form = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"])({
        mode: "onChange",
        defaultValue: {}
    });
    const { handleSubmit, control, trigger, formState: { errors }, watch } = form;
    const currentGroup = Questions.length > 0 ? Questions[currentGroupIndex] : Questions;
    const isLast = currentGroupIndex === Questions.length - 1;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "page.useEffect": ()=>{
            if (!query || !query.name || !user || !user.category) return;
            if ([
                null,
                undefined,
                ""
            ].indexOf(survey === null || survey === void 0 ? void 0 : survey.slug) === -1) return;
            if (!user.terms || !(user.terms instanceof Array) || user.terms.length === 0) {
                router.replace("/auth/terms");
            }
            loadSurvey({
                slug: query.name,
                category: user.category
            }).then({
                "page.useEffect": (resp)=>{
                    if ("data" in resp) setSurvey(resp.data);
                }
            }["page.useEffect"]).catch({
                "page.useEffect": (err)=>{
                    console.log(err);
                    setSurveyTaken(true);
                    setIsLoading(false);
                }
            }["page.useEffect"]);
        }
    }["page.useEffect"], [
        query,
        user
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "page.useEffect": ()=>{
            if (!survey || !survey.pages || !user) return;
            const userKeys = Object.keys(user);
            const questions = survey.pages.flat().filter({
                "page.useEffect.questions": (que)=>userKeys.indexOf(que) === -1
            }["page.useEffect.questions"]);
            if (questions.length <= survey.pages.length) return;
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__["api"].post("/api/v1/me", {
                questions
            }).then({
                "page.useEffect": (resp)=>{
                    if ("update" in user) {
                        user.update(resp.data);
                    }
                }
            }["page.useEffect"]);
        }
    }["page.useEffect"], [
        survey
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "page.useEffect": ()=>{
            if (!survey || !survey.pages || !(survey.pages instanceof Array) || survey.pages.length === 0) return;
            // console.log("154")
            let sections = [];
            const surveypages = survey.pages.reduce({
                "page.useEffect.surveypages": (a, c)=>{
                    sections.push(c[0]);
                    c.splice(0, 1);
                    a.push(c);
                    return a;
                }
            }["page.useEffect.surveypages"], []);
            setSteps([
                "Welcome",
                ...sections
            ]);
            setQuestions([
                [
                    "welcome"
                ],
                ...surveypages
            ]);
            setIsLoading(true);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__["api"].post("/api/v1/question", {
                name: {
                    $in: survey.pages.flat()
                }
            }).then({
                "page.useEffect": (resp)=>{
                    if (!resp.data || !(resp.data instanceof Array) || resp.data.length === 0) return;
                    let surveyQuestions = resp.data.reduce({
                        "page.useEffect.surveyQuestions": (a, c)=>{
                            var _c_options;
                            a[c.name] = {
                                label: c.label,
                                name: c.name,
                                type: c.type,
                                options: (_c_options = c.options) !== null && _c_options !== void 0 ? _c_options : [],
                                parent: c.parent,
                                size: c.size,
                                required: c.required,
                                disabled: c.disabled
                            };
                            if (c.name === "dob") {
                                let today = new Date();
                                a["dob"]["dateRange"] = [
                                    "".concat(today.getFullYear() - 120, "-01-01"),
                                    "".concat(today.getFullYear() - 15, "-01-01")
                                ];
                            }
                            return a;
                        }
                    }["page.useEffect.surveyQuestions"], {});
                    setQuestionBank({
                        ...surveyQuestions,
                        welcome: {
                            label: survey.description,
                            type: "note",
                            name: "welcome",
                            size: 12
                        }
                    });
                }
            }["page.useEffect"]).finally({
                "page.useEffect": ()=>{
                    setIsLoading(false);
                }
            }["page.useEffect"]);
        }
    }["page.useEffect"], [
        survey
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "page.useEffect": ()=>{
            if (!user) return;
            const data = Object.fromEntries(Object.entries(user).map({
                "page.useEffect.data": (elm)=>{
                    let [key, value] = elm;
                    if (key === "dob") value = value.split("T")[0];
                    if (key === "age") value = "";
                    return [
                        key.toLowerCase(),
                        value
                    ];
                }
            }["page.useEffect.data"]));
            form.reset(data);
        }
    }["page.useEffect"], [
        user
    ]);
    const onSubmit = async (data)=>{
        _s1();
        const resp = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__["api"].patch("/api/v1/me/survey", {
            ...data,
            respID: survey.respID
        });
        if (resp.status === "success") {
            setSurveyCompleted(true);
        } else (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useToast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useToast$3e$__["useToast"])(resp);
    };
    _s1(onSubmit, "zmshFnTy2h/BI3RcMmgy8WlZc1c=", false, function() {
        return [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useToast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useToast$3e$__["useToast"]
        ];
    });
    const onBack = ()=>{
        if (currentGroupIndex > 0) {
            setCurrentGroupIndex(currentGroupIndex - 1);
        }
    };
    const onNext = async ()=>{
        const fieldsToValidate = currentGroup;
        const isValid = await trigger(fieldsToValidate);
        if (!isValid) {
            setValidationError("Please fill all required fields before proceeding.");
            return;
        }
        if (currentGroup.includes("works_in_healthcare") && form.watch("works_in_healthcare") === "no") {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__["api"].patch("/api/v1/me/change-category", {
                category: "patient"
            });
            let queryParameters = new URLSearchParams(query);
            router.replace("".concat(pathName, "?").concat(queryParameters.toString()));
            return;
        }
        if (currentGroup.includes("clinician") && form.watch("clinician") === "no") {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__api$3e$__["api"].patch("/api/v1/me/change-category", {
                category: "caregiver"
            });
            let queryParameters = new URLSearchParams(query);
            router.replace("".concat(pathName, "?").concat(queryParameters.toString()));
            return;
        }
        setValidationError(null);
        if (currentGroupIndex < Questions.length - 1) {
            setCurrentGroupIndex(currentGroupIndex + 1);
        } else {
            handleSubmit(onSubmit);
        }
    };
    (async ()=>{})();
    const visibleSteps = steps.filter((step)=>step !== "Welcome");
    const visibleStepIndex = visibleSteps.indexOf(steps[currentGroupIndex]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
        size: 12,
        container: true,
        sx: {
            backgroundColor: "#dbbea2ff",
            minHeight: "100vh",
            minWidth: "100vw"
        },
        justifyContent: "center",
        alignItems: "center",
        py: 2,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
            container: true,
            direction: "column",
            alignItems: "center",
            spacing: 0,
            sx: {
                width: {
                    xs: "90vw",
                    lg: "80vw",
                    xl: "70vw"
                },
                minHeight: "90vh",
                overflow: "hidden",
                bgcolor: "white",
                borderRadius: 4,
                boxShadow: 24,
                border: 1.5,
                borderColor: "#33aaca",
                py: 3,
                px: {
                    xs: 1,
                    md: 4
                },
                textAlign: "justify"
            },
            children: [
                isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$componentsMHO$2f$LoadingOverlay$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/app/survey/page.jsx",
                    lineNumber: 307,
                    columnNumber: 23
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                    container: true,
                    size: 12,
                    alignItems: "center",
                    justifyContent: {
                        xs: "center",
                        md: "space-between"
                    },
                    mb: 2,
                    pb: 1,
                    spacing: {
                        xs: 1,
                        md: 2
                    },
                    direction: {
                        xs: "column",
                        md: "row"
                    },
                    sx: {
                        borderBottom: "1px solid #f4f4f4"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                            sx: {
                                height: {
                                    xs: 26.8,
                                    lg: 42
                                },
                                width: {
                                    xs: 180,
                                    lg: 282
                                }
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/images/logo/t2o-logo.png",
                                alt: "logo",
                                height: "100%",
                                width: "100%"
                            }, void 0, false, {
                                fileName: "[project]/src/app/survey/page.jsx",
                                lineNumber: 325,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/survey/page.jsx",
                            lineNumber: 319,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                            sx: {
                                flex: 1,
                                textAlign: "center",
                                ml: {
                                    xs: 0,
                                    md: "-240px"
                                },
                                fontSize: {
                                    xs: "18px",
                                    lg: "24px"
                                },
                                fontWeight: 600,
                                color: "secondary.main"
                            },
                            children: survey === null || survey === void 0 ? void 0 : survey.name
                        }, void 0, false, {
                            fileName: "[project]/src/app/survey/page.jsx",
                            lineNumber: 333,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/survey/page.jsx",
                    lineNumber: 308,
                    columnNumber: 9
                }, this),
                !surveyTaken ? !surveyCompleted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        steps[currentGroupIndex] !== "Welcome" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                            size: 12,
                            children: !isMobile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Stepper$2f$Stepper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stepper$3e$__["Stepper"], {
                                activeStep: visibleStepIndex,
                                alternativeLabel: true,
                                connector: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$StepConnector$2f$StepConnector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__StepConnector$3e$__["StepConnector"], {}, void 0, false, {
                                    fileName: "[project]/src/app/survey/page.jsx",
                                    lineNumber: 355,
                                    columnNumber: 34
                                }, void 0),
                                sx: {
                                    my: 1,
                                    width: "100%"
                                },
                                children: visibleSteps.map((label)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Step$2f$Step$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Step$3e$__["Step"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$StepLabel$2f$StepLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__StepLabel$3e$__["StepLabel"], {
                                            StepIconComponent: (props)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomStepIcon, {
                                                    ...props
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/survey/page.jsx",
                                                    lineNumber: 365,
                                                    columnNumber: 31
                                                }, void 0),
                                            sx: {
                                                "& .MuiStepLabel-label": {
                                                    fontSize: "12px",
                                                    "& .Mui-active": {
                                                        fontWeight: "bold"
                                                    }
                                                }
                                            },
                                            children: label
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/survey/page.jsx",
                                            lineNumber: 363,
                                            columnNumber: 27
                                        }, this)
                                    }, label, false, {
                                        fileName: "[project]/src/app/survey/page.jsx",
                                        lineNumber: 362,
                                        columnNumber: 25
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/survey/page.jsx",
                                lineNumber: 352,
                                columnNumber: 21
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                size: 12,
                                container: true,
                                justifyContent: "center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$MobileStepper$2f$MobileStepper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MobileStepper$3e$__["MobileStepper"], {
                                    variant: "dots",
                                    steps: visibleSteps.length,
                                    position: "static",
                                    activeStep: visibleStepIndex,
                                    sx: {
                                        my: 1
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/survey/page.jsx",
                                    lineNumber: 384,
                                    columnNumber: 23
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/survey/page.jsx",
                                lineNumber: 383,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/survey/page.jsx",
                            lineNumber: 350,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                            component: "form",
                            onFocus: ()=>{
                                setValidationError(null);
                            },
                            onSubmit: handleSubmit(onSubmit),
                            size: 12,
                            container: true,
                            direction: "column",
                            justifyContent: "space-between",
                            sx: {
                                minHeight: steps[currentGroupIndex] !== "Welcome" ? "calc(90vh - 230px)" : "calc(90vh - 145px)"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                    size: 12,
                                    container: true,
                                    sx: {
                                        maxHeight: {
                                            md: steps[currentGroupIndex] !== "Welcome" ? "calc(90vh - 300px)" : "calc(90vh - 215px)"
                                        },
                                        maxWidth: "100%",
                                        overflowY: "auto",
                                        borderRadius: 2,
                                        bgcolor: "#e8f0fd",
                                        border: "1px solid #f4f4f4",
                                        py: 2,
                                        px: 2,
                                        flex: 1,
                                        flexDirection: "column",
                                        justifyContent: "space-between"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                                        children: [
                                            validationError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                                                sx: {
                                                    px: 1
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                                                    severity: "error",
                                                    sx: {
                                                        borderRadius: 2,
                                                        fontWeight: "500",
                                                        py: 0,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        backgroundColor: "rgba(255, 219, 219, 1)"
                                                    },
                                                    children: validationError
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/survey/page.jsx",
                                                    lineNumber: 437,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/survey/page.jsx",
                                                lineNumber: 436,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                                                sx: {
                                                    display: "flex",
                                                    width: "100%",
                                                    flexWrap: "wrap"
                                                },
                                                children: currentGroup.map((que)=>{
                                                    var _questionBank_que;
                                                    const question = (_questionBank_que = questionBank[que]) !== null && _questionBank_que !== void 0 ? _questionBank_que : null;
                                                    if (!question) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            width: "50%"
                                                        },
                                                        children: "Abhi ye question nahi bna hai"
                                                    }, que, false, {
                                                        fileName: "[project]/src/app/survey/page.jsx",
                                                        lineNumber: 463,
                                                        columnNumber: 29
                                                    }, this);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Question, {
                                                        form: form,
                                                        question: question,
                                                        control: control,
                                                        errors: errors,
                                                        watch: watch
                                                    }, question.name, false, {
                                                        fileName: "[project]/src/app/survey/page.jsx",
                                                        lineNumber: 468,
                                                        columnNumber: 27
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/survey/page.jsx",
                                                lineNumber: 452,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/survey/page.jsx",
                                        lineNumber: 434,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/survey/page.jsx",
                                    lineNumber: 412,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                    container: true,
                                    size: 12,
                                    spacing: 2,
                                    sx: {
                                        justifyContent: "flex-end",
                                        py: 2
                                    },
                                    children: [
                                        currentGroupIndex !== 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].MuiButton, {
                                            variant: "outlined",
                                            color: "secondary",
                                            sx: {
                                                fontWeight: 600,
                                                borderWidth: 2
                                            },
                                            onClick: onBack,
                                            children: "Back"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/survey/page.jsx",
                                            lineNumber: 491,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].MuiButton, {
                                            variant: "contained",
                                            color: "secondary",
                                            // loading={true}
                                            sx: {
                                                fontWeight: 600
                                            },
                                            onClick: isLast ? handleSubmit(onSubmit) : onNext,
                                            children: isLast ? "Submit" : "Next"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/survey/page.jsx",
                                            lineNumber: 500,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/survey/page.jsx",
                                    lineNumber: 481,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/survey/page.jsx",
                            lineNumber: 395,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                    size: 12,
                    container: true,
                    alignItems: "space-between",
                    sx: {
                        minHeight: "calc(90vh - 125px)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                            component: "div",
                            sx: {
                                textAlign: "justify",
                                p: 3,
                                width: "100%",
                                minHeight: "calc(90vh - 215px)",
                                bgcolor: "#e8f0fd",
                                border: "1px solid #f4f4f4",
                                textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)"
                            },
                            dangerouslySetInnerHTML: {
                                __html: survey.thankyou
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/survey/page.jsx",
                            lineNumber: 521,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                            size: 12,
                            container: true,
                            justifyContent: "center",
                            mt: 2,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].MuiButton, {
                                variant: "contained",
                                color: "secondary",
                                sx: {
                                    height: "36px",
                                    fontWeight: 600
                                },
                                onClick: ()=>{
                                    router.push("/member/dashboard");
                                },
                                children: "Go to Dashboard"
                            }, void 0, false, {
                                fileName: "[project]/src/app/survey/page.jsx",
                                lineNumber: 535,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/survey/page.jsx",
                            lineNumber: 534,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/survey/page.jsx",
                    lineNumber: 515,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                    size: 12,
                    container: true,
                    direction: "column",
                    spacing: 3,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                        size: 12,
                        container: true,
                        spacing: 2,
                        alignSelf: "flex-start",
                        alignItems: "center",
                        direction: "column",
                        mt: 6,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                color: "secondary",
                                sx: {
                                    fontSize: "80px"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/survey/page.jsx",
                                lineNumber: 562,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                                sx: {
                                    fontSize: "32px",
                                    textAlign: "center",
                                    my: 2
                                },
                                children: "Survey Already Taken"
                            }, void 0, false, {
                                fileName: "[project]/src/app/survey/page.jsx",
                                lineNumber: 563,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                                sx: {
                                    fontSize: "16px",
                                    width: {
                                        xs: "95%",
                                        lg: "75%"
                                    },
                                    textAlign: "center",
                                    py: 7,
                                    px: 2,
                                    bgcolor: "#e8f0fd",
                                    border: "1px solid rgba(51, 169, 202, 0.4)",
                                    borderRadius: 2
                                },
                                children: "You have already completed this survey. You can now go to your dashboard to view your rewards and other available surveys."
                            }, void 0, false, {
                                fileName: "[project]/src/app/survey/page.jsx",
                                lineNumber: 566,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].MuiButton, {
                                variant: "contained",
                                color: "secondary",
                                sx: {
                                    fontWeight: "bold",
                                    mt: 2
                                },
                                onClick: ()=>{
                                    router.push("/member/dashboard");
                                },
                                children: "Go to Dashboard"
                            }, void 0, false, {
                                fileName: "[project]/src/app/survey/page.jsx",
                                lineNumber: 581,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/survey/page.jsx",
                        lineNumber: 553,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/survey/page.jsx",
                    lineNumber: 552,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/survey/page.jsx",
            lineNumber: 288,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/survey/page.jsx",
        lineNumber: 276,
        columnNumber: 5
    }, this);
}
_s(page, "0s1iAgjyFv/TAtzUfxpX1Z1E1sU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$member$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMember"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$query$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$useMediaQuery$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useMediaQuery$3e$__["useMediaQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"]
    ];
});
const Question = (param)=>{
    let { question, control, errors, watch, form, editMode = false } = param;
    _s1();
    const [options, setOptions] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState([]);
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$member$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMember"])();
    const [isMapVisible, setIsMapVisible] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const isQuestionDisabled = question.disabled || editMode;
    const parentValue = question.parent ? watch(question.parent) : null;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "Question.useEffect": ()=>{
            if (!Boolean(parentValue)) setOptions(question.options);
            else if (parentValue instanceof Array) {
                setOptions(question.options.filter({
                    "Question.useEffect": (opt)=>{
                        var _temp_old;
                        let temp = opt.parentValue.diff(parentValue);
                        if ((temp === null || temp === void 0 ? void 0 : (_temp_old = temp.old) === null || _temp_old === void 0 ? void 0 : _temp_old.length) > 0) return true;
                        return false;
                    }
                }["Question.useEffect"]));
            } else setOptions(question.options.filter({
                "Question.useEffect": (opt)=>opt.parentValue.includes(parentValue)
            }["Question.useEffect"]));
        }
    }["Question.useEffect"], [
        parentValue,
        question.options
    ]);
    const renderQuestion = ()=>{
        if (![
            null,
            undefined,
            ""
        ].includes(question.parent) && [
            "phone",
            "select",
            "text",
            "multiselect",
            "radio",
            "checkbox"
        ].includes(question.type)) {
            if ([
                null,
                undefined,
                ""
            ].includes(parentValue)) {
                return null;
            }
            if ([
                "select",
                "multiselect",
                "radio",
                "checkbox"
            ].includes(question.type) && (!options || !(options instanceof Array) || !(options.length > 0))) {
                return null;
            }
            if ([
                "phone"
            ].includes(question.type) && !parentValue.includes(question.name)) {
                return null;
            }
            if ([
                "text"
            ].includes(question.type) && parentValue === "No") {
                return null;
            }
        }
        if (question.name === "zipcode") {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                size: {
                    xs: 12,
                    md: Number(question === null || question === void 0 ? void 0 : question.size)
                },
                alignSelf: "flex-end",
                sx: {
                    px: 2,
                    py: 1
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Form$3e$__["Form"].Input, {
                    ...form.register("".concat(question.name)),
                    control: control,
                    watch: watch,
                    api: "zipcode",
                    parent: "".concat(question.parent),
                    surveyLabel: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                        sx: {
                            fontWeight: 600,
                            mb: 0.5,
                            color: "#04662b"
                        },
                        children: [
                            question.label,
                            " "
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/survey/page.jsx",
                        lineNumber: 672,
                        columnNumber: 15
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/src/app/survey/page.jsx",
                    lineNumber: 665,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/survey/page.jsx",
                lineNumber: 660,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0));
        }
        switch(question.type){
            case "note":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                    size: {
                        xs: 12,
                        md: Number(question === null || question === void 0 ? void 0 : question.size)
                    },
                    alignSelf: "flex-end",
                    sx: {
                        textAlign: "center",
                        px: 2,
                        py: 1
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Box, {
                            component: "div",
                            sx: {
                                textAlign: "justify",
                                p: 3,
                                textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)"
                            },
                            dangerouslySetInnerHTML: {
                                __html: question.label
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/survey/page.jsx",
                            lineNumber: 692,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false)
                }, void 0, false, {
                    fileName: "[project]/src/app/survey/page.jsx",
                    lineNumber: 686,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            case "radio":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                    size: {
                        xs: 12,
                        md: Number(question === null || question === void 0 ? void 0 : question.size)
                    },
                    alignSelf: "flex-end",
                    sx: {
                        px: 2,
                        py: 1
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControl$2f$FormControl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControl$3e$__["FormControl"], {
                        component: "fieldset",
                        required: question.required,
                        fullWidth: true,
                        sx: {
                            "& .MuiFormControlLabel-label": {
                                fontSize: 13
                            }
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                                sx: {
                                    fontWeight: 600,
                                    mb: 0.5,
                                    color: "#04662b"
                                },
                                children: [
                                    question.label,
                                    " ",
                                    question.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: "red",
                                            fontWeight: 600
                                        },
                                        children: "*"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/survey/page.jsx",
                                        lineNumber: 728,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/survey/page.jsx",
                                lineNumber: 725,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Controller"], {
                                name: question.name,
                                control: control,
                                rules: {
                                    required: question.required ? "This field is required" : false
                                },
                                defaultValue: "",
                                render: (param)=>{
                                    let { field } = param;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$RadioGroup$2f$RadioGroup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RadioGroup$3e$__["RadioGroup"], {
                                                ...field,
                                                "aria-label": question.label,
                                                children: options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControlLabel$3e$__["FormControlLabel"], {
                                                        value: typeof option === "string" ? option : option.label,
                                                        control: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Radio$2f$Radio$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__["Radio"], {
                                                            disabled: isQuestionDisabled,
                                                            sx: {
                                                                "& .MuiSvgIcon-root": {
                                                                    color: "secondary.main"
                                                                }
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/survey/page.jsx",
                                                            lineNumber: 752,
                                                            columnNumber: 29
                                                        }, void 0),
                                                        label: typeof option === "string" ? option : option.label
                                                    }, typeof option === "string" ? option : option.label, false, {
                                                        fileName: "[project]/src/app/survey/page.jsx",
                                                        lineNumber: 744,
                                                        columnNumber: 25
                                                    }, void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/survey/page.jsx",
                                                lineNumber: 742,
                                                columnNumber: 21
                                            }, void 0),
                                            errors[question.name] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                                                color: "error",
                                                variant: "caption",
                                                sx: {
                                                    fontWeight: "bold"
                                                },
                                                children: errors[question.name].message
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/survey/page.jsx",
                                                lineNumber: 768,
                                                columnNumber: 23
                                            }, void 0)
                                        ]
                                    }, void 0, true);
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/survey/page.jsx",
                                lineNumber: 731,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/survey/page.jsx",
                        lineNumber: 715,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/app/survey/page.jsx",
                    lineNumber: 707,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            case "checkbox":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                    size: {
                        xs: 12,
                        md: Number(question === null || question === void 0 ? void 0 : question.size)
                    },
                    alignSelf: "flex-end",
                    sx: {
                        px: 2,
                        py: 1
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControl$2f$FormControl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControl$3e$__["FormControl"], {
                        component: "fieldset",
                        required: question.required,
                        fullWidth: true,
                        sx: {
                            "& .MuiFormControlLabel-label": {
                                fontSize: 13
                            }
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                                sx: {
                                    fontWeight: 600,
                                    mb: 0.5,
                                    color: "#04662b"
                                },
                                children: [
                                    question.label,
                                    " ",
                                    question.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: "red",
                                            fontWeight: 600
                                        },
                                        children: "*"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/survey/page.jsx",
                                        lineNumber: 806,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/survey/page.jsx",
                                lineNumber: 803,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Controller"], {
                                name: question.name,
                                control: control,
                                rules: {
                                    required: question.required ? "This field is required" : false
                                },
                                defaultValue: [],
                                render: (param)=>{
                                    let { field } = param;
                                    const handleChange = (optionValue)=>{
                                        const currentValue = field.value || [];
                                        if (currentValue.includes(optionValue)) {
                                            // console.log(optionValue);
                                            // Remove value
                                            field.onChange(currentValue.filter((v)=>v !== optionValue));
                                        } else {
                                            // Add value
                                            field.onChange([
                                                ...currentValue,
                                                optionValue
                                            ]);
                                        }
                                    };
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormGroup$2f$FormGroup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormGroup$3e$__["FormGroup"], {
                                                children: options.map((option)=>{
                                                    var _field_value;
                                                    const label = typeof option === "string" ? option : option.label;
                                                    const value = typeof option === "string" ? option : option.value;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControlLabel$3e$__["FormControlLabel"], {
                                                        control: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Checkbox$2f$Checkbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Checkbox$3e$__["Checkbox"], {
                                                            disabled: isQuestionDisabled,
                                                            checked: (_field_value = field.value) === null || _field_value === void 0 ? void 0 : _field_value.includes(value),
                                                            onChange: ()=>handleChange(value),
                                                            sx: {
                                                                "& .MuiSvgIcon-root": {
                                                                    color: "secondary.main"
                                                                }
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/survey/page.jsx",
                                                            lineNumber: 847,
                                                            columnNumber: 33
                                                        }, void 0),
                                                        label: label
                                                    }, label, false, {
                                                        fileName: "[project]/src/app/survey/page.jsx",
                                                        lineNumber: 844,
                                                        columnNumber: 29
                                                    }, void 0);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/survey/page.jsx",
                                                lineNumber: 837,
                                                columnNumber: 23
                                            }, void 0),
                                            errors[question.name] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                                                color: "error",
                                                variant: "caption",
                                                sx: {
                                                    fontWeight: "500"
                                                },
                                                children: errors[question.name].message
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/survey/page.jsx",
                                                lineNumber: 865,
                                                columnNumber: 25
                                            }, void 0)
                                        ]
                                    }, void 0, true);
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/survey/page.jsx",
                                lineNumber: 810,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/survey/page.jsx",
                        lineNumber: 793,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/app/survey/page.jsx",
                    lineNumber: 785,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            case "date":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                    size: {
                        xs: 12,
                        md: Number(question === null || question === void 0 ? void 0 : question.size)
                    },
                    alignSelf: "flex-end",
                    sx: {
                        px: 2,
                        py: 1
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControl$2f$FormControl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControl$3e$__["FormControl"], {
                        fullWidth: true,
                        required: question.required,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                                sx: {
                                    fontWeight: 600,
                                    mb: 0.5,
                                    color: "#04662b"
                                },
                                children: [
                                    question.label,
                                    " ",
                                    question.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: "red",
                                            fontWeight: 600
                                        },
                                        children: "*"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/survey/page.jsx",
                                        lineNumber: 895,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/survey/page.jsx",
                                lineNumber: 892,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                size: 12,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Form$3e$__["Form"].Date, {
                                    ...form.register(question.name),
                                    control: form.control,
                                    disabled: isQuestionDisabled,
                                    validations: {
                                        required: question.required ? "This field is required" : false
                                    },
                                    dateRange: question.dateRange,
                                    errors: errors === null || errors === void 0 ? void 0 : errors[question.name]
                                }, void 0, false, {
                                    fileName: "[project]/src/app/survey/page.jsx",
                                    lineNumber: 899,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/app/survey/page.jsx",
                                lineNumber: 898,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/survey/page.jsx",
                        lineNumber: 891,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/app/survey/page.jsx",
                    lineNumber: 883,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            case "multiselect":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                    size: {
                        xs: 12,
                        md: Number(question === null || question === void 0 ? void 0 : question.size)
                    },
                    alignSelf: "flex-end",
                    sx: {
                        px: 2,
                        py: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                            sx: {
                                fontWeight: 600,
                                mb: 0.5,
                                color: "#04662b"
                            },
                            children: [
                                question.label,
                                " ",
                                question.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: "red",
                                        fontWeight: 600
                                    },
                                    children: "*"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/survey/page.jsx",
                                    lineNumber: 929,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/survey/page.jsx",
                            lineNumber: 926,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Form$3e$__["Form"].Select, {
                            ...form.register(question.name),
                            control: control,
                            watch: watch,
                            multiple: true,
                            isDisabled: isQuestionDisabled,
                            options: (question === null || question === void 0 ? void 0 : question.options) && options instanceof Array && options.map((opt)=>{
                                if (typeof opt === "string") return {
                                    label: opt,
                                    value: opt
                                };
                                return opt;
                            }),
                            parent: question.parent,
                            validations: {
                                required: question.required ? "This field is required" : false
                            },
                            errors: errors === null || errors === void 0 ? void 0 : errors[question.name],
                            sx: {
                                "& .MuiOutlinedInput-notchedOutline legend": {
                                    width: 0,
                                    visibilty: "hidden"
                                }
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/survey/page.jsx",
                            lineNumber: 932,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/survey/page.jsx",
                    lineNumber: 918,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            case "select":
                let optionList = options;
                if (question.parent === "rural") {
                    const pvalue = form.watch(question.parent);
                    if (!pvalue || pvalue === "") return "";
                    let currency = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$getCurrency$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__getCurrency$3e$__["getCurrency"])(pvalue.split("-")[0]);
                    optionList = options.map((opt)=>{
                        let label = opt.label.split("-").map((v)=>Number(v).toMoney(currency)).join(" - ");
                        return {
                            ...opt,
                            label
                        };
                    });
                }
                optionList = Object.entries(optionList.reduce((a, c)=>{
                    a[c.value] = c.label;
                    return a;
                }, {})).map((e)=>({
                        value: e[0],
                        label: e[1]
                    }));
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                    size: {
                        xs: 12,
                        md: Number(question === null || question === void 0 ? void 0 : question.size)
                    },
                    alignSelf: "flex-end",
                    sx: {
                        px: 2,
                        py: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                            sx: {
                                fontWeight: 600,
                                mb: 0.5,
                                color: "#04662b"
                            },
                            children: [
                                question.label,
                                " ",
                                question.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: "red",
                                        fontWeight: 600
                                    },
                                    children: "*"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/survey/page.jsx",
                                    lineNumber: 1002,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/survey/page.jsx",
                            lineNumber: 999,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Form$3e$__["Form"].Select, {
                            ...form.register(question.name),
                            control: control,
                            watch: watch,
                            isDisabled: isQuestionDisabled,
                            options: optionList,
                            // api={question.api}
                            parent: question.parent,
                            validations: {
                                required: question.required ? "This field is required" : false
                            },
                            errors: errors === null || errors === void 0 ? void 0 : errors[question.name],
                            sx: {
                                "& .MuiOutlinedInput-notchedOutline legend": {
                                    width: 0,
                                    visibilty: "hidden"
                                }
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/survey/page.jsx",
                            lineNumber: 1005,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/survey/page.jsx",
                    lineNumber: 991,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            case "text":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                    size: {
                        xs: 12,
                        md: Number(question === null || question === void 0 ? void 0 : question.size)
                    },
                    alignSelf: "flex-end",
                    sx: {
                        px: 2,
                        py: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                            sx: {
                                fontWeight: 600,
                                mb: 0.5,
                                color: "#04662b"
                            },
                            children: [
                                question.label,
                                " ",
                                question.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: "red",
                                        fontWeight: 600
                                    },
                                    children: "*"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/survey/page.jsx",
                                    lineNumber: 1040,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/survey/page.jsx",
                            lineNumber: 1037,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Form$3e$__["Form"].Input, {
                            ...form.register(question.name),
                            control: control,
                            watch: watch,
                            disabled: isQuestionDisabled,
                            parent: question.parent,
                            validations: {
                                required: question.required ? "This field is required" : false
                            },
                            errors: errors === null || errors === void 0 ? void 0 : errors[question.name],
                            sx: {
                                "& label.MuiInputLabel-shrink": {
                                    fontSize: "16px !important",
                                    backgroundColor: "white",
                                    borderRadius: "4px",
                                    px: 2,
                                    ml: -1.5
                                }
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/survey/page.jsx",
                            lineNumber: 1043,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/survey/page.jsx",
                    lineNumber: 1029,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            case "textarea":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                    size: {
                        xs: 12,
                        md: Number(question === null || question === void 0 ? void 0 : question.size)
                    },
                    alignSelf: "flex-end",
                    sx: {
                        px: 2,
                        py: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                            sx: {
                                fontWeight: 600,
                                mb: 0.5,
                                color: "#04662b"
                            },
                            children: [
                                question.label,
                                " ",
                                question.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: "red",
                                        fontWeight: 600
                                    },
                                    children: "*"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/survey/page.jsx",
                                    lineNumber: 1079,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/survey/page.jsx",
                            lineNumber: 1076,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Form$3e$__["Form"].Input, {
                            ...form.register(question.name),
                            control: control,
                            watch: watch,
                            parent: question.parent,
                            disabled: isQuestionDisabled,
                            validations: {
                                required: question.required ? "This field is required" : false
                            },
                            errors: errors === null || errors === void 0 ? void 0 : errors[question.name],
                            multiline: true,
                            rows: 4,
                            sx: {
                                "& label.MuiInputLabel-shrink": {
                                    fontSize: "16px !important",
                                    backgroundColor: "white",
                                    borderRadius: "4px",
                                    px: 2,
                                    ml: -1.5
                                }
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/survey/page.jsx",
                            lineNumber: 1082,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/survey/page.jsx",
                    lineNumber: 1068,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            case "editor":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                    size: {
                        xs: 12,
                        md: Number(question === null || question === void 0 ? void 0 : question.size)
                    },
                    alignSelf: "flex-end",
                    sx: {
                        px: 2,
                        py: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                            sx: {
                                fontWeight: 600,
                                mb: 0.5,
                                color: "#04662b"
                            },
                            children: [
                                question.label,
                                " ",
                                question.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: "red",
                                        fontWeight: 600
                                    },
                                    children: "*"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/survey/page.jsx",
                                    lineNumber: 1120,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/survey/page.jsx",
                            lineNumber: 1117,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Form$3e$__["Form"].TextEditor, {
                            ...form.register(question.name),
                            control: control,
                            watch: watch,
                            disabled: isQuestionDisabled,
                            validations: {
                                required: question.required ? "This field is required" : false
                            },
                            errors: errors === null || errors === void 0 ? void 0 : errors[question.name]
                        }, void 0, false, {
                            fileName: "[project]/src/app/survey/page.jsx",
                            lineNumber: 1123,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/survey/page.jsx",
                    lineNumber: 1109,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            case "document":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                    size: {
                        xs: 12,
                        md: Number(question === null || question === void 0 ? void 0 : question.size)
                    },
                    alignSelf: "flex-end",
                    sx: {
                        px: 2,
                        py: 1
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControl$2f$FormControl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControl$3e$__["FormControl"], {
                        fullWidth: true,
                        required: question.required,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                                sx: {
                                    fontWeight: 600,
                                    mb: 0.5,
                                    color: "#04662b"
                                },
                                children: [
                                    question.label,
                                    " ",
                                    question.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: "red",
                                            fontWeight: 600
                                        },
                                        children: "*"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/survey/page.jsx",
                                        lineNumber: 1150,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/survey/page.jsx",
                                lineNumber: 1147,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Form$3e$__["Form"].Upload, {
                                endpoint: "/api/v1/upload/pdf",
                                name: question.name,
                                control: control,
                                form: form,
                                rules: {
                                    required: question.required ? "This field is required" : false
                                },
                                accept: "application/pdf"
                            }, void 0, false, {
                                fileName: "[project]/src/app/survey/page.jsx",
                                lineNumber: 1153,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/survey/page.jsx",
                        lineNumber: 1146,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/app/survey/page.jsx",
                    lineNumber: 1138,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            case "address":
                function setCoordinates(coordinates) {
                    form.setValue("".concat(question.name, ".coordinates"), coordinates);
                }
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                    size: 12,
                    container: true,
                    p: 2,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                            sx: {
                                fontWeight: 600,
                                mb: 0.5,
                                color: "#04662b",
                                width: "100%"
                            },
                            children: [
                                question.label,
                                " ",
                                question.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: "red",
                                        fontWeight: 600
                                    },
                                    children: "*"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/survey/page.jsx",
                                    lineNumber: 1180,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/survey/page.jsx",
                            lineNumber: 1175,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                            size: {
                                xs: 12,
                                md: watch("".concat(question.name, ".consent")) === "Yes" ? 6 : 12
                            },
                            container: true,
                            direction: "column",
                            justifySelf: "flex-start",
                            spacing: 1.5,
                            mt: 1,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                    size: 12,
                                    container: true,
                                    direction: "column",
                                    spacing: 0,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                                            sx: {
                                                fontWeight: 600,
                                                mb: 0.5,
                                                color: "#04662b"
                                            },
                                            children: "Are you comfortable sharing your location on map?"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/survey/page.jsx",
                                            lineNumber: 1196,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Controller"], {
                                            name: "".concat(question.name, ".consent"),
                                            control: control,
                                            rules: "This field is required",
                                            defaultValue: "",
                                            render: (param)=>{
                                                let { field } = param;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$RadioGroup$2f$RadioGroup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RadioGroup$3e$__["RadioGroup"], {
                                                            ...field,
                                                            "aria-label": question.label,
                                                            onChange: (e)=>{
                                                                if (e.target.value === "Yes") setIsMapVisible(true);
                                                                field.onChange(e);
                                                            },
                                                            children: [
                                                                {
                                                                    label: "Yes",
                                                                    value: "Yes"
                                                                },
                                                                {
                                                                    label: "No",
                                                                    value: "No"
                                                                }
                                                            ].map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControlLabel$3e$__["FormControlLabel"], {
                                                                    value: typeof option === "string" ? option : option.label,
                                                                    control: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Radio$2f$Radio$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__["Radio"], {
                                                                        sx: {
                                                                            "& .MuiSvgIcon-root": {
                                                                                color: "secondary.main"
                                                                            }
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/survey/page.jsx",
                                                                        lineNumber: 1229,
                                                                        columnNumber: 31
                                                                    }, void 0),
                                                                    label: typeof option === "string" ? option : option.label
                                                                }, typeof option === "string" ? option : option.label, false, {
                                                                    fileName: "[project]/src/app/survey/page.jsx",
                                                                    lineNumber: 1221,
                                                                    columnNumber: 27
                                                                }, void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/survey/page.jsx",
                                                            lineNumber: 1206,
                                                            columnNumber: 23
                                                        }, void 0),
                                                        errors[question.name] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                                                            color: "error",
                                                            variant: "caption",
                                                            sx: {
                                                                fontWeight: "500"
                                                            },
                                                            children: errors[question.name].message
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/survey/page.jsx",
                                                            lineNumber: 1244,
                                                            columnNumber: 25
                                                        }, void 0)
                                                    ]
                                                }, void 0, true);
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/survey/page.jsx",
                                            lineNumber: 1199,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/survey/page.jsx",
                                    lineNumber: 1195,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                    size: 12,
                                    container: true,
                                    direction: "column",
                                    spacing: 0,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Form$3e$__["Form"].Input, {
                                        ...form.register("".concat(question.name, ".line1")),
                                        control: control,
                                        watch: watch,
                                        labelText: "Address Line 1"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/survey/page.jsx",
                                        lineNumber: 1257,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/survey/page.jsx",
                                    lineNumber: 1256,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                    size: 12,
                                    container: true,
                                    direction: "column",
                                    spacing: 0,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Form$3e$__["Form"].Input, {
                                        ...form.register("".concat(question.name, ".line2")),
                                        control: control,
                                        watch: watch,
                                        labelText: "Address Line 2"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/survey/page.jsx",
                                        lineNumber: 1265,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/survey/page.jsx",
                                    lineNumber: 1264,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                    size: 12,
                                    container: true,
                                    direction: "column",
                                    spacing: 0,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Form$3e$__["Form"].Select, {
                                        ...form.register("".concat(question.name, ".country")),
                                        control: control,
                                        watch: watch,
                                        option: [],
                                        api: "country",
                                        labelText: "Country"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/survey/page.jsx",
                                        lineNumber: 1273,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/survey/page.jsx",
                                    lineNumber: 1272,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                    size: 12,
                                    container: true,
                                    direction: "column",
                                    spacing: 0,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Form$3e$__["Form"].Select, {
                                        ...form.register("".concat(question.name, ".state")),
                                        control: control,
                                        watch: watch,
                                        option: [],
                                        parent: "".concat(question.name, ".country"),
                                        api: "state",
                                        labelText: "State"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/survey/page.jsx",
                                        lineNumber: 1283,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/survey/page.jsx",
                                    lineNumber: 1282,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                    size: 12,
                                    container: true,
                                    direction: "column",
                                    spacing: 0,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Form$3e$__["Form"].Select, {
                                        ...form.register("".concat(question.name, ".city")),
                                        control: control,
                                        watch: watch,
                                        option: [],
                                        parent: [
                                            "".concat(question.name, ".country"),
                                            "".concat(question.name, ".state")
                                        ],
                                        api: "city",
                                        labelText: "City"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/survey/page.jsx",
                                        lineNumber: 1294,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/survey/page.jsx",
                                    lineNumber: 1293,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                    size: 12,
                                    container: true,
                                    direction: "column",
                                    spacing: 0,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Form$3e$__["Form"].Input, {
                                        ...form.register("".concat(question.name, ".zipcode")),
                                        control: control,
                                        watch: watch,
                                        api: "zipcode",
                                        parent: "".concat(question.name, ".country"),
                                        labelText: "Zipcode"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/survey/page.jsx",
                                        lineNumber: 1308,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/survey/page.jsx",
                                    lineNumber: 1307,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                " "
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/survey/page.jsx",
                            lineNumber: 1184,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        isMapVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                            size: {
                                xs: 12,
                                md: 6
                            },
                            direction: "column",
                            container: true,
                            p: 2,
                            display: watch("".concat(question.name, ".consent")) === "Yes" ? "flex" : "none",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Map$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    setCoordinates: setCoordinates
                                }, void 0, false, {
                                    fileName: "[project]/src/app/survey/page.jsx",
                                    lineNumber: 1329,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                                    fontStyle: "italic",
                                    mt: 1,
                                    children: "click on your location to place location marker"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/survey/page.jsx",
                                    lineNumber: 1330,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/survey/page.jsx",
                            lineNumber: 1320,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/survey/page.jsx",
                    lineNumber: 1174,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            case "phone":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                    size: {
                        xs: 12,
                        md: Number(question === null || question === void 0 ? void 0 : question.size)
                    },
                    alignSelf: "flex-end",
                    sx: {
                        px: 2,
                        py: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$util$2f$page$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Page$3e$__["Page"].Text, {
                            sx: {
                                fontWeight: 600,
                                mb: 0.5,
                                color: "#04662b"
                            },
                            children: [
                                question.label,
                                " ",
                                question.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: "red",
                                        fontWeight: 600
                                    },
                                    children: "*"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/survey/page.jsx",
                                    lineNumber: 1351,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/survey/page.jsx",
                            lineNumber: 1348,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Form$3e$__["Form"].Phone, {
                            name: question.name,
                            control: control,
                            onlyCountries: undefined,
                            disabled: isQuestionDisabled,
                            validations: {
                                required: question.required ? "This field is required" : false
                            },
                            errors: errors === null || errors === void 0 ? void 0 : errors[question.name]
                        }, void 0, false, {
                            fileName: "[project]/src/app/survey/page.jsx",
                            lineNumber: 1355,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/survey/page.jsx",
                    lineNumber: 1340,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            default:
                return null;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: renderQuestion()
    }, void 0, false);
};
_s1(Question, "QeFPRSK8EeDVuDMBvooeT/gZqMI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Context$2f$member$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMember"]
    ];
});
_c1 = Question;
var _c, _c1;
__turbopack_context__.k.register(_c, "CustomStepIcon");
__turbopack_context__.k.register(_c1, "Question");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_6bf35864._.js.map