import { Card, CardContent } from '@/components/ui/card';
import { Check, Music } from 'lucide-react';

export default function WelcomeState() {
  return (
    <section>
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              <div className="bg-primary/10 rounded-full p-3 inline-block">
                <Music className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div>
              <h2 className="font-semibold text-lg text-neutral-800 mb-2">How It Works</h2>
              <p className="text-neutral-600 mb-4">Enter a line from any Kendrick Lamar song, and our AI will analyze it to reveal:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-primary mr-2 mt-0.5" />
                  <span>Hidden meanings and double entendres</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-primary mr-2 mt-0.5" />
                  <span>References to Kendrick's life and experiences</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-primary mr-2 mt-0.5" />
                  <span>Connections to other songs in his discography</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-primary mr-2 mt-0.5" />
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
