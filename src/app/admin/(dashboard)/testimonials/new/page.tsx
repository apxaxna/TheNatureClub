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
import { Star } from 'lucide-react';

export default function NewTestimonialPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
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
    defaultValues: {
      published: false,
      rating: 5,
    },
  });

  useEffect(() => {
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

  const onSubmit = async (data: TestimonialInput) => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create testimonial');
      }

      router.push('/admin/testimonials');
      router.refresh();
    } catch (err) {
      setError('Failed to create testimonial. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create New Testimonial</h1>
        <p className="text-gray-600 mt-1">Add a customer review</p>
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
                Publish immediately
              </span>
            </label>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Testimonial'}
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
