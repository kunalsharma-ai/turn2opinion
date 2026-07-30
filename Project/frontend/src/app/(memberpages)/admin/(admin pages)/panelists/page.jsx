"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { api, Page } from "@/util";
import { useMember, useQuery } from "@/Context";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import {
  Grid,
  Chip,
  Box,
  IconButton,
  Avatar,
  Collapse,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import {
  Datatable,
  FlagAndCountryCode,
  Icon,
  SectionTitle,
} from "@/components";

import { Circle as CircleIcon, Close as CloseIcon } from "@mui/icons-material";

import DataList from "@/componentsMHO/DataList";
import { SideDrawer } from "@/components/Popup";
import { useToast } from "@/hooks";
import useSharedSocket from "@/hooks/useSharedSocket";

function getAge(dob) {
  if (!dob) return "";

  const birth = new Date(dob);
  const today = new Date();

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  if (today.getDate() < birth.getDate()) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
  }

  return `${years}y ${months}m`;
}

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
    api
      .post(`/api/v1/user`, {
        isActive: {
          $in: [true, false],
        },
      })
      .then((resp) => {
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
              onClick={() => { }}
              label="Disable User"
              style={{ color: "rgba(237, 89, 89, 1)", fontSize: 16 }}
              sx={{ m: 0 }}
            />
          ) : (
            <Icon
              iconClass="fa fa-circle-check"
              onClick={() => { }}
              label="Enable User"
              style={{ color: "#59AC77", fontSize: 16 }}
              sx={{ m: 0 }}
            />
          )}
        </Page.Box>
      ),
    },
    {
      id: "role",
      label: "Role",
      render: (info, i) => {
        return (
          <Chip
            size="small"
            label={info?.role}
            variant="contained"
            color={info?.role == "admin" ? "secondary" : "primary"}
            sx={{ mr: 0.5, color: "white", textTransform: "capitalize" }}
          />
        );
      },
      width: 150,
      feature: ["filterable", "sortable"],
    },
    {
      id:"createdAt",
      label:"Creation Date",
      render:info=>(new Date(info.createdAt)).toFormat()
    },
    {
      id: "category",
      label: "Category",
      render: (info, i) => {
        return (
          <Chip
            size="small"
            label={info?.category}
            variant="contained"
            color={info?.category == "b2c" ? "success" : "error"}
            sx={{ mr: 0.5, color: "white", textTransform: "uppercase" }}
          />
        );
      },
      width: 150,
      feature: ["filterable", "sortable"],
    },
    {
      id: "name",
      label: "User",
      width: 250,
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
  ];

  // return <pre>{ JSON.stringify(users, null, 2) }</pre>
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
              borderBottom: (theme) =>
                `2px solid ${theme.palette.primary.main}`,
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
        width={"100vw"}
        hideTitleBar={true}
        anchor="right"
        onClose={() => setOpen({ open: false, id: null })}
      >
        <UserData
          userId={open.id}
          onClose={() => {
            setOpen({ open: false, id: null });
            setReload((reload + 1) % 10);
          }}
        />
      </SideDrawer>
    </Page.Box>
  );
}
function useCustomState(defaultValue) {
  const [state, setState] = React.useState(defaultValue);
  // const update = (val) => {
  //   setState({ ...defaultValue, ...val, update })
  // }
  // React.useEffect(() => {
  //   setState({
  //     ...defaultValue,
  //     update
  //   })
  // }, [defaultValue])
  return {
    ...state,
    update: (newData) => {
      setState({ ...state, ...newData });
    },
  };
}

