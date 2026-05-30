import type { ReactElement } from 'react';

import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';

type AnimatedDivProps = {
  children?: ReactElement | string | undefined | (ReactElement | string | undefined)[];
  className?: string;
};

export function AnimatedDiv(props: AnimatedDivProps): ReactElement {
  const { children, className } = props;

  const { isVisible, ref } = useRevealOnScroll<HTMLDivElement>();

  return (
    <div
      className={`reveal reveal--fade${isVisible ? ' reveal--visible' : ''}${className ? ` ${className}` : ''}`}
      ref={ref}
    >
      {children}
    </div>
  );
}
