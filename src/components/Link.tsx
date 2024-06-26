import cx from 'classnames';
import { Link as RouterLink } from 'react-router-dom';
import { Icon, IconType } from 'src/components';

export type LinkType =
  | 'unstyled'
  | 'block'
  | 'normal'
  | 'spotify'
  | 'subtle'
  | 'subtle-with-underline';

export const LINK_CLASSES: Record<LinkType, string> = {
  unstyled: '',
  block:
    'transition transition-colors bg-slate-200 dark:bg-slate-600 hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white',
  normal:
    'transition transition-all duration-200 underline underline-offset-2 hover:underline-offset-4 text-slate-700 decoration-slate-400 dark:text-slate-300 dark:decoration-slate-500 hover:text-blue-600 hover:dark:text-blue-300 hover:decoration-blue-600 hover:dark:decoration-blue-300',
  spotify:
    'transition transition-all duration-200 hover:underline underline-offset-2 hover:underline-offset-4 decoration-transparent hover:text-[#1db954] hover:decoration-[#1db954] dark:hover:text-[#1db954] dark:hover:decoration-[#1db954]',
  subtle:
    'transition transition-all duration-200 hover:underline underline-offset-2 decoration-transparent hover:text-blue-600 hover:decoration-blue-600 dark:hover:text-blue-400 dark:hover:decoration-blue-400',
  'subtle-with-underline':
    'transition transition-all duration-200 underline underline-offset-2 decoration-slate-400 hover:text-blue-600 hover:decoration-blue-600 dark:hover:text-blue-400 dark:hover:decoration-blue-400',
};

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  type?: LinkType;
  icon?: IconType;
  iconPosition?: 'left' | 'right';
  iconSpacing?: number;
};

// These arrays might seem redundant, but the class names need to be explicitly mentioned
// so Tailwind doesn't trim them from the resulting bundle.
const ICON_SPACING_CLASSES = {
  left: ['mr-0', 'mr-1', 'mr-2'],
  right: ['ml-0', 'ml-1', 'ml-2'],
};

export function Link({
  className,
  children,
  icon,
  iconPosition = 'left',
  iconSpacing = 1,
  href,
  type = 'normal',
  ...props
}: LinkProps) {
  const linkClasses = cx(
    LINK_CLASSES[type],
    icon && 'inline-flex flex-row items-center',
    icon && iconPosition === 'right' && 'flex-row-reverse',
    className,
  );

  let content: React.ReactNode;

  if (!icon) {
    content = children;
  } else {
    content = (
      <>
        <Icon type={icon} className={ICON_SPACING_CLASSES[iconPosition][iconSpacing]} />
        <span>{children}</span>
      </>
    );
  }

  if (href?.startsWith('/')) {
    return (
      <RouterLink to={href} className={linkClasses} {...props}>
        {content}
      </RouterLink>
    );
  }

  if (href?.startsWith('#')) {
    return (
      <a href={href} className={linkClasses} {...props}>
        {content}
      </a>
    );
  }

  return (
    <a {...props} href={href} className={linkClasses} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  );
}
