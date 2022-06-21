import React, { useState } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Icon } from 'src/components';
import { ThemeSelector } from 'src/shell';

const SECTIONS = [
  { text: 'About', href: '/' },
  { text: 'Now', href: '/now' },
  { text: 'Work', href: '/work' },
  { text: 'Writing', href: '/writing' },
];

type MobileNavigationOverlayProps = {
  onClose: () => unknown;
};

const MobileNavigationOverlay = ({ onClose }: MobileNavigationOverlayProps) => {
  const getClasses = ({ isActive }: { isActive: boolean }) => {
    return classNames('text-lg mb-12', {
      'font-bold': isActive,
    });
  };
  return (
    <div className="fixed z-10 inset-0 p-8 bg-white dark:bg-slate-800">
      <a role="button" onClick={onClose} className="absolute w-5 top-8 right-8">
        <Icon type="close" />
      </a>
      <nav className="flex flex-col">
        {SECTIONS.map(({ href, text }) => (
          <NavLink key={href} to={href} className={getClasses} onClick={onClose}>
            {text}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

const MobileNavigationOverlayToggle = () => {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const toggleOverlayVisible = () => setOverlayVisible((value) => !value);

  return (
    <React.Fragment>
      <a className="flex md:hidden items-center w-5" role="button" onClick={toggleOverlayVisible}>
        <Icon type="menu" />
      </a>
      {overlayVisible && <MobileNavigationOverlay onClose={toggleOverlayVisible} />}
    </React.Fragment>
  );
};

const DesktopNavigationLinks = () => {
  const getClasses = ({ isActive }: { isActive: boolean }) => {
    return classNames(
      'inline-block ml-2 px-2 py-0.5 rounded-lg transition-[background] hover:bg-slate-200 dark:hover:bg-slate-600',
      {
        'font-bold': isActive,
      }
    );
  };

  return (
    <nav className="flex items-center">
      {SECTIONS.map(({ href, text }) => (
        <NavLink key={href} to={href} className={getClasses}>
          {text}
        </NavLink>
      ))}
    </nav>
  );
};

export const SiteNavigation = () => (
  <React.Fragment>
    <div className="flex md:hidden items-center">
      <MobileNavigationOverlayToggle />
      <ThemeSelector />
    </div>
    <div className="hidden md:flex items-center">
      <DesktopNavigationLinks />
      <ThemeSelector />
    </div>
  </React.Fragment>
);
