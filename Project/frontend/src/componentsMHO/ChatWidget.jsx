"use client";
import React from "react";
import {
  Box,
  Fab,
  Paper,
  Typography,
  TextField,
  IconButton,
  Badge,
} from "@mui/material";
import { usePathname } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import CheckIcon from "@mui/icons-material/Check";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { motion, AnimatePresence } from "framer-motion";

const MotionPaper = motion.create(Paper);
const MotionBox = motion.create(Box);
const MotionFab = motion.create(Fab);

const formatTime = (date) =>
  new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

const dummyMessages = [
  {
    id: 1,
    text: "Hello! How can I help you?",
    sender: "bot",
    name: "Support",
    timestamp: Date.now() - 60000,
  },
  {
    id: 2,
    text: "I need some info about your services.",
    sender: "me",
    name: "You",
    timestamp: Date.now() - 30000,
  },
  {
    id: 3,
    text: "Sure, what would you like to know?",
    sender: "bot",
    name: "Support",
    timestamp: Date.now(),
  },
];

const chatVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9,
    transformOrigin: "bottom right",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: "easeOut",
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.92,
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
    },
  },
};

const messageVariants = {
  hidden: (isMe) => ({
    opacity: 0,
    x: isMe ? 20 : -20,
    y: 8,
    scale: 0.96,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.22,
      ease: "easeOut",
    },
  },
};

const MAX_ANIMATED_MESSAGES = 10;

export default function ChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState(dummyMessages);
  const [input, setInput] = React.useState("");
  const messagesEndRef = React.useRef(null);
  const pathname = usePathname();
  const isSurveyPage = pathname.startsWith("/survey");

  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  React.useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages, open]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: input,
        sender: "me",
        name: "You",
        timestamp: Date.now(),
      },
    ]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "This is a demo reply.",
          sender: "bot",
          name: "Support",
          timestamp: Date.now(),
        },
      ]);
    }, 800);
  };

  if (isSurveyPage) return null;

  return (
    <>
      <MotionFab
        color="primary"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
        transition={{
          duration: 0.45,
          ease: [0.34, 1.56, 0.64, 1],
        }}
        onClick={() => setOpen((prev) => !prev)}
        sx={{
          height: 48,
          width: 48,
          position: "fixed",
          bottom: 15,
          right: 15,
          zIndex: 1300,
          color: "white",
          fontSize: 30,
        }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CloseIcon />
            </motion.div>
          ) : (
            <motion.div
              key="support"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Badge badgeContent={1} color="error">
                <SupportAgentIcon sx={{ fontSize: 30 }} />
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>
      </MotionFab>

      <AnimatePresence>
        {open && (
          <MotionPaper
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            elevation={10}
            sx={{
              position: "fixed",
              bottom: 90,
              right: 20,
              width: { xs: "95vw", sm: 380, md: 420 },
              height: "calc(100vh - 200px)",
              display: "flex",
              flexDirection: "column",
              borderRadius: 4,
              overflow: "hidden",
              zIndex: 1300,
            }}
          >
            <Box
              sx={{
                px: 2,
                py: 1,
                bgcolor: "secondary.dark",
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography fontWeight={700}>Support Chat</Typography>
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon sx={{ color: "white" }} />
              </IconButton>
            </Box>

            <MotionBox
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              sx={{
                flex: 1,
                p: 2,
                overflowY: "auto",
                bgcolor: "#f5f5f5",
              }}
            >
              <Box>
                {messages.map((msg, index) => {
                  const isMe = msg.sender === "me";
                  const isRecent =
                    index >= messages.length - MAX_ANIMATED_MESSAGES;

                  return (
                    <MotionBox
                      key={msg.id}
                      custom={isMe}
                      variants={isRecent ? messageVariants : undefined}
                      initial={isRecent ? "hidden" : false}
                      animate={isRecent ? "visible" : false}
                      exit={{
                        opacity: 0,
                        scale: 0.8,
                        transition: { duration: 0.15 },
                      }}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: isMe ? "flex-end" : "flex-start",
                        mb: 2,
                      }}
                    >
                      <MotionBox
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.15 }}
                        sx={{
                          px: 2,
                          py: 1.2,
                          maxWidth: "75%",
                          borderRadius: 3,
                          bgcolor: isMe ? "primary.main" : "grey.300",
                          color: isMe ? "white" : "black",
                          boxShadow: 2,
                        }}
                      >
                        {!isMe && (
                          <Typography
                            variant="caption"
                            sx={{
                              display: "block",
                              fontWeight: 700,
                              mb: 0.5,
                            }}
                          >
                            {msg.name}
                          </Typography>
                        )}
                        <Typography variant="body2">{msg.text}</Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            gap: 0.5,
                            mt: 0.8,
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              fontSize: 10,
                              fontWeight: 600,
                              lineHeight: 1,
                            }}
                          >
                            {formatTime(msg.timestamp)}
                          </Typography>
                          {isMe && (
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <CheckIcon sx={{ fontSize: 14 }} />
                              <DoneAllIcon sx={{ fontSize: 14 }} />
                              <DoneAllIcon
                                sx={{
                                  fontSize: 15,
                                  color: "#4FC3F7",
                                  filter:
                                    "drop-shadow(0 0 1px rgba(0,0,0,.35))",
                                }}
                              />
                            </Box>
                          )}
                        </Box>
                      </MotionBox>
                    </MotionBox>
                  );
                })}
              </Box>
              <div ref={messagesEndRef} />
            </MotionBox>

            <MotionBox
              variants={itemVariants}
              sx={{
                p: 1,
                display: "flex",
                gap: 1,
                borderTop: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
              }}
            >
              <TextField
                fullWidth
                size="small"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 4,
                    bgcolor: "background.paper",
                    "& fieldset": {
                      borderColor: "divider",
                    },
                    "&:hover fieldset": {
                      borderColor: "divider",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "secondary.main",
                      borderWidth: 2,
                    },
                  },
                }}
              />
              <IconButton color="primary" onClick={handleSend}>
                <SendIcon />
              </IconButton>
            </MotionBox>
          </MotionPaper>
        )}
      </AnimatePresence>
    </>
  );
}
