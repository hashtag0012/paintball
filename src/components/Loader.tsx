import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function Loader() {
  const [phase, setPhase] = useState<'in' | 'out' | 'done'>('in');
  const t1 = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const t2 = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    // Start split after 1.8s
    t1.current = setTimeout(() => setPhase('out'), 1900);
    // Remove from DOM after animation completes
    t2.current = setTimeout(() => setPhase('done'), 2700);
    return () => { clearTimeout(t1.current); clearTimeout(t2.current); };
  }, []);

  if (phase === 'done') return null;

  const BG = "url('/Gemini_Generated_Image_v4k3oav4k3oav4k3 (1).webp')";
  const exiting = phase === 'out';

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none">

      {/* LEFT curtain — left half of background image */}
      <motion.div
        className="absolute top-0 left-0 h-full"
        style={{
          width: '50%',
          backgroundImage: BG,
          backgroundSize: '200% 100%',
          backgroundPosition: 'left center',
          backgroundRepeat: 'no-repeat',
        }}
        animate={{ x: exiting ? '-100%' : '0%' }}
        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0 }}
      />

      {/* RIGHT curtain — right half of background image */}
      <motion.div
        className="absolute top-0 right-0 h-full"
        style={{
          width: '50%',
          backgroundImage: BG,
          backgroundSize: '200% 100%',
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat',
        }}
        animate={{ x: exiting ? '100%' : '0%' }}
        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0 }}
      />

      {/* Dark tint on top of both curtains */}
      <motion.div
        className="absolute inset-0 bg-black/60"
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Center content: logo + loading text */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10"
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.img
          src="/logo.webp"
          alt="Headshot Paintball"
          className="w-44 h-44 object-contain"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'backOut' }}
        />

        <motion.p
          className="font-graffiti text-white/70 text-base uppercase tracking-[0.5em]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          Loading...
        </motion.p>

        {/* Progress bar */}
        <div className="w-52 h-[2px] bg-white/15 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'hsl(var(--primary))' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.7, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </div>
  );
}
