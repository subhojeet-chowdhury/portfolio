import type { Metadata } from "next";
import { SpeaktypeHero } from "@/components/speaktype/speaktype-hero";
import { GhostShowcase } from "@/components/speaktype/ghost-showcase";
import { Architecture } from "@/components/speaktype/architecture";

export const metadata: Metadata = {
  title: "SpeakType — Speak your mind. Watch it type.",
  description:
    "A privacy-first dictation tool that types your voice directly into any app, formatted for where you're typing, in under 700ms.",
};

export default function SpeaktypePage() {
  return (
    <main className="bg-void">
      <SpeaktypeHero />
      <GhostShowcase />
      <Architecture />
    </main>
  );
}
