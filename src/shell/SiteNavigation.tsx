import cx from 'classnames';
import { motion } from 'motion/react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from 'src/components';
import { ThemeSelector } from 'src/shell';

const SECTIONS = [
  { text: 'About', href: '/' },
  { text: 'Now', href: '/now' },
  { text: 'Work', href: '/work' },
  { text: 'Biking', href: '/biking' },
  { text: 'Writing', href: '/writing' },
  { text: 'Music', href: '/music' },
  { text: 'Art', href: '/art' },
];

type MobileNavigationOverlayProps = {
  onClose: () => unknown;
};

function MobileNavigationOverlay({ onClose }: MobileNavigationOverlayProps) {
  const getClasses = ({ isActive }: { isActive: boolean }) => {
    return cx('text-lg mb-12', isActive && 'font-bold');
  };

  return (
    <div className="fixed z-10 inset-0 p-8 bg-white dark:bg-slate-800">
      <button type="button" onClick={onClose} className="absolute w-5 top-8 right-8">
        <Icon type="close" />
      </button>
      <nav className="flex flex-col">
        {SECTIONS.map(({ href, text }) => (
          <NavLink key={href} to={href} className={getClasses} onClick={onClose}>
            {text}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

function MobileNavigationOverlayToggle() {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const toggleOverlayVisible = () => setOverlayVisible((value) => !value);

  return (
    <>
      <button
        type="button"
        className="flex md:hidden items-center w-5"
        role="button"
        onClick={toggleOverlayVisible}
      >
        <Icon type="menu" />
      </button>
      {overlayVisible && <MobileNavigationOverlay onClose={toggleOverlayVisible} />}
    </>
  );
}

type DesktopNavigationLinkProps = {
  href: string;
  text: string;
};

function DesktopNavigationLink({ href, text }: DesktopNavigationLinkProps) {
  const [hover, setHover] = useState(false);

  const getClasses = ({ isActive }: { isActive: boolean }) => {
    return cx('relative inline-flex justify-center px-2.5', isActive && 'font-bold');
  };

  return (
    <NavLink
      key={href}
      to={href}
      className={getClasses}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="relative z-10 text-[16px]">{text}</span>
      {hover && (
        <motion.div
          layoutId="navigation"
          initial={false}
          animate={{ top: 0, x: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 10, mass: 0.4 }}
          className="absolute z-1 h-full w-full rounded-full bg-slate-200 dark:bg-slate-600"
        />
      )}
    </NavLink>
  );
}

function DesktopNavigation() {
  const links = SECTIONS.map(({ href, text }) => (
    <DesktopNavigationLink key={href} href={href} text={text} />
  ));
  return <nav className="flex items-center">{links}</nav>;
}

export function SiteNavigation() {
  return (
    <>
      <div className="flex md:hidden items-center">
        <MobileNavigationOverlayToggle />
        <ThemeSelector />
      </div>
      <div className="hidden md:flex items-center">
        <DesktopNavigation />
        <ThemeSelector />
      </div>
    </>
  );
}
