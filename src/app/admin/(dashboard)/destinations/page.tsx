import Link from 'next/link';
import { getDestinations } from '@/lib/db';
import { formatDate, formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Plus, Edit, Eye } from 'lucide-react';

export default async function DestinationsPage() {
  const destinations = await getDestinations();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Destinations</h1>
          <p className="text-gray-600 mt-1">Manage travel destinations</p>
        </div>
        <Link href="/admin/destinations/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Destination
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          {destinations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No destinations yet</p>
              <Link href="/admin/destinations/new">
                <Button className="mt-4">Create your first destination</Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {destinations.map((destination) => (
                    <tr key={destination.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {destination.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {destination.duration}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {destination.location}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {formatPrice(parseFloat(destination.price))}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            destination.published
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {destination.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm space-x-2">
                        {destination.published && (
                          <Link
                            href={`/destinations/${destination.slug}`}
                            target="_blank"
                            className="text-gray-600 hover:text-gray-900 inline-flex items-center"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/destinations/${destination.id}/edit`}
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
