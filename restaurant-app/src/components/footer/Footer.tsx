export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E9E4C9] py-8 px-6 md:px-12 w-full mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <h3 className="font-serif italic text-xl font-black text-[#8C1D1D]">
          Donomi Pizza
        </h3>
        <div className="flex flex-wrap justify-center gap-6 text-xs font-bold text-stone-500">
          <span className="hover:text-[#8C1D1D] transition-colors cursor-pointer">
            Politique de confidentialité
          </span>
          <span className="hover:text-[#8C1D1D] transition-colors cursor-pointer">
            Développement durable
          </span>
          <span className="hover:text-[#8C1D1D] transition-colors cursor-pointer">
            Nos restaurants
          </span>
          <span className="hover:text-[#8C1D1D] transition-colors cursor-pointer">
            Nous contacter
          </span>
        </div>
        <p className="text-[11px] font-semibold text-stone-400 text-center md:text-right">
          © 2026 Donomi Pizza. Le savoir-faire artisanal italien livré chez
          vous.
        </p>
      </div>
    </footer>
  );
}
