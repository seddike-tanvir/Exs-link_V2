const parts = window.location.pathname.split("/").filter(Boolean);
const code = parts[0] || "";

if (!code) {
  window.location.href = "/404.html";
}

const h1_ForNonPass = document.getElementById("h1_ForNonPass");
const h1_ForPass = document.getElementById("h1_ForPass");
const statusText = document.getElementById("statusText");
const statusTextForPass = document.getElementById("statusTextForPass");
const passwordPrompt = document.getElementById("passwordPrompt");
const errorBox = document.getElementById("error");

let redirectUrl = null;
let realPassword = null;
let clickCount = 0;

firebase.database().ref("urls/" + code).once("value")
  .then(snapshot => {
    if (!snapshot.exists()) {
      window.location.href = "/404.html";
      return;
    }

    const data = snapshot.val();
    redirectUrl = data.originalUrl;
    realPassword = data.password || null;
    clickCount = data.clicks || 0;

    if (!realPassword) {
      firebase.database().ref("urls/" + code + "/clicks").set(clickCount + 1);
      window.location.href = redirectUrl;
    } else {
      h1_ForNonPass.classList.add("hidden");
      statusText.classList.add("hidden");
      h1_ForPass.classList.remove("hidden");
      passwordPrompt.classList.remove("hidden");
      statusTextForPass.textContent = "This link is password protected. So enter password to access";
    }
  })
  .catch(error => {
    statusText.textContent = "❌ Error: " + error.message;
  });

function verifyPassword() {
  const userInput = document.getElementById("redirectPassword").value;
  if (userInput === realPassword) {
    firebase.database().ref("urls/" + code + "/clicks").set(clickCount + 1);
    window.location.href = redirectUrl;
  } else {
    errorBox.textContent = "❌ Wrong password!";
  }
}



































































































// const params = window.location.pathname.split("/")[1];
// const statusText = document.getElementById("statusText");
// const passwordPrompt = document.getElementById("passwordPrompt");
// let realPassword = null;
// let redirectUrl = null;
// let clickCount = 0;

// firebase.database().ref("urls/" + params).once("value")
//   .then(snapshot => {
//     if (!snapshot.exists()) {
//       statusText.textContent = "❌ Invalid or expired link.";
//       return;
//     }

//     const data = snapshot.val();
//     redirectUrl = data.originalUrl;
//     realPassword = data.password || null;
//     clickCount = data.clicks || 0;

//     if (!realPassword) {
//       firebase.database().ref("urls/" + params + "/clicks").set(clickCount + 1);
//       window.location.href = redirectUrl;
//     } else {
//       statusText.textContent = "🔒 Password required.";
//       passwordPrompt.classList.remove("hidden");
//     }
//   })
//   .catch(error => {
//     statusText.textContent = "❌ Error: " + error.message;
//   });

// function verifyPassword() {
//   const input = document.getElementById("redirectPassword").value;
//   if (input === realPassword) {
//     firebase.database().ref("urls/" + params + "/clicks").set(clickCount + 1);
//     window.location.href = redirectUrl;
//   } else {
//     document.getElementById("error").textContent = "❌ Wrong password!";
//   }
// }
