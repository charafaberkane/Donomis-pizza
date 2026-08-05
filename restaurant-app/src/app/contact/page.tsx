"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [estEnvoye, setEstEnvoye] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom || !email || !message) return;
    
    setEstEnvoye(true);
    setNom("");
    setEmail("");
    setMessage("");
    setTimeout(() => setEstEnvoye(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-6 md:px-12">
      {/* Header */}
      <section className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-extrabold uppercase tracking-widest" style={{ color: "var(--color-bordeaux)" }}>
          Une question ?
        </span>
        <h1 className="font-serif text-4xl md:text-6xl font-black mt-2 mb-4" style={{ color: "var(--premier-plan)" }}>
          Contactez-Nous
        </h1>
        <p className="text-sm md:text-base leading-relaxed font-medium" style={{ color: "var(--muted)" }}>
          Que ce soit pour réserver notre service traiteur, poser une question sur nos allergènes, 
          ou simplement saluer notre équipe, nous serons ravis de vous lire.
        </p>
      </section>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <div className="rounded-3xl p-6 md:p-10 shadow-sm" style={{ backgroundColor: "var(--color-creme-clair)", border: "1px solid rgba(0,0,0,0.04)" }}>
          {estEnvoye && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2">
              <span>✓</span> Votre message a bien été envoyé ! Nous vous répondrons sous 24h.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="nom" className="block text-xs font-extrabold uppercase tracking-wider mb-2" style={{ color: "var(--premier-plan)" }}>
                Nom Complet
              </label>
              <input
                id="nom"
                type="text"
                required
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none"
                style={{ backgroundColor: "var(--color-creme-clair)", border: "1px solid rgba(0,0,0,0.04)", color: "var(--premier-plan)" }}
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-extrabold uppercase tracking-wider mb-2" style={{ color: "var(--premier-plan)" }}>
                Adresse Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none"
                style={{ backgroundColor: "var(--color-creme-clair)", border: "1px solid rgba(0,0,0,0.04)", color: "var(--premier-plan)" }}
                placeholder="votre@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-xs font-extrabold uppercase tracking-wider mb-2" style={{ color: "var(--premier-plan)" }}>
                Votre Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none resize-none"
                style={{ backgroundColor: "var(--color-creme-clair)", border: "1px solid rgba(0,0,0,0.04)", color: "var(--premier-plan)" }}
                placeholder="Rédigez votre message ici..."
              />
            </div>
            <button
              type="submit"
              className="w-full font-bold py-3.5 px-6 rounded-xl transition-colors cursor-pointer text-xs uppercase tracking-wider shadow-md"
              style={{ backgroundColor: "var(--color-bordeaux)", color: "var(--color-creme-fond)" }}
            >
              Envoyer le message
            </button>
          </form>
        </div>

        {/* Info Column */}
        <div className="flex flex-col justify-between gap-8 rounded-3xl p-6 md:p-10" style={{ backgroundColor: "var(--color-creme-clair)", border: "1px solid rgba(0,0,0,0.04)" }}>
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold" style={{ color: "var(--premier-plan)" }}>
              Coordonnées
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="text-xl" style={{ color: "var(--color-bordeaux)" }}>📍</span>
                <div>
                  <strong className="text-sm block" style={{ color: "var(--premier-plan)" }}>Adresse</strong>
                  <span className="text-xs" style={{ color: "var(--muted)" }}>801 Aviation Road, Ottawa</span>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <span className="text-xl" style={{ color: "var(--color-bordeaux)" }}>📞</span>
                <div>
                  <strong className="text-sm block" style={{ color: "var(--premier-plan)" }}>Téléphone</strong>
                  <span className="text-xs" style={{ color: "var(--muted)" }}>+1 613 123 123</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-xl" style={{ color: "var(--color-bordeaux)" }}>✉</span>
                <div>
                  <strong className="text-sm block" style={{ color: "var(--premier-plan)" }}>Email</strong>
                  <span className="text-xs" style={{ color: "var(--muted)" }}>
                    {process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@donomipizza.com"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(0,0,0,0.04)", paddingTop: "1.5rem" }}>
            <h4 className="font-serif text-lg font-bold mb-3" style={{ color: "var(--premier-plan)" }}>
              Horaires d&apos;Ouverture
            </h4>
            <div className="grid grid-cols-2 gap-y-2 text-xs font-semibold" style={{ color: "var(--muted)" }}>
              <span>Lundi - Jeudi :</span>
              <span className="text-right">12:00 - 22:30</span>
              <span>Vendredi - Samedi :</span>
              <span className="text-right">12:00 - 23:30</span>
              <span>Dimanche :</span>
              <span className="text-right">18:00 - 22:30</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
