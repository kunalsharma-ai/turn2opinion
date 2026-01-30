import Typography from "@mui/material/Typography";

export default function (attr) {
  return (
    <Typography component={attr.component} variant={attr.variant} sx={attr.sx}>
      {attr.children}
    </Typography>
  );
}
