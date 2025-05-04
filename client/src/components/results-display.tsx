import { Card, CardContent } from '@/components/ui/card';
import { LyricInterpretation } from '@/lib/types';

interface ResultsDisplayProps {
  results: LyricInterpretation;
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  return (
    <section className="mb-6 transition-opacity duration-300">
      <Card className="overflow-hidden border-2 border-blue-200 shadow-blue">
        <div className="px-6 py-4" style={{ backgroundColor: '#e11d48' }}>
          <h2 className="font-semibold text-white text-lg">Lyric Interpretation</h2>
        </div>
        
        <CardContent className="p-6">
          <div className="mb-4 pb-4 border-b border-blue-200">
            <div className="text-sm text-neutral-500 mb-1">You entered:</div>
            <div className="text-lg font-medium text-blue-800">"{results.lyric}"</div>
          </div>
          
          <div 
            className="prose prose-neutral max-w-none" 
            dangerouslySetInnerHTML={{ __html: results.interpretation }}
          />
          
          {results.song && (
            <div className="mt-4 pt-4 border-t border-red-200">
              <div className="text-sm text-neutral-500 mb-1">Song:</div>
              <div className="font-medium text-red-600">{results.song}</div>
              {results.album && (
                <div className="text-blue-800 text-sm">
                  Album: <span className="font-medium">{results.album}</span> ({results.year || 'N/A'})
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
