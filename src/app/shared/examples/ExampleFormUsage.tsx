// Ejemplo de uso completo del sistema de formularios reutilizable

import React from 'react';
import { z } from 'zod';
import { GenericFormDialog } from '@/app/shared/components/dialog/GenericFormDialog';
import type { FormFieldConfig } from '@/app/shared/types/form.types';

// 1. Definir el esquema Zod
const exampleSchema = z.object({
  firstName: z.string().min(1, 'El nombre es requerido'),
  lastName: z.string().min(1, 'El apellido es requerido'),
  email: z.string().email('Email inválido'),
  age: z.number().min(18, 'Debe ser mayor de edad'),
  country: z.string().min(1, 'Seleccione un país'),
  newsletter: z.boolean(),
});

type ExampleFormData = z.infer<typeof exampleSchema>;

// 2. Definir la configuración de campos
const exampleFormFields: FormFieldConfig<ExampleFormData>[] = [
  {
    name: 'firstName',
    label: 'Nombre',
    type: 'text',
    placeholder: 'Ingrese su nombre',
    required: true,
  },
  {
    name: 'lastName',
    label: 'Apellido',
    type: 'text',
    placeholder: 'Ingrese su apellido',
    required: true,
  },
  {
    name: 'email',
    label: 'Correo Electrónico',
    type: 'email',
    placeholder: 'ejemplo@email.com',
    required: true,
  },
  {
    name: 'age',
    label: 'Edad',
    type: 'number',
    placeholder: '18',
    required: true,
  },
  {
    name: 'country',
    label: 'País',
    type: 'select',
    placeholder: 'Seleccione su país',
    options: [
      { value: 'mx', label: 'México' },
      { value: 'us', label: 'Estados Unidos' },
      { value: 'ca', label: 'Canadá' },
      { value: 'es', label: 'España' },
      { value: 'ar', label: 'Argentina' },
    ],
    required: true,
  },
  {
    name: 'newsletter',
    label: 'Suscribirse al boletín',
    type: 'checkbox',
    description: 'Recibir noticias y actualizaciones por email',
  },
];

// 3. Componente que usa el sistema
interface ExampleFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExampleFormDialog({ isOpen, onClose }: ExampleFormDialogProps) {
  const handleSubmit = async (data: ExampleFormData) => {
    // Simular llamada a API
    console.log('Datos del formulario:', data);
    
    // Aquí harías la llamada real a tu API
    // await api.post('/users', data);
    
    // Cerrar el dialog después del éxito
    onClose();
  };

  const defaultValues: Partial<ExampleFormData> = {
    firstName: '',
    lastName: '',
    email: '',
    age: 18,
    country: '',
    newsletter: false,
  };

  return (
    <GenericFormDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Registro de Usuario"
      description="Complete sus datos para crear una cuenta"
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      schema={exampleSchema}
      fields={exampleFormFields}
      submitText="Crear Cuenta"
      cancelText="Cancelar"
    />
  );
}

// 4. Uso en un componente padre
export function ExamplePage() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Ejemplo de Sistema de Formularios
      </h1>
      
      <button
        onClick={() => setIsDialogOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Abrir Formulario
      </button>

      <ExampleFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
}

/*
BENEFICIOS DE ESTE SISTEMA:

1. 🔒 Type Safety: Completamente tipado con TypeScript
2. ✅ Validación: Robusta validación con Zod
3. 🎨 Consistencia: UI consistente con Shadcn/UI
4. 🔄 Reutilización: Componentes completamente reutilizables
5. 📝 Mantenibilidad: Código limpio y bien organizado
6. 🚀 Productividad: Desarrollo rápido de nuevos formularios

PASOS PARA CREAR UN NUEVO FORMULARIO:

1. Crear esquema Zod con validaciones
2. Definir configuración de campos
3. Usar GenericFormDialog con los datos
4. Implementar lógica de submit
5. ¡Listo! El formulario está funcionando

CAMPOS SOPORTADOS:
- text, email, tel, number
- textarea
- select (con opciones)
- checkbox

EXTENSIONES FUTURAS:
- Radio buttons
- Date pickers
- File uploads
- Campos condicionales
- Validación asíncrona
*/
