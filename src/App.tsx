import { useCatalog } from '@apocrypha/core/catalog';
import { AnimatePresence } from 'motion/react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import {
  Body,
  ManifestProvider,
  NotFound,
  ScrollController,
  SiteFooter,
  SiteHeader,
  ThemeProvider,
} from 'src/shell';

const RouteList = () => {
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
  <BrowserRouter>
    <ThemeProvider>
      <ManifestProvider>
        <ScrollController>
          <div className="flex flex-col items-center leading-relaxed text-primary min-h-[90vh] bg-background transition-colors">
            <SiteHeader />
            <RouteList />
            <SiteFooter />
          </div>
        </ScrollController>
      </ManifestProvider>
    </ThemeProvider>
  </BrowserRouter>
);
