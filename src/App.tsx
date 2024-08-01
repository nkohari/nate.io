import { Route, Routes, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import { useCatalog } from '@apocrypha/catalog';
import { Body, NotFound, ScrollController, SiteFooter, SiteHeader, ThemeProvider } from 'src/shell';

const ArticleRoutes = () => {
  const articles = useCatalog();
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        {Object.values(articles).map(({ path }) => (
          <Route key={path} path={path} element={<Body path={path} />} />
        ))}
        <Route key="*" path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export const App = () => (
  <HelmetProvider>
    <ThemeProvider>
      <ScrollController>
        <div className="flex flex-col items-center min-h-screen">
          <div className="flex-1 flex flex-col w-full max-w-[900px] px-8">
            <SiteHeader />
            <ArticleRoutes />
          </div>
          <SiteFooter />
        </div>
      </ScrollController>
    </ThemeProvider>
  </HelmetProvider>
);
