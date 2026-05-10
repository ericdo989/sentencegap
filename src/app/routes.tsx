import { createBrowserRouter } from 'react-router';
import { Root } from './pages/Root';
import { Landing } from './pages/Landing';
import { Simulator } from './pages/Simulator';
import { Dashboard } from './pages/Dashboard';
import { Report } from './pages/Report';
import { OutlierCases } from './pages/OutlierCases';
import { CaseComparison } from './pages/CaseComparison';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Landing },
      { path: 'simulator', Component: Simulator },
      { path: 'outliers', Component: OutlierCases },
      { path: 'dashboard', Component: Dashboard },
      { path: 'report', Component: Report },
      { path: 'compare', Component: CaseComparison },
    ],
  },
]);