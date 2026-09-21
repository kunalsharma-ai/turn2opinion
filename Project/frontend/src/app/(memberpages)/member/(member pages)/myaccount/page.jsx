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
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";

import { Form } from "@/components";
import PopUp from "@/componentsMHO/PopUp";
import { api, loadData, Page } from "@/util";
import DataList from "@/componentsMHO/DataList";
import { useMember } from "@/Context";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import { useToast } from "@/hooks";
import MyAccountPoints from "../../components/MyAccountPoints";
const paymentMethods = {
  paypal: "/images/payment/paypal.png",
  "wire-transfer": "/images/payment/wire-transfer.png",
  "amazon-gift-card": "/images/payment/amazone.png",
  upi: "/images/payment/upi.png",
};

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
      <Grid container size={{ xs: 12, md: 6, xl: 3 }} alignSelf={"flex-start"}>
        <UserInfo user={user} />
      </Grid>

      <Grid container size={{ xs: 12, md: 6, xl: 9 }} alignContent="flex-start">
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

  const [visibleFields, setVisibleFields] = React.useState({});

  const toggleField = (index) => {
    setVisibleFields((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const maskValue = (value) => {
    return value ? "xxxxxx" : "";
  };

  React.useEffect(() => {
    if (!user) return;
    form.reset({
      profilePicture: user.profilePicture ?? "/images/logo/user.png",
    });
  }, [user]);

  const rating =
    user?.qualityScoreTotal > 0
      ? Math.round(
          ((user?.qualityScore ?? 0) / user.qualityScoreTotal) * 5 * 2,
        ) / 2
      : 0;

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
            value={rating}
            precision={0.5}
            readOnly
            size="large"
            emptyIcon={
              <StarIcon
                style={{ opacity: 0.28, color: "#fff" }}
                fontSize="inherit"
              />
            }
            sx={{
              pb: 2,
              "& .MuiRating-iconFilled": {
                color: "#FFD54F",
              },
            }}
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
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <Typography
                    component="span"
                    sx={{
                      color: "#fff",
                      fontWeight: 600,
                      wordBreak: "break-word",
                      flex: 1,
                    }}
                  >
                    {visibleFields[index] ? user.value : maskValue(user.value)}
                  </Typography>

                  <IconButton
                    size="small"
                    onClick={() => toggleField(index)}
                    sx={{ color: "#fff", ml: 1 }}
                  >
                    {visibleFields[index] ? (
                      <VisibilityOffIcon fontSize="small" />
                    ) : (
                      <VisibilityIcon fontSize="small" />
                    )}
                  </IconButton>
                </Box>
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
  const [paymentOptions, setPaymentOptions] = React.useState([]);
  const [openPayment, setOpenPayment] = React.useState(false);
  const [selectedMethod, setSelectedMethod] = React.useState("Wire Transfer");
  const [payment, setPayment] = React.useState({});

  const [visibleFields, setVisibleFields] = React.useState({});

  const toggleField = (index) => {
    setVisibleFields((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const maskValue = (value) => {
    return value ? "xxxxxx" : "";
  };

  const member = useMember();
  React.useState(() => {
    loadData(
      api.get(`/api/v1/option/payment-method`),
      (resp) => {
        setPaymentOptions(resp.data);
      },
      () => {},
    );
  }, []);
  React.useEffect(() => {
    if (!member) return;

    setPayment({
      method: member["payment-method"],
      ifsc: member["payment-method-bank-ifsc"],
      bankAccount: member["payment-method-bank-account"],
      bankName: member["payment-method-bank-name"],
      amazonAccount: member["payment-method-amazon"],
      paypalAccount: member["payment-method-paypal"],
      upiAccount: member["payment-method-upi"],
    });
  }, [member]);

  const handleSave = async (method, value) => {
    const resp = await api.patch(`/api/v1/me/answer`, {
      "payment-method": payment.method,
      "payment-method-bank-ifsc": payment.ifsc,
      "payment-method-bank-account": payment.bankAccount,
      "payment-method-bank-name": payment.bankName,
      "payment-method-amazon": payment.amazonAccount,
      "payment-method-paypal": payment.paypalAccount,
      "payment-method-upi": payment.upiAccount,
    });
    await member.Reload();
    useToast(resp);
    setOpenPayment(false);
  };
  const accountDetails = React.useMemo(() => {
    switch (payment.method) {
      case "wire-transfer":
        return [
          {
            name: "Bank",
            value: payment.bankName,
          },
          {
            name: "IFSC / Swift / IBAN Code",
            value: payment.ifsc,
          },
          {
            name: "Account Number",
            value: payment.bankAccount,
          },
        ];
        break;
      case "upi":
        return [
          {
            name: "Virtual Payment Address (VPA)",
            value: payment.upiAccount,
          },
        ];
        break;
      case "paypal":
        return [
          {
            name: "Paypal Account",
            value: payment.paypalAccount,
          },
        ];
        break;
      case "amazon-gift-card":
        return [
          {
            name: "Amazon ID",
            value: payment.amazonAccount,
          },
        ];
        break;
      default:
        break;
    }
  }, [payment]);
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
        px={1.5}
        py={1}
        sx={{
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: 2,
        }}
      >
        {payment?.method ? (
          <Grid container size={12} alignItems="center" py={{ xs: 0, md: 1 }}>
            <Typography>
              {payment.method === "wire-transfer"
                ? "Wire Transfer"
                : payment.method === "upi"
                  ? "UPI"
                  : payment.method === "amazon-gift-card"
                    ? "Amazon Gift Card"
                    : payment.method === "paypal"
                      ? "PayPal"
                      : payment.method}{" "}
              Details:
            </Typography>

            <Grid size={12} mt={1.5}>
              {accountDetails.map((detail, index) => (
                <Grid
                  size={12}
                  container
                  alignItems="center"
                  spacing={1}
                  borderBottom={"1px solid rgba(255, 255, 255, 0.3)"}
                  py={1}
                >
                  <Typography
                    width={{ xs: "100%", xl: "40%" }}
                    fontWeight={500}
                  >
                    {detail.name}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        color: "#fff",
                        fontWeight: 600,
                        wordBreak: "break-word",
                        flex: 1,
                      }}
                    >
                      {visibleFields[index]
                        ? detail.value
                        : maskValue(detail.value)}
                    </Typography>

                    <IconButton
                      size="small"
                      onClick={() => toggleField(index)}
                      sx={{ color: "#fff", ml: 1 }}
                    >
                      {visibleFields[index] ? (
                        <VisibilityOffIcon fontSize="small" />
                      ) : (
                        <VisibilityIcon fontSize="small" />
                      )}
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ) : (
          <Typography py={1} fontSize={12}>
            No Payment method selected yet.{" "}
            <Typography
              component={"span"}
              fontWeight={700}
              fontSize={12}
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
        onClose={async () => {
          await member.Reload();
          setOpenPayment(false);
        }}
      >
        <Grid
          size={12}
          container
          alignItems="center"
          sx={{ bgcolor: (theme) => theme.palette.cardbg.main }}
        >
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
              value={payment.method}
              onChange={(event) => {
                setPayment({ ...payment, method: event.target.value });
              }}
              style={{ justifyContent: "space-evenly", width: "100%" }}
            >
              {paymentOptions.map((method, index) => (
                <FormControlLabel
                  key={index}
                  value={method.value}
                  control={<Radio />}
                  label={
                    <Box
                      component="img"
                      src={paymentMethods[method.value]}
                      alt={method.label}
                      sx={{
                        height: 63,
                        width: 100,
                        mr: 2,
                        p: 1,
                        borderRadius: 2,
                        cursor: "pointer",
                        border: (theme) =>
                          payment.method === method.name
                            ? `2px solid ${theme.palette.primary.main}`
                            : "2px solid transparent",
                        boxShadow: (theme) =>
                          payment.method === method.name
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
              in={payment.method === "paypal"}
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
                  value={payment.paypalAccount}
                  onChange={(e) =>
                    setPayment({
                      ...payment,
                      paypalAccount: e.target.value,
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
              in={payment.method === "wire-transfer"}
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
                      payment.method === "wire-transfer" ? payment.bankName : ""
                    }
                    onChange={(e) => {
                      let temp = {
                        ...payment,
                        bankName: e.target.value,
                      };
                      setPayment(temp);
                    }}
                  />
                </Grid>
                <Grid size={6} container spacing={0}>
                  <Typography fontSize={16} fontWeight={600} color="secondary">
                    IFSC/IBAN/SWIFT Code
                  </Typography>
                  <Page.Input
                    value={
                      payment.method === "wire-transfer"
                        ? payment.ifsc || ""
                        : ""
                    }
                    onChange={(e) =>
                      setPayment({
                        ...payment,
                        ifsc: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid size={12} container spacing={0}>
                  <Typography fontSize={16} fontWeight={600} color="secondary">
                    Enter your Account Number
                  </Typography>
                  <Page.Input
                    value={
                      payment.method === "wire-transfer"
                        ? payment.bankAccount || ""
                        : ""
                    }
                    onChange={(e) =>
                      setPayment({
                        ...payment,
                        bankAccount: e.target.value,
                      })
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
              in={payment.method === "amazon-gift-card"}
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
                  Enter your Amazon Giftcard ID
                </Typography>
                <Page.Input
                  value={payment.amazonAccount}
                  onChange={(e) =>
                    setPayment({
                      ...payment,
                      amazonAccount: e.target.value,
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
              in={payment.method === "upi"}
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
                  value={payment.upiAccount}
                  onChange={(e) =>
                    setPayment({
                      ...payment,
                      upiAccount: e.target.value,
                    })
                  }
                />
                <Button
                  onClick={() => handleSave()}
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
    x: "",
  });
  React.useEffect(() => {
    if (!user) return () => {};
    setContact(
      Object.fromEntries(
        Object.entries(user)
          .filter((e) => e[0].startsWith("social-media"))
          .map((d) => [d[0].replace("social-media-", ""), d[1]]),
      ),
    );
  }, [user]);
  console.table(contact);
  const handleChange = (key) => (e) => {
    setContact((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const contactIcons = {
    whatsapp: <WhatsAppIcon sx={{ color: "#fff" }} />,
    instagram: <InstagramIcon sx={{ color: "#fff" }} />,
    facebook: <FacebookIcon sx={{ color: "#fff" }} />,
    linkedin: <LinkedInIcon sx={{ color: "#fff" }} />,
    youtube: <YouTubeIcon sx={{ color: "#fff" }} />,
    x: <XIcon sx={{ color: "#fff" }} />,
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
      key: "x",
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

      <Grid container size={12} spacing={1.5}>
        {Object.entries(contact).filter(([_, value]) => value?.trim())
          .length ? (
          Object.entries(contact)
            .filter(([_, value]) => value?.trim())
            .map(([key, value], index, arr) => (
              <Tooltip
                title={`${key?.Capitalize()} :  ${value}`}
                key={index}
                placement="top"
              >
                <Page.Box px={1.5}>{contactIcons[key]}</Page.Box>
              </Tooltip>
            ))
        ) : (
          <Page.Box
            px={1.5}
            py={1}
            sx={{
              width: "100%",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: 2,
            }}
          >
            <Typography py={1} fontSize={12}>
              No social contact method added.{" "}
              <Typography
                component={"span"}
                fontWeight={700}
                fontSize={12}
                sx={{ cursor: "pointer" }}
                onClick={() => setOpenContact(true)}
              >
                Click to add
              </Typography>
            </Typography>
          </Page.Box>
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
              const socials = Object.fromEntries(
                Object.entries(contact).map((c) => [
                  `social-media-${c[0]}`,
                  c[1],
                ]),
              );
              const resp = await api.patch(`/api/v1/me/answer`, socials);
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
      .catch((err) => {})
      .finally(() => {});
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
