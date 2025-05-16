import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppClientProvider from "./AppClientProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Incentigrate - Learn & Earn",
  description:
    "Empowering refugees with a rewarding platform for learning, earning, and community support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased">
        <AppClientProvider>{children}</AppClientProvider>
      </body>
    </html>
  );
}
