"use client";
import React from "react";
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm } from "react-hook-form";
import { useRouter, usePathname } from "next/navigation";

import { useQuery } from "@/Context";
import { api, Page } from "@/util";
import { Form } from "@/components";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import { useToast } from "@/hooks";

export default function page() {
  const query = useQuery();
  const router = useRouter();
  const path = usePathname();
  const [reload, setReload] = React.useState(0);
  const [ticket, setTicket] = React.useState();
  function reloadData() {
    setReload((reload + 1) % 10);
  }
  React.useEffect(() => {
    if (!query || !("ticket" in query)) return;
    api.get(`/api/v1/support/${query.ticket}`).then((resp) => {
      if ("data" in resp) setTicket(resp.data);
    });
  }, [query, reload]);

  if (!ticket) return <LoadingOverlay />;
  return (
    <Grid
      size={ 12 }
      px={ { xs: 1, md: 2 } }
      py={ 2 }
      justifyContent="center"
      sx={ {
        border: `1px solid #e0e0e0`,
        bgcolor: (theme) => theme.palette.page.main,
      } }
    >
      <Grid
        size={ 12 }
        container
        spacing={ 1 }
        justifyContent="space-between"
        mb={ 2 }
        mt={ 1 }
        alignItems="center"
      >
        <Page.MuiButton
          aria-label="Back Button"
          startIcon={
            <ArrowBackIcon
              sx={ {
                fontSize: "18px !important",
              } }
            />
          }
          sx={ {
            bgcolor: "white",
            color: "black",
            borderRadius: 2,
            border: "1px solid #c8c8c8ff",
            px: 2,
            height: "32px",
            "&:hover": {
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            },
          } }
          onClick={ () => {
            if (path?.startsWith("/admin"))
              router.push("/admin/support");
            else
              router.push("/member/support");
          } }
        >
          Back
        </Page.MuiButton>
        <Page.Text sx={ { fontWeight: 600, fontSize: "20px" } }>
          Ticket Number :{ " " }
          <Page.Text
            component="span"
            sx={ { fontWeight: 600, fontSize: "20px", color: "secondary.main" } }
          >
            { ticket?.ticketNo }
          </Page.Text>
        </Page.Text>
        <Page.Text sx={ { fontWeight: "bold", fontSize: "16px", mr: 2 } }>
          Ticket Status :{ " " }
          <Page.Text
            component="span"
            sx={ {
              fontWeight: 600,
              fontSize: "16px",
              color: "secondary.main",
              textTransform: "capitalize",
            } }
          >
            { ticket?.status }
          </Page.Text>
        </Page.Text>
      </Grid>
      <TicketBody ticket={ ticket } />
      <TicketReply ticket={ ticket } reloadData={ reloadData } />
      <TicketHistory ticket={ ticket } />
    </Grid>
  );
}
function TicketBody({ ticket }) {
  return (
    <Grid
      size={ 12 }
      sx={ {
        border:(theme) =>`1px solid ${theme.palette.primary.main}`,  
              
        borderRadius: 2,
        mb: 2,
        p: 2,
        bgcolor: "white",
      } }
    >
      <Grid size={ 12 } container alignItems="center" mb={ 2 }>
        <Page.Text
          sx={ {
            display: "inline-block",
            fontWeight: "600",
            borderBottom:(theme)=> `2px solid ${theme.palette.primary.main}`,
            pb: 0.5,
          } }
        >
          Subject:
        </Page.Text>
        <Page.Text
          sx={ {
            fontWeight: "600",
            pb: "6px",
            pl: 1,
          } }
        >
          { ticket?.subject }
        </Page.Text>
      </Grid>
      <div className="body">
        <div dangerouslySetInnerHTML={ { __html: ticket?.description } } />
        {/* {ticket.issueRaisedBy.name} */ }
        {/* {ticket.issueRaisedBy.email} */ }
      </div>
    </Grid>
  );
}
function TicketHistory({ ticket }) {
  const [expanded, setExpanded] = React.useState(0);
  const [ticketData, setTicketData] = React.useState([]);
  React.useEffect(() => {
    api.get(`/api/v1/support/${ticket._id}/reply`).then((resp) => {
      if ("data" in resp) {
        setTicketData(resp.data);
      }
    });
  }, [ticket]);
  return (
    <Grid
      size={ 12 }
      container
      p={ 2 }
      mt={ 2 }
      sx={ {
        border:(theme) =>`1px solid ${theme.palette.primary.main}`,  
              
        borderRadius: 2,
        bgcolor: "white",
      } }
    >
      <Page.Text
        sx={ {
          fontWeight: "600",
          borderBottom:(theme)=> `2px solid ${theme.palette.primary.main}`,
          pb: 0.5,
          mb: 1,
        } }
      >
        Ticket History
      </Page.Text>
      { ticketData.map((data, index) => (
        <Accordion
          key={ index }
          expanded={ expanded === index }
          onChange={ () => setExpanded(expanded === index ? false : index) }
          disableGutters
          sx={ {
            my: 0.4,
            width: "100%",
            "&:first-of-type": {
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            },
            "&:last-of-type": {
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            },
            
              bgcolor: (theme) => theme.palette.cardbg.main,
            border:(theme) =>`1px solid ${theme.palette.primary.main}`,  
              
            minHeight: "50px",
          } }
        >
          <AccordionSummary expandIcon={ <ExpandMoreIcon /> }>
            <Grid
              container
              size={ 12 }
              sx={ {
                justifyContent: "space-between",
                alignItems: "center",
                px: 1,
              } }
            >
              <Page.Text fontWeight="bold" fontSize="13px">
                { data.subject }
              </Page.Text>
              <Grid
                container
                sx={ {
                  justifyContent: "flex-end",
                  alignItems: "center",
                } }
              >
                <Page.Text sx={ { fontSize: "13px" } }>
                  { data?.repliedBy?.name }
                </Page.Text>
                <Page.Text sx={ { fontSize: "13px", pl: 2 } }>
                  { new Date(data?.createdAt).relativeTime() }
                </Page.Text>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails sx={ { borderRadius: 2, p: 1 } }>
            <Page.Box
              sx={ {
                p: 2,
                bgcolor: "white",
                border: "1px solid #e0e0e0",
                borderRadius: 1,
              } }
            >
              <div dangerouslySetInnerHTML={ { __html: data?.message } } />
            </Page.Box>

            { data?.attachments.length !== 0 && (
              <>
                <Page.Divider sx={ { my: 1, mx: -1 } } />
                <Page.Text sx={ { fontWeight: "bold" } }>Attachments</Page.Text>
                <Grid container size={ 12 } spacing={ 1 } mt={ 1 }>
                  { data.attachments?.map((file, i) => (
                    <Grid
                      container
                      key={ i }
                      size={ { xs: 12, sm: 6, md: 4 } }
                      sx={ {
                        p: 1,
                        border: "1px solid #e0e0e0",
                        borderRadius: 2,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        gap: 1,
                        bgcolor: "#fafafa",
                      } }
                    >
                      <Page.Text
                        sx={ {
                          fontSize: "14px",
                          wordBreak: "break-all",
                          fontWeight: 500,
                        } }
                      >
                        { file.split("/").pop() }
                      </Page.Text>
                      <Grid container spacing={ 1 } alignItems="flex-end">
                        <Page.MuiButton
                          size="small"
                          variant="outlined"
                          onClick={ () => window.open(file, "_blank") }
                        >
                          View
                        </Page.MuiButton>

                        <Page.MuiButton
                          size="small"
                          variant="contained"
                          color="secondary"
                          component="a"
                          href={ file }
                          download
                        >
                          Download
                        </Page.MuiButton>
                      </Grid>
                    </Grid>
                  )) }
                </Grid>
              </>
            ) }
          </AccordionDetails>
        </Accordion>
      )) }
    </Grid>
  );
}

