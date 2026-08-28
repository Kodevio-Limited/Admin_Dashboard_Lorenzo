import type { Metadata } from "next";
import { Inter } from "next/font/google";
import QueryProvider from "@/components/providers/query-provider";
import AuthGuard from "@/components/providers/auth-guard";
import Toast from "@/components/layout/Toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for managing clients, properties, reports, and media",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full`}>
      <body className="min-h-full bg-dark-bg text-dark-text antialiased">
        <QueryProvider>
          <AuthGuard>{children}</AuthGuard>
          <Toast />
        </QueryProvider>
      </body>
    </html>
  );
}

