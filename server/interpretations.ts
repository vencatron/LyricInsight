import type { LyricSource } from "@shared/lyric-analysis";

interface KnownInterpretation {
  id: string;
  lyricSnippet: string;
  title: string;
  excerpt: string;
}

const discographySource: LyricSource = {
  id: "kendrick-discography",
  title: "LyricInsight Discography Guide",
  type: "discography",
  excerpt:
    "Approved album list for attribution: Section.80 (2011), good kid, m.A.A.d city (2012), To Pimp a Butterfly (2015), untitled unmastered. (2016), DAMN. (2017), Black Panther: The Album (2018), Mr. Morale & the Big Steppers (2022).",
};

export const knownInterpretations: KnownInterpretation[] = [
  {
    id: "dna-royalty",
    lyricSnippet: "loyalty, got royalty inside my DNA",
    title: "Curated note: inherited identity in 'DNA.'",
    excerpt:
      "Kendrick frames loyalty and royalty as traits embedded in his lineage, turning identity into both pride and burden.",
  },
  {
    id: "alright-anthem",
    lyricSnippet: "we gon' be alright",
    title: "Curated note: protest refrain in 'Alright'",
    excerpt:
      "The refrain became a public expression of resilience, especially in conversations about anti-Black violence and survival.",
  },
  {
    id: "tpab-poem",
    lyricSnippet: "i remember you was conflicted",
    title: "Curated note: recurring poem in 'To Pimp a Butterfly'",
    excerpt:
      "This line belongs to the poem Kendrick reveals piece by piece across the album, tying personal conflict to the record's wider moral arc.",
  },
  {
    id: "humble-command",
    lyricSnippet: "sit down, be humble",
    title: "Curated note: command and performance in 'HUMBLE.'",
    excerpt:
      "The line works as both an insult and a self-aware performance of dominance, playing with ego while pretending to reject it.",
  },
  {
    id: "morale-grief",
    lyricSnippet: "i grieve different",
    title: "Curated note: trauma and isolation in 'United In Grief'",
    excerpt:
      "Kendrick uses the line to stress private, uneven responses to trauma instead of polished public healing.",
  },
];

export function getContextForLyric(lyric: string): LyricSource[] {
  const normalizedLyric = lyric.toLowerCase();
  const matchedSources = knownInterpretations
    .filter((item) => normalizedLyric.includes(item.lyricSnippet.toLowerCase()))
    .map<LyricSource>((item) => ({
      id: item.id,
      title: item.title,
      type: "knowledge_base",
      excerpt: item.excerpt,
    }));

  return [discographySource, ...matchedSources];
}
