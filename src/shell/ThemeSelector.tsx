import classNames from 'classnames';
import { Theme, useTheme } from './ThemeProvider';

export const ThemeSelector = () => {
  const { theme, setPreferredTheme } = useTheme();

  const classes = classNames('ml-4 w-5 inline-block transform transition-transform', {
    'rotate-180': theme === Theme.Dark,
  });

  const onThemeChanged = () => {
    setPreferredTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark);
    return false;
  };

  return (
    <a role="button" aria-label="Toggle theme" onClick={onThemeChanged} className={classes}>
      <svg viewBox="0 0 100 100" className="fill-current">
        <path d="M50 2.5A47.5 47.5 0 1 0 97.5 50 47.5 47.5 0 0 0 50 2.5Zm.44 82.57a35.52 35.52 0 0 1 0-71Z" />
      </svg>
    </a>
  );
};
