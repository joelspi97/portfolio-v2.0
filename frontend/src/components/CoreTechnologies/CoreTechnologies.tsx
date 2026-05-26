import './core-technologies.scss';

import type { ReactElement } from 'react';

import { AnimatedDiv } from '../reusable/AnimatedDiv';

type TechnologyListItemProps = {
  height: number;
  label: string;
  src: string;
  width: number;
};

const technologyListItemDefinitions: TechnologyListItemProps[] = [
  { height: 128, label: 'React', src: '/images/technologies/react-icon.svg', width: 144 },
  { height: 128, label: 'Angular', src: '/images/technologies/angular-icon.svg', width: 128 },
  { height: 128, label: 'TypeScript', src: '/images/technologies/typescript-icon.svg', width: 128 },
  { height: 128, label: 'JavaScript', src: '/images/technologies/javascript-icon.svg', width: 128 },
  { height: 128, label: 'HTML5', src: '/images/technologies/html-icon.svg', width: 128 },
  { height: 128, label: 'CSS3', src: '/images/technologies/css-icon.svg', width: 128 },
  { height: 128, label: 'Sass', src: '/images/technologies/sass-icon.svg', width: 128 },
  { height: 128, label: 'Git', src: '/images/technologies/git-icon.svg', width: 128 },
  { height: 128, label: 'Web Accessibility', src: '/images/technologies/web-accessibility-icon.svg', width: 128 },
  { height: 128, label: 'NestJS', src: '/images/technologies/nest-js-icon.svg', width: 133 },
  { height: 128, label: 'Node.js', src: '/images/technologies/node-js-icon.svg', width: 128 },
  { height: 128, label: 'PostgreSQL', src: '/images/technologies/postgresql-icon.svg', width: 128 },
  { height: 128, label: 'SQL', src: '/images/technologies/sql-icon.svg', width: 128 },
  { height: 128, label: 'Codex', src: '/images/technologies/codex-icon.svg', width: 128 }
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
      <div className='section-decoration' />

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
