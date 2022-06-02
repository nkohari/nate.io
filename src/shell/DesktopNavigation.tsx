import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { ThemeSelector } from './ThemeSelector';
import { SECTIONS } from './sections';

const NavigationLinks = () => {
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

export const DesktopNavigation = () => (
  <div className="hidden md:flex items-center">
    <NavigationLinks />
    <ThemeSelector />
  </div>
);
