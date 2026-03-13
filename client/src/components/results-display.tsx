import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LyricInterpretation } from '@/lib/types';

interface ResultsDisplayProps {
  results: LyricInterpretation;
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number | null>(null);

  const wordTokens = results.tokens.filter((token) => token.kind === 'word');
  const firstWordTokenIndex = wordTokens[0]?.index ?? null;
  const insightMap = new Map(results.wordInsights.map((insight) => [insight.tokenIndex, insight]));
  const selectedWordToken =
    wordTokens.find((token) => token.index === selectedTokenIndex) ?? wordTokens[0] ?? null;
  const selectedInsight = selectedWordToken ? insightMap.get(selectedWordToken.index) : undefined;
  const selectedSources = results.sources.filter((source) =>
    selectedInsight?.sourceIds.includes(source.id),
  );

  useEffect(() => {
    const firstInsight = results.wordInsights[0]?.tokenIndex;
    setSelectedTokenIndex(firstInsight ?? firstWordTokenIndex);
  }, [results, firstWordTokenIndex]);

  return (
    <section className="mb-6 transition-opacity duration-300">
      <Card className="overflow-hidden border-2 shadow-blue" style={{ borderColor: 'var(--rwb-blue-light)' }}>
        <div className="px-6 py-4" style={{ backgroundColor: 'var(--rwb-red)' }}>
          <h2 className="font-semibold text-lg" style={{ color: 'var(--rwb-white)' }}>Lyric Interpretation</h2>
        </div>

        <CardContent className="space-y-6 p-6">
          <div className="pb-4 border-b" style={{ borderColor: 'var(--rwb-blue-light)' }}>
            <div className="text-sm mb-1" style={{ color: 'var(--rwb-blue-dark)' }}>You entered:</div>
            <div className="text-lg font-medium leading-relaxed" style={{ color: 'var(--rwb-blue)' }}>
              "{results.lyric}"
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Overview</h3>
                <p className="mt-2 text-neutral-700 leading-7">{results.overview}</p>
              </div>

              {results.themes.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Themes</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {results.themes.map((theme) => (
                      <Badge
                        key={theme}
                        variant="outline"
                        className="border-red-200 bg-red-50 text-red-700"
                      >
                        {theme}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Word Explorer</h3>
                <p className="mt-2 text-sm text-neutral-600">Select a word to inspect its meaning in this line.</p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {results.tokens.map((token) =>
                    token.kind === 'word' ? (
                      <button
                        key={token.index}
                        type="button"
                        onClick={() => setSelectedTokenIndex(token.index)}
                        className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                          token.index === selectedWordToken?.index
                            ? 'border-red-500 bg-red-500 text-white'
                            : 'border-blue-200 bg-blue-50 text-blue-900 hover:border-blue-400'
                        }`}
                      >
                        {token.text}
                      </button>
                    ) : (
                      <span key={token.index} className="text-lg text-neutral-400">
                        {token.text}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border bg-slate-50 p-5" style={{ borderColor: 'var(--rwb-blue-light)' }}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Selected Word</h3>
              {selectedWordToken ? (
                <div className="mt-4 space-y-4">
                  <div>
                    <div className="text-2xl font-semibold" style={{ color: 'var(--rwb-red)' }}>
                      {selectedWordToken.text}
                    </div>
                    <div className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                      token #{selectedWordToken.index}
                    </div>
                  </div>

                  {selectedInsight ? (
                    <>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Meaning</div>
                        <p className="mt-2 text-sm leading-6 text-neutral-700">{selectedInsight.meaning}</p>
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Why It Matters</div>
                        <p className="mt-2 text-sm leading-6 text-neutral-700">{selectedInsight.relevance}</p>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm leading-6 text-neutral-600">
                      This token did not receive a dedicated note. Use the overview for the broader interpretation.
                    </p>
                  )}

                  {selectedSources.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Citations</div>
                      <div className="mt-3 space-y-3">
                        {selectedSources.map((source) => (
                          <div key={source.id} className="rounded-xl border border-neutral-200 bg-white p-3">
                            <div className="text-sm font-medium text-neutral-900">{source.title}</div>
                            <div className="mt-1 text-sm leading-6 text-neutral-600">{source.excerpt}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="mt-4 text-sm text-neutral-600">No word tokens were available to analyze.</p>
              )}
            </div>
          </div>

          {(results.song || results.album) && (
            <div className="rounded-2xl border px-4 py-4" style={{ borderColor: 'var(--rwb-red)' }}>
              <div className="text-sm mb-1" style={{ color: 'var(--rwb-blue-dark)' }}>Likely match</div>
              {results.song && (
                <div className="font-medium" style={{ color: 'var(--rwb-red)' }}>{results.song}</div>
              )}
              {results.album && (
                <div className="text-sm" style={{ color: 'var(--rwb-blue)' }}>
                  Album: <span className="font-medium">{results.album}</span> ({results.year || 'N/A'})
                </div>
              )}
            </div>
          )}

          {results.sources.length > 0 && (
            <div className="border-t pt-5" style={{ borderColor: 'var(--rwb-blue-light)' }}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Available Sources</h3>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {results.sources.map((source) => (
                  <div key={source.id} className="rounded-xl border bg-white p-4" style={{ borderColor: 'var(--rwb-blue-light)' }}>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={
                          source.type === 'knowledge_base'
                            ? 'border-blue-200 bg-blue-50 text-blue-700'
                            : 'border-neutral-200 bg-neutral-50 text-neutral-700'
                        }
                      >
                        {source.type === 'knowledge_base' ? 'Context note' : 'Discography'}
                      </Badge>
                    </div>
                    <div className="mt-3 text-sm font-medium text-neutral-900">{source.title}</div>
                    <div className="mt-1 text-sm leading-6 text-neutral-600">{source.excerpt}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
