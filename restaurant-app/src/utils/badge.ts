import type { Pizza } from "../types";

/**
 * Maps a pizza badge type to its corresponding Tailwind CSS classes.
 * Centralises the badge styling that was previously duplicated
 * in CartePizza and PageDetail.
 */
export function obtenirClasseBadge(typeBadge: Pizza["typeBadge"]): string {
  switch (typeBadge) {
    case "epicee":
      return "bg-[#8C1D1D] text-white";
    case "classique":
      return "bg-[#5F6935] text-white";
    case "vegetarienne":
      return "bg-[#C2410C] text-white";
    case "speciale":
    default:
      return "bg-stone-800 text-white";
  }
}
