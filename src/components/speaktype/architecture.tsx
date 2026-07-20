"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, Zap, Shield, Sparkles } from "lucide-react";

export function Architecture() {
  const cards = [
    {
      title: "1. Audio Capture (Rust)",
      icon: Mic,
      description: "A lightweight Rust daemon binds to your OS globally. Holding ALT+SPACE captures your voice into a raw audio buffer with zero latency.",
      tags: ["Native API", "CoreAudio / PulseAudio"]
    },
    {
      title: "2. Local Transcription",
      icon: Shield,
      description: "Whisper.cpp processes the audio 100% locally on your machine. Your raw voice never touches the cloud, preserving absolute privacy.",
      tags: ["Whisper.cpp", "ggml-base.en"]
    },
    {
      title: "3. Contextual Formatting",
      icon: Sparkles,
      description: "A FastAPI backend takes the raw text, detects your active application, and routes it through a fast LLM (Groq or Gemini) to perfect the punctuation and tone.",
      tags: ["FastAPI", "Groq Llama 3", "Gemini Flash"]
    },
    {
      title: "4. Native Injection",
      icon: Zap,
      description: "The formatted text is instantly injected back into your active window, streaming keystrokes natively via OS APIs in under 700ms total latency.",
      tags: ["Rust enigo", "Simulated Keystrokes"]
    }
  ];

  return (
    <section className="bg-panel py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-ghost mb-6">
              How it works under the hood.
            </h2>
            <p className="font-mono text-static max-w-2xl mx-auto">
              A decoupled architecture prioritizing privacy and speed. Written in Rust for native OS interaction, C++ for local inference, and Python for AI routing.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="bg-void border-hairline h-full flex flex-col">
                <CardContent className="p-8 flex-1 flex flex-col">
                  <card.icon className="w-8 h-8 text-wave-cyan mb-6" />
                  <h3 className="text-xl font-medium text-ghost mb-3">{card.title}</h3>
                  <p className="text-static mb-8 flex-1">
                    {card.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {card.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-panel text-ghost hover:bg-hairline rounded font-mono text-xs font-normal border border-hairline/50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
