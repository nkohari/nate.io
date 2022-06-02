import classNames from 'classnames';
import { Link as RouterLink } from 'react-router-dom';

export const LINK_CLASSES: Record<LinkType, string> = {
  button: '',
  normal:
    'font-semibold hover:underline text-blue-500 dark:text-blue-300 underline-offset-2 decoration-2',
  subtle:
    'hover:underline text-current hover:text-blue-500 dark:hover:text-blue-400 underline-offset-2 decoration-2',
};

export type LinkType = 'button' | 'normal' | 'subtle';

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
