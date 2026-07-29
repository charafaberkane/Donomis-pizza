import Image from "next/image";
import { ArticlePanier } from "../../types";

interface TiroirPanierProps {
  estOuvert: boolean;
  onFermer: () => void;
  panier: ArticlePanier[];
  onModifierQuantite: (pizzaId: string, taille: string, delta: number) => void;
  onRetirer: (pizzaId: string, taille: string) => void;
  onValiderCommande: () => void;
}

export default function TiroirPanier({
  estOuvert,
  onFermer,
  panier,
  onModifierQuantite,
  onRetirer,
  onValiderCommande,
}: TiroirPanierProps) {
  if (!estOuvert) return null;

  const nombreTotalArticles = panier.reduce(
    (acc, item) => acc + item.quantite,
    0
  );
  const totalPanier = panier.reduce(
    (acc, item) => acc + item.prix * item.quantite,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Fond assombri */}
      <div
        className="absolute inset-0 backdrop-blur-sm transition-opacity cursor-pointer"
        onClick={onFermer}
        style={{ backgroundColor: "rgba(11,18,32,0.6)" }}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md flex flex-col h-full shadow-2xl" style={{ backgroundColor: "var(--arriere-plan)", borderLeft: "1px solid rgba(0,0,0,0.04)" }}>
          {/* En-tête du Panier */}
          <div className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)", backgroundColor: "var(--color-creme-clair)" }}>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h3 className="font-serif text-lg font-black" style={{ color: "var(--premier-plan)" }}>
                Votre Panier ({nombreTotalArticles})
              </h3>
            </div>
            <button
              onClick={onFermer}
              className="p-1.5 focus:outline-none cursor-pointer"
              style={{ color: "var(--muted)" }}
            >
              <span className="text-xl">✕</span>
            </button>
          </div>

          {/* Liste des Articles du Panier */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {panier.length > 0 ? (
              panier.map((article) => (
                <div
                  key={`${article.pizzaId}-${article.taille}`}
                  className="rounded-xl p-4 flex gap-4 items-center justify-between"
                  style={{ backgroundColor: "var(--color-creme-clair)", border: "1px solid rgba(0,0,0,0.04)" }}
                >
                  <div className="relative h-16 w-16 rounded-lg overflow-hidden shrink-0" style={{ backgroundColor: "var(--color-creme-clair)" }}>
                    <Image
                      src={article.image}
                      alt={`${article.nom} - ${article.taille}`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h4 className="font-serif text-sm font-bold leading-tight" style={{ color: "var(--premier-plan)" }}>
                      {article.nom}
                    </h4>
                    <span className="text-[11px] font-extrabold block mt-0.5" style={{ color: "var(--color-bordeaux)" }}>
                      {article.taille}
                    </span>
                    <span className="text-xs font-semibold block mt-1" style={{ color: "var(--muted)" }}>
                      {article.prix.toFixed(2).replace(".", ",")} $
                    </span>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          onModifierQuantite(article.pizzaId, article.taille, -1)
                        }
                        className="px-2 py-0.5 rounded text-xs font-black transition-colors cursor-pointer"
                        style={{ backgroundColor: "var(--color-creme-clair)", color: "var(--premier-plan)", border: "1px solid rgba(0,0,0,0.04)" }}
                      >
                        −
                      </button>
                      <span className="text-xs font-extrabold w-4 text-center" style={{ color: "var(--premier-plan)" }}>
                        {article.quantite}
                      </span>
                      <button
                        onClick={() =>
                          onModifierQuantite(article.pizzaId, article.taille, 1)
                        }
                        className="px-2 py-0.5 rounded text-xs font-black transition-colors cursor-pointer"
                        style={{ backgroundColor: "var(--color-creme-clair)", color: "var(--premier-plan)", border: "1px solid rgba(0,0,0,0.04)" }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => onRetirer(article.pizzaId, article.taille)}
                    className="p-1.5 cursor-pointer"
                    aria-label="Supprimer"
                    style={{ color: "var(--muted)" }}
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-20">
                <span className="text-4xl block mb-4">🛒</span>
                <p className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
                  Votre panier est vide.
                </p>
                <button
                  onClick={onFermer}
                  className="mt-6 px-5 py-2.5 rounded-full text-xs font-bold transition-colors cursor-pointer"
                  style={{ backgroundColor: "var(--color-bordeaux)", color: "var(--color-creme-fond)" }}
                >
                  Continuer mes achats
                </button>
              </div>
            )}
          </div>

          {/* Pied du Panier */}
          {panier.length > 0 && (
            <div className="p-6 space-y-4" style={{ backgroundColor: "var(--color-creme-clair)", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              <div className="flex justify-between items-center text-sm font-semibold" style={{ color: "var(--muted)" }}>
                <span>Sous-total</span>
                <span>{totalPanier.toFixed(2).replace(".", ",")} $</span>
              </div>
              <div className="flex justify-between items-center text-xs" style={{ color: "var(--muted)" }}>
                <span>Frais de livraison</span>
                <span className="font-bold" style={{ color: "#5F6935" }}>Gratuit</span>
              </div>
              <div className="flex justify-between items-center font-extrabold text-base pt-2" style={{ color: "var(--premier-plan)", borderTop: "1px solid rgba(0,0,0,0.04)" }}>
                <span>Total</span>
                <span className="text-lg" style={{ color: "var(--color-bordeaux)" }}>
                  {totalPanier.toFixed(2).replace(".", ",")} $
                </span>
              </div>

              <button
                onClick={onValiderCommande}
                className="w-full py-3 rounded-xl font-bold text-sm transition-colors cursor-pointer shadow-md text-center mt-2"
                style={{ backgroundColor: "var(--color-bordeaux)", color: "var(--color-creme-fond)" }}
              >
                Passer la commande
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
