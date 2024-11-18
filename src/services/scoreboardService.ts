/**
 * LocalStorage Structure for the Scoreboard:
 * The scoreboard is an array of up to 3 scores, each with the following structure:
 * [
 *   {
 *     attempts: number; // Number of attempts made
 *     time: number; // Time spent in seconds
 *     score: number; // Calculated unlimited score
 *     date: string; // ISO format date when the score was achieved
 *   },
 *   ...
 * ]
 *
 * Example:
 * [
 *   { attempts: 10, time: 60, score: 1000, date: "2024-11-16T10:00:00.000Z" },
 *   { attempts: 15, time: 80, score: 800, date: "2024-11-15T12:00:00.000Z" },
 *   { attempts: 20, time: 120, score: 600, date: "2024-11-14T14:00:00.000Z" }
 * ]
 */

import { calculateUnlimitedScore } from '../utils/scoreUtils';
import { Score } from '../types/score';

/**
 * Saves a new score to localStorage.
 * @param {number} attempts - The number of attempts made.
 * @param {number} time - The time spent to complete the game (in seconds).
 */
export function saveScore(attempts: number, time: number): void {
  const scoreboard: Score[] = JSON.parse(localStorage.getItem('scoreboard') || '[]');
  const score = calculateUnlimitedScore(time, attempts);

  // Create a new score object
  const newScore: Score = {
    attempts,
    time,
    score,
    date: new Date().toISOString(),
  };

  // Add the new score and sort the scoreboard by highest score
  scoreboard.push(newScore);
  scoreboard.sort((a, b) => b.score - a.score);

  // Save only the top 3 scores
  localStorage.setItem('scoreboard', JSON.stringify(scoreboard.slice(0, 3)));
}

/**
 * Retrieves the scores from localStorage.
 * @returns {Score[]} The top 3 scores sorted by highest score.
 */
export function getScores(): Score[] {
  const storedScores = localStorage.getItem('scoreboard');
  console.log('Retrieved scoreboard from localStorage:', storedScores);
  return JSON.parse(storedScores || '[]');
}