import type { ReactElement } from 'react';
import { motion } from 'framer-motion';

interface IAnimatedDivProps {
  children: ReactElement | string | (ReactElement | string)[];
  elementClassName?: string;
}

export function AnimatedDiv(props: IAnimatedDivProps) {
  const { children, elementClassName } = props;

  return (
    <motion.div
      className={elementClassName}
      initial={{ opacity: 0 }}
      transition={{ delay: 0.25, duration: 0.55 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1 }}
    >
      { children }
    </motion.div>
  );
}
