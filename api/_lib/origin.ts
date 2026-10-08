/**
 * Same-origin guard for the API endpoints. Browsers always send `Origin` on a
 * cross-site POST and on a same-origin fetch POST, and page scripts cannot
 * forge it, so this stops other websites from using our endpoints (and our
 * API budget) from their visitors' browsers.
 *
 * It does NOT stop a script that sets the header by hand (curl, etc.) —
 * that needs rate limiting / a spend cap, not an origin check.
 *
 * Extra allowed origins (e.g. a preview domain) can be listed, comma-separated,
 * in CANDORI_ALLOWED_ORIGINS.
 */
export function rejectForeignOrigin(request: Request): Response | null {
  const origin = request.headers.get("origin");
  if (origin && isAllowedOrigin(origin, request)) return null;
  return Response.json({ error: "forbidden" }, { status: 403 });
}

function isAllowedOrigin(origin: string, request: Request): boolean {
  let url: URL;
  try {
    url = new URL(origin);
  } catch {
    return false;
  }
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? new URL(request.url).host;
  if (url.host === host) return true;
  const extra = (process.env.CANDORI_ALLOWED_ORIGINS ?? "").split(",").map((s) => s.trim());
  return extra.includes(url.origin);
}
