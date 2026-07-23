/**
 * Normalizes legacy state-agent identifiers for chart display.
 *
 * State-machine services report `seller_state` and `checkin_state`, but users
 * should see their product-facing agent names throughout dashboard charts.
 */
export const normalizeAgentDisplayName = (value: string): string =>
  value.replace(/\b(seller|checkin)_state\b/gi, "$1");
