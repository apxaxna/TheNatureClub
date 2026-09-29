import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import sharp from 'sharp';
import { supabase } from '@/lib/db';

const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
const VIDEO_EXTENSIONS = ['mp4', 'webm', 'mov', 'avi', 'mkv'];
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const timestamp = Date.now();
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const isImage = IMAGE_EXTENSIONS.includes(fileExt || '');
    const isVideo = VIDEO_EXTENSIONS.includes(fileExt || '');

    if (!isImage && !isVideo) {
      return NextResponse.json({
        error: 'Unsupported file type. Supported: images (jpg, png, webp, gif) and videos (mp4, webm, mov)'
      }, { status: 400 });
    }

    // Check video size limit
    if (isVideo && buffer.length > MAX_VIDEO_SIZE) {
      return NextResponse.json({
        error: `Video file too large. Maximum size is ${MAX_VIDEO_SIZE / (1024 * 1024)}MB`
      }, { status: 400 });
    }

    let finalBuffer: Buffer;
    let fileName: string;
    let contentType: string;
    let mediaType: 'image' | 'video';

    if (isImage) {
      // Optimize images
      fileName = `${timestamp}.webp`;
      contentType = 'image/webp';
      mediaType = 'image';

      finalBuffer = await sharp(buffer)
        .resize(1920, 1920, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: 85 })
        .toBuffer();
    } else {
      // Videos are uploaded as-is
      fileName = `${timestamp}.${fileExt}`;
      contentType = file.type || 'video/mp4';
      mediaType = 'video';
      finalBuffer = buffer;
    }

    // Upload to Vercel Blob
    const blob = await put(fileName, finalBuffer, {
      access: 'public',
      contentType,
    });

    // Store metadata in Supabase
    const { data, error } = await supabase
      .from('media')
      .insert([{
        file_name: fileName,
        url: blob.url,
        file_type: contentType,
        size: finalBuffer.length,
      }])
      .select('id')
      .single();

    if (error) throw error;

    return NextResponse.json({
      id: data.id,
      url: blob.url,
      fileName,
      fileType: contentType,
      mediaType,
      size: finalBuffer.length,
      uploadedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
