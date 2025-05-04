import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  error: string;
  onTryAgain: () => void;
}

export default function ErrorState({ error, onTryAgain }: ErrorStateProps) {
  return (
    <section>
      <Card className="overflow-hidden border-2 border-red-200 shadow-blue">
        <div className="px-6 py-4" style={{ backgroundColor: '#e11d48' }}>
          <h2 className="font-semibold text-white text-lg">Error</h2>
        </div>
        
        <CardContent className="p-6">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="ml-3">
              <p className="text-neutral-800 font-medium">{error}</p>
              <p className="text-neutral-600 mt-1">Please try again later or use a different lyric.</p>
            </div>
          </div>
          
          <Button 
            onClick={onTryAgain} 
            className="mt-4 btn-primary"
          >
            <span>Try Again</span>
            <RefreshCw className="w-5 h-5 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
