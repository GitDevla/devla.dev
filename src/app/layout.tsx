import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import ThemeProvider from "../components/Providers/ThemeProvider";
import GoToTop from "@/components/Layout/GoToTop";

const inter = Fira_Code({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "Devla | %s",
    default: "Devla | Home",
  },
  description: "Devla's personal website & portfolio.",
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
        <ThemeProvider>
          <Header></Header>
          <main className="transition-opacity duration-[75ms] ease-linear">
            {children}
          </main>
          <GoToTop></GoToTop>
          <Footer></Footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
