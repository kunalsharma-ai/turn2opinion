"use client";
import React from "react";
import { Grid, Typography, List, ListItem, Box } from "@mui/material";
import SubHeader from "@/componentsMHO/SubHeader";

const standards = [
  {
    imageSrc: "./images/home/profiling/double-opt.png",
    title: "Double Opt-In",
    description:
      "Our respondents follow a double opt-in procedure whenever they sign up. We then strengthen the budding relationship with these new members through a clever retention programme, based on attention, trust and honesty.",
  },
  {
    imageSrc: "./images/home/profiling/postal.png",
    title: "Email & Postal Address Verifications",
    description:
      "We verify the registrant’s postal address and zip/postal code from a current local address directory and our panel recruitment team check through our database to ensure the email address is unique (all registrants must verify their email address through a double opt-in registration process).",
  },
  {
    imageSrc: "./images/home/profiling/geoip.png",
    title: "GeoIP and Unique IP Check",
    description:
      "Our servers locate the registrant’s country location through his/her IP address and determines their eligibility for registration based on country specific rules.",
  },
  {
    imageSrc: "./images/home/profiling/unique-recruitment.png",
    title: "Unique Recruitment Process",
    description:
      "We have a unique & rigorous registration process to validate new members, and continuous profile updates through periodic survey screeners. Our proprietary panels are profiled across a wide range of criteria that is including different profile and demographics, users of fast-moving consumer good, durables, automotive, telecommunications, decision makers ITDMs/BDMS, finance/insurance, healthcare and more.",
  },
  {
    imageSrc: "./images/home/profiling/finger-digital.png",
    title: "Finger Digital Printing Imperium’s RelavantID",
    description:
      "Our Custom Digital Fingerprint system identify each respondent and prevent fraud. This eliminates duplicate respondents and ensures survey data is unique to each participant. We also use TrueSample, Radware and RelevantID digital finger technology which ensures unique respondents in our panel. RelevantID, identify and blocks duplicate respondents real time while entering a survey.",
  },
  {
    imageSrc: "./images/home/profiling/proxy.png",
    title: "Proxy Detection",
    description:
      "Our servers locate the registrant’s country location through his/her IP address and determines their eligibility for registration based on country specific rules.",
  },
  {
    imageSrc: "./images/home/profiling/bot.png",
    title: "BOT Prevention",
    description:
      "We are integrated with Distil Networks BOT detection technology to eliminate BOT traffic before they even hit our servers. This helps us to stop online frauds, cybersecurity threats and ensure only humans are getting into our servers and surveys.",
  },
];
const reasons = [
  {
    imageSrc: "./images/home/profiling/flawless-delivery.png",
    title: "Flawless Delivery",
    description: (
      <>
        We ensure Quality data, on time and on budget. Our team deliver insights
        at the speed of business; your business doesn’t have time to wait. We
        provide solutions to meet your expectations
      </>
    ),
  },
  {
    imageSrc: "./images/home/profiling/flexible-pricing.png",
    title: "Flexible and Competitive Pricing ",
    description: (
      <>
        Our pricing strategy is highly flexible & competitive in the market,
        without compensating on the quality and the timeline of project
        delivery.
      </>
    ),
  },
  {
    imageSrc: "./images/home/profiling/global-coverage.png",
    title: "Global Coverage 90+ Regions",
    description: (
      <>
        We provide all the opinions you need using the right mode every time
        with global reach in 90+ regions. We make your Reach to consumer and
        business targets online with the ability to select from over 800+
        profiles; multiple demographic and geographic options
      </>
    ),
  },
  {
    imageSrc: "./images/home/profiling/real.png",
    title: "Real, Valid & Responsive Respondents",
    description: (
      <>
        We have access to a selected real , responsive and valid number of panel
        members who are carefully screened to ensure quality real time data to
        our clients
      </>
    ),
  },
  {
    imageSrc: "./images/home/profiling/quick-turnaround.png",
    title: "Quick Turnaround",
    description: (
      <>
        Our Team work 24*6 and having dedicated team of account & Project
        managers who serves as one point of contact to provide quick turnaround
        and ensure the smooth execution of all your research projects
      </>
    ),
  },
  {
    imageSrc: "./images/home/profiling/advanced-technology.png",
    title: "Latest Advance Technology ",
    description: (
      <>
        We always keep our foot ahead to deliver the best practice to our
        clients. We always care about the personal and confidential information
        safety and quality which is why we move with new innovative latest
        technology adaption and security in our project management tools &
        Severs to provide our clients quality driven data.
      </>
    ),
  },
  {
    imageSrc: "./images/home/profiling/international-research.png",
    title: "International Research Standard",
    description: (
      <>
        We comply with international standards set by the governing associations
        and adapt the latest innovations in the industry, providing a highly
        professional service.
      </>
    ),
  },
  {
    imageSrc: "./images/home/profiling/the-panelist.png",
    title: "The Largest Asian,NA & EU5 Business Decision Makers Panellist ",
    description: (
      <>
        We have a strong B2B presence in APAC Network markets with large
        profiling database for C-Suits, ITDMS, FDMS, HRDMS etc.
      </>
    ),
  },
  {
    imageSrc: "./images/home/profiling/high-response.png",
    title: "High Response Rate",
    description: (
      <>
        We have developed a rigorous & Unique registration process to validate
        new members, and continuous profile updates through periodic survey
        screeners that helps us to deliver higher response values to our clients
      </>
    ),
  },
  {
    imageSrc: "./images/home/profiling/client-satisfaction.png",
    title: "Client Satisfaction",
    description: (
      <>
        Client Satisfaction is our top priority. Maintaining a long term
        relationship with our clients is the key to our approach. We understand
        that additional support is required as the market is always volatile.
      </>
    ),
  },
  {
    imageSrc: "./images/home/profiling/high-data.png",
    title: "High Data Quality and Reliability",
    description: (
      <>
        We are committed in providing reliable and highly accurate data. We also
        have an excellent quality control system that validates the data
        collected and analyzed. The research conducted are tailored to the
        specific requirements of the client.
      </>
    ),
  },
  {
    imageSrc: "./images/home/profiling/footprint-coverage.png",
    title: "Global Timeframe Footprint Coverage",
    description: (
      <>
        We work on every time Zone. According to Time Zone, Auto Mail sent to
        the Respondents. Frequent Research connects you with trusted opinions in
        all timeframes to ensure the right results the first time.
      </>
    ),
  },
  {
    imageSrc: "./images/home/profiling/skilled-team.png",
    title: "Highly Skilled Professionals & Dedicated Panel Recruitment Team",
    description: (
      <>
        Our Team are built with highly professional team, specializing in market
        research, business analytics, finance, traditional / digital marketing
        and data collection / analysis, with a strong research knowledge. Our
        expertise provide value added market intelligence and research services
        for both local and international clients.
      </>
    ),
  },
];

