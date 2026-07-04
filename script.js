document.addEventListener('DOMContentLoaded', () => {

  // Elemen
  const overlay = document.getElementById('overlay');
  const popupText = document.getElementById('popup-text');
  const btnMasuk = document.getElementById('btn-masuk');
  const mainContent = document.getElementById('main-content');

  // Daftar pesan pop-up
  const messages = [
    'Oh Hey Apakah Kamu User Baru?',
    'Salam berkenalan dengan mu',
    'Pencet Tombol Dibawah ini untuk masuk yah'
  ];

  let currentIndex = 0;
  let timeoutId = null;

  // Fungsi untuk menampilkan pesan berikutnya
  function showNextMessage() {
    if (currentIndex < messages.length) {
      popupText.textContent = messages[currentIndex];
      currentIndex++;
      // Jadwalkan pesan berikutnya atau tampilkan tombol setelah 5 detik
      timeoutId = setTimeout(() => {
        if (currentIndex < messages.length) {
          showNextMessage();
        } else {
          // Semua pesan selesai → tampilkan tombol Masuk
          btnMasuk.style.display = 'block';
          popupText.style.display = 'none'; // sembunyikan teks terakhir
        }
      }, 5000);
    }
  }

  // Mulai tampilkan pesan pertama
  showNextMessage();

  // Event tombol Masuk
  btnMasuk.addEventListener('click', () => {
    // Hilangkan overlay dengan efek
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.display = 'none';
      mainContent.style.display = 'block';
      // Set default section Home
      showSection('home');
    }, 500);
    // Bersihkan timeout jika masih berjalan (misal user klik sebelum selesai)
    if (timeoutId) clearTimeout(timeoutId);
  });

  // ===== NAVIGASI =====
  const navBtns = document.querySelectorAll('.nav-btn');
  const sections = {
    home: document.getElementById('home-section'),
    cs: document.getElementById('cs-section'),
    shop: document.getElementById('shop-section')
  };

  function showSection(target) {
    // Sembunyikan semua section
    Object.values(sections).forEach(sec => sec.classList.remove('active'));
    // Tampilkan yang dipilih
    if (sections[target]) {
      sections[target].classList.add('active');
    }
  }

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      if (target === 'cs') {
        // Buka link Telegram di tab baru
        window.open('https://t.me/cwoolo', '_blank');
      } else if (target === 'home') {
        showSection('home');
      } else if (target === 'shop') {
        showSection('shop');
      }
    });
  });

  // Tampilkan home saat pertama kali
  showSection('home');

});