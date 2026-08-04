import { z } from 'zod';

export const signinSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Please enter a valid email'),

  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
});

export type SignInFormData = z.infer<typeof signinSchema>;

export const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(2, 'Name is required'),

    email: z
      .string()
      .email('Invalid email'),

    password: z
      .string()
      .min(
        6,
        'Password must be at least 6 characters'
      ),

    confirmPassword: z
      .string()
      .min(
        6,
        'Confirm Password is required'
      ),
  })
  .refine(
    (data) =>
      data.password ===
      data.confirmPassword,
    {
      message:
        'Passwords do not match',
      path: ['confirmPassword'],
    }
  );

export type SignupFormData =
  z.infer<typeof signupSchema>;

