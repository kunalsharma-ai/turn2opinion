// todo: create default data,
// todo: display survey from database
// todo: setup welcome survey from ui based on category
// todo: calculate survey points, and completion status by respondent.

"use client";
import React from "react";
import {useRouter} from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form";
import { Datatable, Form, Icon, SectionTitle } from "@/components";
import { Page, api } from "@/util";
import { Grid, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import PeopleIcon from "@mui/icons-material/People";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useToast } from "@/hooks";
import { SideDrawer } from "@/components/Popup";
const endpoint = `/api/v1/project`;
export default function () {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(true);
  const [surveys, setSurveys] = React.useState([]);
  const [open, setOpen] = React.useState({ open: false, id: null });
  const [openInvite, setOpenInvite] = React.useState({ open: false, id: null });
  const [openQuestons, setOpenQuestions] = React.useState({
    open: false,
    id: null,
  });

  React.useEffect(() => {
    setIsLoading(true);
    api.get(endpoint).then((resp) => {      
      setSurveys(resp.data);
      setIsLoading(false);
    });
  }, [open]);

  return (
    <Page.Box
      sx={{
        bgcolor: (theme) => theme.palette.page.main,
        p: { xs: 2, lg: 3 },
      }}
    >
      <Datatable
        columns={[
          { id: "ID", label: "ID", data: "pid", width: 120 },
          {
            id: "name",
            label: "Survey",
            width: 300,
            render: (info) => <Tooltip title={info.name}>{info?.name}</Tooltip>,
            feature: ["sortable", "searchable"],
          },
          { id: "source", label: "Source", data: "source", width: 120 },
          {
            id: "loi",
            label: "LOI (avg in minutes)",
            render: (info) => {
              let loi = info.markets.map((mkt) => mkt.loi);
              return loi.avg();
            },
            width: 180,
          },
          {
            id: "IR",
            label: "IR (in %)",
            render: (info) => {
              let ir = info.markets.map((mkt) => mkt.ir);
              return ir.avg();
            },
            width: 110,
          },
          {
            id: "Completes",
            label: "Completes",
            width: 130,
            render: (info) => {
              return info.markets.reduce((a, c) => {
                a += Number(c.completes);
                return a;
              }, 0);
            },
          },
          {
            id: "invite",
            label: "Invite",
            width: 80,
            render: (info) => (
              <Tooltip title="Invite Panelists">
                <IconButton
                  sx={{ p: 0 }}
                  onClick={() => {
                    setOpenInvite({ open: true, id: info._id });
                  }}
                >
                  <PeopleIcon fontSize="small" color="primary" />
                </IconButton>
              </Tooltip>
            ),
          },
          {
            id: "open",
            label: "Open",
            width: 150,
            render: (info) => (
              <Page.Link
                href={`/admin/surveys/open?id=${info._id}`}
                target="_blank"
                sx={{ color: "secondary.main", fontWeight: 500, p: 0 }}
              >
                Open Survey
              </Page.Link>
            ),
          },
          // { id: "points", label: "Survey Points", data: "points", width: 120 },
          // {
          //   id: "responses",
          //   label: "Responses",
          //   width: 150,
          //   render: (info) => (
          //     <Page.Link
          //       href={`/admin/responses?survey=${info.slug}`}
          //       target="_blank"
          //       sx={{ color: "secondary.main", fontWeight: 500, p: 0 }}
          //     >
          //       View Responses
          //     </Page.Link>
          //   ),
          // },
          // {
          //   id: "questionsList",
          //   label: "Questions List",
          //   width: 150,
          //   render: (info) => (
          //     <Page.MuiButton
          //       sx={{
          //         color: "secondary.main",
          //         fontWeight: 500,
          //         p: 0,
          //         textTransform: "none",
          //       }}
          //       onClick={() => {
          //         setOpenQuestions({ open: true, id: info._id });
          //       }}
          //     >
          //       View Questions
          //     </Page.MuiButton>
          //   ),
          // },
          // {
          //   id: "action",
          //   label: "Action",
          //   width: 100,
          //   render: (info) => (
          //     <IconButton
          //       sx={{ p: 0 }}
          //       onClick={() => {
          //         setOpen({ open: true, id: info._id });
          //       }}
          //     >
          //       <EditIcon fontSize="small" />
          //     </IconButton>
          //   ),
          // },
        ]}
        data={surveys}
        isLoading={isLoading}
        pagination={[10, 20, 50, 100]}
        pageSize={10}
        hideColumnSelector
        hideDownload
        noDataMsg="No Record Found."
        add={() => {
          setOpen({ open: true, id: null });
        }}
        extra={
          <Page.MuiButton
            onClick={() => {
              router.push("/admin/survey");
            }}
            variant="contained"
            color="secondary"
            size="small"
            sx={{
              fontWeight: "bold",
              mr:2
            }}
          >
            Show Internal Surveys
          </Page.MuiButton>
        }
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
            Surveys List
          </Page.Text>
        }
      />
      <SideDrawer
        open={open.open}
        hideTitleBar={true}
        onClose={() => setOpen({ open: false, id: null })}
      >
        <CreateOrEditSurvey
          surveyID={open.id}
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
        <SurveyQuestions
          surveyID={openQuestons.id}
          close={() => {
            setOpenQuestions({ open: false, id: null });
          }}
        />
      </SideDrawer>
      <SideDrawer
        open={openInvite.open}
        hideTitleBar={true}
        onClose={() => setOpenInvite({ open: false, id: null })}
      >
        <SurveyInvite
          surveyID={openInvite.id}
          close={() => {
            setOpenInvite({ open: false, id: null });
          }}
        />
      </SideDrawer>
    </Page.Box>
  );
}

