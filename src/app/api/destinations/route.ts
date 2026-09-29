import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { sql } from '@/lib/db';
import { destinationSchema } from '@/lib/validations';

// GET all destinations
export async function GET() {
  try {
    const result = await sql`
      SELECT * FROM destinations ORDER BY created_at DESC
    `;

    return NextResponse.json({ destinations: result.rows });
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch destinations' },
      { status: 500 }
    );
  }
}

// CREATE destination
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validated = destinationSchema.parse(body);

    const now = new Date().toISOString();

    const result = await sql`
      INSERT INTO destinations (
        name, slug, description, featured_image, location,
        duration, price, difficulty, best_season,
        included_items, itinerary, published, created_at, updated_at
      )
      VALUES (
        ${validated.name},
        ${validated.slug},
        ${validated.description},
        ${validated.featuredImage || ''},
        ${validated.location},
        ${validated.duration},
        ${validated.price},
        ${validated.difficulty},
        ${validated.bestSeason},
        ${JSON.stringify(validated.includedItems)},
        ${JSON.stringify(validated.itinerary)},
        ${validated.published},
        ${now},
        ${now}
      )
      RETURNING *
    `;

    return NextResponse.json({ destination: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating destination:', error);
    return NextResponse.json(
      { error: 'Failed to create destination' },
      { status: 500 }
    );
  }
}
