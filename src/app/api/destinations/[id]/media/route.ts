import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { sql } from '@/lib/db';
import { z } from 'zod';

const mediaSchema = z.object({
  mediaUrl: z.string().url(),
  mediaType: z.enum(['image', 'video']),
  caption: z.string().optional(),
  order: z.number().int().min(0).default(0),
});

// GET all media for a destination
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await sql`
      SELECT * FROM destination_media
      WHERE destination_id = ${id}
      ORDER BY "order" ASC, created_at ASC
    `;

    return NextResponse.json({ media: result.rows });
  } catch (error) {
    console.error('Error fetching destination media:', error);
    return NextResponse.json(
      { error: 'Failed to fetch media' },
      { status: 500 }
    );
  }
}

// POST new media for a destination
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const validated = mediaSchema.parse(body);

    const result = await sql`
      INSERT INTO destination_media (
        destination_id, media_url, media_type, caption, "order"
      )
      VALUES (
        ${id},
        ${validated.mediaUrl},
        ${validated.mediaType},
        ${validated.caption || null},
        ${validated.order}
      )
      RETURNING *
    `;

    return NextResponse.json({ media: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating destination media:', error);
    return NextResponse.json(
      { error: 'Failed to create media' },
      { status: 500 }
    );
  }
}

// DELETE media
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const mediaId = searchParams.get('mediaId');

    if (!mediaId) {
      return NextResponse.json({ error: 'Media ID required' }, { status: 400 });
    }

    await sql`DELETE FROM destination_media WHERE id = ${mediaId}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting destination media:', error);
    return NextResponse.json(
      { error: 'Failed to delete media' },
      { status: 500 }
    );
  }
}
