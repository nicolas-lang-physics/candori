import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import { SoftTimer } from "../components/SoftTimer";
import { TextInput } from "../components/TextInput";
import { ai } from "../lib/ai";
import { aiReplyDelayMs, withMinDelay } from "../lib/timing";
import { Blob, glowKeyframes, usePrefersReducedMotion, warmColor } from "./glow/Blobs";

const STARTERS = ["river", "clock", "salt", "window", "thread", "ember", "map", "hollow"];

interface CurrentWord {
  text: string;
  by: "user" | "ai";
  key: number;
}

export function WordAssociation({ onContinue }: { onContinue: () => void }) {
  const [current, setCurrent] = useState<CurrentWord>(() => ({
    text: STARTERS[Math.floor(Math.random() * STARTERS.length)],
    by: "ai",
    key: 0,
  }));
  const [waiting, setWaiting] = useState(false);
  const [faded, setFaded] = useState(false);
  const [input, setInput] = useState("");
  const [heat, setHeat] = useState(0); // smoothed 0..1, eases toward target
  const [bloom, setBloom] = useState(0); // slow accumulator — sustained fast typing
  const [progress, setProgress] = useState(0);
  const target = useRef(0);
  const fadeTimer = useRef<ReturnType<typeof setTimeout>>();
  const reducedMotion = usePrefersReducedMotion();

  const armFade = () => {
    clearTimeout(fadeTimer.current);
    setFaded(false);
    fadeTimer.current = setTimeout(() => setFaded(true), 600);
  };

  useEffect(() => {
    armFade();
    return () => clearTimeout(fadeTimer.current);
  }, []);

  useEffect(() => {
    // 120ms tick: heat eases toward target (fluid in time); target decays; bloom creeps
    const t = setInterval(() => {
      target.current = Math.max(0, target.current - 0.006);
      setHeat((h) => h + (target.current - h) * 0.06);
      setBloom((b) => (target.current > 0.55 ? Math.min(1, b + 0.004) : Math.max(0, b - 0.0015)));
    }, 120);
    const p = setInterval(() => setProgress((v) => Math.min(1, v + 1 / 90)), 1000);
    return () => {
      clearInterval(t);
      clearInterval(p);
    };
  }, []);

  const type = (v: string) => {
    setInput(v);
    target.current = Math.min(1, target.current + 0.055);
  };

  const submit = () => {
    const w = input.trim();
    if (!w || waiting) return;
    // Captured now, before it keeps decaying while we wait for the reply —
    // the delay reflects how fast the player was typing at this moment.
    const delay = aiReplyDelayMs(heat);
    setCurrent((c) => ({ text: w, by: "user", key: c.key + 1 }));
    armFade();
    setInput("");
    setWaiting(true);
    void withMinDelay(ai.nextAssociation(w), delay).then((word) => {
      setCurrent((c) => ({ text: word, by: "ai", key: c.key + 1 }));
      armFade();
      setWaiting(false);
    });
  };

  // One shared warmth: every blob derives its color from the same continuous heat ramp,
  // regardless of who spoke. Bloom lets sustained fast typing slowly swell the fields.
  const warm = (a: number) => warmColor(heat, a);
  const wordGlowOpacity = faded ? 0.15 : 1;
  const wordSize = 200 + heat * 180 + bloom * 420;
  const inputSize = 160 + heat * 260 + bloom * 480;
  const bridge = Math.max(0, (heat - 0.45) / 0.55, bloom);
  const animate = !reducedMotion;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100%", padding: "0 24px", position: "relative" }}>
      <style>{glowKeyframes}</style>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", filter: "blur(18px)" }}>
        <Blob x="50%" y="44%" size={wordSize} color={warm(0.3 + 0.1 * heat)} opacity={wordGlowOpacity} drift="blobDriftA" dur="7s" animate={animate} />
        <Blob x="46%" y="47%" size={wordSize * 0.7} color={warm(0.26)} opacity={wordGlowOpacity * 0.7} drift="blobDriftC" dur="9s" animate={animate} />
        <Blob x="50%" y="82%" size={inputSize} color={warm(0.28 + 0.1 * heat)} opacity={0.35 + heat * 0.65} drift="blobDriftB" dur="8s" animate={animate} />
        <Blob x="56%" y="79%" size={inputSize * 0.65} color={warm(0.24)} opacity={(0.35 + heat * 0.65) * 0.7} drift="blobDriftA" dur="11s" animate={animate} />
        <Blob x="50%" y="63%" size={120 + bridge * 560} color={warm(0.26)} opacity={Math.min(1, bridge * 1.4)} drift="blobDriftC" dur="6s" animate={animate} />
      </div>
      <div style={{ padding: "28px 0 0", display: "flex", justifyContent: "space-between", alignItems: "baseline", position: "relative" }}>
        <span style={{ font: "var(--type-meta)", letterSpacing: "var(--tracking-meta)", textTransform: "uppercase", color: "var(--text-meta)" }}>
          Word association · 2 of 3
        </span>
      </div>
      <SoftTimer progress={progress} style={{ marginTop: 20, position: "relative" }} />
      <div style={{ flex: 1, display: "grid", placeItems: "center", padding: "28px 0", position: "relative" }}>
        <span
          key={current.key}
          style={{
            display: "inline-block",
            font: "400 2.25rem/1.3 var(--font-sans)",
            color: current.by === "ai" ? "var(--word-ai)" : "var(--sage-deep)",
            opacity: faded ? 0.18 : 1,
            transform: faded ? "scale(0.8)" : "scale(1)",
            transition: "opacity 6s var(--ease-calm), transform 6s var(--ease-calm)",
          }}
        >
          {current.text}
        </span>
      </div>
      <div
        style={{
          position: "relative",
          padding: "18px 20px",
          marginBottom: 16,
          borderRadius: "var(--radius-l)",
          border: "1px solid rgba(88,72,50,0.10)",
          background: "rgba(252,249,242,0.45)",
        }}
      >
        <TextInput placeholder="whatever comes" value={input} onChange={type} onSubmit={submit} autoFocus />
      </div>
      <div style={{ padding: "0 0 40px", display: "flex", justifyContent: "flex-end", position: "relative" }}>
        <Button variant="quiet" onClick={onContinue}>
          Done here
        </Button>
      </div>
    </div>
  );
}
