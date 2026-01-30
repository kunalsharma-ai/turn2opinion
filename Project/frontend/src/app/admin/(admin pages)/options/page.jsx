// todo: load options from seeder
// todo: add new option
// todo: update existing option
// todo: load all options of a question
// todo: load options based on parent response

"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { Datatable, Form, Icon, SectionTitle } from "@/components";
import { Page, api } from "@/util";

import { Grid, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useToast } from "@/hooks";
import { SideDrawer } from "@/components/Popup";
import { useQuery } from "@/Context";

export default function () {
  const [question, setQuestion] = React.useState([]);
  const [options, setOptions] = React.useState([]);
  const [open, setOpen] = React.useState({ open: false, id: null });
  const query = useQuery();
  const router = useRouter();

  React.useEffect(() => {
    api
      .get(`/api/v1/question/${query.id}`)
      .then((resp) => setQuestion(resp.data));
  }, []);

  React.useEffect(() => {
    if (!question || !question.name) return;
    api
      .get(`/api/v1/option/${question.name}`)
      .then((resp) => setOptions(resp.data));
  }, [question]);

  console.log(question);

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
            id: "label",
            label: "Option",
            data: "label",
            feature: ["searchable"],
          },
          {
            id: "value",
            label: "Value",
            data: "value",
            feature: ["searchable"],
          },
          {
            id: "parentValue",
            label: "Parent Value",
            data: "parentValue",
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
                <EditIcon fontSize="small" />
              </IconButton>
            ),
          },
        ]}
        data={options}
        isLoading={false}
        pagination={[10, 20, 50, 100]}
        pageSize={10}
        hideColumnSelector
        hideDownload
        noDataMsg="No Record Found."
        add={() => {
          setOpen({ open: true, id: null });
        }}
        title={
          <Page.Box display="flex" flexDirection="column">
            <Page.Box display="flex" alignItems="center">
              <Icon
                iconClass="fa fa-arrow-left"
                onClick={() => {
                  router.push("/admin/questions");
                }}
                label="Back"
              />
              <Page.Text
                sx={{
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                <Page.Text
                  component="span"
                  sx={{
                    fontSize: "18px",
                    fontWeight: "600",
                    borderBottom:(theme)=> `2px solid ${theme.palette.primary.main}`,
                    pb: 0.5,
                    my: 1,
                    mr: 1,
                  }}
                >
                  {question?.label}
                </Page.Text>
                [{question?.type}]
              </Page.Text>
            </Page.Box>
            <Page.Text
              sx={{
                pt: 1,
                ml: "45px",
              }}
            >
              Applicable for :
              <Page.Text
                component="span"
                sx={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "primary.main",
                  textTransform: "capitalize",
                  my: 1,
                }}
              >
                {question?.category?.join(", ")}
              </Page.Text>
            </Page.Text>
          </Page.Box>
        }
        extra={<UploadOptions />}
      />
      <SideDrawer
        open={open.open}
        hideTitleBar={true}
        onClose={() => setOpen({ open: false, id: null })}
      >
        <CreateOrEditOption
          optionID={open.id}
          close={() => {
            setOpen({ open: false, id: null });
          }}
        />
      </SideDrawer>
    </Page.Box>
  );
}

function CreateOrEditOption({ optionID = null, close }) {
  const form = useForm({
    defaultValues: {},
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  React.useEffect(() => {
    if (!optionID) return;
    // api.get(`/api/v1/option/${optionID}`).then((resp) => {
    //   if (resp.status === "success") {
    //     form.reset(resp.data);
    //   }
    // });
  }, [optionID]);
  const onSubmit = async (data) => {
    // setContent((prev) => [...prev, data]);
    // if (!data._id) {
    //   useToast(await api.put(`/api/v1/category`, data));
    // } else {
    //   useToast(await api.put(`/api/v1/category/${data._id}`, data));
    // }
    // form.reset();
    // close();
    console.log(data);
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
        title={optionID ? "Edit Option" : "Add Option"}
        sx={{ justifyContent: "space-between" }}
      >
        <IconButton onClick={close} sx={{ color: "secondary.main" }}>
          <CloseIcon />
        </IconButton>
      </SectionTitle>
      <Grid container size={12} spacing={1.4} sx={{ px: 2 }}>
        <Grid size={12}>
          <Form.Select
            control={control}
            {...form.register("question")}
            label="Parent Question"
          />
        </Grid>{" "}
        <Form.Input
          control={control}
          {...form.register("label")}
          label="Option Label"
        />
        <Form.Input
          control={control}
          {...form.register("value")}
          label="Option Value"
        />{" "}
        <Grid size={12}>
          <Form.Select
            control={control}
            {...form.register("parentValue")}
            label="Parent Question Value"
            options={[]}
          />
        </Grid>
      </Grid>{" "}
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

const UploadOptions = () => {
  return (
    <Page.MuiButton
      variant="contained"
      size="small"
      label="Upload Options"
      component="label"
      color="secondary"
      sx={{
        px: 1,
        py: 0.5,
        fontWeight: "600",

        fontSize: "12px",
        mr: 1,
      }}
      // loading={true}
    >
      Upload Options
      <input
        type="file"
        hidden
        accept=".xlsx,.xls"
        onChange={async (e) => {
          const target = e.target;
          if (!target) return;
          const files = target.files;
          if (!files || files.length === 0) return;
          const formData = new FormData();
          formData.append("file", files[0]);
          console.log(files);
          // const temp = await api.post(`/api/v1/excel`, formData);
        }}
      />
    </Page.MuiButton>
  );
};
