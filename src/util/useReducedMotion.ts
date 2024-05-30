import { useState, useEffect } from 'react';

export function useReducedMotion(defaultSetting = false) {
  const [reducedMotion, setReducedMotion] = useState(defaultSetting);

  useEffect(() => {
    const onPreferenceChanged = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (mediaQuery) {
      setReducedMotion(mediaQuery.matches);
      mediaQuery.addEventListener('change', onPreferenceChanged);
      return () => mediaQuery.removeEventListener('change', onPreferenceChanged);
    }
  }, []);

  return reducedMotion;
}
