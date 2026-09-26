import Link from 'next/link';
import { getBlogs } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Plus, Edit, Eye } from 'lucide-react';

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blogs</h1>
          <p className="text-gray-600 mt-1">Manage your blog posts</p>
        </div>
        <Link href="/admin/blogs/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Blog Post
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No blog posts yet</p>
              <Link href="/admin/blogs/new">
                <Button className="mt-4">Create your first blog post</Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {blogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {blog.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          /{blog.slug}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            blog.published
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {blog.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(blog.created_at)}
                      </td>
                      <td className="px-6 py-4 text-right text-sm space-x-2">
                        {blog.published && (
                          <Link
                            href={`/blog/${blog.slug}`}
                            target="_blank"
                            className="text-gray-600 hover:text-gray-900 inline-flex items-center"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/blogs/${blog.id}/edit`}
                          className="text-gray-600 hover:text-gray-900 inline-flex items-center"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
