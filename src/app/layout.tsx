import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const heading = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/headshot.png",
    apple: "/headshot.png",
  },
  title: {
    default: "Johnny Lin",
    template: "%s | Johnny Lin",
  },
  description:
    "EECS student at UC Berkeley. Product Intern at Hatch, Operations at Tella, Senior Development Specialist at Mission Bit.",
  metadataBase: new URL("https://johnnylinsf.com"),
  openGraph: {
    title: "Johnny Lin",
    description:
      "EECS student at UC Berkeley. Product Intern at Hatch, Operations at Tella, Senior Development Specialist at Mission Bit.",
    url: "https://johnnylinsf.com",
    siteName: "Johnny Lin",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Johnny Lin",
    description:
      "EECS student at UC Berkeley. Product Intern at Hatch, Operations at Tella, Senior Development Specialist at Mission Bit.",
    creator: "@johnnylinsf",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${heading.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://bubble.io" />
        <link rel="dns-prefetch" href="https://missionbit.org" />
        <link rel="dns-prefetch" href="https://tella.com" />
        <link rel="dns-prefetch" href="https://hatch.co" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=localStorage.getItem('theme');if(m==='dark')document.documentElement.classList.add('dark');else if(m==='light')document.documentElement.classList.add('light');else if(matchMedia('(prefers-color-scheme:dark)').matches)document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
