import { Page } from "@/util";
import { Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function PageTitle({ onBack, title = "", actions = <></>, sx }) {
  return (
    <Grid
      size={12}
      container
      spacing={{ xs: 1, md: 0 }}
      sx={{ px: { xs: 0.5, md: 3.2 }, pb: 1, alignItems: "center", ...sx }}
    >
      <Grid
        container
        size={{ xs: 6, md: 2 }}
        sx={{ alignItems: "center" }}
        order={1}
      >
        {onBack && (
          <Page.MuiButton
            aria-label="Back Button"
            startIcon={
              <ArrowBackIcon
                sx={{
                  fontSize: "18px !important",
                }}
              />
            }
            sx={{
              bgcolor: "whitesmoke",
              color: "black",
              borderRadius: 2,
              border: "1px solid #c8c8c8ff",
              px: 2,
              height: "32px",
              "&:hover": {
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              },
            }}
            onClick={onBack}
          >
            Back
          </Page.MuiButton>
        )}
      </Grid>

      <Grid size={{ xs: 12, md: 7 }} order={{ xs: 3, md: 2 }}>
        <Page.Text
          sx={{
            textAlign: "center",
            fontSize: { xs: 16, xl: 22 },
            fontWeight: "bold",
          }}
        >
          {title}
        </Page.Text>
      </Grid>

      <Grid
        size={{ xs: 12, md: 3 }}
        sx={{ display: "flex", justifyContent: "flex-end" }}
        order={{ xs: 2, md: 3 }}
      >
        {actions}
      </Grid>
    </Grid>
  );
}

export default PageTitle;
