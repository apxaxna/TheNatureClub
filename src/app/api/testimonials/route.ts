import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { sql } from '@/lib/db';
import { testimonialSchema } from '@/lib/validations';

// GET all testimonials
export async function GET() {
  try {
    const result = await sql`
      SELECT t.*, d.name as destination_name
      FROM testimonials t
      LEFT JOIN destinations d ON t.destination_id = d.id
      ORDER BY t.created_at DESC
    `;

    return NextResponse.json({ testimonials: result.rows });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

// CREATE testimonial
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validated = testimonialSchema.parse(body);

    const now = new Date().toISOString();

    const result = await sql`
      INSERT INTO testimonials (
        name, review, rating, destination_id,
        media_url, media_type, published, created_at
      )
      VALUES (
        ${validated.name},
        ${validated.review},
        ${validated.rating},
        ${validated.destinationId || null},
        ${validated.mediaUrl || null},
        ${validated.mediaType || null},
        ${validated.published},
        ${now}
      )
      RETURNING *
    `;

    return NextResponse.json({ testimonial: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}
