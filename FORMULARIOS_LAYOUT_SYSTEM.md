# 🎨 Sistema de Layout para Formularios

## 📋 Resumen

El sistema de formularios ahora soporta **layout personalizable** usando CSS Grid de 12 columnas, permitiendo crear formularios con diseños flexibles y responsive.

## 🏗️ Propiedades de Layout

### Propiedades Disponibles

```typescript
interface FormFieldConfig<TFormData> {
  // ...propiedades existentes...
  
  // Layout properties
  colSpan?: number;     // Número de columnas que ocupa (1-12)
  colStart?: number;    // Columna donde inicia (1-12)
  colEnd?: number;      // Columna donde termina (1-13)
  fullWidth?: boolean;  // Si ocupa todo el ancho disponible
  order?: number;       // Orden de aparición (para reorganizar campos)
}
```

## 💡 Ejemplos de Uso

### 1. Layout Básico (2 columnas)

```typescript
export const supplierFormFields: FormFieldConfig<SupplierFormData>[] = [
  {
    name: 'name',
    label: 'Nombre',
    type: 'text',
    colSpan: 6, // Mitad del formulario
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    colSpan: 6, // Mitad del formulario
  },
  {
    name: 'address',
    label: 'Dirección',
    type: 'textarea',
    fullWidth: true, // Todo el ancho
  },
];
```

**Resultado**:
```
[    Nombre    ] [    Email     ]
[         Dirección            ]
```

### 2. Layout Avanzado (3 columnas)

```typescript
export const productFormFields: FormFieldConfig<ProductFormData>[] = [
  {
    name: 'name',
    label: 'Producto',
    type: 'text',
    colSpan: 8, // 8 columnas
  },
  {
    name: 'price',
    label: 'Precio',
    type: 'number',
    colSpan: 4, // 4 columnas
  },
  {
    name: 'category',
    label: 'Categoría',
    type: 'select',
    colSpan: 6,
  },
  {
    name: 'stock',
    label: 'Stock',
    type: 'number',
    colSpan: 3,
  },
  {
    name: 'is_active',
    label: 'Activo',
    type: 'checkbox',
    colSpan: 3,
  },
];
```

**Resultado**:
```
[      Producto      ] [ Precio ]
[ Categoría ] [Stock] [Activo ]
```

### 3. Layout con Posicionamiento Específico

```typescript
export const userFormFields: FormFieldConfig<UserFormData>[] = [
  {
    name: 'firstName',
    label: 'Nombre',
    type: 'text',
    colStart: 1,
    colEnd: 7, // Columnas 1-6
  },
  {
    name: 'lastName',
    label: 'Apellido',
    type: 'text',
    colStart: 7,
    colEnd: 13, // Columnas 7-12
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    colStart: 1,
    colEnd: 9, // Columnas 1-8
  },
  {
    name: 'phone',
    label: 'Teléfono',
    type: 'tel',
    colStart: 9,
    colEnd: 13, // Columnas 9-12
  },
];
```

### 4. Layout con Reordenamiento

```typescript
export const formFields: FormFieldConfig<FormData>[] = [
  {
    name: 'field1',
    label: 'Campo 1',
    type: 'text',
    colSpan: 6,
    order: 2, // Aparece segundo
  },
  {
    name: 'field2',
    label: 'Campo 2',
    type: 'text',
    colSpan: 6,
    order: 1, // Aparece primero
  },
];
```

## 📐 Sistema de Grid (12 columnas)

```
│ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │ 10│ 11│ 12│
```

### Tamaños Comunes

- `colSpan: 12` o `fullWidth: true` → Todo el ancho
- `colSpan: 6` → Mitad del ancho
- `colSpan: 4` → Un tercio del ancho
- `colSpan: 3` → Un cuarto del ancho
- `colSpan: 2` → Un sexto del ancho

## 🎨 Clases CSS Generadas

El sistema genera automáticamente clases de Tailwind CSS:

```typescript
// Ejemplos de clases generadas:
colSpan: 6     → "col-span-6"
colStart: 3    → "col-start-3"
colEnd: 8      → "col-end-8"
fullWidth: true → "col-span-full"
order: 2       → "order-2"
```

## 📱 Sistema Responsive

El sistema es **automáticamente responsive**:

### 📱 Móviles (< 768px)
- Todos los campos ocupan **100% del ancho**
- Los campos se apilan **verticalmente**
- Grid de **1 columna**

### 🖥️ Desktop (≥ 768px)  
- Usa el sistema de **12 columnas**
- Los campos respetan `colSpan`, `colStart`, etc.
- Layout **horizontal** según configuración

### Ejemplo Visual

```typescript
// Configuración
{
  name: 'firstName',
  colSpan: 6,
}
{
  name: 'lastName', 
  colSpan: 6,
}
```

**📱 En Móvil**:
```
[    firstName    ]
[    lastName     ]
```

**🖥️ En Desktop**:
```
[ firstName ] [ lastName ]
```

## 🎨 Clases CSS Generadas

El sistema genera clases responsive automáticamente:

```typescript
// Input del usuario:
colSpan: 6

// CSS generado automáticamente:
"col-span-1 md:col-span-6"

// Resultado:
// Móvil: ocupa 1 columna de 1 (100%)
// Desktop: ocupa 6 columnas de 12 (50%)
```

### Tabla de Conversión

| Configuración | Móvil | Desktop |
|---------------|-------|---------|
| `colSpan: 6` | `col-span-1` | `md:col-span-6` |
| `colSpan: 4` | `col-span-1` | `md:col-span-4` |
| `fullWidth: true` | `col-span-1` | `md:col-span-full` |
| `colStart: 3` | *(ignorado)* | `md:col-start-3` |

## ✅ Ventajas del Sistema

1. **🎯 Flexibilidad**: Diseña layouts complejos fácilmente
2. **📱 Responsive**: Se adapta automáticamente a diferentes pantallas
3. **🧩 Declarativo**: Configure el layout en el array de campos
4. **🔧 Mantenible**: Cambios centralizados en la configuración
5. **🎨 Consistente**: Usa el sistema de grid de Tailwind CSS

## 🚀 Uso Inmediato

Para usar el sistema de layout, simplemente agrega las propiedades de layout a tus campos:

```typescript
// En tu archivo supplierFormFields.ts
export const supplierFormFields: FormFieldConfig<SupplierFormData>[] = [
  {
    name: 'name',
    label: 'Nombre',
    type: 'text',
    colSpan: 6, // ← Agrega esta propiedad
  },
  // ...más campos
];
```

¡El formulario se reorganizará automáticamente! 🎉
