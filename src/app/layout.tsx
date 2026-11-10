import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jack Ning | Portfolio",
  description:
    "Personal portfolio of Jack (Kunjun) Ning — STEM MBA candidate in Silicon Valley with 7 years of experience in crypto investment and business development.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex flex-1 flex-col">{children}</main>
        <footer className="border-t border-zinc-200 py-6 dark:border-zinc-800">
          <p className="mx-auto w-full max-w-5xl px-6 text-sm text-zinc-500 dark:text-zinc-400">
            © 2026 Jack (Kunjun) Ning
          </p>
        </footer>
      </body>
    </html>
  );
}
