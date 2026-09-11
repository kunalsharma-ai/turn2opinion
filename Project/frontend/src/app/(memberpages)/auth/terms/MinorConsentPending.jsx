"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { useMember } from "@/Context";

export default function MinorConsentPending() {
  const user = useMember();
  return (
    <Box
      sx={{
        width: { xs: "92vw", sm: 650, md: 720 },
        mx: "auto",
        p: { xs: 3, sm: 4 },
        textAlign: "center",
        bgcolor: "white",
        // borderRadius: 3,
        // border: (theme) =>
        //   `1px solid ${theme.palette.secondary.main}`,
        // boxShadow: 8,
      }}
    >
      <Typography
        variant="h5"
        fontWeight={600}
        mb={2}
        sx={{
          color: "secondary.main",
        }}
      >
        Parent/Guardian Approval Required
      </Typography>

      <Typography variant="body1" color="text.secondary">
        You are a minor. To continue, we need permission from your parent or
        legal guardian.
      </Typography>

      <Typography variant="body1" color="text.secondary" mt={2}>
        We have sent an email to your parent/guardian with a secure link to
        review and accept the Terms & Conditions.
      </Typography>

      {user?.parent?.email && (
        <Typography
          variant="body2"
          fontWeight={600}
          mt={2}
          sx={{ color: "primary.main" }}
        >
          Consent email sent to: {user.parent.email}
        </Typography>
      )}

      <Typography variant="body1" color="text.secondary" mt={2}>
        Once your parent/guardian provides consent, you will be able to
        continue.
      </Typography>
    </Box>
  );
}
