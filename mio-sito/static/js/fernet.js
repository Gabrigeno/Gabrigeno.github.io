// Fernet (https://github.com/fernet/spec) su Web Crypto — token compatibili con Python cryptography.fernet
const fernet = (() => {
  const te = new TextEncoder(), td = new TextDecoder();

  const b64uDecode = (s) => {
    s = s.trim().replace(/-/g, "+").replace(/_/g, "/");
    while (s.length % 4) s += "=";
    return Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
  };

  const b64uEncode = (bytes) => {
    let s = "";
    for (const b of bytes) s += String.fromCharCode(b);
    return btoa(s).replace(/\+/g, "-").replace(/\//g, "_");
  };

  const importKeys = async (keyB64) => {
    let raw;
    try { raw = b64uDecode(keyB64); } catch { throw new Error("Invalid key (malformed base64)."); }
    if (raw.length !== 32) throw new Error("Invalid key (expected 32 bytes).");
    return {
      sign: await crypto.subtle.importKey("raw", raw.slice(0, 16), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]),
      enc: await crypto.subtle.importKey("raw", raw.slice(16), { name: "AES-CBC" }, false, ["encrypt", "decrypt"]),
    };
  };

  const generateKey = () => b64uEncode(crypto.getRandomValues(new Uint8Array(32)));

  const encrypt = async (message, keyB64) => {
    const k = await importKeys(keyB64);
    const iv = crypto.getRandomValues(new Uint8Array(16));
    const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-CBC", iv }, k.enc, te.encode(message)));
    const body = new Uint8Array(25 + ct.length);
    body[0] = 0x80;
    new DataView(body.buffer).setBigUint64(1, BigInt(Math.floor(Date.now() / 1000)));
    body.set(iv, 9);
    body.set(ct, 25);
    const mac = new Uint8Array(await crypto.subtle.sign("HMAC", k.sign, body));
    const token = new Uint8Array(body.length + 32);
    token.set(body);
    token.set(mac, body.length);
    return b64uEncode(token);
  };

  const decrypt = async (tokenB64, keyB64) => {
    const k = await importKeys(keyB64);
    let t;
    try { t = b64uDecode(tokenB64); } catch { throw new Error("Invalid token (malformed base64)."); }
    // 1 version + 8 timestamp + 16 IV + 16 min ciphertext + 32 HMAC
    if (t.length < 73 || t[0] !== 0x80) throw new Error("Invalid token.");
    const body = t.slice(0, -32), mac = t.slice(-32);
    if (!(await crypto.subtle.verify("HMAC", k.sign, mac, body))) throw new Error("Wrong key or corrupted token.");
    try {
      return td.decode(await crypto.subtle.decrypt({ name: "AES-CBC", iv: t.slice(9, 25) }, k.enc, t.slice(25, -32)));
    } catch {
      throw new Error("Wrong key or corrupted token.");
    }
  };

  return { generateKey, encrypt, decrypt };
})();
