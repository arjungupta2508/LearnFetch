import { Card, CardContent } from './ui/card';
import { Database, Zap, Shield } from 'lucide-react';

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
      <Card className="border-2 border-blue-200 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-xl transition-all hover:scale-105 duration-300">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-3 rounded-xl shadow-md">
              <Database className="size-6" />
            </div>
            <div>
              <h3 className="font-bold mb-1 text-blue-900">Multi-Source Aggregation</h3>
              <p className="text-sm text-blue-700">
                Access videos, PDFs, and articles from diverse sources in one unified platform.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-amber-200 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-xl transition-all hover:scale-105 duration-300">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-3 rounded-xl shadow-md">
              <Zap className="size-6" />
            </div>
            <div>
              <h3 className="font-bold mb-1 text-amber-900">Smart Filtering</h3>
              <p className="text-sm text-amber-700">
                Advanced categorization and filtering to find exactly what you need quickly.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-emerald-200 shadow-lg bg-gradient-to-br from-emerald-50 to-green-50 hover:shadow-xl transition-all hover:scale-105 duration-300">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white p-3 rounded-xl shadow-md">
              <Shield className="size-6" />
            </div>
            <div>
              <h3 className="font-bold mb-1 text-emerald-900">Save & Organize</h3>
              <p className="text-sm text-emerald-700">
                Bookmark your favorite resources and build your personal learning library.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}