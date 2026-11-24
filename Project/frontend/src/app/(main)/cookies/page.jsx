"use client";
import ConsoleContent from "@/components/ConsoleContent";
import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SubHeader from "@/componentsMHO/SubHeader";

const CookiePolicy = () => {
  return (
    <Grid
      size={12}
      container
      justifyContent={"center"}
      className="scroll-target"
    >
      <SubHeader title="Cookies Policy" pageName="CookiesPolicy" />
      <Grid size={12} container justifyContent={"center"} bgcolor="white">
        <Grid
          size={{ xs: 11, xl: 8 }}
          container
          justifyContent={"center"}
          py={6}
        >
          <ConsoleContent pageKey="cookies" headings={["h5", "h6"]}>
          <Grid container spacing={4}>
            <Grid size={12}>
              <Box textAlign="center">
                <Box className="icon" mb={2}>
                  <img
                    src="/images/home/about/icon-review.png"
                    alt="icon-review"
                    width="80px"
                  />
                </Box>
                <Typography fontSize={"16px"}>
                  We use different types of cookies to optimize your experience
                  on our website. Click on the categories below to learn more
                  about their purposes. You may choose which types of cookies to
                  allow and can change your preferences at any time. Remember
                  that disabling cookies may affect your experience on the
                  website. You can learn more about how we use cookies by
                  visiting our Cookie Policy and Privacy Policy.
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Accordion Section */}
          <Box
            mt={4}
            display={"flex"}
            gap={2}
            flexDirection={"column"}
            overflow={"auto"}
          >
            {/* Essentials */}
            <Accordion
              disableGutters
              sx={{
                boxShadow: 0,
                // color:"#fff",
                bgcolor: "#385e9e",
                // border: `1px solid #ecccafff`,
                p: 1,
                borderRadius: 3,
                minHeight: "40px",
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
                expandIcon={<ExpandMoreIcon />}
                sx={{ color: "#fff" }}
              >
                <Typography fontSize={"18px"}>Essentials</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ bgcolor: "white", borderRadius: 2 }}>
                <Typography fontSize={"16px"} mb={1} mt={3}>
                  These cookies are necessary to the core functionality of our
                  website and some of its features, such as access to secure
                  areas.
                </Typography>
                <Typography fontSize={"16px"}>
                  Below full details for Essentials:
                </Typography>
                <TableContainer
                  sx={{
                    overflow: "auto",
                    mt: 2,
                    minWidth: "100%",
                  }}
                >
                  <Table
                    sx={{
                      bgcolor: "white",
                      minWidth: "100%",
                      overflowX: "scroll",
                      tableLayout: "fixed",
                      "& tbody td": {
                        height: "32px",
                        fontSize: "15px",
                        border: "1px solid rgba(0, 0, 0, 0.2)",
                      },
                      "& tbody tr": {
                        height: "32px",
                      },
                      "& thead th": {
                        fontSize: "16px",
                        fontWeight: "bold",
                        border: "1px solid rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ width: "200px" }}>Name</TableCell>
                        <TableCell sx={{ width: "200px" }}>Purpose</TableCell>
                        <TableCell sx={{ width: "200px" }}>Type</TableCell>
                        <TableCell sx={{ width: "200px" }}>
                          Expires In
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>connection.sid</TableCell>
                        <TableCell>
                          Stores authentication and authorization of user after
                          login. This variable is used to provide personalized
                          user experience
                        </TableCell>
                        <TableCell>http_cookie</TableCell>
                        <TableCell>30 days / Logout</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <p>twk_idm_key,</p>
                          <p>TawkConnectionTime,</p>
                          <p>twk_uuid_XXXX</p>
                        </TableCell>
                        <TableCell>
                          Used to provide chat support to the respondent live
                          while working. These cookies are set by a third party
                          but chat feature is totally dependent on this so it
                          cannot be ignored
                        </TableCell>
                        <TableCell>http_cookie</TableCell>
                        <TableCell>Managed by third party (Tawk.to)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Google_RECAPTCHA</TableCell>
                        <TableCell>
                          Managed by Google for spam protection and robot
                          detection
                        </TableCell>
                        <TableCell>http_cookie</TableCell>
                        <TableCell>Managed by third party (Google)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>VisitorInfo*</TableCell>
                        <TableCell>
                          Used by YouTube for video embedding and analytics
                        </TableCell>
                        <TableCell>http_cookie</TableCell>
                        <TableCell>Managed by Third party (YouTube)</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>

            {/* Performance */}
            <Accordion
              disableGutters
              sx={{
                boxShadow: 0,
                // color: "#fff",
                bgcolor: "#385e9e",
                // border: `1px solid #ecccafff`,
                p: 1,
                borderRadius: 3,
                minHeight: "40px",
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
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{color:"#fff"}}>
                <Typography fontSize={"18px"}>
                  Performance And Functionality
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ bgcolor: "white", borderRadius: 2 }}>
                <Typography fontSize={"16px"} mt={3} mb={1}>
                  These cookies are used to enhance the performance and
                  functionality of our websites but are nonessential to their
                  use. However, without these cookies, certain functionality
                  (like videos) may become unavailable.
                </Typography>
                <Typography fontSize={"16px"}>
                  Below full details for Performance and Functionality:
                </Typography>
                <TableContainer
                  sx={{
                    overflow: "auto",
                    mt: 2,
                    minWidth: "100%",
                  }}
                >
                  <Table
                    sx={{
                      bgcolor: "white",
                      minWidth: "100%",
                      overflowX: "scroll",
                      tableLayout: "fixed",
                      "& tbody td": {
                        height: "32px",
                        fontSize: "15px",
                        border: "1px solid rgba(0, 0, 0, 0.2)",
                      },
                      "& tbody tr": {
                        height: "32px",
                      },
                      "& thead th": {
                        fontSize: "16px",
                        fontWeight: "bold",
                        border: "1px solid rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ width: "300px" }}>Name</TableCell>
                        <TableCell sx={{ width: "200px" }}>Purpose</TableCell>
                        <TableCell sx={{ width: "200px" }}>Type</TableCell>
                        <TableCell sx={{ width: "200px" }}>
                          Expires In
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <p>_hjSessionUser_XXXXXXX</p>
                          <p>_hjFirstSeen</p>
                          <p>_hjIncludedInSessionSample</p>
                          <p>_hjSession_XXXXXXXX</p>
                          <p>_hjIncludedInPageviewSample</p>
                          <p>_hjAbsoluteSessionInProgress</p>
                        </TableCell>
                        <TableCell>
                          Used for proactive tracking of issues in the website
                          and app before a visitor reports them.
                        </TableCell>
                        <TableCell>http_cookie</TableCell>
                        <TableCell>Managed by Third party (Hotjar)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <p>_GA*</p>
                          <p>NID*</p>
                          <p>IDE*</p>
                          <p>ANID*</p>
                        </TableCell>
                        <TableCell>
                          Used by Google Analytics to provide information about
                          user’s behaviour.
                        </TableCell>
                        <TableCell>http_cookie</TableCell>
                        <TableCell>Managed by Third party (Google)</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>

            {/* Social Networking */}
            <Accordion
              disableGutters
              sx={{
                boxShadow: 0,
                // color: "#fff",
                bgcolor: "#385e9e",
                // border: `1px solid #e0e0e0`,
                p: 1,
                borderRadius: 3,
                minHeight: "40px",
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
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{color:"#fff"}}>
                <Typography fontSize={"18px"}>Social Networking</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ bgcolor: "white", borderRadius: 2 }}>
                <Typography fontSize={"16px"} py={3}>
                  These cookies enable you to share our website's content
                  through third-party social networks and other websites. They
                  may also be used for advertising.
                </Typography>
              </AccordionDetails>
            </Accordion>

            {/* Unclassified */}
            <Accordion
              disableGutters
              sx={{
                boxShadow: 0,
                // color: "#fff",
                bgcolor: "#385e9e",
                // border: `1px solid #e0e0e0`,
                p: 1,
                borderRadius: 3,
                minHeight: "40px",
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
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{color:"#fff"}}>
                <Typography fontSize={"18px"}>Unclassified</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ bgcolor: "white", borderRadius: 2 }}>
                <Typography fontSize={"16px"} py={3}>
                  These are cookies that have not yet been categorized. We are
                  in the process of classifying these cookies with the help of
                  their providers.
                </Typography>
                <TableContainer
                  sx={{
                    overflow: "auto",
                    mt: 2,
                    minWidth: "100%",
                  }}
                >
                  <Table
                    sx={{
                      bgcolor: "white",
                      minWidth: "100%",
                      overflowX: "scroll",
                      tableLayout: "fixed",
                      "& tbody td": {
                        height: "32px",
                        fontSize: "15px",
                        border: "1px solid rgba(0, 0, 0, 0.2)",
                      },
                      "& tbody tr": {
                        height: "32px",
                      },
                      "& thead th": {
                        fontSize: "16px",
                        fontWeight: "bold",
                        border: "1px solid rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ width: "200px" }}>Name</TableCell>
                        <TableCell sx={{ width: "200px" }}>Purpose</TableCell>
                        <TableCell sx={{ width: "200px" }}>Type</TableCell>
                        <TableCell sx={{ width: "200px" }}>
                          Expires In
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Auth</TableCell>
                        <TableCell>
                          Auth token for autologin if user selects "remember me"
                        </TableCell>
                        <TableCell>html_local_storage</TableCell>
                        <TableCell>Persistent</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          </Box>
          </ConsoleContent>
        </Grid>{" "}
      </Grid>
    </Grid>
  );
};

export default CookiePolicy;
