import React, { useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export type ScrollControllerProps = {
  children: React.ReactNode;
};

export const ScrollController = ({ children }: ScrollControllerProps) => {
  const location = useLocation();
  const [previousLocation, setPreviousLocation] = useState(location);

  useLayoutEffect(() => {
    if (location.pathname !== previousLocation.pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
    setPreviousLocation(location);
  }, [location]);

  return <React.Fragment>{children}</React.Fragment>;
};
