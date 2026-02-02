"use client";
import React from "react";

import { Datatable, Icon, SectionTitle } from "@/components";

import { api, Page } from "@/util";
import { useMember, useQuery } from "@/Context";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import CircleIcon from "@mui/icons-material/Circle";

import {
  Grid,
  Chip,
  IconButton,
  Avatar,
  Collapse,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { SideDrawer } from "@/components/Popup";
import DataList from "@/componentsMHO/DataList";
import { useToast } from "@/hooks";
import useSharedSocket from "@/hooks/useSharedSocket";

export default function () {
  const me = useMember();
  const [activeUsers, setActiveUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [users, setUsers] = React.useState([]);
  const [open, setOpen] = React.useState({ open: false, id: null });
  const [reload, setReload] = React.useState(0);
  const { messages, emit } = useSharedSocket(me);

  React.useEffect(() => {
    switch (messages.type) {
      case "online users":
        let temp = new Set(messages.data.map((mail) => mail.split(":")[0]));
        setActiveUsers(Array.from(temp));
        break;
      case "connected":
        emit("who", {});
        break;
      default:
        break;
    }
  }, [messages]);
  React.useEffect(() => {
    setIsLoading(true);
    api.get(`/api/v1/user`).then((resp) => {
      setUsers(resp.data);
      setIsLoading(false);
    });
  }, [reload]);

  const columns = [
    {
      id: "actions",
      label: "Actions",
      width: "150px",
      align: "center",
      render: (info) => (
        <Page.Box
          display="flex"
          alignItems="center"
          gap={2}
          mx={1}
          justifyContent="center"
        >
          <Icon
            iconClass="fa fa-user"
            onClick={() => {
              setOpen({ open: true, id: info._id });
            }}
            style={{ color: "#035f87", fontSize: 16 }}
            sx={{ m: 0 }}
            label="User Details"
          />
          {info.isActive ? (
            <Icon
              iconClass="fa fa-ban"
              onClick={() => {}}
              label="Disable User"
              style={{ color: "rgba(237, 89, 89, 1)", fontSize: 16 }}
              sx={{ m: 0 }}
            />
          ) : (
            <Icon
              iconClass="fa fa-circle-check"
              onClick={() => {}}
              label="Enable User"
              style={{ color: "#59AC77", fontSize: 16 }}
              sx={{ m: 0 }}
            />
          )}
        </Page.Box>
      ),
    },
    {
      id: "name",
      label: "User",
      render: (info) => (
        <Page.Box display="flex" alignItems="center" gap={1}>
          <Avatar
            sx={{ height: 25, width: 25 }}
            src={info.profilePicture}
            alt="user photo"
          />{" "}
          <Page.Text
            sx={{
              fontSize: 13,
              fontWeight: 500,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {info.fullName}
          </Page.Text>
          {activeUsers.includes(info.mail) ? (
            <CircleIcon sx={{ fontSize: 10, color: "#4dbf0b" }} />
          ) : (
            <CircleIcon sx={{ fontSize: 10, color: "red" }} />
          )}
        </Page.Box>
      ),
    },
    {
      id: "category",
      label: "Category",
      data: "category",
      feature: ["filterable"],
    },
    {
      id: "email",
      label: "Email",
      data: "mail",
      feature: ["searchable"],
      width: 280,
    },
    {
      id: "phone",
      label: "Phone Number",
      render: (info) => `+${info.phone}`,
      feature: ["searchable"],
      width: 150,
    },
    // {
    //   id: "status",
    //   label: "Status",
    //   render: (info) => (
    //     <div className="flex-apart">
    //       {info?.isVerified?.email === "verified" ? "✓" : "❌"}
    //       <a
    //         className="button"
    //         onClick={async (e) => {
    //           let resp = await api.delete(`/api/v1/user/terms`, {
    //             _id: info._id,
    //           });
    //           useToast(resp);
    //           setReload(!reload);
    //         }}
    //       >
    //         {info?.terms?.length}
    //       </a>

    //       <a href={`/admin/panelists/open?user=${info._id}`}>Open</a>
    //       <a
    //         className="button"
    //         onClick={async (e) => {
    //           let resp = await api.post(`/api/v1/user/autologin`, {
    //             _id: info._id,
    //           });
    //           if (!resp.token) return useToast(resp);
    //           setReload(!reload);
    //           localStorage.setItem("token", resp.token);
    //         }}
    //       >
    //         Login
    //       </a>
    //       <a
    //         className="button"
    //         onClick={async (e) => {
    //           let resp = await api.post(`/api/v1/user/refresh`, {
    //             _id: info._id,
    //           });
    //           if (!resp.token) return useToast(resp);
    //           setReload(!reload);
    //           localStorage.setItem("token", resp.token);
    //         }}
    //       >
    //         Clear History
    //       </a>
    //     </div>
    //   ),
    // },
  ];

  return (
    <Page.Box
      sx={{
        bgcolor: (theme) => theme.palette.page.main,
        p: { xs: 2, md: 3 },
      }}
    >
      <Datatable
        columns={columns}
        data={users}
        isLoading={isLoading}
        pagination={[10, 20, 50, 100]}
        pageSize={10}
        hideColumnSelector
        hideDownload
        noDataMsg="No Record Found."
        title={
          <Page.Text
            sx={{
              fontSize: "18px",
              display: "inline-block",
              fontWeight: "600",
           borderBottom:(theme)=> `2px solid ${theme.palette.primary.main}`,
              pb: 0.5,
              my: 1,
            }}
          >
            Users List
          </Page.Text>
        }
      />
      <SideDrawer
        open={open.open}
        hideTitleBar={true}
        anchor="right"
        onClose={() => setOpen({ open: false, id: null })}
      >
        <UserData
          userId={open.id}
          onClose={() => setOpen({ open: false, id: null })}
        />
      </SideDrawer>
    </Page.Box>
  );
}

function UserData({ userId, onClose }) {
  const [user, setUser] = React.useState({});
  const [showProfiles, setShowProfiles] = React.useState(false);
  const me = useMember();
  React.useEffect(() => {
    if (!userId) return;
    api.get(`/api/v1/user/${userId}`).then((resp) => setUser(resp.data));
  }, [userId]);

  const userData = [
    {
      label: "Name",
      value: user?.fullName,
    },
    { label: "Respondent ID", value: user?.respondentID },
    { label: "Email", value: user?.mail },
    { label: "Phone", value: `+${user?.phone}` },
    { label: "Category", value: user?.category },
    { label: "Gender", value: user?.gender },
    {
      label: "Verification",
      value: (
        <Page.Box component="span" display="flex" alignItems="center" gap={1}>
          <Chip
            size="small"
            label="Email"
            color={user?.isVerified?.email === "verified" ? "success" : "error"}
            variant="contained"
            sx={{ fontWeight: 600 }}
          />
          <Chip
            label="Phone"
            size="small"
            color={user?.isVerified?.phone === "verified" ? "success" : "error"}
            variant="contained"
            sx={{ fontWeight: 600 }}
          />
          <Chip
            label="Video"
            size="small"
            color={user?.isVerified?.video === "verified" ? "success" : "error"}
            variant="contained"
            sx={{ fontWeight: 600 }}
          />
          <Chip
            label="In-Person"
            size="small"
            color={
              user?.isVerified?.inPersonVisit === "verified"
                ? "success"
                : "error"
            }
            variant="contained"
            sx={{ fontWeight: 600 }}
          />
        </Page.Box>
      ),
    },
    { label: "Date of Birth", value: new Date(user?.dob).showDate() },
    { label: "Created on", value: new Date(user?.createdAt).showDate() },
    {
      label: "Consent",
      value: (
        <Page.Box component="span" display="flex" alignItems="center" gap={1}>
          <Chip
            size="small"
            label="Video"
            color={user?.consent?.canShareVideo ? "success" : "error"}
            variant="contained"
            sx={{ fontWeight: 600 }}
          />
          <Chip
            label="GPS"
            size="small"
            color={user?.consent?.canShareGPS ? "success" : "error"}
            variant="contained"
            sx={{ fontWeight: 600 }}
          />
          <Chip
            label="Notification"
            size="small"
            color={
              user?.consent?.canAcceptPushNotification ? "success" : "error"
            }
            variant="contained"
            sx={{ fontWeight: 600 }}
          />
        </Page.Box>
      ),
    },
    { label: "Quality Score", value: `${user?.qualityScore}/200` },
    { label: "Country", value: user?.address?.[0]?.country },
  ];

  const socialIcons = {
    facebook: (
      <Icon
        disabled={true}
        iconClass="fa-brands fa-square-facebook"
        style={{ color: "#3b5998", fontSize: 16 }}
      />
    ),
    whatsapp: (
      <Icon
        disabled={true}
        iconClass="fa-brands fa-whatsapp"
        style={{ color: "#25D366", fontSize: 16 }}
      />
    ),
    linkedin: (
      <Icon
        disabled={true}
        iconClass="fa-brands fa-square-linkedin"
        style={{ color: "#0e76a8", fontSize: 16 }}
      />
    ),
    instagram: (
      <Icon
        disabled={true}
        iconClass="fa-brands fa-instagram"
        style={{ color: "#C13584", fontSize: 16 }}
      />
    ),
    twitter: (
      <Icon
        disabled={true}
        iconClass="fa-brands fa-square-x-twitter"
        style={{ color: "black", fontSize: 16 }}
      />
    ),
    youtube: (
      <Icon
        disabled={true}
        iconClass="fa-brands fa-youtube"
        style={{ color: "#FF0000", fontSize: 16 }}
      />
    ),
  };

  return (
    <Grid
      container
      spacing={2}
      size={12}
      sx={{
        bgcolor: "white",
        overflow: "hidden",
        borderRadius: "10px",
        boxShadow: 1,
        pb: 2,
        alignSelf: "flex-start",
      }}
    >
      <SectionTitle
        title={user?.fullName}
        sx={{ justifyContent: "space-between" }}
      >
        <IconButton onClick={onClose} color="secondary">
          <CloseIcon />
        </IconButton>
      </SectionTitle>

      <Grid container size={12} spacing={0}>
        <Grid size={12} container justifyContent="flex-end" spacing={2} mr={3}>
          <Page.MuiButton
            variant="contained"
            onClick={() => {
              setShowProfiles(!showProfiles);
            }}
            color="secondary"
            sx={{ fontWeight: 600, color: "white" }}
            startIcon={
              <i className="fa-solid fa-users" style={{ fontSize: "14px" }} />
            }
          >
            {showProfiles ? "Hide Profiles" : "Profiles"}
          </Page.MuiButton>
          <Page.MuiButton
            variant="contained"
            onClick={async (e) => {
              let resp = await api.post(`/api/v1/user/autologin`, {
                _id: userId,
              });
              localStorage.setItem("token", resp.token);
              useToast(resp);
              me.Reload();
              onClose();
            }}
            color="info"
            sx={{ fontWeight: 600, color: "white" }}
            startIcon={
              <i className="fa-solid fa-user" style={{ fontSize: "14px" }} />
            }
          >
            Login As User
          </Page.MuiButton>
          <Page.MuiButton
            variant="contained"
            color="error"
            sx={{ fontWeight: 600 }}
            startIcon={
              <i
                className="fa-solid fa-trash-can"
                style={{ fontSize: "14px" }}
              />
            }
          >
            Delete
          </Page.MuiButton>
          <Page.MuiButton
            variant="outlined"
            color={user?.isActive ? "error" : "success"}
            sx={{ borderWidth: 2, fontWeight: 600 }}
            startIcon={
              user?.isActive ? (
                <i className="fa-solid fa-ban" style={{ fontSize: "14px" }} />
              ) : (
                <i
                  className="fa-solid fa-circle-check"
                  style={{ fontSize: "14px" }}
                />
              )
            }
          >
            {user?.isActive ? "Disable" : "Enable"}
          </Page.MuiButton>
        </Grid>
        <Collapse
          in={showProfiles}
          timeout="auto"
          unmountOnExit
          sx={{ width: "100%" }}
        >
          <ProfilesData user={user} />
        </Collapse>

        <Collapse
          in={!showProfiles}
          unmountOnExit
          timeout="auto"
          sx={{ width: "100%" }}
        >
          <Grid size={12}>
            <DataList dataList={userData} />
          </Grid>
          <Grid size={12} px={2} ml={3}>
            <Page.Text
              sx={{
                display: "inline-block",
                fontWeight: "600",
                borderBottom:(theme)=> `2px solid ${theme.palette.primary.main}`,

                pb: 0.5,
                my: 1,
              }}
            >
              Accepted Terms
            </Page.Text>
            <Grid size={12} container>
              {(!Array.isArray(user?.terms) || user?.terms.length === 0) && (
                <Page.Text fontSize={13}>No Terms Accepted</Page.Text>
              )}
              {user?.terms?.map((term, index) => {
                return (
                  <Page.Box width="50%" key={index} my={0.5} fontWeight={500}>
                    <Icon
                      disabled={true}
                      iconClass="fa-regular fa-check-circle"
                      style={{ color: "#124d86", fontSize: 16 }}
                    />{" "}
                    {term}
                  </Page.Box>
                );
              })}
            </Grid>
          </Grid>
          <Grid size={12} px={2} ml={3} mt={2}>
            <Page.Text
              sx={{
                display: "inline-block",
                fontWeight: "600",
                borderBottom:(theme)=> `2px solid ${theme.palette.primary.main}`,

                pb: 0.5,
                my: 1,
              }}
            >
              Contacts
            </Page.Text>
            <Grid size={12} container>
              {(!Array.isArray(user?.socials) ||
                user?.socials.length === 0) && (
                <Page.Text fontSize={13}>No Socials Added</Page.Text>
              )}
              {user?.socials?.map((social, index) => {
                return (
                  social?.account && (
                    <Page.Box width="50%" key={index} my={0.5} fontWeight={500}>
                      {socialIcons[social?.channel]}
                      {social?.account}
                    </Page.Box>
                  )
                );
              })}
            </Grid>
          </Grid>
        </Collapse>
      </Grid>
    </Grid>
  );
}

function ProfilesData({ user }) {
  const [profiles, setProfiles] = React.useState();
  const [selectedProfile, setSelectedProfile] = React.useState("");
  const [questionBank, setQuestionBank] = React.useState();
  const [dataList, setDataList] = React.useState([]);
  const [openData, setOpenData] = React.useState(true);

  console.log(user);

  React.useEffect(() => {
    if (!user) return;
    api
      .post("/api/v1/profile", {
        category: user.category,
      })
      .then((resp) => {
        setProfiles(resp.data);
      });
  }, [user]);

  React.useEffect(() => {
    if (
      !selectedProfile?.pages ||
      !(selectedProfile.pages instanceof Array) ||
      selectedProfile.pages.length === 0
    )
      return;

    setOpenData(false);
    setTimeout(() => setOpenData(true), 100);

    const firstPage = [...selectedProfile.pages[0]];
    const label = firstPage.shift();
    const questions = firstPage;

    api.post(`/api/v1/question`, { name: { $in: questions } }).then((resp) => {
      if (!Array.isArray(resp.data) || resp.data.length === 0) return;
      const profileQuestions = resp.data.reduce((a, c) => {
        a[c.name] = {
          label: c.label,
          name: c.name,
          type: c.type,
          options: c.options ?? [],
          parent: c.parent,
          size: c.size,
          required: c.required,
          disabled: c.disabled,
        };

        if (c.name === "dob") {
          let today = new Date();
          a["dob"]["dateRange"] = [
            `${today.getFullYear() - 120}-01-01`,
            `${today.getFullYear() - 15}-01-01`,
          ];
        }

        return a;
      }, {});

      setQuestionBank(profileQuestions);
    });
    api.post("/api/v1/me", { questions: questions }).then((resp) => {
      if ("update" in user) user.update(resp.data);
      else console.log("unable to update user");
    });
  }, [selectedProfile]);

  const tabs = React.useMemo(() => {
    if (!profiles || profiles.length === 0) return [];
    return profiles.map((p) => ({
      label: p.name,
      icon: p.icon,
      link: p.slug,
    }));
  }, [profiles]);

  React.useEffect(() => {
    if (!user || !questionBank) return;
    setDataList(
      Object.values(questionBank)
        .filter((q) => user[q.name])
        .map((q) => ({
          ...q,
          answer: user[q.name],
        }))
    );
  }, [questionBank, user]);

  React.useEffect(() => {
    if (profiles && profiles.length > 0 && !selectedProfile) {
      setSelectedProfile(profiles[0]);
    }
  }, [profiles]);

  if (!tabs) return;
  return (
    <Grid size={12} px={2} mt={3}>
      <Grid size={12} sx={{ border: "1px solid #cecece" }}>
        <ToggleButtonGroup
          variant="contained"
          value={selectedProfile?.slug || ""}
          exclusive
          color="secondary"
          fullWidth
          onChange={(e, value) => {
            if (!value) return;
            setSelectedProfile(profiles.find((p) => p.slug === value));
          }}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            flexWrap: "nowrap",

            "& .MuiToggleButton-root": {
              textTransform: "capitalize",
              fontWeight: 600,
              fontSize: 13,
              px: 2,
              py: 0.5,
              color: "secondary.main",
              borderColor: "secondary.main",
            },
            "& .Mui-selected": {
              backgroundColor: (theme) => theme.palette.primary.main + " !important",
              color: "#fff !important",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            },
          }}
        >
          {tabs.map((tab, i) => (
            <ToggleButton
              variant="contained"
              key={tab.link}
              value={tab.link}
              size="small"
              color="secondary"
            >
              {tab.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Collapse
          in={openData}
          timeout="auto"
          sx={{ width: "100%", p: 3 }}
          unmountOnExit
        >
          {Object.values(dataList).map((d, i) => {
            if (Array.isArray(d.answer) && d.answer.length === 0) return null;

            return (
              <Grid
                key={i}
                size={12}
                container
                direction="column"
                spacing={0}
                mb={1.5}
              >
                <Page.Text fontWeight={600} fontSize={16}>
                  {d.label}
                </Page.Text>
                <Page.Text>{d.answer}</Page.Text>
              </Grid>
            );
          })}
        </Collapse>
      </Grid>
    </Grid>
  );
}
