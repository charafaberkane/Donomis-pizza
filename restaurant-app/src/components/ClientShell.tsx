"use client";

import React from "react";
import { CartProvider, useCart } from "../context/CartContext";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import TiroirPanier from "./menu/TiroirPanier";
import { usePathname } from "next/navigation";

function ClientShellInner({ children }: { children: React.ReactNode }) {
  const {
    panier,
    estPanierOuvert,
    messageAlerte,
    ouvrirPanier,
    fermerPanier,
    modifierQuantite,
    retirerDuPanier,
    validerCommande,
    setMessageAlerte,
  } = useCart();

  const pathname = usePathname();

  // Map route path to pageActive name
  let pageActive: "accueil" | "menu" | "details" | "apropos" | "contact" = "accueil";
  if (pathname === "/menu") pageActive = "menu";
  else if (pathname === "/a-propos") pageActive = "apropos";
  else if (pathname === "/contact") pageActive = "contact";

  const nombreTotalArticles = panier.reduce(
    (somme, item) => somme + item.quantite,
    0
  );

  return (
    <div
      className="min-h-screen font-sans flex flex-col justify-between"
      style={{
        backgroundColor: "var(--arriere-plan)",
        color: "var(--premier-plan)",
      }}
    >
      {/* Alerte Toast */}
      {messageAlerte && (
        <div
          className="fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border animate-bounce duration-300"
          style={{
            backgroundColor: "var(--color-bordeaux)",
            color: "var(--color-creme-fond)",
            borderColor: "rgba(255,255,255,0.08)",
          }}
        >
          <span className="font-semibold text-sm">{messageAlerte}</span>
          <button
            onClick={() => setMessageAlerte(null)}
            className="text-white/60 hover:text-white transition-colors cursor-pointer"
            aria-label="Fermer l'alerte"
          >
            ✕
          </button>
        </div>
      )}

      {/* En-tête */}
      <Header
        pageActive={pageActive}
        onOuvrirPanier={ouvrirPanier}
        nombreArticles={nombreTotalArticles}
      />

      {/* Contenu de la page active */}
      <div className="w-full flex-1">{children}</div>

      {/* Pied de Page */}
      <Footer />

      {/* Tiroir du Panier */}
      <TiroirPanier
        estOuvert={estPanierOuvert}
        onFermer={fermerPanier}
        panier={panier}
        onModifierQuantite={modifierQuantite}
        onRetirer={retirerDuPanier}
        onValiderCommande={validerCommande}
      />
    </div>
  );
}

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <ClientShellInner>{children}</ClientShellInner>
    </CartProvider>
  );
}
