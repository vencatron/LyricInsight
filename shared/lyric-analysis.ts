export type LyricTokenKind = "word" | "punctuation";

export interface LyricToken {
  index: number;
  text: string;
  normalized: string;
  kind: LyricTokenKind;
}

export type LyricSourceType = "knowledge_base" | "discography";

export interface LyricSource {
  id: string;
  title: string;
  type: LyricSourceType;
  excerpt: string;
  url?: string;
}

export interface WordInsight {
  tokenIndex: number;
  meaning: string;
  relevance: string;
  sourceIds: string[];
}

export interface LyricInterpretation {
  lyric: string;
  overview: string;
  themes: string[];
  tokens: LyricToken[];
  wordInsights: WordInsight[];
  sources: LyricSource[];
  song?: string;
  album?: string;
  year?: number;
}
