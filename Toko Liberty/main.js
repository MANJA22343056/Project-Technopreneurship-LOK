// main.js
document.addEventListener("DOMContentLoaded", () => {
    
    if (typeof auth === 'undefined' || typeof db === 'undefined') {
        console.error("Firebase 'auth' atau 'db' tidak terdefinisi.");
        return;
    }

    const fAuth = auth;
    const fDb = db;
    const currentPage = window.location.pathname.split("/").pop();

    fAuth.onAuthStateChanged((user) => {
        if (user) {
            // === PENGGUNA SEDANG LOGIN ===

            if (currentPage === "login.html" || currentPage === "register.html") {
                console.log("Pengguna sudah login, mengarahkan ke about.html...");
                window.location.href = "about.html"; // <-- Tujuan ke about.html
                return;
            }

            const navLinksUl = document.getElementById("nav-links");
            const loginNavLi = document.getElementById("login-nav-item");

            if (loginNavLi) {
                loginNavLi.style.display = 'none';
            }

            fDb.collection("users").doc(user.uid).get().then((doc) => {
                let userName = "Pengguna";
                if (doc.exists && doc.data().fullName) {
                    userName = doc.data().fullName.split(' ')[0];
                }

                if (!document.getElementById("welcome-msg")) {
                    const welcomeLi = document.createElement("li");
                    welcomeLi.id = "welcome-msg";
                    welcomeLi.innerHTML = `<span class="text-gray-800 font-medium">Hi, ${userName}</span>`;

                    const logoutLi = document.createElement("li");
                    logoutLi.innerHTML = `<a href="#" id="logout-button" class="text-red-600 hover:text-red-800 font-medium">Logout</a>`;
                    
                    if (navLinksUl) {
                        navLinksUl.appendChild(welcomeLi);
                        navLinksUl.appendChild(logoutLi);
                    }

                    document.getElementById("logout-button").addEventListener("click", (e) => {
                        e.preventDefault();
                        fAuth.signOut().then(() => {
                            window.location.href = "login.html";
                        });
                    });
                }
            });

        } else {
            // === PENGGUNA TIDAK LOGIN (LOGGED OUT) ===

            const navLinksUl = document.getElementById("nav-links");
            const loginNavLi = document.getElementById("login-nav-item");
            
            if (loginNavLi) {
                loginNavLi.style.display = 'list-item';
            }

            const welcomeMsg = document.getElementById("welcome-msg");
            const logoutButton = document.getElementById("logout-button");

            if (welcomeMsg) welcomeMsg.remove();
            if (logoutButton) logoutButton.parentElement.remove();
        }
    });
});