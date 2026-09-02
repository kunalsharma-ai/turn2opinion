"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, Box, IconButton, Paper, Typography } from "@mui/material";
import { Close, Paid, Poll, Stars, Verified } from "@mui/icons-material";

const MotionPaper = motion.create(Paper);

const names = [
  "Brooklyn",
  "Asher",
  "Savannah",
  "Griffin",
  "Kennedy",
  "Colton",
  "Paisley",
  "Easton",
  "Autumn",
  "Blake",
  "Everett",
  "Aubrey",
  "Emmett",
  "Brielle",
  "Wesley",
  "Peyton",
  "Silas",
  "Caroline",
  "Maverick",
  "Vivian",
  "Nolan",
  "Delilah",
  "Lincoln",
  "Jade",
  "Cooper",
  "Serenity",
  "Declan",
  "Brianna",
  "Austin",
  "Valerie",
  "Jaxon",
  "Cecilia",
  "Roman",
  "Skylar",
  "Weston",
  "Finley",
  "Everleigh",
  "Brooks",
  "Margaret",
  "Kai",
  "Faith",
  "Parker",
  "Gabriella",
  "Micah",
  "Jasmine",
  "Rowan",
  "Reese",
  "Tristan",
  "Melanie",
  "Brandon",
  "Alana",
  "Zachary",
  "Adeline",
  "Cameron",
  "Samantha",
  "Damian",
  "Rebecca",
  "Jasper",
  "Josephine",
  "Xavier",
  "Morgan",
  "Ryder",
  "Nicole",
  "Dominic",
  "Leila",
  "Beckett",
  "Natalia",
  "Maxwell",
  "Isabelle",
  "Kingston",
  "Delaney",
  "Ashton",
  "Kinsley",
  "Bryson",
  "Camille",
  "Axel",
  "Londyn",
  "Brayden",
  "Alina",
  "Advik",
  "Anvi",
  "Darsh",
  "Ira",
  "Vamika",
  "Arham",
  "Aarna",
  "Riaan",
  "Mahira",
  "Yuvan",
  "Amaira",
  "Aisha",
  "Aviraj",
  "Inaaya",
  "Arush",
  "Mysha",
  "Shrey",
  "Aaradhya",
  "Zoya",
  "Ronav",
  "Parth",
  "Krishiv",
  "Ishika",
  "Lakshya",
  "Vanya",
  "Abeer",
  "Nitya",
  "Avisha",
  "Tanish",
  "Aarini",
  "Mahi",
  "Suhana",
  "Ritvik",
  "Navisha",
  "Kairav",
  "Aashi",
  "Keshav",
  "Naira",
  "Sia",
  "Aahana",
];

const activityTypes = [
  {
    action: "just received",
    values: [
      "₹100 reward",
      "₹150 reward",
      "₹200 reward",
      "₹250 reward",
      "₹300 reward",
    ],
    description: "Reward received",
    icon: Paid,
  },
  {
    action: "completed an opinion survey and earned",
    values: [
      "100 points",
      "150 points",
      "200 points",
      "250 points",
      "300 points",
      "400 points",
    ],
    description: "Opinion shared",
    icon: Poll,
  },
  {
    action: "just earned",
    values: [
      "50 points",
      "100 points",
      "150 points",
      "200 points",
      "250 points",
      "300 points",
    ],
    description: "Points earned",
    icon: Stars,
  },
];

const DISPLAY_TIME = 7000;
const QUEUE_SIZE = 25;

const randomDelay = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getInitialDelay = () => randomDelay(4000, 10000);
const getBetweenDelay = () => randomDelay(8000, 20000);

const randomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const generateActivity = () => {
  const person = randomItem(names);
  const activity = randomItem(activityTypes);
  const value = randomItem(activity.values);

  return {
    name: person,
    action: activity.action,
    value,
    description: activity.description,
    icon: activity.icon,
  };
};

const generateQueue = (count = QUEUE_SIZE) => {
  const queue = [];
  const used = new Set();

  while (queue.length < count) {
    const activity = generateActivity();
    const key = `${activity.name}-${activity.action}-${activity.value}`;

    if (!used.has(key)) {
      used.add(key);
      queue.push(activity);
    }
  }

  return queue;
};

