import cx from 'classnames';
import { NavLink } from 'react-router-dom';
import { Icon } from 'src/components';

export type MobileNavigationLinkProps = {
  href: string;
  text: string;
  onClose: () => unknown;
};

function MobileNavigationLink({ href, onClose, text }: MobileNavigationLinkProps) {
  const getClasses = ({ isActive }: { isActive: boolean }) => {
    return cx('text-lg p-6', isActive && 'bg-background-alt font-semibold');
  };

  return (
    <NavLink key={href} to={href} className={getClasses} onClick={onClose}>
      {text}
    </NavLink>
  );
}

type MobileNavigationOverlayProps = {
  onClose: () => unknown;
};

export function MobileNavigationOverlay({ onClose }: MobileNavigationOverlayProps) {
  return (
    <div className="fixed z-20 inset-0 bg-background">
      <button type="button" onClick={onClose} className="absolute w-5 top-6 right-6">
        <Icon type="close" />
      </button>
      <nav className="flex flex-col">
        <MobileNavigationLink href="/" text="About" onClose={onClose} />
        <MobileNavigationLink href="/now" text="Now" onClose={onClose} />
        <MobileNavigationLink href="/work" text="Work" onClose={onClose} />
        <MobileNavigationLink href="/writing" text="Writing" onClose={onClose} />
        <MobileNavigationLink href="/uses" text="Uses" onClose={onClose} />
        <MobileNavigationLink href="/biking" text="Biking" onClose={onClose} />
        <MobileNavigationLink href="/music" text="Music" onClose={onClose} />
        <MobileNavigationLink href="/art" text="Art" onClose={onClose} />
      </nav>
    </div>
  );
}
