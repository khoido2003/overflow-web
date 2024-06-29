import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "../styles/prism.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { MobileSidebarProvider } from "@/context/mobile-sidebar-provider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: "CodeOverflow",
  description:
    "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.",
  icons: {
    icon: "/assets/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}

            {/* Use global state with zustand to handle open the sidebar menu in mobile */}
            <MobileSidebarProvider />
          </ThemeProvider>

          <Toaster position="top-center" />
        </SessionProvider>
      </body>
    </html>
  );
}
