import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const sans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Autonomous Image Hashtag Generator",
  description: "Automatically generate hashtags for objects in image",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sans.className}>
      <body className="flex flex-col w-full mx-auto">
        <Header />
        <main className="grow bg-white">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
