import { motion, useReducedMotion } from 'framer-motion';
import type { ReactElement } from 'react';

type AnimatedArticle = {
  children?: ReactElement | string | undefined | (ReactElement | string | undefined)[];
  className?: string;
  slideFromTheLeft?: boolean;
  style?: Record<string, string>;
};

export function AnimatedArticle(props: AnimatedArticle): ReactElement {
  const { children, className, slideFromTheLeft, style } = props;

  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      className={className}
      initial={
        shouldReduceMotion
          ? false
          : slideFromTheLeft ? { opacity: 0, x: -100 } : { opacity: 0, x: 100 }
      }
      style={style ? style : undefined}
      transition={shouldReduceMotion ? undefined : { delay: 0.1, duration: 0.5 }}
      viewport={shouldReduceMotion ? undefined : { once: true }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
    >
      {children}
    </motion.article>
  );
}
