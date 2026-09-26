'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import MediaLibrary from '@/components/MediaLibrary';

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  error?: string;
}

export default function ImageUploader({ value, onChange, label, error }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      onChange(data.url);
    } catch (err) {
      console.error('Upload error:', err);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div className="space-y-3">
        {value ? (
          <div className="relative border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-50">
            <img
              src={value}
              alt="Preview"
              className="w-full h-64 object-cover"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-4">No image selected</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Upload className="w-4 h-4" />
            {uploading ? 'Uploading...' : 'Upload New'}
          </button>

          <button
            type="button"
            onClick={() => setShowMediaLibrary(true)}
            className="flex-1 px-4 py-2 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
          >
            <ImageIcon className="w-4 h-4" />
            Media Library
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {showMediaLibrary && (
        <MediaLibrary
          multiple={false}
          onSelect={(url) => onChange(Array.isArray(url) ? url[0] ?? '' : url)}
          onClose={() => setShowMediaLibrary(false)}
        />
      )}
    </div>
  );
}
