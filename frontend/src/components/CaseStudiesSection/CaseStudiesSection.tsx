import './case-studies-section.scss';

import { type ReactElement } from 'react';

import { CaseStudy } from '../CaseStudy/CaseStudy';
import { stackOptions } from '../CaseStudy/CaseStudy.types';

import companyIcon from '../../assets/icons/company-icon.svg';
import governmentIcon from '../../assets/icons/government-icon.svg';
import locationIcon from '../../assets/icons/location-icon.svg';

const innovateDescription = (
  <>
    <p>
      My current role, working on a <span className='fw-bold'>real-time asset tracking platform</span> for a US-based startup.
      I work on complex UI flows, <span className='fw-bold'>hierarchical location data</span>, and 
      {' '}<span className='fw-bold'>performance-sensitive frontend state management</span>.
    </p>
  </>
);
const innovateBody = (
  <>
    <p>
      One of the most useful pieces of work I contributed to was 
      {' '}<span className='fw-bold'>rebuilding a hierarchical location-management feature</span> instead of reusing 
      an older implementation from a similar internal app. The old version worked, but it made the 
      UI depend on repeated backend reads after common interactions.
    </p>

    <p>
      The feature lets users browse and edit a tree of campuses, buildings, floors and locations. 
      The original approach relied on <span className='fw-bold'>repeated GET requests</span> to keep that tree updated, 
      including full-tree fetches after mutations and extra requests when selecting or deep-linking 
      to an entity.
    </p>

    <p>
      I proposed a different approach: <span className='fw-bold'>fetch the full tree once on initial load, then treat it 
      as the source of truth on the frontend</span>. Selection and deep links could resolve entities 
      from memory, while create, update and delete actions could update the local tree after the 
      mutation completed.
    </p>

    <div
      aria-label='Scrollable comparison table: Location tree network behavior before and after the refactor.'
      className='case-study__table-wrapper'
      role='region'
      tabIndex={0}
    >
      <table className='case-study__comparison-table'>
        <caption>Location tree network behavior before and after the refactor.</caption>

        <thead>
          <tr>
            <th scope='col'>Interaction</th>
            <th scope='col'>Old implementation</th>
            <th scope='col'>New implementation</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th scope='row'>Initial load</th>
            <td>GET all</td>
            <td>GET all</td>
          </tr>

          <tr>
            <th scope='row'>Select entity</th>
            <td>GET by id</td>
            <td><strong>No API call</strong>; find it in memory</td>
          </tr>

          <tr>
            <th scope='row'>Deep link</th>
            <td>GET all + GET by id</td>
            <td><strong>GET all only</strong>; find it in memory</td>
          </tr>

          <tr>
            <th scope='row'>Create</th>
            <td>POST + GET all + GET by id</td>
            <td><strong>POST only</strong>; update the tree in memory and use it to find the new record</td>
          </tr>

          <tr>
            <th scope='row'>Update</th>
            <td>PUT + GET all + GET by id</td>
            <td><strong>PUT only</strong>; update the tree in memory</td>
          </tr>

          <tr>
            <th scope='row'>Delete</th>
            <td>DELETE + GET all</td>
            <td><strong>DELETE only</strong>; update the tree in memory</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>
      The main challenge was not just storing the data, but updating it safely. Because each parent
      entity referenced its children, I wrote <span className='fw-bold'>search and update logic for nested tree data</span> 
      {' '}that could find, edit, add and remove entities without rebuilding more state than necessary.
    </p>

    <p>
      <strong>The result:</strong> the feature removed unnecessary network activity from common tree 
      interactions and significantly improved perceived performance because most refresh work happened 
      locally instead of waiting on repeated full-tree fetches.
    </p>
  </>
);

