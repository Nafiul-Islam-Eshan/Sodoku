
export const Validator = {
  isValidMove(board, row, col, value) {
    if (value < 1 || value > 9) return false;

    // Row check
    for (let c = 0; c < 9; c++) {
      if (board[row][c] === value) return false;
    }

    // Column check
    for (let r = 0; r < 9; r++) {
      if (board[r][col] === value) return false;
    }

    // 3x3 box check
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (board[startRow + r][startCol + c] === value) return false;
      }
    }

    return true;
  }
};
