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
        className="inline-flex items-center gap-2 font-bold text-xs mb-8 transition-colors cursor-pointer bg-transparent border-none"
        style={{ color: "var(--muted)" }}
      >
        ← RETOUR AU MENU
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Colonne Gauche - Image */}
        <div className="relative aspect-square w-full rounded-3xl overflow-hidden shadow-md" style={{ backgroundColor: "var(--color-creme-clair)", border: "1px solid rgba(0,0,0,0.04)" }}>
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
            <h1 className="font-serif text-3xl md:text-5xl font-black mt-4" style={{ color: "var(--premier-plan)" }}>
              {pizza.nom}
            </h1>
            <div className="flex items-center gap-1 mt-2 text-sm font-bold" style={{ color: "var(--muted)" }}>
              <span className="text-amber-500">★</span>
              <span>{pizza.note.toFixed(1)}</span>
            </div>
          </div>

          <p className="text-sm md:text-base leading-relaxed" style={{ color: "var(--muted)" }}>
            {pizza.description}
          </p>

          {/* Gestion des Variantes */}
          <div className="space-y-3 pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
            <h3 className="text-xs font-extrabold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
              Sélectionnez la Taille <span style={{ color: "var(--color-bordeaux)" }}>*</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {pizza.variantes.map((v) => {
                const estActive = varianteSelectionnee?.taille === v.taille;
                return (
                  <button
                    key={v.taille}
                    onClick={() => setVarianteSelectionnee(v)}
                        className={`p-4 rounded-xl border text-center transition-all duration-200 cursor-pointer`}
                        style={
                          estActive
                            ? { backgroundColor: "var(--color-bordeaux)", borderColor: "var(--color-bordeaux)", color: "var(--color-creme-fond)", boxShadow: "var(--tw-shadow)" }
                            : { backgroundColor: "var(--color-creme-clair)", border: "1px solid rgba(0,0,0,0.04)", color: "var(--premier-plan)" }
                        }
                  >
                    <span className="block font-bold text-xs">{v.taille}</span>
                    <span
                          className={`block text-xs mt-1`}
                          style={{ color: estActive ? "var(--color-creme-fond)" : "var(--muted)" }}
                    >
                      {v.prix.toFixed(2).replace(".", ",")} $
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prix et Bouton d'Ajout */}
              <div className="flex items-center justify-between pt-6" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
            <div>
              <span className="block text-xs font-semibold text-stone-400">
                Prix total
              </span>
                  <span className="text-3xl font-extrabold" style={{ color: "var(--color-bordeaux)" }}>
                {prixAffiche.toFixed(2).replace(".", ",")} $
              </span>
            </div>

            <button
              onClick={gererAjouterAuPanier}
              disabled={!varianteSelectionnee}
                  className={`px-8 py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-md`}
                  style={
                    varianteSelectionnee
                      ? { backgroundColor: "var(--color-bordeaux)", color: "var(--color-creme-fond)", cursor: "pointer" }
                      : { backgroundColor: "#e6e6e6", color: "#9a9a9a", cursor: "not-allowed" }
                  }
            >
              {varianteSelectionnee
                ? "Ajouter au panier"
                : "Sélectionner une taille"}
            </button>
          </div>

              {!varianteSelectionnee && (
                <p style={{ color: "var(--color-accent-or)", fontWeight: 700, fontSize: "11px", textAlign: "right" }}>
                  ⚠️ Veuillez choisir une taille avant d&apos;ajouter au panier.
                </p>
              )}
        </div>
      </div>
    </main>
  );
}
