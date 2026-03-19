import React from "react";
import data from "@/data/data.json";
import { Grid, Container, Typography, Box } from "@mui/material";
import SubHeader from "@/componentsMHO/SubHeader";
function page() {
  return (
    <div className="scroll-target">
      <SubHeader title="Privacy Policy" pageName="Privacy Policy" />
      <Grid size={12} py={10} bgcolor="white">
        <Container
          maxWidth="xl"
          sx={{
            textAlign: "justify",
            "& p": {
              fontSize: 16,
              mb: 1.5,
              lineHeight: 1.7,
            },
            "& h5": {
              fontSize: 22,
              mt: 4,
              mb: 2,
              fontWeight: 600,
              color: "#e48025",
            },
            "& h6": {
              fontSize: 18,
              mt: 4,
              mb: 1,
              fontWeight: 600,
            },
            "& ul": {
              pl: 3,
              mb: 2,
            },
            "& li": {
              fontSize: 16,
              mb: 1,
            },
            "& a": {
              color: "#063686",
              textDecoration: "none",
            },
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: data.privacy }} />
        </Container>
      </Grid>
    </div>
  );
}

export default page;
