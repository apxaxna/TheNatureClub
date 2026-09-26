#!/usr/bin/env node

require('dotenv').config();
const { Pool } = require('pg');
const { readFileSync, readdirSync } = require('fs');
const { join } = require('path');

async function runMigrations() {
  let connectionString = process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL;

  if (!connectionString) {
    console.error('No database connection string found in environment variables');
    process.exit(1);
  }

  // Remove sslmode from connection string as we'll configure it separately
  connectionString = connectionString.replace(/[?&]sslmode=[^&]*/g, '');

  console.log('Connecting to database...\n');

  const pool = new Pool({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    const sqlDir = join(__dirname, '..', 'sql');
    const files = readdirSync(sqlDir)
      .filter(f => f.endsWith('.sql'))
      .sort();

    console.log('Running migrations...\n');

    for (const file of files) {
      console.log(`Executing: ${file}`);
      const sql = readFileSync(join(sqlDir, file), 'utf-8');
      await pool.query(sql);
      console.log(`✓ ${file} completed\n`);
    }

    console.log('All migrations completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigrations();
