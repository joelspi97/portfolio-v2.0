import './project.scss';

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

type ProjectProps = {
  body: string | ReactElement; 
  description: string | ReactElement;
  isOnTheLeft?: boolean;
  logoSrc: string;
  name: string;
  stack: stackOptions[];
};

export function Project(props: ProjectProps): ReactElement {
  const { body, description, isOnTheLeft, logoSrc, name, stack } = props;

  const [hideInformation, setHideInformation] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);

  useEffect((): void => {
    setHideInformation(false);
    setTimeout((): void => setHideInformation(true), 1);
  }, [showMore]);

  return (
    <AnimatedArticle className='project' isOnTheLeft={isOnTheLeft}>
      <div className='project__heading-wrapper'>
        <img alt='' decoding='async' height={40} loading='lazy' src={logoSrc} width={40} />
      </div>

      <h3>{name}</h3>

      <div>
        <h4 className='sr-only'>Technologies used in the {name} project:</h4>

        <ul className='project__stack'>
          {stack.map((language: string, index: number): ReactElement => {
            if (index === 0) return <li key={language}>{language} |</li>;
            if (stack.length > index + 1) return <li key={language}>{' '}{language} |</li>;
            return <li key={language}> {language}</li>;
          })}
        </ul>
      </div>

      <div className='project__description'>
        {description}
      </div>

      <button
        aria-label={`Show ${showMore ? "less" : "more"} information about the ${name} project.`}
        className='project__button'
        onClick={() => setShowMore(prevValue => !prevValue)}
        type='button'
      >
        Show {showMore ? 'less' : 'more'}
      </button>

      {showMore && (
        <section className='project__body'>
          <span className='sr-only' aria-live='polite' aria-hidden={hideInformation}>
            Extra information about the {name} project has been displayed below the button.
          </span>

          {body}
        </section>
      )}
    </AnimatedArticle>
  );
}
