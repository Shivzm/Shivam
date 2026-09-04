import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// Modern sans-serif for general text
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

// Elegant serif for your massive headers
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Shivam",
  description: "Portfolio of Shivam, a full-stack engineer and AI/ML enthusiast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // scroll-smooth enables silky smooth anchoring when you click footer links
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#d9cffd] text-[#171026] selection:bg-[#7b46ea] selection:text-white`}>
        {children}
      </body>
    </html>
  );
}