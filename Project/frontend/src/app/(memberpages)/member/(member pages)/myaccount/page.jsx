"use client";
import React from "react";
import {
  Avatar,
  Box,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
  InputAdornment,
  Tooltip,
  Tabs,
  Tab,
  Fade,
  Collapse,
  Rating,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import { useRouter } from "next/navigation";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import StarIcon from "@mui/icons-material/Star";
import CakeIcon from "@mui/icons-material/Cake";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { useForm } from "react-hook-form";

import { Form } from "@/components";
import PopUp from "@/componentsMHO/PopUp";
import { api, Page } from "@/util";
import DataList from "@/componentsMHO/DataList";
import { useMember } from "@/Context";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import { useToast } from "@/hooks";
import MyAccountPoints from "../../components/MyAccountPoints";

const iconStyle = {
  color: "#fff",
  verticalAlign: "middle",
  ml: 1,
  mb: 0.5,
  fontSize: 24,
};

const getGenderIcon = (gender) => {
  switch (gender) {
    case "Male":
      return (
        <Tooltip title="Male" placement="top">
          <MaleIcon sx={iconStyle} />
        </Tooltip>
      );
    case "Female":
      return (
        <Tooltip title="Female" placement="top">
          <FemaleIcon sx={iconStyle} />
        </Tooltip>
      );
    case "Other":
      return (
        <Tooltip title="Others" placement="top">
          <PersonIcon sx={iconStyle} />
        </Tooltip>
      );
    default:
      return null;
  }
};

export default function page() {
  const user = useMember();

  return (
    <Grid
      container
      size={12}
      py={2}
      px={{ xs: 2, md: 3 }}
      sx={{ border: `1px solid #e0e0e0` }}
      spacing={2}
    >
      <Grid container size={{ xs: 12, md: 4, lg: 3 }} alignSelf={"flex-start"}>
        <UserInfo user={user} />
      </Grid>

      <Grid container size={{ xs: 12, md: 8, lg: 9 }} alignContent="flex-start">
        <MyAccountPoints />
        <Stats user={user} />
        <Summary />
      </Grid>
    </Grid>
  );
}

function Stats() {
  const [statistics, setStatistics] = React.useState({});

  React.useEffect(() => {
    api
      .get(`/api/v1/me/statistics`)
      .then((resp) => {
        if (!resp.data) return useToast(resp);

        setStatistics(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const stats = [
    {
      title: "Claimed Rewards",
      value: `0 pts`,
      subtitle: "Rewards already redeemed",
      icon: "/images/myaccount/claimedreward.png",
      bg: "rgba(76, 175, 80, 0.12)",
    },
    {
      title: "Total Rewards Earned",
      value: `${statistics?.totalRewards ?? 0} pts`,
      subtitle: "Lifetime reward earnings",
      icon: "/images/myaccount/totalreward.png",
      bg: "rgba(255, 193, 7, 0.12)",
    },
    {
      title: "Total Surveys Taken",
      value: (statistics?.total ?? 0).toLocaleString("en-US"),
      subtitle: "All survey attempts",
      icon: "/images/myaccount/totalsurveytaken.png",
      bg: "rgba(33, 150, 243, 0.12)",
    },
    {
      title: "Completed Surveys",
      value: (statistics?.complete ?? 0).toLocaleString("en-US"),
      subtitle: "Successfully completed",
      icon: "/images/myaccount/completedsurvey.png",
      bg: "rgba(76, 175, 80, 0.12)",
    },
    {
      title: "Disqualified Surveys",
      value: (statistics?.disqualified ?? 0).toLocaleString("en-US"),
      subtitle: "Screened out surveys",
      icon: "/images/myaccount/disqualifiedsurvey.png",
      bg: "rgba(244, 67, 54, 0.12)",
    },
    {
      title: "Abandoned Surveys",
      value: (statistics?.abdoned ?? 0).toLocaleString("en-US"),
      subtitle: "Surveys not completed",
      icon: "/images/myaccount/abandonedsurvey.png",
      bg: "rgba(158, 158, 158, 0.12)",
    },
    {
      title: "Approved Surveys",
      value: (statistics?.approved ?? 0).toLocaleString("en-US"),
      subtitle: "Approved responses",
      icon: "/images/myaccount/disqualifiedsurvey.png",
      bg: "rgba(0, 150, 136, 0.12)",
    },
    {
      title: "Rejected Surveys",
      value: (statistics?.rejected ?? 0).toLocaleString("en-US"),
      subtitle: "Rejected responses",
      icon: "/images/myaccount/abandonedsurvey.png",
      bg: "rgba(233, 30, 99, 0.12)",
    },
  ];

  return (
    <Grid container spacing={2}>
      {stats.map((item, index) => (
        <Grid
          key={index}
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            xl: 3,
          }}
        >
          <Card
            elevation={0}
            sx={{
              height: "100%",
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              transition: "0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: 2,
              },
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Avatar
                  variant="rounded"
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    bgcolor: item.bg,
                  }}
                >
                  <Box
                    component="img"
                    src={item.icon}
                    alt={item.title}
                    sx={{
                      width: 32,
                      height: 32,
                      objectFit: "contain",
                    }}
                  />
                </Avatar>

                <Box flex={1} minWidth={0}>
                  <Typography
                    variant="body1"
                    color="secondary.main"
                    fontWeight={600}
                    mb={1}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{
                      wordBreak: "break-word",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {item.value}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" mt={0.5}>
                    {item.subtitle}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

function UserInfo({ user }) {
  const form = useForm();
  React.useEffect(() => {
    if (!user) return;
    form.reset({
      profilePicture: user.profilePicture ?? "/images/logo/user.png",
    });
  }, [user]);
  const userData = [
    {
      icon: <CakeIcon sx={{ fontSize: 18 }} />,
      label: "Birth Date",
      value: new Date(user?.dob).showDate(),
    },
    {
      icon: <EventNoteIcon sx={{ fontSize: 18 }} />,
      label: "Joined on",
      value: new Date(user?.createdAt).showDate(),
    },
    {
      icon: <EmailIcon sx={{ fontSize: 18 }} />,
      label: "Email",
      value: user?.mail,
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 18 }} />,
      label: "Mobile",
      value: `+${user?.phone}`,
    },
  ];
  // return <pre>{JSON.stringify(user, null, 2)}</pre>
  return (
    <Grid
      size={12}
      container
      p={{ xs: 2, xl: 4 }}
      spacing={1}
      alignItems={"center"}
      alignContent={"flex-start"}
      alignSelf={{ md: "flex-start", xl: "stretch" }}
      justifyContent={"space-between"}
      sx={{
        border: (theme) => `1px solid ${theme.palette.primary.main}`,
        background: "var(--bg-primary-gradient)",
        borderRadius: 4,
        color: "white",
      }}
    >
      <Grid
        size={12}
        container
        component="form"
        onSubmit={form.handleSubmit(async (e) => {
          e.preventDefault();
          console.log(e);
        })}
        justifyContent={{ xs: "center", md: "space-between" }}
        alignItems={"center"}
        pb={1.5}
        mb={1.5}
        borderBottom={{ md: `1px solid rgba(255, 255, 255, 0.3)`, xs: "none" }}
        spacing={0}
      >
        <Grid
          size={12}
          position={"relative"}
          container
          justifyContent="center"
          alignItems="center"
          p={1}
        >
          <Form.Upload
            form={form}
            name="profilePicture"
            tooltipTitle={"Profile Picture"}
            endpoint="/api/v1/upload/image"
            accept={"image/*"}
            hideCaption={true}
            sx={{
              height: "140px",
              width: "140px",
              borderRadius: "50%",
              border: `2px solid #fff`,
            }}
            containerSx={{
              alignItems: "center",
            }}
            onUpload={async (e) => {
              const updatedValue = form.watch();
              let temp = await api.put(`/api/v1/me`, updatedValue);
              useToast(temp);
              user.Reload();
            }}
          />
        </Grid>
        <Grid
          size={12}
          container
          direction="column"
          alignItems={"center"}
          spacing={0}
        >
          <Box display={"flex"} alignItems="center">
            <Typography fontSize={"18px"} color="#ffe" fontWeight={"600"}>
              {user?.fullName}
            </Typography>
            {getGenderIcon(user?.gender)}
          </Box>
          {user?.isMinor && (
            <>
              <Box display={"flex"} alignItems="center" mt={1}>
                <Typography color="secondary" fontWeight={"600"}>
                  {user?.parent?.name?.first}
                  <span
                    style={{
                      paddingLeft: "0.5rem",
                      textTransform: "capitalize",
                    }}
                  >
                    [{user?.parent?.relation}]
                  </span>
                </Typography>
              </Box>

              <Typography fontWeight={600} fontSize={12}>
                {user?.parent?.email}
              </Typography>
            </>
          )}
          <Rating
            name="account-rating"
            value={5 * ((user?.qualityScore ?? 0) / 200)}
            precision={0.5}
            readOnly
            size="large"
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
            sx={{ pb: 2 }}
          />
        </Grid>
        <Grid
          size={12}
          container
          spacing={2}
          justifyContent="flex-start"
          direction={"column"}
          alignItems="center"
          borderTop={{ xs: `1px solid rgba(255, 255, 255, 0.3)`, md: "none" }}
          borderBottom={{
            xs: `1px solid rgba(255, 255, 255, 0.3)`,
            md: "none",
          }}
          py={{ xs: 1, md: 0 }}
        >
          {userData.map((user, index) => {
            return (
              <Grid
                key={index}
                size={12}
                container
                alignItems="center"
                spacing={0}
              >
                <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
                  {user.icon}
                </Box>
                <Typography sx={{ color: "#eee", pr: 0.5 }}>
                  {user.label}:
                </Typography>
                <Typography component="span" color="#fff">
                  {user.value}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </Grid>

      <Payment />
      <SocialAccounts user={user} />
      {/* </Grid> */}
    </Grid>
  );
}

function Payment() {
  const [openPayment, setOpenPayment] = React.useState(false);
  const [selectedMethod, setSelectedMethod] = React.useState("Wire Transfer");
  const [payment, setPayment] = React.useState({});
  const member = useMember();
  React.useEffect(() => {
    if (!member) return;
    setPayment({
      ...member.paymentMethod,
      value: member?.paymentMethod?.details,
    });
  }, [member]);

  const paymentMethods = [
    { name: "PayPal", icon: "/images/payment/paypal.png" },
    { name: "Wire Transfer", icon: "/images/payment/wire-transfer.png" },
    { name: "Amazon", icon: "/images/payment/amazone.png" },
    { name: "UPI", icon: "/images/payment/upi.png" },
  ];

  const handleSave = async (method, value) => {
    let resp = await api.patch("/api/v1/me/payment-method", {
      method,
      details: {
        ...value,
      },
    });
    console.log(resp);
    // console.log({value})
    setPayment({ method, value });
    setOpenPayment(false);
  };

  return (
    <Grid size={12} container spacing={2} justifyContent="center">
      {/* Header */}
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={1}
        pt={1}
        minHeight={46}
      >
        <Typography
          sx={{
            fontSize: "15px",
            fontWeight: 600,
            borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
            // borderBottom: (theme) => `2px solid ${theme.palette.primary.main}`,
            pb: 0.5,
          }}
        >
          Payment Method
        </Typography>
        {payment?.method && (
          <IconButton
            onClick={() => setOpenPayment(true)}
            sx={{ color: "#fff" }}
          >
            <EditIcon sx={{ fontSize: 22 }} />
          </IconButton>
        )}
      </Box>

      {/* Payment display */}
      <Grid
        container
        size={12}
        direction="column"
        spacing={0}
        px={2}
        py={2}
        sx={{
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: 2,
        }}
      >
        {payment?.method ? (
          <Grid container size={12} alignItems="center" py={{ xs: 0, md: 1 }}>
            <Typography
              width={{ xs: "100%", lg: "40%" }}
              fontWeight={payment.method === "Wire Transfer" ? 600 : 500}
            >
              {payment.method}:
            </Typography>
            {["PayPal", "UPI", "Amazon"].includes(payment?.method) ? (
              <Typography fontWeight={500}>
                {payment?.value?.account}
              </Typography>
            ) : (
              <Grid size={12} mt={1.5}>
                <Grid
                  size={12}
                  container
                  alignItems="center"
                  borderBottom={"1px solid #fff"}
                  py={1}
                >
                  <Typography
                    width={{ xs: "100%", lg: "40%" }}
                    fontWeight={500}
                  >
                    Bank:
                  </Typography>
                  <Typography component="span" fontWeight={500}>
                    {payment?.value?.bank}
                  </Typography>{" "}
                </Grid>
                <Grid
                  size={12}
                  container
                  alignItems="center"
                  borderBottom={"1px solid #fff"}
                  py={1}
                >
                  <Typography
                    width={{ xs: "100%", lg: "40%" }}
                    fontWeight={500}
                  >
                    IFSC/IBAN/SWIFT Code:
                  </Typography>
                  <Typography component="span" fontWeight={500}>
                    {payment?.value?.ifsc}
                  </Typography>{" "}
                </Grid>
                <Grid size={12} container alignItems="center" py={1}>
                  <Typography
                    width={{ xs: "100%", lg: "40%" }}
                    fontWeight={500}
                  >
                    Account Number:
                  </Typography>
                  <Typography component="span" fontWeight={500}>
                    {payment?.value?.account}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
        ) : (
          <Typography py={1}>
            No Payment method selected yet.{" "}
            <Typography
              component={"span"}
              fontWeight={700}
              sx={{ cursor: "pointer" }}
              onClick={() => setOpenPayment(true)}
            >
              Click to add
            </Typography>
          </Typography>
        )}
      </Grid>

      {/* Payment Popup */}
      <PopUp
        title="Select Payment Method"
        maxWidth="md"
        open={openPayment}
        onClose={() => setOpenPayment(false)}
      >
        <Grid
          size={12}
          container
          alignItems="center"
          sx={{ bgcolor: (theme) => theme.palette.cardbg.main }}
        >
          {/* Payment options */}
          <Grid
            container
            size={12}
            alignItems="center"
            spacing={3}
            justifyContent="space-evenly"
            pt={5}
            pb={3}
          >
            <RadioGroup
              row
              value={selectedMethod}
              onChange={(event) => setSelectedMethod(event.target.value)}
              style={{ justifyContent: "space-evenly", width: "100%" }}
            >
              {paymentMethods.map((method, index) => (
                <FormControlLabel
                  key={index}
                  value={method.name}
                  control={<Radio />}
                  label={
                    <Box
                      component="img"
                      src={method.icon}
                      alt={method.name}
                      sx={{
                        height: 63,
                        width: 100,
                        mr: 2,
                        p: 1,
                        borderRadius: 2,
                        cursor: "pointer",
                        border: (theme) =>
                          selectedMethod === method.name
                            ? `2px solid ${theme.palette.primary.main}`
                            : "2px solid transparent",
                        boxShadow: (theme) =>
                          selectedMethod === method.name
                            ? `0 0 8px ${theme.palette.secondary.main}`
                            : "none",
                        transition: "0.2s",
                      }}
                    />
                  }
                />
              ))}
            </RadioGroup>
          </Grid>

          {/* Dynamic input form */}
          <Grid size={12} container py={2}>
            {/* PayPal */}
            <Collapse
              in={selectedMethod === "PayPal"}
              unmountOnExit
              sx={{ width: "100%" }}
            >
              <Grid
                container
                size={12}
                px={2}
                justifyContent="center"
                spacing={0}
              >
                <Typography
                  mb={1}
                  fontSize={16}
                  fontWeight={600}
                  color="secondary"
                >
                  Enter your PayPal Email
                </Typography>
                <Page.Input
                  value={
                    payment.method === "PayPal" ? payment?.value?.account : ""
                  }
                  onChange={(e) =>
                    setPayment({
                      method: "PayPal",
                      value: { account: e.target.value },
                    })
                  }
                />
                <Button
                  onClick={() => handleSave("PayPal", payment.value)}
                  variant="contained"
                  color="secondary"
                  sx={{ my: 2, fontWeight: 600, color: "white", px: 2 }}
                >
                  Save
                </Button>
              </Grid>
            </Collapse>

            {/* Wire Transfer */}
            <Collapse
              in={selectedMethod === "Wire Transfer"}
              unmountOnExit
              sx={{ width: "100%" }}
            >
              <Grid
                container
                size={12}
                px={2}
                justifyContent="center"
                spacing={2}
              >
                <Grid size={6} container spacing={0}>
                  <Typography fontSize={16} fontWeight={600} color="secondary">
                    Bank
                  </Typography>
                  <Page.Input
                    value={
                      payment.method === "Wire Transfer"
                        ? payment.value.bank || ""
                        : ""
                    }
                    onChange={(e) =>
                      setPayment((prev) => ({
                        method: "Wire Transfer",
                        value: { ...prev.value, bank: e.target.value },
                      }))
                    }
                  />
                </Grid>
                <Grid size={6} container spacing={0}>
                  <Typography fontSize={16} fontWeight={600} color="secondary">
                    IFSC/IBAN/SWIFT Code
                  </Typography>
                  <Page.Input
                    value={
                      payment.method === "Wire Transfer"
                        ? payment.value.ifsc || ""
                        : ""
                    }
                    onChange={(e) =>
                      setPayment((prev) => ({
                        method: "Wire Transfer",
                        value: { ...prev.value, ifsc: e.target.value },
                      }))
                    }
                  />
                </Grid>
                <Grid size={12} container spacing={0}>
                  <Typography fontSize={16} fontWeight={600} color="secondary">
                    Enter your Account Number
                  </Typography>
                  <Page.Input
                    value={
                      payment.method === "Wire Transfer"
                        ? payment.value.account || ""
                        : ""
                    }
                    onChange={(e) =>
                      setPayment((prev) => ({
                        method: "Wire Transfer",
                        value: { ...prev.value, account: e.target.value },
                      }))
                    }
                  />
                </Grid>
                <Button
                  onClick={() => handleSave("Wire Transfer", payment.value)}
                  variant="contained"
                  color="secondary"
                  sx={{ my: 2, color: "white", px: 2, fontWeight: 600 }}
                >
                  Save
                </Button>
              </Grid>
            </Collapse>

            {/* Amazon */}
            <Collapse
              in={selectedMethod === "Amazon"}
              unmountOnExit
              sx={{ width: "100%" }}
            >
              <Grid
                container
                size={12}
                px={2}
                justifyContent="center"
                spacing={0}
              >
                <Typography
                  mb={1}
                  fontSize={16}
                  fontWeight={600}
                  color="secondary"
                >
                  Enter your Amazon Email
                </Typography>
                <Page.Input
                  value={
                    payment.method === "Amazon" ? payment?.value?.account : ""
                  }
                  onChange={(e) =>
                    setPayment({
                      method: "Amazon",
                      value: { account: e.target.value },
                    })
                  }
                />
                <Button
                  onClick={() => handleSave("Amazon", payment.value)}
                  variant="contained"
                  color="secondary"
                  sx={{ my: 2, fontWeight: 600, color: "white", px: 2 }}
                >
                  Save
                </Button>
              </Grid>
            </Collapse>

            {/* UPI */}
            <Collapse
              in={selectedMethod === "UPI"}
              unmountOnExit
              sx={{ width: "100%" }}
            >
              <Grid
                container
                size={12}
                px={2}
                justifyContent="center"
                spacing={0}
              >
                <Typography
                  mb={1}
                  fontSize={16}
                  fontWeight={600}
                  color="secondary"
                >
                  Enter your UPI ID
                </Typography>
                <Page.Input
                  value={
                    payment.method === "UPI" ? payment?.value?.account : ""
                  }
                  onChange={(e) =>
                    setPayment({
                      method: "UPI",
                      value: { account: e.target.value },
                    })
                  }
                />
                <Button
                  onClick={() => handleSave("UPI", payment.value)}
                  variant="contained"
                  color="secondary"
                  sx={{ my: 2, fontWeight: 600, color: "white", px: 2 }}
                >
                  Save
                </Button>
              </Grid>
            </Collapse>
          </Grid>
        </Grid>
      </PopUp>
    </Grid>
  );
}

function SocialAccounts({ user }) {
  const [openContact, setOpenContact] = React.useState(false);

  const [contact, setContact] = React.useState({
    whatsapp: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    twitter: "",
  });
  React.useEffect(() => {
    if (!user) return;
    // console.log(user.socials);
    setContact(
      user.socials.reduce((a, c) => {
        a[c.channel] = c.account;
        return a;
      }, {}),
    );
  }, [user]);
  const handleChange = (key) => (e) => {
    setContact((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const contactIcons = {
    WhatsApp: <WhatsAppIcon sx={{ color: "#25D366" }} />,
    Instagram: <InstagramIcon sx={{ color: "#C13584" }} />,
    Facebook: <FacebookIcon sx={{ color: "#3b5998" }} />,
    Linkedin: <LinkedInIcon sx={{ color: "#0e76a8" }} />,
    YouTube: <YouTubeIcon sx={{ color: "#FF0000" }} />,
    Twitter: <XIcon sx={{ color: "black" }} />,
  };

  const socialChannels = [
    {
      name: "WhatsApp",
      key: "whatsapp",
      icon: <WhatsAppIcon sx={{ color: "#25D366" }} />,
    },
    {
      name: "Instagram",
      key: "instagram",
      icon: <InstagramIcon sx={{ color: "#C13584" }} />,
    },
    {
      name: "Facebook",
      key: "facebook",
      icon: <FacebookIcon sx={{ color: "#3b5998" }} />,
    },
    {
      name: "LinkedIn",
      key: "linkedin",
      icon: <LinkedInIcon sx={{ color: "#0e76a8" }} />,
    },
    {
      name: "YouTube",
      key: "youtube",
      icon: <YouTubeIcon sx={{ color: "#FF0000" }} />,
    },
    {
      name: "X (formerly Twitter)",
      key: "twitter",
      icon: <XIcon sx={{ color: "black" }} />,
    },
  ];

  return (
    <Grid size={12} container spacing={2} justifyContent="center">
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={1}
        pt={1}
        minHeight={46}
      >
        <Typography
          sx={{
            fontSize: "15px",
            fontWeight: 600,
            borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
            pb: 0.5,
          }}
        >
          Social Contacts
        </Typography>
        {Object.values(contact).some((value) => value?.trim()) && (
          <IconButton
            onClick={() => setOpenContact(true)}
            sx={{ color: "#fff" }}
          >
            <EditIcon sx={{ fontSize: 22 }} />
          </IconButton>
        )}
      </Box>

      <Grid
        container
        size={12}
        direction="column"
        spacing={0}
        px={1}
        py={1}
        sx={{
          // border: (theme) => `1px solid ${theme.palette.primary.main}`,
          // bgcolor: (theme) => theme.palette.cardbg.main,
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: 2,
        }}
      >
        {Object.entries(contact).filter(([_, value]) => value?.trim())
          .length ? (
          Object.entries(contact)
            .filter(([_, value]) => value?.trim())
            .map(([key, value], index, arr) => (
              <Grid
                key={index}
                container
                size={12}
                alignItems="center"
                borderBottom={
                  index !== arr.length - 1 ? "1px solid #fff" : "none"
                }
                py={1}
                px={2}
              >
                <Grid
                  size={{ xs: 12, lg: 4 }}
                  alignItems="center"
                  container
                  gap={1}
                >
                  {contactIcons[key]}
                  <Typography fontWeight={500}>{key}</Typography>
                </Grid>

                <Typography fontWeight={600}>{value}</Typography>
              </Grid>
            ))
        ) : (
          <Typography py={1}>
            No social contact method added.{" "}
            <Typography
              component={"span"}
              fontWeight={700}
              sx={{ cursor: "pointer" }}
              onClick={() => setOpenContact(true)}
            >
              Click to add
            </Typography>
          </Typography>
        )}
      </Grid>

      <PopUp
        maxWidth="md"
        title="Add Contact"
        open={openContact}
        onClose={() => setOpenContact(false)}
      >
        <Grid
          size={12}
          container
          alignItems="center"
          justifyContent="center"
          px={2}
          pt={2}
          sx={{ bgcolor: (theme) => theme.palette.cardbg.main }}
        >
          <Grid size={12} container spacing={2} justifyContent="center" p={2}>
            {socialChannels.map(({ name, key, icon }, index) => (
              <Grid key={index} container size={6} spacing={0}>
                <Typography fontSize={16} fontWeight={600} color="secondary">
                  {name}
                </Typography>
                <Page.Input
                  value={contact[key]}
                  onChange={handleChange(key)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end" disabled>
                          {icon}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            ))}
          </Grid>

          <Button
            onClick={async () => {
              const socials = Object.entries(contact).map((c) => ({
                channel: c[0],
                account: c[1],
              }));
              const resp = await api.put(`/api/v1/me`, { socials });
              useToast(resp);
              setOpenContact(false);
              user.Reload();
            }}
            variant="contained"
            color="secondary"
            sx={{
              my: 3,
              fontWeight: 600,
              color: "white",
              px: 2,
              py: 0.5,
            }}
          >
            Save
          </Button>
        </Grid>
      </PopUp>
    </Grid>
  );
}

function TabPanel({ children, value, index }) {
  return (
    <Fade in={value === index} timeout={1000} unmountOnExit>
      <Box hidden={value !== index} sx={{ width: "100%" }}>
        {" "}
        {value === index && children}
      </Box>
    </Fade>
  );
}

function Summary() {
  const router = useRouter();
  const [points, setPoints] = React.useState(0); //todo: set from api call
  const [conversionRate, setConversionRate] = React.useState(1); //todo: set conversion rate from api call
  const [threshold, setThreshold] = React.useState(1500); //todo: set from server config
  React.useEffect(() => {
    api
      .get(`/api/v1/me/points`)
      .then((resp) => {
        if (resp.status === "error") router.replace("/survey?name=welcome");
        let data = resp.data;
        setPoints(data.totalPoints);
        setThreshold(data.threshold);
        setConversionRate(data.conversionRate);
      })
      .catch((err) => { })
      .finally(() => { });
  }, []);
  const rewardSummary = [
    {
      label: "Current Rewards",
      value: `${points}pts`,
    },
    {
      label: "Conversion",
      value: `$${(Number(points) * Number(conversionRate)).toFixed(2)}`,
    },
    {
      label: "Needed reward points for payout",
      value: `${threshold - points}pts`,
    },
  ];
  const [activeTab, setActiveTab] = React.useState(0);
  const tabs = [
    {
      label: "Rewards Processed Summary",
      render: (
        <Grid size={12} container justifyContent="center" py={7}>
          No Reward Processed yet.
        </Grid>
      ),
    },
    {
      label: "Rejected Responses",
      render: (
        <Grid size={12} container justifyContent="center" py={7}>
          No Rejected Responses.
        </Grid>
      ),
    },
  ];

  return (
    <Grid size={12} container px={1} mt={2} justifyContent="center">
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
            color: "secondary.main !important",

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
