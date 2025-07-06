# Sistema de Formularios Reutilizable - Versión Simplificada

Este documento explica cómo usar el sistema de formularios genérico desarrollado para el proyecto.

## Arquitectura Simplificada

El sistema está compuesto por:

1. **Componentes Base**
   - `GenericFormDialog`: Dialog con formulario integrado
   - `GenericForm`: Formulario base con React Hook Form
   - `GenericFormField`: Campo de formulario genérico

2. **Hook Simple**
   - `useSupplierDialog`: Hook específico para manejar la lógica de negocio

## Patrón de Uso: Suppliers

### 1. Schema de Validación (Zod)

```typescript
// suppliers/schemas/supplier.schema.ts
export const supplierSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Teléfono debe tener al menos 10 dígitos'),
  address: z.string().min(5, 'Dirección debe tener al menos 5 caracteres'),
  is_active: z.boolean(),
});
```

### 2. Configuración de Campos

```typescript
// suppliers/config/supplierFormFields.ts
export const supplierFormFields: FormFieldConfig<SupplierFormData>[] = [
  {
    name: 'name',
    label: 'Nombre',
    type: 'text',
    placeholder: 'Ingrese el nombre del proveedor',
    required: true,
  },
  // ... más campos
];
```

### 3. Hook de Negocio Simple

```typescript
// suppliers/hooks/useSupplierDialog.ts
export const useSupplierDialog = ({ onSuccess, onError } = {}) => {
  const createMutation = useCreateSupplier();
  const updateMutation = useUpdateSupplier();

  const handleFormSubmit = async (data, editingSupplier) => {
    if (editingSupplier) {
      await updateMutation.mutateAsync({ id: editingSupplier.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
    onSuccess?.();
  };

  return {
    handleFormSubmit,
    isLoading: createMutation.isPending || updateMutation.isPending,
  };
};
```

### 4. Componente de Formulario Simple

```typescript
// suppliers/components/forms/SupplierGenericForm.tsx
export function SupplierGenericForm({ isOpen, onClose, supplier, onSuccess }) {
  const { handleFormSubmit, isLoading } = useSupplierDialog({ onSuccess });

  return (
    <GenericFormDialog
      isOpen={isOpen}
      onClose={onClose}
      title={supplier ? 'Editar Proveedor' : 'Nuevo Proveedor'}
      onSubmit={(data) => handleFormSubmit(data, supplier)}
      schema={supplierSchema}
      fields={supplierFormFields}
      defaultValues={supplier || { name: '', email: '', /* ... */ }}
      isLoading={isLoading}
    />
  );
}
```

### 5. Uso en Tabla

```typescript
// suppliers/components/table/SupplierTableActions.tsx
export const SupplierTableActions = ({ supplier }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsEditDialogOpen(true)}>
        Editar
      </Button>

      <SupplierGenericForm
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        supplier={supplier}
        onSuccess={() => setIsEditDialogOpen(false)}
      />
    </>
  );
};
```

## Ventajas de la Versión Simplificada

1. **Menos complejidad**: Patrón más directo y fácil de entender
2. **Estado local simple**: Cada componente maneja su propio estado de dialog
3. **Reutilización efectiva**: Mismos componentes base, menos abstracción
4. **Fácil debug**: Flujo de datos más claro
5. **Menos archivos**: Solo lo esencial

## Para Nuevos Módulos

1. Crear schema de Zod
2. Definir configuración de campos  
3. Crear hook de negocio simple
4. Crear componente de formulario usando `GenericFormDialog`
5. Usar en componentes con estado local simple

**Resultado**: Formularios consistentes con menos complejidad y más claridad.
