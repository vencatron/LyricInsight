import { Card, CardContent } from '@/components/ui/card';
import { Check, Music } from 'lucide-react';

export default function WelcomeState() {
  return (
    <section>
      <Card className="overflow-hidden border-2 shadow-blue" style={{ borderColor: 'var(--rwb-blue-light)' }}>
        <div className="px-6 py-4" style={{ backgroundColor: 'var(--rwb-blue)' }}>
          <h2 className="font-semibold text-lg" style={{ color: 'var(--rwb-white)' }}>How It Works</h2>
        </div>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              <div className="rounded-full p-3 inline-block" style={{ backgroundColor: 'rgba(var(--rwb-red-rgb), 0.1)' }}>
                <Music className="w-8 h-8" style={{ color: 'var(--rwb-red)' }} />
              </div>
            </div>
            <div>
              <p className="mb-4" style={{ color: 'var(--rwb-blue-dark)' }}>Enter a line from any Kendrick Lamar song, and our AI will analyze it to reveal:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 mt-0.5" style={{ color: 'var(--rwb-red)' }} />
                  <span>Hidden meanings and double entendres</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 mt-0.5" style={{ color: 'var(--rwb-blue)' }} />
                  <span>References to Kendrick's life and experiences</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 mt-0.5" style={{ color: 'var(--rwb-red)' }} />
                  <span>Connections to other songs in his discography</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 mt-0.5" style={{ color: 'var(--rwb-blue)' }} />
                  <span>Cultural and historical context</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
