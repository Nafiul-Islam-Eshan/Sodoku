export const Leaderboard = {
  _key: "sudoku_leaderboard",
  
  get entries() {
    const raw = localStorage.getItem(this._key);
    return raw ? JSON.parse(raw) : [];
  },
  
  set entries(val) {
    localStorage.setItem(this._key, JSON.stringify(val));
  },

  add(entry) {
    const list = this.entries;
    list.push(entry);
    list.sort((a, b) => b.score - a.score);
    this.entries = list;
  },
  
  getTop(n = 10) {
    return this.entries.slice(0, n);
  },
  
  clear() {
    this.entries = [];
  }
};