import {useEffect, useLayoutEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

export type ScrollControllerProps = {
  children: React.ReactNode;
};

export const ScrollController = ({children}: ScrollControllerProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [previousLocation, setPreviousLocation] = useState(location);

  useEffect(() => {
    const handleScroll = () => {
      if (location.hash.length > 1 && window.scrollY === 0) {
        navigate(location.pathname, {replace: true});
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location, navigate]);

  useLayoutEffect(() => {
    if (location.pathname !== previousLocation.pathname) {
      window.scrollTo({top: 0, left: 0});
    }
    setPreviousLocation(location);
  }, [location, previousLocation.pathname]);

  return <>{children}</>;
};
