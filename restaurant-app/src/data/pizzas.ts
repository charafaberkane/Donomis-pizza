import { Pizza } from "../types";

export const PIZZAS: Pizza[] = [
  {
    id: "diavola",
    nom: "La Diavola",
    note: 4.9,
    badge: "Épicée",
    typeBadge: "epicee",
    description:
      "Salami épicé, olives noires, flocons de piment, tomates San Marzano et mozzarella de bufflonne.",
    prixDeBase: 18.0,
    imageParDefaut: "/images/la_diavola.png",
    estVedette: true,
    variantes: [
      { taille: "Petite (25cm)", prix: 18.0, image: "/images/la_diavola.png" },
      { taille: "Moyenne (33cm)", prix: 24.0, image: "/images/la_diavola.png" },
      { taille: "Grande (40cm)", prix: 29.0, image: "/images/la_diavola.png" },
    ],
  },
  {
    id: "margherita",
    nom: "Margherita",
    note: 4.8,
    badge: "Classique",
    typeBadge: "classique",
    description:
      "Mozzarella de bufflonne fraîche, basilic frais, huile d'olive extra vierge et sel de mer.",
    prixDeBase: 14.0,
    imageParDefaut: "/images/margherita.png",
    estVedette: true,
    variantes: [
      { taille: "Petite (25cm)", prix: 14.0, image: "/images/margherita.png" },
      { taille: "Moyenne (33cm)", prix: 19.0, image: "/images/margherita.png" },
      { taille: "Grande (40cm)", prix: 23.0, image: "/images/margherita.png" },
    ],
  },
  {
    id: "ortolana",
    nom: "Ortolana",
    note: 4.7,
    badge: "Végétarienne",
    typeBadge: "vegetarienne",
    description:
      "Courgettes grillées, aubergines, poivrons marinés, fromage de chèvre crémeux et réduction balsamique.",
    prixDeBase: 16.0,
    imageParDefaut: "/images/ortolana.png",
    variantes: [
      { taille: "Petite (25cm)", prix: 16.0, image: "/images/ortolana.png" },
      { taille: "Moyenne (33cm)", prix: 22.0, image: "/images/ortolana.png" },
      { taille: "Grande (40cm)", prix: 26.0, image: "/images/ortolana.png" },
    ],
  },
  {
    id: "tartufo",
    nom: "Tartufo Nero",
    note: 5.0,
    badge: "Spéciale",
    typeBadge: "speciale",
    description:
      "Copeaux de truffe noire fraîche, champignons porcini sautés, fromage fontina fondu et thym frais.",
    prixDeBase: 24.0,
    imageParDefaut: "/images/tartufo_nero.png",
    estVedette: true,
    variantes: [
      {
        taille: "Petite (25cm)",
        prix: 24.0,
        image: "/images/tartufo_nero.png",
      },
      {
        taille: "Moyenne (33cm)",
        prix: 32.0,
        image: "/images/tartufo_nero.png",
      },
      {
        taille: "Grande (40cm)",
        prix: 38.0,
        image: "/images/tartufo_nero.png",
      },
    ],
  },
  {
    id: "calabrese",
    nom: "Calabrese",
    note: 4.9,
    badge: "Épicée",
    typeBadge: "epicee",
    description:
      "Nduja de Calabre piquante, oignons rouges caramélisés, filet de miel piquant et burrata fraîche.",
    prixDeBase: 19.5,
    imageParDefaut: "/images/calabrese.png",
    variantes: [
      { taille: "Petite (25cm)", prix: 19.5, image: "/images/calabrese.png" },
      { taille: "Moyenne (33cm)", prix: 26.0, image: "/images/calabrese.png" },
      { taille: "Grande (40cm)", prix: 31.0, image: "/images/calabrese.png" },
    ],
  },
  {
    id: "capricciosa",
    nom: "Capricciosa",
    note: 4.6,
    badge: "Classique",
    typeBadge: "classique",
    description:
      "Cœurs d'artichauts, jambon blanc cuit aux herbes, champignons de Paris frais et olives taggiasche.",
    prixDeBase: 17.0,
    imageParDefaut: "/images/capricciosa.png",
    variantes: [
      {
        taille: "Petite (25cm)",
        prix: 17.0,
        image: "/images/capricciosa.png",
      },
      {
        taille: "Moyenne (33cm)",
        prix: 23.0,
        image: "/images/capricciosa.png",
      },
      {
        taille: "Grande (40cm)",
        prix: 27.5,
        image: "/images/capricciosa.png",
      },
    ],
  },
  {
    id: "quattro",
    nom: "Quattro Formaggi",
    note: 4.9,
    badge: "Végétarienne",
    typeBadge: "vegetarienne",
    description:
      "Mélange onctueux et fondant de Gorgonzola AOP, Parmigiano Reggiano, Fontina et fior di latte.",
    prixDeBase: 15.0,
    imageParDefaut: "/images/margherita.png",
    variantes: [
      { taille: "Petite (25cm)", prix: 15.0, image: "/images/margherita.png" },
      { taille: "Moyenne (33cm)", prix: 21.0, image: "/images/margherita.png" },
      { taille: "Grande (40cm)", prix: 25.0, image: "/images/margherita.png" },
    ],
  },
  {
    id: "salmone",
    nom: "Salmone Affumicato",
    note: 4.8,
    badge: "Spéciale",
    typeBadge: "speciale",
    description:
      "Saumon fumé de qualité supérieure, crème fraîche à l'aneth, câpres de Sicile et perles d'oignon rouge.",
    prixDeBase: 21.0,
    imageParDefaut: "/images/la_diavola.png",
    variantes: [
      {
        taille: "Petite (25cm)",
        prix: 21.0,
        image: "/images/la_diavola.png",
      },
      {
        taille: "Moyenne (33cm)",
        prix: 29.0,
        image: "/images/la_diavola.png",
      },
      {
        taille: "Grande (40cm)",
        prix: 34.0,
        image: "/images/la_diavola.png",
      },
    ],
  },
];
