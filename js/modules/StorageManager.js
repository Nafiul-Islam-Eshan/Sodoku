
import { Crypto } from "../utils/crypto.js";

export const StorageManager = {
  save(key, data) {
    const encrypted = Crypto.encrypt(JSON.stringify(data));
    localStorage.setItem(key, encrypted);
  },
  load(key) {
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;
    return JSON.parse(Crypto.decrypt(encrypted));
  }
};
