import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/layout/topbar/Topbar";
import Sidebar from "@/components/layout/Sidebar";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: { template: "%s | Go Paddie", default: "Go Paddie" },
  description:
    "Plan and manage your trips in one place – search flights, hotels, and activities and build a detailed travel itinerary.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <QueryProvider>
          <Toaster />
          <header className="h-(--topbar-height) fixed bg-white top-0 z-10 inset-x-0">
            <Topbar />
          </header>
          <div className="layout-shell max-w-400 mx-auto flex min-h-svh bg-neutral-300 gap-8 2xl:gap-16 p-5 2xl:p-10">
            <aside className="w-75 h-fit max-h-[calc(100vh-12.5rem)] overflow-y-auto shrink-0 sticky top-layout-offset left-0">
              <Sidebar />
            </aside>
            <main className="flex flex-1 bg-white">{children}</main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
