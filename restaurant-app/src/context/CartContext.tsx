"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Pizza, Variante, ArticlePanier } from "../types";

interface CartContextType {
  panier: ArticlePanier[];
  estPanierOuvert: boolean;
  messageAlerte: string | null;
  ouvrirPanier: () => void;
  fermerPanier: () => void;
  ajouterAuPanier: (pizza: Pizza, variante: Variante) => void;
  modifierQuantite: (pizzaId: string, taille: string, delta: number) => void;
  retirerDuPanier: (pizzaId: string, taille: string) => void;
  validerCommande: () => void;
  setMessageAlerte: (msg: string | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [panier, setPanier] = useState<ArticlePanier[]>([]);
  const [estPanierOuvert, setEstPanierOuvert] = useState<boolean>(false);
  const [messageAlerte, setMessageAlerte] = useState<string | null>(null);

  const ouvrirPanier = () => setEstPanierOuvert(true);
  const fermerPanier = () => setEstPanierOuvert(false);

  function ajouterAuPanier(pizza: Pizza, variante: Variante) {
    setPanier((panierPrecedent) => {
      const indexExistant = panierPrecedent.findIndex(
        (item) =>
          item.pizzaId === pizza.id && item.taille === variante.taille
      );

      if (indexExistant !== -1) {
        return panierPrecedent.map((item, index) =>
          index === indexExistant
            ? { ...item, quantite: item.quantite + 1 }
            : item
        );
      }

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

  return (
    <CartContext.Provider
      value={{
        panier,
        estPanierOuvert,
        messageAlerte,
        ouvrirPanier,
        fermerPanier,
        ajouterAuPanier,
        modifierQuantite,
        retirerDuPanier,
        validerCommande,
        setMessageAlerte,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
