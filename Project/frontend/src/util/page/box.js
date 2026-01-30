import Box from "@mui/material/Box";
function ContentBox(attr) {
  return (
    <Box {...attr} >
      {attr.children}
    </Box>
  );
}

export default ContentBox;
