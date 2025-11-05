// login.js
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const loginMessage = document.getElementById("loginMessage");
    const fAuth = auth;

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        loginMessage.textContent = "Memproses login...";
        loginMessage.style.color = "blue";

        fAuth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                loginMessage.textContent = "Login berhasil! Mengarahkan...";
                loginMessage.style.color = "green";
                setTimeout(() => {
                    window.location.href = "about.html"; // <-- Tujuan ke about.html
                }, 1500);
            })
            .catch((error) => {
                console.error("Error saat login:", error);
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                    loginMessage.textContent = "Error: Email atau password salah.";
                } else {
                    loginMessage.textContent = "Error: " + error.message;
                }
                loginMessage.style.color = "red";
            });
    });
});