/** Longest menu path that matches the current route. */
export function resolveActiveNavPath(
  activePath: string,
  itemPaths: readonly string[],
): string | null {
  if (!activePath) return null;

  let best: string | null = null;
  for (const itemPath of itemPaths) {
    if (!itemPath) continue;
    const matches =
      activePath === itemPath || activePath.startsWith(`${itemPath}/`);
    if (!matches) continue;
    if (best === null || itemPath.length > best.length) {
      best = itemPath;
    }
  }
  return best;
}
