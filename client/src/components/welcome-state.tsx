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
import { Card, CardContent } from '@/components/ui/card';

export default function WelcomeState() {
  return (
    <section>
      <Card className="overflow-hidden">
        <div className="bg-primary px-6 py-4">
          <h2 className="font-semibold text-white text-lg">Welcome</h2>
        </div>
        
        <CardContent className="p-6">
          <p className="text-lg text-neutral-700 mb-4">
            Enter a Kendrick Lamar lyric to get a detailed interpretation of its meaning, 
            cultural context, and connections to other songs.
          </p>
          
          <div className="my-4 p-4 bg-neutral-50 rounded-md border border-neutral-200">
            <h3 className="font-medium text-neutral-800 mb-2">Example lyrics to try:</h3>
            <ul className="space-y-2 text-neutral-700">
              <li>"I remember you was conflicted, misusing your influence"</li>
              <li>"All my life I has to fight"</li>
              <li>"Sit down, be humble"</li>
              <li>"The blacker the berry, the sweeter the juice"</li>
            </ul>
          </div>
          
          <p className="text-sm text-neutral-600">
            Tip: If you know which album a lyric is from but our system didn't identify it, 
            you can provide that information. You can also specify if it's a diss track or feature
            to help us improve future interpretations.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
