import React, { useState } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { ThemeSelector } from './ThemeSelector';

export const NAVIGATION_LINKS = [
  { text: 'About', href: '/' },
  { text: 'Now', href: '/now' },
  { text: 'Work', href: '/work' },
  { text: 'Writing', href: '/writing' },
];

type OverlayMenuProps = {
  onClose: () => unknown;
};

const OverlayMenu = ({ onClose }: OverlayMenuProps) => {
  const getClasses = ({ isActive }: { isActive: boolean }) => {
    return classNames('text-lg mb-12', {
      'font-bold': isActive,
    });
  };
  return (
    <div className="fixed z-10 inset-0 p-8 bg-white dark:bg-slate-800">
      <a role="button" onClick={onClose} className="absolute w-5 top-8 right-8">
        <svg viewBox="0 0 32 32" className="fill-current">
          <path d="M20.242,16L31.707,4.535c0.391-0.391,0.391-1.023,0-1.414l-2.828-2.828C28.684,0.098,28.428,0,28.172,0  s-0.512,0.098-0.707,0.293L16,11.758L4.535,0.293c-0.391-0.391-1.023-0.391-1.414,0L0.293,3.121C0.098,3.316,0,3.572,0,3.828  S0.098,4.34,0.293,4.535L11.758,16L0.293,27.465c-0.391,0.391-0.391,1.023,0,1.414l2.828,2.828C3.316,31.902,3.572,32,3.828,32  s0.512-0.098,0.707-0.293L16,20.242l11.465,11.465c0.391,0.391,1.023,0.391,1.414,0l2.828-2.828C31.902,28.684,32,28.428,32,28.172  s-0.098-0.512-0.293-0.707L20.242,16z"></path>
        </svg>
      </a>
      <nav className="flex flex-col">
        {NAVIGATION_LINKS.map(({ href, text }) => (
          <NavLink key={href} to={href} className={getClasses} onClick={onClose}>
            {text}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

const OverlayMenuToggle = () => {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const toggleOverlayVisible = () => setOverlayVisible((value) => !value);

  return (
    <React.Fragment>
      <a className="flex md:hidden items-center w-5" role="button" onClick={toggleOverlayVisible}>
        <svg viewBox="0 0 100 100" className="fill-current">
          <path d="M92 14H8C4.68629 14 2 16.6863 2 20C2 23.3137 4.68629 26 8 26H92C95.3137 26 98 23.3137 98 20C98 16.6863 95.3137 14 92 14Z"></path>
          <path d="M92 44H8C4.68629 44 2 46.6863 2 50C2 53.3137 4.68629 56 8 56H92C95.3137 56 98 53.3137 98 50C98 46.6863 95.3137 44 92 44Z"></path>
          <path d="M8 74H92C95.3137 74 98 76.6863 98 80C98 83.3137 95.3137 86 92 86H8C4.68629 86 2 83.3137 2 80C2 76.6863 4.68629 74 8 74Z"></path>
        </svg>
      </a>
      {overlayVisible && <OverlayMenu onClose={toggleOverlayVisible} />}
    </React.Fragment>
  );
};

export const MobileNavigation = () => (
  <div className="flex items-center md:hidden">
    <OverlayMenuToggle />
    <ThemeSelector />
  </div>
);
