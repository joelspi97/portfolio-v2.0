import './case-studies-section.scss';

import { type ReactElement } from 'react';

import { CaseStudy, stackOptions } from '../CaseStudy/CaseStudy';

const innovateDescription = (
  <>
    <p>
      My current role, working on a <strong>real-time asset tracking platform for a US-based startup</strong>.
      <br />
      The product involves hierarchical location data, <strong>complex UI flows</strong>, and 
      {' '}<strong>performance-sensitive frontend state management</strong>.
    </p>
  </>
);
const innovateBody = (
  <>
    <p>
      One of the most useful pieces of work I contributed to was 
      {' '}<strong>rebuilding a hierarchical location-management feature</strong> from scratch instead 
      of reusing an older, bug-prone implementation from a similar internal app.
    </p>

    <p>
      The feature allowed users to browse and edit a tree of entities: campuses, buildings, floors 
      and locations. The original approach relied heavily on <strong>repeated GET requests</strong> 
      {' '}to keep the entity tree updated after each create, update or delete action, including 
      expensive full-tree fetches.
    </p>

    <p>
      I proposed a different approach: <strong>fetch the full tree once on initial load, 
      then keep the frontend state in sync manually</strong> after each mutation since we would already have 
      it in memory anyway. This avoided unnecessary GET requests and made the UI feel much more 
      responsive, especially when dealing with large entity trees.
    </p>

    <p>
      The main challenge was not just storing the data, but updating it safely. Because each parent
      entity referenced its children, I had to write <strong>efficient search and update algorithms</strong> 
      {' '}for finding, editing, adding and removing entities inside a nested tree structure without 
      rebuilding more state than necessary.
    </p>

    <p>
      <strong>What I learned:</strong> this pushed me to think more carefully about data structures,
      time complexity and frontend performance beyond just rendering components. It was a good
      example of how better state design can reduce backend calls and improve perceived performance.
    </p>
  </>
);

const eyDescription = (
  <p>
    A <strong>full-stack enterprise project</strong> for an internal legal team, building a system to 
    prepare and submit Spanish tax forms with <strong>complex backend calculation logic</strong>.
  </p>
);
const eyBody = (
  <>
    <p>
      In one EY project, I worked on an internal application used by a 
      {' '}legal team in Spain to prepare tax forms for submission through the Spanish 
      tax authority platform.
    </p>

    <p>
      At first, the backend logic looked manageable because we only expected a few form models.
      Over time, more forms were added, and each one came with its own calculations, exceptions
      and validation rules. The <strong>service layer gradually turned into a large set of 
      conditional blocks handling form-specific behaviour</strong>.
    </p>

    <p>
      The problem became much worse when yearly versions were introduced. A form was 
      no longer just “Form 222”, for example — it could be “Form 222 for 2013”, “Form 222 for 2015”, 
      and so on, each with different rules. In a short period, <strong>the main services file grew from roughly 600 
      lines to around 1200</strong>, and debugging one form could easily break another because the code was 
      tightly coupled.
    </p>

    <p>
      <strong>I proposed moving the form logic into a more isolated architecture</strong>. The idea 
      was to create an abstract base class for shared behaviour, then implement each concrete 
      form/version in its own class. Shared methods could live in the base class, methods with the 
      same signature but different logic could be overridden, and form-specific behaviour could stay 
      inside the individual form classes.
    </p>

    <p>
      To instantiate the correct form dynamically, I created a map where each form identifier
      pointed to its corresponding class. This acted as a simple routing layer between the database
      form ID and the calculation logic that needed to run.
    </p>

    <p>
      <strong>The impact:</strong> the service layer became much smaller, the conditional logic was
      removed, and adding or debugging form versions became easier and safer because each form's 
      behaviour was isolated in its own file.
    </p>
  </>
);

const governmentDescription = (
  <p>
    My first frontend role, working on <strong>public-sector web applications</strong> with a strong 
    focus on accessible UI implementation, semantic HTML and <strong>WCAG standards</strong>.
  </p>
); 
const governmentBody = (
  <>
    <p>
      This was my first frontend role. I started by building React apps for public-sector services, 
      with a focus on <strong>pixel-perfect, responsive, and accessible</strong> user interfaces.
    </p>

    <p>
      Because these were government websites, accessibility was not optional. In practice, however,
      <strong>many screens did not meet the expected standards</strong>. I was asked to study 
      {' '}<strong>WCAG guidelines</strong>, review strong public-sector examples such as UK government 
      services, and help bring our interfaces closer to accessible standards.
    </p>

    <p>
      A major challenge was that accessibility had not been part of the default design process.
      Some institutional colors had <strong>poor contrast</strong>, and several UI patterns needed to 
      be adjusted. I worked with designers to improve those patterns without breaking the visual 
      identity of the product.
    </p>

    <p>
      This role also changed the way I write frontend code. I became much more deliberate with
      {' '}<strong>semantic HTML, ARIA attributes, keyboard navigation, alternative text and the 
      relationship between design decisions and real usability</strong>.
    </p>

    <p>
      <strong className='case-study__final-strong'>Beyond implementation:</strong> I also helped other 
      developers understand accessibility basics, introduced Sass to improve styling maintainability, 
      and wrote internal documentation so the team had a clearer reference for future UI work. By the 
      end of my time there, all projects I worked on met WCAG AA standards.
    </p>
  </>
);

export function CaseStudiesSection(): ReactElement {
  return (
    <section className='section case-studies-section' id='case-studies'>
      <div className='section-decoration' />

      <h2 className='section-heading'>Case Studies</h2>

      <div className='case-studies-section__case-studies-container center-content'>
        <CaseStudy
          body={innovateBody}
          description={innovateDescription}
          isOnTheLeft={true}
          logoSrc='/images/logos/iod-logo.svg'
          name='Innovate Group'
          stack={[stackOptions.react, stackOptions.javaScript]}
        />

        <CaseStudy
          body={eyBody}
          description={eyDescription}
          name='EY (Ernst & Young)'
          logoSrc='/images/logos/ey-logo.svg'
          stack={[
            stackOptions.react, 
            stackOptions.angular, 
            stackOptions.typeScript, 
            stackOptions.nodeJs, 
            stackOptions.nestJs, 
            stackOptions.postgreSql, 
            stackOptions.spfx
          ]}
        />

        <CaseStudy
          body={governmentBody}
          description={governmentDescription}
          isOnTheLeft={true}
          logoSrc='/images/logos/bsas-logo.svg'
          name='Online Services - Buenos Aires'
          stack={[
            stackOptions.react, 
            stackOptions.typeScript, 
            stackOptions.redux, 
            stackOptions.wcag
          ]}
        />
      </div>
    </section>
  );
}
