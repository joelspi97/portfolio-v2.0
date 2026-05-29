import type { ReactElement } from 'react';

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

export type CaseStudyProps = {
  body: string | ReactElement; 
  description: string | ReactElement;
  href: string;
  slideFromTheLeft?: boolean;
  logoSrc: string;
  name: string;
  stack: stackOptions[];
  style?: Record<string, string>;
};
