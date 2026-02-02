"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import {
  Grid,
  Tabs,
  Tab,
  Fade,
  Chip,
  IconButton,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useMember } from "@/Context";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Datatable, Form, SectionTitle } from "@/components";
import { DateRangeSelector } from "@/components/Form";
import { api, Page } from "@/util";
import data from "@/data/data.json";

import { useToast } from "@/hooks";

function TabPanel({ children, value, index }) {
  return (
    <Fade in={value === index} timeout={1000} unmountOnExit>
      <Page.Box
        hidden={value !== index}
        sx={{ width: "100%", bgcolor: "white", mb: { xs: 1, md: 2 } }}
      >
        {value === index && children}
      </Page.Box>
    </Fade>
  );
}
export default function () {
  const [activeTab, setActiveTab] = React.useState(0);
  const tabs = [
    {
      label: "F.A.Q.",
      render: <FAQ />,
    },
    {
      label: "Contact Support",
      render: <ContactSupport />,
    },
  ];

  return (
    <Grid
      size={12}
      container
      px={{ xs: 1, md: 2 }}
      pt={{ xs: 1, md: 2 }}
      justifyContent="center"
      sx={{ bgcolor: (theme) => theme.palette.page.main }}
    >
      <Tabs
        value={activeTab}
        onChange={(e, v) => {
          setActiveTab(v);
        }}
        variant="fullWidth"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          width: "100%",
          bgcolor: "white",
          borderBottom: "3px solid whitesmoke",
          "& .MuiTabs-indicator": {
            backgroundColor: "secondary.main",
            height: "3px",
          },
          "& .MuiTab-root": {
            color: "gray",
            fontSize: { xs: 14, md: 16 },
            fontWeight: 500,
          },
          "& .Mui-selected": {
            color: "secondary.main",

            fontWeight: 600,
          },
        }}
      >
        {tabs.map((tab) => (
          <Tab label={tab.label} key={tab.label} />
        ))}
      </Tabs>
      {tabs.map((tab, index) => (
        <TabPanel key={tab.label} value={activeTab} index={index}>
          {tab.render}
        </TabPanel>
      ))}
    </Grid>
  );
}

