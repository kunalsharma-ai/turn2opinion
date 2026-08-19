// "use client";
// import React from "react";
// import { useApiState } from "react-api-state";
// import {
//   IconButton,
//   Badge,
//   Popover,
//   List,
//   Tooltip,
//   ListItem,
//   ListItemText,
//   Divider,
//   Box,
//   Typography,
//   Portal,
//   Button,
//   Avatar,
// } from "@mui/material";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import CloseIcon from "@mui/icons-material/Close";
// import { useMember } from "@/Context";
// import useSharedSocket from "@/hooks/useSharedSocket";
// export default function MemberNotification() {
//   const [user] = [useMember()];
//   const notifications = useApiState("/api/v1/alerts");
//   const [notifAnchorEl, setNotifAnchorEl] = React.useState();

//   const notificationCount = notifications?.data?.length ?? 0;
//   // return notifications.loading || notifications.syncing ? (
//   //   <></>
//   // ) : (
//   return (
//     <>
//       <Tooltip title="Notifications">
//         <IconButton
//           sx={{ color: "white", mx: 1 }}
//           aria-label="Notifications"
//           onClick={(event) => setNotifAnchorEl(event.currentTarget)}
//         >
//           <Badge
//             badgeContent={notificationCount}
//             color="error"
//             overlap="circular"
//             anchorOrigin={{
//               vertical: "top",
//               horizontal: "right",
//             }}
//             sx={{
//               "& .MuiBadge-badge": {
//                 fontSize: "12px",
//                 top: -1,
//                 right: -4,
//               },
//             }}
//           >
//             <NotificationsIcon
//               sx={{ fontSize: "36px", color: "secondary.main" }}
//             />
//           </Badge>
//         </IconButton>
//       </Tooltip>

//       <NotificationDetails
//         notifAnchorEl={notifAnchorEl}
//         setNotifAnchorEl={setNotifAnchorEl}
//         notifications={notifications}
//       />
//     </>
//   );
//   // );
// }
// function groupByTitle(data) {
//   return data.sort((a, b) => {
//     const titleCompare = a.title.localeCompare(b.title);

//     if (titleCompare !== 0) {
//       return titleCompare;
//     }

//     return new Date(a.createdAt) - new Date(b.createdAt);
//   });
// }
// function NotificationDetails({
//   notifAnchorEl,
//   setNotifAnchorEl,
//   notifications,
//   title = "Notifications",
//   subtitle = null,
// }) {
//   const notificationCount = notifications.data.length ?? 0;
//   const notificationData = groupByTitle(notifications.data);
//   return (
//     <Portal>
//       <Popover
//         open={Boolean(notifAnchorEl)}
//         anchorEl={notifAnchorEl}
//         onClose={() => setNotifAnchorEl(null)}
//         anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//         transformOrigin={{ horizontal: "right", vertical: "top" }}
//         slotProps={{
//           paper: {
//             sx: {
//               width: 420,
//               maxWidth: "95vw",
//               borderRadius: 3,
//               overflow: "visible",
//               boxShadow: "0 18px 50px rgba(0,0,0,.18)",
//               mt: 0.5,
//               bgcolor: "#fafafa",
//               zIndex: 9999,
//               position: "relative",

//               "&::before": {
//                 content: '""',
//                 position: "absolute",
//                 top: -6,
//                 right: 24,
//                 width: 12,
//                 height: 12,
//                 bgcolor: "#fafafa",
//                 transform: "rotate(45deg)",
//                 boxShadow: "-3px -3px 5px rgba(0,0,0,0.04)",
//               },
//             },
//           },
//         }}
//       >
//         <Box
//           sx={{
//             px: 2,
//             py: 1.5,
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             borderBottom: "1px solid",
//             borderColor: "divider",
//             bgcolor: "white",
//             borderTopLeftRadius: "24px",
//             borderTopRightRadius: "24px",
//           }}
//         >
//           <Box>
//             <Typography fontWeight={700} fontSize={17}>
//               {title}
//             </Typography>

//             <Typography color="text.secondary" fontSize={12}>
//               {subtitle ? subtitle : `${notificationCount} unread`}
//             </Typography>
//           </Box>

//           {notificationCount > 0 && (
//             <Button size="small" sx={{ fontWeight: 700 }} onClick={() => {}}>
//               Clear all
//             </Button>
//           )}
//         </Box>