function SurveyInvite({ surveyID = null, close }) {
  const [summary, setSummary] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [surveyData, setSurveyData] = React.useState(null);

  const form = useForm({
    defaultValues: {
      inviteType: "category",
      autoInvite: false,
    },
  });

  const { control, handleSubmit, watch, setValue } = form;
  const inviteType = watch("inviteType");

  React.useEffect(() => {
    api.get("/api/v1/user/summarize").then((resp) => {
      setSummary(resp.data || []);
      setIsLoading(false);
    });
    if (surveyID) {
      api.get(`/api/v1/survey/${surveyID}`).then((resp) => {
        setSurveyData(resp.data);
        setValue("autoInvite", !!resp.data?.autoInvite);
      });
    }
  }, [surveyID]);

  const onSubmit = async (data) => {
    const payload = {
      all: data.inviteType === "all",
      autoInvite: data.autoInvite,
    };

    let resp = await api.post(`/api/v1/survey/${surveyID}/invite`, payload);
    useToast(resp);
    close();
  };

  const totalRespondents = Array.isArray(summary) ? (summary.find((s) => s.label === "Total Panelists")?.value || 0) : 0;
  const categoryCount = (surveyData && Array.isArray(summary)) ? (summary.find((s) => s.label === surveyData.category)?.value || 0) : 0;

  return (
    <Grid
      component="form"
      onSubmit={ handleSubmit(onSubmit) }
      container
      spacing={ 2 }
      size={ 12 }
      sx={ {
        bgcolor: "white",
        overflow: "hidden",
        borderRadius: "10px",
        boxShadow: 1,
        pb: 2,
        alignSelf: "flex-start",
      } }
    >
      <SectionTitle
        title={ "Invite Panelists" }
        sx={ { justifyContent: "space-between" } }
      >
        <IconButton onClick={ close } color="secondary">
          <CloseIcon />
        </IconButton>
      </SectionTitle>
      <Grid container size={ 12 } spacing={ 2 } sx={ { px: 2 } }>
        { isLoading ? (
          <Grid size={ 12 } sx={ { py: 4, textAlign: "center" } }>
            <Page.Text>Loading user statistics...</Page.Text>
          </Grid>
        ) : (
          <>
            <Grid size={ 12 }>
              <Form.Radio
                control={ control }
                name="inviteType"
                label="Invitation Scope"
                options={ [
                  { 
                    label: `Match Category Only (${surveyData?.category?.toUpperCase()}: ${categoryCount} users)`, 
                    value: "category" 
                  },
                  { 
                    label: `All Respondents (${totalRespondents} users)`, 
                    value: "all" 
                  },
                ] }
              />
            </Grid>
            <Grid size={ 12 }>
              <Form.Switch
                control={ control }
                name="autoInvite"
                label="Auto-invite new registrations matching category"
              />
            </Grid>
            <Grid size={ 12 } sx={ { mt: 1 } }>
              <Page.Text fontSize={ 13 } sx={ { color: "text.secondary", fontStyle: "italic" } }>
                Note: Clicking "Send Invitations" will immediately create invitations for existing users based on the selected scope.
              </Page.Text>
            </Grid>
          </>
        ) }
      </Grid>
      <Grid
        container
        size={ 12 }
        sx={ {
          justifyContent: "flex-end",
          mr: 2,
          mt: 2,
        } }
      >
        <Page.MuiButton
          type="submit"
          variant="contained"
          color="secondary"
          disabled={ isLoading }
          sx={ {
            fontWeight: "bold",
          } }
        >
          Send Invitations
        </Page.MuiButton>
      </Grid>
    </Grid>
  );
}


