import type { ReactElement } from 'react';

import { motion, useReducedMotion } from 'framer-motion';

type AnimatedDivProps = {
  animationDelay?: number;
  children?: ReactElement | string | undefined | (ReactElement | string | undefined)[];
  className?: string;
};

export function AnimatedDiv(props: AnimatedDivProps): ReactElement {
  const { animationDelay = 0.1, children, className } = props;

  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      transition={shouldReduceMotion ? undefined : { delay: animationDelay, duration: 0.55 }}
      viewport={shouldReduceMotion ? undefined : { once: true }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1 }}
    >
      {children}
    </motion.div>
  );
}
