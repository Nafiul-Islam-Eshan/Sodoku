
export const Solver = {
  solve(board) {
    const findEmpty = () => {
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (!board[r][c]) return [r, c];
        }
      }
      return null;
    };

    const isValid = (row, col, val) => {
      for (let i = 0; i < 9; i++) {
        if (board[row][i] === val || board[i][col] === val) return false;
      }
      const sr = Math.floor(row / 3) * 3, sc = Math.floor(col / 3) * 3;
      for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
        if (board[sr + r][sc + c] === val) return false;
      }
      return true;
    };

    const backtrack = () => {
      const empty = findEmpty();
      if (!empty) return true;
      const [r, c] = empty;
      for (let val = 1; val <= 9; val++) {
        if (isValid(r, c, val)) {
          board[r][c] = val;
          if (backtrack()) return true;
          board[r][c] = null;
        }
      }
      return false;
    };

    return backtrack();
  }
};
