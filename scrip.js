// Mendapatkan elemen header dan tombol
const header = document.getElementById('header');
const changeImageBtn = document.getElementById('changeImageBtn');

// Array gambar alternatif
const images = [
    'asset/Group 8.png',  // Gambar pertama
    'asset/Group 4.png', // Gambar kedua
];

// Variabel untuk melacak indeks gambar
let currentImageIndex = 0;

// Fungsi untuk mengganti gambar dengan transisi halus
function changeHeaderImage() {
    // Tambahkan kelas fade-out
    header.classList.add('fade-out');

    // Tunggu transisi selesai (sesuai dengan waktu transisi di CSS)
    setTimeout(() => {
        // Ubah gambar
        currentImageIndex = (currentImageIndex + 1) % images.length;
        header.style.backgroundImage = `url('${images[currentImageIndex]}')`;

        // Setelah gambar diubah, tambahkan efek fade-in
        header.classList.remove('fade-out');
        header.classList.add('fade-in');

        // Hapus kelas fade-in setelah transisi selesai
        setTimeout(() => {
            header.classList.remove('fade-in');
        }, 1000); // Durasi fade-in sesuai dengan CSS
    }, 1000); // Durasi fade-out sesuai dengan CSS
}

// Event listener untuk tombol
changeImageBtn.addEventListener('click', changeHeaderImage);
