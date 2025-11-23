import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/layout/topbar/Topbar";
import Sidebar from "@/components/layout/Sidebar";

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
        <header className="h-(--topbar-height) fixed bg-white top-0 z-10 inset-x-0">
          <Topbar />
        </header>
        <div className="max-w-360 mt-(--topbar-height) mx-auto flex min-h-svh bg-neutral-300 gap-8 2xl:gap-16 p-5 2xl:p-10">
          <aside className="w-75 shrink-0 sticky top-[calc(var(--topbar-height)+1.25rem)] 2xl:top-[calc(var(--topbar-height)+2.5rem)] h-fit max-h-[calc(100vh-12.5rem)]  left-0">
            <Sidebar />
          </aside>
          <main className="flex flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
