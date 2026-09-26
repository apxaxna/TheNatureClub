import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { del } from '@vercel/blob';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data: mediaData, error: fetchError } = await supabase
      .from('media')
      .select('url')
      .eq('id', id)
      .single();

    if (fetchError || !mediaData) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    }

    // Delete from Vercel Blob
    try {
      await del(mediaData.url);
    } catch (error) {
      console.error('Failed to delete from Vercel Blob:', error);
    }

    // Delete from Supabase
    const { error: deleteError } = await supabase
      .from('media')
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete failed:', error);
    return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 });
  }
}
