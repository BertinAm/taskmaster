import type { Metadata, Viewport } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

// Define Work Sans font
const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#363949" },
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "TaskMaster - Manage Your Tasks Efficiently",
  description: "TaskMaster is a powerful task management application that helps you organize your work and boost productivity.",
  keywords: ["task management", "productivity", "organization", "project management"],
  authors: [{ name: "TaskMaster Team" }],
  metadataBase: new URL("https://taskmaster.app"),
  icons: {
    icon: "/images/favicon.svg",
    apple: "/images/logo_white.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://taskmaster.app",
    title: "TaskMaster - Manage Your Tasks Efficiently",
    description: "TaskMaster is a powerful task management application that helps you organize your work and boost productivity.",
    siteName: "TaskMaster",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskMaster - Manage Your Tasks Efficiently",
    description: "TaskMaster is a powerful task management application that helps you organize your work and boost productivity.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/favicon.svg" />
      </head>
      <body className={`${workSans.variable} font-work-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
