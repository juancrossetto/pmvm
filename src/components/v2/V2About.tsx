export default function V2About() {
  return (
    <section className="py-32 bg-brand-black" id="about">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 border-t border-l border-brand-accent/40 z-10" />
            <div className="relative overflow-hidden group">
              <img
                alt="Alejandro Gerez Entrenamiento"
                className="w-full grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpHwk-0AtD2-47ZS50laxKT7kBALHw44DdQr69hy4WKTi6DGuZVbA6ppZvHMApoThmBLYG53OKPRuZFvvCw3RA5hLh1lh9uanAEtIMWqjUn09O5DWi8kgkIg03bRmSybF-Zx4pNKulOFAx6ryhj7CqGs3oS1ZasOI8SBqpovWOMyknnltZHA5dqJ03THDtP8pau9-PBaZuaw-ByOstyT_Luzx378BponJE4nVFDL2ENzBhhRjazE_gfs6g8yqG1q7LHKS46kI1D1_H"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b border-r border-brand-accent/40 z-10" />
          </div>

          <div>
            <h3 className="text-brand-accent font-heading font-bold tracking-[0.4em] uppercase text-xs mb-6">
              El Fundador
            </h3>
            <h2 className="text-4xl md:text-6xl font-heading font-black mb-10 uppercase leading-none">
              La autoridad detrás del{" "}
              <span className="text-brand-accent">cambio</span>
            </h2>
            <div className="space-y-8 text-brand-text/70 leading-relaxed text-lg font-light">
              <p>
                Tras una década inmerso en el mundo del fitness de alto
                rendimiento, he comprendido que el cuerpo es simplemente el
                reflejo de la arquitectura mental. Mi enfoque no se trata solo
                de calorías, sino de recalibrar tu identidad para que la
                excelencia no sea un esfuerzo, sino un hábito.
              </p>
              <p>
                He guiado a cientos de ejecutivos y profesionales a recuperar no
                solo su figura, sino su vigor y su autoridad personal. Mi
                metodología integra la biomecánica avanzada con una nutrición
                estratégica diseñada para mentes que no se detienen.
              </p>
              <p>
                PMVM nace de la necesidad de un sistema real, sin adornos
                innecesarios, enfocado exclusivamente en la eficacia y la
                longevidad. Si estás aquí, no buscas un parche temporal; buscas
                una metamorfosis definitiva.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
