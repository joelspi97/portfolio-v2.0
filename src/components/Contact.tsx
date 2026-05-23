import '../scss/components/contact.scss';

import { type ReactElement } from 'react';

import { AnimatedDiv } from './AnimatedDiv';
import { ContactForm } from './ContactForm';

export function Contact(): ReactElement {
  return (
    <section className='contact section' id='contact'>
      <div className='section-decoration'></div>
      <div className='section-decoration section-decoration--left'></div>
      <div className='section-decoration section-decoration--right'></div>
        <AnimatedDiv>
          <h1 className='section-heading'>Get in touch!</h1>
        </AnimatedDiv>

        <AnimatedDiv elementClassName='contact__form-wrapper'>
          <ContactForm />
        </AnimatedDiv>

        <AnimatedDiv elementClassName='contact__links-container'>
            <a 
              aria-label='Visit my LinkedIn profile.'
              className='focusable'
              href='https://www.linkedin.com/in/joel-spinelli-497a1418b/' 
              rel='noreferrer' 
              target='_blank'
              title='Visit my LinkedIn profile' 
            >
              <span className='linkedin-icon'></span>
              LinkedIn
            </a>

            <a 
              aria-label='Visit my GitHub profile.'
              className='focusable'
              href='https://github.com/joelspi97' 
              rel='noreferrer' 
              target='_blank' 
              title='Visit my Github profile' 
              >
              <span className='github-icon'></span>
              GitHub
            </a>
            
            <a 
              aria-label='Send me an email.'
              className='focusable'
              href='mailto:joelspi97@gmail.com' 
              rel='noreferrer'
              title='Send me an email' 
            >
              <span className='mail-icon'></span>
              Send me an email
            </a>
        </AnimatedDiv>
    </section>
  );
}
