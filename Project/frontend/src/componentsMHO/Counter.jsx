"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "./RevealOnScroll";

function Counter({ value, prefix }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (inView) {
      count.set(0);

      const controls = animate(count, value, {
        duration: 4,
        ease: [0.16, 1, 0.3, 1],
      });

      const unsubscribe = rounded.on("change", (latest) => {
        setDisplayValue(latest);
      });

      return () => {
        unsubscribe();
        controls.stop();
      };
    }
  }, [inView, value, count, rounded]);

  return (
    <motion.span ref={ref}>
      <noscript>{prefix}{value.toLocaleString()}+</noscript>
      {prefix}
      {displayValue.toLocaleString()}+
    </motion.span>
  );
}

export default Counter;
