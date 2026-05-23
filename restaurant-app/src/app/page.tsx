"use client";

import { useState } from "react";
import Image from "next/image";

// Types
interface Pizza {
  id: string;
  nom: string;
  note: number;
  badge: "Épicée" | "Classique" | "Végétarienne" | "Spéciale";
  typeBadge: "epicee" | "classique" | "vegetarienne" | "speciale";
  description: string;
  prix: number;
  image: string;
}

interface ArticlePanier extends Pizza {
  quantite: number;
}

const PIZZAS: Pizza[] = [
  {
    id: "diavola",
    nom: "La Diavola",
    note: 4.9,
    badge: "Épicée",
    typeBadge: "epicee",
    description: "Salami épicé, olives noires, flocons de piment, tomates San Marzano et mozzarella de bufflonne.",
    prix: 24.00,
    image: "/images/la_diavola.png"
  },
  {
    id: "margherita",
    nom: "Margherita",
    note: 4.8,
    badge: "Classique",
    typeBadge: "classique",
    description: "Mozzarella de bufflonne fraîche, basilic frais, huile d'olive extra vierge et sel de mer.",
    prix: 19.00,
    image: "/images/margherita.png"
  },
  {
    id: "ortolana",
    nom: "Ortolana",
    note: 4.7,
    badge: "Végétarienne",
    typeBadge: "vegetarienne",
    description: "Courgettes grillées, aubergines, poivrons marinés, fromage de chèvre crémeux et réduction balsamique.",
    prix: 22.00,
    image: "/images/ortolana.png"
  },
  {
    id: "tartufo",
    nom: "Tartufo Nero",
    note: 5.0,
    badge: "Spéciale",
    typeBadge: "speciale",
    description: "Copeaux de truffe noire fraîche, champignons porcini sautés, fromage fontina fondu et thym frais.",
    prix: 32.00,
    image: "/images/tartufo_nero.png"
  },
  {
    id: "calabrese",
    nom: "Calabrese",
    note: 4.9,
    badge: "Épicée",
    typeBadge: "epicee",
    description: "Nduja de Calabre piquante, oignons rouges caramélisés, filet de miel piquant et burrata fraîche.",
    prix: 26.00,
    image: "/images/calabrese.png"
  },
  {
    id: "capricciosa",
    nom: "Capricciosa",
    note: 4.6,
    badge: "Classique",
    typeBadge: "classique",
    description: "Cœurs d'artichauts, jambon blanc cuit aux herbes, champignons de Paris frais et olives taggiasche.",
    prix: 23.00,
    image: "/images/capricciosa.png"
  },
  {
    id: "quattro",
    nom: "Quattro Formaggi",
    note: 4.9,
    badge: "Végétarienne",
    typeBadge: "vegetarienne",
    description: "Mélange onctueux et fondant de Gorgonzola AOP, Parmigiano Reggiano, Fontina et fior di latte.",
    prix: 21.00,
    image: "/images/margherita.png" // Remplacement par Margherita
  },
  {
    id: "salmone",
    nom: "Salmone Affumicato",
    note: 4.8,
    badge: "Spéciale",
    typeBadge: "speciale",
    description: "Saumon fumé de qualité supérieure, crème fraîche à l'aneth, câpres de Sicile et perles d'oignon rouge.",
    prix: 29.00,
    image: "/images/la_diavola.png" // Remplacement par Diavola
  }
];

