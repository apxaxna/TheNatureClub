'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { destinationSchema, type DestinationInput } from '@/lib/validations';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ItineraryBuilder } from '@/components/admin/ItineraryBuilder';
import { StringArrayInput } from '@/components/admin/StringArrayInput';
import { Trash2 } from 'lucide-react';
import RichTextEditor from '@/components/RichTextEditor';
import MediaLibrary from '@/components/MediaLibrary';
import { toImageArray } from '@/lib/utils';

export default function EditDestinationPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [destinationId, setDestinationId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<DestinationInput>({
    resolver: zodResolver(destinationSchema),
  });

  useEffect(() => {
    params.then(({ id }) => {
      setDestinationId(id);
      fetchDestination(id);
    });
  }, []);

  const fetchDestination = async (id: string) => {
    try {
      const response = await fetch(`/api/destinations/${id}`);
      if (!response.ok) throw new Error('Failed to fetch destination');

      const { destination } = await response.json();
      setValue('name', destination.name);
      setValue('slug', destination.slug);
      setValue('description', destination.description);
      setValue('featuredImage', destination.featured_image || '');
      setValue('location', destination.location);
      setValue('duration', destination.duration);
      setValue('price', parseFloat(destination.price));
      setValue('difficulty', destination.difficulty);
      setValue('bestSeason', destination.best_season);
      setValue('includedItems', destination.included_items || []);
      setValue('itinerary', destination.itinerary || []);
      setValue('published', destination.published);
    } catch (err) {
      setError('Failed to load destination');
    } finally {
      setIsFetching(false);
    }
  };

  const onSubmit = async (data: DestinationInput) => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch(`/api/destinations/${destinationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to update destination');

      router.push('/admin/destinations');
      router.refresh();
    } catch (err) {
      setError('Failed to update destination. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/destinations/${destinationId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete destination');

      router.push('/admin/destinations');
      router.refresh();
    } catch (err) {
      setError('Failed to delete destination. Please try again.');
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-600">Loading destination...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Destination</h1>
          <p className="text-gray-600 mt-1">Update destination details</p>
        </div>
        <Button
          variant="destructive"
          onClick={() => setShowDeleteConfirm(true)}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </div>

      {showDeleteConfirm && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-900 font-medium mb-4">
              Are you sure you want to delete this destination? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isLoading}
              >
                Yes, Delete
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

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
                    {(toImageArray(watch('featuredImage'))
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
                            const currentImages = toImageArray(watch('featuredImage'));
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
                Published
              </span>
            </label>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
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
