import { AuthProvider } from "@/contexts/auth";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";

const LatoRegular = localFont({
  src: "./fonts/Lato-Regular.ttf",
  variable: "--font-lato-regular",
});

const LatoBold = localFont({
  src: "./fonts/Lato-Bold.ttf",
  variable: "--font-lato-bold",
});

export const metadata: Metadata = {
  title: "Habit Tracker",
  description: "This is a habit tracker app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${LatoRegular.variable} ${LatoBold.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
