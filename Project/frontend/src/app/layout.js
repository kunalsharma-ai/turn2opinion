import "./globals.css";
import "@/lib/enhancements.js";
import { CssBaseline } from "@mui/material";
import Providers from "./providers";
import { Toast } from "@/components";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import ChatWidget from "@/componentsMHO/ChatWidget";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/css/style.css" as="style" />
        <link rel="stylesheet" href="/css/style.css" />

        <title>
          Turn2Opinion | Get Paid for Online Surveys & Rewards Platform
        </title>
        <meta
          name="description"
          content="Join Turn2Opinion, a trusted online survey panel where you can participate in paid surveys, share opinions, and earn rewards through PayPal, gift vouchers, and more."
        />
        <meta
          name="keywords"
          content="
            paid online surveys,
            earn money online surveys,
            online survey panel,
            paid surveys India,
            survey rewards platform,
            get paid for opinions,
            earn rewards online,
            market research panel,
            consumer survey panel,
            B2B survey panel,
            online opinion surveys,
            paid survey website,
            survey community,
            online research panel,
            cash rewards surveys,
            paypal survey rewards,
            gift voucher surveys,
            survey participation rewards,
            market research surveys,
            trusted survey sites India
          "
        />
      </head>
      <body>
        <main>
          <Providers>
            <CssBaseline />
            {children}
            <ChatWidget />
            <Toast />
          </Providers>
        </main>
        <GoogleTagManager gtmId="GTM-MBPP77RX" />
        <Script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v23.0"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
