import { useState } from "react";
import { Pizza } from "../../types";
import CartePizza from "./CartePizza";
import { PIZZAS } from "../../data/pizzas";

interface PageMenuProps {
  onSelectionnerPizza: (pizza: Pizza) => void;
}

export default function PageMenu({ onSelectionnerPizza }: PageMenuProps) {
  const [categorieActive, setCategorieActive] = useState<string>("Tout");
  const [recherche, setRecherche] = useState<string>("");

  // Filtrer les pizzas
  const pizzasFiltrees = PIZZAS.filter((pizza) => {
    const correspondCategorie =
      categorieActive === "Tout" ||
      (categorieActive === "Classiques" && pizza.typeBadge === "classique") ||
      (categorieActive === "Épicées" && pizza.typeBadge === "epicee") ||
      (categorieActive === "Végétariennes" &&
        pizza.typeBadge === "vegetarienne") ||
      (categorieActive === "Spéciales" && pizza.typeBadge === "speciale");

    const correspondRecherche =
      pizza.nom.toLowerCase().includes(recherche.toLowerCase()) ||
      pizza.description.toLowerCase().includes(recherche.toLowerCase());

    return correspondCategorie && correspondRecherche;
  });

  return (
    <>
      {/* Titre */}
      <section className="py-12 md:py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black text-[#8C1D1D] mb-6 leading-tight">
            Notre Carte Signature
          </h2>
          <p className="text-stone-600 text-sm md:text-base lg:text-lg leading-relaxed font-medium">
            Découvrez la rencontre de l&apos;héritage artisanal italien et de la
            gastronomie moderne. Sélectionnez une pizza pour personnaliser sa
            taille et son prix.
          </p>
        </div>
      </section>

      {/* Filtres et Recherche */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E9E4C9] pb-6">
          {/* Onglets de catégories */}
          <div className="flex flex-wrap gap-2.5">
            {["Tout", "Classiques", "Épicées", "Végétariennes", "Spéciales"].map(
              (cat) => {
                const estSelectionne = categorieActive === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setCategorieActive(cat)}
                    className={`px-5 py-2 text-xs md:text-sm font-semibold tracking-wide rounded-full transition-all duration-200 cursor-pointer ${
                      estSelectionne
                        ? "bg-[#8C1D1D] text-[#FAF7E3] shadow-md transform -translate-y-[1px]"
                        : "bg-[#FAF7E3] hover:bg-white text-stone-600 border border-[#E9E4C9]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              }
            )}
          </div>

          {/* Barre de Recherche */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Rechercher votre pizza..."
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              className="bg-[#FAF7E3] hover:bg-white focus:bg-white border border-[#E9E4C9] rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#8C1D1D] w-full pr-10 transition-colors text-stone-800"
            />
            <div className="absolute right-3.5 top-3 text-stone-400">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Grille de Pizzas */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-20">
        {pizzasFiltrees.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pizzasFiltrees.map((pizza) => (
              <CartePizza
                key={pizza.id}
                pizza={pizza}
                onSelectionner={onSelectionnerPizza}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/50 border border-[#E9E4C9] rounded-2xl p-8 max-w-md mx-auto">
            <span className="text-4xl">🍕</span>
            <h4 className="font-serif text-lg font-bold text-stone-800 mt-4 mb-2">
              Aucune pizza trouvée
            </h4>
            <p className="text-stone-500 text-xs">
              Nous n&apos;avons pas trouvé de pizza correspondant à votre
              recherche. Essayez avec d&apos;autres mots clés.
            </p>
            <button
              onClick={() => {
                setRecherche("");
                setCategorieActive("Tout");
              }}
              className="mt-5 bg-[#8C1D1D] text-[#FAF7E3] px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[#701616] transition-colors cursor-pointer"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </section>
    </>
  );
}
