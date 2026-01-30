import FormControlLabel from "@mui/material/FormControlLabel";

function ControlLabel(attr) {
  return (
    <FormControlLabel
      control={attr.control}
      label={attr.label}
      sx={{ display: "inline", width: "200px" }}
    />
  );
}

export default ControlLabel;
