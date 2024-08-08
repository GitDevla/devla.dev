import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Providers from "./providers";
import GlobalSearchServer from "@/components/GlobalSearchServer";
import GoToTop from "@/components/GoToTop";

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
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={
          inter.className +
          " mx-auto min-h-screen max-w-4xl bg-background px-4 tracking-wide text-primaryText transition-colors min-[912px]:px-0"
        }
        suppressHydrationWarning
      >
        <Providers>
          <Header></Header>
          <GlobalSearchServer></GlobalSearchServer>
          <main className="transition-opacity duration-100 ease-in-out">
            {children}
          </main>
          <GoToTop></GoToTop>
          <Footer></Footer>
        </Providers>
      </body>
    </html>
  );
}
