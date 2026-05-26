import './scss/core/resets.scss';
import './scss/core/generic-classes.scss';

import type { ReactElement } from 'react';

import { CoreTechnologies } from './components/CoreTechnologies/CoreTechnologies';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { ProjectsSection } from './components/ProjectsSection/ProjectsSection';

export function App(): ReactElement {
  return (
    <>
      <Header />
      
      <main>
        <CoreTechnologies />
        <ProjectsSection />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
