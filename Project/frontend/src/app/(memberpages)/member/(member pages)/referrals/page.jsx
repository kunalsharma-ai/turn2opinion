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
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";

import { api, loadData, Page } from "@/util";
import { Datatable } from "@/components";
import { useMember } from "@/Context";
import { useToast } from "@/hooks";
import PopUp from "@/componentsMHO/PopUp";

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
        <Grid container size={12} alignItems="center" spacing={1}>
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
                      email,
                    ),
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
      {referrals?.length > 0 && (
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
      )}
      <FollowUs />
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
          bgcolor: (theme) => theme.palette.cardbgdark.main,
          borderRadius: 2,
          maxHeight: { xs: "400px", lg: "132px" },
          maxWidth: "100%",
          overflow: "auto",
        }}
      >
        <Table
          size="small"
          sx={{
            // overflow: "scroll",
            tableLayout: "fixed",
            "& tbody td": {
              color: (theme) => theme.palette.cardtext.main,
              height: "32px",
              fontWeight: 500,
              border: "1px solid rgba(255, 255, 255, 0.12)",
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
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: (theme) => theme.palette.cardtext.main,
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
                sx={
                  {
                    // "&:hover": {
                    //   bgcolor: "#dff7e1ff",
                    // },
                  }
                }
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
                  {new Date(user.createdAt).toFormat("dd-mmm-yyyy")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

function FollowUs() {
  const [verifyOpen, setVerifyOpen] = React.useState(false);
  const [selectedSocial, setSelectedSocial] = React.useState(null);
  const [screenshot, setScreenshot] = React.useState(null);
  const [socialId, setSocialId] = React.useState("");

  const [socials, setSocials] = React.useState([]);
  React.useEffect(() => {
    loadData(
      api.get(`/api/v1/socials`),
      (resp) => {
        setSocials(resp.data);
      },
      () => {
        // isLoading =  false
      },
    );
  }, []);
  const handleSubmitVerification = async () => {
    if (!selectedSocial || !screenshot || !socialId.trim()) return;

    const formData = new FormData();
    formData.append("platform", selectedSocial.platform);
    formData.append("socialId", socialId);
    formData.append("screenshot", screenshot);

    const resp = await api.post("/api/v1/follow-social/verify", formData);
    useToast(resp);
    setSocials((prev) =>
      prev.map((item) =>
        item.platform === selectedSocial.platform
          ? { ...item, status: "pending" }
          : item,
      ),
    );

    setVerifyOpen(false);
    setSelectedSocial(null);
    setScreenshot(null);
    setSocialId("");
  };

  const closeVerifyPopup = () => {
    setVerifyOpen(false);
    setSelectedSocial(null);
    setScreenshot(null);
    setSocialId("");
  };

  if (!socials?.length) {
    return null;
  }

  return (
    <>
      <Grid
        size={12}
        sx={{
          mt: 2,
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
          Get Rewarded for Staying Connected
        </Typography>
      </Grid>

      <Grid size={12}>
        <Typography fontSize={15} mb={3}>
          Follow us on social media to earn bonus reward points and stay updated
          with the latest opportunities, surveys, and community updates.
        </Typography>

        <Grid container spacing={2}>
          {socials.map((social, i) => (
            <Grid key={i}>
              <Box
                sx={{
                  width: 220,
                  p: 2,
                  border: "1px solid",
                  borderColor:
                    social.status === "rewarded"
                      ? "success.main"
                      : social.status === "pending"
                        ? "warning.main"
                        : "divider",
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <i
                  className={`fa-brands ${social.icon}`}
                  style={{ color: "blue", fontSize: 40, ...social.iconspecs }}
                />

                <Typography fontWeight={600}>{social.platform}</Typography>

                <Typography
                  fontSize={16}
                  fontWeight={600}
                  color={
                    social.status === "rewarded"
                      ? "success.main"
                      : social.status === "pending"
                        ? "warning.main"
                        : "secondary"
                  }
                >
                  {social.status === "rewarded"
                    ? `${social.points} Points Awarded`
                    : social.status === "pending"
                      ? "Verification Pending"
                      : `+${social.points} Points`}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    width: "100%",
                  }}
                >
                  <Button
                    component="a"
                    href={social.url}
                    target="_blank"
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      if (social.status === "not_started") {
                        setSocials((prev) =>
                          prev.map((item) =>
                            item.platform === social.platform
                              ? { ...item, status: "followed" }
                              : item,
                          ),
                        );
                      }
                    }}
                  >
                    {social.platform?.toLowerCase() === "instagram"
                      ? "Follow"
                      : social.platform?.toLowerCase() === "youtube"
                        ? "Subscribe"
                        : "Like"}
                  </Button>

                  {social.status === "rewarded" ? (
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      startIcon={<CheckIcon />}
                      disabled
                    >
                      Reward Claimed
                    </Button>
                  ) : social.status === "pending" ? (
                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      disabled
                    >
                      Pending Review
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      disabled={social.status === "not_started"}
                      onClick={() => {
                        setSelectedSocial(social);
                        setVerifyOpen(true);
                      }}
                    >
                      Verify Follow
                    </Button>
                  )}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <PopUp
        open={verifyOpen}
        onClose={closeVerifyPopup}
        title={`Verify ${selectedSocial?.platform || ""} Follow`}
        maxWidth="sm"
      >
        <Box p={3}>
          <Typography mb={2}>
            Follow our <strong>{selectedSocial?.platform}</strong> page and
            submit your profile information for verification.
          </Typography>

          <Page.Input
            fullWidth
            label={selectedSocial?.verificationLabel}
            placeholder={selectedSocial?.verificationLabel}
            value={socialId}
            onChange={(e) => setSocialId(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button
            component="label"
            variant="outlined"
            fullWidth
            sx={{ height: 48, fontWeight: 700, fontSize: 16 }}
          >
            {screenshot ? "Change Screenshot" : "Upload Screenshot"}

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setScreenshot(e.target.files[0]);
                }
              }}
            />
          </Button>

          {true && (
            <Typography mt={2} fontSize={14} color="error.main">
              Maximum 2MB file size allowed
            </Typography>
          )}

          <Typography mt={1} fontSize={12} color="text.secondary">
            Upload a screenshot showing that you have followed, subscribed, or
            connected with our page.
          </Typography>

          {screenshot && (
            <Typography mt={2} fontSize={14} color="success.main">
              Selected: {screenshot.name}
            </Typography>
          )}

          <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
            <Button variant="outlined" onClick={closeVerifyPopup}>
              Cancel
            </Button>

            <Button
              variant="contained"
              color="secondary"
              disabled={!socialId.trim() || !screenshot}
              onClick={handleSubmitVerification}
            >
              Submit Verification
            </Button>
          </Box>
        </Box>
      </PopUp>
    </>
  );
}

function LikeFacebook() {
  return (
    <div
      className="fb-like"
      data-href="https://www.facebook.com/profile.php?id=61589899902397"
      data-layout="button_count"
      data-action="like"
      data-size="large"
      data-share="true"
    />
  );
}
