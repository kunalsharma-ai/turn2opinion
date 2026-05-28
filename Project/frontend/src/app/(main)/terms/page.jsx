import React from "react";
import data from "@/data/data.json";
import { Grid, Container } from "@mui/material";
import SubHeader from "@/componentsMHO/SubHeader";
function page() {
  return (
    <div className="scroll-target">
      <SubHeader title="Terms and Conditions" pageName="Terms and Conditions" />
      <Grid size={12} py={10} bgcolor="white">
        <Container
          maxWidth="xl"
          sx={{
            textAlign: "justify",
            "& p": {
              fontSize: 16,
              mb: 2,
              lineHeight: 1.7,
            },
            "& h2": {
              fontSize: 28,
              mt: 4,
              mb: 2,
              fontWeight: 600,
              color: "secondary.main",
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
          <div dangerouslySetInnerHTML={{ __html: data.terms }} />
        </Container>
      </Grid>
    </div>
  );
}

export default page;
