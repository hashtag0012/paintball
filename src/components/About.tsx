import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay } },
});

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

import SmoothScrollHero from './ui/smooth-scroll-hero';

export function About() {
  return (
    <section id="about" className="relative w-full"
      style={{
        backgroundImage: 'url("/Gemini_Generated_Image_sfxurysfxurysfxu (1).webp")',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 z-[1] bg-black/55 pointer-events-none" />
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 30%, rgba(0,0,0,0.70) 100%)' }} />
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 8%, transparent 20%, transparent 80%, rgba(0,0,0,0.3) 92%, rgba(0,0,0,1) 100%)' }} />

      <div className="relative z-10 flex flex-col items-center justify-center pt-16 pb-4 px-4 md:px-6">
        <motion.img src="/pari.webp"
          className="absolute top-[8%] left-[0.5%] md:left-[2%] w-40 md:w-56 lg:w-80 h-auto object-contain rotate-[-11deg] drop-shadow-[0_16px_40px_rgba(0,0,0,0.9)] select-none pointer-events-none"
          alt="" draggable={false} loading="lazy" decoding="async"
          variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}
        />
        <motion.img src="/dich.webp"
          className="absolute top-[6%] right-[0.5%] md:right-[2%] w-40 md:w-56 lg:w-80 h-auto object-contain rotate-[8deg] drop-shadow-[0_16px_40px_rgba(0,0,0,0.9)] select-none pointer-events-none"
          alt="" draggable={false} loading="lazy" decoding="async"
          variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}
        />
        <motion.img src="/fun.webp"
          className="absolute bottom-[6%] left-[0.5%] md:left-[2%] w-36 md:w-52 lg:w-72 h-auto object-contain rotate-[13deg] drop-shadow-[0_16px_40px_rgba(0,0,0,0.9)] select-none pointer-events-none"
          alt="" draggable={false} loading="lazy" decoding="async"
          variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}
        />
        <motion.img src="/team.webp"
          className="absolute bottom-[4%] right-[0.5%] md:right-[2%] w-36 md:w-52 lg:w-72 h-auto object-contain rotate-[-8deg] drop-shadow-[0_16px_40px_rgba(0,0,0,0.9)] select-none pointer-events-none"
          alt="" draggable={false} loading="lazy" decoding="async"
          variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}
        />

        <motion.div
          className="relative z-10 max-w-2xl text-center space-y-6"
          variants={fadeUp(0)}
          initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}
        >
          <h2
            className="font-adrip text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-white uppercase tracking-wide paint-drip-effect text-center"
            style={{ textShadow: '4px 4px 0 hsl(var(--secondary))' }}
          >
            About Us
          </h2>
          <p className="font-graffiti text-sm sm:text-base md:text-lg lg:text-2xl text-black leading-[2.2] text-center px-2">
            <span className="bg-[hsl(var(--primary))] px-2 py-1 box-decoration-clone uppercase">
              Headshot Paintball is Kashmir's premier adrenaline arena — where friends become rivals,
              strategy meets chaos, and every game leaves a mark.
            </span>
          </p>
          <p className="font-graffiti text-xs sm:text-sm md:text-base lg:text-xl text-black leading-[2.2] text-center px-2">
            <span className="bg-[hsl(var(--primary))] px-2 py-1 box-decoration-clone uppercase">
              From weekend warriors to corporate squads, our professional-grade equipment and
              immersive fields deliver the most intense paintball experience in the valley.
            </span>
          </p>
        </motion.div>
      </div>

      <div className="relative z-10 -mt-20 md:-mt-32">
        <SmoothScrollHero scrollHeight={1500} videoSrc="/head.mp4" initialClipPercentage={30} finalClipPercentage={70} />
      </div>
    </section>
  );
}
