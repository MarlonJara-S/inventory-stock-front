import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { ProtectedRoute, PublicOnlyRoute } from '../app/modules/auth/components';
import { LoginPage, RegisterPage } from '../app/modules/auth/pages';
import { ProductsList } from '../app/modules/products/pages/ProductsList';
import { SupplierList } from '../app/modules/suppliers/pages/SupplierList';
import { Dashboard } from '../components/dashboard/Dashboard';

const router = createBrowserRouter([
  // Rutas públicas (solo para usuarios no autenticados)
  {
    path: '/login',
    element: (
      <PublicOnlyRoute>
        <LoginPage />
      </PublicOnlyRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicOnlyRoute>
        <RegisterPage />
      </PublicOnlyRoute>
    ),
  },
  
  // Rutas protegidas
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout>
          <Outlet />
        </AppLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'products',
        element: <ProductsList />,
      },
      {
        path: 'suppliers',
        element: <SupplierList />,
      },
      // Agregar más rutas protegidas aquí
    ],
  },
  
  // Ruta 404
  {
    path: '*',
    element: <div>404 - Página no encontrada</div>,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
