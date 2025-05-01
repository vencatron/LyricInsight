import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface LyricInterpretationResponse {
  lyric: string;
  interpretation: string;
  song?: string;
  album?: string;
  year?: number;
}

export async function interpretLyric(lyric: string): Promise<LyricInterpretationResponse> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: 
            "You are an expert on Kendrick Lamar's music, lyrics, and artistic style. " +
            "Your task is to provide detailed interpretations of his lyrics, including analysis of wordplay, " +
            "double entendres, hidden meanings, cultural references, and connections to his personal life or other songs. " +
            "If you recognize the song, include the song title, album, and year. " +
            "Format the interpretation as HTML with appropriate headings and paragraphs. " +
            "Do not make up lyrics - if you don't recognize the lyric, focus on analyzing the text provided without " +
            "attributing it to a specific song. " +
            "Provide your response in JSON format with the following fields: " +
            "lyric (the original lyric), interpretation (HTML formatted analysis), song (optional), album (optional), year (optional number)."
        },
        {
          role: "user",
          content: lyric
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content);
    
    return {
      lyric: result.lyric || lyric,
      interpretation: result.interpretation || "Unable to generate interpretation.",
      song: result.song,
      album: result.album,
      year: result.year
    };
  } catch (error) {
    console.error("Error interpreting lyric:", error);
    throw new Error("Failed to interpret lyric. Please try again later.");
  }
}
