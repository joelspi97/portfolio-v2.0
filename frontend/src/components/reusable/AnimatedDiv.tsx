import type { ReactElement } from 'react';

import { motion } from 'framer-motion';

type AnimatedDivProps = {
  children?: ReactElement | string | (ReactElement | string)[];
  className?: string;
};

export function AnimatedDiv(props: AnimatedDivProps): ReactElement {
  const { children, className } = props;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      transition={{ delay: 0.25, duration: 0.55 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1 }}
    >
      {children}
    </motion.div>
  );
}
