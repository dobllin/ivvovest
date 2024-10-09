document.addEventListener("DOMContentLoaded", () => {
    // Pilih semua elemen kartu
    const cards = document.querySelectorAll('.card');

    // Tambahkan event listener pada setiap kartu
    cards.forEach((card) => {
        card.addEventListener('click', () => {
            // Hapus kelas "selected" dari semua kartu
            cards.forEach((c) => c.classList.remove('selected'));

            // Tambahkan kelas "selected" ke kartu yang diklik
            card.classList.add('selected');
        });
    });
});


