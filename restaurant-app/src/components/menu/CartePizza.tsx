import Image from "next/image";
import { Pizza } from "../../types";
import { obtenirClasseBadge } from "../../utils";

interface CartePizzaProps {
  pizza: Pizza;
  onSelectionner: (pizza: Pizza) => void;
}

export default function CartePizza({ pizza, onSelectionner }: CartePizzaProps) {
  const classeBadge = obtenirClasseBadge(pizza.typeBadge);

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#E9E4C9]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group transform hover:-translate-y-1">
      {/* Zone Image */}
      <div className="relative h-64 sm:h-52 w-full overflow-hidden bg-stone-100">
        <Image
          src={pizza.imageParDefaut}
          alt={pizza.nom}
          fill
          priority
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
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
            <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#8C1D1D] transition-colors">
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
          <span className="text-[#8C1D1D] font-extrabold text-sm md:text-base">
            À partir de {pizza.prixDeBase.toFixed(2).replace(".", ",")} $
          </span>
          <button
            onClick={() => onSelectionner(pizza)}
            className="bg-[#8C1D1D] hover:bg-[#701616] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            Choisir
          </button>
        </div>
      </div>
    </div>
  );
}
