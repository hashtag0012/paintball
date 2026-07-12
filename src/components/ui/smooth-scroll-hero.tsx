"use client";
import * as React from "react";
import {
	motion,
	useMotionTemplate,
	useScroll,
	useTransform,
} from "framer-motion";

interface iISmoothScrollHeroProps {
	/**
	 * Height of the scroll section in pixels
	 * @default 1500
	 */
	scrollHeight?: number;
	/**
	 * Video URL for the background
	 */
	videoSrc?: string;
	/**
	 * Background image URL for desktop view (fallback)
	 */
	desktopImage?: string;
	/**
	 * Background image URL for mobile view (fallback)
	 */
	mobileImage?: string;
	/**
	 * Initial clip path percentage
	 * @default 25
	 */
	initialClipPercentage?: number;
	/**
	 * Final clip path percentage
	 * @default 75
	 */
	finalClipPercentage?: number;
    title?: string;
}

const SmoothScrollHeroBackground: React.FC<iISmoothScrollHeroProps> = ({
	scrollHeight = 1500,
	videoSrc,
	desktopImage = "https://images.unsplash.com/photo-1511884642898-4c92249e20b6",
	mobileImage = "https://images.unsplash.com/photo-1511207538754-e8555f2bc187?q=80&w=2412&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	initialClipPercentage = 25,
	finalClipPercentage = 75,
    title
}) => {
    // Since this component assumes scrollY (absolute pixel value), we can use useScroll()
    const { scrollY } = useScroll();
    
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [startOffset, setStartOffset] = React.useState(0);

    React.useEffect(() => {
        const updateOffset = () => {
            if (containerRef.current) {
                // Get exact distance from top of document
                const rect = containerRef.current.getBoundingClientRect();
                setStartOffset(rect.top + window.scrollY);
            }
        };
        updateOffset();
        window.addEventListener('resize', updateOffset);
        return () => window.removeEventListener('resize', updateOffset);
    }, []);

	const clipStart = useTransform(
		scrollY,
		[startOffset, startOffset + scrollHeight],
		[initialClipPercentage, 0],
	);
	const clipEnd = useTransform(
		scrollY,
		[startOffset, startOffset + scrollHeight],
		[finalClipPercentage, 100],
	);

	const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;

	const backgroundSize = useTransform(
		scrollY,
		[startOffset, startOffset + scrollHeight],
		["170%", "100%"],
	);
    const scale = useTransform(scrollY, [startOffset, startOffset + scrollHeight], [1.7, 1]);
    
    // We also want to fade out the title as it zooms in
    const titleOpacity = useTransform(scrollY, [startOffset, startOffset + scrollHeight * 0.4], [1, 0]);
    const titleY = useTransform(scrollY, [startOffset, startOffset + scrollHeight * 0.4], [0, -50]);

	return (
		<div ref={containerRef} style={{height: `calc(${scrollHeight}px + 100vh)`}} className="relative w-full z-20">
            <motion.div
                className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center pointer-events-none"
                style={{
                    clipPath,
                    willChange: "transform, opacity, clip-path",
                }}
            >
                {/* Optional overlay/title that fades out */}
                {title && (
                    <motion.div 
                        style={{ opacity: titleOpacity, y: titleY }}
                        className="absolute z-20 top-[30%] flex justify-center w-full pointer-events-none"
                    >
                        <h2
                            className="font-adrip text-6xl md:text-8xl lg:text-9xl text-white uppercase tracking-wide paint-drip-effect select-none text-center"
                            style={{ textShadow: '4px 4px 0 hsl(var(--secondary))' }}
                        >
                            {title}
                        </h2>
                    </motion.div>
                )}
                
                {/* Media background */}
                {videoSrc ? (
                    <div className="absolute inset-0 w-full h-full z-0">
                        <motion.video 
                            src={videoSrc}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                            style={{ scale }}
                        />
                        {/* Layered overlays to blend the video with the dark foggy theme */}
                        <div className="absolute inset-0 bg-black/50 pointer-events-none z-10" />
                        <div className="absolute inset-0 pointer-events-none z-10" style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 35%, rgba(0,0,0,0.75) 100%)' }} />
                        <div className="absolute inset-0 pointer-events-none z-10" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 10%, transparent 25%, transparent 75%, rgba(0,0,0,0.3) 90%, rgba(0,0,0,1) 100%)' }} />
                    </div>
                ) : (
                    <div className="absolute inset-0 w-full h-full z-0">
                        <motion.div
                            className="absolute inset-0 md:hidden"
                            style={{
                                backgroundImage: `url(${mobileImage})`,
                                backgroundSize,
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                        />
                        <motion.div
                            className="absolute inset-0 hidden md:block"
                            style={{
                                backgroundImage: `url(${desktopImage})`,
                                backgroundSize,
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                        />
                        {/* Layered overlays to blend the fallback image with the dark foggy theme */}
                        <div className="absolute inset-0 bg-black/50 pointer-events-none z-10" />
                        <div className="absolute inset-0 pointer-events-none z-10" style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 35%, rgba(0,0,0,0.75) 100%)' }} />
                        <div className="absolute inset-0 pointer-events-none z-10" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 10%, transparent 25%, transparent 75%, rgba(0,0,0,0.3) 90%, rgba(0,0,0,1) 100%)' }} />
                    </div>
                )}
            </motion.div>
		</div>
	);
};

export default SmoothScrollHeroBackground;
