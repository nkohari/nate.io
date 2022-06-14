import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export type ScrollControllerProps = {
  children: React.ReactNode;
};

export const ScrollController = ({ children }: ScrollControllerProps) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [location.key]);

  return <React.Fragment>{children}</React.Fragment>;
};
