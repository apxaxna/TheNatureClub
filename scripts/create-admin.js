// Run this script to create an admin user in Supabase
// Usage: node scripts/create-admin.js

import bcrypt from 'bcryptjs';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing required environment variables');
  console.error('Make sure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdmin() {
  const email = 'admin@thenatureclub.com';
  const password = 'admin123';

  console.log('Creating admin user...');

  // Hash the password
  const passwordHash = await bcrypt.hash(password, 10);

  // Insert the admin user
  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        email,
        password_hash: passwordHash,
        role: 'admin'
      }
    ])
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      console.log('Admin user already exists!');
    } else {
      console.error('Error creating admin user:', error);
      process.exit(1);
    }
  } else {
    console.log('Admin user created successfully!');
    console.log('\nLogin credentials:');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('\n⚠️  IMPORTANT: Change this password after first login!');
  }
}

createAdmin().catch(console.error);
