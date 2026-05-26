import './contact.scss';

import { type ReactElement } from 'react';

import { AnimatedDiv } from '../reusable/AnimatedDiv';
import { ContactForm } from '../ContactForm/ContactForm';
import { DownloadIconLink, GithubIconLink, LinkedInIconLink } from '../reusable/IconLink/IconLink';

export function Contact(): ReactElement {
  return (
    <section className='contact section' id='contact'>
      <div className='section-decoration'></div>
      <div className='section-decoration section-decoration--left'></div>
      <div className='section-decoration section-decoration--right'></div>
        <AnimatedDiv>
          <h1 className='section-heading'>Get in touch!</h1>
        </AnimatedDiv>

        <AnimatedDiv className='contact__form-wrapper'>
          <ContactForm />
        </AnimatedDiv>

        <AnimatedDiv className='contact__links-container'>
          <GithubIconLink size={60} />
          <LinkedInIconLink size={60} />
          <DownloadIconLink size={60} />
        </AnimatedDiv>
    </section>
  );
}
