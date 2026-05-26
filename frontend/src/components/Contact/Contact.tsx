import './contact.scss';

import { type ReactElement } from 'react';

import { AnimatedDiv } from '../reusable/AnimatedDiv';
import { ContactForm } from '../ContactForm/ContactForm';

export function Contact(): ReactElement {
  return (
    <section className='contact section' id='contact'>
      <div className='section-decoration'></div>
      <div className='section-decoration section-decoration--left'></div>
      <div className='section-decoration section-decoration--right'></div>
        <AnimatedDiv>
          <h2 className='section-heading'>Get in touch!</h2>
        </AnimatedDiv>

        <AnimatedDiv className='contact__form-wrapper'>
          <ContactForm />
        </AnimatedDiv>
    </section>
  );
}
