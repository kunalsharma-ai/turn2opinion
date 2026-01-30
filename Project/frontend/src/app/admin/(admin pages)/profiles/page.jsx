// todo: create default data,
// todo: display survey from database
// todo: setup welcome survey from ui based on category
// todo: calculate survey points, and completion status by respondent.

"use client";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Datatable, Form, Icon, SectionTitle } from "@/components";
import { Page, api } from "@/util";
import { Grid, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useToast } from "@/hooks";
import { SideDrawer } from "@/components/Popup";
const endpoint = `/api/v1/profile`;
export default function () {
  const [isLoading, setIsLoading] = React.useState(true);
  const [profiles, setProfiles] = React.useState([]);
  const [open, setOpen] = React.useState({ open: false, id: null });
  const [openQuestons, setOpenQuestions] = React.useState({
    open: false,
    id: null,
  });

  React.useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setIsLoading(true);
        const resp = await api.get(endpoint);
        setProfiles(resp.data);
      } catch (err) {
        console.error("Failed to fetch profiles:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, [open]);

  return (
    <Page.Box
      sx={{
        bgcolor: (theme) => theme.palette.page.main,
        p: { xs: 2, md: 3 },
      }}
    >
      <Datatable
        columns={[
          { id: "category", label: "Category", data: "category" },
          {
            id: "name",
            label: "Profile",
            render: (info) => info.name.Capitalize(),
          },
          {
            id: "questionsList",
            label: "Questions List",
            render: (info) => (
              <Page.MuiButton
                sx={{ color: "secondary.main", fontWeight: 500, p: 0 }}
                onClick={() => {
                  setOpenQuestions({ open: true, id: info._id });
                }}
              >
                View Questions
              </Page.MuiButton>
            ),
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
                <EditIcon fontSize="small" />
              </IconButton>
            ),
          },
        ]}
        data={profiles}
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
              borderBottom:(theme)=> `2px solid ${theme.palette.primary.main}`,
              pb: 0.5,
              my: 1,
            }}
          >
            Profiles
          </Page.Text>
        }
      />
      <SideDrawer
        open={open.open}
        hideTitleBar={true}
        onClose={() => setOpen({ open: false, id: null })}
      >
        <CreateOrEditProfile
          profileID={open.id}
          close={() => {
            setOpen({ open: false, id: null });
          }}
        />
      </SideDrawer>
      <SideDrawer
        open={openQuestons.open}
        hideTitleBar={true}
        onClose={() => setOpenQuestions({ open: false, id: null })}
        anchor="right"
      >
        <ProfileQuestions
          profileID={openQuestons.id}
          close={() => {
            setOpenQuestions({ open: false, id: null });
          }}
        />
      </SideDrawer>
    </Page.Box>
  );
}

function CreateOrEditProfile({ profileID = null, close }) {
  const id = React.useId();
  const id2 = React.useId();
  const id3 = React.useId();
  const form = useForm({
    defaultValues: {
      slug: "",
      name: "",
      icon: "",
      summary: "",
      category: "",
      source: "",
      points: "",
      loi: "",
      thankyou: "",
      description: "",
      link: "",
      pages: [],
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
    if (!profileID) return;
    api.get(`${endpoint}/${profileID}`).then((resp) => {
      if (resp.status === "success") {
        form.reset(resp.data);
      }
    });
  }, [profileID]);
  const onSubmit = async (data) => {
    if (data._id) {
      let resp = await api.put(`${endpoint}/${data._id}`, data);
      useToast(resp);
    } else {
      let resp = await api.put(`${endpoint}`, data);
      useToast(resp);
    }
    close();
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
        title={profileID ? "Edit Profile" : "Create Profile"}
        sx={{ justifyContent: "space-between" }}
      >
        <IconButton onClick={close} color="secondary">
          <CloseIcon />
        </IconButton>
      </SectionTitle>
      <Grid container size={12} spacing={1.4} sx={{ px: 2 }}>
        <Form.Input
          control={control}
          {...form.register("slug")}
          label="Profile URL"
        />
        <Form.Input
          control={control}
          {...form.register("name")}
          label="Profile Name"
        />
        <Form.Input
          control={control}
          {...form.register("icon")}
          label="Profile Icon"
        />
        <Grid size={12}>
          <Form.Select
            control={control}
            {...form.register("category")}
            label="Category"
            options={[]}
            api="category"
          />
        </Grid>
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
            fontWeight: "bold",
          }}
        >
          Submit
        </Page.MuiButton>
      </Grid>
    </Grid>
  );
}

