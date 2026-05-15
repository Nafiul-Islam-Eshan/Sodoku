import { Helpers } from "../utils/helpers.js";

export const GameEngine = {
  board: null,
  init(puzzle) {
    // Clone the board so mutations don't affect puzzle.given
    this.board = Helpers.clone(puzzle.given);
    console.log("Game initialized", this.board);
  }
};