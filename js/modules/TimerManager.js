export const TimerManager = {
  startTime: null,
  elapsed: 0,
  running: false,

  start() {
    this.startTime = performance.now();
    this.running = true;
  },
  stop() {
    if (this.running && this.startTime !== null) {
      this.elapsed += performance.now() - this.startTime;
    }
    this.running = false;
    this.startTime = null;
  },
  reset() {
    this.startTime = null;
    this.elapsed = 0;
    this.running = false;
  },
  getTime() {
    return this.running ? this.elapsed + (performance.now() - this.startTime) : this.elapsed;
  }
};