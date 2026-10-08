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
  TextField,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarBorderIcon from "@mui/icons-material/StarBorder";
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
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";

import { Datatable, Form } from "@/components";
import { DateRangeSelector } from "@/components/Form";
import PopUp from "@/componentsMHO/PopUp";
import { api, loadData, Page } from "@/util";
import userValidator from "@/validators/user";
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

const getAge = (age) => {
  if(!age) return "";
  const { years = 0, month = 0, day = 0 } = age;
  return month > 0 || day > 0 ? years + 1 : years;
}

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
      icon: "/images/myaccount/approvedsurvey.png",
      bg: "rgba(0, 150, 136, 0.12)",
    },
    {
      title: "Rejected Surveys",
      value: (statistics?.rejected ?? 0).toLocaleString("en-US"),
      subtitle: "Rejected responses",
      icon: "/images/myaccount/rejectedsurvey.png",
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
  const form = useForm({
    mode:"onChange"
  });
    const {
    formState: { errors },
  } = form;

  const [editingField, setEditingField] = React.useState(null);
  const [visibleFields, setVisibleFields] = React.useState({});
  const defaultCountry = user?.country?.toLowerCase() || "us";

  const toggleField = (index) => {
    setVisibleFields((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const maskValue = (value) => {
    return value ? "xxxxxx" : "";
  };

  const handleAlternateEdit = (field) => {
    setEditingField(field);
  };

  const handleAlternateCancel = (field) => {
    const formField = field === "phone" ? "alternatePhone" : "alternateEmail";
    const dbField = field === "phone" ? "alternate-phone" : "alternate-email";

    form.setValue(formField, user?.[dbField] || "");
    setEditingField(null);
  };

  const handleAlternateDone = async (field) => {
    const fieldName =
      field === "email" ? "alternate-email" : "alternate-phone";

    const formField =
      field === "email" ? "alternateEmail" : "alternatePhone";

    const value = form.getValues(formField);

    try {
      const resp = await api.patch(`/api/v1/me/answer`, {
        [fieldName]: value,
      });

      useToast(resp);

      const alterResp = await api.post(`/api/v1/me`, {
        questions: ["alternate-email", "alternate-phone"],
      });

      user.update(alterResp.data);
      setEditingField(null);
    } catch (error) {
      console.error(`Failed to update ${fieldName}:`, error);
    }
  };

  React.useEffect(() => {
    if (!user) return;
    form.reset({
      profilePicture: user.profilePicture ?? "/images/logo/user.png",
      alternatePhone: user?.["alternate-phone"] || "",
      alternateEmail: user?.["alternate-email"] || "",
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
      type:"view",
      icon: <CakeIcon sx={{ fontSize: 18 }} />,
      label: "Birth Date",
      value: `${new Date(user?.dob).showDate()} (${getAge(user?.age)} yrs)`,
    },
    {
      type:"view",
      icon: <EventNoteIcon sx={{ fontSize: 18 }} />,
      label: "Joined on",
      value: new Date(user?.createdAt).showDate(),
    },
    {
      type: "view",
      truncate: true,
      icon: <EmailIcon sx={{ fontSize: 18 }} />,
      label: "Email",
      value: user?.mail,
    },
    {
      type: "edit",
      field: "email",
      icon: <EmailIcon sx={{ fontSize: 18 }} />,
      label: "Alternate Email",
      value: user?.["alternate-email"] || "",
      placeholder: "Enter alternate email",
    },
    {
      type: "view",
      icon: <PhoneIcon sx={{ fontSize: 18 }} />,
      label: "Mobile",
      value: `+${user?.phone}`,
    },
    {
      type: "edit",
      field: "phone",
      icon: <PhoneIcon sx={{ fontSize: 18 }} />,
      label: "Alternate Mobile",
      value: user?.["alternate-phone"] || "",
      placeholder: "Enter alternate phone",
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
          {userData.map((item, index) => {
            const isEdit = item.type === "edit";
            const isEditing = isEdit && editingField === item.field;
            const isTooltipField = [
              "Email",
              "Alternate Email",
              "Mobile",
              "Alternate Mobile",
            ].includes(item.label);
            const text = visibleFields[index] ? item.value : maskValue(item.value);

            const valueSx = {
              color: "#fff",
              fontWeight: 600,
              fontSize: 13,
              flex: 1,
              minWidth: 0,
              ...(isTooltipField
                ? { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }
                : { wordBreak: "break-word" }),
            };

            const valueNode = (
              <Typography component="span" noWrap={isTooltipField} sx={valueSx}>
                {text}
              </Typography>
            );

            return (
              <Grid key={index} size={12} container alignItems="flex-start" spacing={0}>
                <Box sx={{ mr: 1, display: "flex", alignItems: "center", pt: 0.3 }}>
                  {item.icon}
                </Box>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: "flex", alignItems: "center", width: "100%", minWidth: 0 }}>
                    <Typography sx={{ color: "#eee", pr: 0.5, whiteSpace: "nowrap" }}>
                      {item.label}:
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0 }}>
                      {isTooltipField && visibleFields[index] ? (
                        <Tooltip title={item.value || ""} placement="top">
                          {valueNode}
                        </Tooltip>
                      ) : (
                        valueNode
                      )}

                      {/* Pen: eye se value dikhne ke baad hi */}
                      {!isEditing && isEdit && visibleFields[index] && (
                        <IconButton
                          size="small"
                          onClick={() => handleAlternateEdit(item.field)}
                          sx={{ color: "#fff", ml: 0.5, flexShrink: 0 }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      )}

                      {/* Eye: editing ke time hide */}
                      {!isEditing && (
                        <IconButton
                          size="small"
                          onClick={() => toggleField(index)}
                          sx={{ color: "#fff", ml: 0.5, flexShrink: 0 }}
                        >
                          {visibleFields[index] ? (
                            <VisibilityOffIcon fontSize="small" />
                          ) : (
                            <VisibilityIcon fontSize="small" />
                          )}
                        </IconButton>
                      )}
                    </Box>
                  </Box>

                  {isEditing && (
                    <Box sx={{ display: "flex", alignItems: "center", width: "100%", mt: 0.5 }}>
                      {item.field === "phone" ? (
                        <Box sx={{ flex: 1, minWidth: 0, position: "relative", zIndex: 20 }}>
                          <Form.Phone
                            control={form.control}
                            name="alternatePhone"
                            onlyCountries={[defaultCountry]}
                            disableDropdown={true}
                            inputSX={{
                              backgroundColor: "transparent",
                              color: "#fff",
                              border: "none",
                              borderRadius: 0,
                              // borderBottom: "1px solid rgba(245, 160, 0, 0.5)",
                              boxShadow: "none",
                              paddingLeft: "52px",
                            }}
                          />
                        </Box>
                      ) : (
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Form.Input
                            control={form.control}
                            name="alternateEmail"
                            placeholder={item.placeholder}
                            autoFocus
                            required
                            errors={errors.alternateEmail}
                            validations={userValidator.email}
                            inputSX={{
                              color: "#fff",
                              fontSize: 13,
                              backgroundColor: "transparent",
                            }}
                            sx={{
                              "& .MuiInputBase-root": { backgroundColor: "transparent" },
                              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                              "& .MuiInput-underline:before": {
                                borderBottomColor: "rgba(245, 160, 0, 0.5)",
                              },
                              "& .MuiInput-underline:hover:before": {
                                borderBottomColor: "secondary.main",
                              },
                              "& .MuiInput-underline:after": {
                                borderBottomColor: "secondary.main",
                              },
                              "& .MuiInputBase-input": { color: "#fff" },
                            }}
                          />
                        </Box>
                      )}

                      <IconButton
                        size="small"
                        onClick={() => {
                          if(!errors.alternateEmail) handleAlternateDone(item.field)}
                        }
                        sx={{ color: "#fff", ml: 0.5, flexShrink: 0 }}
                      >
                        <CheckIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        size="small"
                        onClick={() => handleAlternateCancel(item.field)}
                        sx={{ color: "#fff", ml: 0.5, flexShrink: 0 }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  )}
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
const methodFieldsConfig = {
  "wire-transfer": [
    { key: "bankName", label: "Bank", placeholder: "Enter bank name" },
    { key: "ifsc", label: "IFSC/IBAN/SWIFT", placeholder: "Enter IFSC/IBAN/SWIFT code" },
    { key: "bankAccount", label: "Account Number", placeholder: "Enter account number" },
  ],
  upi: [{ key: "upiAccount", label: "VPA", placeholder: "Enter UPI ID" }],
  paypal: [{ key: "paypalAccount", label: "PayPal Email", placeholder: "Enter PayPal email" }],
  "amazon-gift-card": [
    { key: "amazonAccount", label: "Amazon ID", placeholder: "Enter Amazon Giftcard ID" },
  ],
};

function Payment() {
  const [paymentOptions, setPaymentOptions] = React.useState([]);
  const [payment, setPayment] = React.useState({});
  const [expandedMethod, setExpandedMethod] = React.useState(false);
  const [editing, setEditing] = React.useState(null);
  const [editBackup, setEditBackup] = React.useState(null);
  const [primaryMethod, setPrimaryMethod] = React.useState(null);

  const member = useMember();

  React.useEffect(() => {
    loadData(
      api.get(`/api/v1/option/payment-method`),
      (resp) => {
        setPaymentOptions(resp.data);
      },
      () => {},
    );
  }, []);
  React.useEffect(() => {
    api
      .post(`/api/v1/me`, {
        questions: [
          "payment-method",
          "payment-method-bank-ifsc",
          "payment-method-bank-account",
          "payment-method-bank-name",
          "payment-method-amazon",
          "payment-method-paypal",
          "payment-method-upi",
          "payment-method-primary",
        ],
      })
      .then((resp) => {
        const data = resp.data;
        setPayment({
          method: data["payment-method"],
          ifsc: data["payment-method-bank-ifsc"],
          bankAccount: data["payment-method-bank-account"],
          bankName: data["payment-method-bank-name"],
          amazonAccount: data["payment-method-amazon"],
          paypalAccount: data["payment-method-paypal"],
          upiAccount: data["payment-method-upi"],
        });
        setPrimaryMethod(data["payment-method-primary"] || null);
      })
      .catch((err) => console.error(err));
  }, []);

  const hasData = (methodValue) => {
    const fields = methodFieldsConfig[methodValue] || [];
    return fields.some((f) => payment[f.key]?.toString().trim());
  };

  const handleFieldChange = (key) => (e) => {
    setPayment((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleAccordionChange = (methodValue) => (e, isExpanded) => {
  setExpandedMethod(isExpanded ? methodValue : false);
  if (!isExpanded) handleCancelEdit();   // accordion band ho to edit cancel
};

const handleEditField = (methodValue, fieldKey) => {
  // pehle koi aur field edit mein tha to uski value wapas kar do
  if (editing && editBackup !== null) {
    setPayment((prev) => ({ ...prev, [editing.field]: editBackup }));
  }
  setEditBackup(payment[fieldKey] ?? "");
  setEditing({ method: methodValue, field: fieldKey });
};

const handleCancelEdit = () => {
  if (editing && editBackup !== null) {
    setPayment((prev) => ({ ...prev, [editing.field]: editBackup }));
  }
  setEditing(null);
  setEditBackup(null);
};

const handleSaveField = async (fieldKey) => {
  const apiKeyMap = {
    ifsc: "payment-method-bank-ifsc",
    bankAccount: "payment-method-bank-account",
    bankName: "payment-method-bank-name",
    amazonAccount: "payment-method-amazon",
    paypalAccount: "payment-method-paypal",
    upiAccount: "payment-method-upi",
  };

  try {
    const resp = await api.patch(`/api/v1/me/answer`, {
      [apiKeyMap[fieldKey]]: payment[fieldKey],   // sirf ek field
    });
    useToast(resp);
    await member.Reload();
  } catch (error) {
    console.error(`Failed to update ${fieldKey}:`, error);
  } finally {
    setEditing(null);
    setEditBackup(null);
  }
};

  const handleSetPrimary = async (methodValue) => {
    setPrimaryMethod(methodValue);
    try {
      const resp = await api.patch(`/api/v1/me/answer`, {
        "payment-method-primary": methodValue,
      });
      useToast(resp);
    } catch (error) {
      console.error(`Failed to set primary payment method:`, error);
    }
  };

  return (
    <Grid size={12} container spacing={2} justifyContent="center">
      {/* Header */}
      <Box width="100%" display="flex" alignItems="center" px={1} pt={1} minHeight={46}>
        <Typography
          sx={{
            fontSize: "15px",
            fontWeight: 600,
            borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
            pb: 0.5,
          }}
        >
          Payment Methods
        </Typography>
      </Box>

      <Grid size={12} container spacing={1}>
        {paymentOptions.map((method, index) => {
          const methodValue = method.value;
          // const isEditing = editingMethod === methodValue;
          const filled = hasData(methodValue);
          const isPrimary = primaryMethod === methodValue;
          const fields = methodFieldsConfig[methodValue] || [];

          return (
            <Grid size={12} key={index}>
              <Accordion
                expanded={expandedMethod === methodValue}
                onChange={handleAccordionChange(methodValue)}
                sx={{
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#fff",
                  "&:before": { display: "none" },
                  borderRadius: "10px !important",
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}>
                  <Box sx={{ display: "flex", alignItems: "center", width: "100%", gap: 1 }}>
                    {filled && (
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: "secondary.main",
                          flexShrink: 0,
                        }}
                      />
                    )}

                    <Typography sx={{ flex: 1, fontWeight: 500 }}>{method.label}</Typography>

                    <IconButton
                      component="span"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSetPrimary(methodValue);
                      }}
                      sx={{ color: isPrimary ? "secondary.main" : "#fff" }}
                    >
                      {isPrimary ? (
                        <StarIcon fontSize="small" />
                      ) : (
                        <StarBorderIcon fontSize="small" />
                      )}
                    </IconButton>
                  </Box>
                </AccordionSummary>

                <AccordionDetails>
                  <Grid container spacing={1}>
                    {fields.map((f) => {
                      const isFieldEditing =
                        editing?.method === methodValue && editing?.field === f.key;

                      return (
                        <Grid key={f.key} size={12} container alignItems="center" spacing={0}
                          sx={{ background: "rgba(255,255,255,0.06)", borderRadius: "10px", px: 1.5, py: 1 }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0 }}>
                            {isFieldEditing ? (
                              <TextField
                                fullWidth
                                variant="standard"
                                autoFocus
                                value={payment[f.key] || ""}
                                onChange={handleFieldChange(f.key)}
                                placeholder={f.placeholder}
                                size="small"
                                InputProps={{ disableUnderline: true }}
                                sx={{ flex: 1, minWidth: 0, "& .MuiInputBase-input": { color: "#fff", fontSize: 13 } }}
                              />
                            ) : (
                              <Typography
                                component="span"
                                noWrap
                                sx={{
                                  color: payment[f.key] ? "#fff" : "rgba(255,255,255,0.55)",
                                  fontWeight: 600, flex: 1, fontSize: 13,
                                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0,
                                }}
                              >
                                {payment[f.key] ? "xxxxxx" : f.placeholder}
                              </Typography>
                            )}

                            <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0, ml: 1 }}>
                              <IconButton
                                size="small"
                                onClick={() =>
                                  isFieldEditing
                                    ? handleSaveField(f.key)
                                    : handleEditField(methodValue, f.key)
                                }
                                sx={{ color: isFieldEditing ? "secondary.main" : "#fff" }}
                              >
                                {isFieldEditing ? <CheckIcon fontSize="small" /> : <EditIcon fontSize="small" />}
                              </IconButton>

                              {isFieldEditing && (
                                <IconButton
                                  size="small"
                                  onClick={handleCancelEdit}
                                  sx={{ color: "#fff", ml: 0.5 }}
                                >
                                  <CloseIcon fontSize="small" />
                                </IconButton>
                              )}
                            </Box>
                          </Box>
                        </Grid>
                      );
                    })}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          );
        })}
      </Grid>
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
  const [rewardsDataRange, setRewardsDateRange] = React.useState([]);
  const [rejectedDataRange, setRejectedDataRange] = React.useState([]);
  const tabs = [
    {
      label: "Rewards Processed Summary",
      render: (
        <Grid size={12} container justifyContent="center">
         <Datatable
          isLoading={false}
          pagination={[10, 20, 50]}
          pageSize={20}
          hideColumnSelector
          hideDownloadnoDataMsg="No Record Found."
          data={[]}
          extra={
            <Box px={{ xs:0, md: 2 }} my={{ xs: 1, md: 0 }}>
              <DateRangeSelector 
                onUpdate={(e) => {
                  setRewardsDateRange(
                    e.map((d) => new Date(d.toDate()).toISOString().split("T")[0]),
                  );
                }}
              />
            </Box>
          }
          columns={[
            { id: "claimedPoints", label: "Claimed Points", render: (info) => `${info.claimedPoints} pts` },
            { id: "claimedAmount", label: "Claimed Amount", render: (info) => `₹${info.claimedAmount}` },
            { id: "dateTime", label: "Date - Time", render: (info) => new Date(info.dateTime).toLocaleString() },
            { id: "transactionId", label: "Transaction ID", render: (info) => info.transactionId },
            { id: "paymentMethod", label: "Payment Method", render: (info) => info.paymentMethod },
            {
              id: "paymentProcessedDate",
              label: "Payment Processed Date",
              render: (info) =>
                info.paymentProcessedDate
                  ? new Date(info.paymentProcessedDate).toLocaleDateString()
                  : "-",
            },
            {
              id: "status",
              label: "Status",
              render: (info) => (
                <span style={{ textTransform: "capitalize" }}>{info.status}</span>
              ),
            },
          ]}
         />
        </Grid>
      ),
    },
    {
      label: "Rejected Responses",
      render: (
        <Grid size={12} container justifyContent="center">
          <Datatable
            hideColumnSelector
            hideDownload
            data={[]}
            isLoading={false}
            extra={
              <Box px={{ xs: 0, md: 2 }} my={{ xs: 1, md: 0 }}>
                <DateRangeSelector
                  onUpdate={(e) => {
                    setRejectedDataRange(
                      e.map((d) => new Date(d.toDate()).toISOString().split("T")[0]),
                    );
                  }}
                />
              </Box>
            }
            columns={[
              { id: "survey", label: "Survey Name", render: (info) => info.survey?.name },
              { id: "createdAt", label: "created At", render: (info) => new Date(info.createdAt).toLocaleString() },
              { id: "points", label: "Points", render: (info) => `${info.points} pts` },
              { id: "reason", label: "Reason", render: (info) => info.reason },
              { id: "status", label: "Status", render: (info) => info.status },
            ]}
          />
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
