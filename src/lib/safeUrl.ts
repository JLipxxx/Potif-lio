/**
 * Restrict URLs from third-party API data before navigation (tabnabbing / javascript: URLs).
 */
export function isSafeGitHubHttpsUrl(url: string): boolean {
  try {
    const u = new URL(url);
    if (u.protocol !== "https:") return false;
    const host = u.hostname.toLowerCase();
    return host === "github.com" || host.endsWith(".github.com");
  } catch {
    return false;
  }
}
