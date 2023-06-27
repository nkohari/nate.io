import {useLayoutEffect} from 'react';
import {useLocation} from 'react-router-dom';

export type DocumentProps = {
  children: React.ReactNode;
};

export const Document = ({children}: DocumentProps) => {
  const location = useLocation();

  // If the URL contains a hash which refers to a DOM element on the page, scroll to it.
  // This check needs to happen inside Document to ensure the content is loaded before
  // trying to check for the DOM element.
  useLayoutEffect(() => {
    if (location.hash?.length > 1) {
      const el = document.getElementById(location.hash.substring(1));
      el?.scrollIntoView({behavior: 'smooth'});
    }
  }, [location.hash]);

  return <article className="flex-1 w-full">{children}</article>;
};
