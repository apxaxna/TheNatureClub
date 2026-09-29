'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { blogSchema, type BlogInput } from '@/lib/validations';
import { slugify, toImageArray } from '@/lib/utils';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Trash2 } from 'lucide-react';
import RichTextEditor from '@/components/RichTextEditor';
import MediaLibrary from '@/components/MediaLibrary';

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [blogId, setBlogId] = useState<string>('');
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
  } = useForm<BlogInput>({
    resolver: zodResolver(blogSchema),
  });

  const title = watch('title');

  useEffect(() => {
    params.then(({ id }) => {
      setBlogId(id);
      fetchBlog(id);
    });
  }, []);

  const fetchBlog = async (id: string) => {
    try {
      const response = await fetch(`/api/blogs/${id}`);
      if (!response.ok) throw new Error('Failed to fetch blog');

      const { blog } = await response.json();
      setValue('title', blog.title);
      setValue('slug', blog.slug);
      setValue('content', blog.content);
      setValue('excerpt', blog.excerpt || '');
      setValue('featuredImage', blog.featured_image || '');
      setValue('published', blog.published);
    } catch (err) {
      setError('Failed to load blog');
    } finally {
      setIsFetching(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setValue('title', newTitle);
  };

  const onSubmit = async (data: BlogInput) => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to update blog');

      router.push('/admin/blogs');
      router.refresh();
    } catch (err) {
      setError('Failed to update blog post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete blog');

      router.push('/admin/blogs');
      router.refresh();
    } catch (err) {
      setError('Failed to delete blog post. Please try again.');
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-600">Loading blog...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
          <p className="text-gray-600 mt-1">Update your blog post</p>
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
              Are you sure you want to delete this blog post? This action cannot be undone.
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
              label="Title"
              placeholder="Enter blog title"
              error={errors.title?.message}
              {...register('title')}
              onChange={handleTitleChange}
            />

            <Input
              label="Slug"
              placeholder="blog-post-url"
              error={errors.slug?.message}
              {...register('slug')}
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

            <Textarea
              label="Excerpt (Optional)"
              placeholder="Brief summary of the blog post"
              error={errors.excerpt?.message}
              {...register('excerpt')}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
          </CardHeader>
          <CardContent>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  content={field.value}
                  onChange={field.onChange}
                  placeholder="Write your blog post content here..."
                />
              )}
            />
            {errors.content && (
              <p className="mt-2 text-sm text-red-600">{errors.content.message}</p>
            )}
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
