import './scss/core/resets.scss';
import './scss/core/generic-classes.scss';
import './scss/components/footer.scss';

import type { ReactElement } from 'react';

import { AboutMe } from './components/AboutMe/AboutMe';
import { AnimatedDiv } from './components/reusable/AnimatedDiv';
import { Contact } from './components/Contact/Contact';
import { Header } from './components/Header/Header';
import { ProjectsSection } from './components/ProjectsSection/ProjectsSection';

export function App(): ReactElement {
  return (
    <>
      <Header />
      
      <main>
        <AboutMe />

        <ProjectsSection />

        <Contact />
      </main>

      <footer className='footer'>
        <AnimatedDiv>
          <p>Made with React, TypeScript, and <span aria-label='love'>❤️️</span> by Joel Spinelli.</p>
        </AnimatedDiv>
      </footer>
    </>
  );
}
