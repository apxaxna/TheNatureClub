import { hash } from 'bcryptjs';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function sql(strings: TemplateStringsArray, ...values: any[]) {
  const query = strings.reduce((acc, str, i) => {
    return acc + str + (i < values.length ? `$${i + 1}` : '');
  }, '');

  const result = await pool.query(query, values);
  return result;
}

async function seed() {
  console.log('🌱 Starting database setup...\n');

  try {
    // Create tables
    console.log('Creating tables...');

    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✓ Users table created');

    await sql`
      CREATE TABLE IF NOT EXISTS blogs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(500) NOT NULL,
        slug VARCHAR(500) UNIQUE NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        featured_image VARCHAR(1000),
        author_id UUID REFERENCES users(id) ON DELETE SET NULL,
        published BOOLEAN DEFAULT false,
        published_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published)`;
    console.log('✓ Blogs table created');

    await sql`
      CREATE TABLE IF NOT EXISTS blog_media (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
        media_url VARCHAR(1000) NOT NULL,
        media_type VARCHAR(50) NOT NULL CHECK (media_type IN ('image', 'video')),
        caption TEXT,
        "order" INTEGER DEFAULT 0
      )
    `;
    console.log('✓ Blog media table created');

    await sql`
      CREATE TABLE IF NOT EXISTS destinations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(500) NOT NULL,
        slug VARCHAR(500) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        featured_image VARCHAR(1000),
        location VARCHAR(255) NOT NULL,
        duration VARCHAR(100),
        price DECIMAL(10, 2),
        difficulty VARCHAR(50) CHECK (difficulty IN ('easy', 'moderate', 'challenging')),
        best_season VARCHAR(255),
        included_items JSONB DEFAULT '[]'::jsonb,
        itinerary JSONB DEFAULT '[]'::jsonb,
        published BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS idx_destinations_slug ON destinations(slug)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_destinations_published ON destinations(published)`;
    console.log('✓ Destinations table created');

    await sql`
      CREATE TABLE IF NOT EXISTS destination_media (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
        media_url VARCHAR(1000) NOT NULL,
        media_type VARCHAR(50) NOT NULL CHECK (media_type IN ('image', 'video')),
        caption TEXT,
        "order" INTEGER DEFAULT 0
      )
    `;
    console.log('✓ Destination media table created');

    await sql`
      CREATE TABLE IF NOT EXISTS testimonials (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        review TEXT NOT NULL,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        destination_id UUID REFERENCES destinations(id) ON DELETE SET NULL,
        media_url VARCHAR(1000),
        media_type VARCHAR(50) CHECK (media_type IN ('image', 'video')),
        published BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS idx_testimonials_published ON testimonials(published)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_testimonials_rating ON testimonials(rating)`;
    console.log('✓ Testimonials table created');

    // Create default admin user
    console.log('\n👤 Creating admin user...');
    const defaultEmail = 'admin@thenatureclub.com';
    const defaultPassword = 'admin123456';
    const passwordHash = await hash(defaultPassword, 12);

    const existingUser = await sql`SELECT id FROM users WHERE email = ${defaultEmail}`;

    if (existingUser.rows.length === 0) {
      await sql`
        INSERT INTO users (email, password_hash, role)
        VALUES (${defaultEmail}, ${passwordHash}, 'admin')
      `;
      console.log('✓ Admin user created');
      console.log('\n📧 Email:', defaultEmail);
      console.log('🔑 Password:', defaultPassword);
      console.log('\n⚠️  IMPORTANT: Change this password after first login!');
    } else {
      console.log('✓ Admin user already exists');
    }

    console.log('\n✅ Database setup complete!\n');
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    throw error;
  }
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
