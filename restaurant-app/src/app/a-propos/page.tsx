"use client";

import React from "react";

export default function AProposPage() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-6 md:px-12">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-extrabold uppercase tracking-widest" style={{ color: "var(--color-bordeaux)" }}>
          Notre Histoire
        </span>
        <h1 className="font-serif text-4xl md:text-6xl font-black mt-2 mb-6" style={{ color: "var(--premier-plan)" }}>
          Donomi Pizza
        </h1>
        <p className="text-sm md:text-lg leading-relaxed font-medium" style={{ color: "var(--muted)" }}>
          L&apos;alliance sacrée de la tradition napolitaine, de l&apos;amour du produit local 
          et d&apos;une fermentation longue de 72 heures pour une digestibilité absolue.
        </p>
      </section>

      {/* Philosophy Details */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div className="space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold" style={{ color: "var(--color-bordeaux)" }}>
            Le secret est dans le temps
          </h2>
          <p className="text-sm md:text-base leading-relaxed font-medium" style={{ color: "var(--muted)" }}>
            Pour concevoir une pizza mémorable, il n&apos;y a aucun raccourci. 
            C&apos;est pourquoi notre chef prépare la pâte en utilisant exclusivement de la farine de blé type 00 importée de Naples. 
            Ensuite, nous lui laissons le temps de lever pendant 72 heures entières à température contrôlée.
          </p>
          <p className="text-stone-600 text-sm md:text-base leading-relaxed font-medium">
            Ce processus méticuleux permet le développement d&apos;arômes complexes et légers, 
            garantissant une croûte merveilleusement alvéolée, croustillante à l&apos;extérieur et moelleuse à l&apos;intérieur.
          </p>
        </div>
        <div className="rounded-3xl p-8 space-y-6 shadow-sm" style={{ backgroundColor: "rgba(255,255,255,0.5)", border: "1px solid rgba(0,0,0,0.04)" }}>
          <h3 className="font-serif text-xl font-bold" style={{ color: "var(--premier-plan)" }}>
            Nos Engagements Fondamentaux :
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-lg" style={{ color: "var(--color-bordeaux)" }}>🍕</span>
              <div>
                <strong className="text-sm block" style={{ color: "var(--premier-plan)" }}>100% Importations Italiennes AOP</strong>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>Tomates San Marzano, Mozzarella di Bufala Campana et huile d&apos;olive extra-vierge AOP.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-lg" style={{ color: "var(--color-bordeaux)" }}>🌾</span>
              <div>
                <strong className="text-sm block" style={{ color: "var(--premier-plan)" }}>Digestion Légère</strong>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>Notre processus de fermentation naturelle dégrade les sucres complexes de la farine.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-lg" style={{ color: "var(--color-bordeaux)" }}>🔥</span>
              <div>
                <strong className="text-sm block" style={{ color: "var(--premier-plan)" }}>Cuisson Traditionnelle</strong>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>Saisie à très haute température pour capturer instantanément l&apos;humidité et la saveur.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Story Timeline or Team quote */}
      <section className="text-center rounded-3xl p-8 md:p-12" style={{ backgroundColor: "var(--arriere-plan)", border: "1px solid rgba(0,0,0,0.04)" }}>
        <h3 className="font-serif italic text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--premier-plan)" }}>
          &ldquo;La pizza n&apos;est pas seulement de la nourriture, c&apos;est un partage d&apos;émotions.&rdquo;
        </h3>
        <p className="text-xs md:text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--color-bordeaux)" }}>
          — L&apos;équipe Donomi
        </p>
      </section>
    </div>
  );
}
