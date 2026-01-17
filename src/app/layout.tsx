import type { Metadata } from "next";
import "./globals.css";
import { Fira_Code, Fira_Mono } from "next/font/google";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

const firaMono = Fira_Mono({
  weight: "400",
  variable: "--font-fira-mono",
});

export const metadata: Metadata = {
  title: "Mark Cyrus Serrano | Portfolio",
  description: "Personal portfolio website of Mark Cyrus Serrano",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${firaCode.variable} ${firaMono.variable} antialiased`}>
        <main>{children}</main>
        
      </body>
    </html>
  );
}