//         <List
//           disablePadding
//           sx={{
//             p: 1,
//             maxHeight: 430,
//             overflowY: "auto",

//             "&::-webkit-scrollbar": {
//               width: 6,
//             },
//             "&::-webkit-scrollbar-thumb": {
//               bgcolor: "#d0d0d0",
//               borderRadius: 20,
//             },
//           }}
//         >
//           {notificationCount ? (
//             notificationData.map((info, index) => (
//               <ListItem
//                 component={"a"}
//                 href={info.link}
//                 key={index}
//                 alignItems="flex-start"
//                 sx={{
//                   px: 2,
//                   py: 1.5,
//                   transition: ".2s",
//                   alignItems: "flex-start",

//                   "&:hover": {
//                     bgcolor: "#f5f8ff",
//                   },

//                   "&:hover .close-btn": {
//                     opacity: 1,
//                   },
//                 }}
//                 secondaryAction={
//                   <IconButton
//                     className="close-btn"
//                     size="small"
//                     sx={{
//                       opacity: 0,
//                       transition: ".2s",
//                     }}
//                     onClick={() => {
//                       notifications.delete(info._id);
//                     }}
//                   >
//                     <CloseIcon fontSize="small" />
//                   </IconButton>
//                 }
//               >
//                 <Avatar
//                   sx={{
//                     width: 42,
//                     height: 42,
//                     mr: 2,
//                     bgcolor: "primary.main",
//                     fontWeight: 700,
//                   }}
//                 >
//                   {info.title?.charAt(0)}
//                 </Avatar>

//                 <Box sx={{ flex: 1, minWidth: 0, pr: 2.5 }}>
//                   <Box
//                     display="flex"
//                     justifyContent="space-between"
//                     alignItems="center"
//                   >
//                     <Typography
//                       fontWeight={700}
//                       fontSize={14}
//                       color="primary.main"
//                     >
//                       {(info.title !== notificationData[index - 1]?.title ?? "")
//                         ? info.title
//                         : ""}
//                     </Typography>
//                   </Box>

//                   <Typography fontWeight={600} fontSize={13} mt={0.25}>
//                     {info.subtitle}
//                   </Typography>

//                   <Typography
//                     fontSize={13}
//                     color="text.secondary"
//                     mt={0.5}
//                     sx={{
//                       display: "-webkit-box",
//                       overflow: "hidden",
//                       WebkitBoxOrient: "vertical",
//                       WebkitLineClamp: 2,
//                     }}
//                   >
//                     {info?.message}
//                   </Typography>
//                   <a href={info.cta} target={info.ctaType}>
//                     more
//                   </a>
//                 </Box>
//               </ListItem>
//             ))
//           ) : (
//             <Box
//               sx={{
//                 py: 6,
//                 px: 3,
//                 textAlign: "center",
//               }}
//             >
//               <NotificationsNoneIcon
//                 sx={{
//                   fontSize: 56,
//                   color: "grey.400",
//                   mb: 1,
//                 }}
//               />

//               <Typography fontWeight={600}>You're all caught up!</Typography>

//               <Typography color="text.secondary" fontSize={13} mt={0.5}>
//                 No new notifications.
//               </Typography>
//             </Box>
//           )}
//         </List>
//       </Popover>
//     </Portal>
//   );
// }

"use client";

import React from "react";
import { useApiState } from "react-api-state";
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
  Button,
  Avatar,
  Collapse,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Popup } from "@/components/Popup";

export default function MemberNotification() {
  const notifications = useApiState("/api/v1/alerts");

  const [notifAnchorEl, setNotifAnchorEl] = React.useState(null);

  const notificationCount = notifications?.data?.length ?? 0;

  const [showNewsletter, setShowNewsletter] = React.useState(null);

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          sx={{
            color: "white",
            mx: 1,
          }}
          aria-label="Notifications"
          onClick={(event) => {
            setNotifAnchorEl(event.currentTarget);
          }}
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
            {notificationCount > 0 ? (
              <NotificationsIcon
                sx={{
                  fontSize: "36px",
                  color: "secondary.main",
                }}
              />
            ) : (
              <NotificationsNoneIcon
                sx={{
                  fontSize: "36px",
                  color: "secondary.main",
                }}
              />
            )}
          </Badge>
        </IconButton>
      </Tooltip>

      <NotificationDetails
        notifAnchorEl={notifAnchorEl}
        setNotifAnchorEl={setNotifAnchorEl}
        notifications={notifications}
        setShowNewsletter={setShowNewsletter}
      />

      <Popup
        open={Boolean(showNewsletter)}
        onClose={() => {
          setShowNewsletter(null);
        }}
        title="Newsletter"
      >
        <iframe src={showNewsletter} width="100%" height="480px" />
      </Popup>
    </>
  );
}

