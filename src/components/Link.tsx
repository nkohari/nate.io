import classNames from 'classnames';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Icon, IconType } from 'src/components';

export type LinkType = 'unstyled' | 'block' | 'normal' | 'subtle';

export const LINK_CLASSES: Record<LinkType, string> = {
  unstyled: '',
  block:
    'transition transition-colors font-semibold bg-slate-200 dark:bg-slate-600 hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white',
  normal:
    'transition transition-all font-semibold hover:underline underline-offset-1 decoration-transparent text-blue-500 dark:text-blue-300 hover:text-blue-600 hover:decoration-blue-600 hover:dark:decoration-blue-300',
  subtle:
    'transition transition-all hover:underline underline-offset-1 decoration-transparent hover:text-blue-600 hover:decoration-blue-600 dark:hover:text-blue-400 dark:hover:decoration-blue-400',
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

export const Link = ({
  className,
  children,
  icon,
  iconPosition = 'left',
  iconSpacing = 1,
  href,
  type = 'normal',
  ...props
}: LinkProps) => {
  const linkClasses = classNames(LINK_CLASSES[type], className, {
    [`inline-flex flex-row items-center`]: !!icon,
    'flex-row-reverse': !!icon && iconPosition === 'right',
  });

  const iconClasses = ICON_SPACING_CLASSES[iconPosition][iconSpacing];

  let content;
  if (!icon) {
    content = children;
  } else {
    content = (
      <React.Fragment>
        <Icon type={icon} className={iconClasses} />
        <span>{children}</span>
      </React.Fragment>
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
};
