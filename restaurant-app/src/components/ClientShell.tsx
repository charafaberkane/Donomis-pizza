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
    <div className="min-h-screen bg-[#FAF7E3] text-[#1C1917] font-sans selection:bg-[#8C1D1D] selection:text-white flex flex-col justify-between">
      {/* Alerte Toast */}
      {messageAlerte && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#8C1D1D] text-[#FAF7E3] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-[#FAF7E3]/20 animate-bounce duration-300">
          <span className="font-semibold text-sm">{messageAlerte}</span>
          <button
            onClick={() => setMessageAlerte(null)}
            className="text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* En-tête */}
      <Header
        pageActive={pageActive}
        onChangerPage={() => {}} // Legacy prop (Header will use standard Links)
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