function page() {
  return (
    <Grid
      size={12}
      container
      direction="column"
      alignItems={"center"}
      justifyContent={"center"}
      className="scroll-target"
    >
      <SubHeader title="Profiling and Quality Score" pageName="Profiling" />
      <Grid
        size={{ xs: 11, md: 8 }}
        container
        justifyContent={"center"}
        direction={"column"}
        py={7}
        textAlign={"justify"}
        sx={{ wordBreak: "break-word" }}
      >
        <Typography
          fontSize={"18px"}
          fontWeight={"bold"}
          my={2}
          color="secondary.main"
        >
          Profiling Standard
        </Typography>
        <Typography fontWeight={"bold"} fontSize={"16px"}>
          Our Profiling scoring system designed to measure individual survey
          respondent quality on a scale of 0-200.
        </Typography>
        <List
          sx={{
            listStyleType: "disc",
            pl: 5,
            "& .MuiListItem-root": {
              display: "list-item",
              py: 0.2,
              fontSize: "16px",
            },
          }}
        >
          <ListItem>
            Frequent Research panellists are recruited through our two
            proprietary platforms www.turn2opinion.com/
            www.myfrequentrewards.com along with multi-sources by using numerous
            channels selected by our panel recruitment team, ensuring every
            research project going live are subjected to a truly representative
            sample of the population spread across 90+ countries spread across
            all over the world. Our panellists are recruited and managed in
            conformance with market research industry standards.
          </ListItem>
          <ListItem>
            We have a rigorous registration process to validate new members, and
            continuous profile updates through periodic survey screeners. We
            have about 100+ panel profile questions and around 300+
            sub-profiling questions for our panellist. We make sure to give
            demos to the panellists on how to fill the rest of the profile and
            why is it useful for them to provide maximum information. The
            profiles are categorized under the various categories as mentioned
            below.
          </ListItem>
        </List>
        <Grid size={12} container p={{ md: 3 }} spacing={{ md: 1 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <img
              src="./images/home/profiling/t2o_profiles.png"
              alt="profiles"
              width={"100%"}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <img
              src="./images/home/profiling/t2o_dashboard.png"
              alt="dashboard"
              width={"100%"}
            />
          </Grid>
        </Grid>
        <List
          sx={{
            listStyleType: "disc",
            pl: 5,
            "& .MuiListItem-root": {
              display: "list-item",
              py: 0.2,
              fontSize: "16px",
            },
          }}
        >
          <ListItem>
            In the registration process we have 11 profiling segment for each
            panellist where they have to provide required inputs that helps us
            to analyse their accurate information and to filter them for survey
            Incentive engagement. Each panel member get 50-100 scoring points
            against each profiling completion with in the validation applicable
            at our end, and they have to achieve the threshold of 1000 points to
            claim the rewarded amount which is processed through their PayPal
            ID.
          </ListItem>
          <ListItem>
            After the registration process completion as well as after every
            survey taken we request respondents to update their profile on all
            available categories incase they are left with any incomplete
            segment, which are also updated on time to time basis to stay on
            with the changes in the market.
          </ListItem>
          <ListItem>
            Through a comprehensive profile questionnaire during panellist
            registration, as well as regular updates of the master data, we are
            in possession of a large number of background variables and can
            select persons in a targeted fashion based on specific attributes.
            We can also enrich your survey data with this basic data and thus
            provide you with even more information, e.g. for the building of
            customer profiles.
          </ListItem>
        </List>
        <Typography
          fontSize={"18px"}
          fontWeight={"bold"}
          my={2}
          color="secondary.main"
        >
          Bot Validation
        </Typography>
        <List
          sx={{
            listStyleType: "disc",
            pl: 5,
            "& .MuiListItem-root": {
              display: "list-item",
              py: 0.2,
              fontSize: "13px",
            },
          }}
        >
          <ListItem>
            <Typography fontSize={"16px"}>
              We at Frequent Research adhere very strict measure to prevent the
              BOT where we have google Captcha in place at initial stage of
              registration however we also enforce Attention Checks Question as
              well as Open end Question checks for every user who register on
              our portals to avoid the BOT activity.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography fontSize={"16px"}>
              Each user will have to pass the Attention Question which is asked
              randomly every time with new question where they need to choose
              right option to be our quality member or have to pass the atleast
              50 as a score with 10-20 words in Open end Questions with no Copy
              Paste.
            </Typography>
          </ListItem>
        </List>
        <Grid size={12} px={{ md: 3 }}>
          <img
            src="./images/home/profiling/screenshots/3.png"
            alt=""
            width={"100%"}
          />
        </Grid>{" "}
        <Grid size={12} px={{ md: 3 }}>
          <img
            src="./images/home/profiling/screenshots/4.png"
            alt=""
            width={"100%"}
          />
        </Grid>
        <Typography
          fontSize={"18px"}
          fontWeight={"bold"}
          my={2}
          color="secondary.main"
        >
          GATE Survey , Pre-screener & Other Security Checks
        </Typography>{" "}
        <List
          sx={{
            listStyleType: "disc",
            pl: 5,
            "& .MuiListItem-root": {
              display: "list-item",
              py: 0.2,
              fontSize: "13px",
            },
          }}
        >
          <ListItem>
            <Typography fontSize={"16px"}>
              We apply the same pattern of authentication in gate survey as well
              where user need to first bypass their authenticity and provide
              their loyal interest to participate before enter into the client
              survey, once they are able to score atleast 60Pts/200 with 20-30
              unique words.If any user who fails in attention checks question
              and in our Opened parameters they are not allowed to participate
              in the client survey.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography fontSize={"16px"}>
              For Advance Security on each level of survey we apply CAPTCHA,
              Gate Survey, Pre-screening, Geo Tagging, IP score Tracking,
              Longitude & Latitude Tracking Tracking and also enforce Digital to
              enable only quality user to take participate in the survey.
            </Typography>
          </ListItem>
        </List>{" "}
        <Grid size={12} px={{ md: 3 }}>
          <img
            src="./images/home/profiling/screenshots/5.png"
            alt=""
            width={"100%"}
          />
        </Grid>
        <Typography
          fontSize={"18px"}
          fontWeight={"bold"}
          mt={2}
          color="secondary.main"
        >
          Quality Standard
        </Typography>
        <Typography
          fontSize={"16px"}
          color="secondary.main"
          fontWeight={"500"}
          mt={2}
          mb={1}
        >
          Our panel structure forms the perfect basis for the choice of your
          random samples. By way of guided invitation of study participants via
          quota plans or optimal samp
        </Typography>{" "}
        <Typography
          fontSize={"16px"}
          fontWeight={"500"}
          fontStyle="italic"
          px={{ xs: 3, md: 5 }}
        >
          As a panel provider, Frequent Research is an ISO 9001:2015, ISO 27001:
          2015. ISO 20252: 2019 Certified company and ensures the quality of the
          online questionnaires with comprehensive measures for panel
          cultivation:
        </Typography>
        <List
          sx={{
            listStyleType: "disc",
            pl: 5,
            "& .MuiListItem-root": {
              display: "list-item",
              py: 0.2,
              fontSize: "13px",
            },
          }}
        >
          <ListItem>
            <Typography fontSize={"16px"}>
              Regular updating of abundant master data for all panellists
            </Typography>
          </ListItem>
          <ListItem>
            <Typography fontSize={"16px"}>
              Meticulous duplicate cleansing via automated processes and manual
              review
            </Typography>
          </ListItem>
          <ListItem>
            <Typography fontSize={"16px"}>
              Regular suspension of inactive panel participants
            </Typography>
          </ListItem>
          <ListItem>
            <Typography fontSize={"16px"}>
              Tracking of individual fill-out time, pattern respondents (e.g.
              straight-lining), answer quality and quantity in open questions
            </Typography>
          </ListItem>
          <ListItem>
            <Typography fontSize={"16px"}>
              Systematic detection of untrustworthy survey participants, and
              exclusion of these panellists
            </Typography>
          </ListItem>
          <ListItem>
            <Typography fontSize={"16px"}>
              Proactive and sustainable panellist support and panellist helpline
              with answer guarantee
            </Typography>
          </ListItem>
          <ListItem>
            <Typography fontSize={"16px"}>
              Panellists can participate in a maximum of 3 surveys per month
            </Typography>
          </ListItem>
        </List>
        <Typography
          fontSize={"18px"}
          color="secondary.main"
          fontWeight={"500"}
          mt={2}
          mb={1}
        >
          Frequent set standards and leave no room to employ cutting edge
          technology and always find new ways and work using different
          techniques and methodologies to ensure data quality
        </Typography>{" "}
        <Typography fontSize={"16px"}>
          We care about details creating valid and robust outcomes therefore
          invest in technology and ensure to deliver high quality data to our
          researchers & clients. We have our inhouse QC team and partnered with
          many third party companies who are industry experts in security checks
          at the time of recruitment and at various survey levels. Our high
          quality standards in recruitment of participants and our qualified
          team's continuous and meticulous maintenance of our panels can be seen
          in our exceptionally high response rates and the close affinity we
          enjoy with our participants. This results in responses that meet the
          highest standards of quality to provide our customers with a solid
          basis for successful research projects.
        </Typography>
        <Grid size={12} direction={"column"} container spacing={2} py={3}>
          {standards.map((standard, index) => (
            <Grid
              key={index}
              size={12}
              container
              sx={{
                borderRadius: 2,
                p: 2,
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
                bgcolor: (theme) => theme.palette.cardbg.main,
              }}
            >
              <Grid
                size={{ xs: 12, md: 2 }}
                container
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                minHeight={"80px"}
              >
                <img
                  src={standard?.imageSrc}
                  alt="quality standard"
                  width="40px"
                />
                <Typography
                  textAlign={"center"}
                  color="secondary.main"
                  fontWeight={"bold"}
                  fontSize={"13px"}
                >
                  {standard?.title}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 10 }} alignItems={"center"} container>
                {standard?.description}
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Typography
          fontSize={"18px"}
          fontWeight={"bold"}
          my={4}
          color="secondary.main"
        >
          Top Reasons to Choose US?
        </Typography>
        <Grid size={12} container spacing={1}>
          {reasons.map((item, index) => (
            <Grid
              key={index}
              size={{ xs: 12, md: 6, lg: 4 }}
              sx={{
                p: 2,
                borderRadius: 2,
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
                bgcolor: (theme) => theme.palette.cardbg.main,
                width: "100%",
              }}
            >
              <Grid
                container
                justifyContent={"center"}
                direction={"column"}
                alignItems={"center"}
                spacing={2}
                mb={1}
              >
                <img src={item?.imageSrc} alt="quality standard" width="60px" />
                <Typography fontWeight="bold">{item.title}</Typography>
              </Grid>
              <Typography>{item.description}</Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default page;
