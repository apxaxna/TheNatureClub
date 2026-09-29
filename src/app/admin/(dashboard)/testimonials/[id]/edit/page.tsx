'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { testimonialSchema, type TestimonialInput } from '@/lib/validations';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { RatingSelector } from '@/components/admin/RatingSelector';
import ImageUploader from '@/components/ui/ImageUploader';
import { Trash2 } from 'lucide-react';

export default function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [testimonialId, setTestimonialId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [rating, setRating] = useState(5);
  const [mediaUrl, setMediaUrl] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TestimonialInput>({
    resolver: zodResolver(testimonialSchema),
  });

  useEffect(() => {
    params.then(({ id }) => {
      setTestimonialId(id);
      fetchTestimonial(id);
    });
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await fetch('/api/destinations');
      if (response.ok) {
        const { destinations } = await response.json();
        setDestinations(destinations);
      }
    } catch (err) {
      console.error('Failed to fetch destinations:', err);
    }
  };

  const fetchTestimonial = async (id: string) => {
    try {
      const response = await fetch(`/api/testimonials/${id}`);
      if (!response.ok) throw new Error('Failed to fetch testimonial');

      const { testimonial } = await response.json();
      setValue('name', testimonial.name);
      setValue('review', testimonial.review);
      setValue('rating', testimonial.rating);
      setValue('destinationId', testimonial.destination_id || '');
      setValue('mediaUrl', testimonial.media_url || '');
      setValue('mediaType', testimonial.media_type || '');
      setValue('published', testimonial.published);
      setRating(testimonial.rating);
      setMediaUrl(testimonial.media_url || '');
    } catch (err) {
      setError('Failed to load testimonial');
    } finally {
      setIsFetching(false);
    }
  };

  const onSubmit = async (data: TestimonialInput) => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch(`/api/testimonials/${testimonialId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to update testimonial');

      router.push('/admin/testimonials');
      router.refresh();
    } catch (err) {
      setError('Failed to update testimonial. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/testimonials/${testimonialId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete testimonial');

      router.push('/admin/testimonials');
      router.refresh();
    } catch (err) {
      setError('Failed to delete testimonial. Please try again.');
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-600">Loading testimonial...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Testimonial</h1>
          <p className="text-gray-600 mt-1">Update customer review</p>
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
              Are you sure you want to delete this testimonial? This action cannot be undone.
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
              label="Customer Name"
              placeholder="John Doe"
              error={errors.name?.message}
              {...register('name')}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <RatingSelector
                value={rating}
                onChange={(value) => {
                  setRating(value);
                  setValue('rating', value);
                }}
              />
              {errors.rating && (
                <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
              )}
            </div>

            <Textarea
              label="Review"
              placeholder="Write the customer's review..."
              className="min-h-[150px]"
              error={errors.review?.message}
              {...register('review')}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Link to Destination (Optional)
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                {...register('destinationId')}
              >
                <option value="">None</option>
                {destinations.map((dest) => (
                  <option key={dest.id} value={dest.id}>
                    {dest.name}
                  </option>
                ))}
              </select>
              {errors.destinationId && (
                <p className="mt-1 text-sm text-red-600">{errors.destinationId.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Media (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ImageUploader
              label="Customer Photo"
              value={mediaUrl}
              onChange={(url) => {
                setMediaUrl(url);
                setValue('mediaUrl', url);
                setValue('mediaType', url ? 'image' : '');
              }}
              error={errors.mediaUrl?.message}
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
    </div>
  );
}
