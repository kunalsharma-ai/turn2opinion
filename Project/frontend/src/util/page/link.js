import Link from "@mui/material/Link";
import NextLink from "next/link";
function Links(attr) {
  return (
    <Link
      color="secondary"
      href={attr.href}
      component={NextLink}
      type={attr.type}
      onClick={attr.onClick}
      variant={attr.variant}
      sx={attr.sx}
      underline={attr.underline}
      target={attr.target}
      tabIndex={attr.tabIndex}
    >
      {attr.children}
    </Link>
  );
}

export default Links;
