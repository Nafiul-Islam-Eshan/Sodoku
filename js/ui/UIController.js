export const UIController = {
  /**
   * Render the Sudoku board.
   * @param {Array} board - Current board state
   * @param {Array} given - Original given numbers (to mark as non-editable)
   */
  renderBoard(board, given = null) {
    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";
    board.forEach((row, r) => {
      row.forEach((val, c) => {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.textContent = val || "";
        // Mark given cells
        if (given && given[r][c] !== null) {
          cell.classList.add("cell-given");
        }
        // Add thick borders for 3x3 boxes
        if (r % 3 === 0) cell.style.borderTop = "2px solid var(--cell-border, #333)";
        if (c % 3 === 0) cell.style.borderLeft = "2px solid var(--cell-border, #333)";
        if (r === 8) cell.style.borderBottom = "2px solid var(--cell-border, #333)";
        if (c === 8) cell.style.borderRight = "2px solid var(--cell-border, #333)";
        boardDiv.appendChild(cell);
      });
    });
  }
};