"use client";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Datatable, Form, Icon, SectionTitle } from "@/components";
import { Page, api, loadData } from "@/util";

import { Grid, Tabs, Tab, Fade, IconButton, Button, Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useToast } from "@/hooks";
import { SideDrawer } from "@/components/Popup";
import PopUp from "@/componentsMHO/PopUp";
import iconList from "../../components/icons.js";

function TabPanel({ children, value, index }) {
  return (
    <Fade in={value === index} timeout={1000} unmountOnExit>
      <Page.Box
        hidden={value !== index}
        sx={{ width: "100%", bgcolor: "white", mb: { xs: 1, md: 2 } }}
      >
        {value === index && children}
      </Page.Box>
    </Fade>
  );
}
export default function () {
  const [activeTab, setActiveTab] = React.useState(0);
  const tabs = [
    {
      label: "Manage Reward Requests",
      render: <ManageReward />,
    },
    {
      label: "Edit Socials",
      render: <EditSocials />,
    },
  ];

  return (
    <Grid
      size={12}
      container
      px={{ xs: 1, md: 2 }}
      pt={{ xs: 1, md: 2 }}
      justifyContent="center"
      sx={{ bgcolor: (theme) => theme.palette.page.main }}
    >
      <Tabs
        value={activeTab}
        onChange={(e, v) => {
          setActiveTab(v);
        }}
        variant="fullWidth"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          width: "100%",
          bgcolor: "white",
          borderBottom: "3px solid whitesmoke",
          "& .MuiTabs-indicator": {
            backgroundColor: "secondary.main",
            height: "3px",
          },
          "& .MuiTab-root": {
            color: "gray",
            fontSize: { xs: 14, md: 16 },
            fontWeight: 500,
          },
          "& .Mui-selected": {
            color: "secondary.main",

            fontWeight: 600,
          },
        }}
      >
        {tabs.map((tab) => (
          <Tab label={tab.label} key={tab.label} />
        ))}
      </Tabs>
      {tabs.map((tab, index) => (
        <TabPanel key={tab.label} value={activeTab} index={index}>
          {tab.render}
        </TabPanel>
      ))}
    </Grid>
  );
}

