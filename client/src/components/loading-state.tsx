import { Card, CardContent } from '@/components/ui/card';

export default function LoadingState() {
  return (
    <section>
      <Card className="overflow-hidden border-2 border-blue-200 shadow-blue">
        <div className="px-6 py-4" style={{ backgroundColor: '#1e40af' }}>
          <h2 className="font-semibold text-white text-lg">Analyzing...</h2>
        </div>
        
        <CardContent className="p-6">
          <div className="flex justify-center items-center mb-4">
            <div className="loader ease-linear rounded-full border-4 border-blue-200 h-12 w-12" style={{ borderTopColor: '#e11d48' }}></div>
          </div>
          <div className="text-center text-neutral-600">
            <p>Breaking down the lyrics, finding connections, and unveiling the meaning...</p>
          </div>
          
          {/* Loading placeholders */}
          <div className="mt-6 space-y-3">
            <div className="h-4 bg-red-100 rounded animate-pulse"></div>
            <div className="h-4 bg-blue-100 rounded animate-pulse w-11/12"></div>
            <div className="h-4 bg-red-100 rounded animate-pulse w-10/12"></div>
            <div className="h-4 bg-blue-100 rounded animate-pulse w-9/12"></div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
