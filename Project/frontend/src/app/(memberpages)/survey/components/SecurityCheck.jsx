import React from "react";
import {
  Grid,
} from "@mui/material";
import PopUp from "@/componentsMHO/PopUp";
import { Page } from "@/util";

export default function SecurityCheck({ title, errorMessage, onOk, onCancel, btns }) {
  return (
    <PopUp
      open={ Boolean(errorMessage) }
      onClose={ onCancel }
      maxWidth="xs"
      title={ title }
    >
      <Grid
        size={ 12 }
        direction="column"
        container
        justifyContent="center"
        alignItems="center"
        sx={ { minHeight: "150px", p: 2 } }
      >
        <Page.Text
          component="div"
          sx={ { px: 2, mb: 2, fontWeight: 500, textAlign: "justify" } }
        >
          { errorMessage }
        </Page.Text>
        <Grid size={ 12 } spacing={ 2 } container justifyContent="flex-end">
          { btns?.ok && (
            <Page.MuiButton
              variant="contained"
              color="secondary"
              onClick={ onOk }
            >
              { btns?.ok ?? "Ok" }
            </Page.MuiButton>
          ) }
        </Grid>
      </Grid>
    </PopUp>
  );
}