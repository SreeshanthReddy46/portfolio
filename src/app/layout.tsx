import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import CustomCursor from "@/components/CustomCursor";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import GlobalCanvas from "@/components/GlobalCanvas";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sreeshanth Portfolio",
  description: "Next-generation futuristic developer portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-700 ease-in-out">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Providers>
            <Preloader />
            <CustomCursor />
            <Navbar />
            
            {/* Global Film Grain Noise Overlay */}
            <div className="fixed inset-0 z-[90] pointer-events-none opacity-[0.03] mix-blend-difference">
              <svg className="w-full h-full">
                <filter id="noise">
                  <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noise)" />
              </svg>
            </div>

            <GlobalCanvas />

            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
