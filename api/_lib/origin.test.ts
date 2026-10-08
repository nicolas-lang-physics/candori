import { describe, expect, it } from "vitest";
import { rejectForeignOrigin } from "./origin";

const req = (headers: Record<string, string>) =>
  new Request("https://candori.app/api/story-word", { method: "POST", headers });

describe("rejectForeignOrigin", () => {
  it("allows the app's own origin", () => {
    expect(rejectForeignOrigin(req({ origin: "https://candori.app", host: "candori.app" }))).toBeNull();
  });
  it("uses x-forwarded-host behind a proxy", () => {
    expect(rejectForeignOrigin(req({ origin: "https://candori.app", "x-forwarded-host": "candori.app", host: "internal" }))).toBeNull();
  });
  it("rejects another site", () => {
    expect(rejectForeignOrigin(req({ origin: "https://evil.example", host: "candori.app" }))?.status).toBe(403);
  });
  it("rejects a missing or malformed origin", () => {
    expect(rejectForeignOrigin(req({ host: "candori.app" }))?.status).toBe(403);
    expect(rejectForeignOrigin(req({ origin: "null", host: "candori.app" }))?.status).toBe(403);
  });
  it("allows origins listed in CANDORI_ALLOWED_ORIGINS", () => {
    process.env.CANDORI_ALLOWED_ORIGINS = "https://preview.example, https://other.example";
    expect(rejectForeignOrigin(req({ origin: "https://preview.example", host: "candori.app" }))).toBeNull();
    delete process.env.CANDORI_ALLOWED_ORIGINS;
  });
});
