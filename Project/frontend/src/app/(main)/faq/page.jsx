import React from "react";
import SubHeader from "@/componentsMHO/SubHeader";
import data from "@/data/data.json";
import {
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function page() {
  return (
    <Grid
      size={12}
      container
      direction="column"
      alignItems={"center"}
      className="scroll-target"
      
    >
      <SubHeader title="Frequently Asked Questions" pageName="FAQ" />

      <Grid size={12} container justifyContent={"center"} bgcolor="white">
        <Grid
          size={{ xs: 11, md: 8 }}
          container
          justifyContent={"center"}
          py={5}
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
            {data.faqs.map((faq, index) => (
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

export default page;
