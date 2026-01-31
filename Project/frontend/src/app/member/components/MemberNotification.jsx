"use client";
import React from "react";
import {
  IconButton,
  Badge,
  Popover,
  List,
  Tooltip,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Typography,
  Portal,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CloseIcon from "@mui/icons-material/Close";
import { useMember } from "@/Context";
import useSharedSocket from "@/hooks/useSharedSocket";
const mockupNotifications = [
  {
    type: "Survey Update",
    title: "New health survey available",
    message:
      "A new survey on mental well-being has been added. Participate now to earn points!",
  },
  {
    type: "Profile Reminder",
    title: "Complete your profile",
    message:
      "Your professional details are 80% complete. Add more info to unlock more surveys.",
  },
  {
    type: "Reward",
    title: "You earned 150 points!",
    message: "Thanks for completing the Lifestyle Preferences survey.",
  },
  {
    type: "System Message",
    title: "Scheduled maintenance",
    message:
      "Our servers will be undergoing maintenance from 2:00 AM to 4:00 AM tonight.",
  },
  {
    type: "Survey Closing Soon",
    title: "Last chance to participate",
    message: "‘Healthcare Technology Trends 2025’ survey closes in 6 hours.",
  },
];
export default function MemberNotification() {
  const [user] = [useMember()];
  const [notifAnchorEl, setNotifAnchorEl] = React.useState();
  const [notificationMessages, setNotificationMessages] = React.useState([
    ...mockupNotifications,
  ]);
  const { messages, emit } = useSharedSocket(user);
  const notificationCount = notificationMessages.length ?? 0;
   React.useEffect(()=>{
    if(messages instanceof Array)
    setNotificationMessages(messages.filter(msg=>msg.type==="notification").map(msg=>msg.data));
  },[messages])
  if (!user) return <></>;
  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          sx={{ color: "white", mx: 1 }}
          aria-label="Notifications"
          onClick={(event) => setNotifAnchorEl(event.currentTarget)}
        >
          <Badge
            badgeContent={notificationCount}
            color="error"
            overlap="circular"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{
              "& .MuiBadge-badge": {
                fontSize: "12px",
                top: -1,
                right: -4,
              },
            }}
          >
            <NotificationsIcon sx={{ fontSize: "36px", color: "#bdbdbd" }} />
          </Badge>
        </IconButton>
      </Tooltip>
      <Portal>
        <Popover
          open={Boolean(notifAnchorEl)}
          anchorEl={notifAnchorEl}
          onClose={() => setNotifAnchorEl(null)}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          slotProps={{
            paper: {
              sx: {
                position: "relative",
                zIndex: 1600,
                transform: "none",
                bgcolor: "#ffffff",
                color: "#000000",
                boxShadow: 24,
                mt: 1.5,
                minWidth: 150,
                maxWidth: { xs: "95vw", md: 460 },
                overflow: "visible",
                p: 1,
                "::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  width: 10,
                  height: 10,
                  bgcolor: "#ffffff",
                  transform: "rotate(45deg)",
                  top: -5,
                  right: 16,
                  zIndex: 0,
                },
              },
            },
          }}
        >
          <List dense>
            {notificationCount > 0 ? (
              <>
                {notificationMessages.map((info, index) => (
                  <React.Fragment key={index}>
                    <ListItem
                      secondaryAction={
                        <Tooltip
                          title="dismiss notification"
                          componentsProps={{
                            tooltip: {
                              sx: {
                                zIndex: 99999,
                              },
                            },
                          }}
                          PopperProps={{
                            modifiers: [
                              {
                                name: "zIndex",
                                enabled: true,
                                phase: "write",
                                fn: ({ state }) => {
                                  state.styles.popper.zIndex = 99999;
                                },
                              },
                            ],
                          }}
                        >
                          <IconButton
                            onClick={() =>
                              setNotificationMessages((prev) =>
                                prev.filter((_, i) => i !== index)
                              )
                            }
                          >
                            <CloseIcon sx={{ fontSize: "16px" }} />
                          </IconButton>
                        </Tooltip>
                      }
                    >
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "bold",
                            color: "secondary.main",
                          }}
                        >
                          {info.type}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "grey",
                            fontWeight: 600,
                          }}
                        >
                          {info.title}
                        </Typography>
                        <Typography>{info.message}</Typography>
                      </Box>
                    </ListItem>
                    {index !== notificationMessages.length - 1 && (
                      <Divider sx={{ width: "100%" }} />
                    )}
                  </React.Fragment>
                ))}

                {/* <ListItem
                button="true"
                onClick={() => router.push("/member/notifications")}
              >
                <ListItemText primary="View all" />
              </ListItem> */}
              </>
            ) : (
              <ListItem>
                <Typography sx={{ px: 3 }}>No Notifications</Typography>
              </ListItem>
            )}
          </List>
        </Popover>
      </Portal>
    </>
  );
}
