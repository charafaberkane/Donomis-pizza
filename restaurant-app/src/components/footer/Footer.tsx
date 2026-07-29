export default function Footer() {
  return (
    <footer
      className="py-8 px-6 md:px-12 w-full mt-auto"
      style={{ backgroundColor: "var(--arriere-plan)", borderTop: "1px solid rgba(0,0,0,0.06)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <h3 className="font-serif italic text-xl font-black" style={{ color: "var(--color-bordeaux)" }}>
          Donomi Pizza
        </h3>
        <div className="flex flex-wrap justify-center gap-6 text-xs font-bold" style={{ color: "var(--muted)" }}>
          <span className="hover:text-[var(--color-bordeaux)] transition-colors cursor-pointer">
            Politique de confidentialité
          </span>
          <span className="hover:text-[var(--color-bordeaux)] transition-colors cursor-pointer">
            Développement durable
          </span>
          <span className="hover:text-[var(--color-bordeaux)] transition-colors cursor-pointer">
            Nos restaurants
          </span>
          <span className="hover:text-[var(--color-bordeaux)] transition-colors cursor-pointer">
            Nous contacter
          </span>
        </div>
        <p className="text-[11px] font-semibold text-center md:text-right" style={{ color: "var(--muted)" }}>
          © 2026 Donomi Pizza. Le savoir-faire artisanal italien livré chez
          vous.
        </p>
      </div>
    </footer>
  );
}
