export const Validator = {
  isValidMove(board, row, col, value) {
    if (value < 1 || value > 9) return false;

    // Row check
    for (let c = 0; c < 9; c++) {
      if (c !== col && board[row][c] === value) return false;
    }

    // Column check
    for (let r = 0; r < 9; r++) {
      if (r !== row && board[r][col] === value) return false;
    }

    // 3x3 box check
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const rr = startRow + r;
        const cc = startCol + c;
        if ((rr !== row || cc !== col) && board[rr][cc] === value) return false;
      }
    }

    return true;
  }
};