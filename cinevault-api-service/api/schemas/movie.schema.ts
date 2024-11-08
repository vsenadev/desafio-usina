import { z } from 'zod';

export const movieSchema = z.object({
  banner: z.string().max(255),
  photo: z.string().max(255),
  title: z.string().max(255),
  gender: z.string().max(255),
  year_release: z
    .number()
    .positive()
    .refine((num) => num.toString().length === 4, {
      message: 'O número deve ter exatamente 4 dígitos',
    }),
  duration: z.number().positive(),
  description: z.string().min(10).max(500),
  registration_user: z.string().email(),
});

export const updateMovieSchema = z.object({
  banner: z.string().max(255).optional(),
  photo: z.string().max(255).optional(),
  title: z.string().max(255).optional(),
  gender: z.string().max(255).optional(),
  year_release: z
    .number()
    .positive()
    .refine((num) => num.toString().length === 4, {
      message: 'O número deve ter exatamente 4 dígitos',
    })
    .optional(),
  duration: z.number().positive().optional(),
  description: z.string().min(10).max(500).optional(),
});

export const idMovieSchema = z.object({
  id: z.number().positive(),
});
