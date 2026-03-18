export default function V2Marquee() {
  return (
    <section className="bg-brand-black py-12 border-y border-white/5 overflow-hidden">
      <div className="animate-marquee-left whitespace-nowrap mb-6">
        <span className="text-5xl md:text-8xl font-heading font-black px-6 uppercase text-white/5 italic">
          PESAR MENOS —
        </span>
        <span className="text-5xl md:text-8xl font-heading font-black px-6 uppercase text-brand-accent italic">
          VIVIR MÁS —
        </span>
        <span className="text-5xl md:text-8xl font-heading font-black px-6 uppercase text-white/5 italic">
          PESAR MENOS —
        </span>
        <span className="text-5xl md:text-8xl font-heading font-black px-6 uppercase text-brand-accent italic">
          VIVIR MÁS —
        </span>
      </div>
      <div className="animate-marquee-right whitespace-nowrap">
        <span className="text-5xl md:text-8xl font-heading font-black px-6 uppercase text-stroke italic">
          DISCIPLINA —
        </span>
        <span className="text-5xl md:text-8xl font-heading font-black px-6 uppercase text-white/10 italic">
          PROPÓSITO —
        </span>
        <span className="text-5xl md:text-8xl font-heading font-black px-6 uppercase text-stroke italic">
          DISCIPLINA —
        </span>
        <span className="text-5xl md:text-8xl font-heading font-black px-6 uppercase text-white/10 italic">
          PROPÓSITO —
        </span>
      </div>
    </section>
  );
}
