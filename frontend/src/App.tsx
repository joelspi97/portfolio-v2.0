import './scss/core/fonts.scss';
import './scss/core/resets.scss';
import './scss/core/generic-classes.scss';

import type { ReactElement } from 'react';
import { type Engine } from '@tsparticles/engine';
import { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

import { CoreTechnologies } from './components/CoreTechnologies/CoreTechnologies';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { ProjectsSection } from './components/ProjectsSection/ProjectsSection';

async function particlesInit(engine: Engine): Promise<void> {
  await loadSlim(engine);
}

export function App(): ReactElement {
  return (
    <ParticlesProvider init={particlesInit}>
      <Header />
      
      <main>
        <CoreTechnologies />
        <ProjectsSection />
        <Contact />
      </main>

      <Footer />
    </ParticlesProvider>
  );
}
