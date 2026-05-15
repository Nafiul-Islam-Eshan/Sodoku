
export const Crypto = {
  async encrypt(text, key) {
    const enc = new TextEncoder().encode(text);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const cipher = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      enc,
    );
    return {
      cipher: btoa(String.fromCharCode(...new Uint8Array(cipher))),
      iv: Array.from(iv),
    };
  },

  async decrypt(data, key) {
    const { cipher, iv } = data;
    const bytes = Uint8Array.from(atob(cipher), (c) => c.charCodeAt(0));
    const plain = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: new Uint8Array(iv) },
      key,
      bytes,
    );
    return new TextDecoder().decode(plain);
  },

  async generateKey() {
    return crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, [
      "encrypt",
      "decrypt",
    ]);
  },
};
