const stories = [
  {
    name: "Ricardo M.",
    result: "-32KG",
    quote:
      '"Como directivo, pensaba que no tenía tiempo. Alejandro no me dio una dieta, me dio un sistema de ejecución. Recuperé la energía que tenía a los 20."',
    beforeImg:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDt_D9x1gBToL_0pFs73P9NnG4ZwW-RNNIDYDjgfKRzCjlr_-Sjf5cDA0JUdyzqjqgnkdYk1MyXFyjhxI9RCmEjSvM4J0VwgccA1pjAEKB8aZCJunquSUhq9l-S-TJltiZ26TJPGTQadHW4DfTJyn7tH3Ru-dNCFtgezJSbaXKiJBxLTNJ-6Rcyr0DiClbHzHunYt17BBrCTYJePxSetzAkHTNvyfKtGScDnmoDIEVGLxG8HFPIeSYXCfzGlTRdhJzezugkcliCuqdO",
    afterImg:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDZA9lCpFuFSJPkne9oAXTdtG_3kRAveVA3K2SG0vA07VmGL0fa4hyXuosV49vicHmsaRVGpiU9GJ61mai7MZgInHPV_x7IMYsOTes1ydGuox0OYd3FLqnyUMmUEiHrIfDyQKLFZG98jzJorf8A42De_cHDao3VhloSyDlWYvnjO01D4PI2YX9c4-mBnMqEvz6961Fv7y5mWLMnHn5CihadPY6JTZcRL3AVYnFL9iQGtZ-CtmT27bswH44R2KS2EdKrKT4eMV-VgKyE",
  },
  {
    name: "Elena G.",
    result: "-18KG",
    quote:
      '"Lo que más cambió fue mi seguridad. Dejé de esconderme detrás de ropa ancha. El método de Alejandro es implacable pero humano."',
    beforeImg:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD8a3iTTSjMH_2hu0OXlUaN6Bt9SaOUac-mn6Cb2eBO7gnMgABDSjQ-_yws4e1VdacSKwobkZDjx87UREb9G3vup-OYM08h3EmNYHFdR8tivgTllydQ6KgFBkZpDOSZwRyQI0Vw5RV1KL31WOaQDdoeH6xThoiK7YzGdyik4K3C0fNdEbOeIwOpMG_TsLx91BagHC6A-5JJPBDwEdbJ0hyM_LgPuxfJjMS-kUh6__3RzA-sFObxLRRlYNGeaIkH5d0IFTz5vUCAlkz0",
    afterImg:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDri2LcMDTANtEION6RZe-628IdLT5xy4fA8b85PEnLbKxJ7UenGIQfi4Bd71ARmRaS6cSfbymdI_4mvfL5imcvPG2O7LEPvuH__9mvbUgUeP6O0jaFxKv-LIHEgp5j-TtlFm_5cBSRgsBHcOaJp_ROW6OJxpLkTiYfe3o_w2DDERxeLHjlL-CMINW4_8e3BA-HiGkz1PYVdd-pgJ9xS7ol1WY1TQLqtR1BViVx_QIc1mQqvyFhXzxGaDu0bAaS8AXX8mfW6trEZp5G",
  },
];

function StoryCard({
  story,
}: {
  story: (typeof stories)[number];
}) {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 gap-4 mb-10 group overflow-hidden">
        <div className="relative overflow-hidden aspect-[4/5] bg-brand-gray">
          <img
            alt="Antes"
            className="w-full h-full object-cover grayscale opacity-70 group-hover:opacity-100 transition-all duration-700"
            src={story.beforeImg}
          />
          <div className="absolute bottom-4 left-4 bg-brand-black/80 px-4 py-1 text-[10px] font-bold uppercase tracking-widest border border-white/10">
            Antes
          </div>
        </div>
        <div className="relative overflow-hidden aspect-[4/5] bg-brand-gray">
          <img
            alt="Después"
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
            src={story.afterImg}
          />
          <div className="absolute bottom-4 right-4 bg-brand-accent px-4 py-1 text-brand-black text-[10px] font-bold uppercase tracking-widest">
            Después
          </div>
        </div>
      </div>
      <div className="border-l-2 border-brand-accent pl-8 py-2">
        <div className="flex justify-between items-baseline mb-4">
          <h4 className="text-3xl font-heading font-bold uppercase tracking-tight text-white">
            {story.name}
          </h4>
          <p className="text-brand-accent font-heading font-black text-4xl">
            {story.result}
          </p>
        </div>
        <blockquote className="text-brand-text/60 font-light italic text-xl leading-relaxed">
          {story.quote}
        </blockquote>
      </div>
    </div>
  );
}

export default function V2SuccessStories() {
  return (
    <section className="py-32 bg-brand-black" id="success-stories">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <h3 className="text-brand-accent font-heading font-bold tracking-[0.4em] uppercase text-xs mb-6">
              Transformaciones Reales
            </h3>
            <h2 className="text-5xl md:text-7xl font-heading font-black uppercase leading-none">
              TESTIMONIOS <span className="text-stroke">PMVM</span>
            </h2>
          </div>
          <p className="text-brand-text/40 font-light text-right max-w-xs italic text-lg leading-relaxed">
            Evidencia tangible de un sistema diseñado para la excelencia física
            y mental.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20">
          {stories.map((story) => (
            <StoryCard key={story.name} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
}
