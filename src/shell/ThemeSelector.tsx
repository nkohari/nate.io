import classNames from 'classnames';
import { Icon } from 'src/components';
import { Theme, useTheme } from 'src/shell';

export const ThemeSelector = () => {
  const { theme, setPreferredTheme } = useTheme();

  const classes = classNames('flex items-center ml-4 transform transition-transform', {
    'rotate-180': theme === Theme.Dark,
  });

  const onThemeChanged = () => {
    setPreferredTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark);
    return false;
  };

  return (
    <a role="button" aria-label="Toggle theme" onClick={onThemeChanged} className={classes}>
      <Icon type="theme" />
    </a>
  );
};
