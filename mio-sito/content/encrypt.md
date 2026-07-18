+++
title = "Encrypt"
menu = "main"
weight = 20
+++

<!--
This page is a little experiment born out of my passion for cryptography: a hands-on way to see how **symmetric encryption** works. Symmetric means the *same key* both encrypts and decrypts — whoever holds the key can read the message, whoever doesn't sees only random bytes.
-->

This page use simmetric encryptioon by [Fernet](https://cryptography.io/en/latest/fernet/) 

<style>
  .fernet-tool label { display: block; margin-top: 1rem; font-weight: bold; color: var(--off-fg); }
  .fernet-tool input, .fernet-tool textarea {
    width: 100%; font-family: var(--font-monospace, monospace); margin-top: 0.3rem;
    background: var(--off-bg); color: var(--fg);
    border: 1px solid var(--muted); border-radius: 3px;
    padding: 0.5rem; box-sizing: border-box;
  }
  .fernet-tool input:focus, .fernet-tool textarea:focus {
    outline: none; border-color: var(--link);
  }
  .fernet-tool ::placeholder { color: var(--muted); opacity: 1; }
  .fernet-tool textarea { min-height: 6rem; resize: vertical; }
  .fernet-tool button {
    margin: 1rem 0.5rem 0 0; padding: 0.4rem 1rem; cursor: pointer;
    font-family: inherit; font-size: inherit;
    background: var(--inner-bg); color: var(--fg);
    border: 1px solid var(--muted); border-radius: 3px;
  }
  .fernet-tool button:hover { background: var(--hover); color: var(--bg); border-color: var(--hover); }
  .fernet-tool .error { color: var(--base08, #d33); margin-top: 0.5rem; min-height: 1.2rem; }
  .fernet-tool #result { background: var(--inner-bg); }
</style>

<div class="fernet-tool">
  <label for="key">Key</label>
  <input id="key" type="text" spellcheck="false" autocomplete="off" placeholder="paste a key or generate a new one">
  <label for="text">Text (plain or encrypted)</label>
  <textarea id="text" spellcheck="false" placeholder="write the message to encrypt, or paste the token to decrypt"></textarea>
  <button id="btn-generate" type="button">Generate key</button>
  <button id="btn-encrypt" type="button">Encrypt</button>
  <button id="btn-decrypt" type="button">Decrypt</button>
  <p class="error" id="error"></p>
  <label for="result">Result</label>
  <textarea id="result" readonly placeholder="the result appears here"></textarea>
</div>

<script src="/js/fernet.js"></script>
<script src="/js/encrypt-page.js"></script>

<!--
Here I use [Fernet](https://cryptography.io/en/latest/fernet/) (besides being the best amaro), a recipe that combines AES-128-CBC (confidentiality) with HMAC-SHA256 (integrity: a tampered token or a wrong key is detected before anything is decrypted). Everything runs locally in your browser through the native Web Crypto API: the key and the text **never leave this page, nothing is sent to any server, so the site cannot see anything, and the browser stores nothing** (no cookies, no local storage). Close the tab and it's all gone.

For Dev/IT users:

the tokens are fully compatible with Python's `cryptography.fernet`, so you can encrypt here and decrypt in a script, or vice versa. One rule of symmetric crypto applies in full: lose the key, lose the message.
-->
