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
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#8C1D1D]">
          Une question ?
        </span>
        <h1 className="font-serif text-4xl md:text-6xl font-black text-stone-900 mt-2 mb-4">
          Contactez-Nous
        </h1>
        <p className="text-stone-600 text-sm md:text-base leading-relaxed font-medium">
          Que ce soit pour réserver notre service traiteur, poser une question sur nos allergènes, 
          ou simplement saluer notre équipe, nous serons ravis de vous lire.
        </p>
      </section>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <div className="bg-white border border-[#E9E4C9]/60 rounded-3xl p-6 md:p-10 shadow-sm">
          {estEnvoye && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2">
              <span>✓</span> Votre message a bien été envoyé ! Nous vous répondrons sous 24h.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="nom" className="block text-xs font-extrabold uppercase text-stone-700 tracking-wider mb-2">
                Nom Complet
              </label>
              <input
                id="nom"
                type="text"
                required
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full bg-[#FAF7E3] border border-[#E9E4C9] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#8C1D1D] text-stone-800"
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-extrabold uppercase text-stone-700 tracking-wider mb-2">
                Adresse Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#FAF7E3] border border-[#E9E4C9] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#8C1D1D] text-stone-800"
                placeholder="votre@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-xs font-extrabold uppercase text-stone-700 tracking-wider mb-2">
                Votre Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#FAF7E3] border border-[#E9E4C9] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#8C1D1D] text-stone-800 resize-none"
                placeholder="Rédigez votre message ici..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#8C1D1D] hover:bg-[#701616] text-[#FAF7E3] font-bold py-3.5 px-6 rounded-xl transition-colors cursor-pointer text-xs uppercase tracking-wider shadow-md hover:shadow-lg"
            >
              Envoyer le message
            </button>
          </form>
        </div>

        {/* Info Column */}
        <div className="flex flex-col justify-between gap-8 bg-stone-50 border border-[#E9E4C9]/40 rounded-3xl p-6 md:p-10">
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Coordonnées
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="text-xl">📍</span>
                <div>
                  <strong className="text-stone-800 text-sm block">Adresse</strong>
                  <span className="text-xs text-stone-500">12 Rue de la Pizza, 75001 Paris, France</span>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <span className="text-xl">📞</span>
                <div>
                  <strong className="text-stone-800 text-sm block">Téléphone</strong>
                  <span className="text-xs text-stone-500">+33 1 23 45 67 89</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-xl">✉</span>
                <div>
                  <strong className="text-stone-800 text-sm block">Email</strong>
                  <span className="text-xs text-stone-500">ciao@donomipizza.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#E9E4C9] pt-6">
            <h4 className="font-serif text-lg font-bold text-stone-900 mb-3">
              Horaires d&apos;Ouverture
            </h4>
            <div className="grid grid-cols-2 gap-y-2 text-xs font-semibold text-stone-600">
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
