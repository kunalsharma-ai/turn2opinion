"use client";
import React from "react";
import { Grid, Typography } from "@mui/material";
import { Datatable } from "@/components";
import { useQuery } from "@/Context";
import { useToast } from "@/hooks";
import { api, Page } from "@/util";

export default function page() {
  const [data, setData] = React.useState([]);
  const [reload, setReload] = React.useState(1);
  const query = useQuery();
  React.useEffect(() => {
    api.get(`/api/v1/survey/responses/${query.survey}`).then((resp) => {
      setData(resp.data);
    });
  }, [query, reload]);
  const columns = [
    {
      id: "points",
      label: "points",
      render: (info) => info.points,
    },
    {
      id: "source",
      label: "source",
      render: (info) => info.source,
    },
    {
      id: "survey",
      label: "Survey",
      render: (info) => info.survey.name,
    },
    {
      id: "status",
      label: "Status",
      render: (info) => info.status,
    },
    {
      id: "user",
      label: "User",
      render: (info) => (
        <Page.Link href={`/api/v1/user/${info.user}`}>{info.user}</Page.Link>
      ),
    },
    {
      id: "actions",
      label: "Actions",
      render: (info) => {
        return (
          <>
            <Page.MuiButton
              color="error"
              onClick={async (e) => {
                let cnf = confirm("Do you want to delete this?");
                if (!cnf) return;
                const temp = await api.delete(`/api/v1/response/${info._id}`);
                useToast(temp);
                setReload((reload + 1) % 10);
              }}
            >
              Delete
            </Page.MuiButton>
          </>
        );
      },
    },
  ];
  return (
    <Grid size={12} p={{ xs: 2, md: 3 }} sx={{ border: `1px solid #e0e0e0` }}>
      <Datatable
        columns={columns}
        data={data}
        isLoading={false}
        pagination={[10, 20, 50, 100]}
        pageSize={50}
        hideColumnSelector
        hideDownload
        noDataMsg="No Record Found."
        title={
          <Typography
            sx={{
              fontSize: "16px",
              display: "inline-block",
              fontWeight: "600",
             borderBottom:(theme)=> `2px solid ${theme.palette.primary.main}`,
              pb: 0.5,
              my: 1,
            }}
          >
            Survey Responses
          </Typography>
        }
      />
    </Grid>
  );
}
