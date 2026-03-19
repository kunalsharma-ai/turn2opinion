// todo: load options from seeder

"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { Datatable, Form, Icon, SectionTitle } from "@/components";
import { Page, api, useCustomState } from "@/util";

import { Grid, IconButton } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useToast } from "@/hooks";
import { SideDrawer } from "@/components/Popup";
import { useQuery } from "@/Context";

export default function () {
  const [question, setQuestion] = React.useState([]);
  const options = useCustomState([]);
  const parentValues = useCustomState([]);
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
    api.get(`/api/v1/option/${question.name}`).then((resp) => {
      options.update(resp.data);
    });
  }, [question]);
  React.useEffect(() => {
    if (!question.parent || question.parent === "") return;
    api.get(`/api/v1/option/${question.parent}`).then((resp) => {
      if (resp.status === "success") {
        parentValues.update(resp.data);
      }
    });
  }, [question]);

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
            feature: ["searchable"],
            render: (info) => (
              <Page.Box display="flex" alignItems="center" gap={0.2}>
                {info?.parentValue?.length !== 0 ? (
                  <>{info.parentValue.join(", ")}</>
                ) : (
                  "-"
                )}
              </Page.Box>
            ),
          },
          {
            id: "info",
            label: "advancedInfo",
            render: (info) => {
              return (
                <>
                  {info.isExclusive && <span>Exclusive</span>}
                  {info.isSelected && <span>Default Selected</span>}
                  {info.describeLabel !== "" && (
                    <span>{info.describeLabel}</span>
                  )}
                </>
              );
            },
          },
          {
            id: "action",
            label: "Action",
            render: (info) => (
              <Page.Box display="flex" alignItems="center" gap={1}>
                <IconButton
                  sx={{ p: 0 }}
                  title="Move Up in Sort Order"
                  onClick={async () => {
                    let temp = await api.put(
                      `/api/v1/option/${info.question}/${info._id}`,
                      { ...info, sortOrder: Number(info.sortOrder) + 1 },
                    );
                    // useToast(temp);
                    let resp = await api.get(`/api/v1/option/${question.name}`);
                    options.update(resp?.data);
                  }}
                >
                  <KeyboardArrowUpIcon fontSize="small" color="primary" />
                </IconButton>

                <IconButton
                  sx={{ p: 0 }}
                  title="Move Down in Sort Order"
                  onClick={async () => {
                    let temp = await api.put(
                      `/api/v1/option/${info.question}/${info._id}`,
                      { ...info, sortOrder: Number(info.sortOrder) - 1 },
                    );
                    // useToast(temp);
                    let resp = await api.get(`/api/v1/option/${question.name}`);
                    options.update(resp?.data);
                  }}
                >
                  <KeyboardArrowDownIcon fontSize="small" color="primary" />
                </IconButton>

                <IconButton
                  sx={{ p: 0 }}
                  title="Edit Option"
                  onClick={() => {
                    setOpen({ open: true, id: info._id });
                  }}
                >
                  <EditIcon fontSize="small" color="secondary" />
                </IconButton>

                <IconButton
                  sx={{ p: 0 }}
                  title="Delete Option"
                  onClick={async () => {
                    let temp = await api.delete(
                      `/api/v1/option/${info.question}/${info._id}`,
                      {},
                    );
                    useToast(temp);
                    let resp = await api.get(`/api/v1/option/${question.name}`);
                    options.update(resp?.data);
                  }}
                >
                  <CloseIcon fontSize="small" color="error" />
                </IconButton>
                {/* <span>{info.sortOrder}</span> */}
              </Page.Box>
            ),
          },
        ]}
        data={options.value}
        isLoading={false}
        pagination={[10, 20, 50, 100]}
        pageSize={50}
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
                    borderBottom: (theme) =>
                      `2px solid ${theme.palette.primary.main}`,
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
          question={question}
          parentValues={parentValues}
          onClose={async () => {
            let resp = await api.get(`/api/v1/option/${question.name}`);
            options.update(resp?.data);
            setOpen({ open: false, id: null });
          }}
        />
      </SideDrawer>
    </Page.Box>
  );
}

function CreateOrEditOption({
  optionID = null,
  onClose,
  question,
  parentValues,
}) {
  // const parentValues=useCustomState([]);
  const form = useForm({
    defaultValues: {
      describeLabel: "Please Specify",
      requireDescribe: false,
      isExclusive: false,
      isSelected: false,
      label: "",
      value: "",
      sortOrder: 0,
      placeAtTop: false,
      parentValue: [],
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
    if (!optionID) return;
    api.get(`/api/v1/option/${question.name}/${optionID}`).then((resp) => {
      if (resp.status === "success") {
        let temp = resp.data;
        form.reset({
          ...temp,
          placeAtTop: temp?.sortOrder === 100,
          requireDescribe: temp?.describeLabel !== "",
        });
      }
    });
  }, [optionID, question]);
  const onSubmit = async (data) => {
    let endpoint = `/api/v1/option/${question.name}`;
    if ("_id" in data) {
      endpoint += `/${data._id}`;
    }
    let resp = await api.put(endpoint, {
      ...data,
      describeLabel: data.requireDescribe ? data.describeLabel : "",
    });
    useToast(resp);
    if (Boolean(onClose)) onClose();
  };

  const placeAtTop = watch("placeAtTop");

  React.useEffect(() => {
    const expected = placeAtTop ? 100 : 0;
    if (watch("sortOrder") !== expected) {
      setValue("sortOrder", expected);
    }
  }, [placeAtTop, setValue, watch]);

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
        <IconButton onClick={onClose} sx={{ color: "secondary.main" }}>
          <CloseIcon />
        </IconButton>
      </SectionTitle>
      <Grid container size={12} spacing={1.4} sx={{ px: 2 }}>
        <Grid size={12}>
          <Form.Select
            control={control}
            {...form.register("parentValue")}
            label="Parent Question Values"
            options={parentValues.value}
            multiple={true}
          />
        </Grid>
        <Form.Input
          control={control}
          {...form.register("label")}
          label="Option Label"
        />
        <Form.Input
          control={control}
          {...form.register("value")}
          label="Option Value"
        />
      </Grid>
      <Grid size={12} direction="column" container pl={4} spacing={0}>
        {/* todo: if admin can force selection <Form.Checkbox
          control={ control }
          { ...form.register("isSelected") }
          label="Default Selected"
        /> */}
        <Form.Checkbox
          {...form.register("placeAtTop")}
          control={control}
          label="Place at top"
        />
        <Form.Checkbox
          control={control}
          {...form.register("requireDescribe")}
          label="Dynamic Comment Box"
        />
        {form.watch("requireDescribe") && (
          <Form.Input
            control={form.control}
            {...form.register("describeLabel")}
            label="Dynamic Comment Box Name"
          />
        )}
        <Form.Checkbox
          control={control}
          {...form.register("isExclusive")}
          label="Exclusive Option"
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
