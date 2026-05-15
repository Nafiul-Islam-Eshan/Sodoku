
import { EventBus } from "../utils/eventBus.js";

export const ThemeManager = {
  themes: ["light", "dark", "minimal", "competitive"],

  setTheme(theme) {
    if (!this.themes.includes(theme)) {
      console.warn(`Invalid theme: ${theme}. Defaulting to light.`);
      theme = "light";
    }
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);

    // Broadcast change so UI updates instantly
    EventBus.emit("theme:changed", theme);
  },

  loadTheme() {
    const saved = localStorage.getItem("theme");
    const theme = this.themes.includes(saved) ? saved : "light";
    document.documentElement.dataset.theme = theme;
    EventBus.emit("theme:loaded", theme);
  },

  cycleTheme() {
    const current = document.documentElement.dataset.theme || "light";
    const idx = this.themes.indexOf(current);
    const next = this.themes[(idx + 1) % this.themes.length];
    this.setTheme(next);
  }
};
