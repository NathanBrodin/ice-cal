import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const calSans = localFont({
  src: "./fonts/CalSans-SemiBold.woff2",
  variable: "--font-calsans",
});

export const metadata: Metadata = {
  title: "Ice Calendar",
  description: "Ice Calendar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${calSans.variable} antialiased dark`}
      >
        {children}
      </body>
    </html>
  );
}
