import classNames from 'classnames';
import { motion } from 'framer-motion';
import { Icon } from 'src/components';
import { Theme, useTheme } from 'src/shell';

const variants = {
  light: {
    rotate: 0,
    transition: { type: 'spring', duration: 0.05 },
  },
  dark: {
    rotate: 180,
    transition: { type: 'spring', duration: 0.05 },
  },
};

export const ThemeSelector = () => {
  const { theme, setPreferredTheme } = useTheme();

  const onThemeChanged = () => {
    setPreferredTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark);
    return false;
  };

  return (
    <motion.a
      role="button"
      aria-label="Toggle theme"
      className="flex items-center ml-4 transform transition-transform"
      onClick={onThemeChanged}
      initial={false}
      animate={theme}
      variants={variants}
    >
      <Icon type="theme" />
    </motion.a>
  );
};
