import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-void px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-static">
        Portfolio — homepage under construction
      </p>
      <h1 className="mt-4 font-display text-4xl text-ghost">
        Start here:{" "}
        <Link href="/projects/speaktype" className="wave-gradient-text underline underline-offset-4">
          /projects/speaktype
        </Link>
      </h1>
    </main>
  );
}
