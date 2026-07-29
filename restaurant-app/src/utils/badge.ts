import type { Pizza } from "../types";

/**
 * Maps a pizza badge type to its corresponding Tailwind CSS classes.
 * Centralises the badge styling that was previously duplicated
 * in CartePizza and PageDetail.
 */
export function obtenirClasseBadge(typeBadge: Pizza["typeBadge"]): string {
  switch (typeBadge) {
    case "epicee":
      return "badge-epicee text-white";
    case "classique":
      return "badge-classique text-white";
    case "vegetarienne":
      return "badge-vegetarienne text-white";
    case "speciale":
    default:
      return "badge-speciale text-white";
  }
}
