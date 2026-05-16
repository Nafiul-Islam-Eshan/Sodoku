export const MoveRecorder = {
  history: [],
  record(row, col, value, wasMistake = false, oldValue = null) {
    this.history.push({ row, col, value, wasMistake, oldValue, timestamp: Date.now() });
  },
  undo() {
    return this.history.pop() || null;
  },
  clear() {
    this.history = [];
  }
};