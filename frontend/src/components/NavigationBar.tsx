import '../scss/components/navigation-bar.scss';

import { useEffect, useRef, useState, type ReactElement } from 'react';

import { useMediaQuery } from '../hooks/useMediaQuery';

const navLinkDefinitions: { href: string, label: string }[] = [
  { href: '#about-me', label: 'About me' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' }
];

const navLinks: ReactElement[] = navLinkDefinitions.map(({ href, label }) => (
  <a className='portfolio-btn' href={href} key={label}>{label}</a>
));

export function NavigationBar(): ReactElement {
  const [isHamburgerMenuOpen, setOpenMenuIsHamburgerMenuOpen] = useState<boolean>(false);
  
  const bodyElement = document.body;
  const hamburgerButton = useRef<HTMLButtonElement | null>(null);
  const isDesktopNavigation = useMediaQuery('(min-width: 600px)');

  useEffect((): (() => void) => {
    document.addEventListener('click', closeMenuWithClick);
    document.addEventListener('keydown', closeMenuWithKeyboard);

    return (): void => {
      document.removeEventListener('click', closeMenuWithClick);
      document.removeEventListener('keydown', closeMenuWithKeyboard);
    };
  }, []);

  useEffect((): void => {
    const focusableElements = Array.from(document.querySelectorAll('.focusable'));

    if (isHamburgerMenuOpen) {
      focusableElements.forEach(element => element.setAttribute('tabindex', '-1'));

    } else {
      focusableElements.forEach(element => element.removeAttribute('tabindex'));
    }
  }, [isHamburgerMenuOpen]);

  useEffect((): void => {
    if (isDesktopNavigation) closeMenu();
  }, [isDesktopNavigation]);

  function closeMenu(): void {
    if (!isHamburgerMenuOpen) return;
    setOpenMenuIsHamburgerMenuOpen(false);
    bodyElement.classList.remove('no-scroll');
  }

  function closeMenuWithClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;

    if (
      isHamburgerMenuOpen 
      && target 
      && ['backdrop', 'portfolio-btn'].some(className => target.classList.contains(className))
    ) {
      closeMenu();
    }
  }
  
  function closeMenuWithKeyboard(event: KeyboardEvent): void {
    if (event.key === 'Escape') closeMenu();
  }

  function toggleHamburgerMenu(): void {
    window.scrollTo(0, 0);
    setOpenMenuIsHamburgerMenuOpen(prevValue => !prevValue);
    bodyElement.classList.toggle('no-scroll');
  }

  return (
    <nav className='nav'>
      {!isDesktopNavigation 
        ? <>
            <button 
              aria-expanded={isHamburgerMenuOpen}
              className='hamburger-menu focusable' 
              onClick={toggleHamburgerMenu} 
              ref={hamburgerButton}
              type='button'
            >
              <span className='sr-only'>Open navigation menu.</span>
              <span className='hamburger-icon'></span>
            </button>

            {isHamburgerMenuOpen && 
              <>
                <div className='backdrop'></div>

                <div className='nav__link-wrapper'>
                  <button 
                    className='close-btn' 
                    onClick={() => { 
                      toggleHamburgerMenu(); 
                      hamburgerButton.current?.focus(); 
                    }}
                    type='button' 
                  >
                    <span className='sr-only'>Close navigation menu.</span>
                    <span className='close-icon'></span>
                  </button>
                
                  {navLinks}
                </div>
              </>
            }
          </>
        : <div className='nav__link-wrapper'>{navLinks}</div>
      }
    </nav>
  );
}
