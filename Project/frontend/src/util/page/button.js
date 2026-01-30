import Button from "@mui/material/Button";
export default function PageButton(attr) {
  return (
    <Button
      onClick={attr.onClick}
      variant={attr.variant}
      type={attr.type}
      sx={attr.sx}
      endIcon={attr.endIcon}
      aria-label={attr["aria - label"]}
      {...attr}
    >
      {attr.children}
    </Button>
  );
}
