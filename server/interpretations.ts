export interface KnownInterpretation {
  lyricSnippet: string;
  explanation: string;
}

export const knownInterpretations: KnownInterpretation[] = [
  {
    lyricSnippet: "loyalty, got royalty inside my DNA",
    explanation: "In 'DNA.' Kendrick boasts about his innate qualities and heritage, emphasizing pride in his roots and personal code."
  },
  {
    lyricSnippet: "we gon' be alright",
    explanation: "The chorus of 'Alright' became an anthem for resilience and hope in the face of racial injustice."
  }
];

export function getContextForLyric(lyric: string): string | undefined {
  for (const item of knownInterpretations) {
    if (lyric.toLowerCase().includes(item.lyricSnippet.toLowerCase())) {
      return item.explanation;
    }
  }
  return undefined;
}
