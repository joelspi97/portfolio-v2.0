import './footer.scss';

import type { ReactElement } from "react";

import { AnimatedDiv } from '../reusable/AnimatedDiv';

export function Footer(): ReactElement {
  return (
    <footer className='footer'>
      <AnimatedDiv>
        <p>© {new Date().getFullYear()} Joel Spinelli — Built with React, TypeScript, and Node.js.</p>
      </AnimatedDiv>
    </footer>
  );
}
