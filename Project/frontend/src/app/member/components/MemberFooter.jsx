import { Grid, Typography } from "@mui/material";
import React from "react";

function MemberFooter() {
  return (
    <Grid
      size={12}
      sx={{
        textAlign: "center",
        // borderTop: "1px solid #222222",
        py: 0.5,
        color: "#bdbdbd",
        bgcolor: "#24292e",
        fontSize: 12,
        zIndex: 999,
      }}
    >
      Copyright 2026 ©{" "}
      <Typography
        component="a"
        href="https://frequentresearch.com/"
        target="_blank"
        rel="noopener noreferrer"
        color="primary.main"
        fontWeight={500}
        fontSize={12}
        sx={{
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        Frequent Research Fieldwork Solutions Pvt. Ltd.
      </Typography>{" "}
      (d/b/a Turn2Opinion). All Rights Reserved.
    </Grid>
  );
}

export default MemberFooter;
