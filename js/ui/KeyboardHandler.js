export const KeyboardHandler = {
  init(boardElement, onInput) {
    let selectedCell = null;
    const cells = () => [...boardElement.children];

    boardElement.addEventListener("click", e => {
      if (e.target.classList.contains("cell")) {
        // Deselect previous
        if (selectedCell) {
          selectedCell.classList.remove("cell-selected");
        }
        selectedCell = e.target;
        selectedCell.classList.add("cell-selected");
      }
    });

    document.addEventListener("keydown", e => {
      if (!selectedCell) return;
      
      const allCells = cells();
      const index = allCells.indexOf(selectedCell);
      const row = Math.floor(index / 9);
      const col = index % 9;

      // Arrow key navigation
      if (e.key === "ArrowUp" && row > 0) {
        selectedCell.classList.remove("cell-selected");
        selectedCell = allCells[(row - 1) * 9 + col];
        selectedCell.classList.add("cell-selected");
        e.preventDefault();
        return;
      }
      if (e.key === "ArrowDown" && row < 8) {
        selectedCell.classList.remove("cell-selected");
        selectedCell = allCells[(row + 1) * 9 + col];
        selectedCell.classList.add("cell-selected");
        e.preventDefault();
        return;
      }
      if (e.key === "ArrowLeft" && col > 0) {
        selectedCell.classList.remove("cell-selected");
        selectedCell = allCells[row * 9 + (col - 1)];
        selectedCell.classList.add("cell-selected");
        e.preventDefault();
        return;
      }
      if (e.key === "ArrowRight" && col < 8) {
        selectedCell.classList.remove("cell-selected");
        selectedCell = allCells[row * 9 + (col + 1)];
        selectedCell.classList.add("cell-selected");
        e.preventDefault();
        return;
      }

      if (e.key >= "1" && e.key <= "9") {
        onInput(selectedCell, parseInt(e.key));
      }
      if (e.key === "Backspace" || e.key === "Delete") {
        onInput(selectedCell, null);
      }
    });
  }
};