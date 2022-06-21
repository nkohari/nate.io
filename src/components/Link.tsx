import classNames from 'classnames';
import { Link as RouterLink } from 'react-router-dom';

export type LinkType = 'unstyled' | 'block' | 'normal' | 'subtle';

export const LINK_CLASSES: Record<LinkType, string> = {
  unstyled: '',
  block:
    'transition transition-colors font-semibold bg-slate-200 dark:bg-slate-600 hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white',
  normal:
    'transition transition-all font-semibold underline underline-offset-1 text-blue-500 dark:text-blue-300 hover:text-blue-600 decoration-transparent hover:decoration-blue-600 hover:dark:decoration-blue-300',
  subtle:
    'transition transition-all hover:underline underline underline-offset-1 decoration-transparent hover:text-blue-600 hover:decoration-blue-600 dark:hover:text-blue-400 dark:hover:decoration-blue-400',
};

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  type?: LinkType;
};

export const Link = ({ className, children, href, type = 'normal', ...props }: LinkProps) => {
  const classes = classNames(LINK_CLASSES[type], className);

  if (href?.startsWith('/')) {
    return (
      <RouterLink to={href} className={classes} {...props}>
        {children}
      </RouterLink>
    );
  } else if (href?.startsWith('#')) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  } else {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
};
