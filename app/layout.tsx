import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/layout/topbar/Topbar";

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
        <div className="max-w-360 mx-auto flex min-h-screen flex-col">
          <header className="h-(--topbar-height) fixed bg-white top-0 z-10 inset-x-0">
            <Topbar />
          </header>
          <main className="flex flex-1 pb-5 xl:pb-10 mt-(--topbar-height)">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
