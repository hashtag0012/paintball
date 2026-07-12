import { motion } from 'framer-motion';

const reviews = [
  { img: '/team.png', name: "Bodmosh gang", text: "Finally We Played" },
  { img: '/pari.png', name: "Pari", text: "I am a warrior" },
  { img: '/fun.png', name: "Boys", text: "Paintball is fun :D" },
  { img: '/dich.png', name: "Legend", text: "Dishkeww!" },
];

export function Gallery() {
  return (
    <section id="gallery" className="relative w-full py-24 md:py-32 bg-[#0d0d0f] overflow-hidden">
      {/* Background Splatters */}
      <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none" style={{
        backgroundImage: 'url("/Gemini_Generated_Image_v4k3oav4k3oav4k3 (1).png")',
        backgroundSize: 'cover', backgroundPosition: 'center',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center">
        
        <h2 className="font-graffiti text-6xl md:text-8xl text-white mb-16 paint-drip-effect text-center tracking-widest">
          FIELD REPORTS
        </h2>

        {/* Scattered Polaroids Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 w-full place-items-center">
          {reviews.map((review, i) => {
            // Random rotation between -6deg and 6deg
            const rotation = (i % 2 === 0 ? 1 : -1) * (Math.random() * 6 + 3);
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex flex-col max-w-[400px] w-full items-center"
                style={{ rotate: rotation }}
              >
                {/* Photo (without container, since the image itself is a polaroid) */}
                <img 
                  src={review.img} 
                  alt={review.name} 
                  className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] mb-6" 
                />
                
                {/* Review Text beneath the polaroid */}
                <div className="flex flex-col items-center text-center px-4">
                  <p className="font-graffiti text-white text-2xl md:text-3xl leading-snug mb-2 drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]" style={{ WebkitTextStroke: '1px black', textShadow: '2px 2px 0 #000' }}>
                    "{review.text}"
                  </p>
                  <span className="font-adrip text-[hsl(var(--primary))] text-3xl md:text-4xl drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]" style={{ WebkitTextStroke: '1px black', textShadow: '2px 2px 0 #000' }}>
                    - {review.name}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  );
}
