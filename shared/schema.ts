import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Lyric interpretation schema
export const lyricInterpretations = pgTable("lyric_interpretations", {
  id: serial("id").primaryKey(),
  lyric: text("lyric").notNull(),
  interpretation: text("interpretation").notNull(),
  song: text("song"),
  album: text("album"),
  year: integer("year"),
  createdAt: text("created_at").notNull(),
});

export const insertLyricInterpretationSchema = createInsertSchema(lyricInterpretations).pick({
  lyric: true,
  interpretation: true,
  song: true,
  album: true,
  year: true,
  createdAt: true,
});

export type InsertLyricInterpretation = z.infer<typeof insertLyricInterpretationSchema>;
export type LyricInterpretation = typeof lyricInterpretations.$inferSelect;
