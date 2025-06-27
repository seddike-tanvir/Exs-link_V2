const form = document.getElementById("shortenForm");
const resultBox = document.getElementById("resultBox");
const shortLink = document.getElementById("shortLink");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const longUrl = document.getElementById("longUrl").value;
  const customCode = document.getElementById("customCode").value.trim();
  const password = document.getElementById("urlPassword").value;

  const code = customCode || generateCode(5);

  // Check if customCode already exists
  const ref = firebase.database().ref("urls/" + code);
  const snapshot = await ref.once("value");
  if (snapshot.exists() && customCode) {
    alert("Custom code already taken!");
    return;
  }

  const data = {
    originalUrl: longUrl,
    password: password ? password : null,
    clicks: 0,
    createdAt: Date.now()
  };

  firebase.database().ref("urls/" + code).set(data).then(() => {
    const link = `exs-link.web.app/${code}`;
    shortLink.href = link;
    shortLink.innerText = link;
    resultBox.classList.remove("hidden");
  });
});

function generateCode(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

document.getElementById("copyBtn").addEventListener("click", function () {
  const shortLink = document.getElementById("shortLink");
  if (shortLink && shortLink.href) {
    navigator.clipboard.writeText(shortLink.href).then(() => {
      // alert("Copied to clipboard!");
      alertNotify('Copied to clipboard :)', 'success', 3000);   
    }).catch(err => {
      console.error("Failed to copy:", err);
      // alert("Failed to copy link.");
      alertNotify('Failed to copy link :(', 'error', 3000);   
    });
  }
});