function TicketReply({ ticket, reloadData }) {
  const [reload, setReload] = React.useState(1);

  const form = useForm({
    defaultValues: {},
  });
  React.useEffect(() => {
    form.reset({
      status: ticket.status,
      attachments: [],
      message: "",
    });
  }, [ticket]);
  const { control, handleSubmit, watch, setValue, getValues } = form;
  return (
    <Grid
      component="form"
      onSubmit={ handleSubmit(async (data) => {
        console.log(data);
        let resp = await api.put(`/api/v1/support/${ticket._id}/reply`, data);
        useToast(resp);
        reloadData();
      }) }
      size={ 12 }
      spacing={ 1 }
      container
      mt={ 2 }
      px={ 2 }
      py={ 2 }
      sx={ {
        bgcolor: "white",
        border:(theme) =>`1px solid ${theme.palette.primary.main}`,  
              
        borderRadius: 2,
      } }
    >
      <Page.Text
        sx={ {
          fontWeight: "600",
          borderBottom:(theme)=> `2px solid ${theme.palette.primary.main}`,
          pb: 0.5,
          mb: 1,
        } }
      >
        Reply
      </Page.Text>
      <Form.TextEditor control={ control } name="message" label="Message" />

      <Grid size={ 12 } mb={ 1 }>
        <Form.Select
          control={ control }
          { ...form.register("status") }
          label="Ticket Status"
          options={ [
            "New",
            "Open",
            "In Progress",
            "Resolved",
            "Closed",
            "Re Opened",
            "Pending",
            "Awaited",
            "Cancelled",
          ].map((option) => ({
            label: option,
            value: option.sluggify(),
          })) }
        />
      </Grid>
      <Form.Upload
        endpoint="/api/v1/upload/image"
        name="attachments"
        control={ control }
        form={ form }
        accept="image/jpeg,image/png,image/webp"
        multiple
        hideCaption
      />
      <Grid size={ 12 } container justifyContent="flex-end" my={ 2 }>
        <Page.MuiButton
          type="submit"
          variant="contained"
          color="secondary"
          sx={ { fontWeight: 600 } }
        >
          Reply
        </Page.MuiButton>
      </Grid>
    </Grid>
  );
}
