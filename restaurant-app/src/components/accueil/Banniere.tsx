interface BanniereProps {
  onVoirMenu: () => void;
}

export default function Banniere({ onVoirMenu }: BanniereProps) {
  return (
    <section className="relative overflow-hidden bg-[#FAF7E3] py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
      {/* Fond décoratif subtil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#8C1D1D]/5 rounded-full blur-3xl pointer-events-none" />

      <h1 className="relative font-serif text-5xl md:text-7xl font-black text-[#8C1D1D] mb-6 leading-tight max-w-4xl">
        Le Savoir-Faire <br />
        <span className="italic text-stone-900">Artisanal Italien</span>
      </h1>

      <p className="relative text-stone-600 text-sm md:text-lg max-w-2xl leading-relaxed mb-10 font-medium">
        Chaque pâte est pétrie à la main et maturée 72 heures. Nos ingrédients
        proviennent directement de petits producteurs italiens pour vous garantir
        un goût inégalé.
      </p>

      <div className="relative flex flex-col sm:flex-row gap-4">
        <button
          onClick={onVoirMenu}
          className="bg-[#8C1D1D] hover:bg-[#701616] text-[#FAF7E3] font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all duration-200 hover:-translate-y-0.5 text-sm uppercase tracking-wider cursor-pointer"
        >
          Découvrir la carte
        </button>
        <button className="bg-white hover:bg-stone-50 text-stone-800 border border-[#E9E4C9] font-bold px-8 py-3.5 rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 text-sm uppercase tracking-wider cursor-pointer">
          Notre histoire
        </button>
      </div>
    </section>
  );
}
