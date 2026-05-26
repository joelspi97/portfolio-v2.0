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

      <AnimatedDiv className='about-me__heading-container center-content'>
        <h2 className='section-heading'>Core technologies</h2>
      </AnimatedDiv>

      <div className='about-me__stack center-content'>
        <ul className='language-wrapper' role='list'>
          {languageListItemDefinitions.map(({ label, src }): ReactElement => (
            <LanguageListItem key={label} label={label} src={src} />
          ))}
        </ul>
      </div>
    </section>
  );
}
