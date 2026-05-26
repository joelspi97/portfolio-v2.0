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
          ? { opacity: 0 }
          : isOnTheLeft ? { opacity: 0, x: -100 } : { opacity: 0, x: 100 }
      }
      transition={{ delay: 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
    >
      {children}
    </motion.article>
  );
}
