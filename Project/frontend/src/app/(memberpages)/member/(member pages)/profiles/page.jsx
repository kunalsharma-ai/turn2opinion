"use client";
import React from "react";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Tab,
  Tabs,
  Typography,
  IconButton,
  MobileStepper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
// import Question from "@/app/(memberpages)/survey/components/Question";
import Survey from "@/app/(memberpages)/survey/components/Survey";
import { api, Page } from "@/util";
import { useMember, useQuery as useQueryParameters } from "@/Context";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import { useToast } from "@/hooks";
import { useQuery } from "@tanstack/react-query";

function TabLabel({ label, progress = 0, icon, selected }) {
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      size={12}
      sx={{
        minWidth: { xs: "calc(100vw - 190px)", sm: 300 },
        px: { xs: 0, sm: 1 },
      }}
    >
      <i className={`fas ${icon}`} alt="icon" />

      <Grid sx={{ flex: 1 }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 0.5,
            gap: 0.3
          }}
        >
          <Typography
            sx={{ fontWeight: 500, fontSize: 12, textTransform: "capitalize" }}
          >
            {label}
          </Typography>
          <Typography>{progress && `${progress} %`}</Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            ".MuiLinearProgress-bar": {
              bgcolor: (theme) =>
                selected ? "white" : theme.palette.secondary.main,
            },
            width: "100%",
            height: 3,
            borderRadius: 1.5,
            bgcolor: (theme) =>
              selected ? "rgba(255,255,255,0.2)" : theme.palette.cardbg.main,
          }}
        />
      </Grid>
    </Grid>
  );
}

export default function () {
  const [editMode, setEditMode] = React.useState(false);
  const [user, query, router] = [
    useMember(),
    useQueryParameters(),
    useRouter(),
  ];
  const { data: profiles = [], isLoading: profilesLoading } = useQuery({
    queryKey: ["profiles", user?.category, editMode ? "true" : "false"],
    queryFn: () =>
      api
        .post("/api/v1/profile", { category: user.category })
        .then((r) => r.data),
    enabled: !!user?.category || !editMode,
  });
  if (profilesLoading || profiles.length === 0) return <></>
  const activeTab = 1 + profiles.map(profile => profile.slug).indexOf(query.profile);
  const selectedProfile = (activeTab) ? profiles.at(activeTab - 1) : profiles[0];
  return <Grid container size={12} px={1} mt={2} justifyContent="center">
    <ProfileTabs
      profiles={profiles?.filter?.(profile => Number(profile.status) > 0) || []}
      query={query}
      onChange={e => {
        console.log(e);
        router.push(`?profile=${e}`, { scroll: false });
        // setEditMode(false);
      }}
    />
    <Grid container size={12} justifyContent="center" mt={2}>
      <Grid
        size={{ xs: 11, md: 10 }}
        sx={{
          bgcolor: (theme) => theme.palette.cardbg.main,
          borderRadius: 2.5,
          boxShadow: 1,

        }}
      >
        <Grid
          container
          size={12}
          justifyContent="space-between"
          alignItems="center"
          sx={{
            py: 1.5,
            px: 2,
            color: "white",
            bgcolor: (theme) => theme.palette.secondary.main,
            fontWeight: 600,
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            borderBottom:"1px solid rgba(254,254,254,0.3)"
          }}
        >
          <Typography
            fontSize={16}
            fontWeight={600}
            textTransform="capitalize"
          >
            {selectedProfile?.name}
          </Typography>
          <Page.Box display="flex" alignItems="center" gap={2}>
            <Typography fontSize={16}>
              {1}/{selectedProfile?.pages?.length ?? ""}
            </Typography>
            {!editMode && (
              <Button
                endIcon={<EditIcon />}
                onClick={() => setEditMode(true)}
                sx={{ color: "white", p: 0, fontSize: 15, textTransform: "none", ml: 1 }}
              >
                Update
              </Button>
            )}
          </Page.Box>
        </Grid>
        <Survey
          editMode={editMode}
          setEditMode={setEditMode}
          hideSteps={true}
          isProfile={true}
          survey={selectedProfile}
          start={0}
          user={user}
          endpage={"/api/v1/me/profile"}
          onComplete={e => {
            setEditMode(false);
          }}
        />
      </Grid>
    </Grid>
  </Grid>
}
function ProfileTabs({
  profiles,
  query,
  onChange
}) {
  const tabs = React.useMemo(() => {
    return profiles.map((p) => ({
      label: p.name,
      icon: p.icon,
      link: p.slug,
      status: p.status
    }));
  }, [profiles]);

  const activeTab = React.useMemo(() => {

    if (
      !profiles ||
      !query?.profile ||
      !(profiles instanceof Array) ||
      profiles.length === 0
    )
      return;
    return profiles.map((p) => p.slug).indexOf(query.profile);
  }, [profiles, query]);
  return <Tabs
    value={activeTab}
    onChange={(_, v) => {
      onChange(tabs[v].link)
    }}
    variant="scrollable"
    scrollButtons
    allowScrollButtonsMobile
    sx={{
      width: "100%",
      pb: 0.3,
      borderBottom: "3px solid whitesmoke",
      "& .MuiTabs-scrollButtons .MuiSvgIcon-root": { fontSize: 30 },
      "& .MuiTabs-indicator": {
        bgcolor: (theme) => theme.palette.secondary.main,

        height: 3,
        display: "none",
      },
      "& .MuiTab-root": {
        color: "black",
        fontSize: { xs: 14, md: 16 },
        fontWeight: 600,
      },
      "& .Mui-selected": {
        bgcolor: (theme) => theme.palette.secondary.main,
        color: "white !important",
      },
    }}
  >
    {tabs.map((tab, i) => (
      <Tab
        key={tab.label}
        sx={{ borderRadius: 2, m: 0.5, border: "2px solid whitesmoke" }}
        label={
          <TabLabel
            label={tab.label}
            icon={tab.icon}
            selected={activeTab === i}
            progress={tab.status}
          />
        }
      />
    ))}
  </Tabs>
}