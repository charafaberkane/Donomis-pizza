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
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity cursor-pointer"
        onClick={onFermer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7E3] border-l border-[#E9E4C9] flex flex-col h-full shadow-2xl">
          {/* En-tête du Panier */}
          <div className="px-6 py-5 border-b border-[#E9E4C9] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-[#8C1D1D]"
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
              <h3 className="font-serif text-lg font-black text-stone-900">
                Votre Panier ({nombreTotalArticles})
              </h3>
            </div>
            <button
              onClick={onFermer}
              className="text-stone-400 hover:text-[#8C1D1D] transition-colors p-1.5 focus:outline-none cursor-pointer"
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
                  className="bg-white rounded-xl p-4 border border-[#E9E4C9]/40 flex gap-4 items-center justify-between"
                >
                  <div className="relative h-16 w-16 rounded-lg overflow-hidden shrink-0 bg-stone-100">
                    <Image
                      src={article.image}
                      alt={`${article.nom} - ${article.taille}`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h4 className="font-serif text-sm font-bold text-stone-900 leading-tight">
                      {article.nom}
                    </h4>
                    <span className="text-[#8C1D1D] text-[11px] font-extrabold block mt-0.5">
                      {article.taille}
                    </span>
                    <span className="text-stone-500 text-xs font-semibold block mt-1">
                      {article.prix.toFixed(2).replace(".", ",")} $
                    </span>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          onModifierQuantite(article.pizzaId, article.taille, -1)
                        }
                        className="bg-stone-100 hover:bg-stone-200 text-stone-700 px-2 py-0.5 rounded text-xs font-black transition-colors cursor-pointer"
                      >
                        −
                      </button>
                      <span className="text-xs font-extrabold text-stone-700 w-4 text-center">
                        {article.quantite}
                      </span>
                      <button
                        onClick={() =>
                          onModifierQuantite(article.pizzaId, article.taille, 1)
                        }
                        className="bg-stone-100 hover:bg-stone-200 text-stone-700 px-2 py-0.5 rounded text-xs font-black transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => onRetirer(article.pizzaId, article.taille)}
                    className="text-stone-400 hover:text-[#8C1D1D] transition-colors p-1.5 cursor-pointer"
                    aria-label="Supprimer"
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
                <p className="text-stone-500 text-xs font-semibold">
                  Votre panier est vide.
                </p>
                <button
                  onClick={onFermer}
                  className="mt-6 bg-[#8C1D1D] text-[#FAF7E3] px-5 py-2.5 rounded-full text-xs font-bold hover:bg-[#701616] transition-colors cursor-pointer"
                >
                  Continuer mes achats
                </button>
              </div>
            )}
          </div>

          {/* Pied du Panier */}
          {panier.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E9E4C9] space-y-4">
              <div className="flex justify-between items-center text-stone-700 text-sm font-semibold">
                <span>Sous-total</span>
                <span>{totalPanier.toFixed(2).replace(".", ",")} $</span>
              </div>
              <div className="flex justify-between items-center text-stone-500 text-xs">
                <span>Frais de livraison</span>
                <span className="text-[#5F6935] font-bold">Gratuit</span>
              </div>
              <div className="flex justify-between items-center text-stone-900 font-extrabold text-base pt-2 border-t border-stone-100">
                <span>Total</span>
                <span className="text-[#8C1D1D] text-lg">
                  {totalPanier.toFixed(2).replace(".", ",")} $
                </span>
              </div>

              <button
                onClick={onValiderCommande}
                className="w-full bg-[#8C1D1D] hover:bg-[#701616] text-white py-3 rounded-xl font-bold text-sm transition-colors cursor-pointer shadow-md text-center mt-2"
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
