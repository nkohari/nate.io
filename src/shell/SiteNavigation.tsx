import { ThemeSelector } from 'src/shell';
import { DesktopNavigation, MobileNavigationOverlayToggle } from 'src/shell';

const LINKS = [
  { text: 'About', href: '/' },
  { text: 'Now', href: '/now' },
  { text: 'Work', href: '/work' },
  { text: 'Writing', href: '/writing' },
];

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
