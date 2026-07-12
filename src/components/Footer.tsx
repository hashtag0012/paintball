import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer
      className="relative px-4 md:px-6 pt-12 md:pt-16 pb-8 flex flex-col items-center justify-center overflow-hidden text-white"
      style={{
        backgroundImage: "url('/Gemini_Generated_Image_v4k3oav4k3oav4k3 (1).webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/75 pointer-events-none" />
      {/* Bottom fade to black */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.95))' }} />

      {/* ── Corner mascots ── */}
      {/* Bottom-left */}
      <img
        src="/2t.webp"
        alt="Paintball character left"
        className="absolute bottom-0 left-0 h-32 sm:h-40 md:h-52 w-auto object-contain select-none pointer-events-none z-10"
        style={{ filter: 'drop-shadow(0 0 12px rgba(0,0,0,0.9))' }}
      />
      {/* Bottom-right */}
      <img
        src="/5t.webp"
        alt="Paintball character right"
        className="absolute bottom-0 right-0 h-32 sm:h-40 md:h-52 w-auto object-contain select-none pointer-events-none z-10"
        style={{ filter: 'drop-shadow(0 0 12px rgba(0,0,0,0.9))' }}
      />

      {/* ── Main content ── */}
      <motion.div
        className="relative z-20 w-full max-w-3xl flex flex-col items-center gap-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >


        {/* Logo */}
        <img
          src="/logo.webp"
          alt="Headshot Paintball"
          className="h-24 sm:h-28 md:h-32 lg:h-40 w-auto object-contain"
        />

        {/* Big brand text */}
        <div className="text-center leading-none">
          <h2 className="font-adrip text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-white tracking-tighter paint-drip-effect"
            style={{ WebkitTextStroke: '2px hsl(var(--secondary))', textShadow: '0 8px 32px rgba(0,0,0,0.8)' }}>
            HEADSHOT
          </h2>
          <h2 className="font-adrip text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-[hsl(var(--primary))] tracking-tighter neon-glow-pink">
            PAINTBALL
          </h2>
        </div>

        {/* Pill navigation links */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 font-graffiti">
          {[
            { label: 'The Arena', href: '#about' },
            { label: 'Gallery',   href: '#gallery' },
            { label: 'Contact',   href: '#contact' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector(href);
                if (!el) return;
                const offset = 80;
                const elementPosition = el.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }}
              className="text-xs sm:text-sm uppercase tracking-widest text-white px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm hover:bg-[hsl(var(--primary))] hover:text-black hover:border-[hsl(var(--primary))] transition-all duration-200 cursor-pointer"
              style={{ WebkitTextStroke: '0.5px black', textShadow: '1px 1px 0 #000' }}
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector('#contact');
              if (!el) return;
              const offset = 80;
              const elementPosition = el.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - offset;
              window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }}
            className="text-xs sm:text-sm uppercase tracking-widest text-black px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full bg-[hsl(var(--primary))] border border-[hsl(var(--primary))] hover:bg-transparent hover:text-[hsl(var(--primary))] transition-all duration-200 font-bold shadow-[0_0_16px_hsl(var(--primary)/0.6)] cursor-pointer"
            style={{ WebkitTextStroke: '0.5px black' }}
          >
            Book Now
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/theheadshotpaintball/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/80 hover:text-[hsl(var(--primary))] transition-colors duration-200 font-graffiti text-sm uppercase tracking-widest"
            style={{ WebkitTextStroke: '0.5px black', textShadow: '1px 1px 0 #000' }}
          >
            {/* Instagram icon */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Instagram
          </a>
          <span className="text-white/30">|</span>
          <a
            href="https://www.facebook.com/TheHeadshotpaintballs/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/80 hover:text-[hsl(var(--primary))] transition-colors duration-200 font-graffiti text-sm uppercase tracking-widest"
            style={{ WebkitTextStroke: '0.5px black', textShadow: '1px 1px 0 #000' }}
          >
            {/* Facebook icon */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </a>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-white/10" />

        {/* Copyright */}
        <p className="font-graffiti text-xs text-white/60 pb-2 text-center" style={{ WebkitTextStroke: '0.5px black', textShadow: '1px 1px 0 #000' }}>
          © 2026 Headshot Paintball Kashmir. Leave your mark.
        </p>
      </motion.div>
    </footer>
  );
}
