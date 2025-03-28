import { ThemeProvider as NextTheme } from "next-themes";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextTheme attribute={"class"} defaultTheme={"dark"}>
      {children}
    </NextTheme>
  );
}
