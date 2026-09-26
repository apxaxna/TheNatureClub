import { createClient } from '@supabase/supabase-js';
import { Pool } from 'pg';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// PostgreSQL connection pool for raw SQL queries
const connectionString = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;

// Parse and modify connection string to handle SSL
let poolConfig: any = { connectionString };

if (connectionString && !connectionString.includes('localhost')) {
  // Remove SSL parameters from connection string if present
  const cleanConnectionString = connectionString.split('?')[0];

  poolConfig = {
    connectionString: cleanConnectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const pool = new Pool(poolConfig);

// Raw SQL query function (replacement for @vercel/postgres sql template)
export async function sql(strings: TemplateStringsArray, ...values: any[]) {
  const query = strings.reduce((acc, str, i) => {
    return acc + str + (i < values.length ? `$${i + 1}` : '');
  }, '');

  const result = await pool.query(query, values);
  return result;
}

// User queries
export async function getUserByEmail(email: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, password_hash, role, created_at, updated_at')
      .eq('email', email)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export async function createUser(email: string, passwordHash: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([
        { email, password_hash: passwordHash, role: 'admin' }
      ])
      .select('id, email, role, created_at, updated_at')
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Blog queries
export async function getBlogs(published?: boolean) {
  try {
    let query = supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (published !== undefined) {
      query = query.eq('published', published);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

export async function getBlogById(id: string) {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

// Destination queries
export async function getDestinations(published?: boolean) {
  try {
    let query = supabase
      .from('destinations')
      .select('*')
      .order('created_at', { ascending: false });

    if (published !== undefined) {
      query = query.eq('published', published);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return [];
  }
}

export async function getDestinationBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching destination:', error);
    return null;
  }
}

export async function getDestinationById(id: string) {
  try {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching destination:', error);
    return null;
  }
}

// Testimonial queries
export async function getTestimonials(published?: boolean) {
  try {
    let query = supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (published !== undefined) {
      query = query.eq('published', published);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

export async function getTestimonialById(id: string) {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    return null;
  }
}
