import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Debe ser un email válido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, 'El nombre de usuario es requerido')
    .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
    .max(150, 'El nombre de usuario no puede tener más de 150 caracteres')
    .regex(/^[a-zA-Z0-9_]+$/, 'Solo se permiten letras, números y guiones bajos'),
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Debe ser un email válido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'La contraseña debe contener al menos una mayúscula, una minúscula y un número'),
  password_confirm: z
    .string()
    .min(1, 'Confirma tu contraseña'),
  first_name: z
    .string()
    .optional()
    .or(z.literal('')),
  last_name: z
    .string()
    .optional()
    .or(z.literal('')),
}).refine((data) => data.password === data.password_confirm, {
  message: 'Las contraseñas no coinciden',
  path: ['password_confirm'],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
