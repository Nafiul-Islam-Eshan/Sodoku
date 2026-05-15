export const UIController = {
  renderBoard(board, givenMask = null) {
    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";
    board.forEach((row, r) => {
      row.forEach((val, c) => {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.row = r;
        cell.dataset.col = c;

        if (val) {
          cell.textContent = val;
          // Mark as given if it was part of the original puzzle
          if (givenMask && givenMask[r][c]) {
            cell.classList.add("cell-given");
          }
        }

        boardDiv.appendChild(cell);
      });
    });
  }
};