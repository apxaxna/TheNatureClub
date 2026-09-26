import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .order('uploaded_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      media: data || [],
    });
  } catch (error) {
    console.error('Failed to fetch media:', error);
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
  }
}
