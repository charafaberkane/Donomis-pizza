"use client";

import { useState } from "react";
import { PageMenu, PageDetail } from "../../components";
import { Pizza } from "../../types";
import { useCart } from "../../context/CartContext";

export default function MenuPage() {
  const [pizzaSelectionnee, setPizzaSelectionnee] = useState<Pizza | null>(null);
  const { ajouterAuPanier } = useCart();

  if (pizzaSelectionnee) {
    return (
      <PageDetail
        pizza={pizzaSelectionnee}
        onRetourMenu={() => setPizzaSelectionnee(null)}
        onAjouterAuPanier={ajouterAuPanier}
      />
    );
  }

  return (
    <PageMenu onSelectionnerPizza={(pizza) => setPizzaSelectionnee(pizza)} />
  );
}
