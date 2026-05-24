import type { ReactElement } from 'react';

import { motion, useReducedMotion } from 'framer-motion';

type AnimatedDivProps = {
  children: ReactElement | string | (ReactElement | string)[];
  elementClassName?: string;
};

export function AnimatedDiv(props: AnimatedDivProps): ReactElement {
  const { children, elementClassName } = props;

  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={elementClassName}
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      transition={shouldReduceMotion ? undefined : { delay: 0.25, duration: 0.55 }}
      viewport={{ once: true }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1 }}
    >
      {children}
    </motion.div>
  );
}
