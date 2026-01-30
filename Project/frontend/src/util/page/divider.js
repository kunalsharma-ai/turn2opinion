import Divider from "@mui/material/Divider";

function DividerLine(attr) {
  return <Divider sx={attr.sx}>{attr.children}</Divider>;
}

export default DividerLine;
