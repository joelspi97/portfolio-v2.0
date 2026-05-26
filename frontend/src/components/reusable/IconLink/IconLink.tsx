import './icon-link.scss';

import type { ReactElement } from 'react';

import downloadIcon from '../../../assets/icons/download-icon.svg';
import githubIcon from '../../../assets/icons/github-icon.svg';
import linkedinIcon from '../../../assets/icons/linkedin-icon.svg';

type IconLinkProps = {
  ariaLabel: string;
  href: string;
  size: number;
  src: string;
  title: string;
};

type IconLinkWrapper = {
  size: number;
};

export function IconLink(props: IconLinkProps): ReactElement {
  const { ariaLabel, href, size, src, title } = props;

  return (
    <a
      aria-label={ariaLabel}
      className='icon-link focusable'
      href={href}
      rel='noreferrer'
      target='_blank'
      title={title}
      style={{ borderWidth: `${size/200}rem`, padding: `${size/400}rem` }}
    >
      <img alt="" src={src} height={size} width={size} />
    </a>
  );
}

export function DownloadIconLink(props: IconLinkWrapper): ReactElement {
  const { size } = props;

  return (
    <IconLink
      ariaLabel='Download my CV.'
      href='https://docs.google.com/document/d/1SW3h7m5QxT2kelzDsRREQFymh-uJN1xxFs6DV-M3hPk/export?format=pdf'
      size={size}
      src={downloadIcon}
      title="Download my CV"
    />
  );
}

export function GithubIconLink(props: IconLinkWrapper): ReactElement {
  const { size } = props;

  return (
    <IconLink
      ariaLabel="Visit this website's Github repository, opens in a new tab."
      href='https://github.com/joelspi97/portfolio-v2.0'
      src={githubIcon}
      size={size}
      title="Visit this website's Github repository"
    />
  );
}

export function LinkedInIconLink(props: IconLinkWrapper): ReactElement {
  const { size } = props;

  return (
    <IconLink
      ariaLabel='Visit my LinkedIn profile, opens in a new tab.'
      href='https://www.linkedin.com/in/joel-spinelli'
      size={size}
      src={linkedinIcon}
      title="Visit my LinkedIn profile"
    />
  );
}
