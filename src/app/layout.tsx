import type { Metadata } from "next";
import "@fontsource-variable/inter"; // placeholder until Söhne is licensed
import "./globals.css";

export const metadata: Metadata = {
  title: "Nayya",
  description: "Nayya web app",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-surface-page text-text-primary">{children}</body>
    </html>
  );
}
