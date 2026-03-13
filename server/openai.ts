import OpenAI from "openai";
import { z } from "zod";
import type {
  LyricInterpretation,
  LyricSource,
  LyricToken,
  WordInsight,
} from "@shared/lyric-analysis";
import { getContextForLyric } from "./interpretations";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const interpretationCache = new Map<string, LyricInterpretation>();

const modelResponseSchema = z.object({
  overview: z.string().min(1),
  themes: z.array(z.string()).default([]),
  song: z.string().min(1).optional(),
  album: z.string().min(1).optional(),
  year: z.number().int().optional(),
  wordInsights: z
    .array(
      z.object({
        tokenIndex: z.number().int().nonnegative(),
        meaning: z.string().min(1),
        relevance: z.string().min(1),
        sourceIds: z.array(z.string()).default([]),
      }),
    )
    .default([]),
});

export async function interpretLyric(lyric: string): Promise<LyricInterpretation> {
  const cacheKey = lyric.trim().toLowerCase();
  const cached = interpretationCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const tokens = tokenizeLyric(lyric);
    const wordTokens = tokens.filter((token) => token.kind === "word");
    const sources = getContextForLyric(lyric);
    const promptContext = buildPromptContext(lyric, wordTokens, sources);

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "You are a world-class expert on Kendrick Lamar's music, writing, and symbolism. " +
            "Interpret the lyric carefully, avoid unsupported claims, and stay concise but specific. " +
            "Analyze each provided word token in context, especially slang, repeated images, commands, names, and loaded nouns. " +
            "Only cite source IDs that appear in the provided context. If none apply, return an empty sourceIds array. " +
            "Use the supplied discography source for album attribution and never invent albums outside that list. " +
            "If you are not confident about the song, album, or year, omit those fields instead of guessing. " +
            "Return strict JSON with: overview, themes, optional song, optional album, optional year, and wordInsights. " +
            "Each wordInsights item must include tokenIndex, meaning, relevance, and sourceIds.",
        },
        {
          role: "user",
          content: promptContext,
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("Model returned no content.");
    }

    const parsed = modelResponseSchema.parse(JSON.parse(content));
    const result: LyricInterpretation = {
      lyric,
      overview: parsed.overview,
      themes: parsed.themes,
      tokens,
      wordInsights: sanitizeWordInsights(parsed.wordInsights, tokens, sources),
      sources,
      song: parsed.song,
      album: parsed.album,
      year: parsed.year,
    };

    interpretationCache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error("Error interpreting lyric:", error);
    throw new Error("Failed to interpret lyric. Please try again later.");
  }
}

function tokenizeLyric(lyric: string): LyricToken[] {
  const matches = lyric.match(/[A-Za-z0-9]+(?:['’][A-Za-z0-9]+)*|[^\sA-Za-z0-9]/g) ?? [];

  return matches.map((text, index) => ({
    index,
    text,
    normalized: normalizeToken(text),
    kind: /[A-Za-z0-9]/.test(text) ? "word" : "punctuation",
  }));
}

function normalizeToken(token: string): string {
  return token.toLowerCase().replace(/[^a-z0-9']/g, "");
}

function buildPromptContext(
  lyric: string,
  wordTokens: LyricToken[],
  sources: LyricSource[],
): string {
  const tokenList = wordTokens
    .map((token) => `${token.index}: ${token.text}`)
    .join("\n");

  const sourceList = sources
    .map((source) => `${source.id} | ${source.type} | ${source.title} | ${source.excerpt}`)
    .join("\n");

  return [
    `Lyric: ${lyric}`,
    "",
    "Word tokens to analyze:",
    tokenList,
    "",
    "Available sources:",
    sourceList,
    "",
    "Requirements:",
    "- Write one overview paragraph.",
    "- Return 2 to 4 concise themes.",
    "- Analyze every word token listed above.",
    "- Keep each meaning and relevance field to 1 sentence each.",
  ].join("\n");
}

function sanitizeWordInsights(
  wordInsights: WordInsight[],
  tokens: LyricToken[],
  sources: LyricSource[],
): WordInsight[] {
  const validTokenIndexes = new Set(
    tokens.filter((token) => token.kind === "word").map((token) => token.index),
  );
  const validSourceIds = new Set(sources.map((source) => source.id));

  return wordInsights
    .filter((insight) => validTokenIndexes.has(insight.tokenIndex))
    .map((insight) => ({
      tokenIndex: insight.tokenIndex,
      meaning: insight.meaning.trim(),
      relevance: insight.relevance.trim(),
      sourceIds: insight.sourceIds.filter((sourceId) => validSourceIds.has(sourceId)),
    }))
    .sort((left, right) => left.tokenIndex - right.tokenIndex);
}
