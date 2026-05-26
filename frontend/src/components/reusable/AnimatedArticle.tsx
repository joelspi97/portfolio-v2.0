import { motion, useReducedMotion } from 'framer-motion';
import type { ReactElement } from 'react';

type AnimatedArticle = {
  children?: ReactElement | string | undefined | (ReactElement | string | undefined)[];
  className?: string;
  isOnTheLeft?: boolean;
};

export function AnimatedArticle(props: AnimatedArticle): ReactElement {
  const { children, className, isOnTheLeft } = props;

  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      className={className}
      initial={
        shouldReduceMotion
          ? false
          : isOnTheLeft ? { opacity: 0, x: -100 } : { opacity: 0, x: 100 }
      }
      transition={shouldReduceMotion ? undefined : { delay: 0.1, duration: 0.5 }}
      viewport={shouldReduceMotion ? undefined : { once: true }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
    >
      {children}
    </motion.article>
  );
}
