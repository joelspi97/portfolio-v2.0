import './footer.scss';

import type { ReactElement } from "react";

import { AnimatedDiv } from '../reusable/AnimatedDiv';
import { DownloadIconLink, GithubIconLink, LinkedInIconLink } from '../reusable/IconLink/IconLink';

export function Footer(): ReactElement {
  return (
    <footer className='footer'>
      <AnimatedDiv className='footer__content'>
        <p>© {new Date().getFullYear()} Joel Spinelli — Built with React, TypeScript, and Node.js.</p>

        <div className='footer__links-container'>
          <GithubIconLink size={30} />
          <LinkedInIconLink size={30} />
          <DownloadIconLink size={30} />
        </div>
      </AnimatedDiv>
    </footer>
  );
}
