import type { Metadata } from "next";
import { SpeaktypeHero } from "@/components/speaktype/speaktype-hero";

export const metadata: Metadata = {
  title: "SpeakType — Speak your mind. Watch it type.",
  description:
    "A privacy-first dictation tool that types your voice directly into any app, formatted for where you're typing, in under 700ms.",
};

export default function SpeaktypePage() {
  return (
    <main className="bg-void">
      <SpeaktypeHero />
      {/* Next sections (How it works / Architecture story / Try it) build
          on this same page — hero ships first per the brief. */}
    </main>
  );
}
