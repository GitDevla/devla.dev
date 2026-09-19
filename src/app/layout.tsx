import type { Metadata } from "next";
import { JetBrains_Mono, Recursive, Space_Grotesk } from "next/font/google";
import "@/styles/globals.css";
import { DiscordContext } from "@/components/Context/DiscordContext";
import Footer from "@/components/Layout/Footer";
import GoToTop from "@/components/Layout/GoToTop";
import Header from "@/components/Layout/Header";
import ThemeProvider from "@/components/Providers/ThemeProvider";

const sans = Recursive({
  subsets: ["latin"],
  variable: "--font-recursive",
});

const display = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const mono = JetBrains_Mono({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: {
    template: "Devla | %s",
    default: "Devla | Home",
  },
  description: "Devla's personal website & portfolio.",
  keywords: [
    "devla",
    "david pataki",
    "david",
    "pataki",
    "davidpataki",
    "pataki david",
    "patakidavid",
    "software engineer",
    "developer",
    "web",
    "full-stack",
    "hungary",
    "open-source",
    "portfolio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={"en"}
      suppressHydrationWarning
      className={`scroll-smooth ${sans.variable} ${display.variable} ${mono.variable}`}
    >
      <body
        className={
          "mx-auto min-h-screen max-w-4xl animate-animateBackground bg-canvas px-4 bg-blend-difference transition-colors min-[912px]:px-0"
        }
        style={{ backgroundImage: "url('/bg.svg')" }}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Header />
          <DiscordContext>
            <main className={"transition-opacity duration-[75ms] ease-linear"}>
              {children}
            </main>
          </DiscordContext>
          <GoToTop />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
