// src\App.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout/Layout';
import ExcelDataManager from './XL/ExcelDataManager';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/ttt',
        element: <div>Home Page</div>,
      },
      {
        index: true,
        // path: 'create',
        path: '/',
        element: <ExcelDataManager />,
      },
      {
        path: 'settings',
        element: <>SettingsPage </>,
      },
      {
        path: 'db',
        element: <>Message Schedules </>,
        children: [
          {
            path: ':schedule',
            element: <>SchedulePage </>,
          },
        ],
      },
      {
        path: 'help',
        element: <>HelpPage </>,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