const eyDescription = (
  <p>
    A <span className='fw-bold'>full-stack enterprise project</span> for an internal legal team, building a system to 
    prepare and submit Spanish tax forms with <span className='fw-bold'>versioned backend calculation logic</span>.
  </p>
);
const eyBody = (
  <>
    <p>
      In one EY project, I worked on an internal application used by a legal team in Spain to prepare 
      tax forms for submission through the Spanish tax authority platform. The hard part was not the 
      UI; it was keeping the backend calculation logic maintainable as the number of forms grew.
    </p>

    <p>
      At first, the backend logic looked manageable because we only expected a few form models.
      Over time, more forms were added, and each one came with its own calculations, exceptions
      and validation rules. The service layer gradually turned into 
      {' '}<span className='fw-bold'>a large set of conditional blocks handling form-specific behaviour</span>.
    </p>

    <p>
      The problem became much worse when yearly versions were introduced. A form was 
      no longer just “Form 222”, for example — it could be “Form 222 for 2013”, “Form 222 for 2015”, 
      and so on, each with different rules. In a short period, 
      {' '}<span className='fw-bold'>the main service grew from roughly 600 lines to around 1200</span>, and debugging 
      one form could easily break another because the code was tightly coupled.
    </p>

    <p>
      The key observation was that <span className='fw-bold'>the forms were different, but not completely unrelated</span>. 
      Many methods and properties were shared across every form, some methods always had the same 
      signature but needed different implementations, and only a small number of behaviours were truly 
      form-specific. That made the existing conditional approach the wrong fit for the problem.
    </p>

    <p>
      I proposed extracting the form logic into <span className='fw-bold'>isolated classes per form/version</span>. 
      Shared behaviour lived in an abstract base class, method contracts could be declared once, and 
      each concrete form could override only the logic that changed for that model or year.
    </p>

    <p>
      To instantiate the correct form dynamically, I created a <span className='fw-bold'>map between form identifiers 
      and their implementation classes</span>. This acted as a routing layer between the database 
      form ID and the calculation logic that needed to run.
    </p>

    <p>
      <strong>The impact:</strong> the main service went from roughly 1200 lines to around 700, the 
      conditional logic was removed, and adding or debugging form versions became safer because each 
      form's behaviour was isolated in its own file.
    </p>
  </>
);

const governmentDescription = (
  <p>
    My first frontend role, working on <span className='fw-bold'>public-sector web applications</span> with a strong 
    focus on accessible UI implementation, semantic HTML and <span className='fw-bold'>WCAG AA standards</span>.
  </p>
); 
const governmentBody = (
  <>
    <p>
      This was my first frontend role. I started by building React apps for public-sector services, 
      with a focus on <span className='fw-bold'>responsive, accessible and design-accurate</span> user interfaces.
    </p>

    <p>
      Because these were government websites, accessibility was not optional. In practice, however,
      {' '}<span className='fw-bold'>many screens did not meet the expected standards</span>. I studied WCAG guidelines, 
      reviewed strong public-sector examples such as UK government services, and helped bring our 
      interfaces closer to accessible standards.
    </p>

    <p>
      A major challenge was that accessibility had not been part of the default design process.
      Some institutional colors had <span className='fw-bold'>poor contrast</span>, and several UI patterns needed adjustment. From 
      an implementation standpoint, <span className='fw-bold'>I ensured the websites were fully usable with keyboard 
      navigation</span>, including complex UI components such as image carousels. I also <span className='fw-bold'>collaborated 
      with the design team</span> to improve those patterns without breaking the visual identity of the product, 
      advising on color choices, animation considerations, icon and image accessibility, and text readability.
    </p>

    <p>
      This role changed the way I write frontend code. I became much more deliberate with <span className='fw-bold'>semantic 
      HTML, ARIA attributes, keyboard navigation and alternative text</span>, especially how those 
      implementation details affect real usability.
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

      <ul className='case-studies-section__case-studies-container center-content'>
        <li>
          <CaseStudy
            body={innovateBody}
            description={innovateDescription}
            href='https://www.innovateod.com/'
            slideFromTheLeft={true}
            logoSrc={locationIcon}
            name='Innovate Group'
            stack={[stackOptions.react, stackOptions.javaScript]}
          />
        </li>

        <li>
          <CaseStudy
            body={eyBody}
            description={eyDescription}
            href='https://www.ey.com/'
            name='EY'
            logoSrc={companyIcon}
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
        </li>

        <li>
          <CaseStudy
            body={governmentBody}
            description={governmentDescription}
            href='https://gba.gob.ar/'
            slideFromTheLeft={true}
            logoSrc={governmentIcon}
            name='Online Services - Buenos Aires'
            stack={[
              stackOptions.react, 
              stackOptions.typeScript, 
              stackOptions.redux, 
              stackOptions.wcag
            ]}
          />
        </li>
      </ul>
    </section>
  );
}
