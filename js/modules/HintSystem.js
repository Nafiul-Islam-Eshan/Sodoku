
export const HintSystem = {
  getHint(board) {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (!board[r][c]) {
          let candidates = [];
          for (let val = 1; val <= 9; val++) {
            if (this.isValid(board, r, c, val)) candidates.push(val);
          }
          if (candidates.length === 1) {
            return { row: r, col: c, value: candidates[0], reason: "Naked Single" };
          }
        }
      }
    }
    return null;
  },
  isValid(board, row, col, val) {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === val || board[i][col] === val) return false;
    }
    const sr = Math.floor(row / 3) * 3, sc = Math.floor(col / 3) * 3;
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
      if (board[sr + r][sc + c] === val) return false;
    }
    return true;
  }
};
