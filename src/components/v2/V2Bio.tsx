export default function V2Bio() {
  return (
    <section className="py-32 bg-brand-dark" id="bio">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-brand-accent font-heading font-bold tracking-[0.4em] uppercase text-xs mb-6">
              Mi Viaje Personal
            </h3>
            <h2 className="text-4xl md:text-5xl font-heading font-black mb-10 uppercase leading-tight">
              De la lucha a la{" "}
              <span className="text-brand-accent">Maestría</span>
            </h2>
            <div className="space-y-8 text-brand-text/70 leading-relaxed text-lg font-light">
              <p>
                Desde chico, por usar la comida como vía de escape a un montón
                de situaciones que vivía y no sabía gestionar, llegué a un grado
                de obesidad que limitaba mi vida. La frustración y el
                sentimiento de no ser suficiente eran mi motor diario, hasta que
                decidí que mi historia no podía terminar así.
              </p>
              <p>
                Empecé mi viaje en el programa de televisión &quot;Cuestión de
                Peso&quot;, donde no solo perdí peso frente a miles de personas,
                sino que descubrí mi verdadera vocación: entender la ciencia del
                cuerpo y la psicología del cambio. Ese fue el chispazo que
                inició una década de estudio y formación constante.
              </p>
              <p>
                Hoy, puedo decir que me transformé desde un lugar de paz y
                disciplina, no de odio hacia mi cuerpo. He dedicado mi vida a
                que otros no tengan que pasar por ese laberinto de confusión y
                puedan alcanzar su mejor versión con un método probado,
                profesional y profundamente humano.
              </p>
            </div>
            <div className="mt-12">
              <img
                alt="Alejandro Gerez Firma"
                className="w-32 opacity-50 grayscale invert"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpHwk-0AtD2-47ZS50laxKT7kBALHw44DdQr69hy4WKTi6DGuZVbA6ppZvHMApoThmBLYG53OKPRuZFvvCw3RA5hLh1lh9uanAEtIMWqjUn09O5DWi8kgkIg03bRmSybF-Zx4pNKulOFAx6ryhj7CqGs3oS1ZasOI8SBqpovWOMyknnltZHA5dqJ03THDtP8pau9-PBaZuaw-ByOstyT_Luzx378BponJE4nVFDL2ENzBhhRjazE_gfs6g8yqG1q7LHKS46kI1D1_H"
                style={{
                  filter: "brightness(0) invert(1)",
                  height: "auto",
                  width: "120px",
                }}
              />
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-accent/5 -rotate-3 rounded-sm" />
              <img
                alt="Alejandro Gerez Profesional"
                className="relative z-10 w-full rounded-sm shadow-2xl grayscale"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8a3iTTSjMH_2hu0OXlUaN6Bt9SaOUac-mn6Cb2eBO7gnMgABDSjQ-_yws4e1VdacSKwobkZDjx87UREb9G3vup-OYM08h3EmNYHFdR8tivgTllydQ6KgFBkZpDOSZwRyQI0Vw5RV1KL31WOaQDdoeH6xThoiK7YzGdyik4K3C0fNdEbOeIwOpMG_TsLx91BagHC6A-5JJPBDwEdbJ0hyM_LgPuxfJjMS-kUh6__3RzA-sFObxLRRlYNGeaIkH5d0IFTz5vUCAlkz0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
