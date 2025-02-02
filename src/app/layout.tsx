import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ModeToggle as ThemeSwitcher } from "@/components/theme-mode-toggle";
import { UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recipe Ripper",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "relative flex flex-col min-h-svh bg-background",
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div data-wrapper="" className="border-grid flex flex-1 flex-col">
            <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="min-[1800px]:max-w-[1536px] min-[1800px]:border-x border-border/30 dark:border-border mx-auto w-full">
                <div className="px-4 xl:px-6 2xl:px-4 mx-auto max-w-[1536px] flex h-14 items-center">
                  <Link href="/" className="mr-4 flex items-center gap-2 ">
                    <UtensilsCrossed />{" "}
                    <span className="font-bold inline-block">
                      Recipe Ripper
                    </span>
                  </Link>
                  <div className="flex flex-1 items-center gap-2 justify-end">
                    <nav className="flex items-center gap-0.5">
                      <ThemeSwitcher />
                    </nav>
                  </div>
                </div>
              </div>
            </header>
            <main className="flex flex-1 flex-col container">{children}</main>
            <footer></footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
