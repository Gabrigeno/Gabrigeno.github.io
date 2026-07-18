+++
title = "One-Time Pad"
menu = "main"
weight = 21
+++

The [one-time pad](https://en.wikipedia.org/wiki/One-time_pad): the only cipher with proven perfect secrecy. Each character is shifted by a random key character — if the key is truly random, as long as the message, and never reused, the ciphertext is **mathematically unbreakable**.

<style>
  .otp-tool label { display: block; margin-top: 1rem; font-weight: bold; color: var(--off-fg); }
  .otp-tool input, .otp-tool textarea {
    width: 100%; font-family: var(--font-monospace, monospace); margin-top: 0.3rem;
    background: var(--off-bg); color: var(--fg);
    border: 1px solid var(--muted); border-radius: 3px;
    padding: 0.5rem; box-sizing: border-box;
  }
  .otp-tool input:focus, .otp-tool textarea:focus {
    outline: none; border-color: var(--link);
  }
  .otp-tool ::placeholder { color: var(--muted); opacity: 1; }
  .otp-tool textarea { min-height: 6rem; resize: vertical; }
  .otp-tool button {
    margin: 1rem 0.5rem 0 0; padding: 0.4rem 1rem; cursor: pointer;
    font-family: inherit; font-size: inherit;
    background: var(--inner-bg); color: var(--fg);
    border: 1px solid var(--muted); border-radius: 3px;
  }
  .otp-tool button:hover { background: var(--hover); color: var(--bg); border-color: var(--hover); }
  .otp-tool .error { color: var(--base08, #d33); margin-top: 0.5rem; min-height: 1.2rem; }
  .otp-tool #result { background: var(--inner-bg); }
</style>

<div class="otp-tool">
  <label for="key">Key (same length as the message)</label>
  <input id="key" type="text" spellcheck="false" autocomplete="off" placeholder="paste a key or generate a new one">
  <label for="text">Text (plain or encrypted)</label>
  <textarea id="text" spellcheck="false" placeholder="write the message to encrypt, or paste the ciphertext to decrypt"></textarea>
  <button id="btn-generate" type="button">Generate key</button>
  <button id="btn-encrypt" type="button">Encrypt</button>
  <button id="btn-decrypt" type="button">Decrypt</button>
  <p class="error" id="error"></p>
  <label for="result">Result</label>
  <textarea id="result" readonly placeholder="the result appears here"></textarea>
</div>

<script src="/js/otp-page.js"></script>

<!--- Everything runs locally in your browser: key and message never leave this page. Supported characters: letters, digits, punctuation and spaces (no newlines or accented letters). Same rule as always: lose the key, lose the message — and never use the same key twice. -->
