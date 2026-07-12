import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

// Smooth-scroll helper
function scrollTo(id: string) {
  const el = document.querySelector(id);
  if (!el) return;
  const offset = 80; // Account for fixed navbar
  const elementPosition = el.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

export function Hero() {
  const skeletonRef = useRef<HTMLDivElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);

  // Video scrubbing state
  const targetTime = useRef<number>(0);
  const isSeeking  = useRef<boolean>(false);

  useEffect(() => {
    const xTo = gsap.quickTo(skeletonRef.current, 'x', {
      duration: 0.6,
      ease: 'power3.out',
    });
    const yTo = gsap.quickTo(skeletonRef.current, 'y', {
      duration: 0.6,
      ease: 'power3.out',
    });
    const rotateYTo = gsap.quickTo(skeletonRef.current, 'rotateY', {
      duration: 0.7,
      ease: 'power3.out',
    });
    const rotateXTo = gsap.quickTo(skeletonRef.current, 'rotateX', {
      duration: 0.7,
      ease: 'power3.out',
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth: W, innerHeight: H } = window;

      const nx = gsap.utils.clamp(-1, 1, gsap.utils.mapRange(0, W, -1, 1, e.clientX));
      const ny = gsap.utils.clamp(-1, 1, gsap.utils.mapRange(0, H, -1, 1, e.clientY));

      xTo(nx * 30);
      yTo(ny * 20);
      rotateYTo(nx * 25);
      rotateXTo(-ny * 15);

      if (!videoRef.current?.duration) return;
      const percent = 1 - (e.clientX / W);
      const maxTime = videoRef.current.duration - 0.05;
      targetTime.current = Math.min(Math.max(percent * maxTime, 0), maxTime);
      if (!isSeeking.current) {
        isSeeking.current = true;
        videoRef.current.currentTime = targetTime.current;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.killTweensOf(skeletonRef.current);
    };
  }, []);

  const handleSeeked = () => {
    if (!videoRef.current) return;
    if (Math.abs(videoRef.current.currentTime - targetTime.current) > 0.05) {
      videoRef.current.currentTime = targetTime.current;
    } else {
      isSeeking.current = false;
    }
  };

  return (
    <section id="hero" className="relative min-h-[100svh] flex flex-col justify-center items-center overflow-hidden pt-20 pb-12 md:pt-32 md:pb-20">

      {/* ── Background Video ── */}
      <video
        ref={videoRef}
        src="/upscaled-video (1).mp4"
        poster="/aurora-bg.webp"
        muted
        playsInline
        preload="auto"
        onSeeked={handleSeeked}
        className="absolute inset-0 w-full h-full object-cover z-0 scale-[1.05]"
        style={{ objectPosition: '70% 30%' }}
      />

      {/* ── Overlays (layered, foggy mist effect) ── */}

      {/* 1. Base dark film */}
      <div className="absolute inset-0 z-[1] bg-black/50 pointer-events-none" />

      {/* 2. Radial vignette — darkens edges, keeps centre vivid */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 35%, rgba(0,0,0,0.75) 100%)',
        }}
      />

      {/* 3. Vertical edge fades — top & bottom dissolve into the adjacent sections */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 18%, transparent 78%, rgba(0,0,0,0.90) 100%)',
        }}
      />

      {/* ── Foreground content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">

        {/* Left: Text */}
        <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start space-y-5 md:space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1
              className="font-adrip text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight paint-drip-effect text-center md:text-left"
              style={{
                color: 'hsl(var(--primary))',
                WebkitTextStroke: '2px #fff',
                textShadow: '4px 6px 0 rgba(0,0,0,0.85)',
              }}
            >
              HEADSHOT<br />
              <span
                style={{
                  color: '#000',
                  WebkitTextStroke: '2px hsl(var(--primary))',
                  textShadow: '4px 6px 0 rgba(0,0,0,0.85)',
                }}
                className="neon-glow-pink"
              >PAINTBALL</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-graffiti text-base sm:text-lg md:text-2xl lg:text-3xl text-white max-w-lg leading-tight px-4 md:px-0 text-center md:text-left"
            style={{ WebkitTextStroke: '1px black', textShadow: '2px 2px 0 #000' }}
          >
            The most adrenaline-fueled arena in Kashmir.<br />
            Gear up, aim true, and leave your mark.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 200, damping: 15 }}
          >
            <button 
              onClick={() => scrollTo('#contact')}
              className="font-graffiti text-lg sm:text-xl md:text-2xl uppercase tracking-widest bg-[hsl(var(--primary))] text-black px-6 sm:px-8 md:px-10 py-3 sm:py-4 hover:bg-white hover:text-black transition-colors duration-300 transform hover:-translate-y-1 shadow-[8px_8px_0_hsl(var(--accent))] border-2 border-black cursor-pointer"
            >
              Book a Game
            </button>
          </motion.div>
        </div>

        {/* Right: Empty spacer for layout balance since background video is the main visual */}
        <div className="hidden md:flex flex-1 justify-center items-center w-full min-h-[400px] lg:min-h-[500px]">
        </div>
      </div>
    </section>
  );
}
