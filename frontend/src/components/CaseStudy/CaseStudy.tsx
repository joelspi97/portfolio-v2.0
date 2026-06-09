import './case-study.scss';

import { useEffect, useId, useRef, useState, type ReactElement } from 'react';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import { AnimatedArticle } from '../reusable/AnimatedArticle';
import type { CaseStudyProps } from './CaseStudy.types';

export function CaseStudy(props: CaseStudyProps): ReactElement {
  const { body, description, href, slideFromTheLeft, logoSrc, name, stack } = props;

  const [showMore, setShowMore] = useState<boolean>(false);
  const [showBody, setShowBody] = useState<boolean>(false);
  const bodyId = useId();
  const closeTimeout = useRef<number | undefined>(undefined);
  const shouldReduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect((): (() => void) => {
    return (): void => window.clearTimeout(closeTimeout.current);
  }, []);

  function toggleBody(): void {
    if (showMore) {
      setShowMore(false);

      if (shouldReduceMotion) {
        setShowBody(false);
      } else {
        closeTimeout.current = window.setTimeout((): void => {
          setShowBody(false);
          closeTimeout.current = undefined;
        }, 280);
      }

      return;
    }

    window.clearTimeout(closeTimeout.current);
    closeTimeout.current = undefined;
    setShowBody(true);
    setShowMore(true);
  }

  return (
    <AnimatedArticle 
      className='case-study' 
      slideFromTheLeft={slideFromTheLeft} 
    >
      <img alt='' className='case-study__logo' decoding='async' height={40} loading='lazy' src={logoSrc} width={40} />

      <h3 className='case-study__title'>
        <a aria-label={`${name}, opens in a new tab.`} href={href} rel='noreferrer' target='_blank'>
          {name}
        </a>
      </h3>

      <div className='case-study__meta'>
        <span className='case-study__stack-label'>Technologies:</span>

        <ul className='case-study__stack'>
          {stack.map((language: string, index: number): ReactElement => {
            if (index === 0) return <li key={language}>{language} |</li>;
            if (stack.length > index + 1) return <li key={language}>{' '}{language} |</li>;
            return <li key={language}> {language}</li>;
          })}
        </ul>
      </div>

      <div className='case-study__description'>
        {description}
      </div>

      <button
        aria-controls={bodyId}
        aria-expanded={showMore}
        aria-label={`Show ${showMore ? "less" : "more"} information about the ${name} case study.`}
        className='case-study__button'
        onClick={toggleBody}
        type='button'
      >
        Show {showMore ? 'less' : 'more'}
      </button>

      {showBody ? (
        <section
          aria-hidden={!showMore}
          className={`case-study__body${showMore ? '' : ' case-study__body--closing'}`}
          id={bodyId}
          inert={!showMore ? true : undefined}
        >
          {body}
        </section>
      ) : undefined}
    </AnimatedArticle>
  );
}
