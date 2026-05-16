export const ReplaySystem = {
  moves: [],
  recordMove(move) {
    this.moves.push({ ...move, timestamp: Date.now() });
  },
  playback(board, index) {
    const temp = board.map(row => [...row]);
    for (let i = 0; i <= index; i++) {
      const m = this.moves[i];
      if (m) temp[m.row][m.col] = m.value;
    }
    return temp;
  },
  clear() {
    this.moves = [];
  }
};