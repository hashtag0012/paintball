import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * SectionSeparator
 *
 * Sits between two sections with zero layout height (overflow: visible),
 * so the sections literally touch — NO visible gap at rest.
 *
 * The animation is a 3-phase GSAP ScrollTrigger timeline scrubbed to scroll:
 *
 *   ┌─ Phase 1 (0 → 40%) ──────────────────────────────────────────┐
 *   │  Upper skull fades in from above and slides down to the       │
 *   │  midpoint where it meets the lower jaw.                       │
 *   └───────────────────────────────────────────────────────────────┘
 *   ┌─ Phase 2 (40 → 60%) ─────────────────────────────────────────┐
 *   │  Brief hold: both halves sit together forming a complete skull│
 *   └───────────────────────────────────────────────────────────────┘
 *   ┌─ Phase 3 (60 → 100%) ────────────────────────────────────────┐
 *   │  Jaws separate: upper goes up, lower goes down.               │
 *   │  A black gap expands between them (mouth-opening effect).     │
 *   └───────────────────────────────────────────────────────────────┘
 *
 * Scroll trigger: uses the #hero section as the trigger target so the
 * separator (which has no height of its own) can still react to scroll.
 *
 * The `triggerId` prop lets the first separator use "hero", while
 * later separators use their own preceding section ID.
 */

interface SectionSeparatorProps {
  /** ID of the preceding section element to use as the scroll trigger. */
  triggerId?: string;
}

export function SectionSeparator({ triggerId = 'hero' }: SectionSeparatorProps) {
  const upperRef = useRef<HTMLImageElement>(null);
  const lowerRef = useRef<HTMLImageElement>(null);
  const gapRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!upperRef.current || !lowerRef.current || !gapRef.current) return;

    const ctx = gsap.context(() => {
      // ── INITIAL STATE ──────────────────────────────────────────────
      // Upper skull: 70px above the seam, invisible
      gsap.set(upperRef.current, { y: -70, opacity: 0 });
      // Lower jaw:   at the seam, fully visible
      gsap.set(lowerRef.current, { y: 0,   opacity: 1 });
      // Gap:         closed (zero height)
      gsap.set(gapRef.current,   { height: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: `#${triggerId}`,
          // Start: when the bottom of the trigger section hits 70% from top of viewport
          // (hero is still mostly on screen — skull begins to appear)
          start: 'bottom 70%',
          // End: 350px after the bottom of the trigger section exits the viewport top
          // (we're well into the next section — skull has fully opened)
          end: 'bottom top-=350',
          scrub: 1.5,   // 1.5s lag — smooth, follows scroll closely
          // markers: true, // ← uncomment to debug trigger boundaries in browser
        },
      });

      // ── PHASE 1 (0 → 40%): upper skull slides into view ────────────
      tl.to(upperRef.current, {
        y: 0,         // slides down to meet the lower jaw at the seam
        opacity: 1,   // fades in from invisible
        duration: 0.4,
        ease: 'none', // linear — follows scroll 1:1
      }, 0);

      // ── PHASE 2 (40 → 60%): hold — complete skull visible ──────────
      // (empty tween creates a pause in the timeline proportion)
      tl.to({}, { duration: 0.2 }, 0.4);

      // ── PHASE 3 (60 → 100%): jaw separation (mouth opens) ──────────
      // Upper jaw drifts UP, lower jaw drifts DOWN, gap grows between them
      tl.to(upperRef.current, {
        y: -65,              // slides back up above the seam
        duration: 0.4,
        ease: 'power2.in',  // accelerates — feels like it's being pulled away
      }, 0.6);

      tl.to(lowerRef.current, {
        y: 65,               // slides down below the seam
        duration: 0.4,
        ease: 'power2.in',
      }, 0.6); // ← '<' or same offset to run in parallel with upper

      tl.to(gapRef.current, {
        height: 80,          // a dark gap expands between the two sections
        duration: 0.4,
        ease: 'power2.in',
      }, 0.6);
    });

    return () => ctx.revert(); // clean up all ScrollTriggers on unmount
  }, [triggerId]);

  return (
    /**
     * Outer wrapper: height = 0, overflow = visible
     *   → sections touch (no layout gap)
     *   → skull images overflow visually into neighbouring sections
     */
    <div
      className="relative w-full z-30 flex justify-center pointer-events-none"
      style={{ height: 0, overflow: 'visible' }}
    >
      {/*
        UPPER SKULL
        Anchored so its bottom edge sits at the seam (bottom: 0).
        GSAP starts it 70px above (y: -70, opacity: 0) and brings it down.
      */}
      <img
        ref={upperRef}
        src="/upper.png"
        alt=""
        className="absolute select-none will-change-transform"
        style={{
          bottom: 0,
          height: '130px',
          objectFit: 'contain',
          filter: 'drop-shadow(0 -8px 20px rgba(0,0,0,0.85))',
        }}
        draggable={false}
      />

      {/*
        LOWER JAW
        Anchored so its top edge sits at the seam (top: 0).
        Starts visible, GSAP pushes it down in Phase 3.
      */}
      <img
        ref={lowerRef}
        src="/lower.png"
        alt=""
        className="absolute select-none will-change-transform"
        style={{
          top: 0,
          height: '98px',
          objectFit: 'contain',
          objectPosition: 'top center',
          transform: 'scale(0.75)',
          transformOrigin: 'top center',
          filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.85))',
        }}
        draggable={false}
      />

      {/*
        BLACK GAP
        Centered at the seam. Height starts at 0 and grows in Phase 3
        to visually push the two skull halves further apart.
        The –translate-y-1/2 keeps it centered on the seam.
      */}
      <div
        ref={gapRef}
        className="absolute w-full bg-black"
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
          height: 0,
        }}
      />
    </div>
  );
}

