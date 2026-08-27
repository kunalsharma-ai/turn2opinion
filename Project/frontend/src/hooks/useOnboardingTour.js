"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { STATUS, ACTIONS, EVENTS } from "react-joyride";
import { api, loadData } from "@/util";


const TOUR_SEEN_QUESTION = "tourSeenRoutes";


function normalizeSeenArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // not JSON - ignore
    }
  }
  return [];
}

function saveSeenRoutesArray(tourSeenRoutes) {
  // throw new Error("Testing");
// console.log({routesArray: tourSeenRoutes})
  api.patch("/api/v1/me/answer", { tourSeenRoutes }).catch((err) => {
    console.warn("useOnboardingTour: failed to persist seen routes", err);
  });
}

function fillTemplate(text, { userName, greeting }) {
  return (text || "")
    .replace(/{{\s*name\s*}}/gi, userName?.trim() || "there")
    .replace(/{{\s*greeting\s*}}/gi, greeting?.trim() || "Hello");
}

/**
 * @param {object} member - the logged-in user document (from useMember()).
 * @param {string} userName - used to fill {{name}} in step copy.
 * @param {string} greeting - used to fill {{greeting}} in step copy.
 */
export default function useOnboardingTour({ member, userName = "", greeting = "" }) {
  const pathname = usePathname();

  const [allSteps, setAllSteps] = React.useState([]);
  const [run, setRun] = React.useState(false);
  
  const [localStepIndex, setLocalStepIndex] = React.useState(0);
 
  const [seenRoutesArray, setSeenRoutesArray] = React.useState([]);
  const [seenRoutesLoaded, setSeenRoutesLoaded] = React.useState(false);

  const triggeredRoutesRef = React.useRef(new Set());

  
  const seenRoutes = React.useMemo(() => {
    const map = {};
    for (const route of seenRoutesArray) map[route] = true;
    return map;
  }, [seenRoutesArray]);

  const routeOrder = React.useMemo(() => {
    const order = [];
    const added = new Set();
    for (const step of allSteps) {
      if (step.route && !added.has(step.route)) {
        added.add(step.route);
        order.push(step.route);
      }
    }
    return order;
  }, [allSteps]);

  
  const stepCountByRoute = React.useMemo(() => {
    const counts = {};
    for (const step of allSteps) {
      if (!step.route) continue;
      counts[step.route] = (counts[step.route] || 0) + 1;
    }
    return counts;
  }, [allSteps]);
  const routeOffset = React.useMemo(() => {
    let offset = 0;
    for (const route of routeOrder) {
      if (route === pathname) break;
      offset += stepCountByRoute[route] || 0;
    }
    return offset;
  }, [routeOrder, stepCountByRoute, pathname]);


  React.useEffect(() => {
    setLocalStepIndex(0);
  }, [pathname]);

  const globalCurrent = routeOffset + localStepIndex + 1;
  const globalTotal = allSteps.length;

  const steps = React.useMemo(() => {
    return allSteps
      .filter((s) => s.route === pathname)
      .map((s) => ({
        target: s.target,
        title: fillTemplate(s.title, { userName, greeting }),
        content: fillTemplate(s.content, { userName, greeting }),
        placement: "auto",
    
        
        buttons: ["back", "primary", "skip"],
      }));
  }, [allSteps, pathname, userName, greeting]);

  
  React.useEffect(() => {
    loadData(api.get(`/data/tour.json`), async (resp) => {
      if (Array.isArray(resp)) setAllSteps(resp);
    });
  }, []);

  
  React.useEffect(() => {
    if (!member) return;

    api
      .post("/api/v1/me", { questions: [TOUR_SEEN_QUESTION] })
      .then((resp) => {
        const raw = resp?.data?.[TOUR_SEEN_QUESTION];
        if(raw instanceof Array)
        setSeenRoutesArray(raw);
      else 
        setSeenRoutesArray([raw]);
      })
      .catch((err) => {
        console.warn("useOnboardingTour: failed to load seen routes", err);
        
      })
      .finally(()=>{
        
        setSeenRoutesLoaded(true);
      });
  }, [member]);

  const hasMember = Boolean(member);
  const seenRoutesKey = seenRoutesArray.join("|");

  React.useEffect(() => {
    if (!hasMember || !seenRoutesLoaded || steps.length === 0) {
      setRun(false);
      return;
    }
    if (seenRoutes[pathname] || triggeredRoutesRef.current.has(pathname)) {
      setRun(false);
      return;
    }

    triggeredRoutesRef.current.add(pathname);
    setRun(true);
    
  }, [pathname, steps, hasMember, seenRoutesLoaded, seenRoutesKey]);


  const pauseTourForNow = React.useCallback(() => {
    triggeredRoutesRef.current.delete(pathname);
  }, [pathname]);

  
  const completeCurrentRoute = React.useCallback(() => {
    setSeenRoutesArray((prev) => {
      console.log(prev)
      if (prev.includes(pathname)) return prev;
      const updated = [...prev, pathname];
      saveSeenRoutesArray(updated);
      return updated;
    });
  }, [pathname]);

  const handleJoyrideCallback = React.useCallback(
    (data) => {
      const { status, action, type, index } = data;
      console.log("JOYRIDE CALLBACK:", { status, action, type, index });

      if (typeof index === "number") setLocalStepIndex(index);

      if (status === STATUS.FINISHED) {
        setRun(false);
        completeCurrentRoute();
        return;
      }

      if (status === STATUS.SKIPPED || action === ACTIONS.CLOSE) {
        setRun(false);
        pauseTourForNow();
        return;
      }

      if (type === EVENTS.TARGET_NOT_FOUND) {
        console.warn("useOnboardingTour: target not found for step", data);
      }
    },
    [completeCurrentRoute, pauseTourForNow],
  );

  return { run, steps, handleJoyrideCallback, globalCurrent, globalTotal };
}