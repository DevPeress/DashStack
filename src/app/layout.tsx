import { ThemeProvider } from "../context/ThemeContext";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DashStack",
  icons: {
    icon: "/Logo.svg"
  }
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
