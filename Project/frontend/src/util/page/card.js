import MuiCard from "@mui/material/Card";

export default function Card(attr) {
  return (
    <MuiCard variant="outlined" sx={attr.sx}>
      {attr.children}
    </MuiCard>
  );
}
