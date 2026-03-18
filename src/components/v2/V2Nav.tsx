export default function V2Nav() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-brand-black/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="font-heading font-black text-2xl tracking-tighter">
          PM<span className="text-brand-accent">VM</span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-semibold tracking-widest uppercase">
          <a
            className="hover:text-brand-accent transition-colors"
            href="#about"
          >
            Sobre Mí
          </a>
          <a
            className="hover:text-brand-accent transition-colors"
            href="#bio"
          >
            Mi Historia
          </a>
          <a
            className="hover:text-brand-accent transition-colors"
            href="#success-stories"
          >
            Testimonios
          </a>
          <a
            className="hover:text-brand-accent transition-colors"
            href="#pricing"
          >
            Programas
          </a>
          <a
            className="bg-brand-accent text-brand-black px-6 py-2 rounded-sm hover:bg-white transition-colors"
            href="#contact"
          >
            Empezar Ahora
          </a>
        </div>
      </div>
    </nav>
  );
}
