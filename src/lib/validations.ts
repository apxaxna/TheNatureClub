import { z } from 'zod';

// Auth validations
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Blog validations
export const blogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(500, 'Title too long'),
  slug: z.string().min(1, 'Slug is required').max(500, 'Slug too long')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().max(500, 'Excerpt too long').optional().or(z.literal('')),
  featuredImage: z.union([
    z.string().url('Invalid image URL'),
    z.array(z.string().url('Invalid image URL')),
    z.literal('')
  ]).optional(),
  published: z.boolean(),
});

// Destination validations
export const itineraryDaySchema = z.object({
  day: z.number().int().positive(),
  title: z.string().min(1, 'Day title is required'),
  description: z.string().min(1, 'Description is required'),
  activities: z.array(z.string()),
});

export const destinationSchema = z.object({
  name: z.string().min(1, 'Name is required').max(500, 'Name too long'),
  slug: z.string().min(1, 'Slug is required').max(500, 'Slug too long')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  description: z.string().min(1, 'Description is required'),
  featuredImage: z.union([
    z.string().url('Invalid image URL'),
    z.array(z.string().url('Invalid image URL')),
    z.literal('')
  ]).optional(),
  location: z.string().min(1, 'Location is required'),
  duration: z.string().min(1, 'Duration is required'),
  price: z.number().positive('Price must be positive'),
  difficulty: z.enum(['easy', 'moderate', 'challenging']),
  bestSeason: z.string().min(1, 'Best season is required'),
  includedItems: z.array(z.string()),
  itinerary: z.array(itineraryDaySchema),
  published: z.boolean(),
});

// Testimonial validations
export const testimonialSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255, 'Name too long'),
  review: z.string().min(10, 'Review must be at least 10 characters'),
  rating: z.number().int().min(1).max(5),
  destinationId: z.string().uuid().optional().or(z.literal('')),
  mediaUrl: z.string().url('Invalid media URL').optional().or(z.literal('')),
  mediaType: z.enum(['image', 'video']).optional().or(z.literal('')),
  published: z.boolean(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type BlogInput = z.infer<typeof blogSchema>;
export type DestinationInput = z.infer<typeof destinationSchema>;
export type TestimonialInput = z.infer<typeof testimonialSchema>;
