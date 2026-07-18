const $ = (id) => document.getElementById(id);

// string.printable[:-5] from onetimepad.py: digits + letters + punctuation + space
const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~ ";

const shift = (text, key, sign) => {
  const bad = [...new Set(text + key)].filter((c) => !ALPHABET.includes(c));
  if (bad.length) throw new Error("unsupported characters: " + bad.sort().join(""));
  if (key.length < text.length) throw new Error("key shorter than message");
  return [...text]
    .map((c, i) => ALPHABET[(ALPHABET.indexOf(c) + sign * ALPHABET.indexOf(key[i]) + ALPHABET.length) % ALPHABET.length])
    .join("");
};

const generateKey = (len) => {
  let out = "";
  while (out.length < len) {
    const [b] = crypto.getRandomValues(new Uint8Array(1));
    if (b < 190) out += ALPHABET[b % ALPHABET.length]; // 190 = 2*95: rejection sampling, no modulo bias
  }
  return out;
};

const run = (sign) => {
  $("error").textContent = "";
  $("result").value = "";
  try {
    $("result").value = shift($("text").value, $("key").value, sign);
  } catch (e) {
    $("error").textContent = e.message;
  }
};

$("btn-generate").onclick = () => {
  $("error").textContent = "";
  const len = $("text").value.length;
  if (!len) { $("error").textContent = "write the message first: the key must be as long as the message"; return; }
  $("key").value = generateKey(len);
};
$("btn-encrypt").onclick = () => run(+1);
$("btn-decrypt").onclick = () => run(-1);
