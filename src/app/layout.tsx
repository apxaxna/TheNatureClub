import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Nature Club",
  description: "The Nature Club",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