function EditSocials() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [socials, setSocials] = React.useState([]);
  const [open, setOpen] = React.useState({ open: false, id: null });

  React.useEffect(() => {
    const fetchSocials = async () => {
      try {
        setIsLoading(true);
        const resp = await api.post(`/api/v1/socials`, {
          isActive: { $in: [true, false] },
        });
        setSocials(resp.data);
      } catch (err) {
        console.error("Failed to fetch socials:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSocials();
  }, [open?.open]);

  return (
    <Page.Box
      sx={{
        bgcolor: (theme) => theme.palette.page.main,
        px: 1,
      }}
    >
      <Datatable
        columns={[
          {
            id: "platform",
            label: "Platform Name",
            render: (info) => (
              <>
                <span
                  className={`fa-brands ${info.icon}`}
                  style={info.iconspecs}
                />{" "}
                {info.platform}
              </>
            ),
            feature: ["searchable", "sortable"],
          },
          {
            id: "url",
            label: "URL",
            data: "url",
            feature: ["searchable"],
          },
          {
            id: "points",
            label: "Points on Completion",
            data: "points",
            feature: ["searchable", "sortable"],
          },
          {
            id: "action",
            label: "Action",
            render: (info) => (
              <IconButton
                sx={{ p: 0 }}
                onClick={() => {
                  setOpen({ open: true, id: info._id });
                }}
              >
                <EditIcon fontSize="small" color="secondary" />
              </IconButton>
            ),
          },
        ]}
        data={socials}
        isLoading={isLoading}
        pagination={[10, 20, 50, 100]}
        pageSize={10}
        hideColumnSelector
        hideDownload
        noDataMsg="No Record Found."
        add={() => {
          setOpen({ open: true, id: null });
        }}
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
            Socials List
          </Page.Text>
        }
      />
      <SideDrawer
        open={open.open}
        hideTitleBar={true}
        onClose={() => setOpen({ open: false, id: null })}
      >
        <CreateOrEditSocials
          socialID={open.id}
          socails={socials}
          onClose={() => {
            setOpen({ open: false, id: null });
          }}
        />
      </SideDrawer>
    </Page.Box>
  );
}

function CreateOrEditSocials({ socialID = null, onClose, socials }) {
  const [content, setContent] = React.useState([]);
  const form = useForm({
    defaultValues: {
      platform: "",
      url: "",
      icon: "",
      iconspecs: {
        color: "#000000",
      },
      points: 50,
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  React.useEffect(() => {
    if (!socialID) return;
    api.get(`/api/v1/socials/${socialID}`).then((resp) => {
      if (resp.status === "success") {
        form.reset(resp.data);
      }
    });
  }, [socialID]);
  const onSubmit = async (data) => {
    // setContent((prev) => [...prev, data]);
    if (!data._id) {
      useToast(await api.put(`/api/v1/socials`, data));
    } else {
      useToast(await api.put(`/api/v1/socials/${data._id}`, data));
    }
    form.reset();
    onClose();
  };

  return (
    <Grid
      component="form"
      onSubmit={handleSubmit(onSubmit)}
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
        title={socialID ? "Edit Social" : "Create Social"}
        sx={{ justifyContent: "space-between" }}
      >
        <IconButton onClick={onClose} sx={{ color: "secondary.main" }}>
          <CloseIcon />
        </IconButton>
      </SectionTitle>

      <Grid container size={12} spacing={1.4} sx={{ px: 2 }}>
        <Form.Input
          control={control}
          {...form.register("platform")}
          label="Social Platform Name"
        />
        <Form.Input control={control} {...form.register("url")} label="URL" />
        <Grid size={{ xs: 12, md: 6 }}>
          <Form.Select
            control={control}
            {...form.register("icon")}
            label="Platform Icon"
            options={iconList}
            className="fa-brands"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Form.Input
            control={control}
            {...form.register("iconspecs.color")}
            label="Icon Color"
          />
        </Grid>
        <Form.Input
          control={control}
          {...form.register("points")}
          label="Points"
        />
      </Grid>

      <Grid
        container
        size={12}
        sx={{
          justifyContent: "flex-end",
          mr: 2,
        }}
      >
        <Page.MuiButton
          type="submit"
          variant="contained"
          color="secondary"
          sx={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          Submit
        </Page.MuiButton>
      </Grid>
    </Grid>
  );
}

function ManageReward() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [users, setUsers] = React.useState([{}]);
  const [open, setOpen] = React.useState({ open: false, id: null });
  React.useEffect(() => {
    loadData(
      api.get(`/api/v1/follow-social/verify`),
      (resp) => {
        setUsers(resp.data);
      },
      () => {
        // isLoading=false
      },
    );
  }, []);
  // return <pre>{JSON.stringify(users,null,2)}</pre>
  return (
    <Page.Box
      sx={{
        bgcolor: (theme) => theme.palette.page.main,
        px: 1,
      }}
    >
      <Datatable
        columns={[
          {
            id: "name",
            label: "User Name",
            width: "320px",
            // data: "name",
            render: (info) => (
              <>
                {info?.created?.By?.name?.first} {info?.created?.By?.name?.last}
                ({info?.created?.By?.mail})
              </>
            ),
            // feature: ["searchable"],
          },
          {
            id: "platform",
            data: "platform",
            label: "Platform",
            width: 140,
            feature: ["searchable", "sortable"],
          },
          {
            id: "user",
            label: "User ID",
            data: "user",
            feature: ["searchable"],
          },
          {
            id: "points",
            label: "Points on Completion",
            data: "points",
            feature: ["searchable"],
          },
          {
            id: "screenshot",
            label: "Attachment",
            render: (info) => (
              <Button
                sx={{ p: 0 }}
                onClick={() => {
                  setOpen({ open: true, id: info.screenshot });
                }}
              >
                View Screenshot
              </Button>
            ),
          },
          {
            id: "status",
            label: "Status",
            render: (d) => (
              <Page.Box display={"flex"} gap={1} alignItems={"center"}>
                <Chip
                  variant="outlined"
                  label={d.status}
                  color={
                    d.status === "approved"
                      ? "success"
                      : d.status === "declined"
                        ? "error"
                        : "warning"
                  }
                  size="small"
                  sx={{ textTransform: "capitalize", px: 1 }}
                />
                {/* <IconButton
                    sx={{ fontSize: 14, color: "error.main" }}
                    title="Undo"
                  >
                    <i className="fa-solid fa-rotate-left" />
                  </IconButton> */}
              </Page.Box>
            ),
          },
        ]}
        data={users}
        isLoading={isLoading}
        pagination={[10, 20, 50, 100]}
        pageSize={10}
        hideColumnSelector
        hideDownload
        noDataMsg="No Record Found."
        add={() => {
          setOpen({ open: true, id: null });
        }}
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
            Social Reward Requests
          </Page.Text>
        }
      />
      <PopUp
        open={open.open}
        title="Submitted Screenshot"
        maxWidth="lg"
        onClose={() => setOpen({ open: false, id: null })}
      >
        <Page.Box p={2}>
          <img
            src={`/social/screenshots/${open.id}`}
            style={{ maxWidth: "100%" }}
          />
          <Grid size={12} justifyContent="flex-end" spacing={2} container p={2}>
            <Page.Select
              label="status"
              onChange={() => {}}
              options={[
                { label: "Approve", value: "approve" },
                { label: "Reject", value: "reject" },
              ]}
            />
            <Page.Box display={"flex"} gap={1} alignItems={"center"}>
              <Page.MuiButton
                onClick={() => setOpen({ open: false, id: null })}
                variant="outlined"
                sx={{ textTransform: "none" }}
              >
                Cancel
              </Page.MuiButton>
              <Page.MuiButton
                onClick={() => {
                  setOpen({ open: false, id: null });
                }}
                variant="contained"
                sx={{ textTransform: "none" }}
              >
                Save
              </Page.MuiButton>
            </Page.Box>
          </Grid>
        </Page.Box>
      </PopUp>
    </Page.Box>
  );
}
