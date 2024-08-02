import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Providers from "./providers";
import GlobalSearchServer from "@/components/GlobalSearchServer";

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
          " mx-auto min-h-screen scroll-smooth bg-background px-4 tracking-wide text-primaryText transition-colors"
        }
        suppressHydrationWarning
      >
        <Providers>
          <main className="mx-auto min-h-screen max-w-4xl">
            <Header></Header>
            <GlobalSearchServer></GlobalSearchServer>
            {children}
            <Footer></Footer>
          </main>
        </Providers>
      </body>
    </html>
  );
}
