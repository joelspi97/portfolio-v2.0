import './header.scss';

import type { ReactElement } from 'react';


import { AnimatedDiv } from '../reusable/AnimatedDiv';
import { DownloadIconLink, GithubIconLink, LinkedInIconLink } from '../reusable/IconLink/IconLink';

import { NavigationBar } from '../NavigationBar/NavigationBar';

const CAREER_START_YEAR = 2021;
const CAREER_START_MONTH_INDEX = 6;

function getyearsOfProfessionalExperience(): string {
  const currentDate = new Date();
  let years = currentDate.getFullYear() - CAREER_START_YEAR;
  let months = currentDate.getMonth() - CAREER_START_MONTH_INDEX;

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (months >= 10) return `${years + 1}`;
  if (months >= 6) return `${years}+`;

  return `${years}`;
}

export function Header(): ReactElement {
  const yearsOfProfessionalExperience = getyearsOfProfessionalExperience();

  return (
    <header className='header section'>
      <div className='header__menu'>
        <NavigationBar />
      </div>

      <AnimatedDiv className='header__content'>
        <div className='header__text-content'>
          <h1 className='section-heading'>
            <span>Joel Spinelli</span>
            <span>Frontend Engineer</span>
          </h1>

          <p>
            I'm a <span className='fw-bold'>Frontend Engineer</span> with {yearsOfProfessionalExperience} years of  
            {' '}professional experience building production-grade web applications across startup, 
            {' '}enterprise and public-sector environments.
          </p>

          <p>
            I work mainly with <span className='fw-bold'>React</span>, <span className='fw-bold'>Angular</span>, <span className='fw-bold'>TypeScript</span>, 
            {' '}and <span className='fw-bold'>JavaScript</span>, with additional backend experience using <span className='fw-bold'>Node.js</span>,
            {' '}<span className='fw-bold'>NestJS</span>, <span className='fw-bold'>REST APIs</span> and <span className='fw-bold'>PostgreSQL</span>.
            {' '}I care about building interfaces that are performant, accessible, maintainable and easy to use.
          </p>

          <p>
            My work usually sits close to the intersection of product, design and engineering: 
            {' '}translating requirements into reliable UI, improving existing codebases, 
            {' '}collaborating with cross-functional teams, and keeping long-term quality in mind.
          </p>

          <nav className='header__cta-wrapper' aria-label='Professional links'>
            <GithubIconLink size={40} />
            <LinkedInIconLink size={40} />
            <DownloadIconLink size={40} />
          </nav>
        </div>

        <picture>
          <source srcSet='/images/profile-picture.avif' type='image/avif' />
          <source srcSet='/images/profile-picture.webp' type='image/webp' />
          <img
            alt='Joel Spinelli coding on his laptop.'
            className='header__profile-picture'
            decoding='async'
            fetchPriority='high'
            height={600}
            loading='eager'
            src='/images/profile-picture.jpg'
            width={600}
          />
        </picture>
      </AnimatedDiv>
    </header>
  );
}
