// kontak.js
document.addEventListener("DOMContentLoaded", () => {
    
    // Temukan elemen-elemen di halaman
    // Kita akan memberi nama ID form-nya 'contactForm' di HTML nanti
    const contactForm = document.getElementById("contactForm");
    
    // Kita juga akan menambahkan elemen pesan ini di HTML
    const contactMessage = document.getElementById("contactMessage"); 
    
    // 'db' diambil dari skrip inline di kontak.html
    const fDb = db; 

    // Tambahkan listener ke formulir
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Mencegah halaman refresh

        // Ambil semua data dari formulir
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;

        // Tampilkan pesan "sedang mengirim"
        contactMessage.textContent = "Mengirim pesan...";
        contactMessage.style.color = "blue";

        // Gunakan .add() untuk membuat dokumen baru dengan ID acak
        fDb.collection("contact_messages").add({
            name: name,
            email: email,
            subject: subject,
            message: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp() // Tambah stempel waktu
        })
        .then(() => {
            // Sukses!
            contactMessage.textContent = "Pesan Anda berhasil terkirim. Terima kasih!";
            contactMessage.style.color = "green";
            
            // Kosongkan formulir setelah berhasil
            contactForm.reset(); 
        })
        .catch((error) => {
            // Gagal
            console.error("Error mengirim pesan: ", error);
            contactMessage.textContent = "Terjadi kesalahan: " + error.message;
            contactMessage.style.color = "red";
        });
    });
});