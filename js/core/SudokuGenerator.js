
import { Solver } from "./Solver.js";
import { Helpers } from "../utils/helpers.js";

export const SudokuGenerator = {
  generate(difficulty = "easy") {
    // Step 1: Generate a solved board
    let board = this._generateSolvedBoard();

    // Step 2: Remove cells based on difficulty
    const clues = this._getClueCount(difficulty);
    let puzzle = Helpers.clone(board);

    let cellsToRemove = 81 - clues;
    while (cellsToRemove > 0) {
      const r = Math.floor(Math.random() * 9);
      const c = Math.floor(Math.random() * 9);
      if (puzzle[r][c] !== null) {
        const backup = puzzle[r][c];
        puzzle[r][c] = null;

        // Ensure puzzle still solvable uniquely
        let temp = Helpers.clone(puzzle);
        let solved = Helpers.clone(temp);
        if (!Solver.solve(solved)) {
          puzzle[r][c] = backup; // revert if unsolvable
        } else {
          cellsToRemove--;
        }
      }
    }

    return { given: puzzle, solution: board };
  },

  _generateSolvedBoard() {
    let board = Array.from({ length: 9 }, () => Array(9).fill(null));
    this._fillBoard(board);
    return board;
  },

  _fillBoard(board) {
    const findEmpty = () => {
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (!board[r][c]) return [r, c];
        }
      }
      return null;
    };

    const shuffle = arr => arr.sort(() => Math.random() - 0.5);

    const backtrack = () => {
      const empty = findEmpty();
      if (!empty) return true;
      const [r, c] = empty;
      for (let val of shuffle([1,2,3,4,5,6,7,8,9])) {
        if (this._isValid(board, r, c, val)) {
          board[r][c] = val;
          if (backtrack()) return true;
          board[r][c] = null;
        }
      }
      return false;
    };

    backtrack();
  },

  _isValid(board, row, col, val) {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === val || board[i][col] === val) return false;
    }
    const sr = Math.floor(row / 3) * 3, sc = Math.floor(col / 3) * 3;
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
      if (board[sr + r][sc + c] === val) return false;
    }
    return true;
  },

  _getClueCount(difficulty) {
    switch (difficulty) {
      case "easy": return 40;   // 40 clues
      case "medium": return 34; // 34 clues
      case "hard": return 28;   // 28 clues
      case "expert": return 24; // 24 clues
      default: return 40;
    }
  }
};
