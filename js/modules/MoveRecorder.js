
export const MoveRecorder = {
  history: [],
  record(row, col, value, wasMistake = false) {
    this.history.push({ row, col, value, wasMistake, timestamp: Date.now() });
  }
};
