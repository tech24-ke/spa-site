// src/app/lib/whatsapp.ts

// Deterministic link builder — keep as-is
export function whatsappLink(number: string, text?: string) {
  const n = (number || "").replace(/\D/g, ""); // digits only
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${n}${q}`;
}

// Agent pool (order can be anything you like)
const waAgents = ["254748699460", "32465603546"] as const;

// Tiny, stable hash so we pick the same index on SSR & CSR
function stableIndex(key: string) {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
  return Math.abs(h) % waAgents.length;
}

/**
 * Deterministic “round-robin”: chooses an agent based on a stable key,
 * defaulting to the message text so existing calls keep working.
 * You can pass a custom `seed` to group a set of links onto one agent:
 *   whatsappRR("Hi!", "request-demo")
 */
export function whatsappRR(text?: string, seed?: string) {
  const key = seed ?? text ?? "default";
  const n = waAgents[stableIndex(key)];
  return whatsappLink(n, text);
}








