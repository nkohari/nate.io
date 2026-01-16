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
  block: 'transition transition-colors text-background bg-link hover:bg-link-hover',
  normal:
    'transition transition-all duration-200 underline underline-offset-2 text-link decoration-link/60 hover:text-link-hover hover:decoration-link-hover hover:underline-offset-4',
  spotify:
    'transition transition-all duration-200 text-link hover:text-spotify hover:decoration-spotify',
  subtle:
    'transition transition-all duration-200 hover:underline underline-offset-2 decoration-transparent hover:text-link-hover hover:decoration-link-hover',
  'subtle-with-underline':
    'transition transition-all duration-200 underline underline-offset-2 decoration-link/60 hover:text-link-hover hover:decoration-link-hover',
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
    'scroll-mt-[50vh]',
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