function FAQ() {
  return (
    <Grid size={12} px={{ xs: 0, md: 3 }} py={2}>
      <Grid
        size={12}
        container
        direction="column"
        alignItems={"center"}
        sx={{ border: `1px solid #e0e0e0` }}
      >
        <Grid
          size={{ xs: 11, md: 8 }}
          container
          justifyContent={"center"}
          py={5}
          px={0.5}
        >
          <Typography fontWeight={"bold"} fontSize={"24px"}>
            Do You Have{" "}
            <Typography
              fontSize={"24px"}
              component="span"
              color="primary.main"
              fontWeight={"bold"}
            >
              Any Question?
            </Typography>
          </Typography>

          <Grid size={12} container direction="column" spacing={2} mt={4}>
            {data.faqs.slice(3).map((faq, index) => (
              <Accordion
                key={index}
                disableGutters
                sx={{
                  boxShadow: 0,
                  bgcolor: "#fff1d9",
                  border: `1px solid #ecccafff`,
                  p: 1.5,
                  borderRadius: 3,
                  minHeight: "50px",
                  "&:first-of-type": {
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  },
                  "&:last-of-type": {
                    borderBottomLeftRadius: 12,
                    borderBottomRightRadius: 12,
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "black" }} />}
                  sx={{ borderRadius: 3 }}
                >
                  <Typography fontSize={"18px"} fontWeight="500" color="black">
                    {faq.que}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    bgcolor: "white",
                    borderRadius: 2,
                    textAlign: "justify",
                    fontSize: 15,
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: faq.ans }} />
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function ContactSupport() {
  const [createTicket, setCreateTicket] = React.useState(false);
  const [activeTicket, setActiveTicket] = React.useState(true);
  const [reload, setReload] = React.useState(0);
  function reloadData() {
    setReload((reload + 1) % 10);
  }
  return (
    <Grid
      size={12}
      px={{ xs: 2, md: 3 }}
      py={2}
      justifyContent="center"
      sx={{ border: `1px solid #e0e0e0` }}
    >
      {createTicket ? (
        <CreateTicket
          setCreateTicket={setCreateTicket}
          setActiveTicket={setActiveTicket}
          reloadData={reloadData}
        />
      ) : activeTicket ? (
        <TicketList
          setCreateTicket={setCreateTicket}
          reload={reload}
          setActiveTicket={setActiveTicket}
        />
      ) : (
        <Grid size={12}>
          <Grid
            size={12}
            container
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Page.Text
              sx={{
                fontSize: "16px",
                display: "inline-block",
                fontWeight: "600",
                borderBottom: (theme) =>
                  `2px solid ${theme.palette.primary.main}`,
                pb: 0.5,
                my: 1,
              }}
            >
              Support Tickets
            </Page.Text>
            <Page.MuiButton
              variant="contained"
              color="secondary"
              onClick={() => {
                setCreateTicket(true);
              }}
              sx={{
                fontWeight: "bold",
              }}
            >
              Create Ticket
            </Page.MuiButton>
          </Grid>
          <Grid
            container
            size={12}
            justifyContent="center"
            alignItems="center"
            p={2}
            mb={1}
            sx={{
              minHeight: "300px",
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
              borderRadius: 2,
            }}
          >
            No Active Support Tickets
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

function TicketList({ setCreateTicket, reload, setActiveTicket }) {
  const router = useRouter();
  const [user] = [useMember()];
  const [dateRange, setDateRange] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [ticketStatus, setTicketStatus] = React.useState("all");

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const resp = await api.post(`/api/v1/support`, {
          "issueRaisedBy.email": user.mail,
        });
        if (Array.isArray(resp?.data)) {
          setData(resp.data);
        }
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, dateRange, reload]);

  React.useEffect(() => {
    if (!isLoading) {
      setActiveTicket(Array.isArray(data) && data.length > 0);
    }
  }, [data, isLoading, setActiveTicket]);

  const columns = [
    {
      id: "createdAt",
      label: "Created On",
      render: (info) => `${new Date(info.createdAt).relativeTime()} ago`,
      feature: ["searchable", "sortable", "lockable"],
    },
    {
      id: "ticketNo",
      label: "Ticket Number",
      render: (info) => info._id,
      feature: ["sortable", "lockable"],
    },
    {
      id: "subject",
      label: "Subject",
      width: 220,
      render: (info) => info.subject,
      feature: ["sortable", "lockable"],
    },

    {
      id: "status",
      label: "Status",
      render: (info) => (
        <Chip
          label={info.status}
          size="small"
          color={info.status === "closed" ? "error" : "info"}
          sx={{
            fontSize: "12px",
            textTransform: "capitalize",
            height: 22,
            px: 1,
          }}
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
          style={{
            display: "flex",
            gap: "4px",
          }}
        >
          <Page.MuiButton
            variant="contained"
            color="secondary"
            size="small"
            sx={{ height: 22, textTransform: "none" }}
            onClick={() => {
              router.push(`./support/open?ticket=${info._id}`);
            }}
          >
            Open
          </Page.MuiButton>
        </div>
      ),
    },
    /* 

    */
  ];
  return (
    <Grid
      size={12}
      px={{ xs: 2, md: 3 }}
      py={2}
      justifyContent="center"
      sx={{ border: `1px solid #e0e0e0` }}
    >
      <Datatable
        isLoading={isLoading}
        pagination={[10, 20, 50, 100]}
        pageSize={20}
        noDataMsg="No Record Found."
        data={data}
        hideColumnSelector
        extra={
          <Page.Box
            px={{ xs: 0, md: 2 }}
            my={{ xs: 1, md: 0 }}
            display="flex"
            alignItems="center"
            flexWrap="wrap"
            gap={1}
          >
            <Page.MuiButton
              variant="contained"
              color="secondary"
              onClick={() => {
                setCreateTicket(true);
              }}
              sx={{
                height: 30,
                fontSize: 12,
                textTransform: "none",
                py: "5px",
              }}
            >
              Create Ticket
            </Page.MuiButton>
            <Page.Select
              label=""
              value={ticketStatus}
              onChange={(e) => setTicketStatus(e.target.value)}
              options={[
                { label: "All Tickets", value: "all" },
                { label: "Pending Tickets", value: "pending" },
                { label: "Closed Tickets", value: "closed" },
              ]}
              sx={{
                width: "160px",
                height: 30,

                "& .MuiSelect-select": {
                  padding: "5px 14px",
                  height: 30,
                  fontSize: "12px !important",
                  fontWeight: "bold",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "grey.500",
                  },
                },
              }}
            />
            <DateRangeSelector
              onUpdate={(e) => {
                setDateRange(
                  e.map(
                    (d) => new Date(d.toDate()).toISOString().split("T")[0],
                  ),
                );
              }}
            />
          </Page.Box>
        }
        title={
          <Page.Text
            sx={{
              fontSize: "16px",
              display: "inline-block",
              fontWeight: "600",
              borderBottom: (theme) =>
                `2px solid ${theme.palette.primary.main}`,
              pb: 0.5,
              my: 1,
            }}
          >
            Support Tickets
          </Page.Text>
        }
        columns={columns}
      />
    </Grid>
  );
}

function CreateTicket({ reloadData, setCreateTicket, setActiveTicket }) {
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
      onSubmit={handleSubmit(async (data) => {
        let resp = await api.put(`/api/v1/support`, data);
        useToast(resp);
        if (resp.status === "success") {
          setCreateTicket(false);
          setActiveTicket(true);
          reloadData();
        }
      })}
      container
      spacing={2}
      size={12}
      sx={{
        bgcolor: "white",
        overflow: "hidden",
        borderRadius: "10px",
        boxShadow: 1,
        pb: 2,
        my: 1,
        alignSelf: "flex-start",
        border: (theme) => `1px solid #e0e0e0`,
      }}
    >
      <SectionTitle title="Create Ticket" />

      <Grid container size={12} spacing={1.4} sx={{ px: 2 }}>
        <Form.Input
          control={control}
          {...form.register("subject")}
          label="Subject"
        />
        <Form.TextEditor
          control={control}
          name="description"
          label="Description"
        />
        <Form.Upload
          endpoint="/api/v1/upload/image"
          name="attachments"
          control={control}
          form={form}
          multiple
          accept="image/jpeg,image/png,image/webp"
          hideCaption
        />
      </Grid>
      <Grid
        container
        size={12}
        sx={{
          justifyContent: "flex-end",
          mr: 2,
          mb: 1,
        }}
      >
        <Page.MuiButton
          onClick={() => {
            setCreateTicket(false);
          }}
          variant="outlined"
          color="secondary"
          sx={{
            fontWeight: "bold",
          }}
        >
          Cancel
        </Page.MuiButton>
        <Page.MuiButton
          type="submit"
          variant="contained"
          color="secondary"
          sx={{
            fontWeight: "bold",
          }}
        >
          Create
        </Page.MuiButton>
      </Grid>
    </Grid>
  );
}
