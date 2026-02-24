import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TravelEdWise CMO Workspace",
  description: "AI-powered marketing engine for travel affiliate monetization. Research trends, create campaigns, and deploy content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TooltipProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-[240px] transition-[margin] duration-200">
              <Header />
              <div className="p-6">
                {children}
              </div>
            </main>
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
