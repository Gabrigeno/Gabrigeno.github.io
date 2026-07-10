const $ = (id) => document.getElementById(id);

const run = async (fn) => {
  $("error").textContent = "";
  $("result").value = "";
  try {
    $("result").value = await fn($("text").value, $("key").value);
  } catch (e) {
    $("error").textContent = e.message;
  }
};

$("btn-generate").onclick = () => { $("key").value = fernet.generateKey(); };
$("btn-encrypt").onclick = () => run(fernet.encrypt);
$("btn-decrypt").onclick = () => run(fernet.decrypt);
