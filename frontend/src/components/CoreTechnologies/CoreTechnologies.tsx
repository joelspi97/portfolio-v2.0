import './core-technologies.scss';

import type { ReactElement } from 'react';

import angularIcon from '../../assets/icons/angular-icon.svg';
import codexIcon from '../../assets/icons/codex-icon.svg';
import cssIcon from '../../assets/icons/css-icon.svg';
import gitIcon from '../../assets/icons/git-icon.svg';
import htmlIcon from '../../assets/icons/html-icon.svg';
import javascriptIcon from '../../assets/icons/javascript-icon.svg';
import nestJsIcon from '../../assets/icons/nest-js-icon.svg';
import nodeJsIcon from '../../assets/icons/node-js-icon.svg';
import postgresqlIcon from '../../assets/icons/postgresql-icon.svg';
import reactIcon from '../../assets/icons/react-icon.svg';
import sassIcon from '../../assets/icons/sass-icon.svg';
import sqlIcon from '../../assets/icons/sql-icon.svg';
import typescriptIcon from '../../assets/icons/typescript-icon.svg';
import webAccessibilityIcon from '../../assets/icons/web-accessibility-icon.svg';

import { AnimatedDiv } from '../reusable/AnimatedDiv';

type TechnologyListItemProps = {
  height: number;
  label: string;
  src: string;
  width: number;
};

const technologyListItemDefinitions: TechnologyListItemProps[] = [
  { height: 128, label: 'React', src: reactIcon, width: 144 },
  { height: 128, label: 'Angular', src: angularIcon, width: 128 },
  { height: 128, label: 'TypeScript', src: typescriptIcon, width: 128 },
  { height: 128, label: 'JavaScript', src: javascriptIcon, width: 128 },
  { height: 128, label: 'HTML5', src: htmlIcon, width: 128 },
  { height: 128, label: 'CSS3', src: cssIcon, width: 128 },
  { height: 128, label: 'Sass', src: sassIcon, width: 128 },
  { height: 128, label: 'Git', src: gitIcon, width: 128 },
  { height: 128, label: 'Web Accessibility', src: webAccessibilityIcon, width: 128 },
  { height: 128, label: 'NestJS', src: nestJsIcon, width: 133 },
  { height: 128, label: 'Node.js', src: nodeJsIcon, width: 128 },
  { height: 128, label: 'PostgreSQL', src: postgresqlIcon, width: 128 },
  { height: 128, label: 'SQL', src: sqlIcon, width: 128 },
  { height: 128, label: 'Codex', src: codexIcon, width: 128 }
];

function TechnologyListItem(props: TechnologyListItemProps): ReactElement {
  const { height, label, src, width } = props;

  return (
    <li className='technology'>
      <AnimatedDiv>
        <img alt='' decoding='async' height={height} loading='lazy' src={src} width={width} />
        <strong>{label}</strong>
      </AnimatedDiv>
    </li>
  );
}

export function CoreTechnologies(): ReactElement {
  return (
    <section className='section core-technologies' id='core-technologies'>
      <div className='section-decoration'></div>

      <AnimatedDiv className='core-technologies__heading-container center-content'>
        <h2 className='section-heading'>Core technologies</h2>
      </AnimatedDiv>

      <div className='core-technologies__stack center-content'>
        <ul className='technology-wrapper' role='list'>
          {technologyListItemDefinitions.map(({ height, label, src, width }): ReactElement => (
            <TechnologyListItem key={label} height={height} label={label} src={src} width={width} />
          ))}
        </ul>
      </div>
    </section>
  );
}
