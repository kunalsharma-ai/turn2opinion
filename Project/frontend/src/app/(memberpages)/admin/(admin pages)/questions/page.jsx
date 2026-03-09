// todo: Add questions from seeder
// todo: Display questions added from seeder
// todo: Edit questions added from seeder
// todo: Add question from this page
// todo: Display count of options avaliable

"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Datatable, Form, Icon, SectionTitle } from "@/components";
import { Page, api } from "@/util";

import { Grid, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useToast } from "@/hooks";
import { SideDrawer } from "@/components/Popup";
import { DateRangeSelector } from "@/components/Form";
const endpoint = `/api/v1/question`;
export default function () {
  const [isLoading, setIsLoading] = React.useState(true);
  const [questions, setQuestions] = React.useState([]);
  const [open, setOpen] = React.useState({ open: false, id: null });
  const router = useRouter();

  React.useEffect(() => {
    setIsLoading(true);
    api.get(endpoint).then((resp) => {
      setQuestions(resp.data);
      setIsLoading(false);
    });
  }, [open]);

  return (
    <Page.Box
      sx={ {
        bgcolor: (theme) => theme.palette.page.main,
        p: { xs: 2, md: 3 },
      } }
    >
      <Datatable
        columns={ [
          {
            id: "adminLabel",
            data: "adminLabel",
            label: "Admin Label",
            feature: ["filterable", "sortable"]
          },
          {
            id: "category",
            label: "Category",
            width: "300px",
            render: (info) => {
              if (info.category instanceof Array) {
                const formatter = new Intl.ListFormat("en-IN", {
                  type: "conjunction",
                });
                return formatter.format(info.category);
              }
              return info.category;
            },
          },
          {
            id: "label",
            label: "Question",
            data: "label",
            width: "300px",
            feature: ["searchable"],
          },
          {
            id: "name",
            label: "qname",
            data: "name",
            width: "300px",
            feature: ["searchable", "sortable"],
          },
          {
            id: "parent",
            label: "Parent Question",
            render: (info) => info.parent ?? "-",
            width: "300px",
            feature: ["searchable", "sortable"],
          },
          {
            id: "count",
            label: "Options",
            data: "count",
            width: "150px",
            feature: ["sortable"],
          },

          {
            id: "type",
            label: "Type",
            data: "type",
            width: "150px",
            feature: ["filterable"],
          },
          {
            id: "size",
            label: "Width (out of 12)",
            data: "size",
            width: "150px",
            feature: ["filterable"],
          },
          {
            id: "options",
            label: "Options",
            width: "150px",
            render: (info) =>
              ["radio", "checkbox", "select", "multiselect"].includes(
                info?.type
              ) && (
                <Page.MuiButton
                  sx={ { color: "secondary.main", fontWeight: 500, p: 0 } }
                  onClick={ () => {
                    router.push(`/admin/options?id=${info._id}`);
                  } }
                >
                  View Options
                </Page.MuiButton>
              ),
          },
          {
            id: "action",
            label: "Action",
            width: "120px",
            render: (info) => (
              <IconButton
                sx={ { p: 0 } }
                onClick={ () => {
                  setOpen({ open: true, id: info._id });
                } }
              >
                <EditIcon fontSize="small" />
              </IconButton>
            ),
          },
        ] }
        data={ questions }
        isLoading={ isLoading }
        pagination={ [10, 20, 50, 100] }
        pageSize={ 50 }
        hideColumnSelector
        hideDownload
        noDataMsg="No Record Found."
        add={ () => {
          setOpen({ open: true, id: null });
        } }
        title={
          <Page.Text
            sx={ {
              fontSize: "18px",
              display: "inline-block",
              fontWeight: "600",
              borderBottom: (theme) => `2px solid ${theme.palette.primary.main}`,
              pb: 0.5,
              my: 1,
            } }
          >
            Questions List
          </Page.Text>
        }
      />
      <SideDrawer
        open={ open.open }
        hideTitleBar={ true }
        onClose={ () => setOpen({ open: false, id: null }) }
      >
        <CreateOrEditQuestion
          questionID={ open.id }
          close={ () => {
            setOpen({ open: false, id: null });
          } }
        />
      </SideDrawer>
    </Page.Box>
  );
}

