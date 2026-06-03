"use client";

import { useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import PageAccueil from "../components/accueil/PageAccueil";
import PageMenu from "../components/menu/PageMenu";
import PageDetail from "../components/detail/PageDetail";
import TiroirPanier from "../components/menu/TiroirPanier";
import { NomPage, Pizza, Variante, ArticlePanier } from "../types";

export default function Accueil() {
  // Navigation SPA
  const [pageActive, setPageActive] = useState<NomPage>("accueil");
  const [pizzaSelectionnee, setPizzaSelectionnee] = useState<Pizza | null>(null);

  // Panier (state global partagé)
  const [panier, setPanier] = useState<ArticlePanier[]>([]);
  const [estPanierOuvert, setEstPanierOuvert] = useState<boolean>(false);

  // Alerte toast
  const [messageAlerte, setMessageAlerte] = useState<string | null>(null);

  // --- Fonctions de navigation ---
  function changerPage(page: NomPage) {
    setPageActive(page);
    if (page !== "details") {
      setPizzaSelectionnee(null);
    }
  }

  function selectionnerPizza(pizza: Pizza) {
    setPizzaSelectionnee(pizza);
    setPageActive("details");
  }

  // --- Fonctions du panier ---
  function ajouterAuPanier(pizza: Pizza, variante: Variante) {
    setPanier((panierPrecedent) => {
      const indexExistant = panierPrecedent.findIndex(
        (item) =>
          item.pizzaId === pizza.id && item.taille === variante.taille
      );

      if (indexExistant !== -1) {
        // Augmenter la quantité
        return panierPrecedent.map((item, index) =>
          index === indexExistant
            ? { ...item, quantite: item.quantite + 1 }
            : item
        );
      }

      // Ajouter un nouvel article
      return [
        ...panierPrecedent,
        {
          pizzaId: pizza.id,
          nom: pizza.nom,
          taille: variante.taille,
          prix: variante.prix,
          image: variante.image,
          quantite: 1,
        },
      ];
    });

    // Déclencher l'alerte
    setMessageAlerte(`🍕 ${pizza.nom} (${variante.taille}) ajoutée au panier !`);
    setTimeout(() => setMessageAlerte(null), 3000);
  }

  function modifierQuantite(pizzaId: string, taille: string, delta: number) {
    setPanier((panierPrecedent) => {
      return panierPrecedent
        .map((item) => {
          if (item.pizzaId === pizzaId && item.taille === taille) {
            const nouvelleQte = item.quantite + delta;
            return nouvelleQte > 0
              ? { ...item, quantite: nouvelleQte }
              : null;
          }
          return item;
        })
        .filter((item): item is ArticlePanier => item !== null);
    });
  }

  function retirerDuPanier(pizzaId: string, taille: string) {
    setPanier((panierPrecedent) =>
      panierPrecedent.filter(
        (item) => !(item.pizzaId === pizzaId && item.taille === taille)
      )
    );
  }

  function validerCommande() {
    setPanier([]);
    setEstPanierOuvert(false);
    setMessageAlerte(
      "🎉 Commande passée avec succès ! Merci de votre confiance."
    );
    setTimeout(() => setMessageAlerte(null), 4000);
  }

  const nombreTotalArticles = panier.reduce(
    (somme, item) => somme + item.quantite,
    0
  );

  // --- Rendu conditionnel des pages ---
  function renderPage() {
    if (pageActive === "accueil") {
      return (
        <PageAccueil
          onChangerPage={changerPage}
          onSelectionnerPizza={selectionnerPizza}
        />
      );
    }

    if (pageActive === "menu") {
      return <PageMenu onSelectionnerPizza={selectionnerPizza} />;
    }

    if (pageActive === "details" && pizzaSelectionnee) {
      return (
        <PageDetail
          pizza={pizzaSelectionnee}
          onRetourMenu={() => changerPage("menu")}
          onAjouterAuPanier={ajouterAuPanier}
        />
      );
    }

    // Fallback
    return (
      <PageAccueil
        onChangerPage={changerPage}
        onSelectionnerPizza={selectionnerPizza}
      />
    );
  }

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
        onChangerPage={changerPage}
        onOuvrirPanier={() => setEstPanierOuvert(true)}
        nombreArticles={nombreTotalArticles}
      />

      {/* Contenu de la page active */}
      <div className="w-full flex-1">{renderPage()}</div>

      {/* Pied de Page */}
      <Footer />

      {/* Tiroir du Panier */}
      <TiroirPanier
        estOuvert={estPanierOuvert}
        onFermer={() => setEstPanierOuvert(false)}
        panier={panier}
        onModifierQuantite={modifierQuantite}
        onRetirer={retirerDuPanier}
        onValiderCommande={validerCommande}
      />
    </div>
  );
}
