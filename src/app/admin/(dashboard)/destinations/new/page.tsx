'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { destinationSchema, type DestinationInput } from '@/lib/validations';
import { slugify } from '@/lib/utils';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ItineraryBuilder } from '@/components/admin/ItineraryBuilder';
import { StringArrayInput } from '@/components/admin/StringArrayInput';
import { MultiMediaUpload, type MediaItem } from '@/components/admin/MultiMediaUpload';
import RichTextEditor from '@/components/RichTextEditor';
import MediaLibrary from '@/components/MediaLibrary';

export default function NewDestinationPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<DestinationInput>({
    resolver: zodResolver(destinationSchema),
    defaultValues: {
      published: false,
      includedItems: [],
      itinerary: [],
      difficulty: 'moderate',
    },
  });

  const name = watch('name');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setValue('name', newName);
    setValue('slug', slugify(newName));
  };

  const onSubmit = async (data: DestinationInput) => {
    try {
      setIsLoading(true);
      setError('');

      // First, create the destination
      const response = await fetch('/api/destinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create destination');
      }

      const { destination } = await response.json();

      // Then, upload all media items if any
      if (mediaItems.length > 0) {
        const mediaPromises = mediaItems.map((item) =>
          fetch(`/api/destinations/${destination.id}/media`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              mediaUrl: item.url,
              mediaType: item.type,
              caption: item.caption,
              order: item.order,
            }),
          })
        );

        await Promise.all(mediaPromises);
      }

      router.push('/admin/destinations');
      router.refresh();
    } catch (err) {
      setError('Failed to create destination. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create New Destination</h1>
        <p className="text-gray-600 mt-1">Add a new travel destination</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Destination Name"
              placeholder="e.g., Himalayan Adventure"
              error={errors.name?.message}
              {...register('name')}
              onChange={handleNameChange}
            />

            <Input
              label="Slug"
              placeholder="himalayan-adventure"
              error={errors.slug?.message}
              {...register('slug')}
            />

            <Input
              label="Location"
              placeholder="e.g., Nepal"
              error={errors.location?.message}
              {...register('location')}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Duration"
                placeholder="e.g., 7 Days / 6 Nights"
                error={errors.duration?.message}
                {...register('duration')}
              />

              <Input
                label="Price (USD)"
                type="number"
                step="0.01"
                placeholder="1299.99"
                error={errors.price?.message}
                {...register('price', { valueAsNumber: true })}
              />
            </div>

            <Input
              label="Best Season"
              placeholder="e.g., March to May"
              error={errors.bestSeason?.message}
              {...register('bestSeason')}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image
              </label>
              {watch('featuredImage') ? (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {(typeof watch('featuredImage') === 'string'
                      ? [watch('featuredImage')]
                      : watch('featuredImage')
                    ).map((url: string, index: number) => (
                      <div key={index} className="relative border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-50 group">
                        <img
                          src={url}
                          alt={`Featured ${index + 1}`}
                          className="w-full aspect-square object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const currentImages = typeof watch('featuredImage') === 'string'
                              ? [watch('featuredImage')]
                              : watch('featuredImage');
                            const newImages = currentImages.filter((_: string, i: number) => i !== index);
                            setValue('featuredImage', newImages.length === 0 ? '' : (newImages.length === 1 ? newImages[0] : newImages));
                          }}
                          className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded hover:bg-red-700 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowMediaLibrary(true)}
                    className="w-full"
                  >
                    Change Images
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowMediaLibrary(true)}
                  className="w-full"
                >
                  Select Media
                </Button>
              )}
              {errors.featuredImage && (
                <p className="mt-2 text-sm text-red-600">{errors.featuredImage.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    content={field.value}
                    onChange={field.onChange}
                    placeholder="Describe the destination and what makes it special..."
                  />
                )}
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gallery</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Upload multiple images and videos to showcase this destination. They will appear in the order shown below.
            </p>
            <MultiMediaUpload
              value={mediaItems}
              onChange={setMediaItems}
              maxFiles={20}
              acceptImages={true}
              acceptVideos={true}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Included Items</CardTitle>
          </CardHeader>
          <CardContent>
            <Controller
              name="includedItems"
              control={control}
              render={({ field }) => (
                <StringArrayInput
                  label="What's Included"
                  placeholder="e.g., Accommodation, Meals, Guide"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.includedItems?.message}
                />
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Itinerary</CardTitle>
          </CardHeader>
          <CardContent>
            <Controller
              name="itinerary"
              control={control}
              render={({ field }) => (
                <ItineraryBuilder
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.itinerary?.message}
                />
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Publishing</CardTitle>
          </CardHeader>
          <CardContent>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                {...register('published')}
              />
              <span className="text-sm font-medium text-gray-700">
                Publish immediately
              </span>
            </label>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Destination'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>

      {showMediaLibrary && (
        <MediaLibrary
          onSelect={(url) => {
            const urls = typeof url === 'string' ? [url] : url;
            setValue('featuredImage', urls.length === 1 ? urls[0] : urls);
            setShowMediaLibrary(false);
          }}
          onClose={() => setShowMediaLibrary(false)}
        />
      )}
    </div>
  );
}
