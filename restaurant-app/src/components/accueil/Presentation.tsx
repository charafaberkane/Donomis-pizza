import Image from "next/image";

export default function Presentation() {
  return (
    <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Texte */}
        <div className="space-y-6">
          <span className="text-xs font-extrabold uppercase tracking-widest" style={{ color: "var(--color-bordeaux)" }}>
            Tradition & Passion
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-black leading-tight" style={{ color: "var(--premier-plan)" }}>
            Une pâte vivante, des ingrédients d&apos;exception
          </h2>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: "var(--muted)" }}>
            Chez Donomi Pizza, nous croyons que la pizza parfaite nécessite du
            temps et de la rigueur. C&apos;est pourquoi nous utilisons une farine de
            blé type 00 importée de Naples et que nous laissons reposer notre
            pâte pendant 3 jours entiers pour révéler tous ses arômes.
          </p>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: "var(--muted)" }}>
            De la sauce tomate à base de San Marzano AOP jusqu&apos;à la burrata
            ultra-crémeuse déposée après cuisson, chaque bouchée est un hommage
            au terroir italien.
          </p>
        </div>

        {/* Grille d'images */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative h-60 w-full rounded-2xl overflow-hidden shadow-md">
            <Image
              src="/images/margherita.webp"
              alt="Préparation de la Margherita"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative h-60 w-full rounded-2xl overflow-hidden shadow-md translate-y-6">
            <Image
              src="/images/la_diavola.webp"
              alt="Pizza Diavola sortie du four"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
