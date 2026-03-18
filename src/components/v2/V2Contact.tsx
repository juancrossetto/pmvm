"use client";

import { FormEvent } from "react";

export default function V2Contact() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <section className="py-32 bg-brand-dark relative overflow-hidden" id="contact">
      <div className="absolute -right-20 top-0 text-[20rem] font-heading font-black text-white/[0.02] select-none pointer-events-none uppercase">
        PMVM
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-heading font-black uppercase mb-6 tracking-tight">
            ¿Estás Listo para{" "}
            <span className="text-brand-accent">Vivir Más</span>?
          </h2>
          <p className="text-brand-text/50 text-lg font-light">
            Completa el formulario para evaluar si eres apto para el programa de
            alto rendimiento.
          </p>
        </div>

        <form className="space-y-10" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-[0.3em] mb-4 text-white/40">
                Nombre Completo
              </label>
              <input
                className="w-full bg-brand-black border border-white/10 focus:border-brand-accent focus:ring-0 text-white p-5 transition-all text-sm outline-none"
                placeholder="Juan Pérez"
                type="text"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-[0.3em] mb-4 text-white/40">
                Email Profesional
              </label>
              <input
                className="w-full bg-brand-black border border-white/10 focus:border-brand-accent focus:ring-0 text-white p-5 transition-all text-sm outline-none"
                placeholder="juan@email.com"
                type="email"
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-[0.3em] mb-4 text-white/40">
              Tu mayor desafío actual
            </label>
            <textarea
              className="w-full bg-brand-black border border-white/10 focus:border-brand-accent focus:ring-0 text-white p-5 transition-all text-sm resize-none outline-none"
              placeholder="Cuéntame brevemente qué te impide lograr tu objetivo..."
              rows={6}
            />
          </div>
          <button
            className="w-full py-6 bg-brand-accent text-brand-black font-heading font-black uppercase tracking-[0.3em] text-lg hover:shadow-[0_0_50px_rgba(255,209,30,0.4)] transition-all transform hover:-translate-y-1"
            type="submit"
          >
            Enviar Aplicación
          </button>
        </form>
      </div>
    </section>
  );
}
