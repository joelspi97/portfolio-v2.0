import '../scss/components/project.scss';

import { useEffect, useState, type ReactElement } from 'react';

import { AnimatedArticle } from './reusable/AnimatedArticle';

interface IProjectProps {
  demoUrl: string;
  description: string;
  features?: string[]; 
  iconClassName: string;
  isOnTheLeft?: boolean;
  name: string;
  repositoryUrl: string;
  stack: string[];
}

export function Project(props: IProjectProps): ReactElement {
  const { demoUrl, description, features, iconClassName, isOnTheLeft, name, repositoryUrl, stack } = props;

  const [hideInformation, setHideInformation] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);

  useEffect((): void => {
    setHideInformation(false);
    setTimeout((): void => setHideInformation(true), 1);
  }, [showMore]);

  return (
    <AnimatedArticle className='project' isOnTheLeft={isOnTheLeft}>
      <div className='project__heading-wrapper'>
        <span className={iconClassName}></span>
        <h2>{name}</h2>
      </div>

      <section>
        <h3 className='sr-only'>Technologies used in the {name} project:</h3>

        <ul className='project__stack'>
          {stack.map((language: string, index: number): ReactElement => {
            if (index === 0) return <li key={language}>{language} |</li>;
            if (stack.length > index + 1) return <li key={language}>{' '}{language} |</li>;
            return <li key={language}> {language}</li>;
          })}
        </ul>
      </section>

      <p>{description}</p>

      {features && (
        <>
          {showMore && (
            <section className='project__show-more'>
              <span className='sr-only' aria-live='assertive' aria-hidden={hideInformation}>
                Extra information about the {name} project has been displayed above the button.
              </span>

              <h3 aria-label={`The ${name} project features:`}>This project features:</h3>
              
              <ol>
                {features.map((feature: string): ReactElement => <li key={feature}>{feature}</li>)}
              </ol>
            </section>
          )}

          <button
            aria-label={`Show ${showMore ? "less" : "more"} information about the ${name} project.`}
            className='project__button project__button--show-more focusable'
            onClick={() => setShowMore(prevValue => !prevValue)}
            type='button'
          >
            {showMore ? 'Show less' : 'Show more'}
          </button>
        </>
      )}

      <div className='project__link-wrapper'>
        <a
          className='project__button project__button--repository focusable'
          href={repositoryUrl}
          target='_blank'
          aria-label={`Go to the ${name} project Github repository.`}
          title={`Visit ${name} Github repository`}
          rel='noreferrer'
        >
          View code <span className='development-icon'></span>
        </a>

        <a
          className='project__button focusable'
          href={demoUrl}
          target='_blank'
          aria-label={`Go to the ${name} project webpage.`}
          rel='noreferrer'
        >
          View project <span className='arrow-icon'></span>
        </a>
      </div>
    </AnimatedArticle>
  );
}
