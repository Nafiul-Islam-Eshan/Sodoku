
export const TimerManager = {
  startTime: null,
  elapsed: 0,
  running: false,

  start() {
    this.startTime = performance.now();
    this.running = true;
  },
  stop() {
    this.elapsed += performance.now() - this.startTime;
    this.running = false;
  },
  getTime() {
    return this.running ? this.elapsed + (performance.now() - this.startTime) : this.elapsed;
  }
};
