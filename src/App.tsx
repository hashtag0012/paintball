import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';

const Instagram = ({size=24}: {size?: number}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
const Linkedin = ({size=24}: {size?: number}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;
const Twitter = ({size=24}: {size?: number}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const Bot = ({size=24}: {size?: number}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/></svg>;
const SearchIcon = ({size=24}: {size?: number}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const Globe = ({size=24}: {size?: number}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const Star = ({size=24}: {size?: number}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const Zap = ({size=24}: {size?: number}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const Flame = ({size=24}: {size?: number}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.5-3.3.9 1.8 2.4 2.5 4.5 2.5z"/></svg>;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

// Splash sticker scattered on the wall
function Sticker({ src, style, rotate, opacity = 0.88, size = '260px', flipX = false }: {
  src: string; style: React.CSSProperties; rotate: number; opacity?: number; size?: string; flipX?: boolean;
}) {
  return (
    <img
      src={src} alt="" aria-hidden draggable={false}
      style={{
        position: 'absolute', width: size, rotate: `${rotate}deg`, opacity,
        mixBlendMode: 'multiply' as const, zIndex: 2, pointerEvents: 'none',
        filter: 'saturate(1.8) contrast(1.3) brightness(0.9) drop-shadow(0 4px 12px rgba(0,0,0,0.8))',
        transform: flipX ? 'scaleX(-1)' : undefined,
        userSelect: 'none',
        ...style,
      }}
    />
  );
}

// Graffiti tag component
function GraffitiTag({ text, color = 'primary', rotate = 0 }: { text: string; color?: 'primary' | 'secondary' | 'accent'; rotate?: number }) {
  const colors = {
    primary: 'from-[hsl(var(--primary))] to-[hsl(325,80%,40%)]',
    secondary: 'from-[hsl(var(--secondary))] to-[hsl(175,80%,35%)]',
    accent: 'from-[#FF6B35] to-[#F7C531]',
  };
  return (
    <motion.div
      initial={{ scale: 0, rotate: -20 }}
      whileInView={{ scale: 1, rotate }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`font-graffiti text-2xl md:text-3xl font-bold px-6 py-2 rounded-full bg-gradient-to-r ${colors[color]} text-white neon-glow-pink`}
      style={{ transform: `rotate(${rotate}deg)`, textShadow: '2px 2px 0 rgba(0,0,0,0.3)' }}
    >
      {text}
    </motion.div>
  );
}

// Vibrant card component
function VibrantCard({ title, subtitle, icon: Icon, color, delay }: {
  title: string; subtitle: string; icon: any; color: 'primary' | 'secondary' | 'accent'; delay: number;
}) {
  const gradients = {
    primary: 'from-[hsl(var(--primary))] to-[hsl(325,80%,40%)]',
    secondary: 'from-[hsl(var(--secondary))] to-[hsl(175,80%,35%)]',
    accent: 'from-[#FF6B35] to-[#F7C531]',
  };
  const glows = {
    primary: 'neon-glow-pink',
    secondary: 'neon-glow-cyan',
    accent: 'shadow-[0_0_30px_rgba(255,107,53,0.4)]',
  };
  return (
    <motion.div
      {...fadeUp(delay)}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative p-8 rounded-3xl overflow-hidden group"
      style={{ background: 'hsla(255,20%,11%,0.90)' }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[color]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-tr ${gradients[color]} ${glows[color]}`}>
        <Icon size={32} className="text-white" />
      </div>
      <h3 className="font-graffiti text-2xl font-bold mb-3 text-white">{title}</h3>
      <p className="font-graffiti text-[hsl(var(--muted-foreground))] text-base">{subtitle}</p>
      <div className={`absolute top-4 right-4 w-3 h-3 rounded-full bg-gradient-to-r ${gradients[color]} ${glows[color]}`} />
    </motion.div>
  );
}

// Animated badge
function AnimatedBadge({ text, color = 'primary' }: { text: string; color?: 'primary' | 'secondary' | 'accent' }) {
  const colors = {
    primary: 'bg-[hsl(var(--primary))] neon-glow-pink',
    secondary: 'bg-[hsl(var(--secondary))] neon-glow-cyan',
    accent: 'bg-[#FF6B35] shadow-[0_0_20px_rgba(255,107,53,0.4)]',
  };
  return (
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className={`font-graffiti text-xs font-bold px-4 py-1.5 rounded-full ${colors[color]} text-white uppercase tracking-wider`}
    >
      {text}
    </motion.div>
  );
}


export default function App() {
  const missionRef = useRef(null);
  const { scrollY } = useScroll();
  const missionY = useTransform(scrollY, [300, 800], [0, 100]);
  const solutionY = useTransform(scrollY, [600, 1100], [0, 100]);
  const skullUpperY = useTransform(scrollY, [0, 500], [0, -30]);
  const skullLowerY = useTransform(scrollY, [0, 500], [0, 30]);
  const skullUpperY2 = useTransform(scrollY, [500, 1000], [0, -30]);
  const skullLowerY2 = useTransform(scrollY, [500, 1000], [0, 30]);
  const skullUpperY3 = useTransform(scrollY, [1000, 1500], [0, -30]);
  const skullLowerY3 = useTransform(scrollY, [1000, 1500], [0, 30]);
  const { scrollYProgress } = useScroll({ target: missionRef, offset: ["start 70%", "end 30%"] });

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden" style={{ background: 'transparent' }}>


      {/* ━━━━━━━━ NAVBAR ━━━━━━━━ */}
      <nav className="fixed top-0 w-full z-50 px-8 md:px-28 py-5 flex justify-between items-center border-b border-[hsl(var(--border))]"
        style={{ background: 'hsla(255,20%,6%,0.50)', backdropFilter: 'blur(14px)' }}>
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <div className="w-7 h-7 rounded-full border-2 border-[hsl(var(--primary))]" style={{boxShadow:'0 0 10px hsla(325,100%,60%,0.5)'}}/>
              <div className="w-3 h-3 rounded-full bg-[hsl(var(--secondary))] absolute" style={{boxShadow:'0 0 8px hsla(175,100%,50%,0.8)'}}/>
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Mindloop</span>
          </div>
          {/* Nav links — GraffitiYouth font (smaller, less visible text) */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[hsl(var(--muted-foreground))]">
            {['Home', 'How It Works', 'Philosophy', 'Use Cases'].map((link, i, arr) => (
              <span key={link} className="flex items-center gap-6">
                <a href="#" className="font-graffiti hover:text-[hsl(var(--primary))] transition-colors duration-200">{link}</a>
                {i < arr.length - 1 && <span className="opacity-30">•</span>}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          {[Instagram, Linkedin, Twitter].map((Icon, i) => (
            <motion.a key={i} href="#" whileHover={{ scale: 1.1 }}
              className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center text-white hover:text-[hsl(var(--primary))] transition-colors">
              <Icon size={17} />
            </motion.a>
          ))}
        </div>
      </nav>

      {/* ━━━━━━━━ HERO ━━━━━━━━ */}
      <section className="relative h-[150vh] overflow-hidden" style={{
        backgroundImage: 'url("/Gemini_Generated_Image_5weffr5weffr5wef-processed(lightpdf.com) (1).png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className="absolute inset-0 z-10" style={{
          background: 'linear-gradient(to bottom, rgba(13, 13, 15, 0) 60%, #0d0d0f 100%)',
        }} />
        <motion.div 
          style={{ y: skullUpperY }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20"
        >
          <img src="/upper.png" alt="" className="h-32 object-contain" draggable={false} />
        </motion.div>
      </section>


      {/* ━━━━━━━━ MISSION ━━━━━━━━ */}
      <section ref={missionRef} className="pt-32 pb-32 md:pb-44 px-8 md:px-28 relative overflow-hidden">
        <motion.div 
          style={{ y: skullLowerY }}
          className="absolute top-0 left-1/2 -translate-x-1/2 z-20"
        >
          <img src="/lower.png" alt="" className="h-32 object-contain" draggable={false} />
        </motion.div>
        <motion.div
          style={{
            y: missionY,
            backgroundImage: 'url("/Gemini_Generated_Image_sfxurysfxurysfxu (1).png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'absolute',
            inset: 0,
            zIndex: 0,
          }}
        />
        <div className="absolute inset-0 z-1" style={{
          background: 'linear-gradient(to top, rgba(13, 13, 15, 0) 60%, #0d0d0f 100%)',
        }} />
        <div className="absolute inset-0 z-1" style={{
          background: 'linear-gradient(to bottom, rgba(13, 13, 15, 0) 60%, #0d0d0f 100%)',
        }} />

        <div className="max-w-5xl mx-auto relative flex flex-col items-center z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
            className="w-full max-w-[800px] h-[800px] rounded-3xl overflow-hidden mb-24 border border-[hsl(var(--border))]"
            style={{ boxShadow: '0 0 80px hsla(175,100%,50%,0.08)' }}>
            <video src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4"
              autoPlay loop muted playsInline className="w-full h-full object-cover" />
          </motion.div>

          <div className="max-w-4xl mx-auto text-left">
            <p className="text-2xl md:text-4xl lg:text-5xl font-medium tracking-[-1px] leading-tight mb-10 text-[hsl(var(--hero-subtitle))]">
              We're building a space where{' '}
              <span className="text-[hsl(var(--primary))]">curiosity</span>{' '}
              <span className="text-white">meets</span>{' '}
              <span className="text-[hsl(var(--secondary))]">clarity</span>{' '}
              — where readers find depth, writers find reach, and every newsletter becomes a conversation worth having.
            </p>
            <motion.p className="font-graffiti text-xl md:text-2xl lg:text-3xl font-medium leading-normal text-white"
              style={{ opacity: useTransform(scrollYProgress, [0.3, 0.6], [0.15, 1]) }}>
              A platform where content, community, and insight flow together — with less noise, less friction, and more meaning for everyone involved.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Skull gap between Mission and Solution */}
      <div className="relative h-32 z-20">
        <motion.div 
          style={{ y: skullUpperY2 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
        >
          <img src="/upper.png" alt="" className="h-32 object-contain" draggable={false} />
        </motion.div>
        <motion.div 
          style={{ y: skullLowerY2 }}
          className="absolute top-0 left-1/2 -translate-x-1/2"
        >
          <img src="/lower.png" alt="" className="h-32 object-contain" draggable={false} />
        </motion.div>
      </div>

      {/* ━━━━━━━━ SOLUTION ━━━━━━━━ */}
      <section className="py-32 md:py-44 px-8 md:px-28 relative overflow-hidden">
        <motion.div
          style={{
            y: solutionY,
            backgroundImage: 'url("/Gemini_Generated_Image_v4k3oav4k3oav4k3 (1).png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'absolute',
            inset: 0,
            zIndex: 0,
          }}
        />
        <div className="absolute inset-0 z-1" style={{
          background: 'linear-gradient(to top, rgba(13, 13, 15, 0) 60%, #0d0d0f 100%)',
        }} />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div {...fadeUp(0.1)} className="mb-16">
            <AnimatedBadge text="SOLUTION" color="secondary" />
            <h2 className="font-graffiti text-4xl md:text-6xl font-bold tracking-tight text-white mt-6">
              The platform for{' '}
              <span className="italic bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-transparent">
                meaningful
              </span>{' '}
              content
            </h2>
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="w-full aspect-[3/1] rounded-2xl overflow-hidden mb-20 border border-[hsl(var(--border))]">
            <video src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4"
              autoPlay loop muted playsInline className="w-full h-full object-cover" />
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            <VibrantCard title="Curated Feed" subtitle="A feed designed for discovery and depth, not doomscrolling." icon={Star} color="primary" delay={0.3} />
            <VibrantCard title="Writer Tools" subtitle="Powerful analytics and composing tools for modern creators." icon={Zap} color="secondary" delay={0.4} />
            <VibrantCard title="Community" subtitle="Direct engagement with readers through comments and threads." icon={Bot} color="accent" delay={0.5} />
            <VibrantCard title="Distribution" subtitle="Smart algorithms that match your writing with the right audience." icon={Flame} color="primary" delay={0.6} />
          </div>
        </div>
      </section>

      {/* Skull gap between Solution and CTA */}
      <div className="relative h-32 z-20">
        <motion.div 
          style={{ y: skullUpperY3 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
        >
          <img src="/upper.png" alt="" className="h-32 object-contain" draggable={false} />
        </motion.div>
        <motion.div 
          style={{ y: skullLowerY3 }}
          className="absolute top-0 left-1/2 -translate-x-1/2"
        >
          <img src="/lower.png" alt="" className="h-32 object-contain" draggable={false} />
        </motion.div>
      </div>

      {/* ━━━━━━━━ CTA ━━━━━━━━ */}
      <section className="py-32 md:py-44 px-8 md:px-28 relative overflow-hidden min-h-[70vh] flex flex-col justify-center">

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.div {...fadeUp(0.1)} className="flex gap-4 mb-8">
            <AnimatedBadge text="JOIN NOW" color="accent" />
            <AnimatedBadge text="FREE FOREVER" color="secondary" />
          </motion.div>

          <motion.h2 {...fadeUp(0.2)} className="font-graffiti text-5xl md:text-7xl italic font-bold mb-6 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-transparent">
            Start Your Journey
          </motion.h2>

          <motion.p {...fadeUp(0.3)} className="font-graffiti text-[hsl(var(--muted-foreground))] text-lg mb-10">
            Join the most vibrant community of writers and readers on the internet.
          </motion.p>

          <motion.div {...fadeUp(0.4)} className="flex flex-col sm:flex-row gap-4">
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="font-graffiti bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(325,100%,50%)] text-white rounded-lg px-8 py-3.5 font-bold neon-glow-pink">
              Subscribe Now
            </motion.button>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="font-graffiti liquid-glass rounded-lg px-8 py-3.5 font-bold text-white hover:text-[hsl(var(--secondary))] transition-colors">
              Start Writing
            </motion.button>
          </motion.div>

          <motion.div {...fadeUp(0.5)} className="flex gap-4 mt-8">
            <GraffitiTag text="NO CREDIT CARD" color="accent" rotate={-3} />
            <GraffitiTag text="INSTANT ACCESS" color="secondary" rotate={5} />
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━ FOOTER ━━━━━━━━ */}
      <footer className="py-12 px-8 md:px-28 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
        <p className="font-graffiti text-[hsl(var(--muted-foreground))] text-sm relative z-10">© 2026 Mindloop. All rights reserved.</p>
        <div className="flex gap-6 relative z-10">
          {['Privacy', 'Terms', 'Contact'].map(link => (
            <a key={link} href="#" className="font-graffiti text-[hsl(var(--muted-foreground))] text-sm hover:text-[hsl(var(--primary))] transition-colors">{link}</a>
          ))}
        </div>
      </footer>

    </div>
  );
}
