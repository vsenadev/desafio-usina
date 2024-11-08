import { z } from 'zod';

export const usersSchema = z
  .object({
    photo: z.string(),
    name: z
      .string()
      .min(2, 'O nome deve ter pelo menos 2 caracteres')
      .max(255, 'Nome não pode ter mais de 255 caracteres.'),
    email: z
      .string()
      .email('Insira um email válido')
      .max(255, 'Email não pode ter mais de 255 caracteres.'),
    password: z
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .max(40, `Senha não pode ter mais de 40 caracteres.`),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'As senhas não correspondem',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .email('Insira um email válido')
    .max(255, 'Email não pode ter mais de 255 caracteres.'),
  password: z
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .max(40, `Senha não pode ter mais de 40 caracteres.`),
});

export const updateUserSchema = z
  .object({
    photo: z.string().optional(),
    name: z
      .string()
      .min(2, 'O nome deve ter pelo menos 2 caracteres')
      .max(255, 'Nome não pode ter mais de 255 caracteres.')
      .optional(),
    email: z
      .string()
      .email('Insira um email válido')
      .max(255, 'Email não pode ter mais de 255 caracteres.')
      .optional(),
    password: z
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .max(40, `Senha não pode ter mais de 40 caracteres.`)
      .optional(),
    confirm_password: z.string().optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'As senhas não correspondem',
    path: ['confirmPassword'],
  });

export const emailUserSchema = z.object({
  email: z
    .string()
    .email('Insira um email válido')
    .max(255, 'Email não pode ter mais de 255 caracteres.'),
});
