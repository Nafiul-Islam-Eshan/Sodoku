export const Helpers = {
  clone(board) {
    return board.map(row => [...row]);
  },

  shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  },

  range(n) {
    return Array.from({ length: n }, (_, i) => i);
  },

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};