function ProfileQuestions({ profileID = null, close }) {
  const form = useForm({
    defaultValues: {
      pages: [],
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    register,
  } = form;

  const {
    fields: pageFields,
    append: appendPage,
    remove: removePage,
    move: movePage,
  } = useFieldArray({
    control,
    name: "pages",
  });

  React.useEffect(() => {
    if (!profileID) return;
    api.get(`${endpoint}/${profileID}`).then((resp) => {
      if (resp.status === "success") {
        form.reset({ pages: resp?.data.pages || [] });
      }
    });
  }, [profileID]);

  const onSubmit = async (data) => {
    let resp = await api.put(`${endpoint}/${profileID}`, { pages: data.pages });
    useToast(resp);
    close();
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
        title={"Create/Edit Questions"}
        sx={{ justifyContent: "space-between" }}
      >
        <IconButton onClick={close} color="secondary">
          <CloseIcon />
        </IconButton>
      </SectionTitle>
      <Grid container size={12} spacing={2} sx={{ px: 2 }}>
        {pageFields.map((pageField, pageIndex) => (
          <Grid
            size={12}
            key={pageField.id}
            container
            direction="column"
            spacing={1}
            sx={{
              p: 2,
              borderRadius: 2,
              border:(theme) =>`1px solid ${theme.palette.primary.main}`,  
              bgcolor: (theme) => theme.palette.cardbg.main,
            }}
          >
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid>
                <Page.Text
                  sx={{
                    fontWeight: 600,
                    color: "secondary.main",
                    fontSize: 16,
                  }}
                >
                  PAGE {pageIndex + 1}{" "}
                </Page.Text>
                <Form.Input
                  {...form.register(`pages.${pageIndex}.0`)}
                  control={form.control}
                />
              </Grid>
              <Grid container spacing={0.5}>
                {pageIndex > 0 && (
                  <IconButton
                    size="small"
                    onClick={() => movePage(pageIndex, pageIndex - 1)}
                  >
                    <KeyboardArrowUpIcon />
                  </IconButton>
                )}
                {pageIndex < pageFields.length - 1 && (
                  <IconButton
                    size="small"
                    onClick={() => movePage(pageIndex, pageIndex + 1)}
                  >
                    <KeyboardArrowDownIcon />
                  </IconButton>
                )}
                {pageFields.length > 1 && (
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => removePage(pageIndex)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Grid>
            </Grid>

            <QuestionsEditor
              pageIndex={pageIndex}
              control={control}
              register={register}
              watch={watch}
            />
          </Grid>
        ))}
        <Grid size={12}>
          <Page.MuiButton
            variant="outlined"
            size="small"
            color="secondary"
            sx={{
              borderWidth: 2,
              fontWeight: 600,
            }}
            onClick={() => appendPage([""])}
          >
            Add Page
          </Page.MuiButton>
        </Grid>
      </Grid>
      <Grid
        container
        size={12}
        sx={{
          justifyContent: "flex-end",
          mr: 2,
          mt: 2,
        }}
      >
        <Page.MuiButton
          type="submit"
          variant="contained"
          color="secondary"
          sx={{
            fontWeight: "bold",
          }}
        >
          Save Questions
        </Page.MuiButton>
      </Grid>
    </Grid>
  );
}

function QuestionsEditor({ pageIndex, control, register, watch }) {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: `pages.${pageIndex}`,
  });

  return (
    <>
      <Grid container spacing={1} sx={{ mt: 1 }}>
        {fields.map((field, index) => {
          if (index === 0) return;
          return (
            <Grid
              container
              key={field.id}
              alignItems="center"
              spacing={1}
              size={12}
            >
              <Grid size={9}>
                <Form.Select
                  control={control}
                  {...register(`pages.${pageIndex}.${index}`)}
                  label={`Question ${index + 1} [${watch(
                    `pages.${pageIndex}.${index}`
                  )}]`}
                  // label={`Question ${index + 1}`}
                  api="question"
                />
              </Grid>
              <Grid container size={3} spacing={0.5} alignItems="center">
                {index > 0 && (
                  <IconButton
                    size="small"
                    onClick={() => move(index, index - 1)}
                  >
                    <KeyboardArrowUpIcon fontSize="small" />
                  </IconButton>
                )}
                {index < fields.length - 1 && (
                  <IconButton
                    size="small"
                    onClick={() => move(index, index + 1)}
                  >
                    <KeyboardArrowDownIcon fontSize="small" />
                  </IconButton>
                )}
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => remove(index)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          );
        })}
      </Grid>

      <Grid size={12}>
        <Page.MuiButton
          variant="outlined"
          size="small"
          sx={{
            borderWidth: 2,
            fontWeight: 600,
          }}
          onClick={() => append("")}
        >
          Add Question
        </Page.MuiButton>
      </Grid>
    </>
  );
}
