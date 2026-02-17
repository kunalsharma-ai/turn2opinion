"use client";

import {
  Grid,
} from "@mui/material";
import {
  Error as ErrorIcon
} from "@mui/icons-material"
import { Page } from "@/util";

export default function SurveyAlreadyTaken({ onExit, timeout }) {
  if (timeout && onExit) {
    setTimeout(() => {
      onExit(new Event("timeout"))
    }, timeout * 1000)
  }
  return <Grid size={ 12 } container direction="column" spacing={ 3 }>
    <Grid
      size={ 12 }
      container
      spacing={ 2 }
      alignSelf="flex-start"
      alignItems="center"
      direction="column"
      mt={ 6 }
    >
      <ErrorIcon color="secondary" sx={ { fontSize: "80px" } } />
      <Page.Text
        sx={ { fontSize: "32px", textAlign: "center", my: 2 } }
      >
        Survey Already Taken
      </Page.Text>
      <Page.Text
        sx={ {
          fontSize: "16px",
          width: { xs: "95%", lg: "75%" },
          textAlign: "center",
          py: 7,
          px: 2,
          bgcolor: "#8cb2f333",
          border: `1px solid rgba(51, 169, 202, 0.4)`,
          borderRadius: 2,
        } }
      >
        You have already completed this survey. You can now go to your
        dashboard to view your rewards and other available surveys.
      </Page.Text>
      <Page.MuiButton
        variant="contained"
        color="secondary"
        sx={ { fontWeight: "bold", mt: 2 } }
        onClick={ (e) => {
          if (onExit) onExit(e)
        } }
      >
        Go to Dashboard
      </Page.MuiButton>
    </Grid>
  </Grid>
}