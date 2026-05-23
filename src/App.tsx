import './scss/core/resets.scss';
import './scss/core/generic-classes.scss';
import './scss/components/footer.scss';

import type { ReactElement } from 'react';

import { AboutMe } from './components/AboutMe';
import { AnimatedDiv } from './components/AnimatedDiv';
import { Contact } from './components/Contact';
import { Header } from './components/Header';
import { ProjectsSection } from './components/ProjectsSection';

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
          <p>
            Want to see the code of this website? {' '} 
            <a 
              aria-label='Visit this website Github repository.' 
              className='simple-link focusable' 
              href='https://github.com/joelspi97/portfolio' 
              rel='noreferrer' 
              target='_blank' 
              title="Visit this website's Github repository"
            >
              Click here!
            </a>
          </p>
          <p>Made with React, TypeScript, and <span aria-label='love'>❤️️</span> by Joel Spinelli.</p>
        </AnimatedDiv>
      </footer>
    </>
  );
}
