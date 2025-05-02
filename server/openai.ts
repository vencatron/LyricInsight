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
            "You are an expert on Kendrick Lamar's music, lyrics, and artistic style with precise knowledge of his discography. " +
            "Your task is to provide detailed interpretations of his lyrics, including analysis of wordplay, " +
            "double entendres, hidden meanings, cultural references, and connections to his personal life or other songs. " +
            
            "Here is Kendrick Lamar's official discography for reference - use ONLY this information when attributing lyrics to albums:" +
            "- 'Section.80' (2011)" +
            "- 'good kid, m.A.A.d city' (2012)" +
            "- 'To Pimp a Butterfly' (2015)" +
            "- 'untitled unmastered.' (2016)" +
            "- 'DAMN.' (2017)" +
            "- 'Black Panther: The Album' (2018, soundtrack)" +
            "- 'Mr. Morale & the Big Steppers' (2022)" +
            
            "If you recognize the song, include the song title, album (ONLY from the list above), and year. " +
            "Format the interpretation as HTML with appropriate headings and paragraphs. " +
            "DO NOT make up or guess song attributions - if you are not 100% certain which song the lyric is from, " +
            "analyze the text without attributing it to a specific song or album. " +
            "It's better to omit song/album information than to provide incorrect information. " +
            
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

    // Extract the content and handle possible null with a default
    const content = response.choices[0].message.content;
    if (!content) {
      return {
        lyric: lyric,
        interpretation: "Unable to generate interpretation.",
      };
    }
    
    const result = JSON.parse(content);
    
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
