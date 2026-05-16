export const StorageManager = {
  save(key, data) {
    try {
      const json = JSON.stringify(data);
      localStorage.setItem(key, json);
    } catch (e) {
      console.error("StorageManager save failed:", e);
    }
  },
  load(key) {
    try {
      const json = localStorage.getItem(key);
      return json ? JSON.parse(json) : null;
    } catch (e) {
      console.error("StorageManager load failed:", e);
      return null;
    }
  },
  remove(key) {
    localStorage.removeItem(key);
  }
};