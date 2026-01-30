import "./globals.css";
import "@/lib/enhancements.js";
import { CssBaseline } from "@mui/material";
import Providers from "./providers";
import { Toast } from "@/components";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/css/style.css" as="style" />
        <link rel="stylesheet" href="/css/style.css" />

        <title>Turn2Opinion - Get Paid for Your Opinion</title>
        <meta
          name="description"
          content="Join Turn2Opinion — a trusted platform where people share insights and earn rewards for participating in surveys."
        />
      </head>
      <body>
        <main>
          <Providers>
            <CssBaseline />
            {children}
            <Toast />
          </Providers>
        </main>
      </body>
    </html>
  );
}
