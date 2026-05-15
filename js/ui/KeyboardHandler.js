export const KeyboardHandler = {
  init(boardElement, onInput) {
    let selectedCell = null;

    boardElement.addEventListener("click", e => {
      if (e.target.classList.contains("cell")) {
        // Deselect previous cell
        if (selectedCell) {
          selectedCell.classList.remove("cell-selected");
        }
        selectedCell = e.target;
        selectedCell.classList.add("cell-selected");
      }
    });

    document.addEventListener("keydown", e => {
      if (!selectedCell) return;

      if (e.key >= "1" && e.key <= "9") {
        onInput(selectedCell, parseInt(e.key));
      }
      if (e.key === "Backspace" || e.key === "Delete") {
        onInput(selectedCell, null);
      }
    });
  }
};