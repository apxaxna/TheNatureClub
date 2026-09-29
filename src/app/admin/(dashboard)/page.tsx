import { auth } from '@/lib/auth';
import { getBlogs, getDestinations, getTestimonials } from '@/lib/db';
import { FileText, MapPin, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

type ActivityItem = {
  id: string;
  type: 'blog' | 'destination' | 'testimonial';
  title: string;
  created_at: string;
  published: boolean;
};

export default async function AdminDashboard() {
  const session = await auth();

  // Get basic stats
  const blogs = await getBlogs();
  const destinations = await getDestinations();
  const testimonials = await getTestimonials();

  const publishedBlogs = blogs.filter(b => b.published).length;
  const publishedDestinations = destinations.filter(d => d.published).length;
  const publishedTestimonials = testimonials.filter(t => t.published).length;

  // Combine all items for recent activity
  const allActivity: ActivityItem[] = [
    ...blogs.map(b => ({ id: b.id, type: 'blog' as const, title: b.title, created_at: b.created_at, published: b.published })),
    ...destinations.map(d => ({ id: d.id, type: 'destination' as const, title: d.name, created_at: d.created_at, published: d.published })),
    ...testimonials.map(t => ({ id: t.id, type: 'testimonial' as const, title: t.author_name, created_at: t.created_at, published: t.published }))
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'blog': return <FileText className="w-4 h-4" />;
      case 'destination': return <MapPin className="w-4 h-4" />;
      case 'testimonial': return <MessageSquare className="w-4 h-4" />;
      default: return null;
    }
  };

  const getActivityLink = (item: ActivityItem) => {
    switch (item.type) {
      case 'blog': return `/admin/blogs/${item.id}/edit`;
      case 'destination': return `/admin/destinations/${item.id}/edit`;
      case 'testimonial': return `/admin/testimonials/${item.id}/edit`;
      default: return '#';
    }
  };

  const formatDate = (dateString: string) => {
    // Parse the date string and convert to UTC
    const date = new Date(dateString);
    const now = new Date();

    // Calculate difference in milliseconds
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(Math.abs(diffMs) / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    // Handle future dates (shouldn't happen, but just in case)
    if (diffMs < 0) {
      return 'just now';
    }

    if (diffSecs < 10) return 'just now';
    if (diffSecs < 60) return `${diffSecs} sec${diffSecs !== 1 ? 's' : ''} ago`;
    if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back, {session?.user?.email}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Blogs</CardTitle>
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{blogs.length}</div>
            <p className="text-sm text-gray-600 mt-1">
              {publishedBlogs} published
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Destinations</CardTitle>
              <MapPin className="w-8 h-8 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{destinations.length}</div>
            <p className="text-sm text-gray-600 mt-1">
              {publishedDestinations} published
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Testimonials</CardTitle>
              <MessageSquare className="w-8 h-8 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{testimonials.length}</div>
            <p className="text-sm text-gray-600 mt-1">
              {publishedTestimonials} published
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {allActivity.length > 0 ? (
              <div className="space-y-3">
                {allActivity.map((item) => (
                  <a
                    key={`${item.type}-${item.id}`}
                    href={getActivityLink(item)}
                    className="flex items-start gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <div className="mt-1 text-gray-400">
                      {getActivityIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500 capitalize">
                          {item.type}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">
                          {formatDate(item.created_at)}
                        </span>
                        {item.published && (
                          <>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-green-600">Published</span>
                          </>
                        )}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No recent activity</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="/admin/blogs/new"
              className="block px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
            >
              Create New Blog Post
            </a>
            <a
              href="/admin/destinations/new"
              className="block px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
            >
              Add New Destination
            </a>
            <a
              href="/admin/testimonials/new"
              className="block px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
            >
              Add Testimonial
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
