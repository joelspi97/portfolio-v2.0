import './header.scss';

import { useState, type ReactElement } from 'react';
import { tsParticles } from '@tsparticles/engine';

import { AnimatedBackground } from '../reusable/AnimatedBackground';
import { AnimatedDiv } from '../reusable/AnimatedDiv';
import { NavigationBar } from '../NavigationBar/NavigationBar';

import profilePicture from '../../assets/profile-picture-2.jpg';

export function Header(): ReactElement {
  const [areAnimationsEnabled, setAreAnimationsEnabled] = useState(true);

  function pauseAnimations(): void {
    const animations = tsParticles.item(0);
    areAnimationsEnabled ? animations.pause() : animations.play();
    setAreAnimationsEnabled(prevValue => !prevValue);
  }

  return (
    <header className='header section'>
      <AnimatedBackground />

      <AnimatedDiv elementClassName='header__menu'>
        <button 
          className='animation-btn portfolio-btn focusable' 
          type='button' 
          onClick={pauseAnimations}
        >
          Pause animation
        </button>
        <NavigationBar />
      </AnimatedDiv>

      <div className='header__heading-container center-content'>
        <AnimatedDiv>
          <h1 className='section-heading'>
            <span>Joel Spinelli</span>
            <br />
            <span>Frontend Engineer</span>
          </h1>
        </AnimatedDiv>
       
        <AnimatedDiv>
          <img src={profilePicture} alt='Joel Spinelli, Frontend Engineer, coding on his laptop.' />
        </AnimatedDiv>
      </div>
    </header>
  );
}
