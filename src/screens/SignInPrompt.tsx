import { useState } from "react";
import { TextInput } from "../components/TextInput";
import { sendMagicLink } from "../lib/supabase";

/**
 * Quiet, dismissible — never a wall. Shown on Home only after the user has
 * completed at least one session, per the "no forced signup" decision.
 */
export function SignInPrompt() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          font: "var(--type-meta)",
          color: "var(--link)",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        Keep your streak safe
      </button>
    );
  }

  if (status === "sent") {
    return (
      <div style={{ font: "var(--type-meta)", color: "var(--text-meta)" }}>
        Check your email for a link.
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <TextInput
        value={email}
        onChange={setEmail}
        placeholder="you@example.com"
        onSubmit={async (value) => {
          setStatus("sending");
          const { error } = await sendMagicLink(value);
          setStatus(error ? "error" : "sent");
        }}
      />
      {status === "error" && (
        <span style={{ font: "var(--type-meta)", color: "var(--glow-coral)" }}>
          Couldn’t send that — try again.
        </span>
      )}
    </div>
  );
}
