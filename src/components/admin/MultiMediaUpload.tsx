'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { X, Upload, Image as ImageIcon, Video, GripVertical } from 'lucide-react';

export interface MediaItem {
  id?: string;
  url: string;
  type: 'image' | 'video';
  caption?: string;
  order: number;
  file?: File;
  uploading?: boolean;
}

interface MultiMediaUploadProps {
  value: MediaItem[];
  onChange: (media: MediaItem[]) => void;
  maxFiles?: number;
  acceptImages?: boolean;
  acceptVideos?: boolean;
}

export function MultiMediaUpload({
  value = [],
  onChange,
  maxFiles = 10,
  acceptImages = true,
  acceptVideos = true,
}: MultiMediaUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const acceptedTypes = [
    ...(acceptImages ? ['image/jpeg', 'image/png', 'image/webp', 'image/gif'] : []),
    ...(acceptVideos ? ['video/mp4', 'video/webm', 'video/quicktime'] : []),
  ].join(',');

  const uploadFiles = async (files: File[]) => {
    if (!files.length) return;

    if (value.length + files.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    setError('');
    setUploading(true);

    try {
      const uploadPromises = files.map(async (file, index) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Upload failed');
        }

        const data = await response.json();

        return {
          url: data.url,
          type: data.mediaType as 'image' | 'video',
          caption: '',
          order: value.length + index,
        };
      });

      const uploadedMedia = await Promise.all(uploadPromises);
      onChange([...value, ...uploadedMedia]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    await uploadFiles(files);
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => {
      const isImage = acceptImages && file.type.startsWith('image/');
      const isVideo = acceptVideos && file.type.startsWith('video/');
      return isImage || isVideo;
    });

    if (validFiles.length !== files.length) {
      setError('Some files were skipped (unsupported type)');
    }

    await uploadFiles(validFiles);
  };

  const handleRemove = (index: number) => {
    const newMedia = value.filter((_, i) => i !== index);
    onChange(newMedia.map((item, i) => ({ ...item, order: i })));
  };

  const handleCaptionChange = (index: number, caption: string) => {
    const newMedia = [...value];
    newMedia[index] = { ...newMedia[index], caption };
    onChange(newMedia);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newMedia = [...value];
    [newMedia[index - 1], newMedia[index]] = [newMedia[index], newMedia[index - 1]];
    onChange(newMedia.map((item, i) => ({ ...item, order: i })));
  };

  const handleMoveDown = (index: number) => {
    if (index === value.length - 1) return;
    const newMedia = [...value];
    [newMedia[index], newMedia[index + 1]] = [newMedia[index + 1], newMedia[index]];
    onChange(newMedia.map((item, i) => ({ ...item, order: i })));
  };

  return (
    <div className="space-y-4">
      <div>
        <label
          className="block"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className={`flex items-center justify-center w-full border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          } ${(uploading || value.length >= maxFiles) ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <div className="text-center">
              <Upload className={`mx-auto h-12 w-12 mb-2 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
              <div className="text-sm text-gray-600">
                <span className="font-semibold">Click to select files</span> or drag and drop
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {acceptImages && acceptVideos && 'Images and videos'}
                {acceptImages && !acceptVideos && 'Images only'}
                {!acceptImages && acceptVideos && 'Videos only'}
                {' '}• Select multiple files at once • Max {maxFiles} total
              </div>
            </div>
          </div>
          <input
            type="file"
            multiple
            accept={acceptedTypes}
            onChange={handleFileSelect}
            disabled={uploading || value.length >= maxFiles}
            className="hidden"
          />
        </label>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
          {error}
        </div>
      )}

      {uploading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="text-sm text-gray-600 mt-2">Uploading...</p>
        </div>
      )}

      {value.length > 0 && (
        <div className="space-y-3">
          {value.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 items-start border border-gray-200 rounded-lg p-4 bg-white"
            >
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  title="Move up"
                >
                  <GripVertical className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === value.length - 1}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  title="Move down"
                >
                  <GripVertical className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-shrink-0">
                {item.type === 'image' ? (
                  <div className="relative w-24 h-24 bg-gray-100 rounded overflow-hidden">
                    <img
                      src={item.url}
                      alt={item.caption || 'Preview'}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1">
                      <ImageIcon className="h-3 w-3 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="w-24 h-24 bg-gray-900 rounded flex items-center justify-center">
                    <Video className="h-8 w-8 text-white" />
                  </div>
                )}
              </div>

              <div className="flex-grow space-y-2">
                <Input
                  placeholder="Add a caption (optional)"
                  value={item.caption || ''}
                  onChange={(e) => handleCaptionChange(index, e.target.value)}
                />
                <div className="text-xs text-gray-500">
                  {item.type === 'image' ? 'Image' : 'Video'} • Position {index + 1}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded"
                title="Remove"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {value.length === 0 && !uploading && (
        <div className="text-center py-8 text-gray-500 text-sm">
          No media uploaded yet
        </div>
      )}
    </div>
  );
}
