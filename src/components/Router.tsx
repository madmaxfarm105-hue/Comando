import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/components/pages/HomePage';
import NiveisPage from '@/components/pages/NiveisPage';
import NivelDetailPage from '@/components/pages/NivelDetailPage';
import RegrasPage from '@/components/pages/RegrasPage';

// Layout component that includes Header, Footer and ScrollToTop
function Layout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "niveis",
        element: <NiveisPage />,
        routeMetadata: {
          pageIdentifier: 'niveis',
        },
      },
      {
        path: "niveis/:id",
        element: <NivelDetailPage />,
        routeMetadata: {
          pageIdentifier: 'nivel-detail',
        },
      },
      {
        path: "regras",
        element: <RegrasPage />,
        routeMetadata: {
          pageIdentifier: 'regras',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
