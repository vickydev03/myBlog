// hooks/useLenis.ts
"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.4,
      lerp: 0.1,
      smoothWheel: true,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      //   direction: "vertical",
      //   gestureDirection: "vertical",
      //   mouseMultiplier: 1,
      // smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
};
