import { Pizza } from "../../types";
import { PIZZAS } from "../../data";
import { CartePizza } from "../menu";
import Banniere from "./Banniere";
import Presentation from "./Presentation";

interface PageAccueilProps {
  onChangerPage: (page: "menu" | "details") => void;
  onSelectionnerPizza: (pizza: Pizza) => void;
}

export default function PageAccueil({
  onChangerPage,
  onSelectionnerPizza,
}: PageAccueilProps) {
  // Filtrer les pizzas vedettes
  const pizzasVedettes = PIZZAS.filter((pizza) => pizza.estVedette);

  return (
    <>
      {/* Section Bannière (anciennement Hero) */}
      <Banniere onVoirMenu={() => onChangerPage("menu")} />

      {/* Section Vedettes */}
      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest" style={{ color: "var(--color-bordeaux)" }}>
            À l&apos;honneur
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-black mt-2" style={{ color: "var(--premier-plan)" }}>
            Nos Créations en Vedette
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pizzasVedettes.map((pizza, index) => (
            <CartePizza
              key={pizza.id}
              pizza={pizza}
              onSelectionner={onSelectionnerPizza}
              priority={index < 2}
            />
          ))}
        </div>
      </section>

      {/* Section Présentation */}
      <Presentation />
    </>
  );
}
