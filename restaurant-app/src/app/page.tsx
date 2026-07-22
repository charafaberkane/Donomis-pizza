"use client";

import { useState } from "react";
import { PageAccueil, PageDetail } from "../components";
import { Pizza } from "../types";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function Accueil() {
  const [pizzaSelectionnee, setPizzaSelectionnee] = useState<Pizza | null>(null);
  const { ajouterAuPanier } = useCart();
  const router = useRouter();

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
    <PageAccueil
      onChangerPage={(page) => {
        if (page === "menu") {
          router.push("/menu");
        }
      }}
      onSelectionnerPizza={(pizza) => setPizzaSelectionnee(pizza)}
    />
  );
}
