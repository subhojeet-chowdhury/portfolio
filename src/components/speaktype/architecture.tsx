"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Zap, Shield, Wand2 } from "lucide-react";

export function Architecture() {
  const cards = [
    {
      title: "Any App, Anywhere.",
      icon: Globe,
      description: "No extensions to install. No API keys to paste into every app you use. A lightweight daemon binds to your OS natively. Just hold ALT+SPACE anywhere, and start speaking.",
      tags: ["Native OS API", "Rust Daemon"]
    },
    {
      title: "100% Private.",
      icon: Shield,
      description: "Your voice shouldn't be training someone else's model. We use an embedded inference engine to process your raw audio strictly on your local device.",
      tags: ["On-device", "Whisper.cpp"]
    },
    {
      title: "Context Chameleon.",
      icon: Wand2,
      description: "It doesn't just transcribe; it adapts. By detecting your active window, our backend routes your text to an LLM to perfectly match the tone—formal for Outlook, casual for Slack, syntactic for VS Code.",
      tags: ["Groq Llama 3", "Gemini Flash"]
    },
    {
      title: "Instantly There.",
      icon: Zap,
      description: "Once the context is refined, the text doesn't just copy to your clipboard. It natively injects and streams into your active text field in under 700ms total latency.",
      tags: ["<700ms", "Keystroke Injection"]
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
              Dictation that finally feels like magic.
            </h2>
            <p className="font-mono text-static max-w-2xl mx-auto">
              We engineered out the friction. A decoupled architecture prioritizing absolute privacy and impossible speed.
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
