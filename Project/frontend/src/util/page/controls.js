import FormControl from "@mui/material/FormControl";

function FormControls(attr) {
  return <FormControl fullWidth>{attr.children}</FormControl>;
}

export default FormControls;
