"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Box, Grid, Chip, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useForm } from "react-hook-form";

import { useMember } from "@/Context";
import { Datatable, Form, SectionTitle } from "@/components";
import { DateRangeSelector } from "@/components/Form";
import { api, Page } from "@/util";
import { SideDrawer } from "@/components/Popup";
import { useToast } from "@/hooks";

export default function page() {
  const router = useRouter();
  const [user] = [useMember()];
  const [reload, setReload] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [ticketStatus, setTicketStatus] = React.useState("all");
  const [dateRange, setDateRange] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  function reloadData() {
    setReload((reload + 1) % 10);
  }


  const columns = [
    {
      id: "createdAt",
      label: "Request No.",
      render: (info) => `${new Date(info.createdAt).relativeTime()} ago`,
      feature: ["searchable", "sortable", "lockable"],
    },
    {
      id: "ticketNo",
      label: "User",
      render: (info) => info.ticketNo,
      feature: ["sortable", "lockable"],
    },
    {
      id: "subject",
      label: "Points",
      width: 220,
      render: (info) => info.subject,
      feature: ["sortable", "lockable"],
    },

    {
      id: "status",
      label: "Status",
      render: (info) => (
        <Chip
          label={ info.status }
          size="small"
          color={ info.status === "closed" ? "error" : "info" }
          sx={ {
            fontSize: "12px",
            textTransform: "capitalize",
            height: 22,
            px: 1,
          } }
        />
      ),
      feature: ["filterable", "sortable"],
    },
    {
      id: "action",
      label: "Action",
      width: "200px",
      render: (info) => (
        <div
          style={ {
            display: "flex",
            gap: "4px",
          } }
        >
        </div>
      ),
    },
  ];
  return (
    <Grid
      size={ 12 }
      p={ { xs: 2, md: 3 } }
      justifyContent="center"
      sx={ {
        border: `1px solid #e0e0e0`,
        bgcolor: (theme) => theme.palette.page.main,
      } }
    >
      <Datatable
        isLoading={ isLoading }
        pagination={ [10, 20, 50, 100] }
        pageSize={ 20 }
        noDataMsg="No Record Found."
        data={ data }
        hideColumnSelector
        extra={
          <Box
            px={ { xs: 0, md: 2 } }
            my={ { xs: 1, md: 0 } }
            display="flex"
            alignItems="center"
            gap={ 1 }
          >
          </Box>
        }
        title={
          <Typography
            sx={ {
              fontSize: "16px",
              display: "inline-block",
              fontWeight: "600",
              borderBottom: (theme) => `2px solid ${theme.palette.primary.main}`,
              pb: 0.5,
              my: 1,
            } }
          >
            Redemption Requests
          </Typography>
        }
        columns={ columns }
      />

      <SideDrawer
        open={ open }
        hideTitleBar={ true }
        onClose={ () => setOpen(false) }
      >
        <CreateTicket
          reloadData={ reloadData }
          close={ () => {
            setOpen(false);
          } }
        />
      </SideDrawer>
    </Grid>
  );
}

function CreateTicket({ reloadData, close }) {
  const id = React.useId();
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    api.get(`/api/v1/user`).then((resp) => {
      if (resp?.data instanceof Array && resp.data.length > 0)
        setUsers(
          resp.data.map((u) => ({
            label: `${u.fullName} (${u.mail}) [${u.category}]`,
            value: u.mail,
          }))
        );
    });
  }, []);
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
  return (
    <Grid
      component="form"
      onSubmit={ handleSubmit(async (data) => {
        let resp = await api.put(`/api/v1/support`, data);
        useToast(resp);
        if (resp.status === "success") {
          reloadData();
          close();
        }
      }) }
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
        title="Create Ticket"
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
            { ...form.register("user") }
            label="User"
            options={ users }
          />
        </Grid>
        <Form.Input
          control={ control }
          { ...form.register("subject") }
          label="Subject"
        />
        <Form.TextEditor
          control={ control }
          name="description"
          label="Description"
          editorId={ id }
          dialogScoped
        />
        <Form.Upload
          endpoint="/api/v1/upload/image"
          name="attachments"
          control={ control }
          form={ form }
          multiple
          accept="image/jpeg,image/png,image/webp"
          hideCaption
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
            fontWeight: "bold",
          } }
        >
          Create
        </Page.MuiButton>
      </Grid>
    </Grid>
  );
}
