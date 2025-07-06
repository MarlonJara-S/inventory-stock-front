import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryProvider } from './app/shared/providers/QueryProvider';
import { ProductsList } from './app/modules/products/pages/ProductsList';
import { AppLayout, ThemeProvider } from './components';
import { SupplierList } from './app/modules/suppliers/pages/SupplierList';

function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Bienvenido</h2>
        <p className="text-muted-foreground">
          Panel de control del sistema de gestión de inventario
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Productos</h3>
          </div>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">Productos registrados</p>
        </div>
        
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Proveedores</h3>
          </div>
          <div className="text-2xl font-bold">5</div>
          <p className="text-xs text-muted-foreground">Proveedores activos</p>
        </div>
        
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Movimientos</h3>
          </div>
          <div className="text-2xl font-bold">24</div>
          <p className="text-xs text-muted-foreground">Este mes</p>
        </div>
        
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Stock Bajo</h3>
          </div>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-muted-foreground">Productos por reabastecer</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <Router>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsList />} />
              <Route path="/suppliers" element={<SupplierList />} />
            </Routes>
          </AppLayout>
        </Router>
      </QueryProvider>
    </ThemeProvider>
  );
}

export default App;