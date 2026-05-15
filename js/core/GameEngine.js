export const GameEngine = {
  board: null,
  init(puzzle) {
    this.board = puzzle.given;
    console.log("Game initialized", this.board);
  }
};
