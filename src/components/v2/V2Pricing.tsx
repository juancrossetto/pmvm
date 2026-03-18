const plans = [
  {
    name: "Esencial",
    price: "$99",
    highlighted: false,
    features: [
      "Plan de nutrición base estratégico",
      "Rutina de entrenamiento vía App",
      "Acceso a comunidad privada",
      "Guía de hábitos fundamentales",
    ],
    cta: "Seleccionar Plan",
    ctaClass:
      "w-full py-5 border border-white/10 font-bold uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-brand-black transition-all",
  },
  {
    name: "Transformación",
    price: "$199",
    highlighted: true,
    features: [
      "Nutrición personalizada dinámica",
      "Ajustes semanales por métricas",
      "Análisis de técnica biomecánica",
      "Soporte prioritario vía WhatsApp",
      "Coaching de mentalidad mensual",
    ],
    cta: "Aplicar Ahora",
    ctaClass:
      "w-full py-5 bg-brand-accent text-brand-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-all shadow-lg",
  },
  {
    name: "Elite 1-1",
    price: "$499",
    highlighted: false,
    features: [
      "Videollamada semanal con Alejandro",
      "Protocolo de Biohack y Suplementación",
      "Acceso directo 24/7 Personal",
      "Análisis de analíticas de sangre",
      "Cupos muy limitados (Solo 5)",
    ],
    cta: "Consultar Disponibilidad",
    ctaClass:
      "w-full py-5 border border-brand-accent/50 text-brand-accent font-bold uppercase tracking-[0.2em] text-xs hover:bg-brand-accent hover:text-brand-black transition-all",
  },
];

export default function V2Pricing() {
  return (
    <section className="py-32 bg-brand-black" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-heading font-black uppercase mb-6 tracking-tight">
            Planes de <span className="text-brand-accent">Élite</span>
          </h2>
          <p className="text-brand-text/40 max-w-xl mx-auto text-lg font-light italic">
            Inversión estratégica en tu activo más valioso: tú mismo.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={
                plan.highlighted
                  ? "bg-brand-gray p-12 border-t-4 border-brand-accent relative flex flex-col justify-between scale-105 z-10 shadow-[0_40px_80px_-15px_rgba(255,209,30,0.1)]"
                  : "bg-brand-dark p-12 border border-white/5 relative flex flex-col justify-between hover:border-brand-accent/30 transition-all duration-500 group"
              }
            >
              {plan.highlighted && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-brand-accent text-brand-black text-[10px] font-black uppercase px-6 py-2 tracking-widest">
                  Más Popular
                </div>
              )}
              <div>
                <h3
                  className={`text-xl font-heading font-bold uppercase mb-4 tracking-widest ${
                    plan.highlighted ? "text-brand-accent" : ""
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="text-5xl font-heading font-black mb-10">
                  {plan.price}
                  <span className="text-sm font-light text-white/30 italic ml-2">
                    /mes
                  </span>
                </div>
                <ul
                  className={`space-y-6 mb-12 text-sm ${
                    plan.highlighted ? "text-brand-text/80" : "text-brand-text/50"
                  }`}
                >
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <span className="text-brand-accent mr-4 text-lg">
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button className={plan.ctaClass}>{plan.cta}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
