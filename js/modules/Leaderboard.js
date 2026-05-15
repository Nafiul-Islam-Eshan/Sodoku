
export const Leaderboard = {
  entries: [],
  add(entry) {
    this.entries.push(entry);
    this.entries.sort((a, b) => b.score - a.score);
  },
  getTop(n = 10) {
    return this.entries.slice(0, n);
  }
};