function groupByTitle(data = []) {
  return Object.values(
    data.reduce((groups, notification) => {
      const title = notification.title || "Other";

      if (!groups[title]) {
        groups[title] = {
          title,
          notifications: [],
        };
      }

      groups[title].notifications.push(notification);

      return groups;
    }, {}),
  ).map((group) => ({
    ...group,

    notifications: [...group.notifications].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    ),
  }));
}

function NotificationDetails({
  notifAnchorEl,
  setNotifAnchorEl,
  notifications,
  title = "Notifications",
  subtitle = null,
  setShowNewsletter,
}) {
  const notificationData = groupByTitle(notifications?.data || []);

  const notificationCount = notifications?.data?.length ?? 0;

  const [expandedGroups, setExpandedGroups] = React.useState({});

  const toggleGroup = React.useCallback((groupTitle) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupTitle]: !prev[groupTitle],
    }));
  }, []);

  const handleClose = () => {
    setNotifAnchorEl(null);
  };

  return (
    <Portal>
      <Popover
        open={Boolean(notifAnchorEl)}
        anchorEl={notifAnchorEl}
        onClose={handleClose}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        slotProps={{
          paper: {
            sx: {
              width: 420,
              maxWidth: "95vw",
              borderRadius: 3,
              overflow: "visible",
              boxShadow: "0 18px 50px rgba(0,0,0,.18)",
              mt: 0.5,
              bgcolor: "#fafafa",
              zIndex: 9999,
              position: "relative",

              "&::before": {
                content: '""',
                position: "absolute",
                top: -6,
                right: 24,
                width: 12,
                height: 12,
                bgcolor: "#fafafa",
                transform: "rotate(45deg)",
                boxShadow: "-3px -3px 5px rgba(0,0,0,0.04)",
              },
            },
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 2,
            py: 1.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid",
            borderColor: "divider",
            bgcolor: "white",
            borderTopLeftRadius: "24px",
            borderTopRightRadius: "24px",
          }}
        >
          <Box>
            <Typography fontWeight={700} fontSize={17}>
              {title}
            </Typography>

            <Typography color="text.secondary" fontSize={12}>
              {subtitle ? subtitle : `${notificationCount} unread`}
            </Typography>
          </Box>

          {notificationCount > 0 && (
            <Button
              size="small"
              sx={{
                fontWeight: 700,
              }}
              onClick={() => {}}
            >
              Clear all
            </Button>
          )}
        </Box>

        {/* Notifications */}
        <List
          disablePadding
          sx={{
            p: 1,
            maxHeight: 430,
            overflowY: "auto",

            "&::-webkit-scrollbar": {
              width: 6,
            },

            "&::-webkit-scrollbar-thumb": {
              bgcolor: "#d0d0d0",
              borderRadius: 20,
            },
          }}
        >
          {notificationCount > 0 ? (
            notificationData.map((group, index, arr) => {
              const isExpanded = Boolean(expandedGroups[group.title]);

              const latestNotification = group.notifications[0];

              return (
                <Box key={group.title}>
                  {/* Group Header */}
                  <ListItem
                    disableGutters
                    sx={{
                      px: 1.5,
                      py: 1,
                      cursor: "pointer",
                      borderRadius: 2,

                      "&:hover": {
                        bgcolor: "#f5f8ff",
                      },
                    }}
                    onClick={() => toggleGroup(group.title)}
                  >
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        mr: 1.5,
                        bgcolor: "primary.main",
                        fontWeight: 700,
                        fontSize: 14,
                      }}
                    >
                      {group.title?.charAt(0)}
                    </Avatar>

                    <ListItemText
                      sx={{
                        minWidth: 0,
                        mr: 1,
                      }}
                      primary={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.8,
                          }}
                        >
                          <Typography
                            fontWeight={700}
                            fontSize={14}
                            color="primary.main"
                          >
                            {group.title}
                          </Typography>

                          <Box
                            sx={{
                              minWidth: 21,
                              height: 21,
                              px: 0.6,
                              borderRadius: 10,
                              bgcolor: "primary.main",
                              color: "white",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 11,
                              fontWeight: 700,
                            }}
                          >
                            {group.notifications.length}
                          </Box>
                        </Box>
                      }
                      secondary={
                        isExpanded
                          ? `${group.notifications.length} notifications`
                          : latestNotification?.subtitle
                      }
                      slotProps={{
                        secondary: {
                          sx: {
                            mt: 0.25,
                            fontSize: 12,
                            color: "text.secondary",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          },
                        },
                      }}
                    />

                    <IconButton
                      size="small"
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleGroup(group.title);
                      }}
                      sx={{
                        transform: isExpanded
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform .2s ease",
                      }}
                    >
                      <KeyboardArrowDownIcon />
                    </IconButton>
                  </ListItem>

                  {/* Group Items */}
                  <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <Box
                      sx={{
                        ml: 2.5,
                        pl: 1.5,
                        borderLeft: "2px solid",
                        borderColor: "divider",
                      }}
                    >
                      {group.notifications.map((info) => (
                        <ListItem
                          key={info._id}
                          sx={{
                            px: 1.5,
                            py: 1.25,
                            borderRadius: 2,
                            alignItems: "flex-start",
                            textDecoration: "none",
                            color: "inherit",

                            "&:hover": {
                              bgcolor: "#f5f8ff",
                            },

                            "&:hover .close-btn": {
                              opacity: 1,
                            },
                          }}
                          secondaryAction={
                            <IconButton
                              className="close-btn"
                              size="small"
                              sx={{
                                opacity: 0,
                                transition: ".2s",
                                mt: 0.25,
                              }}
                              onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();

                                notifications.delete(info._id);
                              }}
                            >
                              <CloseIcon fontSize="small" />
                            </IconButton>
                          }
                        >
                          <Avatar
                            sx={{
                              width: 34,
                              height: 34,
                              mr: 1.5,
                              bgcolor: "grey.200",
                              color: "primary.main",
                              fontWeight: 700,
                              fontSize: 12,
                            }}
                          >
                            {info.title?.charAt(0)}
                          </Avatar>

                          <Box
                            sx={{
                              flex: 1,
                              minWidth: 0,
                              pr: 2.5,
                            }}
                          >
                            <Typography fontWeight={600} fontSize={13}>
                              {info.subtitle}
                            </Typography>
                            {info.message && (
                              <Typography
                                fontSize={12}
                                color="text.secondary"
                                mt={0.25}
                                sx={{
                                  display: "-webkit-box",
                                  overflow: "hidden",
                                  WebkitBoxOrient: "vertical",
                                  WebkitLineClamp: 2,
                                }}
                              >
                                {info.message}
                              </Typography>
                            )}
                            {info.cta &&
                              (info.ctaType === "popup" ? (
                                <Typography
                                  component="span"
                                  onClick={() => {
                                    setShowNewsletter(info.cta);
                                    setNotifAnchorEl(null);
                                  }}
                                  fontSize={11}
                                  color="primary.main"
                                  sx={{
                                    display: "inline-block",
                                    mt: 0.5,
                                    fontWeight: 600,
                                    cursor: "pointer",
                                  }}
                                >
                                  View
                                </Typography>
                              ) : (
                                <Typography
                                  component="a"
                                  href={info.cta}
                                  fontSize={11}
                                  color="primary.main"
                                  sx={{
                                    display: "inline-block",
                                    mt: 0.5,
                                    fontWeight: 600,
                                  }}
                                >
                                  More
                                </Typography>
                              ))}
                          </Box>
                        </ListItem>
                      ))}
                    </Box>
                  </Collapse>

                  {index < arr.length - 1 && <Divider sx={{ my: 0.5 }} />}
                </Box>
              );
            })
          ) : (
            <Box
              sx={{
                py: 6,
                px: 3,
                textAlign: "center",
              }}
            >
              <NotificationsNoneIcon
                sx={{
                  fontSize: 56,
                  color: "grey.400",
                  mb: 1,
                }}
              />

              <Typography fontWeight={600}>You're all caught up!</Typography>

              <Typography color="text.secondary" fontSize={13} mt={0.5}>
                No new notifications.
              </Typography>
            </Box>
          )}
        </List>
      </Popover>
    </Portal>
  );
}
