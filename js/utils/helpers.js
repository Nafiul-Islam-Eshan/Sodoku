
export const Helpers = {
  clone(board) {
    return board.map(row => [...row]);
  },

  shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  },

  range(n) {
    return Array.from({ length: n }, (_, i) => i);
  },

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};
