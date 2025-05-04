import { Card, CardContent } from '@/components/ui/card';
import { LyricInterpretation } from '@/lib/types';

interface ResultsDisplayProps {
  results: LyricInterpretation;
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  return (
    <section className="mb-6 transition-opacity duration-300">
      <Card className="overflow-hidden border-2 shadow-blue" style={{ borderColor: 'var(--rwb-blue-light)' }}>
        <div className="px-6 py-4" style={{ backgroundColor: 'var(--rwb-red)' }}>
          <h2 className="font-semibold text-lg" style={{ color: 'var(--rwb-white)' }}>Lyric Interpretation</h2>
        </div>
        
        <CardContent className="p-6">
          <div className="mb-4 pb-4 border-b" style={{ borderColor: 'var(--rwb-blue-light)' }}>
            <div className="text-sm mb-1" style={{ color: 'var(--rwb-blue-dark)' }}>You entered:</div>
            <div className="text-lg font-medium" style={{ color: 'var(--rwb-blue)' }}>"{results.lyric}"</div>
          </div>
          
          <div 
            className="prose prose-neutral max-w-none" 
            dangerouslySetInnerHTML={{ __html: results.interpretation }}
          />
          
          {results.song && (
            <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--rwb-red)' }}>
              <div className="text-sm mb-1" style={{ color: 'var(--rwb-blue-dark)' }}>Song:</div>
              <div className="font-medium" style={{ color: 'var(--rwb-red)' }}>{results.song}</div>
              {results.album && (
                <div className="text-sm" style={{ color: 'var(--rwb-blue)' }}>
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
