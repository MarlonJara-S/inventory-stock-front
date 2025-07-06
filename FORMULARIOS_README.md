# Formularios Reutilizables con Zod y React Hook Form

## Arquitectura

Esta implementación sigue las mejores prácticas para crear formularios reutilizables y maintables usando:

- **Zod**: Para validación de esquemas y type safety
- **React Hook Form**: Para manejo de estado del formulario y validación
- **TypeScript**: Para type safety completo
- **Shadcn/ui**: Para componentes de UI consistentes

## Estructura de Archivos

```
src/
├── app/
│   ├── modules/
│   │   └── suppliers/
│   │       ├── schemas/
│   │       │   └── supplier.schema.ts      # Esquema Zod y tipos
│   │       ├── components/
│   │       │   ├── forms/
│   │       │   │   ├── SupplierFormDialog.tsx     # Formulario específico
│   │       │   │   └── SupplierFormDialogV2.tsx   # Versión refactorizada
│   │       │   └── table/
│   │       │       └── SupplierTableActions.tsx   # Acciones de tabla
│   │       └── hooks/
│   │           └── useSupplierForm.ts      # Hook específico del dominio
│   └── shared/
│       ├── components/
│       │   ├── dialog/
│       │   │   └── BaseFormDialog.tsx      # Componente base reutilizable
│       │   └── forms/
│       │       └── FormField.tsx           # Campo de formulario reutilizable
│       └── hooks/
│           └── useFormDialog.ts            # Hook genérico
```

## Mejores Prácticas Implementadas

### 1. Separación de Responsabilidades

- **Esquemas**: Validación y tipos en archivos separados
- **Componentes**: UI components específicos y reutilizables
- **Hooks**: Lógica de estado y side effects
- **Servicios**: Llamadas a APIs

### 2. Type Safety Completo

```typescript
// supplier.schema.ts
export const supplierSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('Debe ser un email válido'),
  // ...
});

export type SupplierFormData = z.infer<typeof supplierSchema>;
```

### 3. Hooks Reutilizables

#### Hook Genérico (useFormDialog)
```typescript
const useFormDialog = <T extends FieldValues>({
  onSubmit,
  onSuccess,
  onError,
  resetOnClose = true,
}: UseFormDialogProps<T>)
```

#### Hook Específico del Dominio (useSupplierForm)
```typescript
const useSupplierForm = ({ onSuccess, onError }: UseSupplierFormProps = {})
```

### 4. Componentes Base Reutilizables

#### BaseFormDialog
- Maneja la estructura común de todos los formularios en dialog
- Acepta children para contenido específico
- Maneja loading states y validación

#### FormField
- Componente genérico para diferentes tipos de campos
- Manejo automático de errores
- Type-safe con TypeScript

### 5. Validación Robusta

```typescript
const supplierSchema = z.object({
  phone: z
    .string()
    .min(1, 'El teléfono es requerido')
    .min(8, 'El teléfono debe tener al menos 8 dígitos')
    .max(15, 'El teléfono no puede exceder 15 dígitos')
    .regex(/^[\\d\\s\\-\\+\\(\\)]+$/, 'Formato de teléfono inválido'),
});
```

### 6. Manejo de Estados

- **Loading states**: Durante submissions y operaciones async
- **Error handling**: Con toast notifications y validación inline
- **Reset functionality**: Limpieza automática de formularios

### 7. Accesibilidad

- Labels apropiados para screen readers
- Aria attributes en campos de formulario
- Manejo de focus y keyboard navigation

## Uso de los Componentes

### Formulario Básico
```tsx
<SupplierFormDialog
  isOpen={isOpen}
  onClose={handleClose}
  onSubmit={handleSubmit}
  supplier={editingSupplier}
  isLoading={isLoading}
/>
```

### Formulario con Componentes Base
```tsx
<BaseFormDialog
  isOpen={isOpen}
  onClose={onClose}
  onSubmit={onSubmit}
  form={form}
  title="Crear Proveedor"
>
  <FormField
    type="text"
    name="name"
    label="Nombre"
    required
    register={register}
    error={errors.name}
  />
</BaseFormDialog>
```

### Hook de Formulario
```tsx
const {
  isOpen,
  isLoading,
  editingItem,
  handleSubmit,
  handleClose,
  openCreateDialog,
  openEditDialog,
} = useSupplierForm();
```

## Ventajas de esta Arquitectura

1. **Reutilización**: Componentes y hooks pueden ser usados en múltiples contextos
2. **Maintibilidad**: Código organizado y fácil de modificar
3. **Type Safety**: Prevención de errores en tiempo de compilación
4. **Consistencia**: UI y UX consistente en toda la aplicación
5. **Testabilidad**: Componentes y hooks fáciles de testear
6. **Performance**: Optimizaciones de re-renders con useCallback y memoization

## Extensibilidad

Para crear un nuevo formulario:

1. Crear el esquema Zod
2. Usar BaseFormDialog y FormField
3. Crear hook específico si es necesario
4. Integrar con las acciones de tabla

Ejemplo para Products:
```typescript
// products.schema.ts
export const productSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(0),
  category: z.string().min(1),
});

// ProductFormDialog.tsx usando BaseFormDialog
// useProductForm.ts siguiendo el patrón de useSupplierForm
```
