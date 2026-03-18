const metrics = [
  { value: "10+", label: "Años de Exp." },
  { value: "100+", label: "Vidas Transformadas" },
  { value: "50kg", label: "Pérdida Máx. Alumno" },
  { value: "10+", label: "Certificaciones" },
];

export default function V2Metrics() {
  return (
    <section className="py-24 bg-brand-black">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div className="text-5xl md:text-7xl font-heading font-black text-brand-accent mb-4">
              {metric.value}
            </div>
            <div className="text-[10px] md:text-xs uppercase font-bold tracking-[0.3em] text-white/40">
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
