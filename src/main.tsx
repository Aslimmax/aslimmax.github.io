import App from './App.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Form from './routes/Form.tsx';
import Summary from './Summary.tsx';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Form />,
    },
    {
      path: '/summary',
      element: <Summary />,
    },
  ],
  { basename: '/' }
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
