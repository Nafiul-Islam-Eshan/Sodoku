/**
 * Simple XOR-based obfuscation for localStorage data.
 * Not cryptographically secure, but sufficient for game state.
 */
export const Crypto = {
  _key: "sudoku-game-key-2024",

  encrypt(text) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(text.charCodeAt(i) ^ this._key.charCodeAt(i % this._key.length));
    }
    return btoa(result);
  },

  decrypt(data) {
    const text = atob(data);
    let result = "";
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(text.charCodeAt(i) ^ this._key.charCodeAt(i % this._key.length));
    }
    return result;
  }
};