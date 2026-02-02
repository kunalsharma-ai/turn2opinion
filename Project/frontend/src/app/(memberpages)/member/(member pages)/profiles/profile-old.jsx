"use client";
import React from "react";

import {
  Box,
  Button,
  Fade,
  Grid,
  LinearProgress,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import {
  useForm,
  FormProvider,
  useFormContext,
  useController,
} from "react-hook-form";
import { Input, Select, Radio, Checkbox, Date, Phone } from "@/components/Form";

// Reusable FormField component for rendering label and input
function FormField({ label, inputType, registerName, options, size = 12 }) {
  const { register, control } = useFormContext();
  const InputComponent = {
    Input,
    Select,
    Radio,
    Checkbox,
    Date,
    Phone,
  }[inputType];

  return (
    <Grid size={size} container direction="column" spacing={0.5} mb={1.5}>
      <Typography fontWeight={600}>{label}</Typography>
      <Grid sx={{ flex: 1, ...(size === 12 && { size: 12 }) }}>
        <InputComponent
          {...register(registerName)}
          control={control}
          {...(options && { options })}
        />
      </Grid>
    </Grid>
  );
}

function CheckboxWithText({
  registerName,
  label,
  children,
  alignItems = "center",
  ml = -1.5,
}) {
  const { register, control } = useFormContext();
  return (
    <Grid size={12} container spacing={0} alignItems={alignItems} mt={3}>
      <Checkbox size="medium" {...register(registerName)} control={control} />
      <Box>
        <Typography sx={{ flex: 1, ml, fontWeight: 600 }}>{label}</Typography>
        <Typography sx={{ flex: 1, ml, fontWeight: 500 }}>
          {children}
        </Typography>
      </Box>
    </Grid>
  );
}

function TabLabel({ label, progress, icon, selected }) {
  return (
    <Grid
      container
      spacing={2}
      alignItems={"center"}
      size={12}
      sx={{
        minWidth: { xs: "calc(100vw - 190px)", sm: 300 },
        px: { xs: 0, sm: 1 },
      }}
    >
      <i className={icon} alt="icon" />

      <Grid sx={{ flex: 1 }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            // gap: 0.5,
            mb: 0.5,
          }}
        >
          <Typography sx={{ fontWeight: 500, fontSize: 12 }}>
            {label}
          </Typography>
          <Typography>{progress}%</Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          color=""
          value={progress}
          sx={{
            ".MuiLinearProgress-bar": {
              bgcolor: selected ? "white" : "#06923E",
            },
            width: "100%",
            height: 3,
            borderRadius: 1.5,
            bgcolor: selected ? "rgba(255,255,255,0.2)" : "#c6e9f3ff",
          }}
        />
      </Grid>
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

export default function () {
  const [activeTab, setActiveTab] = React.useState(0);
  const [progressData, setProgressData] = React.useState({});

  const handleProgressChange = (tabIndex, data) => {
    setProgressData((prev) => ({ ...prev, [tabIndex]: data }));
  };

  const tabs = [
    {
      label: "Basic Demographics",
      icon: "fas fa-id-card",
      render: (
        <Basic onProgressChange={(data) => handleProgressChange(0, data)} />
      ),
    },
    {
      label: "Education",
      icon: "fas fa-user-graduate",
      render: (
        <Education onProgressChange={(data) => handleProgressChange(1, data)} />
      ),
    },
    {
      label: "Specialty / Area of Practice",
      icon: "fas fa-stethoscope",
      render: (
        <Specialty onProgressChange={(data) => handleProgressChange(2, data)} />
      ),
    },
    {
      label: "Experience",
      icon: "fas fa-briefcase-medical",
      render: (
        <Experience
          onProgressChange={(data) => handleProgressChange(3, data)}
        />
      ),
    },
    {
      label: "Decision-making / Influence",
      icon: "fas fa-handshake",
      render: (
        <DecisionMaking
          onProgressChange={(data) => handleProgressChange(4, data)}
        />
      ),
    },
    {
      label: "Availability & Panel Participation",
      icon: "fas fa-calendar-check",
      render: (
        <Availability
          onProgressChange={(data) => handleProgressChange(5, data)}
        />
      ),
    },
    {
      label: "Medical Certification Number",
      icon: "fas fa-award",
      render: (
        <Certification
          onProgressChange={(data) => handleProgressChange(6, data)}
        />
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
        variant="scrollable"
        scrollButtons={true}
        allowScrollButtonsMobile
        sx={{
          width: "100%",
          pb: 0.3,
          borderBottom: "3px solid whitesmoke",

          "& .MuiTabs-scrollButtons .MuiSvgIcon-root": {
            fontSize: 30,
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#06923E",
            height: "3px",
            display: "none",
          },
          "& .MuiTab-root": {
            color: "black",
            fontSize: { xs: 14, md: 16 },
            fontWeight: 500,
            transition:
              "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
          },
          "& .Mui-selected": {
            bgcolor: "#06923E !important",
            color: "white !important",
          },
        }}
      >
        {tabs.map((tab, index) => {
          const data = progressData[index] || {
            completed: 0,
            total: 0,
            progress: 0,
          };
          return (
            <Tab
              sx={{ borderRadius: 2, m: 0.5, border: "2px solid whitesmoke" }}
              label={
                <TabLabel
                  label={tab.label}
                  icon={tab.icon}
                  selected={activeTab === index}
                  progress={data.progress}
                />
              }
              key={tab.label}
            />
          );
        })}
      </Tabs>
      {tabs.map((tab, index) => {
        const data = progressData[index] || {
          completed: 0,
          total: 0,
          progress: 0,
        };
        return (
          <TabPanel key={tab.label} value={activeTab} index={index}>
            <Grid size={12} container justifyContent={"center"} mt={2}>
              <Grid
                size={{ xs: 11, md: 10 }}
                sx={{ bgcolor: "#ecfcf5", borderRadius: 2.5, boxShadow: 1 }}
              >
                <Grid
                  size={12}
                  container
                  justifyContent={"space-between"}
                  sx={{
                    py: 1.5,
                    px: 2,
                    color: "white",
                    bgcolor: "secondary.main",
                    fontWeight: 600,
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  }}
                >
                  <Typography fontSize={16} fontWeight={600}>
                    {tab.label} Profile
                  </Typography>
                  <Typography fontSize={16}>
                    {data.completed}/{data.total}
                  </Typography>
                </Grid>
                {tab.render}
              </Grid>
            </Grid>
          </TabPanel>
        );
      })}
    </Grid>
  );
}

function Basic({ onProgressChange }) {
  const form = useForm({
    defaultValues: {},
  });

  const {
    handleSubmit,
    formState: { errors },
    watch,
  } = form;

  const onSubmit = (data) => {
    console.log(data);
  };

  const allValues = watch();
  const totalFields = Object.keys(allValues).length;
  const completedFields = Object.values(allValues).filter(
    (v) => v !== undefined && v !== ""
  ).length;

  const progress = totalFields
    ? Math.round((completedFields / totalFields) * 100)
    : 0;

  React.useEffect(() => {
    onProgressChange?.({
      completed: completedFields,
      total: totalFields,
      progress,
    });
  }, [completedFields, totalFields, progress]);

  return (
    <FormProvider {...form}>
      <Grid component="form" onSubmit={handleSubmit(onSubmit)} p={2}>
        <FormField
          label="What is your Gender?"
          inputType="Select"
          registerName="gender"
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" },
          ]}
        />
        <FormField
          label="What is your Age Group?"
          inputType="Select"
          registerName="age"
          options={[
            { label: "21-29", value: "21-29" },
            { label: "30-39", value: "30-39" },
            { label: "40-49", value: "40-49" },
            { label: "50-59", value: "50-59" },
            { label: "60+", value: "60+" },
          ]}
        />{" "}
        <FormField
          label="What is Your Marital Status?"
          inputType="Select"
          registerName="maritalstatus"
          options={[
            { label: "Single", value: "single" },
            { label: "Married", value: "married" },
            { label: "Divorced", value: "divorced" },
            { label: "Widow/Widower", value: "widow" },
          ]}
        />{" "}
        <FormField
          label="Number of children below 18 live in your household?"
          inputType="Select"
          registerName="children"
          options={[
            { label: "0", value: "0" },
            { label: "1-3", value: "1-3" },
            { label: "4-6", value: "4-6" },
            { label: "7+", value: "7+" },
          ]}
        />
        <FormField
          label="What is your Country of Practice?"
          inputType="Select"
          registerName="country"
          options={[]}
        />
        <FormField
          label="What is your city/region of practice?"
          inputType="Select"
          registerName="city"
          options={[]}
        />
        <FormField label="Zip Code" inputType="Input" registerName="zipCode" />
        <FormField
          label="What is your approximate annual personal income (before tax)?"
          inputType="Select"
          registerName="personalIncome"
          options={[
            { label: "Less than $10,000", value: "<10k" },
            { label: "$10,000 – $24,999", value: "10k-25k" },
            { label: "$25,000 – $49,999", value: "25k-50k" },
            { label: "$50,000 – $99,999", value: "50k-100k" },
            { label: "$100,000+", value: "100k+" },
            { label: "Prefer not to answer", value: "prefer" },
          ]}
        />
        <FormField
          label="What is your approximate total family annual income (before tax)?"
          inputType="Select"
          registerName="familyIncome"
          options={[
            { label: "Less than $25,000", value: "<25k" },
            { label: "$25,000 – $49,999", value: "25k-50k" },
            { label: "$50,000 – $99,999", value: "50k-100k" },
            { label: "$100,000 – $199,999", value: "100k-200k" },
            { label: "$200,000+", value: "200k+" },
            { label: "Prefer not to answer", value: "prefer" },
          ]}
        />
        <Grid size={12} container justifyContent={"flex-end"}>
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            sx={{
              my: 2,
              color: "white",
              px: 2,
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

function Education({ onProgressChange }) {
  const form = useForm({
    defaultValues: {},
  });

  const {
    handleSubmit,
    formState: { errors },
    watch,
  } = form;

  const highestEducation = watch("highestEducation");

  const onSubmit = (data) => {
    console.log(data);
  };

  const allValues = watch();
  const totalFields = Object.keys(allValues).length;
  const completedFields = Object.values(allValues).filter(
    (v) => v !== undefined && v !== ""
  ).length;

  const progress = totalFields
    ? Math.round((completedFields / totalFields) * 100)
    : 0;

  React.useEffect(() => {
    onProgressChange?.({
      completed: completedFields,
      total: totalFields,
      progress,
    });
  }, [completedFields, totalFields, progress]);

  const getDiplomaTypeOptions = () => [
    { label: "Nursing diploma (GNM/ANM)", value: "nursing" },
    {
      label:
        "Paramedical diploma (Lab technician, Radiology, Physiotherapy, etc.)",
      value: "paramedical",
    },
    { label: "Pharmacy diploma (D.Pharm)", value: "pharmacy" },
    { label: "Other healthcare-related diploma", value: "other" },
  ];

  const getDiplomaLicenseOptions = () => [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
    { label: "Currently under process", value: "process" },
  ];

  const getBachelorsOptions = () => [
    { label: "MBBS (Medicine)", value: "mbbs" },
    { label: "BDS (Dentistry)", value: "bds" },
    { label: "B.Sc Nursing", value: "nursing" },
    { label: "B.Pharm (Pharmacy)", value: "pharm" },
    { label: "BPT (Physiotherapy)", value: "physio" },
    { label: "Other (please specify)", value: "other" },
  ];

  const getBachelorsLicenseOptions = () => [
    {
      label: "Yes, with national medical/dental/nursing/pharmacy council",
      value: "national",
    },
    {
      label: "Yes, with state medical/dental/nursing/pharmacy council",
      value: "state",
    },
    { label: "No", value: "no" },
    { label: "Under process", value: "process" },
  ];

  const getMastersOptions = () => [
    { label: "MD/MS (Postgraduate Medicine/Surgery)", value: "mdms" },
    { label: "MDS (Dentistry)", value: "mds" },
    { label: "M.Sc Nursing", value: "nursing" },
    { label: "M.Pharm (Pharmacy)", value: "pharm" },
    { label: "MPT (Physiotherapy)", value: "physio" },
    { label: "Other healthcare master’s degree", value: "other" },
  ];

  const getMastersCertificationOptions = () => [
    {
      label: "Yes (e.g., Cardiologist, Oncologist, Orthopedic Surgeon, etc.)",
      value: "yes",
    },
    { label: "No", value: "no" },
    { label: "Currently pursuing", value: "pursuing" },
  ];

  const getDoctorateOptions = () => [
    { label: "DM/MCh (Super-specialty Medicine/Surgery)", value: "dmmch" },
    { label: "PhD (Healthcare/Medical Science)", value: "phd" },
    { label: "Other (please specify)", value: "other" },
  ];

  const getDoctorateCertificationOptions = () => [
    { label: "Yes, National Medical Council or equivalent", value: "national" },
    {
      label: "Yes, International Medical Board (e.g., USMLE, MRCP, FRCS)",
      value: "international",
    },
    { label: "No", value: "no" },
    { label: "Under process", value: "process" },
  ];

  return (
    <FormProvider {...form}>
      <Grid component="form" onSubmit={handleSubmit(onSubmit)} p={2}>
        <FormField
          label="What is your highest level of education?"
          inputType="Select"
          registerName="highestEducation"
          options={[
            { label: "Diploma", value: "diploma" },
            { label: "Bachelor’s", value: "bachelors" },
            { label: "Master’s", value: "masters" },
            { label: "Doctorate", value: "doctorate" },
            { label: "Others", value: "others" },
          ]}
        />
        {highestEducation === "diploma" && (
          <>
            <FormField
              label="What type of diploma have you completed?"
              inputType="Select"
              registerName="diplomaType"
              options={getDiplomaTypeOptions()}
            />
            <FormField
              label="Are you certified/licensed to practice in your field?"
              inputType="Select"
              registerName="diplomaLicense"
              options={getDiplomaLicenseOptions()}
            />
          </>
        )}
        {highestEducation === "bachelors" && (
          <>
            <FormField
              label="What is your bachelor’s qualification?"
              inputType="Select"
              registerName="bachelorsQual"
              options={getBachelorsOptions()}
            />
            <FormField
              label="Do you hold a professional registration/licensure?"
              inputType="Select"
              registerName="bachelorsLicense"
              options={getBachelorsLicenseOptions()}
            />
          </>
        )}
        {highestEducation === "masters" && (
          <>
            <FormField
              label="What is your master’s qualification?"
              inputType="Select"
              registerName="mastersQual"
              options={getMastersOptions()}
            />
            <FormField
              label="Do you have a specialist certification/board recognition?"
              inputType="Select"
              registerName="mastersCertification"
              options={getMastersCertificationOptions()}
            />
          </>
        )}
        {highestEducation === "doctorate" && (
          <>
            <FormField
              label="What is your doctoral qualification?"
              inputType="Select"
              registerName="doctorateQual"
              options={getDoctorateOptions()}
            />
            <FormField
              label="Do you have certification/registration with a professional council or board?"
              inputType="Select"
              registerName="doctorateCertification"
              options={getDoctorateCertificationOptions()}
            />
          </>
        )}
        {highestEducation === "others" && (
          <>
            <FormField
              label="Please specify your qualification."
              inputType="Input"
              registerName="othersQual"
            />
            <FormField
              label="Are you certified/licensed to practice in your field?"
              inputType="Select"
              registerName="othersLicense"
              options={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
                { label: "Currently under process", value: "process" },
              ]}
            />
          </>
        )}
        <Grid size={12} container justifyContent={"flex-end"}>
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            sx={{
              my: 2,

              color: "white",
              px: 2,
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

function Specialty({ onProgressChange }) {
  const form = useForm({
    defaultValues: {},
  });

  const {
    handleSubmit,
    formState: { errors },
    watch,
  } = form;

  const primaryRole = watch("primaryRole");
  const specialization = watch("specialization");
  const keyArea = watch("keyArea");
  const subSpecialization = watch("subSpecialization");
  const specialityGroup = watch("specialityGroup"); // For allied, lab, etc.

  const onSubmit = (data) => {
    console.log(data);
  };

  // Watch all fields
  const allValues = watch();
  const totalFields = Object.keys(allValues).length || 4; // Estimate
  const completedFields = Object.values(allValues).filter(
    (v) => v !== undefined && v !== ""
  ).length;

  const progress = totalFields
    ? Math.round((completedFields / totalFields) * 100)
    : 0;

  // send progress to parent
  React.useEffect(() => {
    onProgressChange?.({
      completed: completedFields,
      total: totalFields,
      progress,
    });
  }, [completedFields, totalFields, progress]);

  const primaryRoleOptions = [
    { label: "Healthcare Management", value: "management" },
    { label: "Medical Doctors & Physicians", value: "doctors" },
    { label: "Surgeons", value: "surgeons" },
    { label: "Dental Professionals", value: "dental" },
    { label: "Nursing & Midwifery", value: "nursing" },
    { label: "Pharmacy Professionals", value: "pharmacy" },
    { label: "Laboratory & Diagnostic Professionals", value: "lab" },
    { label: "Allied Health Professionals", value: "allied" },
    { label: "Health IT & Admin Professionals", value: "itadmin" },
    { label: "Support Staff (Ancillary)", value: "support" },
  ];

  // Healthcare Management Job Levels
  const healthcareManagementJobLevels = [
    { label: "Chief Compliance Officer (CCO)", value: "cco" },
    { label: "Chief Financial Officer (CFO)", value: "cfo" },
    { label: "Chief Human Resources Officer (CHRO)", value: "chro" },
    { label: "Chief Information Officer (CIO)", value: "cio" },
    { label: "Chief Nursing Officer (CNO)", value: "cno" },
    { label: "Chief Patient Experience Officer", value: "cpex" },
    { label: "Chief Quality Officer (CQO)", value: "cqo" },
    { label: "Chief Technology Officer (CTO)", value: "cto" },
    { label: "Chief Medical Officer (CMO)", value: "cmo" },
    {
      label: "Chief Information Officer (CIO) in health organizations",
      value: "cio_health",
    },
    { label: "Chief Medical Informatics Officer (CMIO)", value: "cmio" },
    { label: "Chief Executive Officer (CEO) – Hospital", value: "ceo_hosp" },
    { label: "Chief Operating Officer (COO)", value: "coo" },
    { label: "Chief Privacy Officer", value: "cpo" },
    { label: "Vice President – Clinical Services", value: "vp_clin" },
    { label: "Vice President – Healthcare Operations", value: "vp_ops" },
    { label: "Vice President – Patient Services", value: "vp_pat" },
    { label: "Dean of Healthcare Administration", value: "dean" },
    {
      label: "Department Manager (Radiology, Pathology, etc.)",
      value: "dept_mgr",
    },
    { label: "Director of Clinical Operations", value: "dir_clin_ops" },
    {
      label: "Director of Community Health Programs",
      value: "dir_comm_health",
    },
    { label: "Director of Facility Management", value: "dir_fac_mgt" },
    { label: "Director of Finance – Healthcare", value: "dir_finance" },
    {
      label: "Director of Health Information Management (HIM)",
      value: "dir_him",
    },
    { label: "Director of Hospital Administration", value: "dir_hosp_admin" },
    { label: "Director of Patient Care Services", value: "dir_pat_care" },
    { label: "Director of Quality & Compliance", value: "dir_qual_comp" },
    { label: "Director of Risk Management", value: "dir_risk_mgt" },
    { label: "Director of Support Services", value: "dir_support" },
    { label: "Medical Director – Insurance", value: "med_dir_ins" },
    { label: "District Health Officer (DHO)", value: "dho" },
    { label: "State Health Mission Director", value: "state_dir" },
  ];

  // Doctors Specializations
  const doctorsSpecializations = [
    { label: "General Practitioner (GP) / Family Physician", value: "gp" },
    { label: "Internal Medicine Specialist", value: "internal" },
    { label: "Paediatrics & Neonatology", value: "paeds" },
    { label: "Cardiology", value: "cardio" },
    { label: "Pulmonology", value: "pulmo" },
    { label: "Neurology", value: "neuro" },
    { label: "Endocrinology", value: "endo" },
    { label: "Gastroenterology", value: "gastro" },
    { label: "Oncology", value: "onc" },
    { label: "Nephrology", value: "nephro" },
    { label: "Orthopaedic", value: "ortho" },
    { label: "Rheumatology", value: "rheum" },
    { label: "Psychology & Mental Health", value: "psych" },
    { label: "Dermatology", value: "derm" },
    { label: "Ophthalmology", value: "ophth" },
    { label: "ENT Specialist", value: "ent" },
    { label: "Radiology", value: "rad" },
    { label: "Anaesthesiology", value: "anaes" },
    { label: "Emergency Medicine", value: "em" },
    { label: "Pathology", value: "path" },
    { label: "Geriatrician", value: "ger" },
    { label: "Infectious Diseases", value: "id" },
    { label: "Haematology", value: "haem" },
    { label: "Sports Medicine", value: "sports" },
    { label: "Palliative Care", value: "pall" },
    { label: "Occupational Health", value: "occ" },
    { label: "Histopathology", value: "histo" },
    { label: "Cytopathology", value: "cyto" },
    { label: "Molecular Diagnostics", value: "mol_diag" },
    { label: "Microbiology", value: "micro" },
    { label: "Clinical Chemistry", value: "clin_chem" },
    { label: "Forensic Pathology", value: "forensic" },
    { label: "Immunopathology", value: "immuno" },
  ];

  // Job Levels for Doctors Specializations
  const gpJobLevels = [
    { label: "General Practitioner (GP)", value: "gp" },
    { label: "Family Medicine Physician", value: "fmp" },
    { label: "Primary Care Physician", value: "pcp" },
    { label: "House Officer (Intern)", value: "ho" },
    { label: "Resident Doctor", value: "res" },
    { label: "Medical Officer", value: "mo" },
    { label: "Attending Physician", value: "att" },
    { label: "Consultant Physician", value: "cons" },
    { label: "Senior Consultant", value: "sr_cons" },
    { label: "Chief Medical Officer (CMO)", value: "cmo" },
    { label: "Medical Superintendent", value: "ms" },
    { label: "Medical Director", value: "md" },
  ];

  const internalJobLevels = [
    { label: "Internal Medicine Physician (Internist)", value: "internist" },
    { label: "Cardiologist", value: "cardio" },
    { label: "Endocrinologist", value: "endo" },
    { label: "Gastroenterologist", value: "gastro" },
    { label: "Nephrologist", value: "nephro" },
    { label: "Rheumatologist", value: "rheum" },
    { label: "Haematologist", value: "haem" },
    { label: "Infectious Disease Specialist", value: "id" },
    { label: "Geriatrician", value: "ger" },
    { label: "Hospitalist", value: "hosp" },
    { label: "Diabetologist", value: "diab" },
    { label: "HIV/AIDS Specialist", value: "hiv" },
  ];

  const paedsJobLevels = [
    { label: "Paediatrician", value: "paed" },
    { label: "Neonatologist", value: "neo" },
    { label: "Paediatric Neurologist", value: "paed_neuro" },
    { label: "Paediatric Cardiologist", value: "paed_cardio" },
    { label: "Paediatric Endocrinologist", value: "paed_endo" },
    { label: "Paediatric Intensivist", value: "paed_int" },
  ];

  const cardioJobLevels = [
    { label: "Cardiologist", value: "cardio" },
    { label: "Interventional Cardiologist", value: "int_cardio" },
    { label: "Non-Invasive Cardiologist", value: "non_int_cardio" },
    { label: "Paediatric Cardiologist", value: "paed_cardio" },
    { label: "Electrophysiologist", value: "ephys" },
    { label: "Cardiothoracic Surgeon", value: "cts" },
    { label: "Cardiology Resident", value: "card_res" },
    { label: "Fellow in Cardiology", value: "card_fell" },
    { label: "Cardiac Intensivist", value: "card_int" },
    { label: "Preventive Cardiologist", value: "prev_cardio" },
  ];

  const pulmoJobLevels = [
    { label: "Pulmonologist (Chest Physician)", value: "pulmo" },
    { label: "Critical Care / Intensive Care Specialist", value: "crit_care" },
    { label: "Sleep Medicine Specialist", value: "sleep" },
    { label: "Respiratory Medicine Consultant", value: "resp_cons" },
    { label: "Pulmonology Fellow / Trainee", value: "pul_fell" },
    { label: "Thoracic Surgeon", value: "thor_surg" },
  ];

  const neuroJobLevels = [
    { label: "Neurologist", value: "neuro" },
    { label: "Neurophysiologist", value: "neurophys" },
    { label: "Paediatric Neurologist", value: "paed_neuro" },
    { label: "Neurocritical Care Specialist", value: "neuro_crit" },
    { label: "Stroke Specialist", value: "stroke" },
    { label: "Clinical Neurophysiologist", value: "clin_neurophys" },
    { label: "Neuro-oncologist", value: "neuro_onc" },
    { label: "Movement Disorder Specialist", value: "move_dis" },
    { label: "Epileptologist", value: "epilep" },
    { label: "Neuro-rehabilitation Specialist", value: "neuro_rehab" },
    { label: "Neurology Resident / Fellow", value: "neuro_res_fell" },
  ];

  const endoJobLevels = [
    { label: "Endocrinologist", value: "endo" },
    { label: "Diabetologist", value: "diab" },
    { label: "Paediatric Endocrinologist", value: "paed_endo" },
    { label: "Reproductive Endocrinologist", value: "rep_endo" },
    { label: "Thyroid Specialist", value: "thyroid" },
    { label: "Metabolic Specialist", value: "metab" },
    { label: "Obesity Medicine Physician", value: "obesity" },
    { label: "Endocrinology Resident / Fellow", value: "endo_res_fell" },
    { label: "Consultant Endocrinologist", value: "cons_endo" },
  ];

  const gastroJobLevels = [
    { label: "Gastroenterologist", value: "gastro" },
    { label: "Hepatologist", value: "hepato" },
    { label: "Paediatric Gastroenterologist", value: "paed_gastro" },
    { label: "Interventional Gastroenterologist", value: "int_gastro" },
    { label: "GI Oncologist", value: "gi_onc" },
    { label: "GI Motility Specialist", value: "gi_mot" },
    { label: "Pancreatologist", value: "pancrea" },
    { label: "Colorectal Specialist (MD)", value: "colorec" },
    { label: "Gastroenterology Resident / Fellow", value: "gastro_res_fell" },
    { label: "Consultant Gastroenterologist", value: "cons_gastro" },
  ];

  const oncJobLevels = [
    { label: "Medical Oncologist", value: "med_onc" },
    { label: "Radiation Oncologist", value: "rad_onc" },
    { label: "Surgical Oncologist", value: "surg_onc" },
    { label: "Haematologist-Oncologist", value: "haem_onc" },
    { label: "Paediatric Oncologist", value: "paed_onc" },
    { label: "Gynaecologic Oncologist", value: "gyn_onc" },
    { label: "Neuro-Oncologist", value: "neuro_onc" },
    { label: "Thoracic Oncologist", value: "thor_onc" },
    { label: "Breast Oncologist", value: "breast_onc" },
    { label: "Urologic Oncologist", value: "uro_onc" },
    { label: "Gastrointestinal (GI) Oncologist", value: "gi_onc" },
    { label: "Palliative Care Oncologist", value: "pall_onc" },
    { label: "Oncology Resident / Fellow", value: "onc_res_fell" },
    { label: "Consultant Oncologist", value: "cons_onc" },
  ];

  const nephroJobLevels = [
    { label: "Nephrologist", value: "nephro" },
    { label: "Paediatric Nephrologist", value: "paed_nephro" },
    { label: "Transplant Nephrologist", value: "trans_nephro" },
    { label: "Hypertension Specialist", value: "hyp_spec" },
    { label: "Critical Care Nephrologist", value: "crit_nephro" },
    { label: "Onco Nephrologist", value: "onco_nephro" },
    { label: "Cardio Nephrologist", value: "cardio_nephro" },
    { label: "Consultant Nephrologist", value: "cons_nephro" },
    { label: "Nephrology Fellow / Resident", value: "nephro_fell_res" },
  ];

  const orthoJobLevels = [
    { label: "Orthopaedic Surgeon", value: "ortho_surg" },
    { label: "Trauma Orthopaedic Surgeon", value: "trauma_ortho" },
    { label: "Paediatric Orthopaedic Surgeon", value: "paed_ortho" },
    { label: "Spine Surgeon (Orthopaedic Spine)", value: "spine_ortho" },
    { label: "Joint Replacement Surgeon", value: "joint_rep" },
    { label: "Sports Medicine Orthopaedist", value: "sports_ortho" },
    { label: "Hand & Upper Limb Surgeon", value: "hand_upper" },
    { label: "Foot & Ankle Surgeon", value: "foot_ankle" },
    { label: "Orthopaedic Oncologist", value: "ortho_onc" },
    { label: "Shoulder & Elbow Specialist", value: "shoulder_elbow" },
    { label: "Orthopaedic Consultant", value: "cons_ortho" },
    { label: "Orthopaedic Resident / Fellow", value: "ortho_res_fell" },
  ];

  const rheumJobLevels = [
    { label: "Rheumatologist", value: "rheum" },
    { label: "Paediatric Rheumatologist", value: "paed_rheum" },
    { label: "Rheumatology Fellow / Trainee", value: "rheum_fell" },
    { label: "Immunologist (Clinical)", value: "immuno_clin" },
    { label: "Consultant Rheumatologist", value: "cons_rheum" },
  ];

  const psychJobLevels = [
    { label: "Clinical Psychologist", value: "clin_psych" },
    { label: "Counselling Psychologist", value: "coun_psych" },
    { label: "Child Psychologist", value: "child_psych" },
    { label: "Forensic Psychologist", value: "for_psych" },
    { label: "Neuropsychologist", value: "neuro_psych" },
    { label: "Health Psychologist", value: "health_psych" },
    { label: "Rehabilitation Psychologist", value: "rehab_psych" },
    { label: "Addiction Counsellor / Psychologist", value: "add_psych" },
    { label: "School Psychologist", value: "school_psych" },
    { label: "Psychiatrist", value: "psych" },
    { label: "Psychiatric Nurse", value: "psych_nurse" },
    { label: "Mental Health Counsellor / Therapist", value: "mh_coun" },
    { label: "Behavioural Therapist", value: "behav_ther" },
    { label: "Marriage and Family Therapist (MFT)", value: "mft" },
    { label: "Art / Music Therapist", value: "art_music_ther" },
    { label: "Psychological Researcher", value: "psych_res" },
    { label: "Psychometrician", value: "psychom" },
    { label: "Neurodiagnostic Technician", value: "neuro_diag_tech" },
    { label: "Mental Health Program Coordinator", value: "mh_prog_coord" },
    {
      label: "Clinical Research Coordinator – Psychiatry/Psychology",
      value: "crc_psych",
    },
    {
      label: "Quality Assurance Officer – Mental Health Services",
      value: "qa_mh",
    },
  ];

  const dermJobLevels = [
    { label: "Dermatologist", value: "derm" },
    { label: "Cosmetic Dermatologist", value: "cos_derm" },
    { label: "Dermatopathologist", value: "derm_path" },
    { label: "Paediatric Dermatologist", value: "paed_derm" },
    { label: "Trichologist (Medical)", value: "trich" },
    { label: "Allergist (Dermatology Focus)", value: "all_derm" },
    { label: "Dermatology Resident / Fellow", value: "derm_res_fell" },
    { label: "Consultant Dermatologist", value: "cons_derm" },
  ];

  const ophthJobLevels = [
    { label: "Ophthalmologist", value: "ophth" },
    { label: "General Ophthalmologist", value: "gen_ophth" },
    { label: "Paediatric Ophthalmologist", value: "paed_ophth" },
    { label: "Neuro-Ophthalmologist", value: "neuro_ophth" },
    { label: "Retina Specialist / Vitreoretinal Surgeon", value: "retina" },
    { label: "Cornea Specialist", value: "cornea" },
    { label: "Glaucoma Specialist", value: "glaucoma" },
    { label: "Oculoplastic Surgeon", value: "oculoplast" },
    { label: "Refractive Surgeon / LASIK Specialist", value: "refract" },
    { label: "Ophthalmology Resident / Fellow", value: "ophth_res_fell" },
    { label: "Consultant Ophthalmologist", value: "cons_ophth" },
  ];

  const entJobLevels = [
    { label: "ENT Specialist / Otolaryngologist", value: "ent" },
    { label: "ENT Surgeon", value: "ent_surg" },
    { label: "Paediatric ENT Specialist", value: "paed_ent" },
    { label: "Otologist / Neurotologist", value: "otol" },
    { label: "Rhinologist", value: "rhino" },
    { label: "Laryngologist", value: "laryng" },
    { label: "Head & Neck Oncologic Surgeon", value: "hn_onc_surg" },
    { label: "Skull Base Surgeon", value: "skull_base" },
    { label: "Facial Plastic & Reconstructive Surgeon", value: "facial_plast" },
    { label: "ENT Resident / Fellow", value: "ent_res_fell" },
    { label: "Consultant ENT Surgeon", value: "cons_ent" },
    { label: "Audiologist", value: "audio" },
    { label: "Speech-Language Pathologist", value: "slp" },
    { label: "Hearing Aid Specialist / Fitter", value: "hear_aid" },
    { label: "ENT Nurse", value: "ent_nurse" },
    { label: "Vestibular Therapist", value: "vest_ther" },
    {
      label: "Swallow Therapist / Dysphagia Specialist",
      value: "swallow_ther",
    },
  ];

  const radJobLevels = [
    { label: "Radiologist", value: "rad" },
    { label: "Diagnostic Radiologist", value: "diag_rad" },
    { label: "Interventional Radiologist", value: "int_rad" },
    { label: "Neuroradiologist", value: "neuro_rad" },
    { label: "Musculoskeletal Radiologist", value: "ms_rad" },
    { label: "Paediatric Radiologist", value: "paed_rad" },
    { label: "Cardiothoracic Radiologist", value: "ct_rad" },
    { label: "Breast Imaging Specialist", value: "breast_img" },
    { label: "Nuclear Medicine Physician", value: "nuc_med" },
    { label: "Radiology Resident / Fellow", value: "rad_res_fell" },
    { label: "Consultant Radiologist", value: "cons_rad" },
  ];

  const anaesJobLevels = [
    { label: "Anaesthesiologist / Anesthetist", value: "anaes" },
    { label: "Cardiac Anaesthesiologist", value: "card_anaes" },
    { label: "Neuro-Anaesthesiologist", value: "neuro_anaes" },
    { label: "Paediatric Anaesthesiologist", value: "paed_anaes" },
    {
      label: "Critical Care Anaesthesiologist / Intensivist",
      value: "crit_anaes",
    },
    { label: "Pain Management Specialist", value: "pain_mgt" },
    { label: "Obstetric Anaesthesiologist", value: "obst_anaes" },
    { label: "Transplant Anaesthesiologist", value: "trans_anaes" },
    { label: "Consultant Anaesthesiologist", value: "cons_anaes" },
    { label: "Resident / Fellow in Anaesthesiology", value: "anaes_res_fell" },
  ];

  const emJobLevels = [
    { label: "Emergency Medicine Physician", value: "em_phys" },
    { label: "Emergency Room (ER) Doctor", value: "er_doc" },
    { label: "Trauma Surgeon", value: "trauma_surg" },
    { label: "Critical Care / ICU Physician", value: "crit_icu" },
    { label: "Paediatric Emergency Physician", value: "paed_em" },
    { label: "Toxicologist (Emergency Focus)", value: "tox_em" },
    { label: "Disaster Medicine Specialist", value: "dis_med" },
    { label: "Emergency Medicine Resident / Fellow", value: "em_res_fell" },
    { label: "Consultant Emergency Physician", value: "cons_em" },
  ];

  const pathJobLevels = [
    { label: "Pathologist", value: "path" },
    { label: "Anatomical Pathologist", value: "anat_path" },
    { label: "Clinical Pathologist", value: "clin_path" },
    { label: "Hematopathologist", value: "hema_path" },
    { label: "Cytopathologist", value: "cyto_path" },
    { label: "Molecular Pathologist", value: "mol_path" },
    { label: "Forensic Pathologist", value: "for_path" },
    { label: "Neuropathologist", value: "neuro_path" },
    { label: "Dermatopathologist", value: "derm_path" },
    { label: "Paediatric Pathologist", value: "paed_path" },
    { label: "Pathology Resident / Fellow", value: "path_res_fell" },
    { label: "Consultant Pathologist", value: "cons_path" },
  ];

  const gerJobLevels = [
    { label: "Geriatrician", value: "ger" },
    { label: "Consultant Geriatrician", value: "cons_ger" },
    { label: "Geriatric Psychiatrist", value: "ger_psych" },
    { label: "Palliative Care Geriatrician", value: "pall_ger" },
    { label: "Geriatric Cardiologist", value: "ger_cardio" },
    { label: "Geriatric Oncologist", value: "ger_onc" },
    { label: "Geriatric Emergency Medicine Physician", value: "ger_em" },
    { label: "Geriatric Rehabilitation Specialist", value: "ger_rehab" },
    { label: "Geriatric Fellow / Resident", value: "ger_fell_res" },
  ];

  const idJobLevels = [
    { label: "Infectious Disease Specialist (ID Physician)", value: "id_phys" },
    { label: "Tropical Medicine Specialist", value: "trop_med" },
    { label: "HIV/AIDS Specialist", value: "hiv" },
    { label: "Travel Medicine Physician", value: "travel_med" },
    { label: "Paediatric Infectious Disease Specialist", value: "paed_id" },
    { label: "Hospital Epidemiologist", value: "hosp_epi" },
    { label: "Transplant Infectious Disease Specialist", value: "trans_id" },
    { label: "Infectious Disease Consultant", value: "cons_id" },
    { label: "Infectious Disease Fellow / Resident", value: "id_fell_res" },
  ];

  const haemJobLevels = [
    { label: "Haematologist", value: "haem" },
    { label: "Paediatric Haematologist", value: "paed_haem" },
    { label: "Haemato-Oncologist", value: "haem_onc" },
    { label: "Transfusion Medicine Specialist", value: "trans_med" },
    { label: "Bone Marrow Transplant Physician", value: "bmt" },
    { label: "Thrombosis and Haemostasis Specialist", value: "thromb" },
    { label: "Sickle Cell Disease Specialist", value: "sickle" },
    { label: "Consultant Haematologist", value: "cons_haem" },
    { label: "Haematology Fellow / Resident", value: "haem_fell_res" },
  ];

  const sportsJobLevels = [
    { label: "Sports Medicine Physician", value: "sports_med" },
    { label: "Orthopaedic Sports Surgeon", value: "ortho_sports" },
    { label: "Team Physician", value: "team_phys" },
    { label: "Primary Care Sports Physician", value: "pc_sports" },
    { label: "Physiatrist – Sports Rehabilitation", value: "phys_sports" },
    { label: "Paediatric Sports Medicine Specialist", value: "paed_sports" },
    { label: "Exercise Medicine Specialist", value: "ex_med" },
    {
      label: "Concussion Specialist / Neuro-Sports Physician",
      value: "conc_neuro",
    },
    { label: "Fellow / Resident – Sports Medicine", value: "sports_fell_res" },
  ];

  const pallJobLevels = [
    { label: "Palliative Care Physician", value: "pall_phys" },
    { label: "Consultant – Palliative Medicine", value: "cons_pall" },
    { label: "Hospice Physician", value: "hosp_phys" },
    { label: "Oncologist with Palliative Focus", value: "onc_pall" },
    { label: "Geriatrician – Palliative Integration", value: "ger_pall" },
    { label: "Palliative Care Fellow / Resident", value: "pall_fell_res" },
    { label: "Emergency Physician – Palliative Focus", value: "em_pall" },
    { label: "Primary Care Physician – Palliative Training", value: "pc_pall" },
  ];

  const occJobLevels = [
    {
      label: "Occupational Medicine Physician / Occupational Health Doctor",
      value: "occ_med",
    },
    { label: "Industrial Physician", value: "ind_phys" },
    { label: "Environmental Health Physician", value: "env_health" },
    { label: "Corporate Health Physician", value: "corp_health" },
    { label: "Occupational Health Consultant", value: "occ_cons" },
    { label: "Medical Review Officer (MRO)", value: "mro" },
    { label: "Occupational Health Resident / Fellow", value: "occ_res_fell" },
  ];

  const histoJobLevels = [
    { label: "Histopathologist / Anatomic Pathologist", value: "histo_path" },
    { label: "Dermatopathologist", value: "derm_path" },
    { label: "Neuropathologist", value: "neuro_path" },
    { label: "Forensic Pathologist", value: "for_path" },
    { label: "Molecular Pathologist", value: "mol_path" },
    { label: "Histopathology Consultant", value: "cons_histo" },
    { label: "Histopathology Fellow / Resident", value: "histo_fell_res" },
  ];

  const cytoJobLevels = [
    { label: "Cytopathologist", value: "cyto_path" },
    {
      label: "Anatomic Pathologist with Cytopathology Focus",
      value: "anat_cyto",
    },
    { label: "Cytopathology Consultant", value: "cons_cyto" },
    { label: "Cytopathology Fellow / Resident", value: "cyto_fell_res" },
  ];

  const molDiagJobLevels = [
    { label: "Molecular Pathologist", value: "mol_path" },
    { label: "Clinical Geneticist", value: "clin_gen" },
    { label: "Molecular Diagnostic Consultant", value: "cons_mol_diag" },
    {
      label: "Molecular Diagnostics Fellow / Resident",
      value: "mol_diag_fell_res",
    },
  ];

  const microJobLevels = [
    { label: "Clinical Microbiologist", value: "clin_micro" },
    { label: "Infectious Disease Physician", value: "id_phys" },
    { label: "Medical Microbiology Consultant", value: "cons_micro" },
    { label: "Microbiology Fellow / Resident", value: "micro_fell_res" },
  ];

  const clinChemJobLevels = [
    {
      label: "Clinical Biochemist / Chemical Pathologist",
      value: "clin_biochem",
    },
    { label: "Clinical Chemistry Consultant", value: "cons_clin_chem" },
    {
      label: "Clinical Chemistry Fellow / Resident",
      value: "clin_chem_fell_res",
    },
    { label: "Toxicologist", value: "tox" },
  ];

  const forensicJobLevels = [
    { label: "Forensic Pathologist", value: "for_path" },
    { label: "Forensic Medical Examiner", value: "for_exam" },
    { label: "Forensic Pathology Consultant", value: "cons_for" },
    { label: "Forensic Pathology Fellow / Resident", value: "for_fell_res" },
    { label: "Forensic Toxicologist", value: "for_tox" },
    { label: "Forensic Odontologist", value: "for_odon" },
    { label: "Forensic Anthropologist", value: "for_anthro" },
  ];

  const immunoJobLevels = [
    { label: "Immunopathologist", value: "immuno_path" },
    { label: "Clinical Immunologist", value: "clin_immuno" },
    { label: "Allergist/Immunologist (MD/DO)", value: "all_immuno" },
    { label: "Immunopathology Consultant", value: "cons_immuno" },
    { label: "Immunopathology Fellow / Resident", value: "immuno_fell_res" },
  ];

  // Function to get job levels for doctors
  const getDoctorsJobLevels = () => {
    switch (specialization) {
      case "gp":
        return gpJobLevels;
      case "internal":
        return internalJobLevels;
      case "paeds":
        return paedsJobLevels;
      case "cardio":
        return cardioJobLevels;
      case "pulmo":
        return pulmoJobLevels;
      case "neuro":
        return neuroJobLevels;
      case "endo":
        return endoJobLevels;
      case "gastro":
        return gastroJobLevels;
      case "onc":
        return oncJobLevels;
      case "nephro":
        return nephroJobLevels;
      case "ortho":
        return orthoJobLevels;
      case "rheum":
        return rheumJobLevels;
      case "psych":
        return psychJobLevels;
      case "derm":
        return dermJobLevels;
      case "ophth":
        return ophthJobLevels;
      case "ent":
        return entJobLevels;
      case "rad":
        return radJobLevels;
      case "anaes":
        return anaesJobLevels;
      case "em":
        return emJobLevels;
      case "path":
        return pathJobLevels;
      case "ger":
        return gerJobLevels;
      case "id":
        return idJobLevels;
      case "haem":
        return haemJobLevels;
      case "sports":
        return sportsJobLevels;
      case "pall":
        return pallJobLevels;
      case "occ":
        return occJobLevels;
      case "histo":
        return histoJobLevels;
      case "cyto":
        return cytoJobLevels;
      case "mol_diag":
        return molDiagJobLevels;
      case "micro":
        return microJobLevels;
      case "clin_chem":
        return clinChemJobLevels;
      case "forensic":
        return forensicJobLevels;
      case "immuno":
        return immunoJobLevels;
      default:
        return [];
    }
  };

  // Surgeons Job Levels
  const surgeonsJobLevels = [
    { label: "General Surgeon", value: "gen_surg" },
    { label: "Cardiothoracic Surgeon", value: "cts" },
    { label: "Neurosurgeon", value: "neuro_surg" },
    { label: "Orthopaedic Surgeon", value: "ortho_surg" },
    { label: "Plastic & Reconstructive Surgeon", value: "plast_surg" },
    { label: "Paediatric Surgeon", value: "paed_surg" },
    { label: "Vascular Surgeon", value: "vasc_surg" },
    { label: "Colorectal Surgeon / Proctologist", value: "colorec_surg" },
    { label: "Urologic Surgeon", value: "uro_surg" },
    { label: "Ophthalmic Surgeon", value: "oph_surg" },
    { label: "ENT Surgeon / Otolaryngologist", value: "ent_surg" },
    { label: "Gynaecologic Surgeon", value: "gyn_surg" },
    { label: "Obstetric Surgeon", value: "obst_surg" },
    { label: "Oral & Maxillofacial Surgeon", value: "oral_max" },
    { label: "Hepatobiliary Surgeon", value: "hep_surg" },
    { label: "Endocrine Surgeon", value: "endo_surg" },
    { label: "Surgical Oncologist", value: "surg_onc" },
    { label: "Transplant Surgeon", value: "trans_surg" },
    { label: "Trauma Surgeon", value: "trauma_surg" },
    { label: "Bariatric Surgeon", value: "bar_surg" },
    { label: "Thoracic Surgeon", value: "thor_surg" },
    { label: "Hand Surgeon", value: "hand_surg" },
    { label: "Spinal Surgeon", value: "spinal_surg" },
    { label: "Laparoscopic Surgeon", value: "lap_surg" },
    { label: "Robotic Surgeon", value: "rob_surg" },
    { label: "Chief Surgeon", value: "chief_surg" },
    { label: "Consultant Surgeon", value: "cons_surg" },
    { label: "Attending Surgeon", value: "att_surg" },
    { label: "Resident Surgeon / Surgical Resident", value: "res_surg" },
    { label: "Fellow (Surgical Subspecialty)", value: "fell_surg" },
    { label: "Surgical Registrar", value: "surg_reg" },
    { label: "Assistant Surgeon", value: "ass_surg" },
    { label: "Locum Surgeon", value: "loc_surg" },
  ];

  // Dental Job Levels
  const dentalJobLevels = [
    { label: "General Dentist (BDS/DDS/DMD)", value: "gen_dent" },
    { label: "Orthodontist", value: "ortho_dent" },
    { label: "Periodontist", value: "perio" },
    { label: "Endodontist", value: "endo_dent" },
    { label: "Prosthodontist", value: "prostho" },
    { label: "Oral & Maxillofacial Surgeon", value: "oral_max" },
    { label: "Paediatric Dentist / Pedodontist", value: "paed_dent" },
    { label: "Oral Medicine Specialist", value: "oral_med" },
    { label: "Oral Radiologist", value: "oral_rad" },
    {
      label: "Public Health Dentist / Community Dentist",
      value: "pub_health_dent",
    },
    { label: "Forensic Odontologist", value: "for_odon" },
    { label: "Implantologist", value: "implant" },
  ];

  // Nursing Specializations
  const nursingSpecializations = [
    { label: "General Practitioner (GP) / Family Nurse", value: "gp_nurse" },
    { label: "Internal Medicine Nurse", value: "internal_nurse" },
    { label: "Paediatrics & Neonatology Nurse", value: "paeds_nurse" },
    { label: "Surgical Nurse", value: "surg_nurse" },
    { label: "Cardiology Nurse", value: "cardio_nurse" },
    { label: "Pulmonology Nurse", value: "pulmo_nurse" },
    { label: "Neurology Nurse", value: "neuro_nurse" },
    { label: "Endocrinology Nurse", value: "endo_nurse" },
    { label: "Gastroenterology Nurse", value: "gastro_nurse" },
    { label: "Oncology Nurse", value: "onc_nurse" },
    { label: "Nephrology Nurse", value: "nephro_nurse" },
    { label: "Orthopaedic Nursing", value: "ortho_nurse" },
    { label: "Rheumatology Nurse", value: "rheum_nurse" },
    { label: "Psychology & Mental Health Nurse", value: "psych_nurse" },
    { label: "Dermatology Nurse", value: "derm_nurse" },
    { label: "Ophthalmology Nurse", value: "ophth_nurse" },
    { label: "ENT Specialist Nurse", value: "ent_nurse" },
    { label: "Radiology Nurse", value: "rad_nurse" },
    { label: "Anaesthesiology Nurse", value: "anaes_nurse" },
    { label: "Emergency Medicine Nurse", value: "em_nurse" },
    { label: "Pathology Nurse", value: "path_nurse" },
    { label: "Geriatrician Nurse", value: "ger_nurse" },
    { label: "Infectious Diseases Nurse", value: "id_nurse" },
    { label: "Sports Medicine Nurse", value: "sports_nurse" },
    { label: "Palliative Care Nurse", value: "pall_nurse" },
    { label: "Occupational Health Nurse", value: "occ_nurse" },
    { label: "Histopathology Nurse", value: "histo_nurse" },
    { label: "Haematology Nurse", value: "haem_nurse" },
    { label: "Cytopathology Nurse", value: "cyto_nurse" },
    { label: "Molecular Diagnostics Nurse", value: "mol_diag_nurse" },
    { label: "Microbiology Nurse", value: "micro_nurse" },
    { label: "Clinical Chemistry Nurse", value: "clin_chem_nurse" },
    { label: "Forensic Pathology Nurse", value: "for_path_nurse" },
    { label: "Immunopathology Nurse", value: "immuno_nurse" },
  ];

  // Job Levels for Nursing Specializations
  const gpNurseJobLevels = [
    { label: "Primary Care Nurse", value: "pc_nurse" },
    { label: "General Practice Nurse (GP Nurse)", value: "gp_nurse" },
    { label: "Family Practice Nurse", value: "fam_prac_nurse" },
    { label: "Community Health Nurse", value: "comm_health_nurse" },
    { label: "Outpatient Nurse", value: "outpat_nurse" },
    { label: "Triage Nurse (Primary Care)", value: "triage_pc" },
    { label: "Health Promotion Nurse", value: "health_prom" },
    { label: "Care Coordinator / Case Manager Nurse", value: "care_coord" },
    { label: "Family Nurse Practitioner (FNP)", value: "fnp" },
    { label: "Primary Care Nurse Practitioner (NP)", value: "pc_np" },
    {
      label: "Advanced Practice Registered Nurse (APRN) – Family Medicine",
      value: "aprn_fam",
    },
    { label: "Nurse Prescriber (UK/EU/ANZ regions)", value: "nurse_pres" },
    { label: "Practice Nurse Manager", value: "prac_mgr" },
    { label: "Clinical Nurse Assistant (CNA) – GP Setting", value: "cna_gp" },
    {
      label: "Licensed Practical Nurse (LPN) / Enrolled Nurse (EN)",
      value: "lpn_en",
    },
    { label: "Medical Assistant (Nursing Background)", value: "ma_nurse" },
  ];

  const internalNurseJobLevels = [
    { label: "Internal Medicine Staff Nurse", value: "int_med_staff" },
    { label: "Medical-Surgical (Med-Surg) Nurse", value: "med_surg" },
    { label: "Chronic Disease Nurse Specialist", value: "chron_dis_spec" },
    { label: "Telemetry Nurse", value: "tele_nurse" },
    { label: "Inpatient Internal Medicine Nurse", value: "inpat_int_med" },
    {
      label: "Outpatient/Internal Medicine Clinic Nurse",
      value: "outpat_int_med",
    },
    {
      label: "Case Management Nurse (Internal Medicine)",
      value: "case_mgt_int",
    },
    {
      label: "Clinical Nurse Specialist (CNS) – Internal Medicine",
      value: "cns_int",
    },
    { label: "Nurse Educator (Internal Medicine)", value: "edu_int" },
    { label: "Adult Nurse Practitioner (ANP)", value: "anp" },
    { label: "Acute Care Nurse Practitioner (ACNP)", value: "acnp" },
    {
      label: "Clinical Nurse Specialist (CNS) – Adult Health/Internal Medicine",
      value: "cns_adult",
    },
  ];

  const paedsNurseJobLevels = [
    { label: "Paediatric Staff Nurse", value: "paed_staff" },
    {
      label: "Paediatric Intensive Care Unit (PICU) Nurse",
      value: "picu_nurse",
    },
    { label: "Paediatric Surgery Nurse", value: "paed_surg_nurse" },
    { label: "School Nurse", value: "school_nurse" },
    { label: "Paediatric Outpatient Nurse", value: "paed_outpat" },
    { label: "Paediatric Allergy/Immunology Nurse", value: "paed_all_im" },
    { label: "Neonatal Intensive Care Unit (NICU) Nurse", value: "nicu_nurse" },
    { label: "Neonatal Transport Nurse", value: "neo_trans" },
    { label: "Neonatal Nurse Practitioner (NNP)", value: "nnp" },
    { label: "Postnatal Ward Nurse", value: "postnat_ward" },
    { label: "Paediatric Nurse Practitioner (PNP)", value: "pnp" },
    {
      label: "Clinical Nurse Specialist (CNS) – Paediatrics/Neonatology",
      value: "cns_paed",
    },
    { label: "Paediatric Diabetes Nurse Specialist", value: "paed_diab_spec" },
    { label: "Paediatric Respiratory Nurse", value: "paed_resp" },
  ];

  const surgNurseJobLevels = [
    {
      label: "Perioperative Nurse / Operating Room (OR) Nurse",
      value: "peri_op",
    },
    { label: "Scrub Nurse", value: "scrub" },
    { label: "Circulating Nurse", value: "circ" },
    { label: "Preoperative Nurse", value: "preop" },
    {
      label: "Post-Anaesthesia Care Unit (PACU) Nurse / Recovery Room Nurse",
      value: "pacu",
    },
    { label: "Surgical ICU Nurse", value: "surg_icu" },
    { label: "Day Surgery / Ambulatory Care Nurse", value: "day_surg" },
    { label: "Specialty Surgical Nurse", value: "spec_surg" },
    {
      label: "Clinical Nurse Specialist (CNS) – Perioperative Nursing",
      value: "cns_peri",
    },
    { label: "Nurse Practitioner (NP) – Surgical", value: "np_surg" },
    { label: "Surgical Nurse Educator", value: "edu_surg" },
  ];

  const cardioNurseJobLevels = [
    { label: "Cardiac Care Nurse", value: "card_care" },
    { label: "Coronary Care Unit (CCU) Nurse", value: "ccu" },
    { label: "Telemetry Nurse (Cardiac)", value: "tele_card" },
    { label: "Cardiac Cath Lab Nurse", value: "cath_lab" },
    { label: "Electrophysiology Nurse", value: "ephys_nurse" },
    { label: "Heart Failure Nurse Specialist", value: "hf_spec" },
    { label: "Cardiac Rehabilitation Nurse", value: "card_rehab" },
    { label: "Paediatric Cardiology Nurse", value: "paed_card_nurse" },
    { label: "Cardiac Nurse Practitioner (NP)", value: "np_card" },
    {
      label: "Clinical Nurse Specialist (CNS) – Cardiology",
      value: "cns_card",
    },
    { label: "Cardiac Nurse Educator", value: "edu_card" },
  ];

  const pulmoNurseJobLevels = [
    { label: "Pulmonary Nurse", value: "pul_nurse" },
    { label: "Respiratory Care Nurse", value: "resp_care" },
    { label: "Critical Care/ICU Nurse (Pulmonary)", value: "crit_pul" },
    { label: "Sleep Clinic Nurse", value: "sleep_clin" },
    { label: "Pulmonary Function Test (PFT) Nurse", value: "pft" },
    { label: "Bronchoscopy Nurse", value: "bronch" },
    { label: "Pulmonary Rehabilitation Nurse", value: "pul_rehab" },
    { label: "Pulmonary Nurse Practitioner (NP)", value: "np_pul" },
    {
      label: "Clinical Nurse Specialist (CNS) – Pulmonology",
      value: "cns_pul",
    },
    { label: "Respiratory Nurse Educator", value: "edu_resp" },
  ];

  const neuroNurseJobLevels = [
    { label: "Neurology Staff Nurse", value: "neuro_staff" },
    { label: "Neuro ICU Nurse", value: "neuro_icu" },
    { label: "Epilepsy Nurse Specialist", value: "epilepsy_spec" },
    { label: "Stroke Nurse Specialist", value: "stroke_spec" },
    { label: "Multiple Sclerosis (MS) Nurse", value: "ms_nurse" },
    { label: "Neurosurgery Nurse", value: "neuro_surg_nurse" },
    { label: "Neuro Rehabilitation Nurse", value: "neuro_rehab_nurse" },
    { label: "Neurology Nurse Practitioner (NP)", value: "np_neuro" },
    {
      label: "Clinical Nurse Specialist (CNS) – Neurology",
      value: "cns_neuro",
    },
    { label: "Neuro Nurse Educator", value: "edu_neuro" },
  ];

  const endoNurseJobLevels = [
    { label: "Endocrinology Nurse", value: "endo_nurse" },
    { label: "Diabetes Nurse Specialist", value: "diab_spec" },
    { label: "Hormone Replacement Therapy (HRT) Nurse", value: "hrt" },
    { label: "Outpatient Endocrinology Nurse", value: "outpat_endo" },
    { label: "Inpatient Endocrinology Nurse", value: "inpat_endo" },
    { label: "Endocrine Oncology Nurse", value: "endo_onc" },
    { label: "Endocrinology Nurse Practitioner (NP)", value: "np_endo" },
    {
      label: "Clinical Nurse Specialist (CNS) – Endocrinology",
      value: "cns_endo",
    },
    { label: "Diabetes Educator Nurse", value: "diab_edu" },
  ];

  const gastroNurseJobLevels = [
    { label: "Gastroenterology Nurse", value: "gastro_nurse" },
    { label: "Endoscopy Nurse", value: "endo_nurse" },
    { label: "Hepatology Nurse", value: "hep_nurse" },
    {
      label: "Inflammatory Bowel Disease (IBD) Nurse Specialist",
      value: "ibd_spec",
    },
    { label: "Gastrointestinal Oncology Nurse", value: "gi_onc_nurse" },
    { label: "Outpatient Gastroenterology Nurse", value: "outpat_gastro" },
    { label: "Gastroenterology Nurse Practitioner (NP)", value: "np_gastro" },
    {
      label: "Clinical Nurse Specialist (CNS) – Gastroenterology",
      value: "cns_gastro",
    },
    { label: "Endoscopy Nurse Educator", value: "edu_endo" },
  ];

  const oncNurseJobLevels = [
    { label: "Oncology Staff Nurse", value: "onc_staff" },
    { label: "Chemotherapy Nurse", value: "chemo" },
    { label: "Radiation Oncology Nurse", value: "rad_onc_nurse" },
    { label: "Bone Marrow Transplant (BMT) Nurse", value: "bmt_nurse" },
    { label: "Paediatric Oncology Nurse", value: "paed_onc_nurse" },
    { label: "Oncology Clinical Trials Nurse", value: "onc_trials" },
    { label: "Hospice and Palliative Care Nurse", value: "hosp_pall" },
    { label: "Oncology Nurse Practitioner (NP)", value: "np_onc" },
    { label: "Clinical Nurse Specialist (CNS) – Oncology", value: "cns_onc" },
    { label: "Oncology Nurse Educator", value: "edu_onc" },
  ];

  const nephroNurseJobLevels = [
    { label: "Nephrology Nurse", value: "nephro_nurse" },
    { label: "Dialysis Nurse (Renal Nurse)", value: "dial_nurse" },
    { label: "Home Dialysis Nurse", value: "home_dial" },
    { label: "Transplant Nurse – Nephrology", value: "trans_neph" },
    { label: "CKD Nurse Educator", value: "ckd_edu" },
    { label: "Paediatric Nephrology Nurse", value: "paed_neph_nurse" },
    { label: "Nephrology Nurse Practitioner (NP)", value: "np_nephro" },
    {
      label: "Clinical Nurse Specialist (CNS) – Nephrology",
      value: "cns_nephro",
    },
    { label: "Renal Nurse Educator", value: "edu_ren" },
  ];

  const orthoNurseJobLevels = [
    { label: "Orthopaedic Staff Nurse", value: "ortho_staff" },
    { label: "Orthopaedic Surgical Nurse", value: "ortho_surg_nurse" },
    { label: "Orthopaedic Trauma Nurse", value: "ortho_trauma" },
    { label: "Orthopaedic Rehabilitation Nurse", value: "ortho_rehab" },
    { label: "Paediatric Orthopaedic Nurse", value: "paed_ortho_nurse" },
    { label: "Spine Nurse", value: "spine_nurse" },
    { label: "Casting/Fracture Clinic Nurse", value: "cast_clin" },
    { label: "Orthopaedic Nurse Practitioner (NP)", value: "np_ortho" },
    {
      label: "Clinical Nurse Specialist (CNS) – Orthopaedics",
      value: "cns_ortho",
    },
    { label: "Orthopaedic Nurse Educator", value: "edu_ortho" },
  ];

  const rheumNurseJobLevels = [
    { label: "Rheumatology Nurse", value: "rheum_nurse" },
    { label: "Autoimmune Disease Nurse", value: "auto_nurse" },
    { label: "Infusion Nurse – Rheumatology", value: "inf_rheum" },
    { label: "Lupus Nurse Specialist", value: "lupus_spec" },
    { label: "Arthritis Nurse Educator", value: "arth_edu" },
    { label: "Paediatric Rheumatology Nurse", value: "paed_rheum_nurse" },
    { label: "Rheumatology Nurse Practitioner (NP)", value: "np_rheum" },
    {
      label: "Clinical Nurse Specialist (CNS) – Rheumatology",
      value: "cns_rheum",
    },
    { label: "Biologic Therapy Nurse Specialist", value: "bio_ther_spec" },
  ];

  const psychNurseJobLevels = [
    { label: "Mental Health Nurse (Psychiatric Nurse)", value: "mh_nurse" },
    { label: "Community Mental Health Nurse", value: "comm_mh" },
    {
      label: "Child and Adolescent Mental Health Nurse",
      value: "child_adol_mh",
    },
    { label: "Forensic Mental Health Nurse", value: "for_mh" },
    { label: "Addiction Nurse Specialist", value: "add_spec" },
    { label: "Psychiatric Intensive Care Nurse", value: "psych_icu" },
    { label: "Crisis Intervention Nurse", value: "crisis_int" },
    { label: "Psychiatric Liaison Nurse", value: "psych_lia" },
    { label: "Mental Health Nurse Practitioner (NP)", value: "np_mh" },
    {
      label: "Clinical Nurse Specialist (CNS) – Mental Health",
      value: "cns_mh",
    },
    { label: "Psychiatric Nurse Educator", value: "edu_psych" },
  ];

  const dermNurseJobLevels = [
    { label: "Dermatology Nurse", value: "derm_nurse" },
    { label: "Wound Care Nurse", value: "wound_care" },
    { label: "Dermatology Nurse Practitioner (NP)", value: "np_derm" },
    { label: "Cosmetic Dermatology Nurse", value: "cos_derm_nurse" },
    { label: "Phototherapy Nurse", value: "photo_ther" },
    { label: "Skin Cancer Nurse Specialist", value: "skin_canc_spec" },
    { label: "Paediatric Dermatology Nurse", value: "paed_derm_nurse" },
    {
      label: "Clinical Nurse Specialist (CNS) – Dermatology",
      value: "cns_derm",
    },
    { label: "Dermatology Nurse Educator", value: "edu_derm" },
  ];

  const ophthNurseJobLevels = [
    { label: "Ophthalmology Nurse", value: "ophth_nurse" },
    { label: "Eye Surgery Nurse", value: "eye_surg" },
    { label: "Glaucoma Nurse Specialist", value: "glaucoma_spec" },
    { label: "Retina Nurse Specialist", value: "retina_spec" },
    { label: "Low Vision Nurse", value: "low_vision" },
    { label: "Paediatric Ophthalmology Nurse", value: "paed_ophth_nurse" },
    { label: "Ophthalmic Diagnostic Nurse", value: "oph_diag" },
    { label: "Ophthalmology Nurse Practitioner (NP)", value: "np_ophth" },
    {
      label: "Clinical Nurse Specialist (CNS) – Ophthalmology",
      value: "cns_ophth",
    },
    { label: "Ophthalmology Nurse Educator", value: "edu_ophth" },
  ];

  const entNurseJobLevels = [
    { label: "ENT Nurse", value: "ent_nurse" },
    { label: "Audiology Nurse", value: "audio_nurse" },
    { label: "Head and Neck Surgery Nurse", value: "hn_surg_nurse" },
    { label: "ENT Outpatient Nurse", value: "ent_outpat" },
    { label: "Sleep Apnoea Nurse Specialist", value: "sleep_ap_spec" },
    { label: "Paediatric ENT Nurse", value: "paed_ent_nurse" },
    { label: "Tinnitus Nurse Specialist", value: "tinn_spec" },
    { label: "ENT Nurse Practitioner (NP)", value: "np_ent" },
    { label: "Clinical Nurse Specialist (CNS) – ENT", value: "cns_ent" },
    { label: "ENT Nurse Educator", value: "edu_ent" },
  ];

  const radNurseJobLevels = [
    { label: "Radiology Nurse", value: "rad_nurse" },
    { label: "Interventional Radiology Nurse", value: "int_rad_nurse" },
    { label: "Radiology Procedure Nurse", value: "rad_proc" },
    { label: "Nuclear Medicine Nurse", value: "nuc_med_nurse" },
    { label: "MRI Nurse Specialist", value: "mri_spec" },
    { label: "Radiology Nurse Educator", value: "edu_rad" },
    { label: "Radiology Nurse Practitioner (NP)", value: "np_rad" },
    { label: "Clinical Nurse Specialist (CNS) – Radiology", value: "cns_rad" },
  ];

  const anaesNurseJobLevels = [
    { label: "Anaesthesia Nurse (Perioperative Nurse)", value: "anaes_peri" },
    { label: "Post-Anaesthesia Care Unit (PACU) Nurse", value: "pacu" },
    {
      label: "Critical Care Nurse (with anaesthesia focus)",
      value: "crit_anaes",
    },
    { label: "Regional Anaesthesia Nurse", value: "reg_anaes" },
    { label: "Sedation Nurse", value: "sed" },
    { label: "Anaesthesia Nurse Educator", value: "edu_anaes" },
    {
      label:
        "Nurse Anaesthetist (CRNA – Certified Registered Nurse Anaesthetist)",
      value: "crna",
    },
    {
      label: "Clinical Nurse Specialist (CNS) – Anaesthesia",
      value: "cns_anaes",
    },
  ];

  const emNurseJobLevels = [
    { label: "Emergency Nurse", value: "em_nurse" },
    { label: "Trauma Nurse", value: "trauma_nurse" },
    { label: "Triage Nurse", value: "triage" },
    { label: "Paediatric Emergency Nurse", value: "paed_em_nurse" },
    { label: "Critical Care Transport Nurse", value: "crit_trans" },
    { label: "Emergency Nurse Practitioner (ENP)", value: "enp" },
    { label: "Disaster/Emergency Preparedness Nurse", value: "dis_prep" },
    { label: "Clinical Nurse Specialist (CNS) – Emergency", value: "cns_em" },
  ];

  const pathNurseJobLevels = [
    { label: "Pathology Nurse", value: "path_nurse" },
    { label: "Phlebotomy Nurse", value: "phleb" },
    { label: "Histology/Histopathology Nurse", value: "histo_nurse" },
    { label: "Molecular Diagnostics Nurse", value: "mol_diag_nurse" },
    { label: "Specimen Transport Nurse", value: "spec_trans" },
    { label: "Clinical Nurse Specialist (CNS) – Pathology", value: "cns_path" },
    { label: "Pathology Nurse Educator", value: "edu_path" },
  ];

  const gerNurseJobLevels = [
    { label: "Geriatric Nurse", value: "ger_nurse" },
    { label: "Elder Care Nurse", value: "elder_care" },
    { label: "Dementia Care Nurse", value: "dem_care" },
    { label: "Palliative Care Nurse (Geriatrics)", value: "pall_ger" },
    { label: "Rehabilitation Nurse (Geriatrics)", value: "rehab_ger" },
    { label: "Geriatric Nurse Practitioner (NP)", value: "np_ger" },
    { label: "Clinical Nurse Specialist (CNS) – Geriatrics", value: "cns_ger" },
    { label: "Geriatric Nurse Educator", value: "edu_ger" },
  ];

  const idNurseJobLevels = [
    { label: "Infectious Diseases Nurse", value: "id_nurse" },
    { label: "Infection Control Nurse", value: "inf_ctrl" },
    { label: "HIV/AIDS Nurse Specialist", value: "hiv_spec" },
    { label: "Tuberculosis (TB) Nurse", value: "tb_nurse" },
    { label: "Travel Health Nurse", value: "travel_health" },
    {
      label: "Public Health Nurse (Infectious Diseases)",
      value: "pub_health_id",
    },
    { label: "Infectious Diseases Nurse Practitioner (NP)", value: "np_id" },
    {
      label: "Clinical Nurse Specialist (CNS) – Infectious Diseases",
      value: "cns_id",
    },
    { label: "Infectious Diseases Nurse Educator", value: "edu_id" },
  ];

  const haemNurseJobLevels = [
    { label: "Haematology Nurse", value: "haem_nurse" },
    { label: "Coagulation Nurse Specialist", value: "coag_spec" },
    { label: "Leukaemia Nurse Specialist", value: "leuk_spec" },
    { label: "Haematology Day Care Nurse", value: "haem_day_care" },
    { label: "Haematology Nurse Practitioner (NP)", value: "np_haem" },
    {
      label: "Clinical Nurse Specialist (CNS) – Haematology",
      value: "cns_haem",
    },
    { label: "Haematology Nurse Educator", value: "edu_haem" },
    { label: "Haematology Staff Nurse", value: "haem_staff" },
    { label: "Registered Nurse – Haematology Unit", value: "rn_haem" },
    { label: "Haematology Clinic Nurse", value: "haem_clin" },
    { label: "Inpatient Haematology Nurse", value: "inpat_haem" },
    { label: "Outpatient Haematology Nurse", value: "outpat_haem" },
    { label: "Haematology Nurse Specialist", value: "haem_spec" },
    { label: "Clinical Nurse Specialist – Haematology", value: "cns_haem" },
    { label: "Advanced Nurse Practitioner – Haematology", value: "anp_haem" },
    { label: "Nurse Consultant – Haematology", value: "nc_haem" },
    { label: "Nurse Educator – Haematology", value: "edu_haem" },
    { label: "Bone Marrow Transplant Nurse", value: "bmt_nurse" },
    { label: "Sickle Cell Nurse Specialist", value: "sickle_spec" },
    { label: "Haemophilia Nurse Specialist", value: "haemo_spec" },
    { label: "Apheresis Nurse", value: "aph_nurse" },
    { label: "Stem Cell Transplant Coordinator Nurse", value: "sct_coord" },
    { label: "Research Nurse – Haematology/Oncology", value: "res_haem_onc" },
    { label: "Clinical Trials Nurse – Haematology", value: "ct_haem" },
    {
      label: "Palliative Care Nurse – Haematology Patients",
      value: "pall_haem",
    },
    { label: "Blood Disorder Case Manager Nurse", value: "blood_case_mgt" },
    { label: "Oncology Haematology Nurse", value: "onc_haem_nurse" },
    { label: "Medical Oncology and Haematology Nurse", value: "med_onc_haem" },
    { label: "Paediatric Haematology Nurse", value: "paed_haem_nurse" },
    { label: "Infusion Nurse – Haematology", value: "inf_haem" },
    { label: "Transfusion Nurse", value: "trans_nurse" },
  ];

  const pallNurseJobLevels = [
    { label: "Palliative Care Nurse", value: "pall_nurse" },
    { label: "Hospice Nurse", value: "hosp_nurse" },
    { label: "Pain Management Nurse", value: "pain_mgt_nurse" },
    { label: "Paediatric Palliative Care Nurse", value: "paed_pall" },
    { label: "Home Care Palliative Nurse", value: "home_pall" },
    { label: "Bereavement Nurse Specialist", value: "bereave_spec" },
    { label: "Palliative Care Nurse Practitioner (NP)", value: "np_pall" },
    {
      label: "Clinical Nurse Specialist (CNS) – Palliative Care",
      value: "cns_pall",
    },
    { label: "Palliative Care Nurse Educator", value: "edu_pall" },
  ];

  const sportsNurseJobLevels = [
    { label: "Sports Medicine Nurse", value: "sports_med_nurse" },
    { label: "Athletic Trainer Nurse", value: "ath_train" },
    { label: "Rehabilitation Nurse (Sports Medicine)", value: "rehab_sports" },
    { label: "Orthopaedic Sports Nurse", value: "ortho_sports_nurse" },
    { label: "Exercise Physiologist Nurse", value: "ex_phys_nurse" },
    { label: "Concussion Nurse Specialist", value: "conc_spec" },
    { label: "Sports Nutrition Nurse", value: "sports_nut" },
    { label: "Sports Medicine Nurse Practitioner (NP)", value: "np_sports" },
    {
      label: "Clinical Nurse Specialist (CNS) – Sports Medicine",
      value: "cns_sports",
    },
  ];

  const occNurseJobLevels = [
    { label: "Occupational Health Nurse", value: "occ_health_nurse" },
    { label: "Workplace Safety Nurse", value: "wp_safety" },
    { label: "Industrial Health Nurse", value: "ind_health" },
    { label: "Case Management Nurse (Occupational Health)", value: "case_occ" },
    { label: "Employee Wellness Nurse", value: "emp_well" },
    { label: "Ergonomics Nurse Specialist", value: "erg_spec" },
    { label: "Environmental Health Nurse", value: "env_health_nurse" },
    { label: "Occupational Health Nurse Practitioner (NP)", value: "np_occ" },
    {
      label: "Clinical Nurse Specialist (CNS) – Occupational Health",
      value: "cns_occ",
    },
    { label: "Occupational Health Nurse Educator", value: "edu_occ" },
  ];

  const histoNurseJobLevels = [
    { label: "Histopathology Nurse", value: "histo_nurse" },
    { label: "Histology Nurse", value: "histo_nurse" },
    { label: "Anatomical Pathology Nurse", value: "anat_path_nurse" },
    { label: "Tissue Bank Nurse", value: "tiss_bank" },
    { label: "Pathology Nurse Specialist", value: "path_spec" },
    { label: "Surgical Tissue Recovery Nurse", value: "surg_tiss" },
    {
      label: "Biomedical Science Support Nurse (Histology Focus)",
      value: "bio_supp_histo",
    },
    {
      label: "Advanced Nurse Practitioner (Histopathology)",
      value: "anp_histo",
    },
    {
      label: "Clinical Nurse Specialist – Pathology Services",
      value: "cns_path_serv",
    },
    { label: "Research Nurse – Histopathology", value: "res_histo" },
    { label: "Quality Control Nurse – Histology Lab", value: "qc_histo" },
    { label: "Senior Pathology Nurse Coordinator", value: "sr_path_coord" },
    { label: "Consultant Nurse – Cellular Pathology", value: "cons_cell_path" },
    { label: "Molecular Pathology Nurse Specialist", value: "mol_path_spec" },
    {
      label: "Operating Room Nurse (Histopathology Specimen Handling)",
      value: "or_histo",
    },
    {
      label: "Oncology Nurse (with Histopathology Liaison Duties)",
      value: "onc_histo_lia",
    },
    {
      label: "Post-Mortem Nurse (PME/Autopsy Suite Nurse)",
      value: "post_mort",
    },
    { label: "Tissue Procurement Nurse", value: "tiss_proc" },
    { label: "Intraoperative Frozen Section Nurse", value: "intra_froz" },
  ];

  const cytoNurseJobLevels = [
    { label: "Cytopathology Nurse", value: "cyto_nurse" },
    { label: "Cytology Nurse", value: "cyto_nurse" },
    { label: "Pathology Nurse – Cytology", value: "path_cyto" },
    { label: "Cytopathology Support Nurse", value: "supp_cyto" },
    { label: "Specimen Collection Nurse – Cytology", value: "spec_coll_cyto" },
    { label: "Pap Smear Nurse", value: "pap_smear" },
    { label: "Fine Needle Aspiration (FNA) Nurse", value: "fna" },
    {
      label:
        "EUS-FNA Procedure Nurse (Endoscopic Ultrasound-Guided Fine Needle Aspiration)",
      value: "eus_fna",
    },
    { label: "Clinical Nurse Specialist – Cytopathology", value: "cns_cyto" },
    {
      label: "Cytopathology Procedure Coordinator Nurse",
      value: "proc_coord_cyto",
    },
    { label: "Advanced Nurse Practitioner – Cytopathology", value: "anp_cyto" },
    { label: "FNA Clinic Nurse Coordinator", value: "fna_clin_coord" },
    { label: "Cervical Screening Nurse Specialist", value: "cerv_screen_spec" },
    { label: "Liquid-Based Cytology Nurse", value: "liq_cyto" },
    {
      label: "Rapid On-Site Evaluation (ROSE) Nurse Assistant",
      value: "rose_ass",
    },
    { label: "Oncology Nurse with Cytopathology Duties", value: "onc_cyto" },
    { label: "Diagnostic Nurse – Cytology", value: "diag_cyto" },
    { label: "Colposcopy Clinic Nurse", value: "colpo_clin" },
    { label: "Women’s Health Nurse – Cytology Focus", value: "womens_cyto" },
    {
      label: "Endoscopy Nurse – Cytology Specimen Handling",
      value: "endo_cyto",
    },
    { label: "Research Nurse – Cytopathology", value: "res_cyto" },
    { label: "Nurse Educator – Cytology/Screening", value: "edu_cyto" },
    { label: "Clinical Trials Nurse – Cytology Diagnostics", value: "ct_cyto" },
  ];

  const molDiagNurseJobLevels = [
    { label: "Molecular Diagnostics Nurse", value: "mol_diag_nurse" },
    { label: "Genomics Nurse", value: "genom_nurse" },
    { label: "Precision Medicine Nurse", value: "prec_med_nurse" },
    { label: "Genetic Testing Nurse", value: "gen_test_nurse" },
    { label: "Genomic Screening Nurse", value: "gen_screen" },
    { label: "Molecular Oncology Nurse", value: "mol_onc_nurse" },
    { label: "Biomarker Testing Nurse", value: "biom_test" },
    { label: "Molecular Pathology Nurse", value: "mol_path_nurse" },
    {
      label: "Clinical Nurse Specialist – Molecular Diagnostics",
      value: "cns_mol_diag",
    },
    {
      label: "Advanced Nurse Practitioner – Genomic Medicine",
      value: "anp_gen_med",
    },
    {
      label:
        "Genetic Nurse Counsellor (in some countries, requires additional licensure)",
      value: "gen_coun",
    },
    { label: "Molecular Testing Coordinator Nurse", value: "mol_test_coord" },
    { label: "Cancer Genomics Nurse Specialist", value: "canc_gen_spec" },
    {
      label: "Next-Generation Sequencing (NGS) Nurse Advisor",
      value: "ngs_adv",
    },
    { label: "Pharmacogenomics Nurse Specialist", value: "pharm_gen_spec" },
    { label: "Clinical Research Nurse – Molecular Studies", value: "cr_mol" },
    { label: "Molecular Clinical Trials Nurse", value: "ct_mol" },
    { label: "Lab Liaison Nurse – Molecular Testing", value: "lab_lia_mol" },
    { label: "Bioinformatics Nurse Liaison", value: "bioinf_lia" },
    {
      label: "Molecular Data Interpretation Nurse Assistant",
      value: "mol_data_ass",
    },
  ];

  const microNurseJobLevels = [
    { label: "Microbiology Nurse", value: "micro_nurse" },
    { label: "Infection Prevention Nurse", value: "inf_prev" },
    { label: "Clinical Nurse – Microbiology Unit", value: "clin_micro" },
    { label: "Isolation Ward Nurse", value: "isol_ward" },
    { label: "Antimicrobial Stewardship Nurse", value: "ant_stew" },
    { label: "Outbreak Response Nurse", value: "outbreak_resp" },
    { label: "Pathology Nurse – Microbiology", value: "path_micro" },
    {
      label: "Microbiology Specimen Collection Nurse",
      value: "spec_coll_micro",
    },
    { label: "Clinical Laboratory Liaison Nurse", value: "lab_lia" },
    {
      label: "Specimen Transport & Handling Nurse (Microbiology Focus)",
      value: "spec_trans_micro",
    },
    { label: "Lab Support Nurse – Microbial Testing", value: "lab_supp_micro" },
    {
      label: "Public Health Nurse – Infectious Disease Surveillance",
      value: "pub_health_surv",
    },
    { label: "Disease Surveillance Nurse", value: "dis_surv" },
    { label: "Epidemiology Nurse", value: "epi_nurse" },
    { label: "Field Infection Control Nurse", value: "field_inf_ctrl" },
    {
      label: "Community Health Nurse – Infectious Disease Focus",
      value: "comm_health_id",
    },
    {
      label: "Clinical Research Nurse – Microbiology/Infectious Diseases",
      value: "cr_micro_id",
    },
    { label: "Microbial Genomics Nurse Specialist", value: "micro_gen_spec" },
    { label: "Vaccine Research Nurse", value: "vaccine_res" },
    { label: "Biosecurity Nurse", value: "bio_sec" },
    { label: "Antibiotic Resistance Nurse Advocate", value: "ab_res_adv" },
    { label: "ICU Nurse (Infection Management Focus)", value: "icu_inf_mgt" },
    {
      label: "Operating Room Nurse (Aseptic Technique & Infection Control)",
      value: "or_asep",
    },
    {
      label: "Transplant Nurse (Infection Risk Monitoring)",
      value: "trans_inf_risk",
    },
    { label: "Paediatric Infectious Disease Nurse", value: "paed_id_nurse" },
    { label: "TB Control Program Nurse", value: "tb_ctrl" },
    { label: "HIV/AIDS Nurse", value: "hiv_nurse" },
    { label: "COVID-19 Response Nurse", value: "covid_resp" },
  ];

  const clinChemNurseJobLevels = [
    { label: "Clinical Chemistry Nurse", value: "clin_chem_nurse" },
    { label: "Clinical Laboratory Nurse", value: "clin_lab_nurse" },
    { label: "Specimen Collection Nurse", value: "spec_coll" },
    { label: "Diagnostic Services Nurse", value: "diag_serv" },
    { label: "Lab Liaison Nurse", value: "lab_lia" },
    {
      label: "Clinical Nurse – Biochemistry Department",
      value: "clin_biochem",
    },
    { label: "Pre-Analytical Services Nurse", value: "pre_anal" },
    { label: "Outpatient Laboratory Nurse", value: "outpat_lab" },
    { label: "Point-of-Care Testing (POCT) Nurse", value: "poct" },
    { label: "Metabolic Screening Nurse", value: "met_screen" },
    { label: "Electrolyte Monitoring Nurse", value: "elec_mon" },
    { label: "Therapeutic Drug Monitoring (TDM) Nurse", value: "tdm" },
    {
      label: "Clinical Nurse Specialist – Laboratory Medicine",
      value: "cns_lab_med",
    },
    { label: "Biochemistry Nurse Consultant", value: "cons_biochem" },
    { label: "Endocrinology Nurse (Biochemistry Link)", value: "endo_biochem" },
    { label: "Toxicology Nurse", value: "tox_nurse" },
    { label: "Cardiac Biomarker Nurse", value: "card_biom" },
    { label: "Renal Function Monitoring Nurse", value: "ren_func" },
    { label: "Metabolic Disorder Nurse Specialist", value: "met_dis_spec" },
    {
      label: "Clinical Research Nurse – Biochemistry Focus",
      value: "cr_biochem",
    },
    { label: "Lab Data Quality Assurance Nurse", value: "lab_qa" },
    { label: "Medical Laboratory Liaison Nurse", value: "med_lab_lia" },
    {
      label: "Public Health Nurse – Screening Programs",
      value: "pub_health_screen",
    },
    { label: "Clinical Trials Nurse – Lab Diagnostics", value: "ct_lab_diag" },
  ];

  const forPathNurseJobLevels = [
    { label: "Forensic Nurse", value: "for_nurse" },
    { label: "Forensic Pathology Nurse", value: "for_path_nurse" },
    { label: "Forensic Nurse Examiner (FNE)", value: "fne" },
    { label: "Sexual Assault Nurse Examiner (SANE)", value: "sane" },
    { label: "Forensic Clinical Nurse Specialist", value: "cns_for" },
    { label: "Nurse Death Investigator", value: "death_inv" },
    { label: "Medico-Legal Nurse Consultant", value: "med_legal_cons" },
    { label: "Forensic Autopsy Nurse", value: "for_autopsy" },
    { label: "Trauma/ER Forensic Nurse", value: "trauma_er_for" },
    { label: "Forensic Nurse Investigator", value: "for_inv" },
    { label: "Nurse Coroner Assistant", value: "coroner_ass" },
    {
      label: "Medicolegal Death Investigator (with nursing background)",
      value: "med_death_inv",
    },
    { label: "Crime Scene Nurse Consultant", value: "crime_scene_cons" },
    { label: "Nurse Forensic Case Manager", value: "for_case_mgt" },
    { label: "Forensic Evidence Collection Nurse", value: "for_ev_coll" },
    { label: "Forensic Nursing Educator", value: "edu_for" },
    {
      label: "Clinical Instructor in Forensic Nursing",
      value: "clin_inst_for",
    },
    { label: "Forensic Research Nurse", value: "res_for" },
    {
      label: "Academic Lecturer in Forensic Pathology Nursing",
      value: "lect_for_path",
    },
    {
      label: "Program Coordinator – Forensic Nursing",
      value: "prog_coord_for",
    },
    { label: "Forensic Nursing Program Director", value: "dir_for_prog" },
    { label: "Chief Forensic Nurse Examiner", value: "chief_for_ex" },
    {
      label: "Forensic Nursing Coordinator (Hospital/Community)",
      value: "coord_for_hosp",
    },
    { label: "Supervisor – Forensic Nurse Services", value: "sup_for_serv" },
    {
      label: "Director of Forensic & Medico-Legal Services",
      value: "dir_for_med_legal",
    },
  ];

  const immunoNurseJobLevels = [
    { label: "Immunopathology Nurse", value: "immuno_nurse" },
    { label: "Clinical Immunology Nurse", value: "clin_immuno_nurse" },
    { label: "Autoimmune Disorders Nurse Specialist", value: "auto_spec" },
    {
      label:
        "Transplant Immunology Nurse (focus on graft rejection, immunosuppression)",
      value: "trans_immuno",
    },
    { label: "Allergy & Immunology Nurse", value: "all_immuno_nurse" },
    {
      label: "Rheumatology/Immunology Nurse Specialist",
      value: "rheum_immuno_spec",
    },
    {
      label:
        "Oncology Immunotherapy Nurse (checkpoint inhibitors, CAR-T, etc.)",
      value: "onc_immuno_ther",
    },
    {
      label: "Infectious Disease & Immunology Nurse",
      value: "id_immuno_nurse",
    },
    {
      label:
        "Immunopathology Lab Nurse (liaison between patients and lab teams)",
      value: "immuno_lab_lia",
    },
    { label: "Clinical Trials Nurse – Immunopathology", value: "ct_immuno" },
    {
      label: "Nurse Coordinator – Immunology Diagnostics",
      value: "coord_immuno_diag",
    },
    { label: "Immunology Research Nurse", value: "res_immuno" },
    { label: "Nurse Scientist – Immunopathology", value: "ns_immuno" },
    { label: "Immunology Nursing Educator", value: "edu_immuno" },
    {
      label: "Research Nurse in Immunopathology/Immunotherapy",
      value: "res_immuno_ther",
    },
    {
      label: "Clinical Instructor – Immunology/Pathology Nursing",
      value: "clin_inst_immuno",
    },
    {
      label: "Program Coordinator – Immunopathology Nursing",
      value: "prog_coord_immuno",
    },
    { label: "Immunology/Pathology Nurse Manager", value: "mgr_immuno_path" },
    {
      label: "Director of Clinical Immunology Nursing",
      value: "dir_clin_immuno",
    },
    {
      label: "Advanced Practice Nurse (APN) – Immunopathology",
      value: "apn_immuno",
    },
  ];

  // Function to get job levels for nursing
  const getNursingJobLevels = () => {
    switch (specialization) {
      case "gp_nurse":
        return gpNurseJobLevels;
      case "internal_nurse":
        return internalNurseJobLevels;
      case "paeds_nurse":
        return paedsNurseJobLevels;
      case "surg_nurse":
        return surgNurseJobLevels;
      case "cardio_nurse":
        return cardioNurseJobLevels;
      case "pulmo_nurse":
        return pulmoNurseJobLevels;
      case "neuro_nurse":
        return neuroNurseJobLevels;
      case "endo_nurse":
        return endoNurseJobLevels;
      case "gastro_nurse":
        return gastroNurseJobLevels;
      case "onc_nurse":
        return oncNurseJobLevels;
      case "nephro_nurse":
        return nephroNurseJobLevels;
      case "ortho_nurse":
        return orthoNurseJobLevels;
      case "rheum_nurse":
        return rheumNurseJobLevels;
      case "psych_nurse":
        return psychNurseJobLevels;
      case "derm_nurse":
        return dermNurseJobLevels;
      case "ophth_nurse":
        return ophthNurseJobLevels;
      case "ent_nurse":
        return entNurseJobLevels;
      case "rad_nurse":
        return radNurseJobLevels;
      case "anaes_nurse":
        return anaesNurseJobLevels;
      case "em_nurse":
        return emNurseJobLevels;
      case "path_nurse":
        return pathNurseJobLevels;
      case "ger_nurse":
        return gerNurseJobLevels;
      case "id_nurse":
        return idNurseJobLevels;
      case "haem_nurse":
        return haemNurseJobLevels;
      case "pall_nurse":
        return pallNurseJobLevels;
      case "sports_nurse":
        return sportsNurseJobLevels;
      case "occ_nurse":
        return occNurseJobLevels;
      case "histo_nurse":
        return histoNurseJobLevels;
      case "cyto_nurse":
        return cytoNurseJobLevels;
      case "mol_diag_nurse":
        return molDiagNurseJobLevels;
      case "micro_nurse":
        return microNurseJobLevels;
      case "clin_chem_nurse":
        return clinChemNurseJobLevels;
      case "for_path_nurse":
        return forPathNurseJobLevels;
      case "immuno_nurse":
        return immunoNurseJobLevels;
      default:
        return [];
    }
  };

  // Pharmacy Key Areas
  const pharmacyKeyAreas = [
    { label: "Clinical & Patient-Centred Specializations", value: "clinical" },
    { label: "Laboratory & Diagnostic Specializations", value: "lab_diag" },
    {
      label: "Hospital & Institutional Pharmacy Specialties",
      value: "hosp_inst",
    },
    { label: "Research, Industry, and Development", value: "research" },
    { label: "Retail & Community Pharmacy Specializations", value: "retail" },
    {
      label: "Administrative, Educational & Legal Fields",
      value: "admin_ed_legal",
    },
    { label: "Global health and niche services", value: "global_niche" },
    { label: "Leadership & Administration", value: "leadership" },
  ];

  // Clinical Key Area Specializations
  const clinicalPharmSpecializations = [
    { label: "Clinical Pharmacy", value: "clin_pharm" },
    { label: "Cardiology Pharmacy", value: "card_pharm" },
    { label: "Oncology Pharmacy", value: "onc_pharm" },
    { label: "Infectious Diseases Pharmacy", value: "id_pharm" },
    { label: "Critical Care Pharmacy", value: "crit_pharm" },
    { label: "Geriatric Pharmacy", value: "ger_pharm" },
    { label: "Paediatric Pharmacy", value: "paed_pharm" },
    { label: "Psychiatric Pharmacy", value: "psych_pharm" },
    { label: "Ambulatory Care Pharmacy", value: "amb_care" },
    { label: "Emergency Medicine Pharmacy", value: "em_pharm" },
    { label: "Nephrology Pharmacy", value: "neph_pharm" },
    { label: "Internal Medicine Pharmacy", value: "int_med_pharm" },
    {
      label: "Pain Management and Palliative Care Pharmacy",
      value: "pain_pall_pharm",
    },
  ];

  const clinicalPharmJobLevels = [
    { label: "Clinical Pharmacist", value: "clin_pharm" },
    { label: "Clinical Pharmacy Specialist", value: "clin_spec" },
    { label: "Clinical Staff Pharmacist", value: "clin_staff" },
    { label: "Clinical Pharmacist Practitioner (CPP)", value: "cpp" },
    { label: "Clinical Pharmacy Consultant", value: "clin_cons" },
    { label: "Senior Clinical Pharmacist", value: "sr_clin" },
    { label: "Advanced Clinical Pharmacist", value: "adv_clin" },
    { label: "Lead Clinical Pharmacist", value: "lead_clin" },
    { label: "Cardiology Clinical Pharmacist", value: "card_clin" },
    { label: "Oncology Clinical Pharmacist", value: "onc_clin" },
    { label: "Infectious Disease Clinical Pharmacist", value: "id_clin" },
    { label: "Critical Care Clinical Pharmacist", value: "crit_clin" },
    { label: "Geriatric Clinical Pharmacist", value: "ger_clin" },
    { label: "Paediatric Clinical Pharmacist", value: "paed_clin" },
    { label: "Psychiatric Clinical Pharmacist", value: "psych_clin" },
    { label: "Emergency Medicine Clinical Pharmacist", value: "em_clin" },
    { label: "Nephrology Clinical Pharmacist", value: "neph_clin" },
    { label: "Anticoagulation Clinical Pharmacist", value: "anti_clin" },
    { label: "Endocrinology Clinical Pharmacist", value: "endo_clin" },
    { label: "HIV/AIDS Clinical Pharmacist", value: "hiv_clin" },
    { label: "Transplant Clinical Pharmacist", value: "trans_clin" },
    { label: "Haematology Clinical Pharmacist", value: "haem_clin" },
    { label: "Pain Management Clinical Pharmacist", value: "pain_clin" },
    { label: "Palliative Care Clinical Pharmacist", value: "pall_clin" },
  ];

  // Lab & Diagnostic Key Area Specializations
  const labDiagPharmSpecializations = [
    { label: "Pharmacogenomics and Precision Medicine", value: "pharm_gen" },
    { label: "Pharmacokinetics and Pharmacodynamics", value: "pk_pd" },
    { label: "Nuclear Pharmacy", value: "nuc_pharm" },
    { label: "Compounding Pharmacy", value: "comp_pharm" },
    { label: "Clinical Toxicology", value: "clin_tox" },
    { label: "Therapeutic Drug Monitoring (TDM)", value: "tdm" },
  ];

  const labDiagPharmJobLevels = [
    {
      label: "Clinical Pharmacist – Laboratory Medicine",
      value: "clin_lab_med",
    },
    {
      label: "Pharmacy Liaison – Diagnostic Services",
      value: "pharm_lia_diag",
    },
    {
      label: "Pharmacist Specialist – Therapeutic Drug Monitoring (TDM)",
      value: "spec_tdm",
    },
    { label: "Pharmacogenomics Pharmacist", value: "pharm_gen_pharm" },
    { label: "Molecular Diagnostics Pharmacist", value: "mol_diag_pharm" },
    { label: "Clinical Pharmacist – Toxicology", value: "clin_tox_pharm" },
    { label: "Pharmacy Specialist – Biomarker Testing", value: "spec_biom" },
    {
      label: "Pharmacy Consultant – Laboratory Services",
      value: "cons_lab_serv",
    },
    {
      label: "Pharmacy Research Specialist – Diagnostics",
      value: "res_spec_diag",
    },
    { label: "Laboratory Liaison Pharmacist", value: "lab_lia_pharm" },
  ];

  // Research Key Area Specializations
  const researchPharmSpecializations = [
    { label: "Pharmaceutical Research and Development", value: "pharm_rd" },
    { label: "Regulatory Affairs Pharmacy", value: "reg_aff" },
    { label: "Pharmacovigilance", value: "pharm_vig" },
    { label: "Clinical Trials Pharmacist", value: "ct_pharm" },
    { label: "Medical Science Liaison (MSL)", value: "msl" },
    { label: "Drug Information Specialist", value: "drug_info" },
    { label: "Formulation Scientist", value: "form_sci" },
    {
      label: "Biopharmaceuticals & Biotechnology Pharmacy",
      value: "bio_pharm",
    },
    { label: "Pharmaceutical Manufacturing Pharmacist", value: "manuf_pharm" },
  ];

  const researchPharmJobLevels = [
    { label: "Pharmaceutical Scientist", value: "pharm_sci" },
    { label: "Research Pharmacist", value: "res_pharm" },
    { label: "Clinical Research Pharmacist", value: "cr_pharm" },
    { label: "Drug Development Scientist", value: "drug_dev_sci" },
    { label: "Formulation Scientist", value: "form_sci" },
    { label: "Medicinal Chemist", value: "med_chem" },
    { label: "Pharmacologist", value: "pharm_col" },
    { label: "Toxicologist", value: "tox" },
    { label: "Pharmaceutical Research Associate", value: "pharm_res_ass" },
    { label: "Biopharmaceutical Scientist", value: "bio_pharm_sci" },
    { label: "Pharmaceutical Microbiologist", value: "pharm_micro" },
    { label: "Pharmacokinetics Scientist", value: "pk_sci" },
    { label: "Bioanalytical Scientist", value: "bio_anal_sci" },
    { label: "Pharmacogenomics Scientist", value: "pharm_gen_sci" },
    { label: "Clinical Trials Pharmacist", value: "ct_pharm" },
    { label: "Clinical Research Coordinator", value: "crc" },
    { label: "Regulatory Affairs Specialist", value: "reg_spec" },
    { label: "Regulatory Affairs Manager", value: "reg_mgr" },
    { label: "Quality Assurance (QA) Specialist", value: "qa_spec" },
    { label: "Quality Control (QC) Analyst", value: "qc_anal" },
    { label: "Pharmacovigilance Specialist", value: "pharm_vig_spec" },
    { label: "Drug Safety Officer", value: "drug_saf_off" },
    { label: "Medical Science Liaison (MSL)", value: "msl" },
    { label: "Clinical Data Manager", value: "clin_data_mgr" },
    { label: "Biostatistician", value: "bio_stat" },
    { label: "Pharmaceutical Manufacturing Pharmacist", value: "manuf_pharm" },
    { label: "Process Development Scientist", value: "proc_dev_sci" },
    {
      label: "Production Supervisor – Pharmaceutical Manufacturing",
      value: "prod_sup_manuf",
    },
    { label: "Validation Specialist", value: "val_spec" },
    { label: "Quality Control Pharmacist", value: "qc_pharm" },
    {
      label: "Sterile Products Manufacturing Specialist",
      value: "ster_manuf_spec",
    },
    { label: "Medical Affairs Pharmacist", value: "med_aff_pharm" },
    { label: "Pharmaceutical Sales Specialist", value: "pharm_sales_spec" },
    { label: "Pharmaceutical Marketing Manager", value: "pharm_mark_mgr" },
    {
      label: "Health Economics and Outcomes Research (HEOR) Specialist",
      value: "heor_spec",
    },
    { label: "Pharmacy Business Development Manager", value: "pharm_bus_dev" },
    { label: "Pharmaceutical Policy Analyst", value: "pharm_pol_anal" },
  ];

  // Retail Key Area Specializations
  const retailPharmSpecializations = [
    { label: "Community Pharmacy", value: "comm_pharm" },
    { label: "Retail Pharmacy Management", value: "ret_mgt" },
    { label: "Medication Therapy Management (MTM)", value: "mtm" },
    { label: "Travel Health Pharmacist", value: "travel_health" },
    { label: "Immunization Pharmacist", value: "imm_pharm" },
    { label: "Wellness & Lifestyle Pharmacist", value: "well_lifestyle" },
  ];

  const retailPharmJobLevels = [
    { label: "Community Pharmacist", value: "comm_pharm" },
    { label: "Retail Pharmacist", value: "ret_pharm" },
    { label: "Dispensing Pharmacist", value: "disp_pharm" },
    { label: "Staff Pharmacist", value: "staff_pharm" },
    { label: "Licensed Pharmacist", value: "lic_pharm" },
    { label: "Registered Pharmacist (RPh)", value: "rph" },
    { label: "Supervising Pharmacist", value: "sup_pharm" },
    { label: "Relief Pharmacist", value: "rel_pharm" },
    { label: "Pharmacy Intern", value: "pharm_int" },
    { label: "Pharmacist in Charge (PIC)", value: "pic" },
    {
      label: "Medication Therapy Management (MTM) Pharmacist",
      value: "mtm_pharm",
    },
    { label: "Immunization Pharmacist", value: "imm_pharm" },
    { label: "Consulting Pharmacist", value: "cons_pharm" },
    { label: "Travel Health Pharmacist", value: "travel_health_pharm" },
    { label: "Wellness Pharmacist", value: "well_pharm" },
    { label: "Chronic Disease Management Pharmacist", value: "chron_dis_mgt" },
    { label: "Point-of-Care Testing (POCT) Pharmacist", value: "poct_pharm" },
    { label: "Retail Pharmacy Supervisor", value: "ret_sup" },
    { label: "District Pharmacy Manager", value: "dist_pharm_mgr" },
    { label: "Pharmacy Director – Retail Chain", value: "dir_ret_chain" },
    { label: "Pharmacy Franchise Owner", value: "fran_owner" },
    { label: "Independent Pharmacy Owner", value: "ind_owner" },
    { label: "Pharmacy Technician", value: "pharm_tech" },
    { label: "Senior Pharmacy Technician", value: "sr_pharm_tech" },
    { label: "Certified Pharmacy Technician (CPhT)", value: "cph t" },
    { label: "Pharmacy Assistant", value: "pharm_ass" },
    { label: "Pharmacy Clerk", value: "pharm_clerk" },
    { label: "Pharmacy Aide", value: "pharm_aide" },
    { label: "Pharmacy Cashier", value: "pharm_cash" },
    { label: "Inventory Control Pharmacist", value: "inv_ctrl_pharm" },
    { label: "Controlled Substances Pharmacist", value: "ctrl_sub_pharm" },
    { label: "Compliance Pharmacist – Retail Setting", value: "comp_ret" },
    { label: "Pharmacy Buyer / Procurement Specialist", value: "buyer_proc" },
    {
      label: "Supply Chain Pharmacist – Community Pharmacy",
      value: "sup_chain_comm",
    },
    { label: "Tele Pharmacy Pharmacist", value: "tele_pharm" },
    { label: "e-Prescription Processing Pharmacist", value: "e_pres_proc" },
    {
      label: "Digital Health Pharmacist (Retail Platform)",
      value: "dig_health_ret",
    },
    { label: "Virtual MTM Pharmacist", value: "virt_mtm" },
    { label: "Mobile Clinic Pharmacist", value: "mob_clin" },
  ];

  // Admin Ed Legal Key Area Specializations
  const adminEdLegalPharmSpecializations = [
    { label: "Pharmacy Administration", value: "pharm_admin" },
    { label: "Health Informatics Pharmacist", value: "health_inf" },
    { label: "Managed Care Pharmacy", value: "mgt_care" },
    { label: "Pharmacoeconomics", value: "pharm_econ" },
    { label: "Academic/Teaching Pharmacy", value: "acad_teach" },
    { label: "Pharmacy Law and Ethics", value: "law_eth" },
    { label: "Public Health Pharmacy", value: "pub_health_pharm" },
    { label: "Policy and Advocacy Pharmacist", value: "pol_adv" },
    { label: "Military Pharmacy", value: "mil_pharm" },
  ];

  const adminEdLegalPharmJobLevels = [
    { label: "Pharmacy Educator", value: "pharm_edu" },
    { label: "Clinical Pharmacy Educator", value: "clin_pharm_edu" },
    { label: "Academic Pharmacist", value: "acad_pharm" },
    { label: "Professor of Pharmacy", value: "prof_pharm" },
    {
      label: "Assistant Professor – Pharmacy Practice",
      value: "ass_prof_prac",
    },
    {
      label: "Associate Professor – Pharmaceutical Sciences",
      value: "ass_prof_sci",
    },
    { label: "Lecturer – Pharmacology / Pharmacy", value: "lect_pharm" },
    { label: "Adjunct Faculty – Pharmacy", value: "adj_fac" },
    { label: "Pharmacy Residency Program Director", value: "res_dir" },
    { label: "Preceptor – Pharmacy Students/Interns", value: "precept" },
    {
      label: "Continuing Education (CE) Program Coordinator",
      value: "ce_coord",
    },
    { label: "Pharmacy Curriculum Developer", value: "curr_dev" },
    { label: "Pharmacy Skills Lab Coordinator", value: "skills_lab_coord" },
    { label: "Simulation Lab Instructor (Pharmacy)", value: "sim_inst" },
    {
      label: "Graduate Program Coordinator – Pharmacy",
      value: "grad_prog_coord",
    },
    { label: "Regulatory Affairs Pharmacist", value: "reg_aff_pharm" },
    { label: "Compliance Pharmacist", value: "comp_pharm" },
    { label: "Pharmacy Inspector / Compliance Officer", value: "insp_comp" },
    { label: "Pharmacy Law and Ethics Instructor", value: "law_eth_inst" },
    {
      label: "Drug Enforcement Officer (Pharmacy Background)",
      value: "drug_enf",
    },
    {
      label: "Licensing and Accreditation Officer – Pharmacy Board",
      value: "lic_acc_off",
    },
    { label: "Policy Advisor – Pharmacy Practice", value: "pol_adv_pharm" },
    { label: "Pharmacy Law Consultant", value: "law_cons" },
    {
      label: "Legal and Regulatory Policy Analyst (Pharmaceutical Sector)",
      value: "legal_reg_anal",
    },
    { label: "Medicines Legislation Advisor", value: "med_leg_adv" },
    { label: "Pharmaceutical Compliance Manager", value: "pharm_comp_mgr" },
    { label: "Clinical Governance Pharmacist", value: "clin_gov_pharm" },
    {
      label: "Good Manufacturing Practice (GMP) Compliance Pharmacist",
      value: "gmp_comp",
    },
    {
      label: "Pharmacovigilance Compliance Specialist",
      value: "pharm_vig_comp",
    },
    { label: "Health Authority Liaison Pharmacist", value: "health_auth_lia" },
    { label: "Pharmacy Policy Analyst", value: "pharm_pol_anal" },
    { label: "Health Policy Pharmacist", value: "health_pol_pharm" },
    { label: "Pharmaceutical Affairs Officer", value: "pharm_aff_off" },
    {
      label: "Public Health Pharmacist – Policy Division",
      value: "pub_health_pol",
    },
    { label: "Advocacy Manager – Pharmacy Association", value: "adv_mgr" },
    { label: "Pharmacy Practice Standards Officer", value: "prac_stds_off" },
    { label: "Drug Policy Coordinator", value: "drug_pol_coord" },
    { label: "Legislative Liaison – Pharmacy", value: "leg_lia_pharm" },
    { label: "Professional Affairs Pharmacist", value: "prof_aff_pharm" },
  ];

  // Global Niche Key Area Specializations
  const globalNichePharmSpecializations = [
    { label: "Veterinary Pharmacy", value: "vet_pharm" },
    { label: "Space/Remote Location Pharmacy", value: "space_remote" },
    { label: "Home Healthcare Pharmacy", value: "home_health" },
    { label: "Tele Pharmacy", value: "tele" },
    { label: "Disaster Relief or Humanitarian Pharmacist", value: "dis_rel" },
    {
      label: "Alternative and Integrative Medicine Pharmacy",
      value: "alt_int",
    },
  ];

  const globalNichePharmJobLevels = [
    { label: "Global Health Pharmacist", value: "global_health" },
    {
      label: "International Public Health Pharmacist",
      value: "int_pub_health",
    },
    { label: "Essential Medicines Pharmacist", value: "ess_med" },
    { label: "Humanitarian Aid Pharmacist", value: "hum_aid" },
    {
      label: "NGO Pharmacist (Non-Governmental Organization)",
      value: "ngo_pharm",
    },
    {
      label: "Field Pharmacist – International Relief Missions",
      value: "field_rel_miss",
    },
    {
      label: "Global Access Program Manager (Pharmacy)",
      value: "global_acc_mgr",
    },
    {
      label: "Pharmaceutical Supply Chain Pharmacist (Global Health)",
      value: "sup_chain_global",
    },
    {
      label: "Medicines Without Borders Pharmacist (e.g. MSF)",
      value: "mwb_pharm",
    },
    {
      label: "Global Regulatory Affairs Specialist (Pharma Sector)",
      value: "global_reg_spec",
    },
    {
      label: "Infectious Disease Pharmacist – Global Programs",
      value: "id_global",
    },
    {
      label: "Health Systems Strengthening Pharmacist (Global Health)",
      value: "hss_global",
    },
    {
      label: "Global Health Policy Advisor – Pharmacy Sector",
      value: "global_pol_adv",
    },
    { label: "Disaster Relief Pharmacist", value: "dis_rel_pharm" },
    {
      label: "Emergency Response Pharmacist (e.g. pandemic, refugee camps)",
      value: "em_resp",
    },
    { label: "Mobile Pharmacy Services Coordinator", value: "mob_pharm_coord" },
    { label: "Remote Area Pharmacist", value: "remote_area" },
    {
      label: "Tele Pharmacy Services Pharmacist (Rural/Global)",
      value: "tele_rural_global",
    },
    {
      label: "Military Pharmacist / Combat Medic Pharmacist",
      value: "mil_pharm",
    },
    { label: "Humanitarian Logistics Pharmacist", value: "hum_log" },
    { label: "Veterinary Pharmacist", value: "vet_pharm" },
    { label: "Animal Health Product Specialist", value: "anim_health_spec" },
    {
      label: "Livestock Medicines Pharmacist (Agricultural Support)",
      value: "live_med",
    },
    { label: "Space Pharmacist / Aerospace Pharmacist", value: "space_pharm" },
    {
      label:
        "Expeditionary Pharmacist (e.g. Antarctica, marine research missions)",
      value: "exp_pharm",
    },
    { label: "Offshore Pharmacist (Oil rigs, ships)", value: "offshore" },
    { label: "Correctional Facility Pharmacist", value: "corr_fac" },
    {
      label: "Occupational Health Pharmacist (Remote Industries)",
      value: "occ_remote",
    },
    { label: "Integrative Medicine Pharmacist", value: "int_med_pharm" },
    { label: "Functional Medicine Pharmacist", value: "func_med" },
    { label: "Nutraceuticals Specialist Pharmacist", value: "nutra_spec" },
    {
      label: "Wellness and Lifestyle Medicine Pharmacist",
      value: "well_lifestyle_pharm",
    },
    {
      label: "Herbal Medicine Consultant (Pharmacy Background)",
      value: "herb_cons",
    },
    {
      label: "Cannabis Pharmacist / Medical Marijuana Dispensary Pharmacist",
      value: "cannabis_pharm",
    },
    { label: "Homeopathic Pharmacist (Region-specific)", value: "homeo_pharm" },
    { label: "Rare Diseases Pharmacist", value: "rare_dis" },
    { label: "Orphan Drug Access Pharmacist", value: "orphan_drug" },
    {
      label: "Palliative Care Pharmacist (Community or Global Settings)",
      value: "pall_comm_global",
    },
    { label: "Prison/Correctional Health Pharmacist", value: "prison_health" },
    { label: "Transgender Health Pharmacist", value: "trans_health" },
    {
      label: "Sexual & Reproductive Health Pharmacist",
      value: "sex_reprod_health",
    },
    { label: "Travel Medicine Pharmacist", value: "travel_med_pharm" },
    { label: "Clinical Ethnopharmacologist", value: "clin_ethno" },
    { label: "Faith-Based Health Missions Pharmacist", value: "faith_miss" },
  ];

  // Leadership Key Area Specializations
  const leadershipPharmSpecializations = [
    { label: "Executive & Senior Leadership Roles", value: "exec_sen" },
    { label: "Mid-Level Leadership & Management", value: "mid_level" },
    { label: "Program & Service Line Leadership", value: "prog_serv" },
    { label: "Administrative & Strategic", value: "admin_strat" },
    {
      label: "Leadership in Public Health, Policy & Education",
      value: "lead_pub_pol_ed",
    },
  ];

  const leadershipPharmJobLevels = [
    { label: "Chief Pharmacy Officer (CPO)", value: "cpo" },
    { label: "Director of Pharmacy Services", value: "dir_pharm_serv" },
    { label: "Vice President of Pharmacy Operations", value: "vp_pharm_ops" },
    {
      label: "Executive Director – Pharmaceutical Services",
      value: "exec_dir_pharm",
    },
    {
      label: "Senior Director – Clinical Pharmacy Programs",
      value: "sr_dir_clin",
    },
    { label: "Pharmacy Service Line Administrator", value: "pharm_serv_admin" },
    { label: "Pharmacy Manager", value: "pharm_mgr" },
    { label: "Pharmacy Operations Manager", value: "pharm_ops_mgr" },
    { label: "Clinical Pharmacy Manager", value: "clin_pharm_mgr" },
    { label: "Inpatient Pharmacy Manager", value: "inpat_pharm_mgr" },
    { label: "Outpatient Pharmacy Manager", value: "outpat_pharm_mgr" },
    { label: "Retail Pharmacy Manager", value: "ret_pharm_mgr" },
    { label: "Specialty Pharmacy Manager", value: "spec_pharm_mgr" },
    { label: "Medication Safety Manager", value: "med_saf_mgr" },
    { label: "Pharmacy Business Manager", value: "pharm_bus_mgr" },
    { label: "Formulary Manager", value: "form_mgr" },
    { label: "Pharmacy Purchasing Manager", value: "pur_mgr" },
    { label: "Pharmacy Inventory Manager", value: "inv_mgr" },
    {
      label: "District Pharmacy Manager (Retail Chains)",
      value: "dist_ret_mgr",
    },
    { label: "Hospital Pharmacy Supervisor", value: "hosp_pharm_sup" },
    { label: "Pharmacy Compliance Manager", value: "comp_mgr" },
    { label: "Pharmacy Program Director", value: "prog_dir" },
    {
      label: "Clinical Services Coordinator – Pharmacy",
      value: "clin_serv_coord",
    },
    {
      label: "Medication Therapy Management (MTM) Program Manager",
      value: "mtm_prog_mgr",
    },
    { label: "Pharmacy Residency Program Director (RPD)", value: "rpd" },
    {
      label: "Antimicrobial Stewardship Program Coordinator",
      value: "ant_stew_coord",
    },
    { label: "Pharmacy Informatics Manager", value: "inf_mgr" },
    { label: "Pharmacogenomics Program Lead", value: "pharm_gen_lead" },
    { label: "Tele Pharmacy Program Manager", value: "tele_prog_mgr" },
    { label: "Pharmacy Administrator", value: "pharm_admin" },
    {
      label: "Strategic Initiatives Lead – Pharmacy Services",
      value: "strat_init_lead",
    },
    { label: "Pharmacy Compliance Officer", value: "comp_off" },
    {
      label: "Regulatory Affairs Manager – Pharmacy Division",
      value: "reg_mgr_pharm",
    },
    { label: "Pharmacy Quality Improvement Officer", value: "qi_off" },
    { label: "Pharmacy Accreditation Coordinator", value: "acc_coord" },
    { label: "Clinical Governance Lead – Pharmacy", value: "clin_gov_lead" },
    { label: "Pharmacy Analytics Manager", value: "anal_mgr" },
    { label: "Health System Pharmacy Coordinator", value: "health_sys_coord" },
    { label: "Pharmacy Policy Director", value: "pol_dir" },
    { label: "Public Health Pharmacy Leader", value: "pub_health_lead" },
    {
      label: "Pharmacy Affairs Director – Government/Regulatory Body",
      value: "aff_dir_gov",
    },
    { label: "Pharmacy Association Executive", value: "assoc_exec" },
    { label: "Dean – College of Pharmacy", value: "dean_pharm" },
    { label: "Associate Dean for Academic Affairs", value: "ass_dean_acad" },
    {
      label: "Academic Program Director – Pharmacy Education",
      value: "acad_prog_dir",
    },
  ];

  // Function to get pharmacy sub options
  const getPharmSubSpecializations = () => {
    switch (keyArea) {
      case "clinical":
        return clinicalPharmSpecializations;
      case "lab_diag":
        return labDiagPharmSpecializations;
      case "research":
        return researchPharmSpecializations;
      case "retail":
        return retailPharmSpecializations;
      case "admin_ed_legal":
        return adminEdLegalPharmSpecializations;
      case "global_niche":
        return globalNichePharmSpecializations;
      case "leadership":
        return leadershipPharmSpecializations;
      default:
        return [];
    }
  };

  const getPharmJobLevels = () => {
    if (keyArea === "clinical") return clinicalPharmJobLevels;
    if (keyArea === "lab_diag") return labDiagPharmJobLevels;
    if (keyArea === "research") return researchPharmJobLevels;
    if (keyArea === "retail") return retailPharmJobLevels;
    if (keyArea === "admin_ed_legal") return adminEdLegalPharmJobLevels;
    if (keyArea === "global_niche") return globalNichePharmJobLevels;
    if (keyArea === "leadership") return leadershipPharmJobLevels;
    return [];
  };

  // Lab Specializations
  const labSpecializations = [
    { label: "Clinical Chemistry", value: "clin_chem" },
    { label: "Haematology", value: "haem" },
    { label: "Immunology / Serology", value: "immun_ser" },
    { label: "Microbiology", value: "micro" },
    { label: "Parasitology", value: "para" },
    { label: "Urinalysis", value: "urin" },
    { label: "Toxicology", value: "tox" },
    { label: "Blood Banking / Transfusion Medicine", value: "blood_bank" },
    { label: "Histopathology", value: "histo" },
    { label: "Cytopathology", value: "cyto" },
    { label: "Molecular Diagnostics", value: "mol_diag" },
    { label: "Cytogenetics", value: "cyto_gen" },
    { label: "Genetic Testing / Genomics", value: "gen_test" },
    { label: "Pharmacogenomics", value: "pharm_gen" },
    { label: "Next-Generation Sequencing (NGS)", value: "ngs" },
    { label: "Flow Cytometry", value: "flow_cyto" },
    { label: "Point-of-Care Testing (POCT)", value: "poct" },
    {
      label: "Clinical Informatics / Laboratory Informatics",
      value: "clin_inf",
    },
    { label: "Allergy & Immunochemistry", value: "all_immuno" },
    { label: "Autoimmune Diagnostics", value: "auto_diag" },
    { label: "Oncology Diagnostics", value: "onc_diag" },
    { label: "Neurological Diagnostics", value: "neuro_diag" },
    { label: "Forensic Laboratory Science", value: "for_lab" },
    {
      label: "Environmental & Public Health Microbiology",
      value: "env_pub_micro",
    },
    { label: "Biobanking / Specimen Repository Management", value: "bio_bank" },
    { label: "Veterinary Diagnostics", value: "vet_diag" },
    { label: "Reproductive and Fertility Diagnostics", value: "rep_fert_diag" },
    {
      label: "Occupational Health & Industrial Diagnostics",
      value: "occ_ind_diag",
    },
    { label: "Clinical Trial Laboratory Science", value: "ct_lab" },
  ];

  const labJobLevels = [
    { label: "Medical Laboratory Technician", value: "mlt" },
    { label: "Medical Laboratory Technologist (MLT/MLS)", value: "mlt_mls" },
    { label: "Clinical Laboratory Scientist (CLS)", value: "cls" },
    { label: "Medical Laboratory Scientist (MLS)", value: "mls" },
    { label: "Laboratory Technician", value: "lab_tech" },
    { label: "Laboratory Technologist", value: "lab_techol" },
    { label: "Clinical Laboratory Technician", value: "clin_lab_tech" },
    { label: "Clinical Laboratory Assistant", value: "clin_lab_ass" },
    { label: "Specimen Processing Technician", value: "spec_proc" },
    { label: "Lab Aide / Lab Assistant", value: "lab_aide" },
    { label: "Phlebotomist", value: "phleb" },
    { label: "Clinical Chemistry Technologist", value: "clin_chem_tech" },
    { label: "Clinical Biochemist", value: "clin_biochem" },
    { label: "Clinical Chemistry Analyst", value: "clin_chem_anal" },
    { label: "Haematology Technologist", value: "haem_tech" },
    { label: "Haematology Specialist", value: "haem_spec" },
    { label: "Flow Cytometry Technologist", value: "flow_cyto_tech" },
    { label: "Microbiology Technologist", value: "micro_tech" },
    { label: "Clinical Microbiologist", value: "clin_micro" },
    { label: "Medical Bacteriologist", value: "med_bact" },
    { label: "Mycology/Parasitology Technician", value: "myc_para_tech" },
    { label: "Immunology Technologist", value: "immuno_tech" },
    { label: "Serology Technician", value: "ser_tech" },
    { label: "Histology Technician / Technologist", value: "histo_tech" },
    { label: "Histopathology Assistant", value: "histo_ass" },
    { label: "Tissue Processing Technician", value: "tiss_proc_tech" },
    { label: "Cytotechnologist", value: "cyto_tech" },
    { label: "Cytology Technician", value: "cyto_tech" },
    { label: "Blood Bank Technologist", value: "blood_bank_tech" },
    { label: "Immunohematology Technologist", value: "immunohema_tech" },
    { label: "Transfusion Medicine Specialist", value: "trans_spec" },
    { label: "Molecular Diagnostics Technologist", value: "mol_diag_tech" },
    { label: "Molecular Biology Scientist (Clinical)", value: "mol_bio_sci" },
    { label: "Cytogenetic Technologist", value: "cyto_gen_tech" },
    { label: "Genomics Technologist", value: "genom_tech" },
    { label: "Pharmacogenomics Analyst", value: "pharm_gen_anal" },
    { label: "DNA Analyst (Forensic/Clinical)", value: "dna_anal" },
    { label: "Toxicology Technologist", value: "tox_tech" },
    { label: "Drug Testing Technician", value: "drug_test_tech" },
    { label: "Urinalysis Technician", value: "urin_tech" },
    { label: "Clinical Fluids Technologist", value: "clin_fluids" },
    { label: "Pathologist (MD)", value: "path_md" },
    { label: "Hematopathologist", value: "hema_path" },
    { label: "Cytopathologist", value: "cyto_path" },
    { label: "Clinical Chemist (PhD/MD)", value: "clin_chem_phd" },
    { label: "Forensic Pathologist", value: "for_path" },
    { label: "Pathology Assistant (PA)", value: "path_ass" },
    {
      label: "Laboratory Information Systems (LIS) Analyst",
      value: "lis_anal",
    },
    { label: "Lab Data Manager", value: "lab_data_mgr" },
    { label: "Quality Assurance Officer – Lab", value: "qa_lab" },
    { label: "Quality Control Technologist", value: "qc_tech" },
    {
      label: "Regulatory Compliance Specialist – Laboratory",
      value: "reg_comp_lab",
    },
    { label: "Laboratory Safety Officer", value: "lab_saf_off" },
    { label: "Laboratory Supervisor", value: "lab_sup" },
    { label: "Senior Medical Technologist", value: "sr_med_tech" },
    { label: "Lead Technologist (by department)", value: "lead_tech" },
    { label: "Section Head – Laboratory Department", value: "sec_head" },
    { label: "Laboratory Operations Manager", value: "lab_ops_mgr" },
    { label: "Laboratory Services Manager", value: "lab_serv_mgr" },
    {
      label: "Laboratory Director / Chief of Laboratory Services",
      value: "lab_dir",
    },
    { label: "Technical Director – Clinical Laboratory", value: "tech_dir" },
    { label: "Clinical Research Laboratory Technician", value: "cr_lab_tech" },
    {
      label: "Public Health Laboratory Scientist",
      value: "pub_health_lab_sci",
    },
    { label: "Epidemiology Lab Technician", value: "epi_lab_tech" },
    { label: "Environmental Laboratory Analyst", value: "env_lab_anal" },
    {
      label: "Biobank Technician / Specimen Repository Manager",
      value: "bio_bank_mgr",
    },
    {
      label: "Infectious Disease Surveillance Scientist",
      value: "id_surv_sci",
    },
    { label: "Forensic Laboratory Scientist", value: "for_lab_sci" },
    { label: "Veterinary Diagnostic Technician", value: "vet_diag_tech" },
    {
      label: "Reproductive Biology Laboratory Technologist",
      value: "rep_bio_tech",
    },
    { label: "Medical Laboratory Technologist (MLS)", value: "mlt_mls" },
    { label: "Laboratory Assistant", value: "lab_ass" },
    { label: "Pathology Assistant", value: "path_ass" },
    {
      label: "Blood Bank Technologist / Transfusion Medicine Specialist",
      value: "blood_bank_spec",
    },
    { label: "Radiologic Technologist", value: "rad_tech" },
    { label: "Radiographer", value: "rad" },
    { label: "X-ray Technician", value: "xray_tech" },
    { label: "MRI Technologist", value: "mri_tech" },
    { label: "CT (Computed Tomography) Technologist", value: "ct_tech" },
    { label: "Ultrasound Technologist / Sonographer", value: "ultra_tech" },
    { label: "Diagnostic Medical Sonographer", value: "dms" },
    { label: "Echocardiography Technologist", value: "echo_tech" },
    { label: "Nuclear Medicine Technologist", value: "nuc_med_tech" },
    { label: "PET Scan Technologist", value: "pet_tech" },
    { label: "Mammography Technologist", value: "mammo_tech" },
    { label: "Interventional Radiology Technologist", value: "int_rad_tech" },
    { label: "Radiology Assistant", value: "rad_ass" },
    { label: "Imaging Informatics Specialist", value: "img_inf_spec" },
    { label: "Medical Imaging Supervisor / Manager", value: "img_sup_mgr" },
    { label: "Electrocardiogram (ECG/EKG) Technician", value: "ecg_tech" },
    {
      label: "Cardiac Sonographer / Echocardiography Technician",
      value: "card_sono",
    },
    { label: "Cardiovascular Technologist", value: "card_tech" },
    { label: "Cardiac Catheterization Technologist", value: "card_cath_tech" },
    { label: "Holter Monitor Technician", value: "holter_tech" },
    { label: "Pulmonary Function Technologist", value: "pul_func_tech" },
    {
      label: "Respiratory Therapist (Diagnostics Role)",
      value: "resp_ther_diag",
    },
    { label: "Stress Test Technician", value: "stress_test" },
    { label: "Pathologist (MD or DO)", value: "path_md_do" },
    { label: "Neuropathologist", value: "neuro_path" },
    { label: "Dermatopathologist", value: "derm_path" },
    { label: "Autopsy Technician", value: "autopsy_tech" },
    { label: "Digital Pathology Specialist", value: "dig_path_spec" },
    { label: "Genetic Technologist", value: "gen_tech" },
    { label: "Clinical Geneticist (MD/PhD)", value: "clin_gen_md_phd" },
    { label: "Molecular Biology Technologist", value: "mol_bio_tech" },
    {
      label: "Next-Generation Sequencing (NGS) Technologist",
      value: "ngs_tech",
    },
    { label: "DNA Analyst (Forensics or Medical)", value: "dna_anal" },
    { label: "Biobank Technician / Coordinator", value: "bio_bank_coord" },
    { label: "Diagnostic Services Manager", value: "diag_serv_mgr" },
    { label: "Clinical Laboratory Manager", value: "clin_lab_mgr" },
    { label: "Radiology Department Manager", value: "rad_dept_mgr" },
    { label: "Quality Assurance Specialist – Diagnostics", value: "qa_diag" },
    { label: "Regulatory Affairs Officer – Diagnostics", value: "reg_diag" },
    { label: "PACS Administrator (Imaging Systems)", value: "pacs_admin" },
    { label: "Diagnostic Data Analyst", value: "diag_data_anal" },
    { label: "Compliance Officer – Diagnostic Services", value: "comp_diag" },
    { label: "Diagnostic Informatics Specialist", value: "diag_inf_spec" },
    { label: "Point-of-Care Testing (POCT) Coordinator", value: "poct_coord" },
    { label: "Clinical Trial Laboratory Technician", value: "ct_lab_tech" },
    {
      label: "Public Health Diagnostic Scientist",
      value: "pub_health_diag_sci",
    },
    { label: "Occupational Health Testing Technician", value: "occ_test_tech" },
    { label: "Environmental Diagnostics Technician", value: "env_diag_tech" },
    { label: "Veterinary Diagnostics Technologist", value: "vet_diag_techol" },
    { label: "Mobile Imaging Technician", value: "mob_img_tech" },
  ];

  // Lab Work Environments
  const labWorkEnvironments = [
    {
      label: "Clinical laboratories (hospitals, diagnostics centers)",
      value: "clin_labs",
    },
    { label: "Research labs", value: "res_labs" },
    {
      label: "Public health organizations (e.g. CDC, WHO)",
      value: "pub_health_org",
    },
    { label: "Blood banks", value: "blood_banks" },
    {
      label: "Biotechnology and pharmaceutical companies",
      value: "bio_pharma",
    },
    { label: "Forensic and law enforcement labs", value: "for_law_labs" },
    { label: "Academic and teaching institutions", value: "acad_teach" },
  ];

  // Allied Speciality Groups
  const alliedSpecialityGroups = [
    { label: "Diagnostic & Laboratory Specialties", value: "diag_lab" },
    { label: "Therapeutic & Clinical Specialties", value: "ther_clin" },
    { label: "Pharmaceutical & Nutrition Specialties", value: "pharm_nut" },
    { label: "Emergency & Prehospital Care", value: "em_pre" },
    { label: "Behavioural & Mental Health Specialties", value: "behav_mh" },
    { label: "Supportive & Direct Care Roles", value: "supp_direct" },
    { label: "Specialized & Emerging Roles", value: "spec_emerg" },
  ];

  // Diagnostic & Lab Job Levels for Allied
  const diagLabAlliedJobLevels = [
    { label: "Medical Laboratory Scientist / Technologist", value: "mls_tech" },
    { label: "Medical Laboratory Technician", value: "mlt" },
    { label: "Radiologic Technologist / Radiographer", value: "rad_tech" },
    { label: "CT Technologist", value: "ct_tech" },
    { label: "Histotechnologist / Histotechnician", value: "histo_tech" },
    { label: "Pathologist Assistant", value: "path_ass" },
    { label: "Electroneuro diagnostic (END) Technologist", value: "end_tech" },
    { label: "Physiotherapist / Physical Therapist", value: "physio" },
    { label: "Occupational Therapist", value: "occ_ther" },
    { label: "Respiratory Therapist", value: "resp_ther" },
    { label: "Speech-Language Pathologist", value: "slp" },
    { label: "Audiologist", value: "audio" },
    { label: "Recreational Therapist", value: "rec_ther" },
    { label: "Orthotist / Prosthetist", value: "ortho_prost" },
    { label: "Radiation Therapist", value: "rad_ther" },
    { label: "Art Therapist", value: "art_ther" },
    { label: "Music Therapist", value: "music_ther" },
    { label: "Drama Therapist", value: "drama_ther" },
    { label: "Massage Therapist", value: "mass_ther" },
    { label: "Art Therapists", value: "art_ther" },
    { label: "Drama Therapists", value: "drama_ther" },
    { label: "Music Therapists", value: "music_ther" },
    { label: "Occupational Therapists", value: "occ_ther" },
    { label: "Operating Department Practitioners (ODPs)", value: "odp" },
    { label: "Orthoptists", value: "ortho_ptist" },
    { label: "Osteopaths", value: "osteo" },
    { label: "Paramedics", value: "paramed" },
    { label: "Physiotherapists", value: "physio" },
    {
      label: "Podiatrists (also called Chiropodists in some parts)",
      value: "pod",
    },
    { label: "Prosthetists & Orthotists", value: "prost_ortho" },
    {
      label: "Radiographers (Diagnostic & Therapeutic)",
      value: "rad_diag_ther",
    },
    { label: "Speech and Language Therapists", value: "sl_ther" },
    {
      label:
        "Clinical Laboratory Technologists / Medical Laboratory Scientists",
      value: "clin_lab_tech_mls",
    },
    { label: "Dietitians / Nutritionists", value: "diet_nut" },
    { label: "Physical Therapists / Physiotherapists", value: "phys_ther" },
    { label: "Radiologic Technologists & technicians", value: "rad_tech_tec" },
    { label: "Speech‑Language Pathologists", value: "slp" },
    { label: "Respiratory Therapists", value: "resp_ther" },
    { label: "Dental Hygienists / Dental Assistants", value: "dent_hyg_ass" },
    {
      label: "Emergency Medical Technicians / Paramedics",
      value: "emt_paramed",
    },
    {
      label:
        "Other technicians & technologists (cardiovascular technologists, nuclear medicine technologists, etc.)",
      value: "other_tech",
    },
  ];

  // Pharm & Nut Job Levels for Allied
  const pharmNutAlliedJobLevels = [
    { label: "Pharmacist", value: "pharm" },
    { label: "Pharmacy Technician", value: "pharm_tech" },
    { label: "Dietitian / Clinical Nutritionist", value: "diet_clin_nut" },
    { label: "Nutritionist", value: "nut" },
    { label: "Dietetic Technician", value: "diet_tech" },
  ];

  // Em Prehospital Job Levels for Allied
  const emPreAlliedJobLevels = [
    { label: "Paramedic", value: "paramed" },
    { label: "Emergency Medical Technician (EMT)", value: "emt" },
    { label: "Critical Care Transport Specialist", value: "crit_trans_spec" },
    { label: "Flight Paramedic", value: "flight_paramed" },
  ];

  // Behav MH Job Levels for Allied
  const behavMhAlliedJobLevels = [
    { label: "Clinical Psychologist", value: "clin_psych" },
    { label: "Behavioural Therapist", value: "behav_ther" },
    { label: "Mental Health Counsellor", value: "mh_coun" },
    { label: "Substance Abuse Counsellor", value: "sub_ab_coun" },
    { label: "Psychiatric Technician", value: "psych_tech" },
    { label: "Social Worker", value: "soc_work" },
  ];

  // Supp Direct Job Levels for Allied
  const suppDirectAlliedJobLevels = [
    { label: "Physician Assistant / Associate", value: "pa" },
    { label: "Anesthesia Technologist", value: "anes_tech" },
    {
      label: "Surgical Technologist / Operating Department Practitioner (ODP)",
      value: "surg_tech_odp",
    },
    { label: "Clinical Support Worker", value: "clin_supp_work" },
    {
      label: "Healthcare Assistant / Nursing Assistant",
      value: "health_ass_na",
    },
    { label: "Community Health Worker", value: "comm_health_work" },
    { label: "Case Manager", value: "case_mgt" },
  ];

  // Spec Emerg Job Levels for Allied
  const specEmergAlliedJobLevels = [
    { label: "Genetic Counsellor", value: "gen_coun" },
    { label: "Perfusionist", value: "perf" },
    { label: "Medical Physicist", value: "med_phys" },
    { label: "Biomedical Scientist", value: "bio_med_sci" },
    { label: "Clinical Exercise Physiologist", value: "clin_ex_phys" },
    { label: "Kinesiologist", value: "kin" },
    { label: "Telehealth Specialist", value: "tele_spec" },
    { label: "Rehabilitation Engineer", value: "rehab_eng" },
  ];

  // Function to get allied job levels
  const getAlliedJobLevels = () => {
    switch (specialityGroup) {
      case "diag_lab":
        return diagLabAlliedJobLevels;
      case "pharm_nut":
        return pharmNutAlliedJobLevels;
      case "em_pre":
        return emPreAlliedJobLevels;
      case "behav_mh":
        return behavMhAlliedJobLevels;
      case "supp_direct":
        return suppDirectAlliedJobLevels;
      case "spec_emerg":
        return specEmergAlliedJobLevels;
      default:
        return [];
    }
  };

  // IT Admin Specializations
  const itAdminSpecializations = [
    { label: "Health Information Technology", value: "health_it" },
    { label: "Healthcare Administration", value: "health_admin" },
  ];

  // Health IT Job Levels
  const healthItJobLevels = [
    { label: "Health Information Technician", value: "health_inf_tech" },
    { label: "Medical Coder / Clinical Coder", value: "med_coder" },
    { label: "Release of Information Specialist", value: "roi_spec" },
    {
      label: "DRG Analyst (Diagnosis‑Related Group Analyst)",
      value: "drg_anal",
    },
    {
      label:
        "Health Privacy & Security Officer / Information Security Specialist",
      value: "health_priv_sec",
    },
    { label: "EHR / EMR Specialist / EHR/EMR Manager", value: "ehr_emr_spec" },
    { label: "Systems Analyst (Health IT Systems)", value: "sys_anal_health" },
    {
      label: "Application Analyst / EHR Application Analyst",
      value: "app_anal_ehr",
    },
    {
      label: "IT Support Technician (Health IT support)",
      value: "it_supp_health",
    },
    {
      label: "Database Administrator (in health settings)",
      value: "db_admin_health",
    },
    {
      label: "Analytics Consultant (Healthcare / Health IT)",
      value: "anal_cons_health",
    },
    {
      label: "Health IT Director / Director of Health Information Technology",
      value: "health_it_dir",
    },
    {
      label: "Clinical Informatics Specialist / Clinical Informaticist",
      value: "clin_inf_spec",
    },
    { label: "EHR/EMR Support Analyst", value: "ehr_supp_anal" },
    { label: "Systems Analyst (Health IT)", value: "sys_anal_it" },
    { label: "Application Analyst (EHR)", value: "app_anal" },
    { label: "Database Administrator", value: "db_admin" },
    { label: "Data Integration Specialist", value: "data_int_spec" },
    { label: "Health IT Project Manager", value: "health_it_proj_mgr" },
    { label: "Health IT Security Officer", value: "health_it_sec" },
    { label: "Enterprise Health Architect", value: "ent_health_arch" },
    {
      label: "Health Services Administrator / Health Information Manager",
      value: "health_serv_admin",
    },
    { label: "Information Management Specialist", value: "inf_mgt_spec" },
    { label: "Knowledge Management Specialist", value: "know_mgt_spec" },
    { label: "IT Auditor (for health‑IT systems)", value: "it_aud_health" },
    { label: "Medical Coder", value: "med_coder" },
    { label: "Transcriptionist", value: "trans" },
    {
      label: "Clinical Documentation Improvement (CDI) Specialist",
      value: "cdi_spec",
    },
    { label: "Health Data Analyst", value: "health_data_anal" },
    { label: "DRG Analyst", value: "drg_anal" },
    { label: "Clinical Informatics Specialist", value: "clin_inf_spec" },
    { label: "Health Informatics Consultant", value: "health_inf_cons" },
    { label: "Health Informatics Specialist", value: "health_inf_spec" },
    { label: "Medical Secretary / Health Unit Coordinator", value: "med_sec" },
  ];

  // Healthcare Admin Job Levels
  const healthAdminJobLevels = [
    { label: "Accreditation Coordinator", value: "acc_coord" },
    {
      label: "Administrative Assistant – Healthcare",
      value: "admin_ass_health",
    },
    { label: "Administrative Officer", value: "admin_off" },
    { label: "Admissions Coordinator", value: "adm_coord" },
    { label: "Case Management Supervisor", value: "case_mgt_sup" },
    { label: "Hospital Administrator", value: "hosp_admin" },
    { label: "Medical Superintendent", value: "med_sup" },
    { label: "Healthcare Operations Manager", value: "health_ops_mgr" },
    { label: "Quality Assurance (QA) Manager", value: "qa_mgr" },
    { label: "Healthcare Project Manager", value: "health_proj_mgr" },
    { label: "Claims / Revenue Cycle Manager", value: "claims_rev_mgr" },
    { label: "HR Manager – Healthcare", value: "hr_health" },
    { label: "Compliance Officer – Healthcare", value: "comp_health" },
    { label: "Public Health Administrator", value: "pub_health_admin" },
    { label: "Medical Director – Insurance", value: "med_dir_ins" },
    { label: "District Health Officer (DHO)", value: "dho" },
    { label: "State Health Mission Director", value: "state_health_dir" },
    {
      label: "Program Manager – National Health Mission (NHM)",
      value: "prog_mgr_nhm",
    },
    {
      label: "Public Health Specialist – WHO/MoHFW/NGOs",
      value: "pub_health_spec",
    },
    { label: "Release of Information (ROI) Specialist", value: "roi_spec" },
    { label: "Health Information Clerk", value: "health_inf_clerk" },
    { label: "Health Information Manager (HIM)", value: "him" },
    { label: "Coding Manager", value: "coding_mgr" },
    { label: "Revenue Cycle Analyst", value: "rev_cycle_anal" },
    { label: "Compliance & Privacy Officer", value: "comp_priv_off" },
    {
      label: "Front Office Executive – Hospital/Clinic",
      value: "front_off_exec",
    },
    { label: "Health Information Manager", value: "health_inf_mgr" },
    { label: "Health Program Coordinator", value: "health_prog_coord" },
    { label: "Health Services Manager", value: "health_serv_mgr" },
    { label: "Health Unit Coordinator", value: "health_unit_coord" },
    { label: "Healthcare Administrator", value: "health_admin" },
    {
      label: "Healthcare Customer Service Executive",
      value: "health_cust_serv",
    },
    { label: "Medical and Health Services Manager", value: "med_health_mgr" },
    { label: "Medical Office Manager", value: "med_off_mgr" },
    { label: "Healthcare Administrator / Manager", value: "health_admin_mgr" },
    { label: "Nursing Home Administrator", value: "nurs_home_admin" },
    { label: "Operations Manager – Healthcare", value: "ops_health" },
    { label: "Outpatient Services Manager", value: "outpat_serv_mgr" },
    { label: "Patient Care Coordinator", value: "pat_care_coord" },
    { label: "Practice Administrator", value: "prac_admin" },
    { label: "Practice Manager", value: "prac_mgr" },
    { label: "Quality Improvement Manager", value: "qi_mgr" },
    {
      label: "Research Program Administrator – Healthcare",
      value: "res_prog_admin",
    },
    { label: "Research Program Coordinator", value: "res_prog_coord" },
    { label: "Rehabilitation Services Manager", value: "rehab_serv_mgr" },
    { label: "Revenue Cycle Manager", value: "rev_cycle_mgr" },
    { label: "Risk & Safety Manager", value: "risk_saf_mgr" },
    { label: "Scheduling Coordinator", value: "sched_coord" },
    { label: "Support Services Manager", value: "supp_serv_mgr" },
    { label: "Unit Manager (ICU, ER, OT, etc.)", value: "unit_mgr" },
    { label: "Utilization Review Manager", value: "util_rev_mgr" },
  ];

  // Function to get IT Admin job levels
  const getItAdminJobLevels = () => {
    switch (specialization) {
      case "health_it":
        return healthItJobLevels;
      case "health_admin":
        return healthAdminJobLevels;
      default:
        return [];
    }
  };

  // Support Specializations
  const supportSpecializations = [
    { label: "Clerical & Front Office", value: "cler_front" },
    { label: "Medical Records & Information", value: "med_rec_inf" },
    { label: "Billing & Finance", value: "bill_fin" },
    { label: "Logistics & Facility", value: "log_fac" },
    { label: "Patient Services", value: "pat_serv" },
    { label: "General Ancillary Support", value: "gen_anc" },
    { label: "Ambulance Support Services", value: "amb_supp" },
  ];

  // Clerical Job Levels
  const clericalJobLevels = [
    { label: "Front Office Executive", value: "front_off_exec" },
    { label: "Receptionist – Hospital/Clinic", value: "recep_hosp" },
    { label: "Administrative Clerk", value: "admin_clerk" },
    { label: "Ward Administrative Clerk", value: "ward_admin_clerk" },
    { label: "Patient Registration Clerk", value: "pat_reg_clerk" },
    {
      label: "Admissions Clerk / Admissions Coordinator",
      value: "adm_clerk_coord",
    },
    { label: "Health Unit Clerk", value: "health_unit_clerk" },
    { label: "Medical Office Assistant", value: "med_off_ass" },
    { label: "Medical Secretary", value: "med_sec" },
  ];

  // Med Rec Job Levels
  const medRecJobLevels = [
    { label: "Medical Records Clerk", value: "med_rec_clerk" },
    { label: "Data Entry Operator – Hospital", value: "data_entry_hosp" },
    { label: "Coding Specialist (ICD / CPT)", value: "coding_spec" },
    { label: "Medical Transcriptionist", value: "trans" },
    { label: "Medical Records Supervisor", value: "med_rec_sup" },
  ];

  // Bill Fin Job Levels
  const billFinJobLevels = [
    { label: "Medical Billing Manager", value: "med_bill_mgr" },
    { label: "Medical Billing Specialist", value: "med_bill_spec" },
    { label: "Insurance Verification Specialist", value: "ins_ver_spec" },
    { label: "Accounts Assistant – Healthcare", value: "acc_ass_health" },
    { label: "Patient Accounts Clerk", value: "pat_acc_clerk" },
    { label: "Billing Clerk", value: "bill_clerk" },
  ];

  // Log Fac Job Levels
  const logFacJobLevels = [
    {
      label: "Transport Coordinator (Patient / Sample Transfer)",
      value: "trans_coord",
    },
    { label: "Inventory Clerk – Hospital Stores", value: "inv_clerk_hosp" },
    { label: "Supply Chain Assistant – Healthcare", value: "sup_chain_ass" },
    { label: "Facilities Assistant", value: "fac_ass" },
    { label: "Laundry Services Coordinator", value: "laun_coord" },
    { label: "Housekeeping Supervisor", value: "house_sup" },
  ];

  // Pat Serv Job Levels
  const patServJobLevels = [
    { label: "Patient Services Manager", value: "pat_serv_mgr" },
    { label: "Patient Services Associate", value: "pat_serv_ass" },
    {
      label: "Patient Care Coordinator (supportive)",
      value: "pat_care_coord_supp",
    },
    { label: "Help Desk Executive – Hospital", value: "help_desk_hosp" },
    { label: "Patient Relations Representative", value: "pat_rel_rep" },
  ];

  // Gen Anc Job Levels
  const genAncJobLevels = [
    { label: "File Clerk", value: "file_clerk" },
    { label: "Records Assistant", value: "rec_ass" },
    { label: "Office Boy / Peon (Hospital Admin)", value: "off_boy" },
    {
      label: "Messenger / Runner (Hospital Docs & Records)",
      value: "mess_run",
    },
    {
      label: "Switchboard Operator / Call Center Executive – Healthcare",
      value: "switch_op",
    },
    { label: "Admissions Clerk / Coordinator", value: "adm_clerk" },
    {
      label: "Patient Care Coordinator (non-clinical)",
      value: "pat_care_non_clin",
    },
    {
      label: "Transport Coordinator (Patients / Samples)",
      value: "trans_coord_pat",
    },
    { label: "Office Boy / Peon – Hospital", value: "off_boy_hosp" },
    { label: "Messenger / Runner – Hospital", value: "mess_hosp" },
  ];

  // Amb Supp Job Levels
  const ambSuppJobLevels = [
    { label: "Ambulance Nurse", value: "amb_nurse" },
    { label: "Critical Care Paramedic (CCP)", value: "ccp" },
    { label: "Advanced Care Paramedic (ACP)", value: "acp" },
    { label: "Basic Life Support (BLS) Provider", value: "bls" },
    { label: "Advanced Life Support (ALS) Provider", value: "als" },
    { label: "Ambulance Driver", value: "amb_driver" },
    {
      label: "Ambulance Attendant (first-aid trained support)",
      value: "amb_att",
    },
    { label: "Patient Transporter", value: "pat_trans" },
    { label: "Stretcher Bearer", value: "stretch_bear" },
    { label: "Emergency Vehicle Operator", value: "em_veh_op" },
    {
      label: "Transport Coordinator – Ambulance Services",
      value: "trans_coord_amb",
    },
    { label: "Ambulance Operations Supervisor", value: "amb_ops_sup" },
    {
      label: "Emergency Medical Services (EMS) Coordinator",
      value: "ems_coord",
    },
    { label: "Ambulance Services Manager", value: "amb_serv_mgr" },
    {
      label: "Director of Emergency Medical Services (EMS Director)",
      value: "ems_dir",
    },
    {
      label: "Dispatch Coordinator / Dispatcher (Ambulance Control Room)",
      value: "disp_coord",
    },
    {
      label: "Operations Supervisor – Ambulance Services",
      value: "ops_sup_amb",
    },
    {
      label: "Transport Coordinator – Ambulance Fleet",
      value: "trans_fleet_amb",
    },
    {
      label: "Dispatch Coordinator / Dispatcher Supervisor",
      value: "disp_sup",
    },
    { label: "Rescue & Disaster Response Specialist", value: "resc_dis_resp" },
    {
      label: "Emergency Medical Technician – Paramedic (EMT-P)",
      value: "emt_p",
    },
    {
      label: "Emergency Medical Technician – Advanced (EMT-A)",
      value: "emt_a",
    },
    { label: "Emergency Medical Technician – Basic (EMT-B)", value: "emt_b" },
    {
      label: "Ambulance Driver / Emergency Vehicle Operator",
      value: "amb_veh_op",
    },
    { label: "Ambulance Attendant (First-Aid Certified)", value: "amb_att_fa" },
    {
      label: "Patient Transporter (Non-Emergency Transfers)",
      value: "pat_trans_non_em",
    },
    {
      label: "Helper / Cleaner – Ambulance Maintenance",
      value: "help_clean_amb",
    },
    { label: "Emergency Dispatcher (Control Room)", value: "em_disp" },
    { label: "Call Taker / Emergency Response Operator", value: "call_taker" },
    { label: "Radio Operator – Ambulance Services", value: "radio_op_amb" },
    {
      label: "GIS/Tracking Specialist (Ambulance Location Monitoring)",
      value: "gis_track",
    },
  ];

  // Function to get support job levels
  const getSupportJobLevels = () => {
    switch (specialization) {
      case "cler_front":
        return clericalJobLevels;
      case "med_rec_inf":
        return medRecJobLevels;
      case "bill_fin":
        return billFinJobLevels;
      case "log_fac":
        return logFacJobLevels;
      case "pat_serv":
        return patServJobLevels;
      case "gen_anc":
        return genAncJobLevels;
      case "amb_supp":
        return ambSuppJobLevels;
      default:
        return [];
    }
  };

  // General function to get job level options
  const getJobLevelOptions = () => {
    if (primaryRole === "management") return healthcareManagementJobLevels;
    if (primaryRole === "doctors") return getDoctorsJobLevels();
    if (primaryRole === "surgeons") return surgeonsJobLevels;
    if (primaryRole === "dental") return dentalJobLevels;
    if (primaryRole === "nursing") return getNursingJobLevels();
    if (primaryRole === "pharmacy") return getPharmJobLevels();
    if (primaryRole === "lab") return labJobLevels;
    if (primaryRole === "allied") return getAlliedJobLevels();
    if (primaryRole === "itadmin") return getItAdminJobLevels();
    if (primaryRole === "support") return getSupportJobLevels();
    return [];
  };

  return (
    <FormProvider {...form}>
      <Grid component="form" onSubmit={handleSubmit(onSubmit)} p={2}>
        <FormField
          label="What is your primary role of expertise"
          inputType="Select"
          registerName="primaryRole"
          options={primaryRoleOptions}
        />
        {primaryRole === "management" && (
          <FormField
            label="Please Select Your Job Level"
            inputType="Select"
            registerName="jobLevel"
            options={healthcareManagementJobLevels}
          />
        )}
        {primaryRole === "doctors" && (
          <>
            <FormField
              label="Please Select your Specialization"
              inputType="Select"
              registerName="specialization"
              options={doctorsSpecializations}
            />
            {specialization && (
              <FormField
                label="Please Select your Job Level"
                inputType="Select"
                registerName="jobLevel"
                options={getJobLevelOptions()}
              />
            )}
          </>
        )}
        {primaryRole === "surgeons" && (
          <FormField
            label="Please Select Your Job level"
            inputType="Select"
            registerName="jobLevel"
            options={surgeonsJobLevels}
          />
        )}
        {primaryRole === "dental" && (
          <FormField
            label="Please Select Your Job level"
            inputType="Select"
            registerName="jobLevel"
            options={dentalJobLevels}
          />
        )}
        {primaryRole === "nursing" && (
          <>
            <FormField
              label="Please Select Your Specialization"
              inputType="Select"
              registerName="specialization"
              options={nursingSpecializations}
            />
            {specialization && (
              <FormField
                label="Please Select Your Job Level"
                inputType="Select"
                registerName="jobLevel"
                options={getJobLevelOptions()}
              />
            )}
          </>
        )}
        {primaryRole === "pharmacy" && (
          <>
            <FormField
              label="What is your Key area of Pharmacy"
              inputType="Select"
              registerName="keyArea"
              options={pharmacyKeyAreas}
            />
            {keyArea && (
              <FormField
                label="Please Select Your Specialization"
                inputType="Select"
                registerName="subSpecialization"
                options={getPharmSubSpecializations()}
              />
            )}
            {keyArea && subSpecialization && (
              <FormField
                label="Please Select Your Job Level"
                inputType="Select"
                registerName="jobLevel"
                options={getJobLevelOptions()}
              />
            )}
          </>
        )}
        {primaryRole === "lab" && (
          <>
            <FormField
              label="Please Select Your Specialization"
              inputType="Select"
              registerName="specialization"
              options={labSpecializations}
            />
            <FormField
              label="Please Select Your Job Level"
              inputType="Select"
              registerName="jobLevel"
              options={labJobLevels}
            />
            <FormField
              label="Please Select Work Environments"
              inputType="Select"
              registerName="workEnvironment"
              options={labWorkEnvironments}
            />
          </>
        )}
        {primaryRole === "allied" && (
          <>
            <FormField
              label="Please Select Your Speciality Group"
              inputType="Select"
              registerName="specialityGroup"
              options={alliedSpecialityGroups}
            />
            {specialityGroup && (
              <FormField
                label="Please Select Your Job Level"
                inputType="Select"
                registerName="jobLevel"
                options={getAlliedJobLevels()}
              />
            )}
          </>
        )}
        {primaryRole === "itadmin" && (
          <>
            <FormField
              label="Please Select Your Specialization"
              inputType="Select"
              registerName="specialization"
              options={itAdminSpecializations}
            />
            {specialization && (
              <FormField
                label="Please Select Your Job Level"
                inputType="Select"
                registerName="jobLevel"
                options={getItAdminJobLevels()}
              />
            )}
          </>
        )}
        {primaryRole === "support" && (
          <>
            <FormField
              label="Please Select Your Specialization"
              inputType="Select"
              registerName="specialization"
              options={supportSpecializations}
            />
            {specialization && (
              <FormField
                label="Please Select Your Job Level"
                inputType="Select"
                registerName="jobLevel"
                options={getSupportJobLevels()}
              />
            )}
          </>
        )}
        <Grid size={12} container justifyContent={"flex-end"}>
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            sx={{
              my: 2,

              color: "white",
              px: 2,
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

function Experience({ onProgressChange }) {
  const form = useForm({
    defaultValues: {},
  });

  const {
    handleSubmit,
    formState: { errors },
    watch,
  } = form;

  const clinicalTrials = watch("clinicalTrials");

  const onSubmit = (data) => {
    console.log(data);
  };

  // Watch all fields
  const allValues = watch();
  const totalFields = Object.keys(allValues).length || 4;
  const completedFields = Object.values(allValues).filter(
    (v) => v !== undefined && v !== ""
  ).length;

  const progress = totalFields
    ? Math.round((completedFields / totalFields) * 100)
    : 0;

  // send progress to parent
  React.useEffect(() => {
    onProgressChange?.({
      completed: completedFields,
      total: totalFields,
      progress,
    });
  }, [completedFields, totalFields, progress]);

  return (
    <FormProvider {...form}>
      <Grid component="form" onSubmit={handleSubmit(onSubmit)} p={2}>
        <FormField
          label="What is your employment status?"
          inputType="Select"
          registerName="employmentStatus"
          options={[
            { label: "Full-time", value: "full" },
            { label: "Part-time", value: "part" },
            { label: "Locum", value: "locum" },
            { label: "Retired but practicing", value: "ret_prac" },
            { label: "Retired but not practicing", value: "ret_not" },
          ]}
        />
        <FormField
          label="Do you work in the public or private sector"
          inputType="Select"
          registerName="sector"
          options={[
            { label: "Public", value: "public" },
            { label: "Private", value: "private" },
            { label: "Both", value: "both" },
          ]}
        />
        <FormField
          label="In what type of facility do you primarily work?"
          inputType="Select"
          registerName="facilityType"
          options={[
            { label: "Hospital", value: "hospital" },
            { label: "Private Clinic", value: "clinic" },
            { label: "Nursing Home", value: "nursing_home" },
            { label: "Pharmacy", value: "pharmacy" },
            { label: "Laboratory", value: "lab" },
            { label: "Community Health Center", value: "comm_center" },
            { label: "Other-Please specify", value: "other" },
          ]}
        />
        <FormField
          label="What is the size of your facility (number of beds)?"
          inputType="Select"
          registerName="facilitySize"
          options={[
            { label: "1–20", value: "1-20" },
            { label: "21–50", value: "21-50" },
            { label: "51–100", value: "51-100" },
            { label: "101–500", value: "101-500" },
            { label: "500+", value: "500+" },
          ]}
        />
        <FormField
          label="Is your practice in an urban, semi-urban, or rural setting?"
          inputType="Select"
          registerName="practiceSetting"
          options={[
            { label: "Urban", value: "urban" },
            { label: "Semi-Urban", value: "semi" },
            { label: "Rural", value: "rural" },
          ]}
        />
        <FormField
          label="Do you work in a teaching/academic hospital?"
          inputType="Select"
          registerName="teachingHospital"
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
        />
        <FormField
          label="Enter Professional Address - Locality/Street Name:"
          inputType="Input"
          registerName="locality"
        />
        <FormField
          label="Nearby Landmark:"
          inputType="Input"
          registerName="landmark"
        />
        <FormField
          label="Select State:"
          inputType="Select"
          registerName="state"
          options={[]} // Dynamic
        />
        <FormField
          label="Select City:"
          inputType="Select"
          registerName="city"
          options={[]} // Dynamic
        />
        <FormField
          label="Enter Zip/Postal Code:"
          inputType="Input"
          registerName="zip"
        />
        <FormField
          label="Enter Phone Number:"
          inputType="Phone"
          registerName="phone"
        />
        <FormField
          label="Your Selected Country:"
          inputType="Select"
          registerName="country"
          options={[]} // From Basic
        />
        <FormField
          label="Name of Employer (Hospital or Clinic):"
          inputType="Input"
          registerName="employerName"
        />
        <FormField label="Email:" inputType="Input" registerName="email" />
        <FormField
          label="LinkedIn Profile:"
          inputType="Input"
          registerName="linkedin"
        />
        <FormField
          label="Your Employer Address (Building/Flat no.):"
          inputType="Input"
          registerName="employerBuilding"
        />
        <FormField
          label="Locality/Street Name"
          inputType="Input"
          registerName="employerLocality"
        />
        <FormField
          label="Nearby Landmark"
          inputType="Input"
          registerName="employerLandmark"
        />
        <FormField
          label="How many years have you been practicing in your profession?"
          inputType="Select"
          registerName="yearsExperience"
          options={[
            { label: "0–2 years", value: "0-2" },
            { label: "3–5 years", value: "3-5" },
            { label: "6–10 years", value: "6-10" },
            { label: "11–20 years", value: "11-20" },
            { label: "20+ years", value: "20+" },
          ]}
        />
        <FormField
          label="How many patients do you typically see per week?"
          inputType="Select"
          registerName="patientsPerWeek"
          options={[
            { label: "0–10", value: "0-10" },
            { label: "11–25", value: "11-25" },
            { label: "26–50", value: "26-50" },
            { label: "51–100", value: "51-100" },
            { label: "100+", value: "100+" },
          ]}
        />
        <FormField
          label="Do you have experience participating in clinical trials?"
          inputType="Select"
          registerName="clinicalTrials"
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
        />
        {clinicalTrials === "yes" && (
          <FormField
            label="How many clinical trials have you been involved in over the past 2 years?"
            inputType="Select"
            registerName="trialsCount"
            options={[
              { label: "0 - 49", value: "0-49" },
              { label: "50 - 99", value: "50-99" },
              { label: "100 - 149", value: "100-149" },
              { label: "150 - 200", value: "150-200" },
              { label: "More than 200", value: "200+" },
            ]}
          />
        )}
        <Grid size={12} container justifyContent={"flex-end"}>
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            sx={{
              my: 2,

              color: "white",
              px: 2,
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

function DecisionMaking({ onProgressChange }) {
  const form = useForm({
    defaultValues: {},
  });

  const {
    handleSubmit,
    formState: { errors },
    watch,
  } = form;

  const onSubmit = (data) => {
    console.log(data);
  };

  // Watch all fields
  const allValues = watch();
  const totalFields = Object.keys(allValues).length || 7;
  const completedFields = Object.values(allValues).filter(
    (v) => v !== undefined && v !== ""
  ).length;

  const progress = totalFields
    ? Math.round((completedFields / totalFields) * 100)
    : 0;

  // send progress to parent
  React.useEffect(() => {
    onProgressChange?.({
      completed: completedFields,
      total: totalFields,
      progress,
    });
  }, [completedFields, totalFields, progress]);

  return (
    <FormProvider {...form}>
      <Grid component="form" onSubmit={handleSubmit(onSubmit)} p={2}>
        <FormField
          label="Are you a decision-maker for purchases in your practice/facility?"
          inputType="Select"
          registerName="purchaseDecision"
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
        />
        <FormField
          label="Are you part of a drug formulary or procurement committee?"
          inputType="Select"
          registerName="formularyCommittee"
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
        />
        <FormField
          label="Do you have influence over medical device/equipment purchasing decisions?"
          inputType="Select"
          registerName="deviceInfluence"
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
        />
        <FormField
          label="Are you involved in health policy or guideline development?"
          inputType="Select"
          registerName="policyInvolvement"
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
        />
        <FormField
          label="Do you use Electronic Health Records (EHR/EMR) in your practice?"
          inputType="Select"
          registerName="ehrUse"
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
        />
        <FormField
          label="Do you use telemedicine for patient consultations?"
          inputType="Select"
          registerName="telemedicine"
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
        />
        <FormField
          label="Are you involved in digital health initiatives?"
          inputType="Select"
          registerName="digitalInitiatives"
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
        />
        <Grid size={12} container justifyContent={"flex-end"}>
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            sx={{
              my: 2,

              color: "white",
              px: 2,
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

function Availability({ onProgressChange }) {
  const form = useForm({
    defaultValues: {},
  });

  const {
    handleSubmit,
    formState: { errors },
    watch,
  } = form;

  const onSubmit = (data) => {
    console.log(data);
  };

  // Watch all fields
  const allValues = watch();
  const totalFields = Object.keys(allValues).length || 5;
  const completedFields = Object.values(allValues).filter(
    (v) => v !== undefined && v !== ""
  ).length;

  const progress = totalFields
    ? Math.round((completedFields / totalFields) * 100)
    : 0;

  // send progress to parent
  React.useEffect(() => {
    onProgressChange?.({
      completed: completedFields,
      total: totalFields,
      progress,
    });
  }, [completedFields, totalFields, progress]);

  return (
    <FormProvider {...form}>
      <Grid component="form" size={12} onSubmit={handleSubmit(onSubmit)} p={2}>
        <FormField
          label="Are you comfortable participating in online surveys?"
          inputType="Select"
          registerName="onlineSurveys"
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
        />
        <FormField
          label="Do you prefer participating via online, telephone, or face-to-face research?"
          inputType="Select"
          registerName="participationPreference"
          options={[
            { label: "Online", value: "online" },
            { label: "Telephone", value: "telephone" },
            { label: "Face-to-Face", value: "face" },
          ]}
        />
        <FormField
          label="How often are you willing to participate in research?"
          inputType="Select"
          registerName="participationFrequency"
          options={[
            { label: "Weekly", value: "weekly" },
            { label: "Monthly", value: "monthly" },
            { label: "Quarterly", value: "quarterly" },
            { label: "Rarely", value: "rarely" },
          ]}
        />
        <FormField
          label="What is your preferred time of day to participate?"
          inputType="Select"
          registerName="preferredTime"
          options={[
            { label: "Morning", value: "morning" },
            { label: "Afternoon", value: "afternoon" },
            { label: "Evening", value: "evening" },
          ]}
        />
        <FormField
          label="Do you agree to be re-contacted for future studies?"
          inputType="Select"
          registerName="recontact"
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
        />
        <FormField
          label="Would you participate in focus groups in addition to surveys?"
          inputType="Select"
          registerName="focusGroups"
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
        />
        <Grid size={12} container justifyContent={"flex-end"}>
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            sx={{
              my: 2,

              color: "white",
              px: 2,
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

function Certification({ onProgressChange }) {
  const form = useForm({
    defaultValues: {},
  });

  const {
    handleSubmit,
    formState: { errors },
    watch,
  } = form;

  const onSubmit = (data) => {
    console.log(data);
  };

  // Watch all fields
  const allValues = watch();
  const totalFields = Object.keys(allValues).length || 4;
  const completedFields = Object.values(allValues).filter(
    (v) => v !== undefined && v !== ""
  ).length;

  const progress = totalFields
    ? Math.round((completedFields / totalFields) * 100)
    : 0;

  // send progress to parent
  React.useEffect(() => {
    onProgressChange?.({
      completed: completedFields,
      total: totalFields,
      progress,
    });
  }, [completedFields, totalFields, progress]);

  return (
    <FormProvider {...form}>
      <Grid component="form" onSubmit={handleSubmit(onSubmit)} p={2}>
        <FormField
          label="Please provide your professional certification/license number:"
          inputType="Input"
          registerName="certNumber"
        />
        <FormField
          label="Issuing Authority / Council:"
          inputType="Input"
          registerName="issuingAuthority"
        />
        <FormField
          label="Year of Issue"
          inputType="Date"
          registerName="yearOfIssue"
        />
        {/* Upload Certification Document (Optional) - Custom component needed */}

        <CheckboxWithText registerName="consent">
          I consent to my certification number being used only for verification
          purposes and stored securely in compliance with [GDPR/HIPAA/Local Data
          Privacy Laws].
        </CheckboxWithText>

        <Grid size={12} container justifyContent={"flex-end"}>
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            sx={{
              my: 2,
              color: "white",
              px: 2,
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
