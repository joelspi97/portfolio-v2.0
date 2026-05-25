import './projects-section.scss';

import { type ReactElement } from 'react';

import { Project } from '../Project/Project';

export function ProjectsSection(): ReactElement {
  return (
    <section className='section projects-section' id='projects'>
      <div className='section-decoration'></div>

      <h1 className='section-heading'>Projects</h1>

      <div className='projects-section__grid-container center-content'>
        <Project
          demoUrl='https://mi-blog-s6m5.onrender.com'
          description='MI Blog is a generic blog website. It allows its users to create their own blogposts and read the ones others have created before them.'
          features={[
            'A CRUD system, to allow users interact with a database.',
            'A form with validation logic, to avoid sending incorrect data to the database.',
            'A details page for each item, which allows user to select a specific blog and get more details on it.',
            'An accessible UI that follows the Web Content Accessibility Guidelines (WCAG) 2.1.'
          ]}
          iconClassName='generic-blog-icon'
          isOnTheLeft={true}
          name='Innovate Group'
          repositoryUrl='https://github.com/joelspi97/MI-blog'
          stack={['NodeJS', 'Express', 'MongoDB', 'HTML5', 'CSS3']}
        />

        <Project
          demoUrl='https://movie-finder-sigma-bay.vercel.app/'
          description='Movie Finder is a platform that lets user search for information about any movie they want. It also allows them to rate them using their TMDb account.'
          features={[
            'An infinite scroll list, which retrieves data from an API to display movies.',
            'An input which allows the user to search for specific titles.',
            'A details page for each movie that offers an option for users to be able to vote on movie ratings.',
            'An accessible UI that follows the Web Content Accessibility Guidelines (WCAG) 2.1.'
          ]}
          iconClassName='movie-finder-icon'
          name='EY (Ernst & Young)'
          repositoryUrl='https://github.com/joelspi97/movie-finder'
          stack={['React', 'TypeScript', 'Redux (+Thunk)', 'Bootstrap', 'Sass']}
        />

        <Project
          demoUrl='https://to-do-list-joelspinelli.netlify.app/'
          description='To-do List is a web application that allows users to make their own list of chores, and arrenge their tasks as they wish.'
          features={[
            'A menu for users to create their own to-do\'s, which can later be edited, marked as completed and/or deleted.',
            'Usage of a third party library to make to-do\'s draggable and droppable to rearrange them',
            'Usage of local storage to save and display the user\'s to-do\'s.',
            'An input which allows the user to search for specific to-do\'s.',
            'A settings menu which allows the user to customize their experience on the webpage.',
            'An accessible UI that follows the Web Content Accessibility Guidelines (WCAG) 2.1.'
          ]}
          iconClassName='to-do-list-icon'
          isOnTheLeft={true}
          name='Online Services - Buenos Aires'
          repositoryUrl='https://github.com/joelspi97/To-do-List'
          stack={['React', 'Redux', 'Sass']}
        />
      </div>
    </section>
  );
}
