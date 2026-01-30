"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Reveal({ children }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true, 
    threshold: 0.2, 
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target); 
        }
      });
    }, options || { threshold: 0.3 });

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [options]);

  return [ref, inView];
}

// trigger on up and down scrolls version
// "use client";
// import { motion, useAnimation } from "framer-motion";
// import { useEffect, useRef, useState } from "react";

// export default function Reveal({ children }) {
//   const controls = useAnimation();

//   const [ref, inView] = useInView({
//     threshold: 0.2,
//   });

//   useEffect(() => {
//     if (inView) controls.start("visible");
//     else controls.start("hidden");
//   }, [inView, controls]);

//   const variants = {
//     hidden: { opacity: 0, y: 100 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.8, ease: "easeOut" },
//     },
//   };

//   return (
//     <motion.div
//       ref={ref}
//       initial="hidden"
//       animate={controls}
//       variants={variants}
//     >
//       {children}
//     </motion.div>
//   );
// }

// export function useInView(options) {
//   const ref = useRef(null);
//   const [inView, setInView] = useState(false);

//   useEffect(() => {
//     if (!ref.current) return;

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) setInView(true);
//         else setInView(false);
//       });
//     }, options || { threshold: 0.3 });

//     observer.observe(ref.current);

//     return () => observer.disconnect();
//   }, [options]);

//   return [ref, inView];
// }


