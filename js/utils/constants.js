
export const Constants = {
  difficulties: {
    easy: { multiplier: 1.0, clues: 40 },
    medium: { multiplier: 1.5, clues: 34 },
    hard: { multiplier: 2.0, clues: 28 },
    expert: { multiplier: 3.0, clues: 24 }
  },
  scoring: {
    hintPenaltyBase: 50,
    hintPenaltyStep: 20,
    mistakePenalty: 75,
    autoSolvePenaltyFactor: 0.5
  }
};
