import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import ApplciantPage from './pages/ApplicantPage';
import UserPage from './pages/UsersPage';
import BondPage from './pages/BondsPage';
import AccidentPage from './pages/AccidentsPage';
import TenderPage from './pages/TenderPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import TransactionsPage from './pages/TransactionsPage';
import MintNFTPage from './pages/MintNFTPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'investments', element: <AccidentPage /> },
        { path: 'users', element: <UserPage /> },
        { path: 'applicants', element: <ApplciantPage /> },
        { path: 'my-transactions', element: <TransactionsPage /> },
        { path: 'my-spaces', element: <TenderPage /> },
        {path: 'mint-nft', element: <MintNFTPage/>}
        // { path: 'products', element: <ProductsPage /> },
        // { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
