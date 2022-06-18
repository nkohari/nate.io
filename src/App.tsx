import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useArticles } from 'virtual:nateio/articles';
import {
  Body,
  ManifestProvider,
  NotFound,
  ScrollController,
  SiteFooter,
  SiteHeader,
  ThemeProvider,
} from 'src/shell';

const ArticleRoutes = () => {
  const articles = useArticles();
  return (
    <Routes>
      {Object.values(articles).map(({ path }) => (
        <Route key={path} path={path} element={<Body path={path} />} />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export const App = () => (
  <HelmetProvider>
    <ThemeProvider>
      <ManifestProvider>
        <ScrollController>
          <div className="flex flex-col items-center min-h-screen p-8">
            <div className="flex-1 flex flex-col w-full max-w-[850px]">
              <SiteHeader />
              <ArticleRoutes />
              <SiteFooter />
            </div>
          </div>
        </ScrollController>
      </ManifestProvider>
    </ThemeProvider>
  </HelmetProvider>
);
