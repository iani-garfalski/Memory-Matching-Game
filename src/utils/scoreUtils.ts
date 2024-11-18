/**
 * Formula for Unlimited Score Calculation:
 * The score is calculated based on a high starting base score, with penalties applied for 
 * both the time spent and the number of attempts. The formula ensures that faster completion 
 * with fewer attempts results in a higher score. The score will never be negative.
 * 
 * Components:
 * - Base Score: Starts at 1000.
 * - Time Penalty: Subtracts 4 points for every second spent completing the game.
 * - Attempts Penalty: Subtracts 6 points for every attempt made.
 * 
 * Formula:
 * Total Score = Base Score - (Time Spent * 4) - (Attempts * 6)
 * 
 * Special Case:
 * If penalties exceed the base score, the total score is set to 0 (no negative scores).
 * 
 * Example:
 * - Time Spent: 60 seconds
 * - Attempts: 10
 * - Calculation: 1000 - (60 * 4) - (10 * 6) = 1000 - 240 - 60 = 700
 */

export function calculateUnlimitedScore(timeSpent: number, attempts: number): number {
    const baseScore = 1000; // Initial high base score

    // Apply penalties for time and attempts
    const timePenalty = timeSpent * 4;  // Penalize 4 points per second
    const attemptsPenalty = attempts * 6;  // Penalize 6 points per attempt

    // Calculate total score and ensure it’s not below zero
    return Math.max(baseScore - timePenalty - attemptsPenalty, 0);
}
