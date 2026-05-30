import './header.scss';

import type { ReactElement } from 'react';


import { AnimatedDiv } from '../reusable/AnimatedDiv';
import { DownloadIconLink, GithubIconLink, LinkedInIconLink } from '../reusable/IconLink/IconLink';

import { NavigationBar } from '../NavigationBar/NavigationBar';

export function Header(): ReactElement {
  return (
    <header className='header section'>
      <AnimatedDiv className='header__menu'>
        <NavigationBar />
      </AnimatedDiv>

      <AnimatedDiv className='header__content'>
        <div className='header__text-content'>
          <h1 className='section-heading'>
            <span>Joel Spinelli</span>
            <span>Frontend Engineer</span>
          </h1>

          <p>
            I'm a <span className='fw-bold'>Frontend Engineer</span> with 5 years of  
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
            <GithubIconLink showLabel size={40} />
            <LinkedInIconLink showLabel size={40} />
            <DownloadIconLink showLabel size={40} />
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
