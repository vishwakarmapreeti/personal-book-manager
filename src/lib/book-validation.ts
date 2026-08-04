import { z } from 'zod';

export const createBookSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(200, 'Title cannot exceed 200 characters'),

  author: z
    .string()
    .trim()
    .min(1, 'Author is required')
    .max(150, 'Author cannot exceed 150 characters'),

  tags: z.array(z.string().trim()).default([]),

  status: z.enum([
    'Want to Read',
    'Reading',
    'Completed',
  ]),
});

// 👇 Separate schema for updates
export const updateBookSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1)
    .max(200)
    .optional(),

  author: z
    .string()
    .trim()
    .min(1)
    .max(150)
    .optional(),

  tags: z.array(z.string().trim()).optional(),

  status: z
    .enum([
      'Want to Read',
      'Reading',
      'Completed',
    ])
    .optional(),
});


export const bookFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(200),

  author: z
    .string()
    .trim()
    .min(1, 'Author is required')
    .max(150),

  tags: z.string(),

  status: z.enum([
    'Want to Read',
    'Reading',
    'Completed',
  ]),
});

export type BookFormData =
  z.infer<typeof bookFormSchema>;