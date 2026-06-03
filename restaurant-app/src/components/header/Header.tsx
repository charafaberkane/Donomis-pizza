import { NomPage, ArticlePanier } from "../../types";

interface HeaderProps {
  pageActive: NomPage;
  onChangerPage: (page: NomPage) => void;
  onOuvrirPanier: () => void;
  nombreArticles: number;
}

export default function Header({
  pageActive,
  onChangerPage,
  onOuvrirPanier,
  nombreArticles,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7E3]/95 backdrop-blur-md border-b border-[#E9E4C9] py-4 px-6 md:px-12 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChangerPage("accueil")}
          className="font-serif italic text-2xl md:text-3xl font-extrabold text-[#8C1D1D] tracking-tight cursor-pointer bg-transparent border-none"
        >
          Donomi Pizza
        </button>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        <button
          onClick={() => onChangerPage("accueil")}
          className={`bg-transparent border-none cursor-pointer text-sm font-semibold tracking-wide transition-colors ${
            pageActive === "accueil"
              ? "text-[#8C1D1D] relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-0.5 after:bg-[#8C1D1D]"
              : "text-stone-600 hover:text-[#8C1D1D]"
          }`}
        >
          Accueil
        </button>
        <button
          onClick={() => onChangerPage("menu")}
          className={`bg-transparent border-none cursor-pointer text-sm font-semibold tracking-wide transition-colors ${
            pageActive === "menu" || pageActive === "details"
              ? "text-[#8C1D1D] relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-0.5 after:bg-[#8C1D1D]"
              : "text-stone-600 hover:text-[#8C1D1D]"
          }`}
        >
          Menu
        </button>
        <span className="text-stone-600 hover:text-[#8C1D1D] transition-colors text-sm font-semibold tracking-wide cursor-pointer">
          À propos
        </span>
        <span className="text-stone-600 hover:text-[#8C1D1D] transition-colors text-sm font-semibold tracking-wide cursor-pointer">
          Contact
        </span>
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Bouton Panier */}
        <button
          onClick={onOuvrirPanier}
          className="relative p-2 text-stone-700 hover:text-[#8C1D1D] transition-colors focus:outline-none cursor-pointer"
          aria-label="Panier"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {nombreArticles > 0 && (
            <span className="absolute top-0.5 right-0.5 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-[#8C1D1D] rounded-full animate-pulse">
              {nombreArticles}
            </span>
          )}
        </button>

        {/* Bouton Profil */}
        <button className="p-1.5 rounded-full text-stone-700 hover:text-[#8C1D1D] transition-colors focus:outline-none">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
