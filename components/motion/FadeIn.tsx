"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

export function FadeIn({
  children,
  className,
  delay = 0,
  animateOnMount = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animateOnMount?: boolean;
}) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR + first paint: show content immediately (avoids hydration mismatch & invisible hero)
  if (!mounted || reduce) {
    return <div className={className}>{children}</div>;
  }

  if (animateOnMount) {
    return (
      <motion.div
        className={cn(className)}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}