export default function RecentActivityPopup({ ToTopButtonVisible }) {
  const pathname = usePathname();
  const [activityQueue, setActivityQueue] = useState(() => generateQueue());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setVisible(false);
      return;
    }

    let showTimer;
    let hideTimer;
    let nextTimer;

    const showActivity = () => {
      setVisible(true);

      hideTimer = setTimeout(() => {
        setVisible(false);

        nextTimer = setTimeout(() => {
          setCurrentIndex((prev) => {
            const nextIndex = prev + 1;

            if (nextIndex >= activityQueue.length) {
              setActivityQueue(generateQueue());
              return 0;
            }

            return nextIndex;
          });

          showActivity();
        }, getBetweenDelay());
      }, DISPLAY_TIME);
    };

    showTimer = setTimeout(showActivity, getInitialDelay());

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [pathname, activityQueue.length]);

  if (pathname !== "/") {
    return null;
  }

  const current = activityQueue[currentIndex];

  if (!current) {
    return null;
  }

  const ActivityIcon = current.icon;

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <MotionPaper
          key={`${current.name}-${current.action}-${current.value}`}
          elevation={0}
          initial={{ opacity: 0, x: -80, y: 25, scale: 0.94 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={{ opacity: 0, x: -80, y: 25, scale: 0.94 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 28,
            mass: 0.8,
          }}
          sx={{
            position: "fixed",
            left: { xs: 12, sm: ToTopButtonVisible ? 74 : 14 },
            bottom: { xs: 12, sm: 14 },
            width: { xs: "calc(100vw - 24px)", sm: 380 },
            maxWidth: "380px",
            zIndex: 999,
            overflow: "hidden",
            borderRadius: "18px",
            background: "linear-gradient(135deg, #FFFFFF 0%, #F7FAFF 100%)",
            border: "1px solid rgba(12, 90, 219, 0.14)",
            boxShadow:
              "0 16px 45px rgba(12, 90, 219, 0.18), 0 4px 12px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -45,
              right: -35,
              width: 110,
              height: 110,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(6,54,134,0.16) 0%, rgba(6,54,134,0) 70%)",
              pointerEvents: "none",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -55,
              left: -45,
              width: 120,
              height: 120,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(12,90,219,0.10) 0%, rgba(12,90,219,0) 70%)",
              pointerEvents: "none",
            }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              p: 1.75,
              pr: 1.25,
              position: "relative",
              zIndex: 1,
            }}
          >
            <Box sx={{ position: "relative", flexShrink: 0 }}>
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Avatar
                  sx={{
                    width: 50,
                    height: 50,
                    background:
                      "linear-gradient(135deg, #0c5adb 0%, #063686 100%)",
                    color: "#fff",
                    boxShadow: "0 6px 18px rgba(12, 90, 219, 0.28)",
                  }}
                >
                  <ActivityIcon sx={{ fontSize: 24 }} />
                </Avatar>
              </motion.div>
              <Box
                sx={{
                  position: "absolute",
                  right: -2,
                  bottom: -2,
                  width: 17,
                  height: 17,
                  borderRadius: "50%",
                  backgroundColor: "#063686",
                  border: "2px solid #fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Verified sx={{ fontSize: 11, color: "#fff" }} />
              </Box>
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                  mb: 0.4,
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "#0c5adb",
                    boxShadow: "0 0 0 4px rgba(12,90,219,0.10)",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 10.5,
                    lineHeight: 1,
                    fontWeight: 800,
                    letterSpacing: "0.8px",
                    color: "#0c5adb",
                    textTransform: "uppercase",
                  }}
                >
                  Opinion activity
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: 13.5,
                  lineHeight: 1.5,
                  color: "#263238",
                  fontWeight: 500,
                }}
              >
                <Box
                  component="span"
                  sx={{ fontWeight: 800, color: "#111827" }}
                >
                  {current.name}
                </Box>{" "}
                {current.action}
              </Typography>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  mt: 0.6,
                  px: 1,
                  py: 0.35,
                  borderRadius: "6px",
                  backgroundColor: "#c6e3f4",
                  border: "1px solid rgba(12,90,219,0.16)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: "#063686",
                    lineHeight: 1.2,
                  }}
                >
                  {current.value}
                </Typography>
              </Box>
            </Box>
            <IconButton
              onClick={() => setVisible(false)}
              size="small"
              sx={{
                alignSelf: "flex-start",
                mt: -0.5,
                color: "#9AA5B1",
                "&:hover": {
                  color: "#0c5adb",
                  backgroundColor: "#c6e3f4",
                },
              }}
            >
              <Close sx={{ fontSize: 17 }} />
            </IconButton>
          </Box>
          <Box
            sx={{ height: 3, backgroundColor: "#c6e3f4", overflow: "hidden" }}
          >
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: DISPLAY_TIME / 1000, ease: "linear" }}
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #0c5adb 0%, #063686 100%)",
                borderRadius: "0 3px 3px 0",
              }}
            />
          </Box>
        </MotionPaper>
      )}
    </AnimatePresence>
  );
}