function CreateOrEditQuestion({ questionID = null, close }) {
  const id = React.useId();

  const form = useForm({
    defaultValues: {
      description: "",
      label: "",
      type: "select",
      parent: "",
      name: "",
      category: [],
      size: 12,
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
    if (!questionID) return;
    api.get(`${endpoint}/${questionID}`).then((resp) => {
      if (resp.status === "success") {
        form.reset(resp.data);
      }
    });
  }, [questionID]);
  const onSubmit = async (data) => {
    if (!data._id) {
      useToast(await api.put(`${endpoint}`, data));
    } else {
      useToast(await api.put(`${endpoint}/${data._id}`, data));
    }
    form.reset();
    close();
  };

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
        title={ questionID ? "Edit Question" : "Add Question" }
        sx={ { justifyContent: "space-between" } }
      >
        <IconButton onClick={ close } color="secondary">
          <CloseIcon />
        </IconButton>
      </SectionTitle>

      <Grid container size={ 12 } spacing={ 1.4 } sx={ { px: 2 } }>
        <Grid size={ 12 }>
          <Form.Select
            control={ control }
            { ...form.register("category") }
            label="Category"
            multiple={ true }
            api="category"
          />
        </Grid>{ " " }
        <Grid size={ 12 }>
          <Form.Select
            control={ control }
            { ...form.register("parent") }
            label="Parent Question"
            api="question"
          />
        </Grid>{ " " }
        <Form.Input
          control={ control }
          { ...form.register("name") }
          label="Question Name"
        />
        <Form.Input
          control={ control }
          { ...form.register("label") }
          label="Question Label"
        />
        <Grid size={ 12 }>
          <Form.Select
            control={ control }
            { ...form.register("type") }
            label="Question Type"
            options={ [
              { label: "Note", value: "note" },
              { label: "Openend Single Line", value: "text" },
              { label: "Openend Multi-line", value: "textarea" },
              { label: "Openend Formatted", value: "editor" },
              { label: "Radio", value: "radio" },
              { label: "Checkbox", value: "checkbox" },
              { label: "Date", value: "date" },
              { label: "Phone", value: "phone" },
              { label: "Dropdown Single", value: "select" },
              { label: "Dropdown Multiple", value: "multiselect" },
              { label: "Document", value: "document" },
              { label: "address", value: "address" },
            ] }
          />
        </Grid>
        { form.watch("type") == "date" && (
          <Grid size={ 12 } container alignItems="center">
            <Page.Text color={ "grey" }>Date Range: </Page.Text>
            <Page.Box sx={ { flex: 1 } }>
              <Controller
                name={ "dateRange" }
                control={ control }
                render={ ({ field }) => {
                  return (
                    <DateRangeSelector
                      sx={ { color: "grey" } }
                      onUpdate={ field.onChange }
                    />
                  );
                } }
              />
            </Page.Box>
          </Grid>
        ) }
        <Form.TextEditor
          control={ control }
          name="description"
          label="Question Description"
          editorId={ id }
          dialogScoped
        />{ " " }
        <Form.Input
          control={ control }
          { ...form.register("size") }
          label="Question Width (out of 12)"
          type="number"
          inputProps={ {
            min: 1,
            max: 12,
          } }
        />
        <Grid size={ 12 } direction="column" container pl={ 2 }>
          <Form.Checkbox
            control={ control }
            { ...form.register("isMoney") }
            label="Money"
          />{ " " }
          <Form.Checkbox
            control={ control }
            { ...form.register("isRequired") }
            label="Required"
          />{ " " }
          <Form.Checkbox
            control={ control }
            { ...form.register("isEditable") }
            label="Editable"
          />
          { ["multiselect","select"].includes(form.watch("type")) ? <>
            <Form.Checkbox
              control={ control }
              { ...form.register("hasOthers") }
              label="Has Others"
            />
            <Form.Checkbox
              control={ control }
              { ...form.register("hasNone") }
              label="Has None"
            />
            <Form.Checkbox
              control={ control }
              { ...form.register("hasSkip") }
              label="Has Prefer not to say"
            />
          </> : <></> }
        </Grid>
      </Grid>
      <Grid
        container
        size={ 12 }
        sx={ {
          justifyContent: "flex-end",
          mr: 2,
        } }
      >
        <Page.MuiButton
          type="submit"
          variant="contained"
          color="secondary"
          sx={ {
            fontWeight: "bold",
          } }
        >
          Submit
        </Page.MuiButton>
      </Grid>
    </Grid>
  );
}
