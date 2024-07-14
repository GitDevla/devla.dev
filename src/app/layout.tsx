import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Providers from "./providers";

const inter = Fira_Code({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "Devla | %s",
    default: "Devla | Home",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={
          inter.className +
          " min-h-screen tracking-wide bg-background text-primaryText transition-colors mx-auto px-4"
        }
      >
        <Providers>
          <main className="lg:max-w-4xl mx-auto min-h-screen">
            <Header></Header>
            {children}
            <Footer></Footer>
          </main>
        </Providers>
      </body>
    </html>
  );
}
