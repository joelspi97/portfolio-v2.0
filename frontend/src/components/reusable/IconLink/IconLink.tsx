import './icon-link.scss';

import type { ReactElement } from 'react';

import downloadIcon from '../../../assets/icons/download-icon.svg';
import githubIcon from '../../../assets/icons/github-icon.svg';
import linkedinIcon from '../../../assets/icons/linkedin-icon.svg';

type IconLinkProps = {
  ariaLabel: string;
  href: string;
  label?: string;
  size: number;
  src: string;
  target?: '_blank';
  title: string;
};

type IconLinkWrapper = {
  showLabel?: boolean;
  size: number;
};

export function IconLink(props: IconLinkProps): ReactElement {
  const { ariaLabel, href, label, size, src, target, title } = props;

  return (
    <a
      aria-label={ariaLabel}
      className={`icon-link${label ? ' icon-link--labeled' : ''} focusable`}
      href={href}
      rel={target === '_blank' ? 'noreferrer' : undefined}
      target={target}
      title={title}
      style={{ borderWidth: `${size/200}rem`, padding: `${size/400}rem` }}
    >
      <img alt="" src={src} height={size} width={size} />
      {label && <span>{label}</span>}
    </a>
  );
}

export function DownloadIconLink(props: IconLinkWrapper): ReactElement {
  const { showLabel, size } = props;

  return (
    <IconLink
      ariaLabel='Download my CV.'
      href='https://docs.google.com/document/d/1SW3h7m5QxT2kelzDsRREQFymh-uJN1xxFs6DV-M3hPk/export?format=pdf'
      label={showLabel ? 'Download CV' : undefined}
      size={size}
      src={downloadIcon}
      title="Download my CV"
    />
  );
}

export function GithubIconLink(props: IconLinkWrapper): ReactElement {
  const { showLabel, size } = props;

  return (
    <IconLink
      ariaLabel="Visit this website's Github repository, opens in a new tab."
      href='https://github.com/joelspi97/portfolio-v2.0'
      label={showLabel ? 'GitHub' : undefined}
      src={githubIcon}
      size={size}
      target='_blank'
      title="Visit this website's Github repository"
    />
  );
}

export function LinkedInIconLink(props: IconLinkWrapper): ReactElement {
  const { showLabel, size } = props;

  return (
    <IconLink
      ariaLabel='Visit my LinkedIn profile, opens in a new tab.'
      href='https://www.linkedin.com/in/joel-spinelli'
      label={showLabel ? 'LinkedIn' : undefined}
      size={size}
      src={linkedinIcon}
      target='_blank'
      title="Visit my LinkedIn profile"
    />
  );
}
