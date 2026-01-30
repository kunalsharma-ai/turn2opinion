import React from "react";
import { Grid, Container, Typography } from "@mui/material";

function WeArePart() {
  return (
    <Grid
      size={12}
      sx={{
        bgcolor: "white",
        py: { xs: "30px", md: "60px" },
        px: { xs: 0, md: "50px" },
      }}
    >
      <Container maxWidth="xl">
        <Grid
          size={12}
          container
          direction="column"
          alignItems="center"
          spacing={2}
        >
          <img
            src="/imagest2o/icon-review.png"
            alt="review icon"
            height={80}
            width={80}
          />
          <Typography
            sx={{
              fontSize: { xs: 20, lg: 28 },
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            We are a part of{" "}
            <Typography
              component={"span"}
              sx={{
                fontSize: { xs: 20, lg: 28 },
                fontWeight: "bold",
               background: "var(--bg-primary-gradient)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                display: "inline-block",
                textAlign: "center",
              }}
            >
              Frequent Research Fieldwork Solutions Private Limited,
            </Typography>
             An Online Market Research Panel and Full Service Research Company
          </Typography>
          <Typography
            fontSize={16}
            color="#555"
            textAlign={{ xs: "justify", md: "center" }}
          >
            Our Turn2Opinion community members consist of Consumers and Business
            people, We are shaping to become one of the world's largest Consumer
            & Business panel and a premier global online research sample
            provider of Business & Consumer research information to The World
            organisations to take a quality respondent of their choice.
          </Typography>
        </Grid>
      </Container>
    </Grid>
  );
}

export default WeArePart;
