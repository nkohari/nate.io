import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'src/App';

import 'src/fonts.css';
import 'src/index.css';

const element = document.getElementById('root');
const root = createRoot(element!);

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
