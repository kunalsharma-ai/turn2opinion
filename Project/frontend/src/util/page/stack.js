import Stack from "@mui/material/Stack";

function TextStack(attr) {
  return (
    <Stack direction={attr.direction} sx={attr.sx}>
      {attr.children}
    </Stack>
  );
}

export default TextStack;
