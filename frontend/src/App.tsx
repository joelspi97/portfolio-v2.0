import './scss/core/fonts.scss';
import './scss/core/resets.scss';
import './scss/core/generic-classes.scss';

import { useEffect, type ReactElement } from 'react';

import { CoreTechnologies } from './components/CoreTechnologies/CoreTechnologies';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { CaseStudiesSection } from './components/CaseStudiesSection/CaseStudiesSection';

export function App(): ReactElement {
  useEffect((): void => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const targetId = window.location.hash.slice(1);
    if (!targetId) return;

    const targetElement = document.getElementById(decodeURIComponent(targetId));
    if (!targetElement) return;

    const htmlElement = document.documentElement;
    const scrollBehavior = htmlElement.style.scrollBehavior;

    htmlElement.style.scrollBehavior = 'auto';
    targetElement.scrollIntoView();
    htmlElement.style.scrollBehavior = scrollBehavior;
  }, []);

  return (
    <>
      <Header />
      
      <main>
        <CoreTechnologies />
        <CaseStudiesSection />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
