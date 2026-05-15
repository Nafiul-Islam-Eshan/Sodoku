
export const UIController = {
  renderBoard(board) {
    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";

    boardDiv.style.display = "grid";
    boardDiv.style.gridTemplateColumns = "repeat(9, 40px)";
    boardDiv.style.gridTemplateRows = "repeat(9, 40px)";
    boardDiv.style.gap = "2px";

    board.forEach((row, r) => {
      row.forEach((val, c) => {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.row = r;
        cell.dataset.col = c;
        cell.textContent = val || "";
        boardDiv.appendChild(cell);
      });
    });
  }
};
