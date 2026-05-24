import './about-me.scss';

import type { ReactElement } from 'react';

import htmlIcon from '../../assets/icons/html-icon.png';
import codexIcon from '../../assets/icons/codex-icon.svg';
import cssIcon from '../../assets/icons/css-icon.png';
import javascriptIcon from '../../assets/icons/javascript-icon.png';
import reactIcon from '../../assets/icons/react-icon.png';
import nodeIcon from '../../assets/icons/node-icon.png';
import angularIcon from '../../assets/icons/angular-icon.png';
import typescriptIcon from '../../assets/icons/typescript-icon.png';
import sassIcon from '../../assets/icons/sass-icon.png';
import gitIcon from '../../assets/icons/git-icon.png';
import webAccessibilityIcon from '../../assets/icons/web-accessibility-icon.png';
import nestJsIcon from '../../assets/icons/nest-js-icon.svg';
import sqlIcon from '../../assets/icons/sql-icon.png';
import postgresIcon from '../../assets/icons/postgres-icon.png';

import { AnimatedDiv } from '../reusable/AnimatedDiv';

type LanguageListItemProps = {
  label: string;
  src: string;
};

const languageListItemDefinitions: LanguageListItemProps[] = [
  { label: 'React', src: reactIcon },
  { label: 'Angular', src: angularIcon },
  { label: 'TypeScript', src: typescriptIcon },
  { label: 'JavaScript', src: javascriptIcon },
  { label: 'HTML5', src: htmlIcon },
  { label: 'CSS3', src: cssIcon },
  { label: 'Sass', src: sassIcon },
  { label: 'Git', src: gitIcon },
  { label: 'Web Accessibility', src: webAccessibilityIcon },
  { label: 'NestJS', src: nestJsIcon },
  { label: 'Node.js', src: nodeIcon },
  { label: 'PostgreSQL', src: postgresIcon },
  { label: 'SQL', src: sqlIcon },
  { label: 'Codex', src: codexIcon }
];

function LanguageListItem(props: LanguageListItemProps): ReactElement {
  const { label, src } = props;

  return (
    <li className='language'>
      <AnimatedDiv>
        <img src={src} alt='' />
        <strong>{label}</strong>
      </AnimatedDiv>
    </li>
  );
}

export function AboutMe(): ReactElement {
  return (
    <section className='section about-me' id='about-me'>
      <div className='section-decoration'></div>

      <AnimatedDiv elementClassName='about-me__heading-container center-content'>
        <h2 className='section-heading'>About me</h2>
      </AnimatedDiv>

      <AnimatedDiv elementClassName='about-me__text-container center-content'>
        <p>
          <strong>I'm a Frontend Engineer</strong> with 5 years of professional experience building 
          {' '}production-grade web applications.
          <br />
          I work mainly with <strong>React, Angular, TypeScript,</strong> and <strong>JavaScript</strong>, 
          {' '}with additional backend experience using <strong>Node.js, NestJS, REST APIs</strong> 
          {' '}and <strong>PostgreSQL</strong>.
        </p>

        <p>
          Currently working as a <strong>Frontend Developer</strong> at
          {' '} 
          <a 
            className='focusable simple-link' 
            href='https://www.innovateod.com/' 
            rel='noreferrer' 
            target='_blank'
            title='Visit the official Innovate Group website'
          >
            Innovate Group
            <span className='sr-only'>, opens in a new tab</span>
          </a>
          , contributing to a real-time asset tracking platform for a US-based startup client.
        </p>

        <p>
          My focus is on building <strong>performant, accessible and maintainable</strong> user interfaces, 
          {' '}with experience across enterprise applications, public-sector platforms and fast-moving product teams.
          <br />
          I also use AI-assisted development tools like <strong>Codex</strong> to speed up iteration, 
          {' '}reduce boilerplate and improve development workflows.
        </p>
      </AnimatedDiv>

      <div className='about-me__stack center-content'>
        <AnimatedDiv>
          <h3>Core technologies:</h3>
        </AnimatedDiv>

        <ul className='language-wrapper' role='list'>
          {languageListItemDefinitions.map(({ label, src }): ReactElement => (
            <LanguageListItem key={label} label={label} src={src} />
          ))}
        </ul>
      </div>
    </section>
  );
}
