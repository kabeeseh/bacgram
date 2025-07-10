import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./context/userContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bacgram - Social Platform for BAC Students",
  description:
    "Connect with BAC students through Bacgram, a social platform designed exclusively for the BAC community.",
  keywords:
    "Bacgram, BAC, students, social media, social network, BAC students",
  openGraph: {
    title: "Bacgram - Social Platform for BAC Students",
    description: "Connect with BAC students through Bacgram",
    url: "https://bacgram.vercel.app",
    siteName: "Bacgram",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bacgram - Social Platform for BAC Students",
    description: "Connect with BAC students through Bacgram",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3734297456127533"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
