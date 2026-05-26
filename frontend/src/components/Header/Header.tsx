import './header.scss';

import { useState, type ReactElement } from 'react';

import { useReducedMotion } from 'framer-motion';
import { tsParticles } from '@tsparticles/engine';

import { AnimatedBackground } from '../reusable/AnimatedBackground';
import { AnimatedDiv } from '../reusable/AnimatedDiv';
import { DownloadIconLink, GithubIconLink, LinkedInIconLink } from '../reusable/IconLink/IconLink';

import { NavigationBar } from '../NavigationBar/NavigationBar';

import profilePicture from '../../assets/profile-picture-2.jpg';

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
  const [areAnimationsEnabled, setAreAnimationsEnabled] = useState(true);

  const shouldReduceMotion = useReducedMotion();
  const yearsOfProfessionalExperience = getyearsOfProfessionalExperience();

  function pauseAnimations(): void {
    const animations = tsParticles.item(0);
    areAnimationsEnabled ? animations.pause() : animations.play();
    setAreAnimationsEnabled(prevValue => !prevValue);
  }

  return (
    <header className='header section'>
      {!shouldReduceMotion && <AnimatedBackground />}

      <AnimatedDiv className='header__menu'>
        {!shouldReduceMotion && (
          <button
            className='animation-btn portfolio-btn focusable'
            type='button'
            onClick={pauseAnimations}
          >
            Pause animation
          </button>
        )}

        <NavigationBar />
      </AnimatedDiv>

      <AnimatedDiv className='header__content'>
        <div className='header__text-content'>
          <h1 className='section-heading'>
            <span>Joel Spinelli</span>
            <span>Frontend Engineer</span>
          </h1>

          <p>
            <strong>Frontend-focused Software engineer</strong> with {yearsOfProfessionalExperience} years of professional experience building
            {' '}production-grade web applications.
          </p>

          <p>
            I work mainly with <strong>React, Angular, TypeScript,</strong> and
            {' '}<strong>JavaScript</strong>, with backend experience using
            {' '}<strong>Node.js, NestJS, REST APIs</strong> and <strong>PostgreSQL</strong>.
          </p>

          <p>
            Currently contributing to a real-time asset tracking platform for a US-based startup
            client, focused on performant, accessible and maintainable user interfaces.
          </p>

          <nav className='header__cta-wrapper' aria-label='Professional links'>
            <GithubIconLink size={40} />
            <LinkedInIconLink size={40} />
            <DownloadIconLink size={40} />
          </nav>
        </div>

        <img className='header__profile-picture' src={profilePicture} alt='Joel Spinelli coding on his laptop.' />
      </AnimatedDiv>
    </header>
  );
}
