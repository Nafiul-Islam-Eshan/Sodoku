export const Animator = {
  /**
   * Apply a temporary animation class to a cell.
   * @param {HTMLElement} cell - The cell element to animate.
   * @param {string} type - The animation type (e.g., "correct", "mistake", "hint", "selected").
   */
  flash(cell, type) {
    if (!cell || !type) return;

    const classMap = {
      correct: "cell-correct",
      mistake: "cell-mistake",
      hint: "cell-hint-highlighted",
      selected: "cell-selected"
    };

    const className = classMap[type];
    if (!className) {
      console.warn(`Animator: Unknown animation type "${type}"`);
      return;
    }

    // Remove any previous animation class to avoid stacking
    Object.values(classMap).forEach(cls => cell.classList.remove(cls));

    // Apply new animation class
    cell.classList.add(className);

    // Automatically remove after animation duration
    const duration = type === "mistake" ? 500 : 300;
    setTimeout(() => {
      if (type !== "selected") { // keep selection until user changes
        cell.classList.remove(className);
      }
    }, duration);
  },

  /**
   * Persistent highlight for selected cell (until deselected).
   */
  select(cell) {
    if (!cell) return;
    cell.classList.add("cell-selected");
  },

  /**
   * Clear selection highlight.
   */
  deselect(cell) {
    if (!cell) return;
    cell.classList.remove("cell-selected");
  }
};