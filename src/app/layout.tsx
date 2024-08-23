import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import GoToTop from "@/components/Layout/GoToTop";
import ThemeProvider from "@/components/Providers/ThemeProvider";
import { DiscordContext } from "@/components/Context/DiscordContext";

const inter = Fira_Code({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "Devla | %s",
    default: "Devla | Home",
  },
  description: "Devla's personal website & portfolio.",
  keywords: [
    "Devla",
    "David Pataki",
    "Software Developer",
    "Personal Website",
    "Portfolio",
  ],
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
          " mx-auto min-h-screen max-w-4xl animate-animateBackground bg-background px-4 font-normal tracking-wide text-primaryText bg-blend-difference transition-colors min-[912px]:px-0"
        }
        style={{ backgroundImage: "url('/bg.svg')" }}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Header></Header>
          <DiscordContext>
            <main className="transition-opacity duration-[75ms] ease-linear">
              {children}
            </main>
          </DiscordContext>
          <GoToTop></GoToTop>
          <Footer></Footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
