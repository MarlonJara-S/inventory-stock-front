import type { FormFieldConfig } from '@/app/shared/types/form.types';
import type { ProductFormData } from '../schemas/product.schema';

// Categorías de ejemplo (esto podría venir de una API)
const categories = [
  { value: 'electronics', label: 'Electrónicos' },
  { value: 'clothing', label: 'Ropa' },
  { value: 'food', label: 'Comida' },
  { value: 'books', label: 'Libros' },
  { value: 'toys', label: 'Juguetes' },
  { value: 'health', label: 'Salud' },
  { value: 'sports', label: 'Deportes' },
  { value: 'automotive', label: 'Automotriz' },
];

export const productFormFields: FormFieldConfig<ProductFormData>[] = [
  {
    name: 'name',
    label: 'Nombre del Producto',
    type: 'text',
    placeholder: 'Ingrese el nombre del producto',
    required: true,
  },
  {
    name: 'description',
    label: 'Descripción',
    type: 'textarea',
    placeholder: 'Describa el producto detalladamente...',
    required: true,
  },
  {
    name: 'price',
    label: 'Precio',
    type: 'number',
    placeholder: '0.00',
    required: true,
  },
  {
    name: 'stock',
    label: 'Stock',
    type: 'number',
    placeholder: '0',
    required: true,
  },
  {
    name: 'category',
    label: 'Categoría',
    type: 'select',
    placeholder: 'Seleccione una categoría',
    options: categories,
    required: true,
  },
  {
    name: 'supplier_id',
    label: 'Proveedor',
    type: 'select',
    placeholder: 'Seleccione un proveedor',
    // Las opciones de suppliers se cargarían dinámicamente
    options: [],
    required: true,
  },
  {
    name: 'is_active',
    label: 'Producto Activo',
    type: 'checkbox',
    description: 'Marque si el producto está disponible para la venta',
  },
];
