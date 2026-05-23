import '../scss/components/about-me.scss';

import type { ReactElement } from 'react';

import htmlIcon from '../assets/icons/html-icon.png';
import cssIcon from '../assets/icons/css-icon.png';
import javascriptIcon from '../assets/icons/javascript-icon.png';
import reactIcon from '../assets/icons/react-icon.png';
import nodeIcon from '../assets/icons/node-icon.png';
import expressIcon from '../assets/icons/express-icon.png';
import angularIcon from '../assets/icons/angular-icon.png';
import typescriptIcon from '../assets/icons/typescript-icon.png';
import sassIcon from '../assets/icons/sass-icon.png';
import gitIcon from '../assets/icons/git-icon.png';
import webAccessibilityIcon from '../assets/icons/web-accessibility-icon.png';
import nestJsIcon from '../assets/icons/nest-js-icon.svg';
import sqlIcon from '../assets/icons/sql-icon.png';
import postgresIcon from '../assets/icons/postgres-icon.png';

import { AnimatedDiv } from './reusable/AnimatedDiv';

export function AboutMe(): ReactElement {
  return (
    <section className='section about-me' id='about-me'>
      <div className='section-decoration'></div>

      <AnimatedDiv elementClassName='about-me__heading-container center-content'>
        <h1 className='section-heading'>Hello, my name is <span>Joel Spinelli</span>.</h1>
      </AnimatedDiv>

      <AnimatedDiv elementClassName='about-me__text-container center-content'>
        <p>
          <span>I'm a Frontend Web Developer</span> with 4 years of professional experience and a deep passion for programming.
          <br />
          I specialize in JavaScript and TypeScript, building applications with technologies like <span>React, Angular (2+)</span> and <span>NodeJS</span>.
        </p>

        <p>
          Currently working as a <span>Frontend Engineer</span> at
          {' '} 
          <a 
            className='focusable simple-link' 
            href='https://www.innovateod.com/' 
            rel='noreferrer' 
            target='_blank' 
            title='Visit the official Innovate Group website'
          >
            Innovate Group
          </a>
          , using <span>React</span> and <span>JavaScript</span>.
        </p>

        <p>
          My goal is to create fully responsive, pixel-perfect, and accessible websites. 
          <br />
          I'm also eager to expand my skills into mobile development, particularly with <span>React Native</span> and <span>Swift</span>.
        </p>
      </AnimatedDiv>

      <div className='about-me__stack center-content'>
        <AnimatedDiv>
          <h2>My stack:</h2>
        </AnimatedDiv>

        <div className='language-wrapper'>
          <AnimatedDiv elementClassName='language'>
            <img src={reactIcon} alt='' />
            <span>React</span>
          </AnimatedDiv>
          
          <AnimatedDiv elementClassName='language'>
            <img src={angularIcon} alt='' />
            <span>Angular</span>
          </AnimatedDiv>
          
          <AnimatedDiv elementClassName='language'>
            <img src={typescriptIcon} alt='' />
            <span>TypeScript</span>
          </AnimatedDiv>
          
          <AnimatedDiv elementClassName='language'>
            <img src={javascriptIcon} alt='' />
            <span>JavaScript</span>
          </AnimatedDiv>
          
          <AnimatedDiv elementClassName='language'>
            <img src={htmlIcon} alt='' />
            <span>HTML5</span>
          </AnimatedDiv>
          
          <AnimatedDiv elementClassName='language'>
            <img src={cssIcon} alt='' />
            <span>CSS3</span>
          </AnimatedDiv>
          
          <AnimatedDiv elementClassName='language'>
            <img src={sassIcon} alt='' />
            <span>Sass</span>
          </AnimatedDiv>
          
          <AnimatedDiv elementClassName='language'>
            <img src={gitIcon} alt='' />
            <span>Git</span>
          </AnimatedDiv>
          
          <AnimatedDiv elementClassName='language'>
            <img src={webAccessibilityIcon} alt='' />
            <span>Web Accessibility</span>
          </AnimatedDiv>
          
          <AnimatedDiv elementClassName='language'>
            <img src={nestJsIcon} alt='' />
            <span>NestJS</span>
          </AnimatedDiv>
          
          <AnimatedDiv elementClassName='language'>
            <img src={expressIcon} alt='' />
            <span>Express</span>
          </AnimatedDiv>
          
          <AnimatedDiv elementClassName='language'>
            <img src={nodeIcon} alt='' />
            <span>NodeJS</span>
          </AnimatedDiv>
          
          <AnimatedDiv elementClassName='language'>
            <img src={postgresIcon} alt='' />
            <span>PostgreSQL</span>
          </AnimatedDiv>
          
          <AnimatedDiv elementClassName='language'>
            <img src={sqlIcon} alt='' />
            <span>SQL</span>
          </AnimatedDiv>
        </div>
      </div>
    </section>
  );
}
