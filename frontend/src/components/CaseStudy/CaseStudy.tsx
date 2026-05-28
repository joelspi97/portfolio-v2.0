import './case-study.scss';

import { useId, useState, type ReactElement } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { AnimatedArticle } from '../reusable/AnimatedArticle';
import type { CaseStudyProps } from './CaseStudy.types';

export function CaseStudy(props: CaseStudyProps): ReactElement {
  const { body, description, href, slideFromTheLeft, logoSrc, name, stack } = props;

  const [showMore, setShowMore] = useState<boolean>(false);
  const bodyId = useId();
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatedArticle 
      className='case-study' 
      slideFromTheLeft={slideFromTheLeft} 
    >
      <img alt='' className='case-study__logo' decoding='async' height={40} loading='lazy' src={logoSrc} width={40} />

      <h3 className='case-study__title'>
        <a href={href} rel='noreferrer' target='_blank'>
          {name}
          <span className='sr-only'>, opens in a new tab.</span>
        </a>
      </h3>

      <div className='case-study__meta'>
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

      <AnimatePresence initial={false}>
        {showMore ? (
          <motion.section
            animate={shouldReduceMotion ? undefined : { opacity: 1 }}
            className='case-study__body'
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            id={bodyId}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.28, ease: 'easeOut' }}
          >
            {body}
          </motion.section>
        ) : undefined}
      </AnimatePresence>
    </AnimatedArticle>
  );
}
