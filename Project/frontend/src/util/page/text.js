import Typography from "@mui/material/Typography";

export default function ({ children, sx, ...rest }) {
  return (
    <Typography sx={sx} {...rest}>
      {children}
    </Typography>
  );
}
