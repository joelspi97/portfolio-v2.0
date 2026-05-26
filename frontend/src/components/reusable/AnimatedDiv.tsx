import type { ReactElement } from 'react';

import { motion } from 'framer-motion';

type AnimatedDivProps = {
  children?: ReactElement | string | undefined | (ReactElement | string | undefined)[];
  className?: string;
};

export function AnimatedDiv(props: AnimatedDivProps): ReactElement {
  const { children, className } = props;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1 }}
    >
      {children}
    </motion.div>
  );
}
