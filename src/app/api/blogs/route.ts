import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { sql } from '@/lib/db';
import { blogSchema } from '@/lib/validations';

// GET all blogs
export async function GET() {
  try {
    const result = await sql`
      SELECT * FROM blogs ORDER BY created_at DESC
    `;

    return NextResponse.json({ blogs: result.rows });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// CREATE blog
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validated = blogSchema.parse(body);

    const now = new Date().toISOString();

    const result = await sql`
      INSERT INTO blogs (
        title, slug, content, excerpt, featured_image,
        author_id, published, published_at, created_at, updated_at
      )
      VALUES (
        ${validated.title},
        ${validated.slug},
        ${validated.content},
        ${validated.excerpt || ''},
        ${validated.featuredImage || ''},
        ${session.user.id},
        ${validated.published},
        ${validated.published ? now : null},
        ${now},
        ${now}
      )
      RETURNING *
    `;

    return NextResponse.json({ blog: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}
