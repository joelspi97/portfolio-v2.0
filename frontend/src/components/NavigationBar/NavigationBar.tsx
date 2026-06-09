import './navigation-bar.scss';

import { useEffect, useRef, useState, type ReactElement } from 'react';

import { useMediaQuery } from '../../hooks/useMediaQuery';

import wcagIcon from '../../assets/icons/wcag-icon.svg';

type navLinkDefinition = { href: string, label: string };

const navLinkDefinitions: navLinkDefinition[] = [
  { href: '#core-technologies', label: 'Core Technologies' },
  { href: '#case-studies', label: 'Case Studies' },
  { href: '#contact', label: 'Contact' }
];

const navLinks: ReactElement[] = navLinkDefinitions.map(({ href, label }): ReactElement => (
  <a className='portfolio-btn' href={href} key={label}>{label}</a>
));

export function NavigationBar(): ReactElement {
  const [isHamburgerMenuOpen, setOpenMenuIsHamburgerMenuOpen] = useState<boolean>(false);
  
  const closeButton = useRef<HTMLButtonElement | null>(null);
  const hamburgerButton = useRef<HTMLButtonElement | null>(null);
  const lockedScrollPosition = useRef<number>(0);
  const menuElement = useRef<HTMLDivElement | null>(null);
  const pageScrollIsLocked = useRef<boolean>(false);
  const isDesktopNavigation = useMediaQuery('(min-width: 610px)');
  const isHamburgerMenuVisible = isHamburgerMenuOpen && !isDesktopNavigation;

  useEffect((): (() => void) => {
    function unlockPageScroll(): void {
      if (!pageScrollIsLocked.current) return;

      document.documentElement.classList.remove('no-scroll');
      document.body.classList.remove('no-scroll');
      document.body.style.top = '';
      window.scrollTo(0, lockedScrollPosition.current);
      pageScrollIsLocked.current = false;
    }

    if (isHamburgerMenuVisible) {
      lockedScrollPosition.current = window.scrollY;
      document.body.style.top = `-${lockedScrollPosition.current}px`;
      document.documentElement.classList.add('no-scroll');
      document.body.classList.add('no-scroll');
      pageScrollIsLocked.current = true;
      closeButton.current?.focus();
    } else {
      unlockPageScroll();
    }

    return unlockPageScroll;
  }, [isHamburgerMenuVisible]);

  useEffect((): (() => void) => {
    function closeMenu(restoreFocus = true): void {
      if (!isHamburgerMenuVisible) return;
      setOpenMenuIsHamburgerMenuOpen(false);
      if (restoreFocus) hamburgerButton.current?.focus();
    }

    function closeMenuWithClick(event: MouseEvent): void {
      const target = event.target as HTMLElement | null;

      if (
        isHamburgerMenuVisible 
        && target 
        && ['backdrop', 'portfolio-btn'].some(className => target.classList.contains(className))
      ) {
        closeMenu(target.classList.contains('backdrop'));
      }
    }
    
    function closeMenuWithKeyboard(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        closeMenu();
        return;
      }

      if (event.key !== 'Tab' || !isHamburgerMenuVisible || !menuElement.current) return;

      const focusableElements = Array.from(
        menuElement.current.querySelectorAll<HTMLAnchorElement | HTMLButtonElement>('a[href], button:not([disabled])')
      );
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];

      if (!firstFocusableElement || !lastFocusableElement) return;

      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
      }

      if (!event.shiftKey && document.activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    }

    if (isDesktopNavigation) return (): void => {};

    document.addEventListener('click', closeMenuWithClick);
    document.addEventListener('keydown', closeMenuWithKeyboard);

    return (): void => {
      document.removeEventListener('click', closeMenuWithClick);
      document.removeEventListener('keydown', closeMenuWithKeyboard);
    };
  }, [isDesktopNavigation, isHamburgerMenuVisible]);

  useEffect((): (() => void) | void => {
    if (!isDesktopNavigation || !isHamburgerMenuOpen) return;

    const closeMenuTimeout = window.setTimeout((): void => {
      setOpenMenuIsHamburgerMenuOpen(false);
    });

    return (): void => window.clearTimeout(closeMenuTimeout);
  }, [isDesktopNavigation, isHamburgerMenuOpen]);

  function toggleHamburgerMenu(): void {
    setOpenMenuIsHamburgerMenuOpen(prevValue => !prevValue);
  }

  return (
    <nav aria-label='Primary navigation' className='nav'>
      <a 
        className='nav__wcag-link'
        href='https://www.w3.org/WAI/WCAG2AA-Conformance' 
        rel='noreferrer'
        title='Explanation of WCAG 2 Level AA conformance'
        target='_blank'
      >
        <img 
          alt='Level AA conformance, W3C Web Content Accessibility Guidelines 2.2, opens in a new tab.'
          height={31} 
          src={wcagIcon}
          width={'88'}
        />
      </a>
      
      {!isDesktopNavigation 
        ? <>
            <button 
              aria-expanded={isHamburgerMenuVisible}
              aria-label='Open navigation menu.'
              className='hamburger-menu focusable' 
              onClick={toggleHamburgerMenu} 
              ref={hamburgerButton}
              type='button'
            >
              <span aria-hidden='true' className='hamburger-icon'></span>
            </button>

            {isHamburgerMenuVisible && 
              <>
                <div className='backdrop'></div>

                <div className='nav__link-wrapper' ref={menuElement}>
                  <button 
                    aria-label='Close navigation menu.'
                    className='close-btn' 
                    onClick={() => { 
                      setOpenMenuIsHamburgerMenuOpen(false);
                      hamburgerButton.current?.focus(); 
                    }}
                    ref={closeButton}
                    type='button' 
                  >
                    <span aria-hidden='true' className='close-icon'></span>
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
