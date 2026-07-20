import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import "./globals.css";

// Display face: tight, technical grotesque — carries the "engineered, not
// decorative" personality at massive headline sizes.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700"],
});

// Body face: humanist sans for readability against the void-black background.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

// Utility/mono face: reserved for anything that shows mechanism — the
// hotkey itself, latency numbers, app-detection labels. Ties to the
// Rust/terminal reality under the hood without leaning on a "hacker" theme.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "SpeakType — Speak your mind. Watch it type.",
  description:
    "A privacy-first dictation tool that types your voice directly into any app, formatted for where you're typing, in under 700ms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
