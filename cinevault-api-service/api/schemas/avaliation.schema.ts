import { z } from 'zod';

export const avaliationSchema = z.object({
  id_user: z.number().positive(),
  id_movie: z.number().positive(),
  rating: z.number().min(0).max(5),
  comment: z.string().min(5).max(255).optional(),
});

export const updateAvaliationSchema = z.object({
  rating: z.number().min(0).max(5).optional(),
  comment: z.string().min(5).max(255).optional(),
});
