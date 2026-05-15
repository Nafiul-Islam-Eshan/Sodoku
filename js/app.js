import { UIController } from "./ui/UIController.js";
import { GameEngine } from "./core/GameEngine.js";
import { SudokuGenerator } from "./core/SudokuGenerator.js";
import { Validator } from "./core/Validator.js";
import { Solver } from "./core/Solver.js";
import { KeyboardHandler } from "./ui/KeyboardHandler.js";
import { Animator } from "./ui/Animator.js";
import { ScoreManager } from "./modules/ScoreManager.js";
import { TimerManager } from "./modules/TimerManager.js";
import { HintSystem } from "./modules/HintSystem.js";
import { Leaderboard } from "./modules/Leaderboard.js";
import { ReplaySystem } from "./modules/ReplaySystem.js";
import { StorageManager } from "./modules/StorageManager.js";
import { MoveRecorder } from "./modules/MoveRecorder.js";
import { EventBus } from "./utils/eventBus.js";

// Embedded ThemeManager logic
const ThemeManager = {
  themes: ["light", "dark", "minimal", "competitive"],

  setTheme(theme) {
    if (!this.themes.includes(theme)) {
      console.warn(`Invalid theme: ${theme}. Defaulting to light.`);
      theme = "light";
    }
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
    EventBus.emit("theme:changed", theme);
  },

  loadTheme() {
    const saved = localStorage.getItem("theme");
    const theme = this.themes.includes(saved) ? saved : "light";
    document.documentElement.dataset.theme = theme;
    EventBus.emit("theme:loaded", theme);
  },

  cycleTheme() {
    const current = document.documentElement.dataset.theme || "light";
    const idx = this.themes.indexOf(current);
    const next = this.themes[(idx + 1) % this.themes.length];
    this.setTheme(next);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // Load theme immediately
  ThemeManager.loadTheme();

  // Load difficulty from index.html selection
  const difficulty = localStorage.getItem("difficulty") || "easy";

  // Restore saved state if available
  let saved = null;
  try {
    saved = StorageManager.load("sudokuState");
  } catch (e) {
    console.warn("Failed to load saved state:", e);
  }

  let puzzle;
  if (saved && saved.given && saved.solution) {
    puzzle = { given: saved.given, solution: saved.solution };
  } else {
    puzzle = SudokuGenerator.generate(difficulty);
  }

  // Initialize game
  GameEngine.init(puzzle);

  // Render board with given mask to distinguish pre-filled cells
  UIController.renderBoard(GameEngine.board, puzzle.given);

  // Start timer
  TimerManager.start();

  // Keyboard input
  KeyboardHandler.init(document.getElementById("board"), (cell, val) => {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    const oldValue = GameEngine.board[row][col];

    if (val === null || Validator.isValidMove(GameEngine.board, row, col, val)) {
      GameEngine.board[row][col] = val;
      cell.textContent = val || "";
      cell.classList.remove("cell-given");
      Animator.flash(cell, val ? "correct" : "");
      MoveRecorder.record(row, col, val, false, oldValue);
      ReplaySystem.recordMove({ row, col, value: val, oldValue });
    } else {
      Animator.flash(cell, "mistake");
      MoveRecorder.record(row, col, val, true, oldValue);
    }
    saveState();
  });

  // Buttons
  document.getElementById("hintBtn").onclick = () => {
    const hint = HintSystem.getHint(GameEngine.board);
    if (hint) {
      const index = hint.row * 9 + hint.col;
      const cell = document.getElementById("board").children[index];
      const oldValue = GameEngine.board[hint.row][hint.col];
      GameEngine.board[hint.row][hint.col] = hint.value;
      cell.textContent = hint.value;
      cell.classList.remove("cell-given");
      Animator.flash(cell, "hint");
      MoveRecorder.record(hint.row, hint.col, hint.value, false, oldValue);
      saveState();
    }
  };

  document.getElementById("undoBtn").onclick = () => {
    if (MoveRecorder.history.length === 0) return;
    const last = MoveRecorder.history.pop();
    if (last) {
      GameEngine.board[last.row][last.col] = last.oldValue || null;
      UIController.renderBoard(GameEngine.board, puzzle.given);
      saveState();
    }
  };

  document.getElementById("solveBtn").onclick = () => {
    Solver.solve(GameEngine.board);
    UIController.renderBoard(GameEngine.board, puzzle.given);
    saveState();
  };

  document.getElementById("themeBtn").onclick = () => {
    ThemeManager.cycleTheme();
  };

  // Timer display
  setInterval(() => {
    const seconds = Math.floor(TimerManager.getTime() / 1000);
    document.getElementById("timer").textContent = `Time: ${seconds}s`;
  }, 1000);

  // Score + leaderboard
  setInterval(() => {
    const score = ScoreManager.calculate(difficulty, MoveRecorder.history.length, 0, false);
    document.getElementById("score").textContent = `Score: ${score}`;
    Leaderboard.add({ playerName: "You", score });
    document.getElementById("leaderboard").textContent =
      "Leaderboard: " + Leaderboard.getTop(3).map(e => `${e.playerName}(${e.score})`).join(", ");
  }, 5000);

  // Persist state before unload
  window.addEventListener("beforeunload", saveState);

  function saveState() {
    try {
      StorageManager.save("sudokuState", {
        given: puzzle.given,
        solution: puzzle.solution,
        board: GameEngine.board,
        difficulty,
        history: MoveRecorder.history
      });
    } catch (e) {
      console.warn("Failed to save state:", e);
    }
  }
});