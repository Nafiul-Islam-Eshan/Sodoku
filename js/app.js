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
import { ThemeManager } from "./modules/ThemeManager.js";
import { EventBus } from "./utils/eventBus.js";
import { Helpers } from "./utils/helpers.js";

// Load theme immediately before DOM loads to prevent FOUC
ThemeManager.loadTheme();

document.addEventListener("DOMContentLoaded", () => {
  const difficulty = localStorage.getItem("difficulty") || "easy";

  const saved = StorageManager.load("sudokuState");
  let puzzle;
  if (saved && saved.given && saved.solution) {
    puzzle = saved;
    GameEngine.init(puzzle);
    GameEngine.board = Helpers.clone(saved.board || saved.given);
  } else {
    puzzle = SudokuGenerator.generate(difficulty);
    GameEngine.init(puzzle);
  }

  UIController.renderBoard(GameEngine.board, puzzle.given);
  TimerManager.start();

  KeyboardHandler.init(document.getElementById("board"), (cell, val) => {
    const index = [...cell.parentNode.children].indexOf(cell);
    const row = Math.floor(index / 9);
    const col = index % 9;

    if (puzzle.given[row][col] !== null) {
      Animator.flash(cell, "mistake");
      return;
    }

    const oldValue = GameEngine.board[row][col];
    if (val === null || Validator.isValidMove(GameEngine.board, row, col, val)) {
      GameEngine.board[row][col] = val;
      cell.textContent = val || "";
      Animator.flash(cell, val ? "correct" : "");
      MoveRecorder.record(row, col, val, false, oldValue);
      ReplaySystem.recordMove({ row, col, value: val, oldValue });
    } else {
      Animator.flash(cell, "mistake");
      MoveRecorder.record(row, col, val, true, oldValue);
    }
    saveState();
  });

  document.getElementById("hintBtn").onclick = () => {
    const hint = HintSystem.getHint(GameEngine.board);
    if (hint) {
      const index = hint.row * 9 + hint.col;
      const cell = document.getElementById("board").children[index];
      if (puzzle.given[hint.row][hint.col] !== null) return;
      GameEngine.board[hint.row][hint.col] = hint.value;
      cell.textContent = hint.value;
      Animator.flash(cell, "hint");
      MoveRecorder.record(hint.row, hint.col, hint.value, false);
      saveState();
    }
  };

  document.getElementById("undoBtn").onclick = () => {
    const last = MoveRecorder.undo();
    if (last) {
      GameEngine.board[last.row][last.col] = last.oldValue || null;
      UIController.renderBoard(GameEngine.board, puzzle.given);
      saveState();
    }
  };

  let isSolving = false;
  document.getElementById("solveBtn").onclick = async () => {
    if (isSolving) return;
    isSolving = true;
    const btn = document.getElementById("solveBtn");
    btn.disabled = true;
    btn.textContent = "Solving...";

    const boardDiv = document.getElementById("board");
    const cells = boardDiv.children;

    await Solver.solveVisual(GameEngine.board, async (row, col, val, isBacktrack) => {
      const index = row * 9 + col;
      const cell = cells[index];
      GameEngine.board[row][col] = val;
      cell.textContent = val || "";
      if (isBacktrack) {
        cell.classList.add("cell-backtrack");
        setTimeout(() => cell.classList.remove("cell-backtrack"), 200);
      } else {
        cell.classList.add("cell-solving");
        setTimeout(() => cell.classList.remove("cell-solving"), 200);
      }
    }, 30);

    UIController.renderBoard(GameEngine.board, puzzle.given);
    btn.disabled = false;
    btn.textContent = "Auto Solve";
    isSolving = false;
    saveState();
  };

  document.getElementById("themeBtn").onclick = () => {
    ThemeManager.cycleTheme();
  };

  setInterval(() => {
    const seconds = Math.floor(TimerManager.getTime() / 1000);
    document.getElementById("timer").textContent = `Time: ${seconds}s`;
  }, 1000);

  setInterval(() => {
    const mistakes = MoveRecorder.history.filter(m => m.wasMistake).length;
    const hints = MoveRecorder.history.filter(m => m.value && !m.wasMistake).length;
    const score = ScoreManager.calculate(difficulty, hints, mistakes, false);
    document.getElementById("score").textContent = `Score: ${score}`;
    Leaderboard.add({ playerName: "You", score });
    document.getElementById("leaderboard").textContent =
      "Leaderboard: " + Leaderboard.getTop(3).map(e => `${e.playerName}(${e.score})`).join(", ");
  }, 5000);

  window.addEventListener("beforeunload", saveState);

  function saveState() {
    StorageManager.save("sudokuState", {
      given: puzzle.given,
      solution: puzzle.solution,
      board: GameEngine.board,
      difficulty,
      history: MoveRecorder.history
    });
  }
});