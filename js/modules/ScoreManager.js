export const ScoreManager = {
  calculate(difficulty, hints, mistakes, autoSolve) {
    const multipliers = { easy: 1, medium: 1.5, hard: 2, expert: 3 };
    let base = (multipliers[difficulty] || 1) * 1000;
    let hintPenalty = hints * (50 + 20 * hints);
    let mistakePenalty = mistakes * 75;
    let autoPenalty = autoSolve ? -0.5 * base : 0;
    return Math.max(0, Math.round(base - hintPenalty - mistakePenalty + autoPenalty));
  }
};