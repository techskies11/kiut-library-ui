/**
 * Sufijo aleatorio para IDs de instancia (DOM / a11y).
 * Usa Web Crypto API (`crypto.getRandomValues`) para evitar alertas `js/insecure-randomness` (p. ej. CodeQL).
 */
export function randomInstanceSuffix(): string {
  const bytes = new Uint8Array(8);
  globalThis.crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}
