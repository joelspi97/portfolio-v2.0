import './case-study.scss';

import { useId, useState, type ReactElement } from 'react';

import { AnimatedArticle } from '../reusable/AnimatedArticle';
import type { CaseStudyProps } from './CaseStudy.types';

export function CaseStudy(props: CaseStudyProps): ReactElement {
  const { body, description, href, slideFromTheLeft, logoSrc, name, stack } = props;

  const [showMore, setShowMore] = useState<boolean>(false);
  const bodyId = useId();

  return (
    <AnimatedArticle 
      className='case-study' 
      slideFromTheLeft={slideFromTheLeft} 
      style={{ width: showMore ? "100%" : "fit-content" }}
    >
      <div className='case-study__heading-wrapper'>
        <img alt='' decoding='async' height={40} loading='lazy' src={logoSrc} width={40} />
      </div>

      <h3>
        <a href={href} rel='noreferrer' target='_blank'>
          {name}
          <span className='sr-only'>, opens in a new tab.</span>
        </a>
      </h3>

      <div>
        <h4 className='sr-only'>Technologies used in the {name} case study:</h4>

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
        onClick={() => setShowMore(prevValue => !prevValue)}
        type='button'
      >
        Show {showMore ? 'less' : 'more'}
      </button>

      {showMore ? (
        <section className='case-study__body' id={bodyId}>
          {body}
        </section>
      ) : undefined}
    </AnimatedArticle>
  );
}
