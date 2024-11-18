// Represents a single score entry in the scoreboard.
export interface Score {
  attempts: number; // Number of attempts made
  time: number; // Time spent in seconds
  score: number; // Calculated unlimited score
  date: string; // Date when the score was achieved (ISO format)
}
