// Run this script to reset the admin user password
// Usage: node scripts/reset-admin-password.js

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

async function resetAdminPassword() {
  const email = 'admin@thenatureclub.com';
  const password = 'admin123';

  console.log('Resetting admin password...');

  // Hash the password
  const passwordHash = await bcrypt.hash(password, 10);
  console.log('Generated hash:', passwordHash);

  // Delete existing user
  const { error: deleteError } = await supabase
    .from('users')
    .delete()
    .eq('email', email);

  if (deleteError) {
    console.error('Error deleting existing user:', deleteError);
  } else {
    console.log('Deleted existing admin user');
  }

  // Insert new admin user
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
    console.error('Error creating admin user:', error);
    process.exit(1);
  } else {
    console.log('✅ Admin user created successfully!');
    console.log('\nLogin credentials:');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('\nYou can now login at http://localhost:3000/admin/login');
  }
}

resetAdminPassword().catch(console.error);
