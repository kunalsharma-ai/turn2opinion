import FormLabel from "@mui/material/FormLabel";

function FormLabels(attr) {
  return <FormLabel htmlFor={attr.htmlFor}>{attr.children}</FormLabel>;
}

export default FormLabels;
