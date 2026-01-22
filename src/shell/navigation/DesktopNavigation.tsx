import cx from 'classnames';
import { motion } from 'motion/react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

type DesktopNavigationLinkProps = {
  href: string;
  text: string;
};

function DesktopNavigationLink({ href, text }: DesktopNavigationLinkProps) {
  const [hover, setHover] = useState(false);

  const getClasses = ({ isActive }: { isActive: boolean }) => {
    return cx(
      'relative inline-flex justify-center px-2.5',
      isActive && 'underline underline-offset-4 decoration-2 decoration-background-alt',
    );
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
          className="absolute z-1 h-full w-full rounded-full bg-background-alt"
        />
      )}
    </NavLink>
  );
}

export function DesktopNavigation() {
  return (
    <nav className="flex items-center">
      <DesktopNavigationLink href="/" text="About" />
      <DesktopNavigationLink href="/now" text="Now" />
      <DesktopNavigationLink href="/work" text="Work" />
      <DesktopNavigationLink href="/writing" text="Writing" />
      <DesktopNavigationLink href="/music" text="Music" />
    </nav>
  );
}
