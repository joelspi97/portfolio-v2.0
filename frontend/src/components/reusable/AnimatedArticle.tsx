import type { ReactElement } from 'react';

import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';

type AnimatedArticle = {
  children?: ReactElement | string | undefined | (ReactElement | string | undefined)[];
  className?: string;
  slideFromTheLeft?: boolean;
  style?: Record<string, string>;
};

export function AnimatedArticle(props: AnimatedArticle): ReactElement {
  const { children, className, slideFromTheLeft, style } = props;

  const { isVisible, ref } = useRevealOnScroll<HTMLElement>();

  return (
    <article
      className={`reveal reveal--slide reveal--from-${slideFromTheLeft ? 'left' : 'right'}${isVisible ? ' reveal--visible' : ''}${className ? ` ${className}` : ''}`}
      ref={ref}
      style={style ? style : undefined}
    >
      {children}
    </article>
  );
}
