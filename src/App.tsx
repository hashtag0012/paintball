import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Loader } from './components/Loader';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SmoothScrollProvider } from './components/SmoothScrollProvider';

// Smooth-scroll helper — works with Lenis (which intercepts native scroll)
function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: 'The Arena', href: '#hero' },
    { label: 'Gallery',   href: '#gallery' },
    { label: 'Waiver',    href: '#waiver' },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollTo(href);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Always transparent navbar — no glass blur */}
      <nav className="fixed top-0 w-full z-50 px-4 md:px-8 py-3 md:py-4 flex justify-between items-center bg-transparent">
        
        {/* Logo */}
        <a href="#" onClick={(e) => handleClick(e, '#hero')} className="flex items-center">
          <img
            src="/logo.png"
            alt="Headshot Paintball"
            className="h-16 md:h-20 w-auto object-contain"
            style={{ filter: 'none' }}
          />
        </a>

        {/* Desktop Pills */}
        <div className="hidden md:flex items-center gap-3 font-graffiti">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={(e) => handleClick(e, href)}
              className="text-sm uppercase tracking-widest text-white px-5 py-2.5 rounded-full border-2 border-white/50 bg-black/30 hover:bg-[hsl(var(--primary))] hover:text-black hover:border-[hsl(var(--primary))] transition-all duration-200"
              style={{ WebkitTextStroke: '0.5px black', textShadow: '1px 1px 0 #000' }}
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleClick(e, '#contact')}
            className="text-sm uppercase tracking-widest text-black px-6 py-2.5 rounded-full bg-[hsl(var(--primary))] border-2 border-white hover:bg-white hover:text-black transition-all duration-200 font-bold ml-4 shadow-[0_0_12px_rgba(255,255,255,0.3)]"
          >
            Book Now
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 z-50 relative"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => handleClick(e, href)}
                className="font-graffiti text-3xl uppercase tracking-widest text-white hover:text-[hsl(var(--primary))] transition-colors"
                style={{ WebkitTextStroke: '1px black', textShadow: '2px 2px 0 #000' }}
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleClick(e, '#contact')}
              className="font-graffiti text-3xl uppercase tracking-widest text-[hsl(var(--primary))] mt-4 border-2 border-white px-8 py-3 rounded-full"
              style={{ WebkitTextStroke: '1px black', textShadow: '2px 2px 0 #000' }}
            >
              Book Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen text-foreground bg-black">
        <Loader />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Gallery />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