export default function Accueil() {
  const [categorieActive, setCategorieActive] = useState<string>("Tout");
  const [recherche, setRecherche] = useState<string>("");
  const [panier, setPanier] = useState<ArticlePanier[]>([]);
  const [estPanierOuvert, setEstPanierOuvert] = useState<boolean>(false);
  const [messageAlerte, setMessageAlerte] = useState<string | null>(null);

  // Pizzas filtrées par catégorie et recherche
  const pizzasFiltrees = PIZZAS.filter((pizza) => {
    const correspondCategorie =
      categorieActive === "Tout" ||
      (categorieActive === "Classiques" && pizza.typeBadge === "classique") ||
      (categorieActive === "Épicées" && pizza.typeBadge === "epicee") ||
      (categorieActive === "Végétariennes" && pizza.typeBadge === "vegetarienne") ||
      (categorieActive === "Spéciales" && pizza.typeBadge === "speciale");

    const correspondRecherche =
      pizza.nom.toLowerCase().includes(recherche.toLowerCase()) ||
      pizza.description.toLowerCase().includes(recherche.toLowerCase());

    return correspondCategorie && correspondRecherche;
  });

  // Opérations du panier
  const ajouterAuPanier = (pizza: Pizza) => {
    setPanier((panierPrecedent) => {
      const articleExistant = panierPrecedent.find((article) => article.id === pizza.id);
      if (articleExistant) {
        return panierPrecedent.map((article) =>
          article.id === pizza.id ? { ...article, quantite: article.quantite + 1 } : article
        );
      }
      return [...panierPrecedent, { ...pizza, quantite: 1 }];
    });

    // Déclencher l'alerte
    setMessageAlerte(`🍕 ${pizza.nom} ajoutée au panier !`);
    setTimeout(() => {
      setMessageAlerte(null);
    }, 3000);
  };

  const modifierQuantite = (id: string, montant: number) => {
    setPanier((panierPrecedent) => {
      return panierPrecedent
        .map((article) => {
          if (article.id === id) {
            const nouvelleQte = article.quantite + montant;
            return nouvelleQte > 0 ? { ...article, quantite: nouvelleQte } : null;
          }
          return article;
        })
        .filter((article): article is ArticlePanier => article !== null);
    });
  };

  const retirerDuPanier = (id: string) => {
    setPanier((panierPrecedent) => panierPrecedent.filter((article) => article.id !== id));
  };

  const totalPanier = panier.reduce((somme, article) => somme + article.prix * article.quantite, 0);

  const nombreTotalArticles = panier.reduce((somme, article) => somme + article.quantite, 0);

  const validerCommande = () => {
    setPanier([]);
    setEstPanierOuvert(false);
    setMessageAlerte("🎉 Commande passée avec succès ! Merci de votre confiance.");
    setTimeout(() => {
      setMessageAlerte(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7E3] text-[#1C1917] font-sans selection:bg-bordeaux selection:text-white flex flex-col justify-between">
      {/* Alerte Toast */}
      {messageAlerte && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#8C1D1D] text-[#FAF7E3] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-[#FAF7E3]/20 animate-bounce duration-300">
          <span className="font-semibold text-sm">{messageAlerte}</span>
          <button
            onClick={() => setMessageAlerte(null)}
            className="text-white/60 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      {/* Conteneur Principal */}
      <div className="w-full">
        {/* En-tête de Navigation */}
        <header className="sticky top-0 z-40 bg-[#FAF7E3]/95 backdrop-blur-md border-b border-[#E9E4C9] py-4 px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="font-serif italic text-2xl md:text-3xl font-extrabold text-bordeaux tracking-tight cursor-pointer">
              Donomi Pizza
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#"
              className="text-stone-600 hover:text-bordeaux transition-colors text-sm font-semibold tracking-wide"
            >
              Accueil
            </a>
            <a
              href="#"
              className="text-bordeaux relative font-semibold text-sm tracking-wide after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-0.5 after:bg-bordeaux"
            >
              Menu
            </a>
            <a
              href="#"
              className="text-stone-600 hover:text-bordeaux transition-colors text-sm font-semibold tracking-wide"
            >
              À propos
            </a>
            <a
              href="#"
              className="text-stone-600 hover:text-bordeaux transition-colors text-sm font-semibold tracking-wide"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-4">
            {/* Barre de Recherche Supérieure */}
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Rechercher un plat..."
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
                className="bg-[#FAF7E3] border border-[#E9E4C9] rounded-full pl-10 pr-4 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-bordeaux w-48 transition-all focus:w-60 text-stone-850"
              />
              <svg
                className="absolute left-3.5 top-2.5 h-3.5 w-3.5 text-stone-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Bouton Panier */}
            <button
              onClick={() => setEstPanierOuvert(true)}
              className="relative p-2 text-stone-700 hover:text-bordeaux transition-colors focus:outline-none"
              aria-label="Panier"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {nombreTotalArticles > 0 && (
                <span className="absolute top-0.5 right-0.5 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-bordeaux rounded-full animate-pulse">
                  {nombreTotalArticles}
                </span>
              )}
            </button>

            {/* Bouton Profil */}
            <button className="p-1.5 rounded-full text-stone-700 hover:text-bordeaux transition-colors focus:outline-none">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
          </div>
        </header>

        {/* Section Héro */}
        <section className="py-12 md:py-16 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black text-bordeaux mb-6 leading-tight">
              Notre Carte Signature
            </h2>
            <p className="text-[#4A3E3D] text-sm md:text-base lg:text-lg leading-relaxed font-medium">
              Découvrez la rencontre de l'héritage artisanal italien et de la gastronomie moderne. 
              Chaque ingrédient est sélectionné avec rigueur, chaque pâte est vieillie avec patience.
            </p>
          </div>
        </section>

        {/* Filtre et Barre de Recherche Locale */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E9E4C9] pb-6">
            {/* Onglets de catégories */}
            <div className="flex flex-wrap gap-2.5">
              {["Tout", "Classiques", "Épicées", "Végétariennes", "Spéciales"].map((cat) => {
                const estSelectionne = categorieActive === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setCategorieActive(cat)}
                    className={`px-5 py-2 text-xs md:text-sm font-semibold tracking-wide rounded-full transition-all duration-200 cursor-pointer ${
                      estSelectionne
                        ? "bg-bordeaux text-[#FAF7E3] shadow-md transform -translate-y-[1px]"
                        : "bg-[#FAF7E3] hover:bg-white text-stone-600 border border-[#E9E4C9]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Barre de Recherche du Menu */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Rechercher votre pizza..."
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
                className="bg-[#FAF7E3] hover:bg-white focus:bg-white border border-[#E9E4C9] rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-bordeaux w-full pr-10 transition-colors text-stone-850"
              />
              <div className="absolute right-3.5 top-3 text-stone-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Grille de Pizzas */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto mb-20">
          {pizzasFiltrees.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pizzasFiltrees.map((pizza) => {
                // Déterminer les classes de couleurs pour le badge
                let classeBadge = "bg-stone-800 text-white";
                if (pizza.typeBadge === "epicee") {
                  classeBadge = "bg-[#8C1D1D] text-white";
                } else if (pizza.typeBadge === "classique") {
                  classeBadge = "bg-[#5F6935] text-white";
                } else if (pizza.typeBadge === "vegetarienne") {
                  classeBadge = "bg-[#C2410C] text-white";
                }

                return (
                  <div
                    key={pizza.id}
                    className="bg-white rounded-2xl overflow-hidden border border-[#E9E4C9]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group transform hover:-translate-y-1"
                  >
                    {/* Zone Image */}
                    <div className="relative h-64 sm:h-52 w-full overflow-hidden bg-stone-100">
                      <Image
                        src={pizza.image}
                        alt={pizza.nom}
                        fill
                        priority
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 25vw"
                      />
                      <span
                        className={`absolute top-4 right-4 text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-sm ${classeBadge}`}
                      >
                        {pizza.badge}
                      </span>
                    </div>

                    {/* Zone Contenu */}
                    <div className="p-5 flex flex-col flex-1 justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-bordeaux transition-colors">
                            {pizza.nom}
                          </h3>
                          <div className="flex items-center gap-1 text-sm font-bold text-stone-700 shrink-0">
                            <span className="text-amber-500">★</span>
                            <span>{pizza.note.toFixed(1)}</span>
                          </div>
                        </div>
                        <p className="text-stone-500 text-xs md:text-sm mt-2.5 leading-relaxed font-medium line-clamp-3">
                          {pizza.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-5 pt-3 border-t border-stone-100">
                        <span className="text-bordeaux font-extrabold text-lg">
                          {pizza.prix.toFixed(2).replace(".", ",")} $
                        </span>
                        <button
                          onClick={() => ajouterAuPanier(pizza)}
                          className="bg-bordeaux hover:bg-bordeaux-survol text-white px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                        >
                          <svg
                            className="h-3.5 w-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          Ajouter
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/50 border border-[#E9E4C9] rounded-2xl p-8 max-w-md mx-auto">
              <span className="text-4xl">🍕</span>
              <h4 className="font-serif text-lg font-bold text-stone-800 mt-4 mb-2">
                Aucune pizza trouvée
              </h4>
              <p className="text-stone-500 text-xs">
                Nous n'avons pas trouvé de pizza correspondant à votre recherche. Essayez avec d'autres mots clés.
              </p>
              <button
                onClick={() => {
                  setRecherche("");
                  setCategorieActive("Tout");
                }}
                className="mt-5 bg-bordeaux text-[#FAF7E3] px-4 py-2 rounded-lg text-xs font-semibold hover:bg-bordeaux-survol transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Pied de Page */}
      <footer className="bg-white border-t border-[#E9E4C9] py-8 px-6 md:px-12 w-full mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <h3 className="font-serif italic text-xl font-black text-bordeaux">
            Donomi Pizza
          </h3>
          <div className="flex flex-wrap justify-center gap-6 text-xs font-bold text-stone-500">
            <a href="#" className="hover:text-bordeaux transition-colors">
              Politique de confidentialité
            </a>
            <a href="#" className="hover:text-bordeaux transition-colors">
              Développement durable
            </a>
            <a href="#" className="hover:text-bordeaux transition-colors">
              Nos restaurants
            </a>
            <a href="#" className="hover:text-bordeaux transition-colors">
              Nous contacter
            </a>
          </div>
          <p className="text-[11px] font-semibold text-stone-400 text-center md:text-right">
            © 2026 Donomi Pizza. Le savoir-faire artisanal italien livré chez vous.
          </p>
        </div>
      </footer>

      {/* Tiroir du Panier */}
      {estPanierOuvert && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Fond assombri */}
          <div
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setEstPanierOuvert(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#FAF7E3] border-l border-[#E9E4C9] flex flex-col h-full shadow-2xl animate-slide-in">
              {/* En-tête du Panier */}
              <div className="px-6 py-5 border-b border-[#E9E4C9] flex items-center justify-between bg-white">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-bordeaux"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <h3 className="font-serif text-lg font-black text-stone-900">
                    Votre Panier ({nombreTotalArticles})
                  </h3>
                </div>
                <button
                  onClick={() => setEstPanierOuvert(false)}
                  className="text-stone-400 hover:text-bordeaux transition-colors p-1.5 focus:outline-none cursor-pointer"
                >
                  <span className="text-xl">✕</span>
                </button>
              </div>

              {/* Liste des Articles du Panier */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {panier.length > 0 ? (
                  panier.map((article) => (
                    <div
                      key={article.id}
                      className="bg-white rounded-xl p-4 border border-[#E9E4C9]/40 flex gap-4 items-center justify-between"
                    >
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden shrink-0 bg-stone-100">
                        <Image
                          src={article.image}
                          alt={article.nom}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h4 className="font-serif text-sm font-bold text-stone-900 leading-tight">
                          {article.nom}
                        </h4>
                        <span className="text-bordeaux text-xs font-extrabold block mt-1">
                          {article.prix.toFixed(2).replace(".", ",")} $
                        </span>

                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => modifierQuantite(article.id, -1)}
                            className="bg-stone-100 hover:bg-stone-200 text-stone-700 px-2 py-0.5 rounded text-xs font-black transition-colors"
                          >
                            -
                          </button>
                          <span className="text-xs font-extrabold text-stone-700 w-4 text-center">
                            {article.quantite}
                          </span>
                          <button
                            onClick={() => modifierQuantite(article.id, 1)}
                            className="bg-stone-100 hover:bg-stone-200 text-stone-700 px-2 py-0.5 rounded text-xs font-black transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => retirerDuPanier(article.id)}
                        className="text-stone-400 hover:text-bordeaux transition-colors p-1.5 cursor-pointer"
                        aria-label="Supprimer"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20">
                    <span className="text-4xl block mb-4">🛒</span>
                    <p className="text-stone-500 text-xs font-semibold">
                      Votre panier est vide.
                    </p>
                    <button
                      onClick={() => setEstPanierOuvert(false)}
                      className="mt-6 bg-bordeaux text-[#FAF7E3] px-5 py-2.5 rounded-full text-xs font-bold hover:bg-bordeaux-survol transition-colors"
                    >
                      Continuer mes achats
                    </button>
                  </div>
                )}
              </div>

              {/* Pied du Panier */}
              {panier.length > 0 && (
                <div className="p-6 bg-white border-t border-[#E9E4C9] space-y-4">
                  <div className="flex justify-between items-center text-stone-700 text-sm font-semibold">
                    <span>Sous-total</span>
                    <span>{totalPanier.toFixed(2).replace(".", ",")} $</span>
                  </div>
                  <div className="flex justify-between items-center text-stone-500 text-xs">
                    <span>Frais de livraison</span>
                    <span className="text-[#5F6935] font-bold">Gratuit</span>
                  </div>
                  <div className="flex justify-between items-center text-stone-900 font-extrabold text-base pt-2 border-t border-stone-100">
                    <span>Total</span>
                    <span className="text-bordeaux text-lg">
                      {totalPanier.toFixed(2).replace(".", ",")} $
                    </span>
                  </div>

                  <button
                    onClick={validerCommande}
                    className="w-full bg-bordeaux hover:bg-bordeaux-survol text-white py-3 rounded-xl font-bold text-sm transition-colors cursor-pointer shadow-md text-center mt-2"
                  >
                    Passer la commande
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
