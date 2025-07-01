
function login() {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, pass)
      .then(() => {
        window.location.href = "/admin/";
      })
      .catch(error => {
        document.getElementById("errorMsg").innerText = error.message;
      });
  }
