import type { ReactElement } from 'react';

import { motion, useReducedMotion } from 'framer-motion';

type AnimatedDivProps = {
  children?: ReactElement | string | undefined | (ReactElement | string | undefined)[];
  className?: string;
};

export function AnimatedDiv(props: AnimatedDivProps): ReactElement {
  const { children, className } = props;

  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0.01 }}
      transition={shouldReduceMotion ? undefined : { delay: 0.1, duration: 0.55 }}
      viewport={shouldReduceMotion ? undefined : { once: true }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1 }}
    >
      {children}
    </motion.div>
  );
}
