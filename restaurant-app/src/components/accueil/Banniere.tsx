interface BanniereProps {
  onVoirMenu: () => void;
}

export default function Banniere({ onVoirMenu }: BanniereProps) {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center"
      style={{ backgroundColor: "var(--arriere-plan)" }}
    >
      {/* Fond décoratif subtil */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "var(--color-bordeaux)", opacity: 0.06 }}
      />

      <h1 className="relative font-serif text-5xl md:text-7xl font-black mb-6 leading-tight max-w-4xl" style={{ color: "var(--color-bordeaux)" }}>
        Le Savoir-Faire <br />
        <span className="italic" style={{ color: "var(--premier-plan)" }}>Artisanal Italien</span>
      </h1>

      <p className="relative text-sm md:text-lg max-w-2xl leading-relaxed mb-10 font-medium" style={{ color: "var(--muted)" }}>
        Chaque pâte est pétrie à la main et maturée 72 heures. Nos ingrédients
        proviennent directement de petits producteurs italiens pour vous garantir
        un goût inégalé.
      </p>

      <div className="relative flex flex-col sm:flex-row gap-4">
        <button
          onClick={onVoirMenu}
          className="font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all duration-200 hover:-translate-y-0.5 text-sm uppercase tracking-wider cursor-pointer"
          style={{ backgroundColor: "var(--color-bordeaux)", color: "var(--color-creme-fond)" }}
        >
          Découvrir la carte
        </button>
        <button className="font-bold px-8 py-3.5 rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 text-sm uppercase tracking-wider cursor-pointer"
          style={{ backgroundColor: "var(--color-creme-clair)", color: "var(--premier-plan)", border: "1px solid rgba(0,0,0,0.06)" }}
        >
          Notre histoire
        </button>
      </div>
    </section>
  );
}
