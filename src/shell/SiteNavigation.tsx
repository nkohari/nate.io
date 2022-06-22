import React, { useState } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Icon } from 'src/components';
import { ThemeSelector } from 'src/shell';

const SECTIONS = [
  { text: 'About', href: '/' },
  { text: 'Now', href: '/now' },
  { text: 'Work', href: '/work' },
  { text: 'Music', href: '/music' },
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

type DesktopNavigationLinkProps = {
  href: string;
  text: string;
};

const DesktopNavigationLink = ({ href, text }: DesktopNavigationLinkProps) => {
  const [hover, setHover] = useState(false);

  const getClasses = ({ isActive }: { isActive: boolean }) => {
    return classNames('relative inline-flex justify-center px-2.5', {
      'font-bold': isActive,
    });
  };

  return (
    <NavLink
      key={href}
      to={href}
      className={getClasses}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="relative z-10">{text}</span>
      {hover && (
        <motion.div
          layoutId="navigation"
          initial={false}
          animate={{ top: 0, x: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 10, mass: 0.6 }}
          className="absolute z-1 h-full w-full rounded-md bg-slate-200 dark:bg-slate-700"
        />
      )}
    </NavLink>
  );
};

const DesktopNavigation = () => {
  const links = SECTIONS.map(({ href, text }) => (
    <DesktopNavigationLink key={href} href={href} text={text} />
  ));
  return <nav className="flex items-center">{links}</nav>;
};

export const SiteNavigation = () => (
  <React.Fragment>
    <div className="flex md:hidden items-center">
      <MobileNavigationOverlayToggle />
      <ThemeSelector />
    </div>
    <div className="hidden md:flex items-center">
      <DesktopNavigation />
      <ThemeSelector />
    </div>
  </React.Fragment>
);
