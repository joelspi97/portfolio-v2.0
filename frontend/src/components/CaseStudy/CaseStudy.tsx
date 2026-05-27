import './case-study.scss';

import { useEffect, useState, type ReactElement } from 'react';

import { AnimatedArticle } from '../reusable/AnimatedArticle';

export enum stackOptions {
  angular = 'Angular',
  javaScript = 'JavaScript',
  nestJs = 'NestJS', 
  nodeJs = 'Node.js', 
  postgreSql = 'PostgreSQL', 
  react = 'React',
  redux = 'Redux', 
  spfx = 'SPFx', 
  typeScript = 'TypeScript',
  wcag = 'WCAG'
}

type CaseStudyProps = {
  body: string | ReactElement; 
  description: string | ReactElement;
  isOnTheLeft?: boolean;
  logoSrc: string;
  name: string;
  stack: stackOptions[];
};

export function CaseStudy(props: CaseStudyProps): ReactElement {
  const { body, description, isOnTheLeft, logoSrc, name, stack } = props;

  const [hideInformation, setHideInformation] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);

  useEffect((): void => {
    setHideInformation(false);
    setTimeout((): void => setHideInformation(true), 1);
  }, [showMore]);

  return (
    <AnimatedArticle className='case-study' isOnTheLeft={isOnTheLeft}>
      <div className='case-study__heading-wrapper'>
        <img alt='' decoding='async' height={40} loading='lazy' src={logoSrc} width={40} />
      </div>

      <h3>{name}</h3>

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
        aria-label={`Show ${showMore ? "less" : "more"} information about the ${name} case study.`}
        className='case-study__button'
        onClick={() => setShowMore(prevValue => !prevValue)}
        type='button'
      >
        Show {showMore ? 'less' : 'more'}
      </button>

      {showMore ? (
        <section className='case-study__body'>
          <span className='sr-only' aria-live='polite' aria-hidden={hideInformation}>
            Extra information about the {name} case study has been displayed below the button.
          </span>

          {body}
        </section>
      ) : undefined}
    </AnimatedArticle>
  );
}
