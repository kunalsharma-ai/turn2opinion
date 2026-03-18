"use client";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Datatable, Form, Icon, SectionTitle } from "@/components";
import { Page, api } from "@/util";

import { Grid, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useToast } from "@/hooks";
import { SideDrawer } from "@/components/Popup";

export default function () {
  const [isLoading, setIsLoading] = React.useState(true);
  const [categories, setCategories] = React.useState([]);
  const [open, setOpen] = React.useState({ open: false, id: null });

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const resp = await api.get(`/api/v1/category`);
        setCategories(resp.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Page.Box
      sx={{
        bgcolor: (theme) => theme.palette.page.main,
        p: { xs: 2, md: 3 },
      }}
    >
      <Datatable
        columns={[
          {
            id: "name",
            label: "Category",
            data: "name",
            feature: ["searchable"],
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
                <EditIcon fontSize="small" color="secondary"/>
              </IconButton>
            ),
          },
        ]}
        data={categories}
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
            Account Category List
          </Page.Text>
        }
      />
      <SideDrawer
        open={open.open}
        hideTitleBar={true}
        onClose={() => setOpen({ open: false, id: null })}
      >
        <CreateOrEditCategory
          categoryID={open.id}
          close={() => {
            setOpen({ open: false, id: null });
          }}
        />
      </SideDrawer>
    </Page.Box>
  );
}

function CreateOrEditCategory({ categoryID = null, close }) {
  const [content, setContent] = React.useState([]);
  const id = React.useId();
  const id2 = React.useId();
  const form = useForm({
    defaultValues: { name: "", termsMessage: "", terms: [""] },
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "terms",
  });
  React.useEffect(() => {
    if (!categoryID) return;
    api.get(`/api/v1/category/${categoryID}`).then((resp) => {
      if (resp.status === "success") {
        form.reset(resp.data);
      }
    });
  }, [categoryID]);
  const onSubmit = async (data) => {
    setContent((prev) => [...prev, data]);
    if (!data._id) {
      useToast(await api.put(`/api/v1/category`, data));
    } else {
      useToast(await api.put(`/api/v1/category/${data._id}`, data));
    }
    form.reset();
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
        title={categoryID ? "Edit Category" : "Create Category"}
        sx={{ justifyContent: "space-between" }}
      >
        <IconButton onClick={close} sx={{ color: "secondary.main" }}>
          <CloseIcon />
        </IconButton>
      </SectionTitle>

      <Grid container size={12} spacing={1.4} sx={{ px: 2 }}>
        <Form.Input
          control={control}
          {...form.register("name")}
          label="Category Name"
        />
        <Form.TextEditor
          control={control}
          name="termsMessage"
          label="Terms Message"
          editorId={id}
          dialogScoped
        />

        {fields.map((field, index) => (
          <Grid
            size={12}
            key={field.id}
            container
            alignItems="center"
            spacing={1}
            sx={{
              p: 2,
              borderRadius: 2,
              border: `1px solid rgba(51, 169, 202, 0.4)`,

              bgcolor: "#f1f4f9",
            }}
          >
            <Grid sx={{ flex: 1 }} container spacing={1}>
              <Page.Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                alignItems="center"
              >
                <Page.Text sx={{ fontWeight: 600, color: "secondary.main" }}>
                  Terms {index + 1} Details
                </Page.Text>

                {fields.length > 1 && (
                  <IconButton
                    sx={{ alignSelf: "flex-start" }}
                    color="error"
                    onClick={() => remove(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Page.Box>
              <Form.Input
                control={control}
                {...form.register(`terms.${index}.name`)}
                label={`Term Name`}
              />{" "}
              <Form.TextEditor
                control={control}
                name={`terms.${index}.body`}
                label={`Term Body`}
                editorId={id2 + index}
                dialogScoped
              />{" "}
              <Form.Checkbox
                control={control}
                {...form.register(`terms.${index}.isRequired`)}
                label={`Term Required `}
              />
            </Grid>
          </Grid>
        ))}

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
          Add Term
        </Page.MuiButton>
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
