'use client';

import { useState, useEffect } from 'react';

interface MediaItem {
  id: number;
  fileName: string;
  url: string;
  fileType: string;
  size: number;
  uploadedAt: string;
}

interface MediaLibraryProps {
  onSelect?: (url: string | string[]) => void;
  onClose?: () => void;
  multiple?: boolean;
}

export default function MediaLibrary({ onSelect, onClose, multiple = true }: MediaLibraryProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await fetch('/api/media');
      if (response.ok) {
        const data = await response.json();
        setMedia(data.media || []);
      }
    } catch (error) {
      console.error('Failed to fetch media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);

        await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
      }
      await fetchMedia();
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload files');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const response = await fetch(`/api/media/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMedia(media.filter((item) => item.id !== id));
        selectedItems.delete(id);
        setSelectedItems(new Set(selectedItems));
      }
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete file');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedItems.size === 0) return;
    if (!confirm(`Delete ${selectedItems.size} selected items?`)) return;

    try {
      await Promise.all(
        Array.from(selectedItems).map((id) =>
          fetch(`/api/media/${id}`, { method: 'DELETE' })
        )
      );
      await fetchMedia();
      setSelectedItems(new Set());
    } catch (error) {
      console.error('Bulk delete failed:', error);
      alert('Failed to delete files');
    }
  };

  const handleConfirmSelection = () => {
    if (!onSelect) return;

    if (multiple && selectedItems.size > 0) {
      const selectedUrls = media
        .filter(item => selectedItems.has(item.id))
        .map(item => item.url);
      onSelect(selectedUrls);
    } else if (!multiple && selectedItems.size === 1) {
      const selectedUrl = media.find(item => selectedItems.has(item.id))?.url;
      if (selectedUrl) onSelect(selectedUrl);
    }

    onClose?.();
  };

  const toggleSelection = (id: number) => {
    const newSelection = new Set(selectedItems);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      if (!multiple) {
        newSelection.clear();
      }
      newSelection.add(id);
    }
    setSelectedItems(newSelection);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Media Library</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6 border-b border-gray-200 flex gap-4 items-center">
          <label className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer">
            {uploading ? 'Uploading...' : 'Upload Files'}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
          {selectedItems.size > 0 && (
            <>
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Selected ({selectedItems.size})
              </button>
              {onSelect && (
                <button
                  onClick={handleConfirmSelection}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Use Selected ({selectedItems.size})
                </button>
              )}
            </>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading...</div>
          ) : media.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No media files yet. Upload some files to get started.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {media.map((item) => (
                <div
                  key={item.id}
                  className={`relative group border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                    selectedItems.has(item.id)
                      ? 'border-green-600 ring-2 ring-green-600'
                      : 'border-gray-200 hover:border-green-400'
                  }`}
                  onClick={() => toggleSelection(item.id)}
                >
                  <div className="aspect-square relative bg-gray-100">
                    <img
                      src={item.url}
                      alt={item.fileName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2 bg-white">
                    <p className="text-xs text-gray-600 truncate">
                      {item.fileName}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatFileSize(item.size)}
                    </p>
                  </div>
                  {onSelect && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (multiple) {
                          toggleSelection(item.id);
                        } else {
                          onSelect(item.url);
                          onClose?.();
                        }
                      }}
                      className="absolute top-2 right-2 px-2 py-1 bg-green-600 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {multiple ? 'Toggle' : 'Select'}
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                    className="absolute top-2 left-2 px-2 py-1 bg-red-600 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
