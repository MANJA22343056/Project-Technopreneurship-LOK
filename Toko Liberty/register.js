// register.js
document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const registerMessage = document.getElementById("registerMessage");
    const fAuth = auth;
    const fDb = db;

    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const fullName = document.getElementById("fullname").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            registerMessage.textContent = "Error: Password dan Konfirmasi Password tidak cocok.";
            return;
        }

        registerMessage.textContent = "Memproses pendaftaran...";
        registerMessage.style.color = "blue";

        fAuth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return fDb.collection("users").doc(user.uid).set({
                    fullName: fullName,
                    email: email,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            })
            .then(() => {
                registerMessage.textContent = "Registrasi berhasil! Anda akan diarahkan ke halaman Login...";
                registerMessage.style.color = "green";
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 2000);
            })
            .catch((error) => {
                console.error("Error saat registrasi:", error);
                if (error.code === 'auth/email-already-in-use') {
                    registerMessage.textContent = "Error: Alamat email ini sudah terdaftar.";
                } else if (error.code === 'auth/weak-password') {
                    registerMessage.textContent = "Error: Password terlalu lemah (minimal 6 karakter).";
                } else {
                    registerMessage.textContent = "Error: " + error.message;
                }
                registerMessage.style.color = "red";
            });
    });
});