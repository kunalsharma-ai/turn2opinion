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
import { PopperForm, SideDrawer } from "@/components/Popup";
import { useQuery } from "@/Context";


export default function () {
  const [question, setQuestion] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [reload, setReload] = React.useState(1);
  const validations = useCustomState([]);
  const parentValues = useCustomState([]);
  const [open, setOpen] = React.useState({ open: false, id: null });
  const query = useQuery();
  const router = useRouter();

  React.useEffect(() => {
    if (!query || !query.que) return;
    api
      .get(`/api/v1/question/${query.que}`)
      .then((resp) => setQuestion(resp.data));
  }, [query, reload]);
  /*
  // */
  React.useEffect(() => {
    if (!question || !question.name) return;
    api
      .post(`/api/v1/validation`, {
        question: question.name,
        isActive: {
          $in: [true, false]
        }
      })
      .then((resp) => {
        validations.update(resp.data);
      });
  }, [question, reload]);
  React.useEffect(() => {
    if (!question.parent || question.parent === "") return;
    api.get(`/api/v1/option/${question.parent}`).then((resp) => {
      if (resp.status === "success") {
        parentValues.update(resp.data);
      }
    });
  }, [question, reload]);
  // return <pre>{ JSON.stringify(validations.value, null, 2) }</pre>
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
            id: "label",
            label: "Value of Parent Question",
            // data: "label",
            feature: ["searchable"],
            render: info => (info.parentVaue instanceof Array) ? info.parentVaue.join(",") : info.parentValue
          },

          {
            id: "validation",
            label: "Validation Pattern",
            // render: (info) => (
            //   <Page.MuiButton
            //     onClick={ (e) => {
            //       setAnchorEl(e.currentTarget);
            //     } }
            //     sx={ { p: 0, textTransform: "none" } }
            //   >
            //     Edit Validation
            //   </Page.MuiButton>
            // ),
            data: "pattern"
          },
          {
            id: "action",
            label: "Action",
            render: (info) => (
              <Page.Box display="flex" alignItems="center" gap={ 1 }>
                <IconButton
                  sx={ { p: 0 } }
                  title="Edit Option"
                  onClick={ () => {
                    setOpen({ open: true, id: info._id });
                  } }
                >
                  <EditIcon fontSize="small" color="secondary" />
                </IconButton>

                <IconButton
                  sx={ { p: 0 } }
                  title="Delete"
                  onClick={ async () => {
                    let temp = await api.delete(
                      `/api/v1/validation/${info.question}/${info._id}`,
                      {},
                    );
                    useToast(temp);
                    setReload(reload + 1)
                  } }
                >
                  <CloseIcon fontSize="small" color="error" />
                </IconButton>
              </Page.Box>
            ),
          },
        ] }
        data={ validations.value }
        isLoading={ false }
        pagination={ [10, 20, 50, 100] }
        pageSize={ 50 }
        hideColumnSelector
        hideDownload
        noDataMsg="No Record Found."
        add={ () => {
          setOpen({ open: true, id: null });
        } }
        title={
          <Page.Box display="flex" flexDirection="column">
            <Page.Box display="flex" alignItems="center">
              <Icon
                iconClass="fa fa-arrow-left"
                onClick={ () => {
                  router.push("/admin/questions");
                } }
                label="Back"
              />
              <Page.Text
                sx={ {
                  fontSize: "18px",
                  fontWeight: "600",
                } }
              >
                <Page.Text
                  component="span"
                  sx={ {
                    fontSize: "18px",
                    fontWeight: "600",
                    borderBottom: (theme) =>
                      `2px solid ${theme.palette.primary.main}`,
                    pb: 0.5,
                    my: 1,
                    mr: 1,
                  } }
                >
                  { question?.label }
                </Page.Text>
                [{ question?.type }]
              </Page.Text>
            </Page.Box>
            <Page.Text
              sx={ {
                pt: 1,
                ml: "45px",
              } }
            >
              Applicable for :
              <Page.Text
                component="span"
                sx={ {
                  fontSize: 16,
                  fontWeight: "600",
                  color: "primary.main",
                  textTransform: "capitalize",
                  my: 1,
                } }
              >
                { question?.category?.join(", ") }
              </Page.Text>
            </Page.Text>
          </Page.Box>
        }
      // extra={ <UploadOptions /> }
      />
      <SideDrawer
        open={ open.open }
        hideTitleBar={ true }
        onClose={ () => setOpen({ open: false, id: null }) }
      >
        <CreateOrEditOption
          optionID={ open.id }
          question={ question }
          parentValues={ parentValues }
          onClose={ async () => {
            setOpen({ open: false, id: null });
            setReload(reload + 1)
          } }
        />
      </SideDrawer>
      <PopperForm
        anchorEl={ anchorEl }
        setAnchorEl={ setAnchorEl }
        title={ "Validation" }
        onSubmit={ async (e) => { } }
      >
        <Page.Box sx={ { width: "100%" } }>
          <Page.Select
            label="Validation"
            onChange={ () => { } }
            options={ [{ label: "option1", value: "option1" }] }
          />
        </Page.Box>
      </PopperForm>
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
    api.post(`/api/v1/validation`, {
      question: question.name,
      _id: optionID
    }).then((resp) => {
      if (resp.status === "success") {
        let temp = resp.data;
        if (temp instanceof Array) {
          temp = temp.pop();
        }
        form.reset({
          ...temp
        });
      }
    });
  }, [optionID, question]);
  const onSubmit = async (data) => {
    // console.log(data);
    // return;
    let endpoint = `/api/v1/validation`;
    if(optionID !== null )endpoint+=`/${optionID}`
    let resp = await api.put(endpoint, {
      ...data,
      question: question.name
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
        title={ optionID ? "Edit Pattern Validation" : "Add Pattern Validation" }
        sx={ { justifyContent: "space-between" } }
      >
        <IconButton onClick={ onClose } sx={ { color: "secondary.main" } }>
          <CloseIcon />
        </IconButton>
      </SectionTitle>
      <Grid container size={ 12 } spacing={ 1.4 } sx={ { px: 2 } }>
        <Grid size={ 12 }>
          <Form.Select
            control={ control }
            { ...form.register("parentValue") }
            label="Parent Question Values"
            options={ parentValues.value }
            multiple={ true }
          />
        </Grid>
        <Form.Input
          control={ control }
          { ...form.register("pattern") }
          label="Validation Pattern (REGEX)"
        />
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
            color: "white",
            fontWeight: "bold",
          } }
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
      sx={ {
        px: 1,
        py: 0.5,
        fontWeight: "600",

        fontSize: "12px",
        mr: 1,
      } }
    // loading={true}
    >
      Upload Options
      <input
        type="file"
        hidden
        accept=".xlsx,.xls"
        onChange={ async (e) => {
          const target = e.target;
          if (!target) return;
          const files = target.files;
          if (!files || files.length === 0) return;
          const formData = new FormData();
          formData.append("file", files[0]);
          console.log(files);
          // const temp = await api.post(`/api/v1/excel`, formData);
        } }
      />
    </Page.MuiButton>
  );
};
