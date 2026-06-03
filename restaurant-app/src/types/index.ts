// Types principaux de l'application Donomi Pizza

export type NomPage = "accueil" | "menu" | "details" | "apropos" | "contact";

export interface Variante {
  taille: "Petite (25cm)" | "Moyenne (33cm)" | "Grande (40cm)";
  prix: number;
  image: string;
}

export interface Pizza {
  id: string;
  nom: string;
  note: number;
  badge: "Épicée" | "Classique" | "Végétarienne" | "Spéciale";
  typeBadge: "epicee" | "classique" | "vegetarienne" | "speciale";
  description: string;
  prixDeBase: number;
  imageParDefaut: string;
  variantes: Variante[];
  estVedette?: boolean;
}

export interface ArticlePanier {
  pizzaId: string;
  nom: string;
  taille: string;
  prix: number;
  image: string;
  quantite: number;
}
