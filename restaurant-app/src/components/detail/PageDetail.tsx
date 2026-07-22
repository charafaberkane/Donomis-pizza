"use client";

import { useState } from "react";
import Image from "next/image";
import { Pizza, Variante } from "../../types";
import { obtenirClasseBadge } from "../../utils";

interface PageDetailProps {
  pizza: Pizza;
  onRetourMenu: () => void;
  onAjouterAuPanier: (pizza: Pizza, variante: Variante) => void;
}

export default function PageDetail({
  pizza,
  onRetourMenu,
  onAjouterAuPanier,
}: PageDetailProps) {
  const [varianteSelectionnee, setVarianteSelectionnee] =
    useState<Variante | null>(null);

  // Image et prix dynamiques selon la variante sélectionnée
  const imageAffichee = varianteSelectionnee
    ? varianteSelectionnee.image
    : pizza.imageParDefaut;
  const prixAffiche = varianteSelectionnee
    ? varianteSelectionnee.prix
    : pizza.prixDeBase;

  const classeBadge = obtenirClasseBadge(pizza.typeBadge);

  const gererAjouterAuPanier = () => {
    if (!varianteSelectionnee) return;
    onAjouterAuPanier(pizza, varianteSelectionnee);
  };

  return (
    <main className="max-w-7xl mx-auto py-12 px-6 md:px-12">
      {/* Retour au menu */}
      <button
        onClick={onRetourMenu}
        className="inline-flex items-center gap-2 text-stone-500 hover:text-[#8C1D1D] font-bold text-xs mb-8 transition-colors cursor-pointer bg-transparent border-none"
      >
        ← RETOUR AU MENU
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Colonne Gauche - Image */}
        <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white border border-[#E9E4C9]/40 shadow-md">
          <Image
            src={imageAffichee}
            alt={pizza.nom}
            fill
            priority
            className={`object-cover transition-all duration-500 ${
              varianteSelectionnee?.taille === "Petite (25cm)"
                ? "scale-75"
                : varianteSelectionnee?.taille === "Grande (40cm)"
                ? "scale-100"
                : "scale-[0.85]"
            }`}
          />
        </div>

        {/* Colonne Droite - Détails et Variantes */}
        <div className="space-y-6">
          <div>
            <span
              className={`text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-md ${classeBadge}`}
            >
              {pizza.badge}
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-black text-stone-900 mt-4">
              {pizza.nom}
            </h1>
            <div className="flex items-center gap-1 mt-2 text-sm font-bold text-stone-700">
              <span className="text-amber-500">★</span>
              <span>{pizza.note.toFixed(1)}</span>
            </div>
          </div>

          <p className="text-stone-600 text-sm md:text-base leading-relaxed">
            {pizza.description}
          </p>

          {/* Gestion des Variantes */}
          <div className="space-y-3 pt-4 border-t border-[#E9E4C9]">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-stone-500">
              Sélectionnez la Taille{" "}
              <span className="text-[#8C1D1D]">*</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {pizza.variantes.map((v) => {
                const estActive = varianteSelectionnee?.taille === v.taille;
                return (
                  <button
                    key={v.taille}
                    onClick={() => setVarianteSelectionnee(v)}
                    className={`p-4 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                      estActive
                        ? "bg-[#8C1D1D] border-[#8C1D1D] text-white shadow-md"
                        : "bg-white border-[#E9E4C9] text-stone-800 hover:bg-stone-50"
                    }`}
                  >
                    <span className="block font-bold text-xs">{v.taille}</span>
                    <span
                      className={`block text-xs mt-1 ${
                        estActive ? "text-[#FAF7E3]" : "text-stone-500"
                      }`}
                    >
                      {v.prix.toFixed(2).replace(".", ",")} $
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prix et Bouton d'Ajout */}
          <div className="flex items-center justify-between pt-6 border-t border-[#E9E4C9]">
            <div>
              <span className="block text-xs font-semibold text-stone-400">
                Prix total
              </span>
              <span className="text-3xl font-extrabold text-[#8C1D1D]">
                {prixAffiche.toFixed(2).replace(".", ",")} $
              </span>
            </div>

            <button
              onClick={gererAjouterAuPanier}
              disabled={!varianteSelectionnee}
              className={`px-8 py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-md ${
                varianteSelectionnee
                  ? "bg-[#8C1D1D] hover:bg-[#701616] text-white cursor-pointer hover:-translate-y-0.5"
                  : "bg-stone-200 text-stone-400 cursor-not-allowed"
              }`}
            >
              {varianteSelectionnee
                ? "Ajouter au panier"
                : "Sélectionner une taille"}
            </button>
          </div>

          {!varianteSelectionnee && (
            <p className="text-[#C2410C] text-[11px] font-bold text-right">
              ⚠️ Veuillez choisir une taille avant d&apos;ajouter au panier.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