function UserData({ userId, onClose }) {
  // const [user, setUser] = React.useState({});
  const user = useCustomState({});
  const [loading, setLoading] = React.useState(true);
  const [showProfiles, setShowProfiles] = React.useState(false);
  const [reload, setReload] = React.useState(false);
  const me = useMember();
  const router = useRouter();

  React.useEffect(() => {
    if (!userId) return;
    setLoading(true);
    api.get(`/api/v1/user/${userId}`).then((resp) => {
      setLoading(false);
      user.update(resp.data);
    });
  }, [userId, reload]);
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
        title={
          <div className="profile-details">
            <span style={{ color: "#063686", marginRight: "5px" }}>
              {user?.fullName}{" "}
            </span>
            {showProfiles && (
              <>
                {`- ${[user?.gender, getAge(user?.dob)].filter(Boolean).join(" - ")}`}
                {user?.country && (
                  <>
                    {" - "}
                    <FlagAndCountryCode
                      cn={user?.country}
                      showLabel={false}
                      title={user?.country}
                    />
                  </>
                )}
              </>
            )}
          </div>
        }
        sx={{ justifyContent: "space-between" }}
      >
        <IconButton onClick={onClose} color="secondary">
          <CloseIcon />
        </IconButton>
      </SectionTitle>
      {loading ? (
        <></>
      ) : (
        <Grid container size={12} spacing={0}>
          <Grid
            size={12}
            container
            justifyContent="flex-end"
            spacing={2}
            mr={3}
          >
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
                useToast(resp);
                me.Reload();
                onClose();
                router.refresh();
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
              onClick={async (e) => {
                let resp = await api.delete(`/api/v1/user/terms`, {
                  _id: user._id,
                });
                useToast(resp);
                setReload(!reload);
              }}
              startIcon={
                <i
                  className="fa-solid fa-trash-can"
                  style={{ fontSize: "14px" }}
                />
              }
            >
              Delete Terms Accepted
            </Page.MuiButton>
            <Page.MuiButton
              variant="contained"
              color="error"
              sx={{ fontWeight: 600 }}
              onClick={async (e) => {
                let resp = await api.post(`/api/v1/user/refresh`, {
                  user: user._id,
                });
                useToast(resp);
                setReload(!reload);
              }}
              startIcon={
                <i
                  className="fa-solid fa-trash-can"
                  style={{ fontSize: "14px" }}
                />
              }
            >
              Clear Data
            </Page.MuiButton>
            <Page.MuiButton
              variant="outlined"
              color={user?.isActive ? "error" : "success"}
              sx={{ borderWidth: 2, fontWeight: 600 }}
              onClick={async (e) => {
                let resp = await api.put(`/api/v1/user/${user._id}`, {
                  isActive: !Boolean(user?.isActive),
                });
                useToast(resp);
                setReload(!reload);
              }}
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
              {user?.isActive ? "Disabled" : "Enabled"}
            </Page.MuiButton>
            <Page.MuiButton
              variant="outlined"
              color={
                ["admin", "superadmin", "root"].includes(user?.role)
                  ? "error"
                  : "success"
              }
              sx={{ borderWidth: 2, fontWeight: 600 }}
              onClick={async (e) => {
                let resp = await api.put(`/api/v1/user/${user._id}`, {
                  role: ["admin", "superadmin", "root"].includes(user?.role)
                    ? "respondent"
                    : "admin",
                });
                useToast(resp);
                setReload(!reload);
              }}
            >
              {/* {user?.role} */}
              {["admin", "superadmin", "root"].includes(user?.role)
                ? "Admin"
                : "Respondent"}
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
                  borderBottom: (theme) =>
                    `2px solid ${theme.palette.primary.main}`,

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
                  borderBottom: (theme) =>
                    `2px solid ${theme.palette.primary.main}`,

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
                      <Page.Box
                        width="50%"
                        key={index}
                        my={0.5}
                        fontWeight={500}
                      >
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
      )}
    </Grid>
  );
}

function ProfilesData({ user }) {
  const [profiles, setProfiles] = React.useState();
  const [selectedProfile, setSelectedProfile] = React.useState("");
  const [questionBank, setQuestionBank] = React.useState();
  const [dataList, setDataList] = React.useState([]);
  const [openData, setOpenData] = React.useState(true);

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

    api
      .post(`/api/v1/user/${user.id}/profile-data`, { questions: questions })
      .then((resp) => {
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
        })),
    );
  }, [questionBank, user]);

  React.useEffect(() => {
    if (profiles && profiles.length > 0 && !selectedProfile) {
      setSelectedProfile(profiles[0]);
    }
  }, [profiles]);

  if (!tabs) return;

  const values = Object.values(dataList || []);

  const noAnswers = values.every(
    (d) =>
      !d?.answer ||
      (Array.isArray(d.answer) && d.answer.length === 0) ||
      d.answer === "",
  );
  return (
    <Grid size={12} px={2} mt={3}>
      <Grid
        size={12}
        container
        sx={{ border: "1px solid #cecece", overflowX: "auto" }}
      >
        <Box sx={{ overflowX: "auto", width: { xs: "100%", md: 280 } }}>
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
              flexDirection: "column",

              "& .MuiToggleButton-root": {
                textTransform: "capitalize",
                fontWeight: 600,
                fontSize: 13,
                px: 2,
                py: 0.5,
                borderRadius: 0,
                color: "secondary.main",
                borderColor: "secondary.main",
              },
              "& .Mui-selected": {
                backgroundColor: (theme) =>
                  theme.palette.primary.main + " !important",
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
        </Box>
        <Collapse
          in={openData}
          timeout="auto"
          sx={{ flex: 1, p: 3 }}
          unmountOnExit
        >
          <Grid size={12} container spacing={1}>
            {noAnswers ? (
              <Grid
                size={12}
                container
                justifyContent="center"
                alignItems="center"
                height={400}
              >
                No Profile Data
              </Grid>
            ) : (
              values.map((d, i) => (
                <Grid
                  key={i}
                  size={{ xs: 12, md: 6 }}
                  container
                  direction="column"
                  spacing={0}
                  mb={1}
                  sx={{
                    borderBottom: "1px solid #D9D9D9",
                  }}
                >
                  <Page.Text
                    fontWeight={600}
                    fontSize={16}
                    color="secondary.main"
                  >
                    {d.label}
                  </Page.Text>
                  <Page.Text>
                    {Array.isArray(d.answer) ? d.answer.join(", ") : d.answer}
                  </Page.Text>
                </Grid>
              ))
            )}
          </Grid>
        </Collapse>
      </Grid>
    </Grid>
  );
}
