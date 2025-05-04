import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { interpretLyric } from "./openai";

const lyricSchema = z.object({
  lyric: z.string().min(5, "Lyric must be at least 5 characters long"),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Interpret lyric endpoint
  app.post("/api/interpret", async (req, res) => {
    try {
      // Validate request body
      const result = lyricSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid request", 
          errors: result.error.format() 
        });
      }
      
      const { lyric } = result.data;
      
      // Call OpenAI for interpretation
      const interpretation = await interpretLyric(lyric);
      
      return res.status(200).json(interpretation);
    } catch (error) {
      console.error("Error in /api/interpret:", error);
      return res.status(500).json({ 
        message: error instanceof Error ? error.message : "An unexpected error occurred" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
