import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LyricInterpretation } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface ResultsDisplayProps {
  results: LyricInterpretation;
  onAlbumSubmit?: (album: string) => void;
}

export default function ResultsDisplay({ results, onAlbumSubmit }: ResultsDisplayProps) {
  const [albumInput, setAlbumInput] = useState('');
  const [albumSubmitted, setAlbumSubmitted] = useState(false);
  const [trackType, setTrackType] = useState<'album' | 'diss' | 'feature'>('album');
  
  const handleAlbumSubmit = () => {
    if (trackType === 'album' && albumInput.trim() && onAlbumSubmit) {
      onAlbumSubmit(albumInput);
      setAlbumSubmitted(true);
    } else if (trackType !== 'album' && onAlbumSubmit) {
      onAlbumSubmit(trackType === 'diss' ? 'Diss Track' : 'Feature');
      setAlbumSubmitted(true);
    }
  };
  
  const showAlbumInput = results.song && !results.album && !albumSubmitted && onAlbumSubmit;
  
  return (
    <section className="mb-6 transition-opacity duration-300">
      <Card className="overflow-hidden">
        <div className="bg-primary px-6 py-4">
          <h2 className="font-semibold text-white text-lg">Lyric Interpretation</h2>
        </div>
        
        <CardContent className="p-6">
          <div className="mb-4 pb-4 border-b border-neutral-200">
            <div className="text-sm text-neutral-500 mb-1">You entered:</div>
            <div className="text-lg font-medium">"{results.lyric}"</div>
          </div>
          
          <div 
            className="prose prose-neutral max-w-none" 
            dangerouslySetInnerHTML={{ __html: results.interpretation }}
          />
          
          {results.song && (
            <div className="mt-4 pt-4 border-t border-neutral-200">
              <div className="text-sm text-neutral-500 mb-1">Song:</div>
              <div className="font-medium">{results.song}</div>
              {results.album ? (
                <div className="text-neutral-600 text-sm">
                  Album: {results.album} ({results.year || 'N/A'})
                </div>
              ) : showAlbumInput ? (
                <div className="mt-3 border p-3 rounded-md bg-neutral-50">
                  <p className="text-sm text-neutral-600 mb-2">
                    Help us provide a more detailed interpretation. What type of track is this?
                  </p>
                  
                  <RadioGroup value={trackType} onValueChange={(value) => setTrackType(value as 'album' | 'diss' | 'feature')} className="mb-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="album" id="album" />
                      <Label htmlFor="album">Album Track</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="diss" id="diss" />
                      <Label htmlFor="diss">Diss Track</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="feature" id="feature" />
                      <Label htmlFor="feature">Feature</Label>
                    </div>
                  </RadioGroup>
                  
                  {trackType === 'album' && (
                    <div className="mb-3">
                      <Label htmlFor="albumName" className="text-sm mb-1 block">Which album is it from?</Label>
                      <Input
                        id="albumName"
                        placeholder="Enter album name"
                        value={albumInput}
                        onChange={(e) => setAlbumInput(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  )}
                  
                  <Button 
                    onClick={handleAlbumSubmit} 
                    size="sm" 
                    className="bg-primary hover:bg-primary/90 w-full"
                  >
                    <Send className="h-4 w-4 mr-1" />
                    <span>Submit</span>
                  </Button>
                </div>
              ) : null}
            </div>
          )}
          
          {albumSubmitted && (
            <div className="mt-3 text-sm text-green-600">
              Thanks for providing the album information! This will help improve future interpretations.
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
