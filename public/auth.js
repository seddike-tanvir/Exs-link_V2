const auth = firebase.auth();

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("Login successful");
      // Redirect to admin panel
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function logout() {
  auth.signOut()
    .then(() => {
      console.log("Logout successful");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}