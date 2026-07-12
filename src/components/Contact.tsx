import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay } },
});

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.65, ease } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.65, ease } },
};

export function Contact() {
  return (
    <section id="contact" className="relative py-12 px-4 md:px-8 lg:px-12 bg-black overflow-hidden flex justify-center items-center">
      <div className="absolute inset-0 z-[1] opacity-15 pointer-events-none" style={{
        backgroundImage: 'url("/Gemini_Generated_Image_v4k3oav4k3oav4k3 (1).webp")',
        backgroundSize: 'cover', backgroundPosition: 'center',
      }} />
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 25%, rgba(0,0,0,0.85) 100%)' }} />
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, transparent 15%, transparent 85%, rgba(0,0,0,1) 100%)' }} />

      <motion.div
        className="relative z-10 max-w-4xl w-full flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-12 bg-[#0d0d0f]/85 p-4 md:p-6 lg:p-14 border-2 border-[hsl(var(--primary))] shadow-[8px_8px_0_hsl(var(--primary))]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease }}
      >
        {/* Left: info */}
        <motion.div className="flex-1 space-y-5"
          variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="font-graffiti text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-white tracking-widest paint-drip-effect text-center md:text-left" style={{ WebkitTextStroke: '2px black' }}>
            HIT US UP
          </h2>
          <p className="font-graffiti text-white/90 text-sm sm:text-base md:text-lg lg:text-2xl leading-relaxed text-center md:text-left" style={{ WebkitTextStroke: '1px black', textShadow: '2px 2px 0 #000' }}>
            Got questions or ready to book? Drop us a line and our squad will get back to you fast.
          </p>

          <div className="space-y-2.5 pt-2 font-graffiti text-white" style={{ WebkitTextStroke: '1px black', textShadow: '1px 1px 0 #000' }}>
            {([
              { icon: '📍', content: <span className="text-sm sm:text-base md:text-lg lg:text-xl">Zero Bridge, Rajbagh, Srinagar, Kashmir</span> },
              { icon: '📞', content: <a href="tel:+919796509000" className="hover:text-[hsl(var(--primary))] transition-colors text-sm sm:text-base md:text-lg lg:text-xl">+91 97965 09000</a> },
              { icon: '📞', content: <a href="tel:+919876543210" className="hover:text-[hsl(var(--primary))] transition-colors text-sm sm:text-base md:text-lg lg:text-xl">+91 98765 43210</a> },
              { icon: '✉️', content: <a href="mailto:headshotentertainmentcenter@gmail.com" className="hover:text-[hsl(var(--primary))] transition-colors break-all leading-snug text-xs sm:text-sm md:text-base lg:text-lg">headshotentertainmentcenter@gmail.com</a> },
            ] as { icon: string; content: React.ReactNode }[]).map(({ icon, content }, i) => (
              <motion.div key={i} className="flex items-start gap-2 md:gap-3 text-sm sm:text-base md:text-lg lg:text-xl"
                variants={fadeUp(i * 0.08)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}
              >
                <span className="shrink-0 mt-0.5 text-xl sm:text-2xl text-[hsl(var(--primary))]">{icon}</span>
                {content}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.div className="flex-1 w-full"
          variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-100px' }}
        >
          <form className="flex flex-col gap-4 font-graffiti" style={{ WebkitTextStroke: '1px black' }}>
            <motion.input type="text" placeholder="Your Name"
              className="w-full bg-black/60 border border-[hsl(var(--primary))]/30 rounded p-3 md:p-4 text-white text-base sm:text-lg md:text-xl placeholder:text-white/80 focus:border-[hsl(var(--primary))] focus:outline-none transition-colors"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1, ease }}
            />
            <motion.input type="email" placeholder="Your Email"
              className="w-full bg-black/60 border border-[hsl(var(--primary))]/30 rounded p-3 md:p-4 text-white text-base sm:text-lg md:text-xl placeholder:text-white/80 focus:border-[hsl(var(--primary))] focus:outline-none transition-colors"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2, ease }}
            />
            <motion.textarea placeholder="Tell us about your booking or question..." rows={3}
              className="w-full bg-black/60 border border-[hsl(var(--primary))]/30 rounded p-3 md:p-4 text-white text-base sm:text-lg md:text-xl placeholder:text-white/80 focus:border-[hsl(var(--primary))] focus:outline-none transition-colors resize-none"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3, ease }}
            />
            <motion.button
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-[hsl(var(--primary))] text-black font-graffiti font-bold text-base sm:text-lg md:text-xl uppercase tracking-widest py-3 md:py-3.5 rounded border-2 border-black hover:bg-white transition-colors"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
}