function CreateOrEditSurvey({ surveyID = null, close }) {
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
    if (!surveyID) return;
    api.get(`${endpoint}/${surveyID}`).then((resp) => {
      if (resp.status === "success") {
        form.reset(resp.data);
      }
    });
  }, [surveyID]);
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
        title={surveyID ? "Edit Survey" : "Create Survey"}
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
          label="Survey URL"
        />
        <Form.Input
          control={control}
          {...form.register("name")}
          label="Survey Name"
        />
        <Form.TextEditor
          control={control}
          name="summary"
          label="Survey Summary"
          editorId={id}
          dialogScoped
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
        <Grid size={6}>
          <Form.Select
            control={control}
            {...form.register("source")}
            label="Source "
            options={[
              { label: "Internal", value: "internal" },
              { label: "External", value: "external" },
              { label: "Sampledge", value: "sampledge" },
            ]}
          />
        </Grid>
        <Grid size={6}>
          <Form.Select
            control={control}
            {...form.register("status")}
            label="Status"
            options={[
              { label: "Draft", value: "draft" },
              { label: "Active", value: "active" },
              { label: "Hold", value: "hold" },
              { label: "Closed", value: "closed" },
            ]}
          />
        </Grid>
        <Form.Input
          control={control}
          {...form.register("points")}
          label="Points"
        />{" "}
        <Form.Input control={control} {...form.register("loi")} label="LOI" />
        <Form.TextEditor
          control={control}
          name="thankyou"
          label="Thank You Message"
          editorId={id2}
          dialogScoped
        />
        <Form.TextEditor
          control={control}
          name="description"
          label="Survey Description"
          editorId={id3}
          dialogScoped
        />
        <Form.Input control={control} {...form.register("link")} label="Link" />
        {/* todo:confirmation from management about icon upload
        <Grid container direction="column" sx={{ px: 1, py: 1 }}>
          <Page.Text sx={{ color: "grey" }}>Survey Welcome Icon</Page.Text>
          <Form.Upload
            form={form}
            {...form.register("icon")}
            // endpoint="/api/v1/upload/logo"
            accept={"image/jpeg,image/png,image/svg,image/svg+xml,image/webp"}
            hideCaption={true}
          />
        </Grid> */}
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

function SurveyQuestions({ surveyID = null, close }) {
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
    if (!surveyID) return;
    api.get(`${endpoint}/${surveyID}`).then((resp) => {
      if (resp.status === "success") {
        form.reset({ pages: resp?.data.pages || [] });
      }
    });
  }, [surveyID]);

  const onSubmit = async (data) => {
    let resp = await api.put(`${endpoint}/${surveyID}`, { pages: data.pages });
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
              <Grid size={6}>
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
          color="secondary"
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
