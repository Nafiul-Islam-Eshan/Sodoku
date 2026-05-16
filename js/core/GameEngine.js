import { Helpers } from "../utils/helpers.js";

export const GameEngine = {
  board: null,
  init(puzzle) {
    // Deep clone to prevent mutation of original puzzle
    this.board = Helpers.clone(puzzle.given);
    console.log("Game initialized", this.board);
  }
};