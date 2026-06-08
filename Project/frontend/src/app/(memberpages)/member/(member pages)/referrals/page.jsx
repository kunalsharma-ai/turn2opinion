"use client";
import React from "react";

import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Snackbar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Collapse,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";

import { api, Page } from "@/util";
import { Datatable } from "@/components";
import { useMember } from "@/Context";
import { useToast } from "@/hooks";

export default function page() {
  const [user] = [useMember()];
  const [emails, setEmails] = React.useState([""]);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const [referralLink, setReferralLink] = React.useState("");
  const [referrals, setReferrals] = React.useState([]);
  const [sentInvites, setSentInvites] = React.useState({
    alreadyRegistered: [],
    invited: [],
  });

  React.useEffect(() => {
    if (!window) return;
    if (!user) return;
    setReferralLink(`${window.location.origin}/?ref=${user._id}&signup`);
    api
      .post(`/api/v1/user`, {
        referredBy: user._id,
      })
      .then((resp) => {
        if ("data" in resp) {
          setReferrals(resp.data);
        }
      });
  }, [user]);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setToastMessage("Link copied to clipboard!");
      setToastOpen(true);
    } catch (err) {
      console.error("Failed to copy: ", err);
      setToastMessage("Failed to copy link!");
      setToastOpen(true);
    }
  };

  const handleCloseToast = () => {
    setToastOpen(false);
  };

  const handleEmailChange = (index, value) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const handleAddEmail = () => {
    setEmails([...emails, ""]);
  };

  const handleRemoveEmail = (index) => {
    if (emails.length === 1) return;
    const newEmails = emails.filter((_, i) => i !== index);
    setEmails(newEmails);
  };
  const columns = [
    { id: "name", label: "Name", data: "fullName" },
    { id: "email", label: "E-mail", data: "mail" },
    { id: "status", label: "Status", render: (info) => info.isVerified.email },
    {
      id: "date",
      label: "Date of Joining",
      render: (info) => new Date(info.createdAt).showDate(),
    },
  ];

  return (
    <Grid
      size={12}
      container
      spacing={2}
      px={{ xs: 2, md: 3 }}
      py={2}
      justifyContent="center"
    >
      <Grid
        size={12}
        sx={{
          borderBottom: `1px solid #e0e0e0`,
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            display: "inline-block",
            fontWeight: "600",
            borderBottom: (theme) => `2px solid ${theme.palette.primary.main}`,
            pb: 0.5,
            my: 2,
          }}
        >
          Refer a Friend and Earn Rewards!
        </Typography>
      </Grid>
      <Grid size={12} container spacing={2} mt={1}>
        <Box width={"100%"}>
          <Typography
            color="secondary"
            sx={{
              fontSize: "16px",
              fontWeight: "700",
            }}
          >
            Refer With Link:
          </Typography>
        </Box>

        <Typography fontSize={15}>
          Sharing is Caring! Why not extend your benefits to your colleagues.
          Share the below link with your colleagues and let them enjoy the
          benefits of being a Turn2Opinion - In Community member.
        </Typography>
        <Grid container size={12} alignItems="center" spacing={1} >
          <Typography fontSize={15} fontWeight={600}>
            {referralLink}
          </Typography>
          <IconButton onClick={handleCopy}>
            <ContentCopyIcon />
          </IconButton>
        </Grid>
      </Grid>{" "}
      <Grid size={12} container>
        <Grid size={{ xs: 12, lg: 6 }} container spacing={2} mt={2}>
          <Box width={"100%"}>
            <Typography
              color="secondary"
              sx={{
                fontSize: "16px",
                fontWeight: "700",
              }}
            >
              Invite By Email:
            </Typography>
          </Box>

          <Typography fontSize={15}>
            Add your colleagues email id below and start inviting them to earn
            referral bonus.
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: 2,
              flexDirection: "column",
            }}
          >
            {emails.map((email, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                gap={1}
                sx={{ width: { xs: "100%", lg: "90%" } }}
              >
                <Page.Input
                  value={email}
                  onChange={(e) => {
                    handleEmailChange(index, e.target.value);
                  }}
                  placeholder="Enter email address"
                  InputProps={{
                    endAdornment: (
                      <>
                        {sentInvites?.invited.includes(email) && (
                          <Box display="flex" alignItems="center" gap="1">
                            <CheckIcon color="secondary" />
                            <Typography
                              fontSize={13}
                              color="secondary"
                              fontWeight={600}
                            >
                              invited
                            </Typography>
                          </Box>
                        )}
                        {sentInvites?.alreadyRegistered.includes(email) && (
                          <Box display="flex" alignItems="center" gap="1">
                            <CloseIcon color="error" />
                            <Typography
                              fontSize={13}
                              color="error"
                              fontWeight={600}
                              width={{ md: "150px" }}
                            >
                              account already exists
                            </Typography>
                          </Box>
                        )}
                      </>
                    ),
                  }}
                />
                <IconButton color="secondary" onClick={() => handleAddEmail()}>
                  <AddIcon />
                </IconButton>
                {emails.length !== 1 && (
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveEmail(index)}
                  >
                    <RemoveIcon />
                  </IconButton>
                )}
              </Box>
            ))}
            <Button
              onClick={async () => {
                let resp = await api.post(`/api/v1/me/invite`, {
                  emails,
                });
                if (resp.status === "success") {
                  setSentInvites(resp.data);
                } else {
                  useToast(resp);
                }
              }}
              variant="contained"
              color="secondary"
              disabled={
                emails.filter((email) => {
                  return Boolean(
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/.test(
                      email
                    )
                  );
                }).length === 0
              }
              sx={{
                fontWeight: 600,
                height: 32,
                width: "120px",
                color: "#fff",
              }}
            >
              Send Invite
            </Button>
          </Box>
        </Grid>

        <InvitedEmails sentInvites={sentInvites} />
      </Grid>
      <Grid size={12}>
        <Datatable
          isLoading={false}
          pagination={[10, 20, 50, 100]}
          pageSize={20}
          hideColumnSelector
          hideDownload
          noDataMsg="No Record Found."
          // extra={
          //   <Box px={2}>
          //     <DateRangeSelector onUpdate={() => {}} />
          //   </Box>
          // }
          title={
            <Typography
              sx={{
                fontSize: "18px",
                display: "inline-block",
                fontWeight: "600",
                borderBottom: (theme) =>
                  `2px solid ${theme.palette.primary.main}`,
                pb: 0.5,
                my: 1,
              }}
            >
              Referral History
            </Typography>
          }
          columns={columns}
          data={referrals}
        />
      </Grid>
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity="success"
          sx={{ width: "100%", fontWeight: 500 }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
function InvitedEmails({ sentInvites }) {
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    api.get(`/api/v1/me/invite`).then((resp) => {
      if ("data" in resp) setUsers(resp.data);
    });
  }, [sentInvites]);
  if (!users || users.length === 0) return null;
  return (
    <Grid
      size={{ xs: 12, lg: 6 }}
      container
      mt={2}
      alignSelf="flex-start"
      spacing={2}
    >
      <Box width={"100%"}>
        <Typography
          color="secondary"
          sx={{
            fontSize: "16px",
            fontWeight: "700",
          }}
        >
          Invite History:
        </Typography>
      </Box>

      <TableContainer
        sx={{
          border: (theme) => `1px solid ${theme.palette.primary.main}`,
          bgcolor: (theme) => theme.palette.cardbg.main,
          borderRadius: 2,
          maxHeight: { xs: "400px", lg: "132px" },
          minWidth: "500px",
          overflow: "auto",
        }}
      >
        <Table
          size="small"
          sx={{
            overflow: "scroll",
            tableLayout: "fixed",
            "& tbody td": {
              height: "32px",
              fontWeight: 500,
              border: "1px solid rgba(0, 0, 0, 0.12)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: 13,
            },
            "& tbody tr": {
              height: "32px",
            },
            "& thead th": {
              fontSize: 13.5,
              fontWeight: 600,
              border: "1px solid rgba(0, 0, 0, 0.12)",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Registered</TableCell>
              <TableCell align="center">Sent At</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{
                  "&:hover": {
                    bgcolor: "#dff7e1ff",
                  },
                }}
              >
                <TableCell align="center">
                  <Tooltip title={user.email} placement="left">
                    {user.email}
                  </Tooltip>
                </TableCell>

                <TableCell align="center">
                  {user.isActive ? "Not Registered" : "Registered"}
                </TableCell>

                <TableCell align="center">
                  {new Date(user.createdAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
