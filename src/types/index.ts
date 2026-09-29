// User types
export interface User {
  id: string;
  email: string;
  role: 'admin';
  createdAt: Date;
  updatedAt: Date;
}

// Blog types
export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  authorId: string;
  published: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogMedia {
  id: string;
  blogId: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  caption?: string;
  order: number;
}

// Destination types
export interface Destination {
  id: string;
  name: string;
  slug: string;
  description: string;
  featuredImage: string;
  location: string;
  duration: string;
  price: number;
  difficulty: 'easy' | 'moderate' | 'challenging';
  bestSeason: string;
  includedItems: string[];
  itinerary: ItineraryDay[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface DestinationMedia {
  id: string;
  destinationId: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  caption?: string;
  order: number;
}

// Testimonial types
export interface Testimonial {
  id: string;
  name: string;
  review: string;
  rating: number;
  destinationId?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  published: boolean;
  createdAt: Date;
}

// Form types
export interface BlogFormData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  published: boolean;
}

export interface DestinationFormData {
  name: string;
  slug: string;
  description: string;
  featuredImage: string;
  location: string;
  duration: string;
  price: number;
  difficulty: 'easy' | 'moderate' | 'challenging';
  bestSeason: string;
  includedItems: string[];
  itinerary: ItineraryDay[];
  published: boolean;
}

export interface TestimonialFormData {
  name: string;
  review: string;
  rating: number;
  destinationId?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  published: boolean;
}
